package chad.geom;

import chad.geom.Vector3D;

class Vertex3D {
	inline public function new(position : Vector3D, normal : Vector3D) {
		this.position = position;
		this.normal = normal;
	}

	@:isVar public var position(default, null) : Vector3D;
	@:isVar public var normal(default, null) : Vector3D;

	inline public function flip()
		return new Vertex3D(position, normal.negate());

	inline public function interpolate(other : Vertex3D, t : Float)
		return new Vertex3D(
			position.lerp(other.position, t),
			normal.lerp(other.normal, t)
		);

	public function toString()
		return "Vertex3D $position, $normal";
}