package chad.geom;

abstract Vector3(Array<Float>) {
	public inline function new(x : Float, y : Float, z : Float) {
		this = [x,y,z];
	}

	@:from static public inline function fromFloat(v : Float) {
		return new Vector3(v,v,v);
	}

	@:from static public inline function fromArray(arr : Array<Null<Float>>) {
		return new Vector3(
			null == arr[0] ? 0 : arr[0],
			null == arr[1] ? 0 : arr[1],
			null == arr[2] ? 0 : arr[2]
		);
	}

	@:from static public inline function fromTypedef(o : {x : Float, y : Float, z : Float}) {
		return new Vector3(o.x, o.y, o.z);
	}

	@:to public inline function toArray() : Array<Float>
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

	inline public function negate()
		return new Vector3(-x, -y, -z);

	@:op(A + B)
	inline public function add(other : Vector3)
		return new Vector3(x+other.x, y+other.y, z+other.z);

	@:op(A - B)
	inline public function subtract(other : Vector3)
		return new Vector3(x-other.x, y-other.y, z-other.z);

	@:commutative
	@:op(A * B)
	inline public function multiply(multiplier : Float)
		return new Vector3(x*multiplier, y*multiplier, z*multiplier);

	@:op(A / B)
	inline public function divide(divisor : Float)
		return new Vector3(x/divisor, y/divisor, z/divisor);

	inline public function dot(prod : Vector3) : Float
		return x * prod.x + y * prod.y + z * prod.z;

	inline public function lerp(other : Vector3, multiplier : Float)
		return add(other.subtract(this).multiply(multiplier));

	inline public function normalize()
		return divide(length);

	inline public function cross(other : Vector3)
		return new Vector3(
			y * other.z - z * other.y,
			z * other.x - x * other.z,
			x * other.y - y * other.x
		);

	public inline function toString()
		return 'Vector3 $this';
}