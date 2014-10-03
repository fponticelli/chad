package chad.render;

import thx.color.RGBA;
using thx.core.Defaults;

class LineStyle {
  public  static var defaultColor(default, null) : RGBA = new RGBA(0xFF000000);

  public var width(default, null) : Float;
  public var color(default, null) : RGBA;
  public var join(default, null) : Join;
  public var cap(default, null) : Cap;

  public function new(width = 1.0, ?color : RGBA, join = Join.miter, cap = Cap.butt) {
    this.width = width;
    this.color = color.or(defaultColor);
    this.join = join;
    this.cap = cap;
  }
}