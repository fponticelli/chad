package chad.components;

class Layer implements edge.IComponent {
  var group : js.html.svg.GElement;

  public function new(group : js.html.svg.GElement)
    this.group = group;

  public static function createFromSvg(svg : js.html.svg.SVGElement) {
    var g : js.html.svg.GElement = cast svg.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "g");
    svg.appendChild(g);
    return new Layer(g);
  }
}
