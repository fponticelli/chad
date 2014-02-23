package chad.geom;

import chad.geom.Vector3;

@:access(chad.geom.Polygon)
class Plane {
	public inline static var EPSILON = 1e-5;
	public static function fromPoints(a : Vector3, b : Vector3, c : Vector3) {
		var n = b.subtract(a).cross(c.subtract(a)).normalize();
		return new Plane(n, n.dot(a));
	}

	@:isVar public var normal(default, null) : Vector3;
	@:isVar public var w(default, null) : Float;

	public function new(normal : Vector3, w : Float) {
		this.normal = normal;
		this.w = w;
	}

	public function flip()
		return new Plane(normal.negate(), -w);

	public function splitPolygon(polygon : Polygon, coplanarFront : Array<Polygon>, coplanarBack : Array<Polygon>, front : Array<Polygon>, back : Array<Polygon>) {
		var polygonType = 0,
			types = [],
			t, type;
		for(vertex in polygon) {
			t = normal.dot(vertex.position) - w;
			type = (t < -EPSILON) ? BACK : (t > EPSILON) ? FRONT : COPLANAR;
			polygonType |= type;
			types.push(type);
		}

		switch (polygonType) {
			case COPLANAR:
				(normal.dot(polygon.plane.normal) > 0 ? coplanarFront : coplanarBack).push(polygon);
			case FRONT:
				front.push(polygon);
			case BACK:
				back.push(polygon);
			case SPANNING:
				var f = [],
					b = [],
					len = polygon.vertices.length,
					j, ti, vi, tj, vj, t, v;
				for (i in 0...len) {
					j = (i + 1) % len;
					ti = types[i];
					tj = types[j];
					vi = polygon.vertices[i];
					vj = polygon.vertices[j];
					if (ti != BACK)
						f.push(vi);
					if (ti != FRONT)
						b.push(vi); // was: (ti != BACK ? vi.clone() : vi);
					if ((ti | tj) == SPANNING) {
						t = (w - normal.dot(vi.position)) /
							normal.dot(vj.position.subtract(vi.position));
						v = vi.interpolate(vj, t);
						f.push(v);
						b.push(v); // was: v.clone()
					}
				}
				if (f.length >= 3)
					front.push(new Polygon(f));
				if (b.length >= 3)
					back.push(new Polygon(b));
		}
	}

	static inline var COPLANAR = 0;
    static inline var FRONT = 1;
    static inline var BACK = 2;
    static inline var SPANNING = 3;
}