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

class RenderSelected implements edge.ISystem {
  static var size = 8;
  var map : Map<IShape, Array<RectElement>>;
  var layer : Layer;
  public function new(layer : Layer) {
    this.map = new Map();
    this.layer = layer;
  }

  public function updateAdded(entity : Entity, data : { shape : IShape }) {
    var points = data.shape.anchors,
        rects = points.map(function(point) {
          var rect : RectElement = cast layer.group.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "rect");
          rect.setAttribute("width", '$size');
          rect.setAttribute("height", '$size');
          Style.Selected.apply(rect);
          layer.group.appendChild(rect);
          return rect;
        });
    map.set(data.shape, rects);
  }

  public function updateRemoved(entity : Entity, data : { shape : IShape }) {
    var rects = map.get(data.shape);
    rects.map(layer.group.removeChild);
    map.remove(data.shape);
  }

  function update(shape : IShape) {
    var rs = map.get(shape);
    rs.zip(shape.anchors).map(function(t) {
      t.left.setAttribute("x", ""+(t.right.x - size / 2));
      t.left.setAttribute("y", ""+(t.right.y - size / 2));
    });
  }
}
