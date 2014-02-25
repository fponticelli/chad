package chad.csg;

import chad.geom.Polygon;

class Solid {
	static var baseCube = [
		{ p : [0, 4, 6, 2], n : [-1.0, 0.0, 0.0] },
		{ p : [1, 3, 7, 5], n : [ 1.0, 0.0, 0.0] },
		{ p : [0, 1, 5, 4], n : [0.0, -1.0, 0.0] },
		{ p : [2, 6, 7, 3], n : [0.0,  1.0, 0.0] },
		{ p : [0, 2, 3, 1], n : [0.0, 0.0, -1.0] },
		{ p : [4, 5, 7, 6], n : [0.0, 0.0,  1.0] }
	];

	var polygons : Array<Polygon>;

	private function new() {}

	public static function fromPolygons(polygons : Array<Polygon>)
	{
		var solid = new Solid();
		solid.polygons = polygons;
		return solid;
	}

	public function union(other : Solid)
	{
		var a = new Node(polygons.copy()),
			b = new Node(other.polygons.copy());

		a.clipTo(b);
		b.clipTo(a);
		b.invert();
		b.clipTo(a);
		b.invert();
		a.build(b.all());

		return fromPolygons(a.all());
	}

	public function subtract(other : Solid)
	{
		var a = new Node(polygons.copy()),
			b = new Node(other.polygons.copy());

		a.invert();
		a.clipTo(b);
		b.clipTo(a);
		b.invert();
		b.clipTo(a);
		b.invert();
		a.build(b.all());
		a.invert();

		return fromPolygons(a.all());
	}

	public function intersect(other : Solid)
	{
		var a = new Node(polygons.copy()),
			b = new Node(other.polygons.copy());

		a.invert();
		b.clipTo(a);
		b.invert();
		a.clipTo(b);
		b.clipTo(a);
		a.build(b.all());
		a.invert();

		return fromPolygons(a.all());
	}

	public function iterator()
		return polygons.iterator();

	public function toString()
		return 'Solid [${polygons.length}]';
}