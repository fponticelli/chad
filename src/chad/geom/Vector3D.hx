package chad.geom;

abstract Vector3D(Array<Float>) {
	public static var zero(default, null) : Vector3D = new Vector3D(0, 0, 0);

	public function new(x : Float, y : Float, z : Float) {
		this = [x,y,z];
	}

	@:from inline static public function fromFloat(v : Float) {
		return new Vector3D(v,v,v);
	}

	@:from inline static public function fromArray(arr : Array<Null<Float>>) {
		return new Vector3D(
			null == arr[0] ? 0 : arr[0],
			null == arr[1] ? 0 : arr[1],
			null == arr[2] ? 0 : arr[2]
		);
	}

	@:from inline static public function fromTypedef(o : {x : Float, y : Float, z : Float}) {
		return new Vector3D(o.x, o.y, o.z);
	}

	@:to inline public function toArray() : Array<Float>
		return this.copy();

	public var x(get, never) : Float;
	public var y(get, never) : Float;
	public var z(get, never) : Float;
	public var length(get, never) : Float;

	inline function get_x() return this[0];
	inline function get_y() return this[1];
	inline function get_z() return this[2];
	inline function get_length()
		return Math.sqrt(dot(this));

	@:op(-A)
	inline public function negate() : Vector3D
		return new Vector3D(-x, -y, -z);

	@:op(A + B)
	public function add(other : Vector3D) : Vector3D
		return new Vector3D(x+other.x, y+other.y, z+other.z);

	@:op(A - B)
	public function subtract(other : Vector3D) : Vector3D
		return new Vector3D(x-other.x, y-other.y, z-other.z);

	@:commutative
	@:op(A * B)
	inline public function multiply(multiplier : Float) : Vector3D
		return new Vector3D(x*multiplier, y*multiplier, z*multiplier);

	@:op(A / B)
	inline public function divide(divisor : Float) : Vector3D
		return new Vector3D(x/divisor, y/divisor, z/divisor);

	@:op(A == B)
	public function equals(other : Vector3D)
		return (x == other.x) && (y == other.y) && (z == other.z);

	public function abs() : Vector3D
		return new Vector3D(Math.abs(x), Math.abs(y), Math.abs(z));

	public function lengthSquared() : Vector3D
		return dot(this);

	public function distanceTo(other : Vector3D) : Vector3D
		return subtract(other).length;

	public function distanceToSquared(other : Vector3D) : Vector3D
		return subtract(other).lengthSquared();

	// Right multiply by a 4x4 matrix (the vector is interpreted as a row vector)
	// Returns a new Vector3D
	inline public function multiply4x4(matrix4x4 : Matrix4x4) : Vector3D
		return matrix4x4.leftMultiplyVector3D(this);

	inline public function transform(matrix4x4 : Matrix4x4) : Vector3D
		return matrix4x4.leftMultiplyVector3D(this);

	// find a vector that is somewhat perpendicular to this one
	public function randomNonParallelVector() : Vector3D
	{
		var a = abs();
		if((a.x <= a.y) && (a.x <= a.z)) {
			return new Vector3D(1, 0, 0);
		} else if((a.y <= a.x) && (a.y <= a.z)) {
			return new Vector3D(0, 1, 0);
		} else {
			return new Vector3D(0, 0, 1);
		}
	}

	public function dot(prod : Vector3D) : Float
		return x * prod.x + y * prod.y + z * prod.z;

	public function lerp(other : Vector3D, multiplier : Float) : Vector3D
		return add(other.subtract(this).multiply(multiplier));

	inline public function normalize() : Vector3D
		return divide(length);

	inline public function cross(other : Vector3D) : Vector3D
		return new Vector3D(
			y * other.z - z * other.y,
			z * other.x - x * other.z,
			x * other.y - y * other.x
		);

	inline public function min(other : Vector3D) : Vector3D
		return new Vector3D(
			Math.min(x, other.x),
			Math.min(y, other.y),
			Math.min(z, other.z)
		);

	inline public function max(other : Vector3D) : Vector3D
		return new Vector3D(
			Math.max(x, other.x),
			Math.max(y, other.y),
			Math.max(z, other.z)
		);

	inline public function toString()
		return 'Vector3D $this';
}