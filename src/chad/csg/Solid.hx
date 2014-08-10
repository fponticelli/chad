package chad.csg;

import thx.geom.Polygon;

class Solid
{
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