package chad.systems;

import js.html.svg.SVGElement;
import js.html.svg.PathElement;
import thx.geom.d2.Path;
import edge.Entity;
import edge.View;
using chad.components.LineStyle;
import chad.components.*;

class RenderPath implements edge.ISystem {
  var map : Map<Path, PathElement>;
  public function new() {
    this.map = new Map();
  }

  public function updateAdded(entity : Entity, data : { path : Path, style : LineStyle, layer : Layer }) {
    var path : PathElement = cast data.layer.group.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "path");
    data.style.applyTo(path);
    map.set(data.path, path);
    data.layer.group.appendChild(path);
  }

  public function updateRemoved(entity : Entity, data : { path : Path, style : LineStyle, layer : Layer }) {
    var path = map.get(data.path);
    data.layer.group.removeChild(path);
    map.remove(data.path);
  }

  function update(path : Path, style : LineStyle, layer : Layer) {
    var c = map.get(path);
    c.setAttribute("d", ""+path.toSVGPath());
  }
}
