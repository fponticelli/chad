package chad.geom;

import chad.geom.Vertex2D;

class Side
{
	public var vertex0(default, null) : Vertex2D;
	public var vertex1(default, null) : Vertex2D;
	public var length(get, null) : Float;
	public function new(vertex0 : Vertex2D, vertex1 : Vertex2D)
	{
		this.vertex0 = vertex0;
		this.vertex1 = vertex1;
	}

	public function intersects(other : Side)
	{
		if(vertex0.equals(other.vertex1) || vertex1.equals(other.vertex0)
		{
			if(other.vertex1
				.subtract(other.vertex0).normalize()
				.plus(vertex1.minus(vertex0).normalize())
				.length < Const.EPSILON)
			{
				return true;
			}
		} else {
			var d0 = vertex1.subtract(vertex0),
				d0 = other.vertex1.subtract(other.vertex0);
			if(Math.abs(d0.cross(d1)) < 1e-9)
				return false; // lines are parallel
			var alphas = CSG.solve2Linear(-d0.x, d1.x, -d0.y, d1.y, vertex0.x - other.vertex0.x, vertex0.y - other.vertex0.y);
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

	// TODO add normals to Vertex2D and apply them here
	public function toPolygon(z0 : Float, z1 : Float)
	{
		return new Polygon([
			new Vertex3D(vertex0.position.toVector3D(z0),
			new Vertex3D(vertex1.position.toVector3D(z0),
			new Vertex3D(vertex1.position.toVector3D(z1),
			new Vertex3D(vertex0.position.toVector3D(z1)
		]);
	}

	public function transform(matrix : Matrix4x4)
	{
		return new Side(
			new Vertex2D(vertex0.position.transform(matrix)),
			new Vertex2D(vertex1.position.transform(matrix))
		);
	}

	inline public function flip()
		return new Side(vertex1, vertex0);

	inline public function direction()
		return vertex1.position.subtract(vertex0.position);

	public function lengthSquared()
	{
		var w = vertex1.position.x - vertex0.position.x,
			h = vertex1.position.y - vertex0.position.y;
		return w * w + h * h;
	}

	inline private function get_length()
		return Math.sqrt(lengthSquared());

	public function toString()
		return 'Side (${vertex0.toString()} -> ${vertex1.toString()})';
}