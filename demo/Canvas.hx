import chad.render.*;

import chad.render.canvas.CanvasGraphics;
import thx.geom.Const;
import thx.geom.EdgeCubic;
import thx.geom.Matrix4x4;
import thx.geom.Point;
import thx.geom.Line;
import thx.geom.Point3D;
import thx.geom.shape.Box;
import thx.geom.shape.Circle;
import thx.geom.Spline;
using thx.geom.Transformable;
import thx.unit.angle.Degree;
import thx.geom.Path;
import thx.color.Color;

class Canvas {
  public static function draw(r : Render) {
    var len = 800,
      xp = Spline.fromArray([new Point(0, 0), new Point(len, 0)], false),
      xn = Spline.fromArray([new Point(0, 0), new Point(-len, 0)], false),
      yp = Spline.fromArray([new Point(0, 0), new Point(0, len)], false),
      yn = Spline.fromArray([new Point(0, 0), new Point(0, -len)], false);

    var red = new LineStyle(2, "#f00"),
      green = new LineStyle(2, "#0f0");
    r.drawSpline(xp, StrokeLine(red));
    r.drawSpline(xn, StrokeDash([8, 8], green));

    r.drawSpline(yp, StrokeLine(green));
    r.drawSpline(yn, StrokeDash([8, 8], red));

    var line = Line.fromPoints(new Point(0, 500), new Point(500, 0));
    for(i in 0...10) {
      r.drawLine(line.offset(i * 10), StrokeDash([3, 4]));
      if(i != 0)
        r.drawLine(line.offset(-i * 10), StrokeDot(3));
    }

    line = Line.fromPoints(new Point(0, 120), new Point(500, 120));
    r.drawLine(line, StrokeLine(new LineStyle(2)));
    line = Line.fromPoints(new Point(120, 0), new Point(120, 100));
    r.drawLine(line, StrokeLine(new LineStyle(3)));
    line = Line.fromPoints(new Point(0, 100), new Point(500, 200));
    r.drawLine(line, StrokeLine(new LineStyle(4)));

    var rect = new Box(new Point(50, 100), new Point(250, 300));
    r.drawSpline(rect);

    var rect2 = new Box(new Point(100, 50), new Point(300, 250))
      .toSpline()
      .rotateZ((30 : Degree))
      .translateX(20)
      .translateY(-20);
    r.drawSpline(rect2);

    var intersection = rect.toSpline().intersectionsSpline(rect2);
    intersection.map(function(p) r.drawDot(p, 4));

    var arc = new EdgeCubic(
      new Point(0, 0),
      new Point(0, Const.KAPPA),
      new Point(1-Const.KAPPA, 1),
      new Point(1, 1)
    ).scale(new Point3D(200, 200, 1)).translateX(50).translateY(50);
    //r.drawSpline(Spline.fromEdges([arc], false), StrokeLine(new LineStyle(3)));
    var s = arc.subdivide();
    s[1] = s[1].translateX(2);
    r.drawSpline(Spline.fromEdges([s[0]], false), StrokeLine(new LineStyle(3)));
    r.drawSpline(Spline.fromEdges([s[1]], false), StrokeLine(new LineStyle(3)));

    r.drawSpline(arc.translateX(20).translateY(-20).toSpline(), StrokeLine(new LineStyle(10)));

    r.drawSpline(arc.toSpline().toLinear().translateX(20).translateY(-20), StrokeLine(new LineStyle(2, "#fff")));

    var e = [
        new EdgeCubic(
          new Point(0, 0),
          new Point(0, Const.KAPPA),
          new Point(1-Const.KAPPA, 1),
          new Point(1, 1)
        ).scale(new Point3D(200, 200, 1)).translate(new Point3D(40, 40, 0)),
        new EdgeCubic(
          new Point(1, 1),
          new Point(1+Const.KAPPA, 1),
          new Point(2, Const.KAPPA),
          new Point(2, 0)
        ).scale(new Point3D(200, 200, 1)).translate(new Point3D(40, 40, 0))
      ],
      c = Spline.fromEdges(cast e, false).scale(new Point3D(0.4,0.4,1));

    r.drawSpline(c, StrokeLine(new LineStyle(8, Color.red)));
    r.drawSpline(c.toLinear(), StrokeDash([5,5], new LineStyle(4, Color.lime)));
    r.drawSpline(e[0].toSpline().toLinear(), StrokeDash([8,4], new LineStyle(4, Color.orange)));

    var circle1 = new Circle(new Point(300, 250), 100);
    r.drawSpline(circle1.toSpline().toLinear());

    var circle2 = new Circle(new Point(200, 200), 80);
    r.drawSpline(circle2, StrokeDash([4, 4, 8, 4]), FillColor("rgba(0,255,155,0.1)"));

    var circle3 = new Circle(new Point(240, 280), 60);
    r.drawSpline(circle3, StrokeDot(4), FillColor("rgba(100,255,155,0.5)"));

    var path = new Path([circle1.toSpline(), circle2.toSpline(), circle3.toSpline()]);
    circle2.toSpline()
      .intersectionsSpline(rect.toSpline())
      .map(function(point) r.drawDot(point, FillColor("#aa3300"), 6));

    path.selfIntersections()
      .map(function(point) r.drawDot(point, FillColor("#aa3300"), 4));
  }

  public static function main() {
    var canvas : js.html.CanvasElement = cast js.Browser.document.querySelector('canvas'),
      graphics = CanvasGraphics.scaled(canvas, 2),
      r = new Render(graphics);
    //var r = CanvasRender.scaled(canvas, 2);
    draw(r);
  }
}