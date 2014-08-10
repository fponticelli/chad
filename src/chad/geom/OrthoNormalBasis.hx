package chad.geom;

import thx.geom.Point;
import thx.geom.Point3D;
import thx.geom.Matrix4x4;

class OrthoNormalBasis
{
	public static inline function fromPlane(plane : Plane)
		return new OrthoNormalBasis(plane, plane.normal.randomNonParallelVector());

	public var v(default, null) : Point3D;
	public var u(default, null) : Point3D;
	public var plane(default, null) : Plane;
	public var planeOrigin(default, null) : Point3D;
	public function new(plane : Plane, rightvector : Point3D)
	{
		this.v = plane.normal.cross(rightvector).normalize();
		this.u = v.cross(plane.normal);
		this.plane = plane;
		this.planeOrigin = plane.normal.multiply(plane.w);
	}

	public static var z0Plane(default, null) : OrthoNormalBasis =
		new OrthoNormalBasis(
			new Plane(new Point3D(0, 0, 1), 0),
			new Point3D(1, 0, 0)
		);

	public function getProjectionMatrix()
	{
		return new Matrix4x4(
			u.x, v.x, plane.normal.x, 0,
			u.y, v.y, plane.normal.y, 0,
			u.z, v.z, plane.normal.z, 0,
			0, 0, -plane.w, 1
		);
	}

	public function getInverseProjectionMatrix()
	{
		var p = plane.normal.multiply(plane.w);
		return new Matrix4x4(
			u.x, u.y, u.z, 0,
			v.x, v.y, v.z, 0,
			plane.normal.x, plane.normal.y, plane.normal.z, 0,
			p.x, p.y, p.z, 1);
	}

	public function to2D(vec3 : Point3D)
		return new Point(vec3.dot(u), vec3.dot(v));

	public function to3D(vec2 : Point)
		return planeOrigin
			.addPoint3D(u.multiply(vec2.x))
			.addPoint3D(v.multiply(vec2.y));

	public function line3Dto2D(line : Line3D)
		return Line2D.fromPoints(
			to2D(line.point),
			to2D(line.direction.addPoint3D(line.point))
		);

	public function line2Dto3D(line : Line2D)
	{
		var a = line.origin(),
			b = line.direction().addPoint(a);
		return Line3D.fromPoints(to3D(a), to3D(b));
	}

	public function transform(matrix : Matrix4x4)
	{
		// todo: may not work properly in case of mirroring
		var newplane = plane.transform(matrix),
			rightpoint_transformed = u.transform(matrix),
			origin_transformed = new Point3D(0, 0, 0).transform(matrix),
			newrighthandvector = rightpoint_transformed.subtract(origin_transformed),
			newbasis = new OrthoNormalBasis(newplane, newrighthandvector);
		return newbasis;
	}
}