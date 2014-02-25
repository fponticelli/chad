package chad.geom;

class Path2D
{
	static inline var EPSILON = 1e-5;
	var points : Array<Vector2D>;
	public var closed(default, null) : Bool;
	public function new(points : Array<Vector2D>, closed : Bool)
	{
		this.points = points;
		this.closed = closed;
	}

	public static function fromArray(points : : Array<Vector2D>, closed : Bool)
	{
		points = null == points ? [] : points;
		var prevpoint = null;
		if(closed && points.length > 0)
			prevpoint = points[points.length-1];
		var newpoints = [];

		points.forEach(function(point) {
			var skip = false;
			if(null != prevpoint)
				skip = point.distanceTo(prevpoint) < EPSILON;
			if(!skip)
				newpoints.push(point);
			prevpoint = point;
		});

		return new Path2D(points, closed);
	}

	public function iterator()
		return points.iterator();

	public function toArray()
		return points.copy();
}