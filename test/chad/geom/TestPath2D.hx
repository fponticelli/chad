package chad.geom;

import utest.Assert;
import chad.geom.Segment2D;

class TestPath2D
{
	public function new() { }

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
		var p0 : Vector2D = 0.0,
			path = Path2D.startAt(p0);

	}

	public function testIteratorOnTwoSegments()
	{
		
	}

	public function testIteratorOnTwoClosedSegments()
	{
		
	}
}