package chad.geom;

class Line2D {
	public static function fromPoints(p1 : Vector2, p2 : Vector2)
	{
		var direction = p2.subtract(p1),
			normal = direction.normal().negate().normalize(),
			w = p1.dot(normal);
		return new Line2D(normal, w);
	}

	public var normal(default, null) : Vector2;
	public var w(default, null) : Float;

	public function new(normal : Vector2, w : Float)
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

	public function absDistanceToPoint(point : Vector2)
		return Math.abs(point.dot(normal) - w);

	// intersection between two lines, returns point as Vector2
	public function intersectWithLine(line2d : Line2D)
		return Util.solve2Linear(normal.x, normal.y, line2d.normal.x, line2d.normal.y, w, line2d.w);

	public function transform(matrix : Matrix4x4)
	{
		var origin = new Vector2(0, 0),
			pointOnPlane = normal.multiply(w),
			neworigin = origin.multiply4x4(matrix),
			neworiginPlusNormal = normal.multiply4x4(matrix),
			newnormal = neworiginPlusNormal.subtract(neworigin),
			newpointOnPlane = pointOnPlane.multiply4x4(matrix),
			neww = newnormal.dot(newpointOnPlane);
		return new Line2D(newnormal, neww);
	}
}