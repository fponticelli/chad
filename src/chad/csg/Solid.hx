package chad.csg;

import thx.geom.Polygon;

abstract Solid(Array<Polygon>) {
  function new(polygons : Array<Polygon>)
    this = polygons;

  @:from public static function fromPolygons(polygons : Array<Polygon>)
    return new Solid(polygons);

  @:op(A+B) public function union(other : Solid) {
    var a = new Node(toArray()),
        b = new Node(other.toArray());

    a.clipTo(b);
    b.clipTo(a);
    b.invert();
    b.clipTo(a);
    b.invert();
    a.build(b.all());

    return fromPolygons(a.all());
  }

  @:op(A-B) public function subtract(other : Solid) {
    var a = new Node(toArray()),
        b = new Node(other.toArray());

    a.invert();
    a.clipTo(b);
    b.clipTo(a);
    b.invert();
    b.clipTo(a);
    b.invert();
    a.build(b.all());
    a.invert();

    return fromPolygons(a.all());
  }

  @:op(A^B)public function intersect(other : Solid) {
    var a = new Node(toArray()),
        b = new Node(other.toArray());

    a.invert();
    b.clipTo(a);
    b.invert();
    a.clipTo(b);
    b.clipTo(a);
    a.build(b.all());
    a.invert();

    return fromPolygons(a.all());
  }

  inline public function toArray()
    return this.copy();

  inline public function iterator()
    return this.iterator();

  @:to inline public function toString()
    return 'Solid(${this.length})';
}