package chad.geom;

import chad.geom.Vertex2D;

class Side
{
	public var start(default, null) : Vertex2D;
	public var end(default, null) : Vertex2D;
	@:isVar public var lengthSquared(get, null) : Float;
	@:isVar public var length(get, null) : Float;
	public function new(start : Vertex2D, end : Vertex2D)
	{
		this.start = start;
		this.end = end;
	}

	public function intersects(other : Side)
	{
		if(start.equals(other.end) || end.equals(other.start)
		{
			if(other.end
				.subtract(other.start).normalize()
				.plus(end.minus(start).normalize())
				.length < Const.EPSILON)
			{
				return true;
			}
		} else {
			var d0 = end.subtract(start),
				d0 = other.end.subtract(other.start);
			if(Math.abs(d0.cross(d1)) < 1e-9)
				return false; // lines are parallel
			var alphas = CSG.solve2Linear(-d0.x, d1.x, -d0.y, d1.y, start.x - other.start.x, start.y - other.start.y);
			if((alphas[0] > 1e-6) &&
				(alphas[0] < 0.999999) &&
				(alphas[1] > 1e-5) &&
				(alphas[1] < 0.999999))
			{
				return true;
			}
		}
		return false;
	}

	public inline function isLinear()
		return start.normal.isZero() && end.normal.isZero();

	// TODO add normals to Vertex2D and apply them here
	public function toPolygon(z0 : Float, z1 : Float)
	{
		return new Polygon([
			new Vertex3D(start.position.toVector3D(z0),
			new Vertex3D(end.position.toVector3D(z0),
			new Vertex3D(end.position.toVector3D(z1),
			new Vertex3D(start.position.toVector3D(z1)
		]);
	}

	public function transform(matrix : Matrix4x4)
	{
		return new Side(
			new Vertex2D(start.position.transform(matrix)),
			new Vertex2D(end.position.transform(matrix))
		);
	}

	inline public function flip()
		return new Side(end, start);

	inline public function direction()
		return end.position.subtract(start.position);

	private function get_lengthSquared()
	{
		if(null != lengthSquared)
			return lengthSquared;
		var w = end.position.x - start.position.x,
			h = end.position.y - start.position.y;
		return w * w + h * h;
	}

	private function get_length()
		return Math.sqrt(lengthSquared);

	public function toString()
		return 'Side (${start.toString()} -> ${end.toString()})';
}