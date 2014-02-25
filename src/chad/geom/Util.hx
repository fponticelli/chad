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

	public static function interpolateBetween2DPointsForY(p1 : Vector2D, p2 : Vector2D, y : Float)
	{
		var f1 = y - p1.y,
			f2 = p2.y - p1.y,
			t;
		if(f2 < 0) {
			f1 = -f1;
			f2 = -f2;
		}
		if(f1 <= 0) {
			t = 0.0;
		} else if(f1 >= f2) {
			t = 1.0;
		} else if(f2 < 1e-10) {
			t = 0.5;
		} else {
			t = f1 / f2;
		}
		return p1.x + t * (p2.x - p1.x);
	}
}