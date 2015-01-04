package chad.render;

import thx.color.RGBXA;

interface IGraphics {
  public function moveTo(x : Float, y : Float) : Void;
  public function lineTo(x : Float, y : Float) : Void;
  public function curveTo(coutx : Float, couty : Float, cinx : Float, ciny : Float, x : Float, y : Float) : Void;
  public function begin() : Void;
  public function fill(?fillStyle : FillStyle) : Void;
  public function stroke(?width : Float, ?color : RGBXA, ?join : Join, ?cap : Cap, ?strokeStyle : StrokeStyle) : Void;
}