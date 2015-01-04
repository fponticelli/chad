import chad.render.CanvasGraphics;
import chad.render.IGraphics;
import chad.render.Render;

class Canvas {
  public static function main() {
    sample("simple", function(g) {
      g.begin();
      g.moveTo(10, 10);
      g.lineTo(100, 100);
      g.lineTo(190, 10);
      g.lineTo(10, 10);
      g.stroke();
    });
  }

  static function sample(name : String, width = 200, height = 200, callback : IGraphics -> Void) {
    var canvas = new MiniCanvas(width, height),
        g = new CanvasGraphics(canvas.canvas);
    callback(g);
    canvas.display(name);
  }
}