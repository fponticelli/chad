package chad.components;

class LineStyle implements edge.IComponent {
  public static var constructionLine = new LineStyle(ConstructionLine);

  public static function apply(style : Style, node) switch style {
    case ConstructionLine:
      node.setAttribute("fill", "none");
      node.setAttribute("stroke-width", "1");
      node.setAttribute("stroke", "#666666");
      node.setAttribute("stroke-dasharray", "5, 3");
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
