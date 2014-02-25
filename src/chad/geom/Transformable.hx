package chad.geom;

typedef Transformable<T>
{
	public function transform(matrix : Matrix4x4) : T;
}

class Transformables
{
	public static inline function mirror(t : Transformable<T>, plane : Plane) : T
		return t.transform(Matrix4x4.mirroring(plane));

	static var MX : Plane = new Plane(new Vector3D(1, 0, 0), 0);
	public static inline function mirrorX(t : Transformable<T>) : T
		return mirror(t, MX);

	static var MY : Plane = new Plane(new Vector3D(0, 1, 0), 0);
	public static inline function mirrorY(t : Transformable<T>) : T
		return mirror(t, MY);

	static var MZ : Plane = new Plane(new Vector3D(0, 0, 1), 0);
	public static inline function mirrorZ(t : Transformable<T>) : T
		return mirror(t, MZ);

	public static inline function translate(t : Transformable<T>, v : Vector3D) : T
		return t.transform(Matrix4x4.translation(v));

	public static inline function scale(t : Transformable<T>, f : Vector3D) : T
		return t.transform(Matrix4x4.scaling(f));

	public static inline function rotateX(t : Transformable<T>, deg : Float) : T
		return t.transform(Matrix4x4.rotationX(deg));

	public static inline function rotateY(t : Transformable<T>, deg : Float) : T
		return t.transform(Matrix4x4.rotationY(deg));

	public static inline function rotateZ(t : Transformable<T>, deg : Float) : T
		return t.transform(Matrix4x4.rotationZ(deg));

	public static inline function rotateZ(t : Transformable<T>, center : Vector3D, axis : Vector3D, deg : Float) : T
		return t.transform(Matrix4x4.rotation(center, axis, deg));
}