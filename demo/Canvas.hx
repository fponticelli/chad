import chad.render.CanvasRender;

import thx.geom.Matrix4x4;
import thx.geom.Point;
import thx.geom.Line;
import thx.geom.Point3D;
import thx.geom.shape.Box;
import thx.geom.shape.Circle;
import thx.geom.Spline;
using thx.geom.Transformable;
import thx.unit.angle.Degree;

class Canvas {
	public static function main() {
		var canvas : js.html.CanvasElement = cast js.Browser.document.querySelector('canvas');
		var render = CanvasRender.scaled(canvas, 2);

		var len = 800,
			xp = Spline.fromArray([new Point(0, 0), new Point(len, 0)], false),
			xn = Spline.fromArray([new Point(0, 0), new Point(-len, 0)], false),
			yp = Spline.fromArray([new Point(0, 0), new Point(0, len)], false),
			yn = Spline.fromArray([new Point(0, 0), new Point(0, -len)], false);

		var r = new LineStyle(2, "red"),
			g = new LineStyle(2, "green");
		render.drawSpline(xp, StrokeLine(r));
		render.drawSpline(xn, StrokeDash([8, 8], g));

		render.drawSpline(yp, StrokeLine(g));
		render.drawSpline(yn, StrokeDash([8, 8], r));

		var line = Line.fromPoints(new Point(0, 500), new Point(500, 0));
		for(i in 0...10) {
			render.drawLine(line.offset(i * 10), StrokeDash([3, 4]));
			if(i != 0)
				render.drawLine(line.offset(-i * 10), StrokeDot(3));
		}

		var rect = new Box(new Point(50, 100), new Point(250, 300));
		render.drawSpline(rect);

		var rect2 = new Box(new Point(100, 50), new Point(300, 250))
			.toSpline()
			.rotateZ((30 : Degree))
			.translateX(20)
			.translateY(-20);
		render.drawSpline(rect2);

		var intersection = rect.toSpline().intersectionsSpline(rect2);
		intersection.map(function(p) render.drawDot(p, 4));


		var circle = new Circle(new Point(300, 250), 100);
		render.drawSpline(circle, StrokeDot(4));

		var circle = new Circle(new Point(200, 200), 80);
		render.drawSpline(circle, StrokeDash([4, 4, 8, 4]), FillColor("rgba(0,255,155,0.1)"));

		var circle = new Circle(new Point(240, 280), 60);
		render.drawSpline(circle, FillColor("rgba(100,255,155,0.5)"));
	}
}