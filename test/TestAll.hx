import utest.Runner;
import utest.ui.Report;
import chad.geom.TestPath2D;

class TestAll
{
	public static function main()
	{
		var runner = new Runner();

		runner.addCase(new TestPath2D());

		Report.create(runner);

		runner.run();
	}
}