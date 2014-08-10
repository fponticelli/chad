package chad.geom;

import chad.geom.Vector2D;

class Segment2D
{
	public var position(default, null) : Vector2D;
	public var normalIn(default, null) : Vector2D;
	public var normalOut(default, null) : Vector2D;

	public function new(position : Vector2D, ?normalIn : Vector2D, ?normalOut : Vector2D)
	{
		this.position  = position;
		this.normalIn  = null == normalIn  ? Vector2D.zero : normalIn;
		this.normalOut = null == normalOut ? Vector2D.zero : normalOut;
	}

	public function isLinear()
		return normalIn.isZero() && normalOut.isZero();

	public function toString()
		return 'Segment2D (${position}, ${normalIn}, ${normalOut})';

	public function reverse()
		return new Segment2D(position, normalOut, normalIn);

	public function equals(other : Segment2D)
		return position.equals(other.position) && normalIn.equals(other.normalIn) && normalOut.equals(other.normalOut);

	public function transform(matrix : Matrix4x4)
		return new Segment2D(position.transform(matrix), normalIn.transform(matrix), normalOut.transform(matrix));
}

class Path2D
{
	public var position(default, null) : Segment2D;
	public var prev(default, null) : Null<Path2D>;
	public var next(default, null) : Null<Path2D>;
	public var closed(default, null) : Bool;
	function new(position : Segment2D, prev : Null<Path2D>, next : Null<Path2D>, ?closed = false)
	{
		this.position = position;
		this.prev = prev;
		this.next = next;
		this.closed = closed;
	}

	inline public static function startWithSegment(segment : Segment2D)
		return new Path2D(segment, null, null);

	inline public static function startAt(position : Vector2D, ?normalIn : Vector2D, ?normalOut : Vector2D)
		return startWithSegment(new Segment2D(position, normalIn, normalOut));

	inline public function lineTo(position : Vector2D)
		return new Path2D(new Segment2D(position), this, null);

	public function getFirst()
		return null == prev ? this : prev.getFirst();

	public function getLast()
		return closed || null == next ? this : next.getLast();

	public function close()
		return new Path2D(position, prev, getFirst(), true);

	public function isEmpty()
		return prev == null && next == null;

	public function isLast()
		return closed || null == next;

	public function isFirst()
		return null == prev;

	public function iterator()
	{
		var first = getFirst(),
			node : {
				public var next(default, null) : Path2D;
				public function isLast() : Bool;
			} = { next : first, isLast : function() return first.isLast() };
		return {
			hasNext : function() return null != node && !node.isLast(),
			next : function() return node = null == node.next || node.next.isLast() ? null : node.next
		};
	}

	public function toString()
		return 'Path2D (closed: $closed)';
}