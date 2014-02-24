package chad.geom;

class Polygon {
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
			var nvertices = [];
			for(v in vertices) {
				nvertices.push(v);
			}
			return new Polygon(nvertices);
		}
	}

	public function flip() {
		var reverse = vertices.copy();
		reverse.reverse();
		return new Polygon(
			reverse.map(function(v) return v.flip())
		);
	}

	public function iterator()
		return vertices.iterator();

	public function all()
		return vertices.copy();

	function get_plane()
		return null == plane ? plane = Plane.fromPoints(vertices[0].position, vertices[1].position, vertices[2].position) : plane;

}