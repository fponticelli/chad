package chad.geom;

abstract Matrix4x4(Array<Float>)
{
	public static var unity(default, null) : Matrix4x4 = new Matrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

	@:from public static function fromArray(e : Array<Float>)
	{
		if(e.length != 16)
			throw 'Invalid array length (${e.length}) for Matrix4x4, should be 16';
		return new Matrix4x4(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
	}

	// Create a rotation matrix for rotating around the x axis
	static public function rotationX(degrees : Float)
	{
		var radians = degrees * Math.PI * (1.0 / 180.0),
			cos = Math.cos(radians),
			sin = Math.sin(radians);
		return new Matrix4x4(1, 0, 0, 0, 0, cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1);
	}

	// Create a rotation matrix for rotating around the y axis
	static public function rotationY(degrees : Float)
	{
		var radians = degrees * Math.PI * (1.0 / 180.0),
			cos = Math.cos(radians),
			sin = Math.sin(radians);
		return new Matrix4x4(cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0, 0, 0, 0, 1);
	}

	// Create a rotation matrix for rotating around the z axis
	static public function rotationZ(degrees : Float)
	{
		var radians = degrees * Math.PI * (1.0 / 180.0),
			cos = Math.cos(radians),
			sin = Math.sin(radians);
		return new Matrix4x4(cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
	}

	// Matrix for rotation about arbitrary point and axis
	static public function rotation(rotationCenter : Vector3D, rotationAxis : Vector3D, degrees : Float)
	{
		var rotationPlane = Plane.fromNormalAndPoint(rotationAxis, rotationCenter),
			orthobasis = OrthoNormalBasis.fromPlane(rotationPlane),
			transformation = Matrix4x4.translation(rotationCenter.negate());
		transformation = transformation.multiply(orthobasis.getProjectionMatrix());
		transformation = transformation.multiply(Matrix4x4.rotationZ(degrees));
		transformation = transformation.multiply(orthobasis.getInverseProjectionMatrix());
		transformation = transformation.multiply(Matrix4x4.translation(rotationCenter));
		return transformation;
	}

	// Create an affine matrix for translation:
	static public function translation(vec : Vector3D)
		return new Matrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, vec.x, vec.y, vec.z, 1);

	// Create an affine matrix for mirroring into an arbitrary plane:
	static public function mirroring(plane : Plane)
	{
		var nx = plane.normal.x,
			ny = plane.normal.y,
			nz = plane.normal.z,
			w = plane.w;
		return new Matrix4x4(
			(1.0 - 2.0 * nx * nx), (-2.0 * ny * nx), (-2.0 * nz * nx), 0,
			(-2.0 * nx * ny), (1.0 - 2.0 * ny * ny), (-2.0 * nz * ny), 0,
			(-2.0 * nx * nz), (-2.0 * ny * nz), (1.0 - 2.0 * nz * nz), 0,
			(-2.0 * nx * w), (-2.0 * ny * w), (-2.0 * nz * w), 1
		);
	}

	// Create an affine matrix for scaling:
	static public function scaling(vec : Vector3D)
		return new Matrix4x4(vec.x, 0, 0, 0, 0, vec.y, 0, 0, 0, 0, vec.z, 0, 0, 0, 0, 1);

	public inline function new(e0 : Float, e1 : Float, e2 : Float, e3 : Float, e4 : Float, e5 : Float, e6 : Float, e7 : Float, e8 : Float, e9 : Float, e10 : Float, e11 : Float, e12 : Float, e13 : Float, e14 : Float, e15 : Float)
	{
		this = [e0, e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15];
	}

	@:to public inline function toArray()
		return this.copy();

	@:op(A + B) public function add(other : Matrix4x4) : Matrix4x4
	{
		return new Matrix4x4(
			at(0) + other.at(0),
			at(1) + other.at(1),
			at(2) + other.at(2),
			at(3) + other.at(3),
			at(4) + other.at(4),
			at(5) + other.at(5),
			at(6) + other.at(6),
			at(7) + other.at(7),
			at(8) + other.at(8),
			at(9) + other.at(9),
			at(10) + other.at(10),
			at(11) + other.at(11),
			at(12) + other.at(12),
			at(13) + other.at(13),
			at(14) + other.at(14),
			at(15) + other.at(15)
		);
	}

	@:op(A - B) public function subtract(other : Matrix4x4) : Matrix4x4
	{
		return new Matrix4x4(
			at(0) - other.at(0),
			at(1) - other.at(1),
			at(2) - other.at(2),
			at(3) - other.at(3),
			at(4) - other.at(4),
			at(5) - other.at(5),
			at(6) - other.at(6),
			at(7) - other.at(7),
			at(8) - other.at(8),
			at(9) - other.at(9),
			at(10) - other.at(10),
			at(11) - other.at(11),
			at(12) - other.at(12),
			at(13) - other.at(13),
			at(14) - other.at(14),
			at(15) - other.at(15)
		);
	}

	@:op(A * B)
	public function multiply(other : Matrix4x4) : Matrix4x4
	{
		var t0 = at(0), t1 = at(1), t2 = at(2), t3 = at(3), t4 = at(4), t5 = at(5), t6 = at(6), t7 = at(7), t8 = at(8), t9 = at(9), t10 = at(10), t11 = at(11), t12 = at(12), t13 = at(13), t14 = at(14), t15 = at(15),
			m0 = other.at(0), m1 = other.at(1), m2 = other.at(2), m3 = other.at(3), m4 = other.at(4), m5 = other.at(5), m6 = other.at(6), m7 = other.at(7), m8 = other.at(8), m9 = other.at(9), m10 = other.at(10), m11 = other.at(11), m12 = other.at(12), m13 = other.at(13), m14 = other.at(14), m15 = other.at(15);
		return new Matrix4x4(
			t0 * m0 + t1 * m4 + t2 * m8 + t3 * m12,
			t0 * m1 + t1 * m5 + t2 * m9 + t3 * m13,
			t0 * m2 + t1 * m6 + t2 * m10 + t3 * m14,
			t0 * m3 + t1 * m7 + t2 * m11 + t3 * m15,
			t4 * m0 + t5 * m4 + t6 * m8 + t7 * m12,
			t4 * m1 + t5 * m5 + t6 * m9 + t7 * m13,
			t4 * m2 + t5 * m6 + t6 * m10 + t7 * m14,
			t4 * m3 + t5 * m7 + t6 * m11 + t7 * m15,
			t8 * m0 + t9 * m4 + t10 * m8 + t11 * m12,
			t8 * m1 + t9 * m5 + t10 * m9 + t11 * m13,
			t8 * m2 + t9 * m6 + t10 * m10 + t11 * m14,
			t8 * m3 + t9 * m7 + t10 * m11 + t11 * m15,
			t12 * m0 + t13 * m4 + t14 * m8 + t15 * m12,
			t12 * m1 + t13 * m5 + t14 * m9 + t15 * m13,
			t12 * m2 + t13 * m6 + t14 * m10 + t15 * m14,
			t12 * m3 + t13 * m7 + t14 * m11 + t15 * m15
		);
	}

	public function rightMultiplyVector3D(vector : Vector3D)
	{
		var v0 = vector.x,
			v1 = vector.y,
			v2 = vector.z,
			v3 = 1,
			x = v0 * at(0) + v1 * at(1) + v2 * at(2) + v3 * at(3),
			y = v0 * at(4) + v1 * at(5) + v2 * at(6) + v3 * at(7),
			z = v0 * at(8) + v1 * at(9) + v2 * at(10) + v3 * at(11),
			w = v0 * at(12) + v1 * at(13) + v2 * at(14) + v3 * at(15);
		// scale such that fourth element becomes 1:
		if(w != 1) {
			var invw = 1.0 / w;
			x *= invw;
			y *= invw;
			z *= invw;
		}
		return new Vector3D(x, y, z);
	}

	public function leftMultiplyVector3D(vector : Vector3D)
	{
		var v0 = vector.x,
			v1 = vector.y,
			v2 = vector.z,
			v3 = 1,
			x = v0 * at(0) + v1 * at(4) + v2 * at(8) + v3 * at(12),
			y = v0 * at(1) + v1 * at(5) + v2 * at(9) + v3 * at(13),
			z = v0 * at(2) + v1 * at(6) + v2 * at(10) + v3 * at(14),
			w = v0 * at(3) + v1 * at(7) + v2 * at(11) + v3 * at(15);
		// scale such that fourth element becomes 1:
		if(w != 1) {
			var invw = 1.0 / w;
			x *= invw;
			y *= invw;
			z *= invw;
		}
		return new Vector3D(x, y, z);
	}

	public function rightMultiplyVector2D(vector : Vector2D)
	{
		var v0 = vector.x,
			v1 = vector.y,
			v2 = 0,
			v3 = 1,
			x = v0 * at(0) + v1 * at(1) + v2 * at(2) + v3 * at(3),
			y = v0 * at(4) + v1 * at(5) + v2 * at(6) + v3 * at(7),
			z = v0 * at(8) + v1 * at(9) + v2 * at(10) + v3 * at(11),
			w = v0 * at(12) + v1 * at(13) + v2 * at(14) + v3 * at(15);
		// scale such that fourth element becomes 1:
		if(w != 1) {
			var invw = 1.0 / w;
			x *= invw;
			y *= invw;
			z *= invw;
		}
		return new Vector2D(x, y);
	}

	public function leftMultiplyVector2D(vector : Vector2D)
	{
		var v0 = vector.x,
			v1 = vector.y,
			v2 = 0,
			v3 = 1,
			x = v0 * at(0) + v1 * at(4) + v2 * at(8) + v3 * at(12),
			y = v0 * at(1) + v1 * at(5) + v2 * at(9) + v3 * at(13),
			z = v0 * at(2) + v1 * at(6) + v2 * at(10) + v3 * at(14),
			w = v0 * at(3) + v1 * at(7) + v2 * at(11) + v3 * at(15);
		// scale such that fourth element becomes 1:
		if(w != 1) {
			var invw = 1.0 / w;
			x *= invw;
			y *= invw;
			z *= invw;
		}
		return new Vector2D(x, y);
	}

	// determine whether this matrix is a mirroring transformation
	public function isMirroring()
	{
		var u = new Vector3D(at(0), at(4), at(8)),
			v = new Vector3D(at(1), at(5), at(9)),
			w = new Vector3D(at(2), at(6), at(10));

		// for a true orthogonal, non-mirrored base, u.cross(v) == w
		// If they have an opposite direction then we are mirroring
		var mirrorvalue = u.cross(v).dot(w),
			ismirror = (mirrorvalue < 0);
		return ismirror;
	}

	private inline function at(index : Int)
	{
		return this[index];
	}
}