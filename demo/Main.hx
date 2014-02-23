import chad.csg.Solid;

import chad.export.ThreeJS;

class Main {
	static function main() {
		untyped __js__("(window || {})").Main = Main;
	}

	public static function geom() {
		var cube = Solid.box(-0.5, 1.0)
					.union(Solid.box(0.1, 1.0))
					.subtract(Solid.box(-1.1, 1.0));
		return ThreeJS.toModel(cube);
	}
}