package chad.render.openfl;

import thx.geom.Matrix4x4;
import thx.geom.Point;
import thx.geom.Point3D;
import thx.geom.shape.Box;
import openfl.display.Graphics;
import openfl.display.Sprite;

class OpenFLGraphics implements IGraphics {
	var ctx : Graphics;
	var matrix : Matrix4x4;
	public var weightScale(default, null) : Float -> Float;
	public var width(default, null) : Float;
	public var height(default, null) : Float;
	public var reverseCoords(get, null) : Box;
	public function new(sprite : Sprite, ?matrix : Matrix4x4, ?weightScale : Float -> Float) {
		width = sprite.width;
		height = sprite.height;
		this.ctx = sprite.graphics;

		this.weightScale = null == weightScale ? function(v) return v : weightScale;

		var halfPixel  = Matrix4x4.translation(new Point3D(0.5, 0.5, 1)),
			mirror     = Matrix4x4.mirrorY(),
			translateY = Matrix4x4.translation(new Point3D(0, height, 0)),
			correctionMatrix = Matrix4x4.identity
				//.multiply(halfPixel)
				.multiply(mirror)
				.multiply(translateY);

		this.matrix = (null == matrix ? Matrix4x4.identity : matrix).multiply(correctionMatrix);
		/*
		ctx.transform(
			this.matrix.at(0),  //m11
			this.matrix.at(1),  //m12
			this.matrix.at(4),  //m21
			this.matrix.at(5),  //m22
			this.matrix.at(12), //dx
			this.matrix.at(13)  //dy
		);
		*/
	}

	public function wrap(?stroke : StrokeStyle, ?fill : FillStyle, f : Void -> Void) {
		var hasStyle = null != fill || null != stroke;
		//if(hasStyle)
		//	ctx.save();
		//ctx.beginPath();
		if(null != stroke)
			applyStrokeStyle(stroke);
		if(null != fill)
			applyFillStyle(fill);
		f();
		if(null != fill)
			ctx.endFill();
		//if(null != stroke || null == fill)
		//	ctx.stroke();
		//if(hasStyle)
		//	ctx.restore();
	}

	public inline function lineTo(point : Point)
		ctx.lineTo(point.x, point.y);

	// use edge cubic for this
	public inline function curveTo(point : Point, cout : Null<Point>, cin : Null<Point>)
		//ctx.bezierCurveTo(cout.x, cout.y, cin.x, cin.y, point.x, point.y);
		ctx.curveTo(cout.x, cout.y, point.x, point.y);

	public inline function moveTo(point : Point)
		ctx.moveTo(point.x, point.y);

	function applyLineStyle(style : LineStyle) {
		if(null == style)
			return;
		ctx.lineStyle(
			weightScale(style.width)/*,
			0x000000, // style.color,
			null, // alpha
			null, // pixel hinting bool
			null, // scaleMode : openfl.display.LineScaleMode
			null, // openfl.display.CapsStyle
			null, // openfl.display.JointStyle
			null  // miterLimit : Float
		*/);
	}

	public function applyStrokeStyle(style : StrokeStyle)
		switch style {
			case StrokeLine(style):
				applyLineStyle(style);
				//ctx.setLineDash([]);
			case StrokeDash(pattern, style):
				applyLineStyle(style);
				//ctx.setLineDash(pattern.map(weightScale));
			case StrokeDot(spacing, style):
				applyLineStyle(style);
				//ctx.setLineDash([ctx.lineWidth, weightScale(spacing)]);
		};

	public function applyFillStyle(style : FillStyle)
		switch style {
			case FillColor(c):
				ctx.beginFill(0xdddddd /*c*/);
		};

	function get_reverseCoords() {
		if(null == reverseCoords) {
			var inverted = matrix.inverse();
			if(null == inverted) throw "unable to inverse coords matrix";
			reverseCoords = new Box(Point.zero, new Point(width, height)).transform(inverted);
		}
		return reverseCoords;
	}
}