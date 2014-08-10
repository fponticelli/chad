package chad.geom;

import thx.geom.Point3D;
import thx.geom.Matrix4x4;

@:access(chad.geom.Polygon)
class Plane
{
	public inline static var EPSILON = 1e-5;

	public static function fromPoint3Ds(a : Point3D, b : Point3D, c : Point3D)
	{
		var n = b.subtractPoint3D(a).cross(c.subtractPoint3D(a)).normalize();
		return new Plane(n, n.dot(a));
	};

	// like fromPoint3Ds, but allow the vectors to be on one point or one line
	// in such a case a random plane through the given points is constructed
	public static function anyPlaneFromPoint3Ds(a : Point3D, b : Point3D, c : Point3D)
	{
		var v1 = b.subtractPoint3D(a),
			v2 = c.subtractPoint3D(a);
		if(v1.length < EPSILON)
			v1 = v2.randomNonParallelVector();
		if(v2.length < EPSILON)
			v2 = v1.randomNonParallelVector();
		var normal = v1.cross(v2);
		if(normal.length < EPSILON)
		{
			// this would mean that v1 == v2.negated()
			v2 = v1.randomNonParallelVector();
			normal = v1.cross(v2);
		}
		normal = normal.normalize();
		return new Plane(normal, normal.dot(a));
	}

	public static function fromPoints(a : Point3D, b : Point3D, c : Point3D)
	{
		var n = b.subtractPoint3D(a).cross(c.subtractPoint3D(a)).normalize();
		return new Plane(n, n.dot(a));
	}

	public static function fromNormalAndPoint(normal : Point3D, point : Point3D)
	{
		normal = normal.normalize();
		return new Plane(normal, point.dot(normal));
	}

	@:isVar public var normal(default, null) : Point3D;
	@:isVar public var w(default, null) : Float;

	public function new(normal : Point3D, w : Float)
	{
		this.normal = normal;
		this.w = w;
	}

	public function flip()
		return new Plane(normal.negate(), -w);

	public function splitPolygon(polygon : Polygon, coplanarFront : Array<Polygon>, coplanarBack : Array<Polygon>, front : Array<Polygon>, back : Array<Polygon>)
	{
		var polygonType = 0,
			types = [],
			t, type,
			f, b, len, j, ti, vi, tj, vj, t, v;

		for(vertex in polygon)
		{
			t = normal.dot(vertex.position) - w;
			type = (t < -EPSILON) ? BACK : (t > EPSILON) ? FRONT : COPLANAR;
			polygonType |= type;
			types.push(type);
		}

		switch (polygonType)
		{
			case COPLANAR:
				(normal.dot(polygon.plane.normal) > 0 ? coplanarFront : coplanarBack).push(polygon);
			case FRONT:
				front.push(polygon);
			case BACK:
				back.push(polygon);
			case SPANNING:
				f = [];
				b = [];
				len = polygon.vertices.length;
				for (i in 0...len)
				{
					j = (i + 1) % len;
					ti = types[i];
					tj = types[j];
					vi = polygon.vertices[i];
					vj = polygon.vertices[j];
					if (ti != BACK)
						f.push(vi);
					if (ti != FRONT)
						b.push(vi); // was: (ti != BACK ? vi.clone() : vi);
					if ((ti | tj) == SPANNING)
					{
						t = (w - normal.dot(vi.position)) /
							normal.dot(vj.position.subtractPoint3D(vi.position));
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

	public function equals(other : Plane)
		return normal.equals(other.normal) && (w == other.w);

	public function transform(matrix : Matrix4x4)
	{
		var ismirror = matrix.isMirroring(),
			// get two vectors in the plane:
			r = normal.randomNonParallelVector(),
			u = normal.cross(r),
			v = normal.cross(u),
			// get 3 points in the plane:
			point1 = normal.multiply(w),
			point2 = point1.addPoint3D(u),
			point3 = point1.addPoint3D(v);
		// transform the points:
		point1 = point1.multiply4x4(matrix);
		point2 = point2.multiply4x4(matrix);
		point3 = point3.multiply4x4(matrix);
		// and create a new plane from the transformed points:
		var newplane = Plane.fromPoint3Ds(point1, point2, point3);
		if(ismirror) {
			// the transform is mirroring
			// We should mirror the plane:
			newplane = newplane.flip();
		}
		return newplane;
	}

	// robust splitting of a line by a plane
	// will work even if the line is parallel to the plane
	public function splitLineBetweenPoints(p1 : Point3D, p2 : Point3D)
	{
		var direction = p2.subtractPoint3D(p1),
			lambda = (w - normal.dot(p1)) / normal.dot(direction);
		if(Math.isNaN(lambda))
			lambda = 0;
		else if(lambda > 1)
			lambda = 1;
		else if(lambda < 0)
			lambda = 0;
		return p1.addPoint3D(direction.multiply(lambda));
	}

	public function intersectWithLine(line : Line3D) : Point3D
		return line.intersectWithPlane(this);

	// intersection of two planes
	public function intersectWithPlane(plane : Plane)
		return Line3D.fromPlanes(this, plane);

	public function signedDistanceToPoint(point)
		return normal.dot(point) - w;

	public function toString()
		return "Plane [normal: " + normal.toString() + ", w: " + w + "]";

	public function mirrorPoint(point3d)
	{
		var distance = this.signedDistanceToPoint(point3d);
		var mirrored = point3d.subtractPoint3D(this.normal.multiply(distance * 2.0));
		return mirrored;
	}

	static inline var COPLANAR = 0;
    static inline var FRONT = 1;
    static inline var BACK = 2;
    static inline var SPANNING = 3;
}