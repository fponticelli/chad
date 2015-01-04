package chad.render;

enum StrokeStyle {
  Solid;
  Dashed(pattern : Array<Float>);
  Dotted(spacing : Float);
}