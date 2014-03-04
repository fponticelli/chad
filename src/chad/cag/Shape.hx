package chad.cag;

import chad.geom.Vertex2D;
import chad.geom.Side;
import chad.geom.Const;

class Shape
{
	var sides : Array<Side>;

	public function new(sides : Array<Side>)
	{
		this.sides = sides;
	}

	public static function fromPoints(points : Array<Vertex2D>, check = true)
	{
		var length = points.length;
		if(length < 3)
			throw "CAG Shape needs at least three points";
		var sides   = [],
			pvertex = new Vertex2D(points[length-1]),
			nvertex;
		for(point in points)
		{
			nvertex = new Vertex2D(point);
			sides.push(new Side(pvertext, nvertex));
			pvertex = nvertex;
		}

		var shape = new Shape(sides);

		if(!check)
			return shape;

		if(shape.isSelfIntersecting())
			throw "Shape has self intersecting sides";

		var area = shape.getArea();
		if(Math.abs(area) < Const.EPSILON)
			throw "Degenerate shape";

		if(area < 0)
			shape.flip();

		return shape.canonicalized();
	}

	public function union(other : Shape)
	{

	}

	public function subtract(other : Shape)
	{

	}

	public function intersect(other : Shape)
	{

	}

	public function transform(matrix : Matrix4x4)
	{
		var ismirror = matrix.isMirroring(),
			result = new Shape(sides.map(function(side) {
				return side.transform(matrix);
			}));
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
		return new Shape(att);
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

	public function toString()
		return 'Shape (${sides.length}): ${sides.map(function(s) return s.toString()).join(", ")}';
}