package chad.geom;

class Box
{
	public static function create(a : Vector3, b : Vector3)
	{
		return new Box(a.min(b), a.max(b));
	}

	public var min(default, null) : Vector3;
	public var max(default, null) : Vector3;

	function new(min : Vector3, max : Vector3)
	{
		this.min = min;
		this.max = max;
	}

	public function union(other : Box) : Box
	{
		return new Box(other.min.min(min), other.max.max(max));
	}

	public function subtract(other : Box) : Box
	{
		return throw "not implemented";
	}

	public function intersect(other : Box) : Box
	{
		return throw "not implemented";
	}

	public function transform(matrix : Matrix4x4) : Box
	{
		return throw "not implemented";
	}
}