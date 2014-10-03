package chad.render;

enum StrokeStyle {
  StrokeLine(style : LineStyle);
  StrokeDash(pattern : Array<Float>, ?style : LineStyle);
  StrokeDot(spacing : Float, ?style : LineStyle);
}