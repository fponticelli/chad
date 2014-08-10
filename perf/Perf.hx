import thx.benchmark.SpeedTest;

class Perf {
	inline static function r() return Math.random();

	public static function main() {
		var test = new SpeedTest(1000000);
		test.add('description', function(){});
		test.execute();
	}
}