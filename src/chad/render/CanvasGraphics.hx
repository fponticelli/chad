package chad.render;

import thx.color.RGBXA;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;

class CanvasGraphics implements IGraphics {
  public var canvas(default, null) : CanvasElement;
  public var ctx(default, null) : CanvasRenderingContext2D;
  public function new(canvas : CanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext2d();
  }

  public function begin()
    ctx.beginPath();

  public function curveTo(coutx : Float, couty : Float, cinx : Float, ciny : Float, x : Float, y : Float)
    ctx.bezierCurveTo(coutx, couty, cinx, ciny, x, y);

  public function lineTo(x : Float, y : Float)
    ctx.lineTo(x, y);

  public function moveTo(x : Float, y : Float)
    ctx.moveTo(x, y);

  public function fill(?fillStyle : FillStyle) {
    switch fillStyle {
      case FillColor(color):
        ctx.fillStyle = color.toCSS3();
      case null: // do nothing
    }
    ctx.fill();
  }


  public function stroke(?width : Float, ?color : RGBXA, ?join : Join, ?cap : Cap, ?strokeStyle : StrokeStyle) {
    if(null != width)
      ctx.lineWidth = width;
    if(null != color)
      ctx.strokeStyle = color.toCSS3();
    if(null != join)
      ctx.lineJoin = join;
    if(null != cap)
      ctx.lineCap = cap;

    switch strokeStyle {
      case Solid:
        ctx.setLineDash([]);
      case Dashed(pattern):
        ctx.setLineDash(pattern);
      case Dotted(interval):
        ctx.setLineDash([1, interval]);
      case null: // do nothing
    }
    ctx.stroke();
  }
}