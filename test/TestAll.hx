import utest.Runner;
import utest.ui.Report;
import chad.geom.TestPath2D;

class TestAll {
	public static function main() {
		var runner = new Runner();

		runner.addCase(new TestAll());

		Report.create(runner);
		runner.run();
	}

	public function new() {}
}