package chad.render;

class LineStyle {
	public var width(default, null) : Float;
	public var color(default, null) : String;
	public var join(default, null) : Join;
	public var cap(default, null) : Cap;

	public function new(width = 1.0, color = "#000000", join = Join.miter, cap = Cap.butt) {
		this.width = width;
		this.color = color;
		this.join = join;
		this.cap = cap;
	}
}