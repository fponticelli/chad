package chad.export;

import chad.csg.Solid;
import thx.geom.Point3D;
import thx.geom.Vertex3D;

class ThreeJS {
  static function getVertices(vertices : Map<String, { index : Int, Vertex3D : Vertex3D }>){
    var acc = [];
    for(combo in vertices) {
      acc = acc.concat(combo.Vertex3D.position.toArray());
    }
    return acc;
  }

  static function getNormals(vertices : Map<String, { index : Int, Vertex3D : Vertex3D }>){
    var acc = [];
    for(combo in vertices) {
      acc = acc.concat(combo.Vertex3D.normal.toArray());
    }
    return acc;
  }

  public static function toModel(solid : Solid)
  {
    var faces = [],
        vertices = new Map<String, { index : Int, Vertex3D : Vertex3D }>(),
        index = 0;

    for(polygon in solid) {
      for(Vertex3D in polygon) {
        var key = Vertex3D.toString();
        if(!vertices.exists(key))
          vertices.set(key, { index : index++, Vertex3D : Vertex3D });
      }
    }

    for(polygon in solid) {
      index = 0;
      var arr = polygon.all();
      for(i in 2...arr.length) {
        faces = faces.concat([
          32,
          vertices.get(arr[0].toString()).index,
          vertices.get(arr[i-1].toString()).index,
          vertices.get(arr[i].toString()).index,
          vertices.get(arr[0].toString()).index,
          vertices.get(arr[i-1].toString()).index,
          vertices.get(arr[i].toString()).index
        ]);
      }
    }

    return {
      metadata: { formatVersion : 3 },
      vertices: getVertices(vertices),
      normals: getNormals(vertices),
      faces: faces
    };
  }
}