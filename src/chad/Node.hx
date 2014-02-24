package chad;

import chad.geom.Box;

class Node {
	public var boundingBox(default, null) : Box;
	private function new(boundingBox : Box) {
		this.boundingBox = boundingBox;
	}
}