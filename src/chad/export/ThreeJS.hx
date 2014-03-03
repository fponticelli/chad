package chad.export;

import chad.csg.Solid;
import chad.geom.Vector3D;
import chad.geom.Vertex;

class ThreeJS {
	static function getVertices(vertices : Map<String, { index : Int, vertex : Vertex }>){
		var acc = [];
		for(combo in vertices) {
			acc = acc.concat(combo.vertex.position.toArray());
		}
		return acc;
	}

	static function getNormals(vertices : Map<String, { index : Int, vertex : Vertex }>){
		var acc = [];
		for(combo in vertices) {
			acc = acc.concat(combo.vertex.normal.toArray());
		}
		return acc;
	}

	public static function toModel(solid : Solid)
	{
		var faces = [],
			vertices = new Map<String, { index : Int, vertex : Vertex }>(),
			index = 0;

		for(polygon in solid) {
			for(vertex in polygon) {
				var key = vertex.toString();
				if(!vertices.exists(key))
					vertices.set(key, { index : index++, vertex : vertex });
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