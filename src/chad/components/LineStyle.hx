package chad.components;

class LineStyle implements edge.IComponent {
  public static var constructionLine = new LineStyle(ConstructionLine);

  public static function applyTo(style : LineStyle, node) switch style.value {
    case ConstructionLine:
      node.setAttribute("fill", "none");
      node.setAttribute("stroke-width", "1");
      node.setAttribute("stroke", "#333333");
      node.setAttribute("stroke-dasharray", "3, 2");
  }

  public var value(default, null) : Style;

  public function new(value : Style)
    this.value = value;
}
