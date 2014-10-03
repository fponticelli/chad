package chad.csg;

import thx.geom.Point3D;
import thx.geom.Polygon;
import thx.geom.Vertex3D;

class Solids {
  static var baseCube = [
    { p : [0, 4, 6, 2], n : [-1.0, 0.0, 0.0] },
    { p : [1, 3, 7, 5], n : [ 1.0, 0.0, 0.0] },
    { p : [0, 1, 5, 4], n : [0.0, -1.0, 0.0] },
    { p : [2, 6, 7, 3], n : [0.0,  1.0, 0.0] },
    { p : [0, 2, 3, 1], n : [0.0, 0.0, -1.0] },
    { p : [4, 5, 7, 6], n : [0.0, 0.0,  1.0] }
  ];

  public static function box(position : Point3D, size : Point3D) {
    if(null == position)
      position = Point3D.zero;
    return Solid.fromPolygons(
      baseCube.map(function(info) {
        return new Polygon(info.p.map(function(i) {
          var pos = new Point3D(
            position.x + size.x * ((i & 1 != 0) ? 1 : 0),
            position.y + size.y * ((i & 2 != 0) ? 1 : 0),
            position.z + size.z * ((i & 4 != 0) ? 1 : 0)
          );
          return new Vertex3D(pos, info.n);
        }));
      })
    );
  }

  public static function cylinder(start : Point3D, end : Point3D, radius = 1.0, ?resolution : Float -> Int) {
    if(null == resolution)
      resolution = getResolution;
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
    function point(stack, slice : Float, normalBlend) {
      var angle = slice * Math.PI * 2,
          out = axisX.multiply(Math.cos(angle)).addPoint3D(axisY.multiply(Math.sin(angle))),
          pos = start.addPoint3D(ray.multiply(stack)).addPoint3D(out.multiply(radius)),
          normal = out.multiply(1 - Math.abs(normalBlend)).addPoint3D(axisZ.multiply(normalBlend));
      return new Vertex3D(pos, normal);
    }
    for (i in 0...slices) {
      t0 = i / slices;
      t1 = (i + 1) / slices;
      polygons.push(new Polygon([s, point(0, t0, -1), point(0, t1, -1)]));
      polygons.push(new Polygon([point(0, t1, 0), point(0, t0, 0), point(1, t0, 0), point(1, t1, 0)]));
      polygons.push(new Polygon([e, point(1, t1, 1), point(1, t0, 1)]));
    }
    return Solid.fromPolygons(polygons);
  }

  public static dynamic function getResolution(r : Float)
    return 36;

  public static function sphere(position : Point3D, radius = 1.0, ?resolution : Float -> Int) {
    if(null == resolution)
      resolution = getResolution;
    var slices = resolution(radius),
        stacks = Math.ceil(slices/2),
        polygons = [],
        vertices : Array<Vertex3D> = [];

    function vertex(theta : Float, phi : Float) {
      theta *= Math.PI * 2;
      phi *= Math.PI;
      var dir = new Point3D(
        Math.cos(theta) * Math.sin(phi),
        Math.cos(phi),
        Math.sin(theta) * Math.sin(phi)
      );
      vertices.push(new Vertex3D(position.addPoint3D(dir.multiply(radius)), dir));
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