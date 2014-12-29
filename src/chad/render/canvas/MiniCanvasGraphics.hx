package chad.render.canvas;

import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;

import thx.geom.Matrix4x4;
import thx.geom.Point;
import thx.geom.Point3D;
import thx.geom.shape.Box;

class MiniCanvasGraphics implements IGraphics {
  var mini : MiniCanvas;
  var ctx : CanvasRenderingContext2D;
  var matrix : Matrix4x4;
  public var weightScale(default, null) : Float -> Float;
  public var reverseCoords(get, null) : Box;
  public function new(mini : MiniCanvas, ?weightScale : Float -> Float) {
    this.weightScale = null == weightScale ? function(x) return x : weightScale;
    this.mini = mini;
    this.ctx = mini.ctx;
    var halfPixel  = Matrix4x4.translation(new Point3D(0.5, 0.5, 1)),
        mirror     = Matrix4x4.mirrorY(),
        translateY = Matrix4x4.translation(new Point3D(0, mini.height, 0)),
        correctionMatrix = Matrix4x4.identity
          .multiply(halfPixel)
          .multiply(mirror)
          .multiply(translateY);

    matrix = correctionMatrix;

    ctx.transform(
      matrix.at(0),  //m11
      matrix.at(1),  //m12
      matrix.at(4),  //m21
      matrix.at(5),  //m22
      matrix.at(12), //dx
      matrix.at(13)  //dy
    );
  }

  public function wrap(?stroke : StrokeStyle, ?fill : FillStyle, f : Void -> Void) {
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

  public inline function lineTo(point : Point)
    ctx.lineTo(point.x, point.y);

  public inline function curveTo(point : Point, cout : Null<Point>, cin : Null<Point>)
    ctx.bezierCurveTo(cout.x, cout.y, cin.x, cin.y, point.x, point.y);

  public inline function moveTo(point : Point)
    ctx.moveTo(point.x, point.y);

  function applyLineStyle(style : LineStyle) {
    if(null == style)
      return;
    ctx.lineWidth = weightScale(style.width);
    trace(ctx.lineWidth);
    ctx.lineCap = cast style.cap;
    ctx.lineJoin = cast style.join;
    ctx.strokeStyle = style.color.toCSS3();
  }

  public function applyStrokeStyle(style : StrokeStyle)
    switch style {
      case StrokeLine(style):
        applyLineStyle(style);
        ctx.setLineDash([]);
      case StrokeDash(pattern, style):
        applyLineStyle(style);
        ctx.setLineDash(pattern.map(weightScale));
      case StrokeDot(spacing, style):
        applyLineStyle(style);
        ctx.setLineDash([ctx.lineWidth, weightScale(spacing)]);
    };

  public function applyFillStyle(style : FillStyle)
    switch style {
      case FillColor(c):
        ctx.fillStyle = c.toCSS3();
    };

  function get_reverseCoords() {
    if(null == reverseCoords) {
      var inverted = matrix.inverse();
      if(null == inverted) throw "unable to inverse coords matrix";
      reverseCoords = new Box(Point.zero, new Point(mini.width, mini.height)).transform(inverted);
    }
    return reverseCoords;
  }
}