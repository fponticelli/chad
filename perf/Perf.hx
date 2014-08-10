import thx.benchmark.SpeedTest;

import chad.g.Point;
import chad.g.Rect;
import chad.g.Angle;

class Perf {
	inline static function r() return Math.random();

	public static function main() {
		var p1 : Point = [10, 20],
			p2 : Point = [20, 50],
			p3 = p1 + p2;
		trace(-p3 * 2 * p1 / p2);

		var rect = new Rect(p1, p2);

		trace(rect);
		trace(rect.center);

		var deg : Degree = 30.0,
			rad : Radian = deg;

		trace(deg);
		trace(rad);

		var p4 : Point = deg;
		trace(p4);

		var test = new SpeedTest(1000000),
			a = 0.0;
		test.add(
			'Point Array',
			function() {
				var p = new Point(r(), r());
				a = p.x + p.y;
			});

		test.add(
			'Point Object',
			function() {
				var p = new Point2(r(), r());
				a = p.x + p.y;
			});

		test.execute();

		trace(a);
	}
}