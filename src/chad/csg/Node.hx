package chad.csg;

import thx.geom.Polygon;
import thx.geom.Plane;

class Node {
	var polygons : Array<Polygon>;
	var plane : Plane;

	public var front(default, null) : Node;
	public var back(default, null) : Node;

	// please ensure polygons is unmutable and not null
	public function new(?polygons : Array<Polygon>) {
		this.plane = null;
		this.front = null;
		this.back = null;
		this.polygons = [];
		if(null != polygons)
			build(polygons);
	}

	public function build(polygons : Array<Polygon>) {
		if(polygons.length == 0)
			return;
		else {
			if(null == plane)
				plane = polygons[0].plane;

			var front     = [],
				back      = [];
			for(polygon in polygons)
			{
				plane.splitPolygon(polygon, this.polygons, this.polygons, front, back);
			}
			if(front.length > 0)
			{
				if(null == this.front)
					this.front = new Node();
				this.front.build(front);
			}
			if(back.length > 0)
			{
				if(null == this.back)
					this.back = new Node();
				this.back.build(back);
			}
		}
	}

	public function invert() {
		for(i in 0...polygons.length)
		{
			polygons[i] = polygons[i].flip();
		}
		plane = plane.flip();
		if(null != front) front.invert();
		if(null != back) back.invert();
		var temp = front;
		front = back;
		back = temp;
	}

	public function clipPolygons(polygons : Array<Polygon>) : Array<Polygon> {
		if (null == this.plane)
			return polygons.copy();
		else {
			var front = [],
				back  = [];
			for(polygon in polygons)
			{
				plane.splitPolygon(polygon, front, back, front, back);
			}
			if(null != this.front)
				front = this.front.clipPolygons(front);
			if(null != this.back)
				back = this.back.clipPolygons(back);
			else
				back = [];
			return front.concat(back);
		}
	}

	public function clipTo(other : Node) {
		polygons = other.clipPolygons(polygons);
		if(null != front)
			front.clipTo(other);
		if(null != back)
			back.clipTo(other);
	}

	public function iterator()
		return polygons.iterator();

	inline public function all() : Array<Polygon>
		return polygons
			.concat(null == front ? [] : front.all())
			.concat(null == back ? [] : back.all());

	public function toString()
		return 'Node [length: ${all().length}, front: ${null == front}, back: ${null == back}]';
}