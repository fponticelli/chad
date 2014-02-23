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

	public static function fromPolygons(polygons : Array<Polygon>) {
		var solid = new Solid();
		solid.polygons = polygons;
		return solid;
	}

	public function union(other : Solid) {
		var a = Node.build(polygons),
			b = Node.build(other.polygons),
			ac = a.clipTo(b),
			bc = b.clipTo(ac),
			bci = bc.invert(),
			bcic = bci.clipTo(ac),
			bcici = bcic.invert();

		return fromPolygons(ac.all().concat(bcici.all()));
	}

	public function subtract(other : Solid) {
		var a = Node.build(polygons),
			b = Node.build(other.polygons),
			ai = a.invert(),
			aic = ai.clipTo(b),
			bc = b.clipTo(aic),
			bci = bc.invert(),
			bcic = bci.clipTo(aic),
			bcici = bcic.invert(),
			n = Node.build(aic.all().concat(bcici.all()));

		return fromPolygons(n.invert().all());
	}

	public function intersect(other : Solid) {
		var a = Node.build(polygons),
			b = Node.build(other.polygons),
			ai = a.invert(),
			bc = b.clipTo(ai),
			bci = bc.invert(),
			aic = ai.clipTo(bci),
			bcic = bci.clipTo(aic),
			n = Node.build(aic.all().concat(bcic.all()));

		return fromPolygons(n.invert().all());
	}

	public function iterator()
		return polygons.iterator();

	public function toString()
		return 'Solid [${polygons.length}]';
}