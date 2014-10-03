package chad.render.openfl;

import thx.geom.Matrix4x4;
import thx.geom.Point;
import thx.geom.Point3D;
import thx.geom.shape.Box;
import openfl.display.Graphics;
import openfl.display.Sprite;
import thx.color.RGBA;

class OpenFLGraphics implements IGraphics {
  var ctx : Graphics;
  var matrix : Matrix4x4;
  public var weightScale(default, null) : Float -> Float;
  public var width(default, null) : Float;
  public var height(default, null) : Float;
  public var reverseCoords(get, null) : Box;

  var latest : Point;
  var defaultStroke : StrokeStyle;
  var defaultFill : FillStyle;
  public function new(sprite : Sprite, width : Int, height : Int, ?matrix : Matrix4x4, ?weightScale : Float -> Float) {
    this.width = width;
    this.height = height;
    this.ctx = sprite.graphics;

    this.weightScale = null == weightScale ? function(v) return v : weightScale;

    var halfPixel  = Matrix4x4.translation(new Point3D(0.5, 0.5, 1)),
        mirror     = Matrix4x4.mirrorY(),
        translateY = Matrix4x4.translation(new Point3D(0, height, 0)),
        correctionMatrix = Matrix4x4.identity
          .multiply(halfPixel)
          .multiply(mirror)
          .multiply(translateY);

    this.matrix = (null == matrix ? Matrix4x4.identity : matrix).multiply(correctionMatrix);
    defaultStroke = StrokeLine(new LineStyle(1, "#000"));
    defaultFill = FillColor("#0000");

    applyStrokeStyle(defaultStroke);
    applyFillStyle(defaultFill);
  }

  function t(p : Point)
    return p.transform(matrix);

  public function wrap(?stroke : StrokeStyle, ?fill : FillStyle, f : Void -> Void) {
    var hasStyle = null != fill || null != stroke;
    applyStrokeStyle(defaultStroke);
    //applyFillStyle(defaultFill);
    if(null != stroke)
      applyStrokeStyle(stroke);
    if(null != fill)
      applyFillStyle(fill);
    f();
    ctx.endFill();
  }

  public inline function lineTo(point : Point) {
    point = t(point);
    ctx.lineTo(point.x, point.y);
    latest = point;
  }

  public inline function curveTo(point : Point, cout : Null<Point>, cin : Null<Point>) {
    point = t(point);
    cout  = t(cout);
    cin   = t(cin);
    var edge = new thx.geom.EdgeCubic(latest, cout, cin, point);
    edge.linearSegments.map(function(segment) {
      ctx.lineTo(segment.last.x, segment.last.y);
    });
    latest = point;
  }

  public inline function moveTo(point : Point) {
    point = t(point);
    ctx.moveTo(point.x, point.y);
    latest = point;
  }

  function applyLineStyle(style : LineStyle) {
    if(null == style)
      return;
    ctx.lineStyle(
      weightScale(style.width),
      style.color.toRGB(),
      style.color.alpha / 255/*, // alpha
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
        ctx.beginFill(c.toRGB(), c.alpha / 255);
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