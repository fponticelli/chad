package chad.csg;

import chad.geom.Polygon;
import chad.geom.Vector3;
import chad.geom.Vertex3;

class Box {
	static var baseCube = [
		{ p : [0, 4, 6, 2], n : [-1.0, 0.0, 0.0] },
		{ p : [1, 3, 7, 5], n : [ 1.0, 0.0, 0.0] },
		{ p : [0, 1, 5, 4], n : [0.0, -1.0, 0.0] },
		{ p : [2, 6, 7, 3], n : [0.0,  1.0, 0.0] },
		{ p : [0, 2, 3, 1], n : [0.0, 0.0, -1.0] },
		{ p : [4, 5, 7, 6], n : [0.0, 0.0,  1.0] }
	];

	public static function create(position : Vector3, size : Vector3) {
		return Solid.fromPolygons(
			baseCube.map(function(info) {
				return new Polygon(info.p.map(function(i) {
					var pos = new Vector3(
						position.x + size.x * ((i & 1 != 0) ? 1 : 0),
						position.y + size.y * ((i & 2 != 0) ? 1 : 0),
						position.z + size.z * ((i & 4 != 0) ? 1 : 0)
					);
					return new Vertex3(pos, Vector3.fromArray(info.n));
				}));
			})
		);
	}
}