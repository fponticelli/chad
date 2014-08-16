package chad.render;

import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;

import thx.geom.Line;
import thx.geom.Matrix4x4;
import thx.geom.Point;
import thx.geom.Point3D;
import thx.geom.Spline;

class CanvasRender extends BaseRender {
	public static function scaled(canvas : CanvasElement, scale : Float) {
		return new CanvasRender(canvas, Matrix4x4.scaling(new Point3D(scale, scale, 1)), function(v) return v / scale);
	}

	static var correctionMatrix = Matrix4x4.translation(new Point3D(0.5, 0.5, 1));

	var ctx : CanvasRenderingContext2D;
	var width : Float;
	var height : Float;
	var topLeft : Point;
	var topRight : Point;
	var bottomLeft : Point;
	var bottomRight : Point;
	var top : Line;
	var bottom : Line;
	var left : Line;
	var right : Line;
	var weightScale : Float -> Float;
	public function new(canvas : CanvasElement, ?matrix : Matrix4x4, ?weightScale : Float -> Float) {
		ctx = canvas.getContext2d();
		width = canvas.width;
		height = canvas.height;
		topLeft = new Point(0, 0);
		topRight = new Point(width, 0);
		bottomLeft = new Point(0, height);
		bottomRight = new Point(width, height);
		top = Line.fromPoints(topLeft, topRight);
		bottom = Line.fromPoints(bottomLeft, bottomRight);
		left = Line.fromPoints(topLeft, bottomLeft);
		right = Line.fromPoints(topRight, bottomRight);

		this.weightScale = null == weightScale ? function(v) return v : weightScale;

		if(null == matrix) {
			matrix = Matrix4x4.unity;
		}
		matrix = matrix.multiply(correctionMatrix);

		ctx.transform(
			matrix.at(0), //m11
			matrix.at(1), //m12
			matrix.at(4), //m21
			matrix.at(5), //m22
			matrix.at(12), //dx
			matrix.at(13) //dy
		);

		// default styles
		applyStrokeStyle(StrokeLine(new LineStyle()));
		applyFillStyle(FillColor("#000000"));
	}

	function wrap(?stroke : StrokeStyle, ?fill : FillStyle, f : Void -> Void) {
		var hasStyle = null != fill || null != stroke;
		if(hasStyle)
			ctx.save();
		ctx.beginPath();
		if(null != stroke)
			applyStrokeStyle(stroke);
		if(null != fill)
			applyFillStyle(fill);
		f();
		if(null != fill)
		ctx.fill();
		if(null != stroke || null == fill)
			ctx.stroke();
		if(hasStyle)
			ctx.restore();
	}

	public function drawDot(point : Point, ?style : FillStyle) {
		wrap(style, ctx.fillRect.bind(point.x, point.y, 1, 1));
	}

	public function drawSegment(a : Point, b : Point, ?style : StrokeStyle) {
		wrap(style, function() {
			moveTo(a);
			lineTo(b);
		});
	}

	public function drawLine(line : Line, ?style : StrokeStyle) {
		// TODO check angle instead of attempting interaction
		var a = line.intersectWithLine(top),
			b;

		if(null == a) {
			a = line.intersectWithLine(left);
			b = line.intersectWithLine(right);
		} else {
			b = line.intersectWithLine(bottom);
		}
		drawSegment(a, b, style);
	}

	public function drawSpline(spline : Spline, ?stroke : StrokeStyle, ?fill : FillStyle) {
		wrap(stroke, fill, function() {
			spline.iterate(
				function(init : Point) {
					moveTo(init);
				},
				function(a : Point, b : Point, nout : Null<Point>, nin : Null<Point>) {
					if(null == nout && null == nin)
						lineTo(b);
					else {
						if(null == nout)
							nout = a;
						else if(null == nin)
							nin = b;
						curveTo(b, nout, nin);
					}
				});
		});
	}

	public inline function lineTo(point : Point) {
		ctx.lineTo(point.x, point.y);
	}

	public inline function curveTo(point : Point, cout : Null<Point>, cin : Null<Point>) {
		ctx.bezierCurveTo(cout.x, cout.y, cin.x, cin.y, point.x, point.y);
	}

	public inline function moveTo(point : Point) {
		ctx.moveTo(point.x, point.y);
	}

	function applyLineStyle(style : LineStyle) {
		if(null == style)
			return;
		ctx.lineWidth = weightScale(style.width);
		ctx.lineCap = cast style.cap;
		ctx.lineJoin = cast style.join;
		ctx.strokeStyle = style.color;
	}

	public function applyStrokeStyle(style : StrokeStyle) {
		switch style {
			case StrokeLine(style):
				applyLineStyle(style);
				ctx.setLineDash([]);
			case StrokeDash(pattern, style):
				applyLineStyle(style);
				ctx.setLineDash(pattern.map(weightScale));
			case StrokeDot(spacing, style):
				applyLineStyle(style);
				ctx.setLineDash([1, spacing].map(weightScale));
		}
	}

	public function applyFillStyle(style : FillStyle) {
		switch style {
			case FillColor(c):
				ctx.fillStyle = c;
		}
	}
}

enum FillStyle {
	FillColor(c : String);
	// TODO LinearGradient
	// TODO RadialGradient
	// TODO Pattern
}

enum StrokeStyle {
	StrokeLine(style : LineStyle);
	StrokeDash(pattern : Array<Float>, ?style : LineStyle);
	StrokeDot(spacing : Float, ?style : LineStyle);
}

class LineStyle {
	public var width(default, null) : Float;
	public var color(default, null) : String;
	public var join(default, null) : Join;
	public var cap(default, null) : Cap;

	public function new(width = 1.0, color = "#000000", join = Join.miter, cap = Cap.butt) {
		this.width = width;
		this.color = color;
		this.join = join;
		this.cap = cap;
	}
}

@:enum
abstract Join(String) {
    var miter = "miter";
    var round = "round";
    var bevel = "bevel";
}

@:enum
abstract Cap(String) {
    var butt = "butt";
    var round = "round";
    var square = "square";
}