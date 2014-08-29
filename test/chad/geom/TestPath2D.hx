package chad.geom;

import utest.Assert;

class TestPath2D
{
	public function new() { }

/*
	function getOne()
	{
		var p0 : Vector2D = 1.0;
		return Path2D.startAt(p0);
	}

	public function testOneSegmentIsFirstAndLastAndIsNotClosed()
	{
		var one = getOne();
		Assert.isTrue(one.isFirst());
		Assert.isTrue(one.isLast());
		Assert.isFalse(one.closed);
		Assert.isNull(one.prev);
		Assert.isNull(one.next);

		one = one.close();

		Assert.isTrue(one.isFirst());
		Assert.isTrue(one.isLast());
		Assert.isTrue(one.closed);
		Assert.isNull(one.prev);
		Assert.isTrue(one.position.equals(one.next.position));
	}

	public function testIteratorOnOneSegment()
	{
		var one = getOne();
		trace(one.toString());
	}
	public function testIteratorOnTwoSegments()
	{

	}

	public function testIteratorOnTwoClosedSegments()
	{

	}

	public function testUse()
	{
		// square
		PathBuilder.startAt(0.0).forward(10).left(90).times(4).build();

		// circle
		PathBuilder.startAt(0.0).arcLeft(360, 10);

		// spyral
		PathBuilder.startAt(0.0)
			.set("r", 10.0)
			.arcLeft(180, "r")
			.update("r", function(v) return v * 0.9)
			.until(t < 0.1)
		;

		// rounded square
		PathBuilder.startAt(0.0)
			.forward(5)
			.left().withFillet(1)
			.times(4)
			.close()

		//
		var r = 1;
		PathBuilder.startAt(0.0)
			.forward(function() return 5 - r * 2)
			.arcLeft(90, r)
			.times(4)

		//
		PathBuilder.startAt(0.0)

		//
		PathBuilder.startAt(0.0)
	}
*/
}
/*
enum ValueData {
	Literal(v : Float);
	Reference(n : String);
}

abstract Value(ValueData)
{
	inline public function new(v : Value)
		this = v;

	@:from inline public static function fromString(v : String) : ValueWrapper
		return Reference(v);

	@:from inline public static function fromFloat(v : Float) : ValueWrapper
		return Literal(v);
}
*/