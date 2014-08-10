package chad.geom;

import thx.geom.Point;
import thx.geom.Matrix4x4;

class Line2D
{
	public static function fromPoints(p1 : Point, p2 : Point)
	{
		var direction = p2 - p1,
			normal = direction.normal().negate().normalize(),
			w = p1.dot(normal);
		return new Line2D(normal, w);
	}

	public var normal(default, null) : Point;
	public var w(default, null) : Float;

	public function new(normal : Point, w : Float)
	{
		var l = normal.length;
		this.w = w * l;
		this.normal = normal.divide(l);
	}

	public function reverse()
		return new Line2D(normal.negate(), -w);

	public function equals(other : Line2D)
		return normal.equals(other.normal) && w == other.w;

	public function origin()
		return normal.multiply(w);

	public function direction()
		return normal.normal();

	// (py == y) && (normal * p == w)
	// -> px = (w - normal._y * y) / normal.x
	public function xAtY(y : Float)
		return (w - normal.y * y) / normal.x;

	public function absDistanceToPoint(point : Point)
		return Math.abs(point.dot(normal) - w);

	// intersection between two lines, returns point as Point
	public function intersectWithLine(line2d : Line2D)
		return Util.solve2Linear(normal.x, normal.y, line2d.normal.x, line2d.normal.y, w, line2d.w);

	public function transform(matrix : Matrix4x4)
	{
		var origin = new Point(0, 0),
			pointOnPlane = normal.multiply(w),
			neworigin = origin.transform(matrix),
			neworiginPlusNormal = normal.transform(matrix),
			newnormal = neworiginPlusNormal - neworigin,
			newpointOnPlane = pointOnPlane.transform(matrix),
			neww = newnormal.dot(newpointOnPlane);
		return new Line2D(newnormal, neww);
	}
}