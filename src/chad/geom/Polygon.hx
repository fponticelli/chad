package chad.geom;

import thx.geom.Vertex3D;

class Polygon
{
	@:isVar public var plane(get, null) : Plane;

	var vertices : Array<Vertex3D>;

	// please ensure that vertices is not mutable
	public function new(vertices : Array<Vertex3D>) {
		this.vertices = vertices;
	}

	public static function fromVertices(vertices : Iterable<Vertex3D>) {
		if(Std.is(vertices, Array)) {
			return new Polygon(cast(vertices).copy());
		} else {
			return new Polygon([for(v in vertices) v]);
		}
	}

	public function flip() {
		var reverse = vertices.copy();
		reverse.reverse();
		return new Polygon(
			reverse.map(function(v) return v.flip())
		);
	}

	inline public function iterator()
		return vertices.iterator();

	inline public function all()
		return vertices.copy();

	function get_plane()
		return null == plane ? plane = Plane.fromPoints(vertices[0].position, vertices[1].position, vertices[2].position) : plane;
}