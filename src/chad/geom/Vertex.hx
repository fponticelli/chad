package chad.geom;

import chad.geom.Vector3D;

class Vertex {
	inline public function new(position : Vector3D)
		this.position = position;

	public var position(default, null) : Vector3D;

	inline public function flip()
		return this;

	inline public function interpolate(other : Vertex, t : Float)
		return new Vertex(
			position.lerp(other.position, t)
		);

	public function toString()
		return "Vertex $position";
}