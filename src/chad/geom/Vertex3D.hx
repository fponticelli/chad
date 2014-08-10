package chad.geom;

import thx.geom.Point3D;
import thx.geom.Matrix4x4;

class Vertex3D {
	inline public function new(position : Point3D, normal : Point3D) {
		this.position = position;
		this.normal = normal;
	}

	@:isVar public var position(default, null) : Point3D;
	@:isVar public var normal(default, null) : Point3D;

	inline public function flip()
		return new Vertex3D(position, normal.negate());

	inline public function interpolate(other : Vertex3D, t : Float)
		return new Vertex3D(
			position.interpolate(other.position, t),
			normal.interpolate(other.normal, t)
		);

	inline public function transform(matrix : Matrix4x4)
		return new Vertex3D(position.multiply4x4(matrix), normal.multiply4x4(matrix));


	public function toString()
		return 'Vertex3D $position, $normal';
}