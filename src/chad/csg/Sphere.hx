package chad.csg;

import thx.geom.Polygon;
import thx.geom.Vertex3D;
import thx.geom.Point3D;

class Sphere
{
	public static dynamic function getResolution(r : Float)
		return 36;

	public static function create(position : Point3D, radius = 1.0, ?resolution : Float -> Int)
	{
		if(null == resolution)
			resolution = getResolution;
		var slices = resolution(radius),
			stacks = Math.ceil(slices/2),
			polygons = [],
			vertices : Array<Vertex3D> = [];

		function Vertex3D(theta : Float, phi : Float)
		{
			theta *= Math.PI * 2;
			phi *= Math.PI;
			var dir = new Point3D(
				Math.cos(theta) * Math.sin(phi),
				Math.cos(phi),
				Math.sin(theta) * Math.sin(phi)
			);
			vertices.push(new Vertex3D(position.addPoint3D(dir.multiply(radius)), dir));
		}

		for (i in 0...slices)
		{
			for (j in 0...stacks)
			{
				vertices = [];
				Vertex3D(i / slices, j / stacks);
				if (j > 0)
					Vertex3D((i + 1) / slices, j / stacks);
				if (j < stacks - 1)
					Vertex3D((i + 1) / slices, (j + 1) / stacks);
				Vertex3D(i / slices, (j + 1) / stacks);
				polygons.push(new Polygon(vertices));
			}
		}
		return Solid.fromPolygons(polygons);
	}
}