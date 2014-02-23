package chad.csg;

import chad.geom.Polygon;
import chad.geom.Vector3;
import chad.geom.Vertex3;

class Cylinder {
	public static function create(start : Vector3, end : Vector3, radius = 1.0) {
		var slices = Math.ceil(128 * radius);

		var ray = end.subtract(start);
		var axisZ = ray.normalize(),
			isY = (Math.abs(axisZ.y) > 0.5);
		var axisX = new Vector3(isY ? 1 : 0, isY ? 0 : 1, 0).cross(axisZ).normalize();
		var axisY = axisX.cross(axisZ).normalize();
		var s = new Vertex3(start, axisZ.negate());
		var e = new Vertex3(end, axisZ.normalize());
		var polygons = [];
		function point(stack, slice : Float, normalBlend) {
			var angle = slice * Math.PI * 2;
			var out = axisX.multiply(Math.cos(angle)).add(axisY.multiply(Math.sin(angle)));
			var pos = start.add(ray.multiply(stack)).add(out.multiply(radius));
			var normal = out.multiply(1 - Math.abs(normalBlend)).add(axisZ.multiply(normalBlend));
			return new Vertex3(pos, normal);
		}
		for (i in 0...slices) {
			var t0 = i / slices,
				t1 = (i + 1) / slices;
			polygons.push(new Polygon([s, point(0, t0, -1), point(0, t1, -1)]));
			polygons.push(new Polygon([point(0, t1, 0), point(0, t0, 0), point(1, t0, 0), point(1, t1, 0)]));
			polygons.push(new Polygon([e, point(1, t1, 1), point(1, t0, 1)]));
		}
		return Solid.fromPolygons(polygons);
	}
}