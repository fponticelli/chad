package chad.export;

import chad.csg.Solid;
import chad.geom.Vector3;

class ThreeJS {
	static function getVertices(vertices : Map<String, { index : Int, vertex : Vector3 }>){
		var acc = [];
		for(combo in vertices) {
			acc = acc.concat(combo.vertex.toArray());
		}
		return acc;
	}

	public static function toModel(solid : Solid)
	{
		var faces = [],
			vertices = new Map<String, { index : Int, vertex : Vector3 }>(),
			index = 0;

		for(polygon in solid) {
			for(vertex in polygon) {
				var key   = vertex.position.toString();
				if(!vertices.exists(key))
					vertices.set(key, { index : index++, vertex : vertex.position });
			}
		}

		for(polygon in solid) {
			index = 0;
			var arr = polygon.all();
			for(i in 2...arr.length) {
				faces = faces.concat([
					0,
					vertices.get(arr[0].position.toString()).index,
					vertices.get(arr[i-1].position.toString()).index,
					vertices.get(arr[i].position.toString()).index
				]);
			}
		}

		return {
			metadata: { formatVersion : 3 },
			vertices: getVertices(vertices),
			faces: faces
		};
	}
}