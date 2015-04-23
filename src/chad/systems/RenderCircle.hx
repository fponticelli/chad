package chad.systems;

import js.html.svg.SVGElement;
import js.html.svg.CircleElement;
import thx.geom.d2.Circle;
import edge.Entity;
import edge.View;
using chad.components.LineStyle;
import chad.components.Layer;

class RenderCircle implements edge.ISystem {
  var map : Map<Circle, CircleElement>;
  public function new() {
    this.map = new Map();
  }

  public function updateAdded(entity : Entity, data : { circle : Circle, style : LineStyle, layer : Layer }) {
    var circle : CircleElement = cast data.layer.group.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "circle");
    data.style.applyTo(circle);
    map.set(data.circle, circle);
    data.layer.group.appendChild(circle);
  }

  public function updateRemoved(entity : Entity, data : { circle : Circle, style : LineStyle, layer : Layer }) {
    var circle = map.get(data.circle);
    data.layer.group.removeChild(circle);
    map.remove(data.circle);
  }

  // TODO add Layer
  function update(circle : Circle, style : LineStyle, layer : Layer) {
    var c = map.get(circle);
    c.setAttribute("cx", ""+circle.x);
    c.setAttribute("cy", ""+circle.y);
    c.setAttribute("r",  ""+(circle.radius : Float));
  }
}
