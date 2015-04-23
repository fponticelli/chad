package chad.components;

enum StyleType {
  ConstructionLine;
}

class Style implements edge.IComponent {
  public static var constructionLine = new Style(ConstructionLine);

  public static function applyTo(style : Style, node) switch style.value {
    case ConstructionLine:
      node.setAttribute("fill", "none");
      node.setAttribute("stroke-width", "1");
      node.setAttribute("stroke", "#333333");
      node.setAttribute("stroke-dasharray", "3, 2");
  }

  public var value(default, null) : StyleType;

  public function new(value : StyleType)
    this.value = value;
}
