package chad.render;

import thx.geom.Point;
import thx.geom.shape.Box;

interface IGraphics {
	public var weightScale(default, null) : Float -> Float;
	public var reverseCoords(get, null) : Box;
	public function wrap(?stroke : StrokeStyle, ?fill : FillStyle, f : Void -> Void) : Void;
	public function lineTo(point : Point) : Void;
	public function curveTo(point : Point, cout : Null<Point>, cin : Null<Point>) : Void;
	public function moveTo(point : Point) : Void;
	public function applyStrokeStyle(style : StrokeStyle) : Void;
	public function applyFillStyle(style : FillStyle) : Void;
}