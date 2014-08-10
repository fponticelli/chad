package chad.geom;

import chad.geom.Vector2D;

using chad.math.Number;

class Vertex2D
{
	inline public function new(position : Vector2D, normal : Vector2D) {
		this.position = position;
		this.normal = normal;
	}

	public static function linearVertex(position : Vector2D)
		return new Vertex2D(position, Vector2D.zero);

	@:isVar public var position(default, null) : Vector2D;
	@:isVar public var normal(default, null) : Vector2D;

	inline public function flip()
		return new Vertex2D(position, normal.negate());

	public function interpolate(other : Vertex2D, t : Float)
		return new Vertex2D(
			position.lerp(other.position, t),
			normal.lerp(other.normal, t)
		);

	public function getDistanceSquared(other : Vertex2D)
	{
		var v = [
			position.x, position.y,
			position.x + normal.x, position.y + normal.y,
			other.position.x + other.normal.x, other.position.y + other.normal.y,
			other.position.x, other.position.y
		];
		if(Number.isZero(v[0] - v[2]) && Number.isZero(v[1] - v[3]) &&
		   Number.isZero(v[6] - v[4]) && Number.isZero(v[7] - v[5]))
		{
			return position.distanceToSquared(other.position);
		}
		// TODO parameters should not be hard coded, particularly precision
		return getLengthSquaredIntegrand(v).integrate(0, 1, 16);
	}

	public function getDistance(other : Vertex2D)
		return Math.sqrt(getDistanceSquared(other));

	inline public function transform(matrix : Matrix4x4)
		return new Vertex2D(position.multiply4x4(matrix), normal.multiply4x4(matrix));

	public function equals(other : Vertex2D)
		return position.equals(other.position) && normal.equals(other.normal);

	public function toString()
		return 'Vertex2D $position, $normal';

	static function getLengthSquaredIntegrand(v : Array<Float>) {
		// Calculate the coefficients of a Bezier derivative.
		var p1x = v[0], p1y = v[1],
			c1x = v[2], c1y = v[3],
			c2x = v[4], c2y = v[5],
			p2x = v[6], p2y = v[7],

			ax = 9 * (c1x - c2x) + 3 * (p2x - p1x),
			bx = 6 * (p1x + c2x) - 12 * c1x,
			cx = 3 * (c1x - p1x),

			ay = 9 * (c1y - c2y) + 3 * (p2y - p1y),
			by = 6 * (p1y + c2y) - 12 * c1y,
			cy = 3 * (c1y - p1y);

		return function(t) {
			// Calculate quadratic equations of derivatives for x and y
			var dx = (ax * t + bx) * t + cx,
				dy = (ay * t + by) * t + cy;
			return dx * dx + dy * dy;
		};
	}
}