package chad.csg;

import chad.geom.Polygon;

class Node {
	var polygons : Array<Polygon>;

	public var front(default, null) : Node;
	public var back(default, null) : Node;

	public static var empty(default, null) : Node = new Node([], null, null);

	public static function build(polygons : Array<Polygon>) {
		if(polygons.length == 0)
			return null;

		var plane     = polygons[0].plane,
			front     = [],
			back      = [],
			npolygons = [],
			result;
		for(polygon in polygons) {
			result = plane.splitPolygon(polygon);
			npolygons = npolygons.concat(result[0]).concat(result[1]);
			front = front.concat(result[2]);
			back = back.concat(result[3]);
		}
		return new Node(npolygons, build(front), build(back));
	}

	// please ensure polygons is unmutable and not null
	private function new(polygons : Array<Polygon>, front : Node, back : Node) {
		this.polygons = polygons;
		this.front = front;
		this.back = back;
	}

	public function invert() {
		return new Node(
			polygons.map(function(polygon) return polygon.flip()),
			null == back ? null : back.invert(),
			null == front ? null : front.invert()
		);
	}

	public function clipPolygons(polygons : Array<Polygon>) : Array<Polygon> {
		//if (!this.plane) return polygons.slice();
		if(this.polygons.length == 0) return polygons;
		var plane = this.polygons[0].plane,
			front = [],
			back  = [],
			result;
		for(polygon in polygons) {
			result = plane.splitPolygon(polygon);
			front = front.concat(result[0]).concat(result[2]);
			back = back.concat(result[1]).concat(result[3]);
		}
		if(null != this.front)
			front = this.front.clipPolygons(front);
		if(null != this.back)
			back = this.back.clipPolygons(back);
		else
			back = [];
		return front.concat(back);
	}

	public function clipTo(other : Node) {
		return new Node(
			other.clipPolygons(polygons),
			null == front ? null : front.clipTo(other),
			null == back ? null : back.clipTo(other)
		);
	}

	public function iterator()
		return polygons.iterator();

	public function all() : Array<Polygon>
		return polygons
			.concat(null == front ? [] : front.all())
			.concat(null == back ? [] : back.all());

	public function toString()
		return 'Node [length: ${all().length}, front: ${null == front}, back: ${null == back}]';
}