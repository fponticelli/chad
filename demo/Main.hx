import chad.csg.*;

import chad.export.ThreeJS;

class Main {
	static function main() {
		untyped __js__("(window || {})").Main = Main;
	}

	public static function geom() {
		return ThreeJS.toModel(
			Box.create(-0.5, 1.0)
				.union(Box.create(0.1, 1.0))
				.subtract(Box.create(-1.1, 1.0))
				.intersect(Sphere.create(0.0, 0.7))
		);
	}
}