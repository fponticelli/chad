import thx.geom.d2.*;
import thx.geom.shape.*;
using thx.geom.Transformable;
import thx.math.Const;
import thx.unit.angle.Degree;
import chad.render.*;
import chad.render.canvas.MiniCanvasGraphics;
import thx.color.*;

class Boolean {
  public static function main() {
    create("squares", 120, 120, function(render) {
      var sq1 = new Box(Point.create(10, 10), Point.create(100, 100)),
          sq2 = new Box(Point.create(0, 0), Point.create(70, 70));

      render.drawPath(
        sq1.toPath()
          .difference(
            sq2.toSpline()
              .rotateZ((45 : Degree).toRadian())
              .translateX(30)
              .toPath()
          )
      );
    });
  }

  public static function create(title, w, h, handler) {
    MiniCanvas.displayGenerationTime = true;

    var mini = new MiniCanvas(w, h),
        graphics = new MiniCanvasGraphics(mini);
    var render = new Render(graphics);
    handler(render);
    mini.display(title);
  }
}