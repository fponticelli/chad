package chad.geom;

class Util
{
	public static function solve2Linear(a : Float, b : Float, c : Float, d : Float, u : Float, v : Float)
	{
		var det = a * d - b * c,
			invdet = 1.0 / det,
			x = u * d - b * v,
			y = -u * c + a * v;

		return new Vector2D(x * invdet, y * invdet);
	}
}