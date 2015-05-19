package chad.components;

import thx.color.Rgb;

enum Style {
  ConstructionLine;
  SolidStroke(color : Rgb, ?width : Float, ?alpha : Float);
  Selected;
}
