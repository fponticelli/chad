package chad.systems;

import js.html.svg.SVGElement;
import js.html.svg.RectElement;
import thx.geom.d2.*;
import edge.Entity;
import edge.View;
using chad.components.LineStyle;
using chad.components.Style;
import chad.components.*;
using thx.Arrays;
using thx.Iterables;

class RenderSelected implements edge.ISystem {
  var map : Map<IShape, RectElement>;
  var layer : Layer;
  public function new(layer : Layer) {
    this.map = new Map();
    this.layer = layer;
  }

  public function updateAdded(entity : Entity, data : { shape : IShape }) {
    var rect : RectElement = cast layer.group.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "rect");
    map.set(data.shape, rect);
    Style.Selected.apply(rect);
    layer.group.appendChild(rect);
  }

  public function updateRemoved(entity : Entity, data : { shape : IShape }) {
    var rect = map.get(data.shape);
    layer.group.removeChild(rect);
    map.remove(data.shape);
  }

  function update(shape : IShape) {
    var rect = map.get(shape);
    rect.setAttribute("width",  '${shape.box.size.width}');
    rect.setAttribute("height", '${shape.box.size.height}');
    rect.setAttribute("x", '${shape.box.position.x}');
    rect.setAttribute("y", '${shape.box.position.y}');
  }
}
