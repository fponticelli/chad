package chad.systems;

import js.html.svg.SVGElement;
import js.html.svg.CircleElement;
import thx.geom.d2.Circle;
import edge.Entity;
import edge.View;
using chad.components.LineStyle;

class RenderCircle implements edge.ISystem {
  // TODO, remove and add Layer
  var svg : SVGElement;
  var map : Map<Circle, CircleElement>;
  public function new(svg : SVGElement) {
    this.svg = svg;
    this.map = new Map();
  }

  var lineStyled : View<{ circle : Circle, style : LineStyle }>;

  public function lineStyledAdded(entity : Entity, data : { circle : Circle, style : LineStyle }) {
    var circle : CircleElement = cast svg.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "circle");
    data.style.applyTo(circle);
    map.set(data.circle, circle);
    svg.appendChild(circle);
  }

  public function lineStyledRemoved(entity : Entity, data : { circle : Circle, style : LineStyle }) {
    var circle = map.get(data.circle);
    svg.removeChild(circle);
    map.remove(data.circle);
  }

  // TODO add Layer
  function update(circle : Circle) {
    var c = map.get(circle);
    c.setAttribute("cx", ""+circle.x);
    c.setAttribute("cy", ""+circle.y);
    c.setAttribute("r",  ""+(circle.radius : Float));
  }
}
