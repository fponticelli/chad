package chad.geom;

class Line3D
{
	public static function fromPoints(p1 : Vector3D, p2 : Vector3D)
		return new Line3D(p1, p2.subtract(p1).normalize());

	public static function fromPlanes(p1 : Plane, p2 : Plane)
	{
		var direction = p1.normal.cross(p2.normal),
			l = direction.length;
		if(l < 1e-10)
			throw "Parallel planes";

		direction = direction.multiply(1.0 / l);

		var mabsx = Math.abs(direction.x),
			mabsy = Math.abs(direction.y),
			mabsz = Math.abs(direction.z),
			origin;
		if((mabsx >= mabsy) && (mabsx >= mabsz))
		{
			// direction vector is mostly pointing towards x
			// find a point p for which x is zero:
			var r = Util.solve2Linear(p1.normal.y, p1.normal.z, p2.normal.y, p2.normal.z, p1.w, p2.w);
			origin = new Vector3D(0, r[0], r[1]);
		} else if((mabsy >= mabsx) && (mabsy >= mabsz))
		{
			// find a point p for which y is zero:
			var r = Util.solve2Linear(p1.normal.x, p1.normal.z, p2.normal.x, p2.normal.z, p1.w, p2.w);
			origin = new Vector3D(r[0], 0, r[1]);
		} else {
			// find a point p for which z is zero:
			var r = Util.solve2Linear(p1.normal.x, p1.normal.y, p2.normal.x, p2.normal.y, p1.w, p2.w);
			origin = new Vector3D(r[0], r[1], 0);
		}
		return new Line3D(origin, direction);
	}

	public var point(default, null) : Vector3D;
	public var direction(default, null) : Vector3D;

	public function new(point : Vector3D, direction : Vector3D)
	{
		this.point = point;
		this.direction = direction.normalize();
	}

	// plane: plane.normal * p = plane.w
	// line: p=line.point + lambda * line.direction
	public function intersectWithPlane(plane : Plane)
	{
		var lambda = (plane.w - plane.normal.dot(this.point)) / plane.normal.dot(direction);
		return point.add(direction.multiply(lambda));
	}

	public function reverse()
		return new Line3D(point, direction.negate());

	public function transform(matrix4x4)
	{
		var newpoint = point.multiply4x4(matrix4x4),
			pointaddDirection = point.add(direction),
			newPointaddDirection = pointaddDirection.multiply4x4(matrix4x4),
			newdirection = newPointaddDirection.subtract(newpoint);
		return new Line3D(newpoint, newdirection);
	}

	public function closestPointOnLine(point : Vector3D)
	{
		var t = point.subtract(point).dot(direction) / direction.dot(this.direction);
		return point.add(direction.multiply(t));
	}

	public function distanceToPoint(point : Vector3D)
	{
		var closestpoint = closestPointOnLine(point),
			distancevector = point.subtract(closestpoint);
		return distancevector.length;
	}

	public function equals(line : Line3D)
	{
		if(!direction.equals(line.direction))
			return false;
		return distanceToPoint(line.point) <= 1e-8;
	}
}