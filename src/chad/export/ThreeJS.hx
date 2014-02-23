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
			var arr = [0], first;
			for(vertex in polygon) {
				arr.push(vertices.get(vertex.position.toString()).index);
				if(arr.length == 4) {
					faces = faces.concat(arr);
					arr = [0, arr[1], arr[3]];
				}
			}
		}

		return {
			metadata: { formatVersion : 3 },
			vertices: getVertices(vertices),
			faces: faces
		};
	}
}