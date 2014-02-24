package chad;

import chad.geom.Box;

@:access(chad.geom.Box)
class Project extends Node {
	var nodes : Array<Node>;

	public function new() {
		super(new Box(0.0, 0.0));
		nodes = [];
	}

	public function add(node : Node) {

	}
}