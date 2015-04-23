package chad.systems;

import js.html.svg.SVGElement;
import js.html.svg.GElement;
import edge.Entity;
import edge.View;
import chad.components.Layer;

class LayerGroupProvider implements edge.ISystem {
  // TODO, remove and add Layer
  var svg : SVGElement;
  public function new(svg : SVGElement) {
    this.svg = svg;
  }

  public function updateAdded(entity : Entity, data : { layer : Layer }) {
    var g : GElement = cast svg.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "g");
    data.layer.group = g;
    svg.appendChild(g);
  }

  public function updateRemoved(entity : Entity, data : { layer : Layer }) {
    svg.removeChild(data.layer.group);
    data.layer.group = null;
  }

  function update(layer : Layer) { }
}
