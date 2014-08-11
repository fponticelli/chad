import chad.render.CanvasRender;

import thx.geom.Matrix4x4;
import thx.geom.Point;
import thx.geom.Line;
import thx.geom.Point3D;
import thx.geom.shape.Rect;
import thx.geom.shape.Circle;

class Canvas {
	public static function main() {
		var canvas : js.html.CanvasElement = cast js.Browser.document.querySelector('canvas');
		var render = CanvasRender.scaled(canvas, 2);

		var p = new Point(30, 50);
		render.drawDot(p);
		render.drawSegment(new Point(100, 100), new Point(500, 100));
		render.drawSegment(new Point(100, 100), new Point(100, 500));
		render.drawSegment(new Point(100, 100), new Point(500, 500));

		var line = Line.fromPoints(new Point(0, 500), new Point(500, 0));
		for(i in 0...10) {
			render.drawLine(line.offset(i * 10), StrokeDash([3, 4]));
			if(i != 0)
				render.drawLine(line.offset(-i * 10), StrokeDot(3));
		}

		var rect = new Rect(new Point(30, 30), new Point(300, 300));
		render.drawPath(rect);

		var circle = new Circle(new Point(300, 250), 100);
		render.drawPath(circle, StrokeDot(4));

		var circle = new Circle(new Point(200, 200), 80);
		render.drawPath(circle, StrokeDash([3, 4, 5, 6]), FillColor("rgba(0,255,155,0.1)"));

		var circle = new Circle(new Point(240, 280), 60);
		render.drawPath(circle, FillColor("rgba(100,255,155,0.5)"));
	}
}