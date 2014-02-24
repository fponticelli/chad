package chad.csg;

import chad.geom.Polygon;
import chad.geom.Vector3D;
import chad.geom.Vertex3D;

class Sphere {
	public static function create(position : Vector3D, radius = 1.0) {
		var slices = Math.ceil(128 * radius),
			stacks = Math.ceil(slices/2);

		var polygons = [],
			vertices : Array<Vertex3D> = [];

		function vertex(theta : Float, phi : Float) {
			theta *= Math.PI * 2;
			phi *= Math.PI;
			var dir = new Vector3D(
				Math.cos(theta) * Math.sin(phi),
				Math.cos(phi),
				Math.sin(theta) * Math.sin(phi)
			);
			vertices.push(new Vertex3D(position.add(dir.multiply(radius)), dir));
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