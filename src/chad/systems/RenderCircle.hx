package chad.systems;

import js.html.svg.SVGElement;
import js.html.svg.CircleElement;
import thx.geom.d2.Circle;
import edge.Entity;
using chad.components.Style;

class RenderCircle implements edge.ISystem {
  // TODO, remove and add Layer
  var svg : SVGElement;
  var map : Map<Circle, CircleElement>;
  public function new(svg : SVGElement) {
    this.svg = svg;
    this.map = new Map();
  }

  public function updateAdded(entity : Entity, data : { circle : Circle, style : Style }) {
    var circle : CircleElement = cast svg.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "circle");
    data.style.applyTo(circle);
    map.set(data.circle, circle);
    svg.appendChild(circle);
  }

  public function updateRemoved(entity : Entity, data : { circle : Circle, style : Style }) {
    var circle = map.get(data.circle);
    svg.removeChild(circle);
    map.remove(data.circle);
  }

  // TODO add Layer and Style
  function update(circle : Circle, style : Style) {
    var c = map.get(circle);
    c.setAttribute("cx", ""+circle.x);
    c.setAttribute("cy", ""+circle.y);
    c.setAttribute("r",  ""+(circle.radius : Float));
  }
}
