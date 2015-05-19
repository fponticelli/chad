package chad;

import edge.World;
import js.html.svg.SVGElement;
import chad.components.*;
import chad.systems.*;
import thx.geom.d2.*;
using thx.Arrays;
using thx.Tuple;
using thx.color.Rgb;
using thx.color.Hsl;
using thx.color.Color;

class Chad {
  var world : World;
  var svg : SVGElement;
  var layers : Array<Tuple2<String, Layer>>;
  var selectedLayer : Layer;

  public function new(svg : SVGElement) {
    this.svg = svg;
    this.layers = [];
    this.selectedLayer = Layer.createFromSvg(svg);
    world = new World(20);
    addSystems();
    // TODO remove
    var layer = addLayer("my layer");
    var p1 = Point.create(60, 60),
        p2 = Point.create(180, 80);
    world.engine.create([
        Circle.fromPoints(p1, p2),
        LineStyle.constructionLine,
        layer,
        Selected.instance
      ]);

    world.engine.create([
        Path.fromSVGPath("M 80 80 A 45 45 0 0 0 125 125 L 125 80 Z M230 80 A 45 45, 0, 1, 0, 275 125 L 275 80 Z M80 230 A 45 45, 0, 0, 1, 125 275 L 125 230 Z M230 230 A 45 45, 0, 1, 1, 275 275 L 275 230 Z"),
        LineStyle.solidStroke(Color.darkblue, 2),
        layer,
        Selected.instance
      ]);
    /*
    var incr = 1;
    thx.Timer.repeat(function() {
      p1.x += incr;
      p2.y += incr;
      if(p1.x > 300)
        incr = -1;
      else if(p1.x < 40)
        incr = 1;
    }, 10);
    */
    // END REMOVE

    world.start();
  }

  public function addLayer(name : String) {
    if(null != getLayer(name))
      throw 'layer "$name" already exists';
    var layer = Layer.createFromSvg(svg);
    // ensure it is always last
    svg.appendChild(selectedLayer.group);
    layers.push(new Tuple2(name, layer));
    return layer;
  }

  public function getLayer(name : String) {
    var t = layers.find(function(t) return t.left == name);
    return null == t ? null : t.right;
  }

  public function addSystems() {
    world.render.add(new RenderCircle());
    world.render.add(new RenderPath());
    world.render.add(new RenderSelected(selectedLayer));
  }
}
