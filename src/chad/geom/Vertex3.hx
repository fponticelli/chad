package chad.geom;

import chad.geom.Vector3;

class Vertex3 {
	inline public function new(position : Vector3, normal : Vector3) {
		this.position = position;
		this.normal = normal;
	}

	@:isVar public var position(default, null) : Vector3;
	@:isVar public var normal(default, null) : Vector3;

	inline public function flip()
		return new Vertex3(position, normal.negate());

	inline public function interpolate(other : Vertex3, t : Float)
		return new Vertex3(
			position.lerp(other.position, t),
			normal.lerp(other.normal, t)
		);

	public function toString()
		return "Vertex3 $position, $normal";
}