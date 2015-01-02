import thx.geom.d2.*;
import thx.geom.shape.*;
using thx.geom.Transformable;
import thx.math.Const;
import thx.unit.angle.Degree;
import chad.render.*;
import chad.render.canvas.CanvasGraphics;
import thx.color.*;

class Canvas {
  public static function draw(r : Render) {
    /*
    var len = 800,
        xp = Spline.fromArray([Point.create(0, 0), Point.create(len, 0)], false),
        xn = Spline.fromArray([Point.create(0, 0), Point.create(-len, 0)], false),
        yp = Spline.fromArray([Point.create(0, 0), Point.create(0, len)], false),
        yn = Spline.fromArray([Point.create(0, 0), Point.create(0, -len)], false);

    var red = new LineStyle(2, "#f00"),
        green = new LineStyle(2, "#0f0");

    r.drawSpline(xp, StrokeLine(red));
    r.drawSpline(xn, StrokeDash([8, 8], green));

    r.drawSpline(yp, StrokeLine(green));
    r.drawSpline(yn, StrokeDash([8, 8], red));

    var line = Line.fromPoints(Point.create(0, 500), Point.create(500, 0));
    for(i in 0...10) {
      r.drawLine(line.offset(i * 10), StrokeDash([3, 4]));
      if(i != 0)
        r.drawLine(line.offset(-i * 10), StrokeDot(3));
    }

    line = Line.fromPoints(Point.create(0, 120), Point.create(500, 120));
    r.drawLine(line, StrokeLine(new LineStyle(2)));
    line = Line.fromPoints(Point.create(120, 0), Point.create(120, 100));
    r.drawLine(line, StrokeLine(new LineStyle(3)));
    line = Line.fromPoints(Point.create(0, 100), Point.create(500, 200));
    r.drawLine(line, StrokeLine(new LineStyle(4)));
*/
    var rect = new Box(Point.create(50, 100), Point.create(250, 300)).toSpline();
//    r.drawSpline(rect);

    var rect2 = new Box(Point.create(200, 150), Point.create(400, 350))
      .toSpline()
      .rotateZ((30 : Degree).toRadian())
      .translateX(20)
      .translateY(-140);
/*
    r.drawSpline(rect2);

    var intersection = rect.intersectionsSpline(rect2);
    intersection.map(function(p) r.drawDot(p, 4));

    var arc = new EdgeCubic(
      Point.create(0, 0),
      Point.create(0, Const.KAPPA),
      Point.create(1-Const.KAPPA, 1),
      Point.create(1, 1)
    ).scale(Point3D.create(200, 200, 1)).translateX(50).translateY(50);
    //r.drawSpline(Spline.fromEdges([arc], false), StrokeLine(new LineStyle(3)));
    var s = arc.subdivide();
    s[1] = s[1].translateX(2);
    r.drawSpline(Spline.fromEdges([s[0]], false), StrokeLine(new LineStyle(3)));
    r.drawSpline(Spline.fromEdges([s[1]], false), StrokeLine(new LineStyle(3)));

    r.drawSpline(arc.translateX(20).translateY(-20).toSpline(), StrokeLine(new LineStyle(10)));

    r.drawSpline(arc.toSpline().toLinear().translateX(20).translateY(-20), StrokeLine(new LineStyle(2, "#fff")));

    var e = [
        new EdgeCubic(
          Point.create(0, 0),
          Point.create(0, Const.KAPPA),
          Point.create(1-Const.KAPPA, 1),
          Point.create(1, 1)
        ).scale(Point3D.create(200, 200, 1)).translate(Point3D.create(40, 40, 0)),
        new EdgeCubic(
          Point.create(1, 1),
          Point.create(1+Const.KAPPA, 1),
          Point.create(2, Const.KAPPA),
          Point.create(2, 0)
        ).scale(Point3D.create(200, 200, 1)).translate(Point3D.create(40, 40, 0))
      ],
      c = Spline.fromEdges(cast e, false).scale(Point3D.create(0.4,0.4,1));

    r.drawSpline(c, StrokeLine(new LineStyle(8, Color.red)));
    r.drawSpline(c.toLinear(), StrokeDash([5,5], new LineStyle(4, Color.lime)));
    r.drawSpline(e[0].toSpline().toLinear(), StrokeDash([8,4], new LineStyle(4, Color.orange)));

    var circle1 = new Circle(Point.create(300, 250), 100);
    r.drawSpline(circle1.toSpline().toLinear());


    var path = new Path([circle1.toSpline(), circle2.toSpline(), circle3.toSpline()]);

    circle2.toSpline()
      .intersectionsSpline(rect)
      .map(function(point) r.drawDot(point, FillColor("#aa3300"), 6));
*/
    var circle1 = new Circle(Point.create(200, 250), 100);
    r.drawSpline(circle1.toSpline());

    var circle2 = new Circle(Point.create(200, 200), 80);
    r.drawSpline(circle2, StrokeDash([4, 4, 8, 4]), FillColor("rgba(0,255,155,0.1)"));

    var circle3 = new Circle(Point.create(240, 280), 60);
    r.drawSpline(circle3, StrokeDot(4), FillColor("rgba(100,255,155,0.5)"));

    var p = rect2.toPath()
      .intersection(rect.toPath())
      .union(circle1)
    ;

    r.drawPath(
      p,
      StrokeLine(new LineStyle(6, Color.darkblue)),
      FillColor(Color.lightblue));
/*
    r.drawSpline(
        rect2.translateX(150)
          .translateY(50),
        FillColor("rgba(200,55,0,0.5)"));
*/
// selfIntersection is looping forever
//    path.selfIntersections()
//      .map(function(point) r.drawDot(point, FillColor("#aa3300"), 4));
  }
  public static function main() {
    var canvas : js.html.CanvasElement = cast js.Browser.document.querySelector('canvas'),
        graphics = CanvasGraphics.scaled(canvas, 2),
        r = new Render(graphics);
    draw(r);
  }
}