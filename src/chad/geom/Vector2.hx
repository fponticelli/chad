package chad.geom;

abstract Vector2(Array<Float>) {
	public inline function new(x : Float, y : Float) {
		this = [x,y];
	}

	@:from static public inline function fromFloat(v : Float) {
		return new Vector2(v,v);
	}

	public static function fromAngle(radians : Float)
		return Vector2.fromAngleRadians(radians);

	public static function fromAngleDegrees(degrees : Float)
	{
		var radians = Math.PI * degrees / 180;
		return Vector2.fromAngleRadians(radians);
	}

	public static function fromAngleRadians(radians : Float)
		return new Vector2(Math.cos(radians), Math.sin(radians));


	@:from static public inline function fromArray(arr : Array<Null<Float>>)
	{
		return new Vector2(
			null == arr[0] ? 0 : arr[0],
			null == arr[1] ? 0 : arr[1]
		);
	}

	@:from static public inline function fromTypedef(o : {x : Float, y : Float})
	{
		return new Vector2(o.x, o.y);
	}

	@:to public inline function toArray() : Array<Float>
		return this.copy();

	public function toVector3D(z : Float)
		return new Vector3(x, y, z);

	public var x(get, never) : Float;
	public var y(get, never) : Float;
	public var length(get, never) : Float;

	inline function get_x() return this[0];
	inline function get_y() return this[1];
	inline function get_length()
		return Math.sqrt(dot(this));

	inline public function negate()
		return new Vector2(-x, -y);

	@:op(A + B)
	inline public function add(other : Vector2)
		return new Vector2(x+other.x, y+other.y);

	@:op(A - B)
	inline public function subtract(other : Vector2)
		return new Vector2(x-other.x, y-other.y);

	@:commutative
	@:op(A * B)
	inline public function multiply(multiplier : Float)
		return new Vector2(x*multiplier, y*multiplier);

	@:op(A / B)
	inline public function divide(divisor : Float)
		return new Vector2(x/divisor, y/divisor);

	inline public function dot(prod : Vector2) : Float
		return x * prod.x + y * prod.y;

	inline public function lerp(other : Vector2, multiplier : Float)
		return add(other.subtract(this).multiply(multiplier));

	inline public function normal()
		return new Vector2(y, -x);

	inline public function normalize()
		return divide(length);

	inline public function equals(other : Vector2)
		return (x == other.x) && (y == other.y);

	inline public function distanceTo(other : Vector2)
		return subtract(other).length;

	inline public function distanceToSquared(other : Vector2)
		return subtract(other).lengthSquared();

	inline public function lengthSquared()
		return dot(this);

	inline public function multiply4x4(matrix : Matrix4x4)
		return matrix.leftMultiplyVector2(this);

	inline public function transform(matrix : Matrix4x4)
		return matrix.leftMultiplyVector2(this);

	inline public function angle()
		return angleRadians();

	inline public function angleDegrees()
	{
		var radians = angleRadians();
		return 180 * radians / Math.PI;
	}

	// y=sin, x=cos
	inline public function angleRadians()
		return Math.atan2(y, x);

	inline public function cross(other : Vector2)
		return x * other.y - y * other.x;

	inline public function min(other : Vector2) {
		return new Vector2(
			Math.min(x, other.x),
			Math.min(y, other.y)
		);
	}

	inline public function max(other : Vector2) {
		return new Vector2(
			Math.max(x, other.x),
			Math.max(y, other.y)
		);
	}

	public inline function toString()
		return 'Vector2 $this';
}