package chad.components;

import thx.color.RGB;

class LineStyle implements edge.IComponent {
  public static var constructionLine = new LineStyle(ConstructionLine);
  public static function solidStroke(color : RGB, ?width : Float, ?alpha : Float)
    return new LineStyle(SolidStroke(color, width, alpha));

  public static function apply(style : Style, node) switch style {
    case ConstructionLine:
      node.setAttribute("fill", "none");
      node.setAttribute("stroke-width", "1");
      node.setAttribute("stroke", "#666666");
      node.setAttribute("stroke-dasharray", "5, 3");
    case SolidStroke(color, width, alpha):
      node.setAttribute("fill", "none");
      node.setAttribute("stroke", color.toHex());
      if(null != width)
        node.setAttribute("stroke-width", '$width');
      if(null != alpha)
        node.setAttribute("stroke-opacity", '$alpha');
    case Selected:
      node.setAttribute("fill", "none");
      node.setAttribute("stroke-width", "2");
      node.setAttribute("stroke", "#3366CC");
  }

  public function applyTo(node) {
    apply(value, node);
  }

  public var value(default, null) : Style;

  public function new(value : Style)
    this.value = value;
}
