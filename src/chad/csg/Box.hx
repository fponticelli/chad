package chad.csg;

import chad.geom.Polygon;
import chad.geom.Vector3D;
import chad.geom.Vertex;

class Box {
	static var baseCube = [
		[0, 4, 6, 2],
		[1, 3, 7, 5],
		[0, 1, 5, 4],
		[2, 6, 7, 3],
		[0, 2, 3, 1],
		[4, 5, 7, 6]
	];

	public static function create(position : Vector3D, size : Vector3D) {
		return Solid.fromPolygons(
			baseCube.map(function(info) {
				return new Polygon(info.map(function(i) {
					var pos = new Vector3D(
						position.x + size.x * ((i & 1 != 0) ? 1 : 0),
						position.y + size.y * ((i & 2 != 0) ? 1 : 0),
						position.z + size.z * ((i & 4 != 0) ? 1 : 0)
					);
					return new Vertex(pos);
				}));
			})
		);
	}
}