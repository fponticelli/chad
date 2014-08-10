package chad.geom;
using Lambda;

class Path
{
	var sides : Array<Side>;

	public var closed(default, null) : Bool;
	public var length(get, null) : Float;

	public function new(sides : Array<Side>, closed : Bool)
	{
		this.sides  = sides;
		this.closed = closed;
	}

	public static function fromPoints(points : Array<Vertex2D>, closed = true)
	{
		if(points.length < 2)
			throw "Path must contain at least 2 vertices";
		if(closed && points.length < 3)
			throw "A closed path must contain at least 3 vertices";

		var sides   = [],
			pvertex = new Vertex2D(points[0]),
			nvertex;
		for(i in 1...points.length)
		{
			nvertex = new Vertex2D(points[i];
			sides.push(new Side(pvertex, nvertex));
			pvertex = nvertex;
		}
		if(closed)
			sides.push(new Side(nvertext, sides[0].vertex0));

		return new Path(sides, closed);
	}

	public function union(other : Path)
	{

	}

	public function subtract(other : Path)
	{

	}

	public function intersect(other : Path)
	{

	}

	public function transform(matrix : Matrix4x4)
	{
		var ismirror = matrix.isMirroring(),
			result = new Path(sides.map(function(side) {
				return side.transform(matrix);
			}), closed);
		if(ismirror)
			result = result.flipped();
		return result;
	}

	public function getArea()
	{
		var area = 0.0;
		for(side in sides)
			area += side.vertex0.position.cross(side.vertex1.position);
		return area / 2;
	}

	public function flip()
	{
		var arr = sides.map(function(side) return side.flip());
		arr.reverse();
		return new Path(att, closed);
	}

	public function isSelfIntersecting()
	{
		var length = sides.length,
			side0, side1;
		for(i in 0...length)
		{
			side0 = sides[i];
			for(j in i + 1...length)
			{
				side1 = sides[j];
				if(side1.intersects(side0))
				{
					return true;
				}
			}
		}
	}

	public function isPolygon()
	{
		for(side in sides)
			if(!side.isLinear())
				return false;
		return true;
	}

	private function get_length()
		return null != length ? length : length = sides.fold(function(side, len) return len + side.length, 0.0);

	public function toString()
		return 'Path (${sides.length}): ${sides.map(function(s) return s.toString()).join(", ")}';
}