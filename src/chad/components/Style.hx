package chad.components;

import thx.color.RGB;

enum Style {
  ConstructionLine;
  SolidStroke(color : RGB, ?width : Float, ?alpha : Float);
  Selected;
}
