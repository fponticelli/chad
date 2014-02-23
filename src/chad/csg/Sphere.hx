package chad.csg;

import chad.geom.Polygon;
import chad.geom.Vector3;
import chad.geom.Vertex3;

class Sphere {
	public static function create(position : Vector3, radius = 1.0) {
		var slices = Math.ceil(64 * radius),
			stacks = Math.ceil(slices/2);

		var polygons = [],
			vertices : Array<Vertex3> = [];

		function vertex(theta : Float, phi : Float) {
			theta *= Math.PI * 2;
			phi *= Math.PI;
			var dir = new Vector3(
				Math.cos(theta) * Math.sin(phi),
				Math.cos(phi),
				Math.sin(theta) * Math.sin(phi)
			);
			vertices.push(new Vertex3(position.add(dir.multiply(radius)), dir));
		}

		for (i in 0...slices) {
			for (j in 0...stacks) {
				vertices = [];
				vertex(i / slices, j / stacks);
				if (j > 0)
					vertex((i + 1) / slices, j / stacks);
				if (j < stacks - 1)
					vertex((i + 1) / slices, (j + 1) / stacks);
				vertex(i / slices, (j + 1) / stacks);
				polygons.push(new Polygon(vertices));
			}
		}
		return Solid.fromPolygons(polygons);
	}
}