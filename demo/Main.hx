import chad.csg.*;
import chad.csg.Solids;
import chad.*;

import chad.export.ThreeJS;

class Main {
	static function main()
		untyped __js__("(window || {})").Main = Main;

	public static function geom() {
		return ThreeJS.toModel(
			Solids.box([-0.5,-0.5,-0.5], [1.0,1.0,1.0])
				.union(Solids.box([0.1,0.1,0.1], [1.0,1.0,1.0]))
				.subtract(Solids.box([-1.1,-1.1,-1.1], [1.0,1.0,1.0]))
				.intersect(Solids.sphere([0.0,0.0,0.0], 0.7))
				.subtract(Solids.sphere([0.5,0.5,0.5], 0.35))
				.subtract(Solids.cylinder([0.0,0.0,-0.95], [0.0,0.0,0.95], 0.25))
				.subtract(Solids.cylinder([0.0,-0.95,0.0], [0.0,0.95,0.0], 0.35))
				.subtract(Solids.cylinder([-0.95,0.0,0.0], [0.95,0.0,0.0], 0.15))
		);
	}
}