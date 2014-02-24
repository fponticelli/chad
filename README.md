chad
====

CAD for Haxe

TODO
----

* Progressing boolean operations (event based)
* Transforms:
  - center
  - mirror
  - scale
  - translate
  - rotate
  - matrix
* Operations
  - hull
  - chain hull
  - solid from slices
  - expansion
  - contraction
  - minkowski
* Exporters:
  - STL
  - AMF
  - export to image
* Importers:
  - SCAD
  - STL
  - AMF
  - DXF
  - SVG
* Proper viewer
  - parametric models
* CLI
* Primitives
  - rounded box
  - geodesic sphere
  - cone (from cylinder)
  - pill (rounded cylinder)
  - torus
  - polyhedron
* Vector3
  - min
  - max
  - abs
  - lengthSquared
  - distanceTo
  - distanceToSquared
  - equals
  - multiply4x4
* Vector2
  - negated()
  - abs()
  - plus(othervector)
  - minus(othervector)
  - times(3.0)
  - dividedBy(-5)
  - dot(othervector)
  - lerp(othervector, t)  // linear interpolation (0 <= t <= 1)
  - length()
  - lengthSquared()       // == vec.length()^2
  - unit()
  - normal()              // returns a 90 degree clockwise rotated vector
  - distanceTo(othervector)
  - distanceToSquared(othervector)  // == vec.distanceTo(othervector)^2
  - cross(othervector)    // 2D cross product: returns a scalar
  - equals(othervector)
  - min(othervector)        // returns a new vector with the minimum x and y values
  - max(othervector)        // returns a new vector with the maximum x and y values
  - multiply4x4(matrix4x4)   // right multiply by a 4x4 matrix
  - toVector3D(z)         // convert to a vector3D by adding a z coordinate
  - angleDegrees()        // returns the angle of the vector: [1,0] = 0 degrees, [0, 1] = 90 degrees, etc
  - angleRadians()        // ditto in radians
  - Vector2.fromAngleDegrees(degrees);  // returns a vector at the specified angle
  - Vector2.fromAngleRadians(radians);  // returns a vector at the specified angle
* Matrix4x4
  - var m1 = new CSG.Matrix4x4();          // unity matrix
  - var m2 = new CSG.Matrix4x4( [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] );
  -   // elements are passed in row order
  - var result = m1.plus(m2);
  - var result = m1.minus(m2);
  - var result = m1.multiply(m2);
  - // matrix vector multiplication (vectors are padded with zeroes to get a 4x1 vector):
  - var vec3d = m1.rightMultiply1x3Vector(vec3d);  // matrix * vector 
  - var vec3d = m1.leftMultiply1x3Vector(vec3d);   // vector * matrix
  - var vec2d = m1.rightMultiply1x2Vector(vec2d);  // matrix * vector 
  - var vec2d = m1.leftMultiply1x2Vector(vec2d);   // vector * matrix
  - // common transformation matrices:
  - var m = CSG.Matrix4x4.rotationX(degrees);      // matrix for rotation about X axis
  - var m = CSG.Matrix4x4.rotationY(degrees);      // matrix for rotation about Y axis
  - var m = CSG.Matrix4x4.rotationZ(degrees);      // matrix for rotation about Z axis
  - var m = CSG.Matrix4x4.rotation(rotationCenter, rotationAxis, degrees); // rotation about arbitrary point and axis
  - var m = CSG.Matrix4x4.translation(vec3d);      // translation
  - var m = CSG.Matrix4x4.scaling(vec3d);          // scale
  - var m = CSG.Matrix4x4.mirroring(plane);        // mirroring in a plane; the argument must be a CSG.Plane
  - // matrix transformations can be concatenated:
  - var transform = CSG.Matrix4x4.rotationX(20).multiply(CSG.Matrix4x4.rotationY(30));
  - // Use a CSG solid's transform() method to apply the transformation to a CSG solid
* Line3D
  - var line = new CSG.Line3D(point, direction);      // argumenst are CSG.Vector3D
  - // or by giving two points:
  - var line = CSG.Line3D.fromPoints(p1, p2);         // argumenst are CSG.Vector3D
  - var point = intersectWithPlane(plane);            // == plane.intersectWithLine(this)
  - var line2 = line.reverse();                       // same line but reverse direction
  - var line2 = line.transform(matrix4x4);            // for rotation, scaling, etc
  - var p = line.closestPointOnLine(point);           // project point onto the line
  - var d = line.distanceToPoint(point);
* Line2D
  - var line = new CSG.Line2D(CSG.Line2D(normal,w));
  - // or by giving two points:
  - var line = CSG.Line2D.fromPoints(p1, p2);         // argumenst are CSG.Vector2D
  - var line2 = line.reverse();                       // same line but reverse direction
  - var line2 = line.transform(matrix4x4);            // for rotation, scaling, etc
  - var point = line.origin();                        // returns the point closest to the origin
  - var dir = line.direction();                       // direction vector (CSG.Vector2D)
  - var x = line.xAtY(y);                             // returns the x coordinate of the line at given y coordinate
  - var d = absDistanceToPoint(point);                // returns the absolute distance between a point and the line
  - var p = line.closestPoint(point);                 // projection of point onto the line
  - var point = line.intersectWithLine(line2);        // intersection of two lines, returns CSG.Vector2D
* 2D Primitives
  - text
  - circle
  - rectangle
  - polygon
* 2D Transforms:
  - center
  - mirror
  - scale
  - translate
  - rotate
  - matrix
* 2D Operations
  - union
  - subtraction
  - intersection
  - hull
  - chain hull
  - expansion
  - contraction
  - minkowski
* 2D Path (paper js like?)
* Extrusion
  - linear extrusion
	  - height
	  - twist
      - slices
  - rectangular extrusion
  - rotate extrude
  - path extrusion
* Unify and extend way primitives are built
* Properties (metadata)
  - materials/colors
  - anchor points / connectors
  - bounds (box/sphere)
* Animation
* Lie Flat
* Rounded lines resolution
* Orthonormal Basis