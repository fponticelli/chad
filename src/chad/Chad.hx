package chad;

import edge.World;
import js.html.svg.SVGElement;
import chad.components.*;
import chad.systems.*;
import thx.geom.d2.*;

class Chad {
  var world : World;
  var svg : SVGElement;

  public function new(svg : SVGElement) {
    this.svg = svg;
    world = new World(15);
    addSystems();
    // TODO remove
    var p1 = Point.create(60, 60),
        p2 = Point.create(90, 80);
    world.engine.create([
        Circle.fromPoints(p1, p2),
        LineStyle.constructionLine
      ]);
    var incr = 1;
    thx.Timer.repeat(function() {
      p1.x += incr;
      p2.y += incr;
      if(p1.x > 300)
        incr = -1;
      else if(p1.x < 40)
        incr = 1;
    }, 10);
    world.start();
  }

  public function addSystems() {
    world.render.add(new RenderCircle(svg));
  }
}
