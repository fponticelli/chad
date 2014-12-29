package chad.render;

using thx.core.Iterables;
import thx.geom.Line;
import thx.geom.Point;
import thx.geom.Point3D;
import thx.geom.Path;
import thx.geom.shape.Circle;
import thx.geom.Spline;
using thx.geom.Transformable;

class Render {
  public var g(default, null) : IGraphics;
  public function new(graphics : IGraphics) {
    g = graphics;
    // default styles
    g.applyStrokeStyle(StrokeLine(new LineStyle()));
    g.applyFillStyle(FillColor("#000000"));
  }

  public function drawDot(point : Point, ?fill : FillStyle, ?stroke : StrokeStyle, ?size : Float = 2) {
    size = g.weightScale(size);
    var spline = Circle.unitaryCircle
      .scale(new Point3D(size, size, 1))
      .translate(new Point3D(point.x, point.y, 1));
    drawSpline(spline, stroke, fill);
  }

  public function drawSegment(a : Point, b : Point, ?style : StrokeStyle)
    g.wrap(style, function() {
      moveTo(a);
      lineTo(b);
    });

  public function drawLine(line : Line, ?style : StrokeStyle) {
    var box = g.reverseCoords,
      deg = (line.normal.toAngle() : Float) % Math.PI,
      a, b;
    if(deg < Math.PI / 4) {
      // vert
      a = line.intersectionLine(new Line(new Point(0, 1), box.top));
      b = line.intersectionLine(new Line(new Point(0, 1), box.bottom));
    } else {
      // horiz
      a = line.intersectionLine(new Line(new Point(1, 0), box.left));
      b = line.intersectionLine(new Line(new Point(1, 0), box.right));
    }
    drawSegment(a, b, style);
  }

  public function drawPath(path : Path, ?stroke : StrokeStyle, ?fill : FillStyle)
    path.pluck(drawSpline(_, stroke, fill));

  public function drawSpline(spline : Spline, ?stroke : StrokeStyle, ?fill : FillStyle)
    g.wrap(stroke, fill, function() {
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

  public inline function lineTo(point : Point)
    g.lineTo(point);

  public inline function curveTo(point : Point, cout : Null<Point>, cin : Null<Point>)
    g.curveTo(point, cout, cin);

  public inline function moveTo(point : Point)
    g.moveTo(point);

  public inline function applyStrokeStyle(style : StrokeStyle)
    g.applyStrokeStyle(style);

  public inline function applyFillStyle(style : FillStyle)
    g.applyFillStyle(style);
}