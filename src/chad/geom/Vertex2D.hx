package chad.geom;

import chad.geom.Vector2D;

class Vertex2D {
	inline public function new(position : Vector2D, normal : Vector2D) {
		this.position = position;
		this.normal = normal;
	}

	@:isVar public var position(default, null) : Vector2D;
	@:isVar public var normal(default, null) : Vector2D;

	inline public function flip()
		return new Vertex2D(position, normal.negate());

	public function interpolate(other : Vertex2D, t : Float)
		return new Vertex2D(
			position.lerp(other.position, t),
			normal.lerp(other.normal, t)
		);

	inline public function transform(matrix : Matrix4x4)
		return new Vertex2D(position.multiply4x4(matrix), normal.multiply4x4(matrix));

	public function equals(other : Vertex2D)
		return position.equals(other.position) && normal.equals(other.normal);

	public function toString()
		return 'Vertex2D $position, $normal';
}