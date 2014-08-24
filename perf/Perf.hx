import thx.benchmark.SpeedTest;

class Perf {
	inline static function r() return Math.random();

	public static function main() {
		var test = new SpeedTest(1000000);

		function interpolate(a, b, v : Float)
			return (b - a) * v + a;
		function interpolatef(a, b) {
			var diff = b - a;
			return function(v : Float)
				return diff * v + a;
		}

		test.add('interpolate', function(){
			interpolate(1, 5, Math.random());
		}, true);

		test.add('interpolatef', function(){
			interpolatef(1, 5)(Math.random());
		});

		var regen = interpolatef(1, 5);
		test.add('interpolatef regen', function(){
			regen(Math.random());
		});

		test.execute();
	}
}