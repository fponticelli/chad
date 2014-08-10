package chad.csg;

import chad.geom.Polygon;
import chad.geom.Vertex3D;
import thx.geom.Point3D;

class Cylinder
{
	public static function create(start : Point3D, end : Point3D, radius = 1.0, ?resolution : Float -> Int)
	{
		if(null == resolution)
			resolution = Sphere.getResolution;
		var slices   = resolution(radius),
			ray      = end.subtractPoint3D(start),
			axisZ    = ray.normalize(),
			isY      = (Math.abs(axisZ.y) > 0.5),
			axisX    = new Point3D(isY ? 1 : 0, isY ? 0 : 1, 0).cross(axisZ).normalize(),
			axisY    = axisX.cross(axisZ).normalize(),
			s        = new Vertex3D(start, axisZ.negate()),
			e        = new Vertex3D(end, axisZ.normalize()),
			polygons = [],
			t0, t1;
		function point(stack, slice : Float, normalBlend)
		{
			var angle = slice * Math.PI * 2,
				out = axisX.multiply(Math.cos(angle)).addPoint3D(axisY.multiply(Math.sin(angle))),
				pos = start.addPoint3D(ray.multiply(stack)).addPoint3D(out.multiply(radius)),
				normal = out.multiply(1 - Math.abs(normalBlend)).addPoint3D(axisZ.multiply(normalBlend));
			return new Vertex3D(pos, normal);
		}
		for (i in 0...slices)
		{
			t0 = i / slices;
			t1 = (i + 1) / slices;
			polygons.push(new Polygon([s, point(0, t0, -1), point(0, t1, -1)]));
			polygons.push(new Polygon([point(0, t1, 0), point(0, t0, 0), point(1, t0, 0), point(1, t1, 0)]));
			polygons.push(new Polygon([e, point(1, t1, 1), point(1, t0, 1)]));
		}
		return Solid.fromPolygons(polygons);
	}
}