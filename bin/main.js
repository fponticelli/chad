(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	var project = new chad.Project();
	(window || {}).Main = Main;
};
Main.geom = function() {
	var b = new chad.Box(chad.geom._Vector3D.Vector3D_Impl_._new(1.0,1.0,1.0));
	return chad.export.ThreeJS.toModel(chad.csg.Box.create(chad.geom._Vector3D.Vector3D_Impl_._new(-0.5,-0.5,-0.5),chad.geom._Vector3D.Vector3D_Impl_._new(1.0,1.0,1.0)).union(chad.csg.Box.create(chad.geom._Vector3D.Vector3D_Impl_._new(0.1,0.1,0.1),chad.geom._Vector3D.Vector3D_Impl_._new(1.0,1.0,1.0))).subtract(chad.csg.Box.create(chad.geom._Vector3D.Vector3D_Impl_._new(-1.1,-1.1,-1.1),chad.geom._Vector3D.Vector3D_Impl_._new(1.0,1.0,1.0))).intersect(chad.csg.Sphere.create(chad.geom._Vector3D.Vector3D_Impl_._new(0.0,0.0,0.0),0.7)).subtract(chad.csg.Sphere.create(chad.geom._Vector3D.Vector3D_Impl_._new(0.5,0.5,0.5),0.35)).subtract(chad.csg.Cylinder.create((function($this) {
		var $r;
		var arr_0 = 0.0;
		var arr_1 = 0.0;
		var arr_2 = -0.95;
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(null == arr_0?0:arr_0,null == arr_1?0:arr_1,null == arr_2?0:arr_2);
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr_01 = 0.0;
		var arr_11 = 0.0;
		var arr_21 = 0.95;
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(null == arr_01?0:arr_01,null == arr_11?0:arr_11,null == arr_21?0:arr_21);
		return $r;
	}(this)),0.25)).subtract(chad.csg.Cylinder.create((function($this) {
		var $r;
		var arr_02 = 0.0;
		var arr_12 = -0.95;
		var arr_22 = 0.0;
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(null == arr_02?0:arr_02,null == arr_12?0:arr_12,null == arr_22?0:arr_22);
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr_03 = 0.0;
		var arr_13 = 0.95;
		var arr_23 = 0.0;
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(null == arr_03?0:arr_03,null == arr_13?0:arr_13,null == arr_23?0:arr_23);
		return $r;
	}(this)),0.35)).subtract(chad.csg.Cylinder.create((function($this) {
		var $r;
		var arr_04 = -0.95;
		var arr_14 = 0.0;
		var arr_24 = 0.0;
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(null == arr_04?0:arr_04,null == arr_14?0:arr_14,null == arr_24?0:arr_24);
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr_05 = 0.95;
		var arr_15 = 0.0;
		var arr_25 = 0.0;
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(null == arr_05?0:arr_05,null == arr_15?0:arr_15,null == arr_25?0:arr_25);
		return $r;
	}(this)),0.15)));
};
var IMap = function() { };
IMap.__name__ = true;
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var chad = {};
chad.Node = function(boundingBox) {
	this.boundingBox = boundingBox;
};
chad.Node.__name__ = true;
chad.Node.prototype = {
	union: function(node) {
	}
};
chad.Box = function(size) {
	var half = chad.geom._Vector3D.Vector3D_Impl_._new(size[0] / 2.0,size[1] / 2.0,size[2] / 2.0);
	chad.Node.call(this,chad.geom.Box.create(half,chad.geom._Vector3D.Vector3D_Impl_._new(-half[0],-half[1],-half[2])));
};
chad.Box.__name__ = true;
chad.Box.__super__ = chad.Node;
chad.Box.prototype = $extend(chad.Node.prototype,{
	generateCsg: function() {
	}
});
chad.Project = function() {
	chad.Node.call(this,new chad.geom.Box(chad.geom._Vector3D.Vector3D_Impl_._new(0.0,0.0,0.0),chad.geom._Vector3D.Vector3D_Impl_._new(0.0,0.0,0.0)));
	this.nodes = [];
};
chad.Project.__name__ = true;
chad.Project.__super__ = chad.Node;
chad.Project.prototype = $extend(chad.Node.prototype,{
	add: function(node) {
	}
});
chad.csg = {};
chad.csg.Box = function() { };
chad.csg.Box.__name__ = true;
chad.csg.Box.create = function(position,size) {
	return chad.csg.Solid.fromPolygons(chad.csg.Box.baseCube.map(function(info) {
		return new chad.geom.Polygon(info.p.map(function(i) {
			var pos = chad.geom._Vector3D.Vector3D_Impl_._new(position[0] + size[0] * ((i & 1) != 0?1:0),position[1] + size[1] * ((i & 2) != 0?1:0),position[2] + size[2] * ((i & 4) != 0?1:0));
			return new chad.geom.Vertex3D(pos,(function($this) {
				var $r;
				var arr = info.n;
				$r = chad.geom._Vector3D.Vector3D_Impl_._new(null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]);
				return $r;
			}(this)));
		}));
	}));
};
chad.csg.Cylinder = function() { };
chad.csg.Cylinder.__name__ = true;
chad.csg.Cylinder.create = function(start,end,radius,resolution) {
	if(radius == null) radius = 1.0;
	if(null == resolution) resolution = chad.csg.Sphere.getResolution;
	var slices = resolution(radius);
	var ray = chad.geom._Vector3D.Vector3D_Impl_.subtract(end.slice(),start);
	var axisZ;
	var this1 = ray.slice();
	var this2 = this1.slice();
	var divisor = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this1.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2])));
	axisZ = chad.geom._Vector3D.Vector3D_Impl_._new(this2[0] / divisor,this2[1] / divisor,this2[2] / divisor);
	var isY = Math.abs(axisZ[1]) > 0.5;
	var axisX;
	var this3;
	var this4;
	var this5;
	var this6 = chad.geom._Vector3D.Vector3D_Impl_._new(isY?1:0,isY?0:1,0);
	this5 = this6.slice();
	this4 = chad.geom._Vector3D.Vector3D_Impl_._new(this5[1] * axisZ[2] - this5[2] * axisZ[1],this5[2] * axisZ[0] - this5[0] * axisZ[2],this5[0] * axisZ[1] - this5[1] * axisZ[0]);
	this3 = this4.slice();
	var this7 = this3.slice();
	var divisor1 = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this3.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this3[0]?0:this3[0],null == this3[1]?0:this3[1],null == this3[2]?0:this3[2])));
	axisX = chad.geom._Vector3D.Vector3D_Impl_._new(this7[0] / divisor1,this7[1] / divisor1,this7[2] / divisor1);
	var axisY;
	var this8;
	var this9;
	var this10 = axisX.slice();
	this9 = chad.geom._Vector3D.Vector3D_Impl_._new(this10[1] * axisZ[2] - this10[2] * axisZ[1],this10[2] * axisZ[0] - this10[0] * axisZ[2],this10[0] * axisZ[1] - this10[1] * axisZ[0]);
	this8 = this9.slice();
	var this11 = this8.slice();
	var divisor2 = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this8.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this8[0]?0:this8[0],null == this8[1]?0:this8[1],null == this8[2]?0:this8[2])));
	axisY = chad.geom._Vector3D.Vector3D_Impl_._new(this11[0] / divisor2,this11[1] / divisor2,this11[2] / divisor2);
	var s = new chad.geom.Vertex3D(start,(function($this) {
		var $r;
		var this12 = axisZ.slice();
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(-this12[0],-this12[1],-this12[2]);
		return $r;
	}(this)));
	var e = new chad.geom.Vertex3D(end,(function($this) {
		var $r;
		var this13 = axisZ.slice();
		var this14 = this13.slice();
		var divisor3 = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this13.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this13[0]?0:this13[0],null == this13[1]?0:this13[1],null == this13[2]?0:this13[2])));
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(this14[0] / divisor3,this14[1] / divisor3,this14[2] / divisor3);
		return $r;
	}(this)));
	var polygons = [];
	var t0;
	var t1;
	var point = function(stack,slice,normalBlend) {
		var angle = slice * Math.PI * 2;
		var out = chad.geom._Vector3D.Vector3D_Impl_.add((function($this) {
			var $r;
			var this15;
			{
				var this16 = axisX.slice();
				var multiplier = Math.cos(angle);
				this15 = chad.geom._Vector3D.Vector3D_Impl_._new(this16[0] * multiplier,this16[1] * multiplier,this16[2] * multiplier);
			}
			$r = this15.slice();
			return $r;
		}(this)),(function($this) {
			var $r;
			var this17 = axisY.slice();
			var multiplier1 = Math.sin(angle);
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(this17[0] * multiplier1,this17[1] * multiplier1,this17[2] * multiplier1);
			return $r;
		}(this)));
		var pos = chad.geom._Vector3D.Vector3D_Impl_.add((function($this) {
			var $r;
			var this18 = chad.geom._Vector3D.Vector3D_Impl_.add(start.slice(),(function($this) {
				var $r;
				var this19 = ray.slice();
				$r = chad.geom._Vector3D.Vector3D_Impl_._new(this19[0] * stack,this19[1] * stack,this19[2] * stack);
				return $r;
			}($this)));
			$r = this18.slice();
			return $r;
		}(this)),(function($this) {
			var $r;
			var this20 = out.slice();
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(this20[0] * radius,this20[1] * radius,this20[2] * radius);
			return $r;
		}(this)));
		var normal = chad.geom._Vector3D.Vector3D_Impl_.add((function($this) {
			var $r;
			var this21;
			{
				var this22 = out.slice();
				var multiplier2 = 1 - Math.abs(normalBlend);
				this21 = chad.geom._Vector3D.Vector3D_Impl_._new(this22[0] * multiplier2,this22[1] * multiplier2,this22[2] * multiplier2);
			}
			$r = this21.slice();
			return $r;
		}(this)),(function($this) {
			var $r;
			var this23 = axisZ.slice();
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(this23[0] * normalBlend,this23[1] * normalBlend,this23[2] * normalBlend);
			return $r;
		}(this)));
		return new chad.geom.Vertex3D(pos,normal);
	};
	var _g = 0;
	while(_g < slices) {
		var i = _g++;
		t0 = i / slices;
		t1 = (i + 1) / slices;
		polygons.push(new chad.geom.Polygon([s,point(0,t0,-1),point(0,t1,-1)]));
		polygons.push(new chad.geom.Polygon([point(0,t1,0),point(0,t0,0),point(1,t0,0),point(1,t1,0)]));
		polygons.push(new chad.geom.Polygon([e,point(1,t1,1),point(1,t0,1)]));
	}
	return chad.csg.Solid.fromPolygons(polygons);
};
chad.csg.Node = function(polygons) {
	this.plane = null;
	this.front = null;
	this.back = null;
	this.polygons = [];
	if(null != polygons) this.build(polygons);
};
chad.csg.Node.__name__ = true;
chad.csg.Node.prototype = {
	build: function(polygons) {
		if(polygons.length == 0) return; else {
			if(null == this.plane) this.plane = polygons[0].get_plane();
			var front = [];
			var back = [];
			var _g = 0;
			while(_g < polygons.length) {
				var polygon = polygons[_g];
				++_g;
				this.plane.splitPolygon(polygon,this.polygons,this.polygons,front,back);
			}
			if(front.length > 0) {
				if(null == this.front) this.front = new chad.csg.Node();
				this.front.build(front);
			}
			if(back.length > 0) {
				if(null == this.back) this.back = new chad.csg.Node();
				this.back.build(back);
			}
		}
	}
	,invert: function() {
		var _g1 = 0;
		var _g = this.polygons.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.polygons[i] = this.polygons[i].flip();
		}
		this.plane = this.plane.flip();
		if(null != this.front) this.front.invert();
		if(null != this.back) this.back.invert();
		var temp = this.front;
		this.front = this.back;
		this.back = temp;
	}
	,clipPolygons: function(polygons) {
		if(null == this.plane) return polygons.slice(); else {
			var front = [];
			var back = [];
			var _g = 0;
			while(_g < polygons.length) {
				var polygon = polygons[_g];
				++_g;
				this.plane.splitPolygon(polygon,front,back,front,back);
			}
			if(null != this.front) front = this.front.clipPolygons(front);
			if(null != this.back) back = this.back.clipPolygons(back); else back = [];
			return front.concat(back);
		}
	}
	,clipTo: function(other) {
		this.polygons = other.clipPolygons(this.polygons);
		if(null != this.front) this.front.clipTo(other);
		if(null != this.back) this.back.clipTo(other);
	}
	,iterator: function() {
		return HxOverrides.iter(this.polygons);
	}
	,all: function() {
		return this.polygons.concat(null == this.front?[]:this.front.all()).concat(null == this.back?[]:this.back.all());
	}
	,toString: function() {
		return "Node [length: " + this.polygons.concat(null == this.front?[]:this.front.all()).concat(null == this.back?[]:this.back.all()).length + ", front: " + ("" + (null == this.front)) + ", back: " + ("" + (null == this.back)) + "]";
	}
};
chad.csg.Solid = function() {
};
chad.csg.Solid.__name__ = true;
chad.csg.Solid.fromPolygons = function(polygons) {
	var solid = new chad.csg.Solid();
	solid.polygons = polygons;
	return solid;
};
chad.csg.Solid.prototype = {
	union: function(other) {
		var a = new chad.csg.Node(this.polygons.slice());
		var b = new chad.csg.Node(other.polygons.slice());
		a.clipTo(b);
		b.clipTo(a);
		b.invert();
		b.clipTo(a);
		b.invert();
		a.build(b.polygons.concat(null == b.front?[]:b.front.all()).concat(null == b.back?[]:b.back.all()));
		return chad.csg.Solid.fromPolygons(a.polygons.concat(null == a.front?[]:a.front.all()).concat(null == a.back?[]:a.back.all()));
	}
	,subtract: function(other) {
		var a = new chad.csg.Node(this.polygons.slice());
		var b = new chad.csg.Node(other.polygons.slice());
		a.invert();
		a.clipTo(b);
		b.clipTo(a);
		b.invert();
		b.clipTo(a);
		b.invert();
		a.build(b.polygons.concat(null == b.front?[]:b.front.all()).concat(null == b.back?[]:b.back.all()));
		a.invert();
		return chad.csg.Solid.fromPolygons(a.polygons.concat(null == a.front?[]:a.front.all()).concat(null == a.back?[]:a.back.all()));
	}
	,intersect: function(other) {
		var a = new chad.csg.Node(this.polygons.slice());
		var b = new chad.csg.Node(other.polygons.slice());
		a.invert();
		b.clipTo(a);
		b.invert();
		a.clipTo(b);
		b.clipTo(a);
		a.build(b.polygons.concat(null == b.front?[]:b.front.all()).concat(null == b.back?[]:b.back.all()));
		a.invert();
		return chad.csg.Solid.fromPolygons(a.polygons.concat(null == a.front?[]:a.front.all()).concat(null == a.back?[]:a.back.all()));
	}
	,iterator: function() {
		return HxOverrides.iter(this.polygons);
	}
	,toString: function() {
		return "Solid [" + this.polygons.length + "]";
	}
};
chad.csg.Sphere = function() { };
chad.csg.Sphere.__name__ = true;
chad.csg.Sphere.getResolution = function(r) {
	return 36;
};
chad.csg.Sphere.create = function(position,radius,resolution) {
	if(radius == null) radius = 1.0;
	if(null == resolution) resolution = chad.csg.Sphere.getResolution;
	var slices = resolution(radius);
	var stacks = Math.ceil(slices / 2);
	var polygons = [];
	var vertices = [];
	var Vertex3D = function(theta,phi) {
		theta *= Math.PI * 2;
		phi *= Math.PI;
		var dir = chad.geom._Vector3D.Vector3D_Impl_._new(Math.cos(theta) * Math.sin(phi),Math.cos(phi),Math.sin(theta) * Math.sin(phi));
		vertices.push(new chad.geom.Vertex3D(chad.geom._Vector3D.Vector3D_Impl_.add(position.slice(),(function($this) {
			var $r;
			var this1 = dir.slice();
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(this1[0] * radius,this1[1] * radius,this1[2] * radius);
			return $r;
		}(this))),dir));
	};
	var _g = 0;
	while(_g < slices) {
		var i = _g++;
		var _g1 = 0;
		while(_g1 < stacks) {
			var j = _g1++;
			vertices = [];
			Vertex3D(i / slices,j / stacks);
			if(j > 0) Vertex3D((i + 1) / slices,j / stacks);
			if(j < stacks - 1) Vertex3D((i + 1) / slices,(j + 1) / stacks);
			Vertex3D(i / slices,(j + 1) / stacks);
			polygons.push(new chad.geom.Polygon(vertices));
		}
	}
	return chad.csg.Solid.fromPolygons(polygons);
};
chad["export"] = {};
chad.export.ThreeJS = function() { };
chad.export.ThreeJS.__name__ = true;
chad.export.ThreeJS.getVertices = function(vertices) {
	var acc = [];
	var $it0 = vertices.iterator();
	while( $it0.hasNext() ) {
		var combo = $it0.next();
		acc = acc.concat((function($this) {
			var $r;
			var this1 = combo.Vertex3D.position.slice();
			$r = this1.slice();
			return $r;
		}(this)));
	}
	return acc;
};
chad.export.ThreeJS.getNormals = function(vertices) {
	var acc = [];
	var $it0 = vertices.iterator();
	while( $it0.hasNext() ) {
		var combo = $it0.next();
		acc = acc.concat((function($this) {
			var $r;
			var this1 = combo.Vertex3D.normal.slice();
			$r = this1.slice();
			return $r;
		}(this)));
	}
	return acc;
};
chad.export.ThreeJS.toModel = function(solid) {
	var faces = [];
	var vertices = new haxe.ds.StringMap();
	var index = 0;
	var $it0 = solid.iterator();
	while( $it0.hasNext() ) {
		var polygon = $it0.next();
		var $it1 = HxOverrides.iter(polygon.vertices);
		while( $it1.hasNext() ) {
			var Vertex3D = $it1.next();
			var key = Vertex3D.toString();
			if(!vertices.exists(key)) {
				var value = { index : index++, Vertex3D : Vertex3D};
				vertices.set(key,value);
			}
		}
	}
	var $it2 = solid.iterator();
	while( $it2.hasNext() ) {
		var polygon1 = $it2.next();
		index = 0;
		var arr = polygon1.vertices.slice();
		var _g1 = 2;
		var _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			faces = faces.concat([32,((function($this) {
				var $r;
				var key1 = arr[0].toString();
				$r = vertices.get(key1);
				return $r;
			}(this))).index,((function($this) {
				var $r;
				var key2 = arr[i - 1].toString();
				$r = vertices.get(key2);
				return $r;
			}(this))).index,((function($this) {
				var $r;
				var key3 = arr[i].toString();
				$r = vertices.get(key3);
				return $r;
			}(this))).index,((function($this) {
				var $r;
				var key4 = arr[0].toString();
				$r = vertices.get(key4);
				return $r;
			}(this))).index,((function($this) {
				var $r;
				var key5 = arr[i - 1].toString();
				$r = vertices.get(key5);
				return $r;
			}(this))).index,((function($this) {
				var $r;
				var key6 = arr[i].toString();
				$r = vertices.get(key6);
				return $r;
			}(this))).index]);
		}
	}
	return { metadata : { formatVersion : 3}, vertices : chad.export.ThreeJS.getVertices(vertices), normals : chad.export.ThreeJS.getNormals(vertices), faces : faces};
};
chad.geom = {};
chad.geom.Box = function(min,max) {
	this.min = min;
	this.max = max;
};
chad.geom.Box.__name__ = true;
chad.geom.Box.create = function(a,b) {
	return new chad.geom.Box((function($this) {
		var $r;
		var this1 = a.slice();
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(Math.min(this1[0],b[0]),Math.min(this1[1],b[1]),Math.min(this1[2],b[2]));
		return $r;
	}(this)),(function($this) {
		var $r;
		var this2 = a.slice();
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(Math.max(this2[0],b[0]),Math.max(this2[1],b[1]),Math.max(this2[2],b[2]));
		return $r;
	}(this)));
};
chad.geom.Box.prototype = {
	union: function(other) {
		return new chad.geom.Box((function($this) {
			var $r;
			var this1 = other.min.slice();
			var other1 = $this.min;
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(Math.min(this1[0],other1[0]),Math.min(this1[1],other1[1]),Math.min(this1[2],other1[2]));
			return $r;
		}(this)),(function($this) {
			var $r;
			var this2 = other.max.slice();
			var other2 = $this.max;
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(Math.max(this2[0],other2[0]),Math.max(this2[1],other2[1]),Math.max(this2[2],other2[2]));
			return $r;
		}(this)));
	}
	,subtract: function(other) {
		throw "not implemented";
	}
	,intersect: function(other) {
		throw "not implemented";
	}
	,transform: function(matrix) {
		throw "not implemented";
	}
	,toString: function() {
		return "Box [$min, $max]";
	}
};
chad.geom.Line2D = function(normal,w) {
	var l = Math.sqrt((function($this) {
		var $r;
		var this1 = normal.slice();
		var prod_0;
		if(null == normal[0]) prod_0 = 0; else prod_0 = normal[0];
		var prod_1;
		if(null == normal[1]) prod_1 = 0; else prod_1 = normal[1];
		$r = this1[0] * prod_0 + this1[1] * prod_1;
		return $r;
	}(this)));
	this.w = w * l;
	var this2 = normal.slice();
	this.normal = [this2[0] / l,this2[1] / l];
};
chad.geom.Line2D.__name__ = true;
chad.geom.Line2D.fromPoints = function(p1,p2) {
	var direction;
	var this1 = p2.slice();
	direction = [this1[0] - p1[0],this1[1] - p1[1]];
	var normal;
	var this2;
	var this3;
	var this4;
	var this5;
	var this6 = direction.slice();
	this5 = [this6[1],-this6[0]];
	this4 = this5.slice();
	this3 = [-this4[0],-this4[1]];
	this2 = this3.slice();
	var this7 = this2.slice();
	var divisor = Math.sqrt((function($this) {
		var $r;
		var this8 = this2.slice();
		var prod_0;
		if(null == this2[0]) prod_0 = 0; else prod_0 = this2[0];
		var prod_1;
		if(null == this2[1]) prod_1 = 0; else prod_1 = this2[1];
		$r = this8[0] * prod_0 + this8[1] * prod_1;
		return $r;
	}(this)));
	normal = [this7[0] / divisor,this7[1] / divisor];
	var w;
	var this9 = p1.slice();
	w = this9[0] * normal[0] + this9[1] * normal[1];
	return new chad.geom.Line2D(normal,w);
};
chad.geom.Line2D.prototype = {
	reverse: function() {
		return new chad.geom.Line2D((function($this) {
			var $r;
			var this1 = $this.normal.slice();
			$r = [-this1[0],-this1[1]];
			return $r;
		}(this)),-this.w);
	}
	,equals: function(other) {
		return (function($this) {
			var $r;
			var this1 = $this.normal.slice();
			var other1 = other.normal;
			$r = this1[0] == other1[0] && this1[1] == other1[1];
			return $r;
		}(this)) && this.w == other.w;
	}
	,origin: function() {
		var this1 = this.normal.slice();
		var multiplier = this.w;
		return [this1[0] * multiplier,this1[1] * multiplier];
	}
	,direction: function() {
		var this1 = this.normal.slice();
		return [this1[1],-this1[0]];
	}
	,xAtY: function(y) {
		return (this.w - this.normal[1] * y) / this.normal[0];
	}
	,absDistanceToPoint: function(point) {
		return Math.abs((function($this) {
			var $r;
			var this1 = point.slice();
			var prod = $this.normal;
			$r = this1[0] * prod[0] + this1[1] * prod[1];
			return $r;
		}(this)) - this.w);
	}
	,intersectWithLine: function(line2d) {
		return chad.geom.Util.solve2Linear(this.normal[0],this.normal[1],line2d.normal[0],line2d.normal[1],this.w,line2d.w);
	}
	,transform: function(matrix) {
		var origin_0 = 0;
		var origin_1 = 0;
		var pointOnPlane;
		var this1 = this.normal.slice();
		var multiplier = this.w;
		pointOnPlane = [this1[0] * multiplier,this1[1] * multiplier];
		var neworigin;
		var this2 = null();
		neworigin = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector2D(matrix.slice(),[null == this2[0]?0:this2[0],null == this2[1]?0:this2[1]]);
		var neworiginPlusNormal;
		var this3 = this.normal.slice();
		neworiginPlusNormal = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector2D(matrix.slice(),[null == this3[0]?0:this3[0],null == this3[1]?0:this3[1]]);
		var newnormal;
		var this4 = neworiginPlusNormal.slice();
		newnormal = [this4[0] - neworigin[0],this4[1] - neworigin[1]];
		var newpointOnPlane;
		var this5 = pointOnPlane.slice();
		newpointOnPlane = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector2D(matrix.slice(),[null == this5[0]?0:this5[0],null == this5[1]?0:this5[1]]);
		var neww;
		var this6 = newnormal.slice();
		neww = this6[0] * newpointOnPlane[0] + this6[1] * newpointOnPlane[1];
		return new chad.geom.Line2D(newnormal,neww);
	}
};
chad.geom.Line3D = function(point,direction) {
	this.point = point;
	var this1 = direction.slice();
	var this2 = this1.slice();
	var divisor = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this1.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2])));
	this.direction = chad.geom._Vector3D.Vector3D_Impl_._new(this2[0] / divisor,this2[1] / divisor,this2[2] / divisor);
};
chad.geom.Line3D.__name__ = true;
chad.geom.Line3D.fromPoints = function(p1,p2) {
	return new chad.geom.Line3D(p1,(function($this) {
		var $r;
		var this1;
		{
			var this2 = chad.geom._Vector3D.Vector3D_Impl_.subtract(p2.slice(),p1);
			this1 = this2.slice();
		}
		var this3 = this1.slice();
		var divisor = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this1.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2])));
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(this3[0] / divisor,this3[1] / divisor,this3[2] / divisor);
		return $r;
	}(this)));
};
chad.geom.Line3D.fromPlanes = function(p1,p2) {
	var direction;
	var this1 = p1.normal.slice();
	var other = p2.normal;
	direction = chad.geom._Vector3D.Vector3D_Impl_._new(this1[1] * other[2] - this1[2] * other[1],this1[2] * other[0] - this1[0] * other[2],this1[0] * other[1] - this1[1] * other[0]);
	var l = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(direction.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == direction[0]?0:direction[0],null == direction[1]?0:direction[1],null == direction[2]?0:direction[2])));
	if(l < 1e-10) throw "Parallel planes";
	var this2 = direction.slice();
	var multiplier = 1.0 / l;
	direction = chad.geom._Vector3D.Vector3D_Impl_._new(this2[0] * multiplier,this2[1] * multiplier,this2[2] * multiplier);
	var mabsx = Math.abs(direction[0]);
	var mabsy = Math.abs(direction[1]);
	var mabsz = Math.abs(direction[2]);
	var origin;
	if(mabsx >= mabsy && mabsx >= mabsz) {
		var r = chad.geom.Util.solve2Linear(p1.normal[1],p1.normal[2],p2.normal[1],p2.normal[2],p1.w,p2.w);
		origin = chad.geom._Vector3D.Vector3D_Impl_._new(0,r[0],r[1]);
	} else if(mabsy >= mabsx && mabsy >= mabsz) {
		var r1 = chad.geom.Util.solve2Linear(p1.normal[0],p1.normal[2],p2.normal[0],p2.normal[2],p1.w,p2.w);
		origin = chad.geom._Vector3D.Vector3D_Impl_._new(r1[0],0,r1[1]);
	} else {
		var r2 = chad.geom.Util.solve2Linear(p1.normal[0],p1.normal[1],p2.normal[0],p2.normal[1],p1.w,p2.w);
		origin = chad.geom._Vector3D.Vector3D_Impl_._new(r2[0],r2[1],0);
	}
	return new chad.geom.Line3D(origin,direction);
};
chad.geom.Line3D.prototype = {
	intersectWithPlane: function(plane) {
		var lambda = (plane.w - chad.geom._Vector3D.Vector3D_Impl_.dot(plane.normal.slice(),this.point)) / chad.geom._Vector3D.Vector3D_Impl_.dot(plane.normal.slice(),this.direction);
		return chad.geom._Vector3D.Vector3D_Impl_.add(this.point.slice(),(function($this) {
			var $r;
			var this1 = $this.direction.slice();
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(this1[0] * lambda,this1[1] * lambda,this1[2] * lambda);
			return $r;
		}(this)));
	}
	,reverse: function() {
		return new chad.geom.Line3D(this.point,(function($this) {
			var $r;
			var this1 = $this.direction.slice();
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(-this1[0],-this1[1],-this1[2]);
			return $r;
		}(this)));
	}
	,transform: function(matrix4x4) {
		var newpoint;
		var this1 = this.point.slice();
		newpoint = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix4x4.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]));
		var pointaddDirection = chad.geom._Vector3D.Vector3D_Impl_.add(this.point.slice(),this.direction);
		var newPointaddDirection;
		var this2 = pointaddDirection.slice();
		newPointaddDirection = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix4x4.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this2[0]?0:this2[0],null == this2[1]?0:this2[1],null == this2[2]?0:this2[2]));
		var newdirection = chad.geom._Vector3D.Vector3D_Impl_.subtract(newPointaddDirection.slice(),newpoint);
		return new chad.geom.Line3D(newpoint,newdirection);
	}
	,closestPointOnLine: function(point) {
		var t = chad.geom._Vector3D.Vector3D_Impl_.dot((function($this) {
			var $r;
			var this1 = chad.geom._Vector3D.Vector3D_Impl_.subtract(point.slice(),point);
			$r = this1.slice();
			return $r;
		}(this)),this.direction) / chad.geom._Vector3D.Vector3D_Impl_.dot(this.direction.slice(),this.direction);
		return chad.geom._Vector3D.Vector3D_Impl_.add(point.slice(),(function($this) {
			var $r;
			var this2 = $this.direction.slice();
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(this2[0] * t,this2[1] * t,this2[2] * t);
			return $r;
		}(this)));
	}
	,distanceToPoint: function(point) {
		var closestpoint = this.closestPointOnLine(point);
		var distancevector = chad.geom._Vector3D.Vector3D_Impl_.subtract(point.slice(),closestpoint);
		return Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(distancevector.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == distancevector[0]?0:distancevector[0],null == distancevector[1]?0:distancevector[1],null == distancevector[2]?0:distancevector[2])));
	}
	,equals: function(line) {
		if(!chad.geom._Vector3D.Vector3D_Impl_.equals(this.direction.slice(),line.direction)) return false;
		return this.distanceToPoint(line.point) <= 1e-8;
	}
};
chad.geom._Matrix4x4 = {};
chad.geom._Matrix4x4.Matrix4x4_Impl_ = function() { };
chad.geom._Matrix4x4.Matrix4x4_Impl_.__name__ = true;
chad.geom._Matrix4x4.Matrix4x4_Impl_.fromArray = function(e) {
	if(e.length != 16) throw "Invalid array length (" + e.length + ") for Matrix4x4, should be 16";
	return [e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.rotationX = function(degrees) {
	var radians = degrees * Math.PI * 0.00555555555555555577;
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	return [1,0,0,0,0,cos,sin,0,0,-sin,cos,0,0,0,0,1];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.rotationY = function(degrees) {
	var radians = degrees * Math.PI * 0.00555555555555555577;
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	return [cos,0,-sin,0,0,1,0,0,sin,0,cos,0,0,0,0,1];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.rotationZ = function(degrees) {
	var radians = degrees * Math.PI * 0.00555555555555555577;
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	return [cos,sin,0,0,-sin,cos,0,0,0,0,1,0,0,0,0,1];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.rotation = function(rotationCenter,rotationAxis,degrees) {
	var rotationPlane = chad.geom.Plane.fromNormalAndPoint(rotationAxis,rotationCenter);
	var orthobasis = new chad.geom.OrthoNormalBasis(rotationPlane,chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector(rotationPlane.normal.slice()));
	var transformation = chad.geom._Matrix4x4.Matrix4x4_Impl_.translation((function($this) {
		var $r;
		var this1 = rotationCenter.slice();
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(-this1[0],-this1[1],-this1[2]);
		return $r;
	}(this)));
	transformation = chad.geom._Matrix4x4.Matrix4x4_Impl_.multiply(transformation.slice(),orthobasis.getProjectionMatrix());
	transformation = chad.geom._Matrix4x4.Matrix4x4_Impl_.multiply(transformation.slice(),chad.geom._Matrix4x4.Matrix4x4_Impl_.rotationZ(degrees));
	transformation = chad.geom._Matrix4x4.Matrix4x4_Impl_.multiply(transformation.slice(),orthobasis.getInverseProjectionMatrix());
	transformation = chad.geom._Matrix4x4.Matrix4x4_Impl_.multiply(transformation.slice(),chad.geom._Matrix4x4.Matrix4x4_Impl_.translation(rotationCenter));
	return transformation;
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.translation = function(vec) {
	return [1,0,0,0,0,1,0,0,0,0,1,0,vec[0],vec[1],vec[2],1];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.mirroring = function(plane) {
	var nx = plane.normal[0];
	var ny = plane.normal[1];
	var nz = plane.normal[2];
	var w = plane.w;
	return [1.0 - 2.0 * nx * nx,-2. * ny * nx,-2. * nz * nx,0,-2. * nx * ny,1.0 - 2.0 * ny * ny,-2. * nz * ny,0,-2. * nx * nz,-2. * ny * nz,1.0 - 2.0 * nz * nz,0,-2. * nx * w,-2. * ny * w,-2. * nz * w,1];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.scaling = function(vec) {
	return [vec[0],0,0,0,0,vec[1],0,0,0,0,vec[2],0,0,0,0,1];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_._new = function(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15) {
	return [e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.toArray = function(this1) {
	return this1.slice();
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.add = function(this1,other) {
	var e0;
	e0 = (function($this) {
		var $r;
		var this2 = this1.slice();
		$r = this2[0];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this3 = other.slice();
		$r = this3[0];
		return $r;
	}(this));
	var e1;
	e1 = (function($this) {
		var $r;
		var this4 = this1.slice();
		$r = this4[1];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this5 = other.slice();
		$r = this5[1];
		return $r;
	}(this));
	var e2;
	e2 = (function($this) {
		var $r;
		var this6 = this1.slice();
		$r = this6[2];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this7 = other.slice();
		$r = this7[2];
		return $r;
	}(this));
	var e3;
	e3 = (function($this) {
		var $r;
		var this8 = this1.slice();
		$r = this8[3];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this9 = other.slice();
		$r = this9[3];
		return $r;
	}(this));
	var e4;
	e4 = (function($this) {
		var $r;
		var this10 = this1.slice();
		$r = this10[4];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this11 = other.slice();
		$r = this11[4];
		return $r;
	}(this));
	var e5;
	e5 = (function($this) {
		var $r;
		var this12 = this1.slice();
		$r = this12[5];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this13 = other.slice();
		$r = this13[5];
		return $r;
	}(this));
	var e6;
	e6 = (function($this) {
		var $r;
		var this14 = this1.slice();
		$r = this14[6];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this15 = other.slice();
		$r = this15[6];
		return $r;
	}(this));
	var e7;
	e7 = (function($this) {
		var $r;
		var this16 = this1.slice();
		$r = this16[7];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this17 = other.slice();
		$r = this17[7];
		return $r;
	}(this));
	var e8;
	e8 = (function($this) {
		var $r;
		var this18 = this1.slice();
		$r = this18[8];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this19 = other.slice();
		$r = this19[8];
		return $r;
	}(this));
	var e9;
	e9 = (function($this) {
		var $r;
		var this20 = this1.slice();
		$r = this20[9];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this21 = other.slice();
		$r = this21[9];
		return $r;
	}(this));
	var e10;
	e10 = (function($this) {
		var $r;
		var this22 = this1.slice();
		$r = this22[10];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this23 = other.slice();
		$r = this23[10];
		return $r;
	}(this));
	var e11;
	e11 = (function($this) {
		var $r;
		var this24 = this1.slice();
		$r = this24[11];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this25 = other.slice();
		$r = this25[11];
		return $r;
	}(this));
	var e12;
	e12 = (function($this) {
		var $r;
		var this26 = this1.slice();
		$r = this26[12];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this27 = other.slice();
		$r = this27[12];
		return $r;
	}(this));
	var e13;
	e13 = (function($this) {
		var $r;
		var this28 = this1.slice();
		$r = this28[13];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this29 = other.slice();
		$r = this29[13];
		return $r;
	}(this));
	var e14;
	e14 = (function($this) {
		var $r;
		var this30 = this1.slice();
		$r = this30[14];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this31 = other.slice();
		$r = this31[14];
		return $r;
	}(this));
	var e15;
	e15 = (function($this) {
		var $r;
		var this32 = this1.slice();
		$r = this32[15];
		return $r;
	}(this)) + (function($this) {
		var $r;
		var this33 = other.slice();
		$r = this33[15];
		return $r;
	}(this));
	return [e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.subtract = function(this1,other) {
	var e0;
	e0 = (function($this) {
		var $r;
		var this2 = this1.slice();
		$r = this2[0];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this3 = other.slice();
		$r = this3[0];
		return $r;
	}(this));
	var e1;
	e1 = (function($this) {
		var $r;
		var this4 = this1.slice();
		$r = this4[1];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this5 = other.slice();
		$r = this5[1];
		return $r;
	}(this));
	var e2;
	e2 = (function($this) {
		var $r;
		var this6 = this1.slice();
		$r = this6[2];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this7 = other.slice();
		$r = this7[2];
		return $r;
	}(this));
	var e3;
	e3 = (function($this) {
		var $r;
		var this8 = this1.slice();
		$r = this8[3];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this9 = other.slice();
		$r = this9[3];
		return $r;
	}(this));
	var e4;
	e4 = (function($this) {
		var $r;
		var this10 = this1.slice();
		$r = this10[4];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this11 = other.slice();
		$r = this11[4];
		return $r;
	}(this));
	var e5;
	e5 = (function($this) {
		var $r;
		var this12 = this1.slice();
		$r = this12[5];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this13 = other.slice();
		$r = this13[5];
		return $r;
	}(this));
	var e6;
	e6 = (function($this) {
		var $r;
		var this14 = this1.slice();
		$r = this14[6];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this15 = other.slice();
		$r = this15[6];
		return $r;
	}(this));
	var e7;
	e7 = (function($this) {
		var $r;
		var this16 = this1.slice();
		$r = this16[7];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this17 = other.slice();
		$r = this17[7];
		return $r;
	}(this));
	var e8;
	e8 = (function($this) {
		var $r;
		var this18 = this1.slice();
		$r = this18[8];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this19 = other.slice();
		$r = this19[8];
		return $r;
	}(this));
	var e9;
	e9 = (function($this) {
		var $r;
		var this20 = this1.slice();
		$r = this20[9];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this21 = other.slice();
		$r = this21[9];
		return $r;
	}(this));
	var e10;
	e10 = (function($this) {
		var $r;
		var this22 = this1.slice();
		$r = this22[10];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this23 = other.slice();
		$r = this23[10];
		return $r;
	}(this));
	var e11;
	e11 = (function($this) {
		var $r;
		var this24 = this1.slice();
		$r = this24[11];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this25 = other.slice();
		$r = this25[11];
		return $r;
	}(this));
	var e12;
	e12 = (function($this) {
		var $r;
		var this26 = this1.slice();
		$r = this26[12];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this27 = other.slice();
		$r = this27[12];
		return $r;
	}(this));
	var e13;
	e13 = (function($this) {
		var $r;
		var this28 = this1.slice();
		$r = this28[13];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this29 = other.slice();
		$r = this29[13];
		return $r;
	}(this));
	var e14;
	e14 = (function($this) {
		var $r;
		var this30 = this1.slice();
		$r = this30[14];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this31 = other.slice();
		$r = this31[14];
		return $r;
	}(this));
	var e15;
	e15 = (function($this) {
		var $r;
		var this32 = this1.slice();
		$r = this32[15];
		return $r;
	}(this)) - (function($this) {
		var $r;
		var this33 = other.slice();
		$r = this33[15];
		return $r;
	}(this));
	return [e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.multiply = function(this1,other) {
	var t0;
	var this2 = this1.slice();
	t0 = this2[0];
	var t1;
	var this3 = this1.slice();
	t1 = this3[1];
	var t2;
	var this4 = this1.slice();
	t2 = this4[2];
	var t3;
	var this5 = this1.slice();
	t3 = this5[3];
	var t4;
	var this6 = this1.slice();
	t4 = this6[4];
	var t5;
	var this7 = this1.slice();
	t5 = this7[5];
	var t6;
	var this8 = this1.slice();
	t6 = this8[6];
	var t7;
	var this9 = this1.slice();
	t7 = this9[7];
	var t8;
	var this10 = this1.slice();
	t8 = this10[8];
	var t9;
	var this11 = this1.slice();
	t9 = this11[9];
	var t10;
	var this12 = this1.slice();
	t10 = this12[10];
	var t11;
	var this13 = this1.slice();
	t11 = this13[11];
	var t12;
	var this14 = this1.slice();
	t12 = this14[12];
	var t13;
	var this15 = this1.slice();
	t13 = this15[13];
	var t14;
	var this16 = this1.slice();
	t14 = this16[14];
	var t15;
	var this17 = this1.slice();
	t15 = this17[15];
	var m0;
	var this18 = other.slice();
	m0 = this18[0];
	var m1;
	var this19 = other.slice();
	m1 = this19[1];
	var m2;
	var this20 = other.slice();
	m2 = this20[2];
	var m3;
	var this21 = other.slice();
	m3 = this21[3];
	var m4;
	var this22 = other.slice();
	m4 = this22[4];
	var m5;
	var this23 = other.slice();
	m5 = this23[5];
	var m6;
	var this24 = other.slice();
	m6 = this24[6];
	var m7;
	var this25 = other.slice();
	m7 = this25[7];
	var m8;
	var this26 = other.slice();
	m8 = this26[8];
	var m9;
	var this27 = other.slice();
	m9 = this27[9];
	var m10;
	var this28 = other.slice();
	m10 = this28[10];
	var m11;
	var this29 = other.slice();
	m11 = this29[11];
	var m12;
	var this30 = other.slice();
	m12 = this30[12];
	var m13;
	var this31 = other.slice();
	m13 = this31[13];
	var m14;
	var this32 = other.slice();
	m14 = this32[14];
	var m15;
	var this33 = other.slice();
	m15 = this33[15];
	return [t0 * m0 + t1 * m4 + t2 * m8 + t3 * m12,t0 * m1 + t1 * m5 + t2 * m9 + t3 * m13,t0 * m2 + t1 * m6 + t2 * m10 + t3 * m14,t0 * m3 + t1 * m7 + t2 * m11 + t3 * m15,t4 * m0 + t5 * m4 + t6 * m8 + t7 * m12,t4 * m1 + t5 * m5 + t6 * m9 + t7 * m13,t4 * m2 + t5 * m6 + t6 * m10 + t7 * m14,t4 * m3 + t5 * m7 + t6 * m11 + t7 * m15,t8 * m0 + t9 * m4 + t10 * m8 + t11 * m12,t8 * m1 + t9 * m5 + t10 * m9 + t11 * m13,t8 * m2 + t9 * m6 + t10 * m10 + t11 * m14,t8 * m3 + t9 * m7 + t10 * m11 + t11 * m15,t12 * m0 + t13 * m4 + t14 * m8 + t15 * m12,t12 * m1 + t13 * m5 + t14 * m9 + t15 * m13,t12 * m2 + t13 * m6 + t14 * m10 + t15 * m14,t12 * m3 + t13 * m7 + t14 * m11 + t15 * m15];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.rightMultiplyVector3D = function(this1,vector) {
	var v0 = vector[0];
	var v1 = vector[1];
	var v2 = vector[2];
	var v3 = 1;
	var x;
	x = v0 * (function($this) {
		var $r;
		var this2 = this1.slice();
		$r = this2[0];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this3 = this1.slice();
		$r = this3[1];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this4 = this1.slice();
		$r = this4[2];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this5 = this1.slice();
		$r = this5[3];
		return $r;
	}(this));
	var y;
	y = v0 * (function($this) {
		var $r;
		var this6 = this1.slice();
		$r = this6[4];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this7 = this1.slice();
		$r = this7[5];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this8 = this1.slice();
		$r = this8[6];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this9 = this1.slice();
		$r = this9[7];
		return $r;
	}(this));
	var z;
	z = v0 * (function($this) {
		var $r;
		var this10 = this1.slice();
		$r = this10[8];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this11 = this1.slice();
		$r = this11[9];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this12 = this1.slice();
		$r = this12[10];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this13 = this1.slice();
		$r = this13[11];
		return $r;
	}(this));
	var w;
	w = v0 * (function($this) {
		var $r;
		var this14 = this1.slice();
		$r = this14[12];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this15 = this1.slice();
		$r = this15[13];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this16 = this1.slice();
		$r = this16[14];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this17 = this1.slice();
		$r = this17[15];
		return $r;
	}(this));
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return chad.geom._Vector3D.Vector3D_Impl_._new(x,y,z);
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D = function(this1,vector) {
	var v0 = vector[0];
	var v1 = vector[1];
	var v2 = vector[2];
	var v3 = 1;
	var x;
	x = v0 * (function($this) {
		var $r;
		var this2 = this1.slice();
		$r = this2[0];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this3 = this1.slice();
		$r = this3[4];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this4 = this1.slice();
		$r = this4[8];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this5 = this1.slice();
		$r = this5[12];
		return $r;
	}(this));
	var y;
	y = v0 * (function($this) {
		var $r;
		var this6 = this1.slice();
		$r = this6[1];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this7 = this1.slice();
		$r = this7[5];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this8 = this1.slice();
		$r = this8[9];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this9 = this1.slice();
		$r = this9[13];
		return $r;
	}(this));
	var z;
	z = v0 * (function($this) {
		var $r;
		var this10 = this1.slice();
		$r = this10[2];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this11 = this1.slice();
		$r = this11[6];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this12 = this1.slice();
		$r = this12[10];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this13 = this1.slice();
		$r = this13[14];
		return $r;
	}(this));
	var w;
	w = v0 * (function($this) {
		var $r;
		var this14 = this1.slice();
		$r = this14[3];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this15 = this1.slice();
		$r = this15[7];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this16 = this1.slice();
		$r = this16[11];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this17 = this1.slice();
		$r = this17[15];
		return $r;
	}(this));
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return chad.geom._Vector3D.Vector3D_Impl_._new(x,y,z);
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.rightMultiplyVector2D = function(this1,vector) {
	var v0 = vector[0];
	var v1 = vector[1];
	var v2 = 0;
	var v3 = 1;
	var x;
	x = v0 * (function($this) {
		var $r;
		var this2 = this1.slice();
		$r = this2[0];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this3 = this1.slice();
		$r = this3[1];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this4 = this1.slice();
		$r = this4[2];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this5 = this1.slice();
		$r = this5[3];
		return $r;
	}(this));
	var y;
	y = v0 * (function($this) {
		var $r;
		var this6 = this1.slice();
		$r = this6[4];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this7 = this1.slice();
		$r = this7[5];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this8 = this1.slice();
		$r = this8[6];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this9 = this1.slice();
		$r = this9[7];
		return $r;
	}(this));
	var z;
	z = v0 * (function($this) {
		var $r;
		var this10 = this1.slice();
		$r = this10[8];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this11 = this1.slice();
		$r = this11[9];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this12 = this1.slice();
		$r = this12[10];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this13 = this1.slice();
		$r = this13[11];
		return $r;
	}(this));
	var w;
	w = v0 * (function($this) {
		var $r;
		var this14 = this1.slice();
		$r = this14[12];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this15 = this1.slice();
		$r = this15[13];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this16 = this1.slice();
		$r = this16[14];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this17 = this1.slice();
		$r = this17[15];
		return $r;
	}(this));
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector2D = function(this1,vector) {
	var v0 = vector[0];
	var v1 = vector[1];
	var v2 = 0;
	var v3 = 1;
	var x;
	x = v0 * (function($this) {
		var $r;
		var this2 = this1.slice();
		$r = this2[0];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this3 = this1.slice();
		$r = this3[4];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this4 = this1.slice();
		$r = this4[8];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this5 = this1.slice();
		$r = this5[12];
		return $r;
	}(this));
	var y;
	y = v0 * (function($this) {
		var $r;
		var this6 = this1.slice();
		$r = this6[1];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this7 = this1.slice();
		$r = this7[5];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this8 = this1.slice();
		$r = this8[9];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this9 = this1.slice();
		$r = this9[13];
		return $r;
	}(this));
	var z;
	z = v0 * (function($this) {
		var $r;
		var this10 = this1.slice();
		$r = this10[2];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this11 = this1.slice();
		$r = this11[6];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this12 = this1.slice();
		$r = this12[10];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this13 = this1.slice();
		$r = this13[14];
		return $r;
	}(this));
	var w;
	w = v0 * (function($this) {
		var $r;
		var this14 = this1.slice();
		$r = this14[3];
		return $r;
	}(this)) + v1 * (function($this) {
		var $r;
		var this15 = this1.slice();
		$r = this15[7];
		return $r;
	}(this)) + v2 * (function($this) {
		var $r;
		var this16 = this1.slice();
		$r = this16[11];
		return $r;
	}(this)) + v3 * (function($this) {
		var $r;
		var this17 = this1.slice();
		$r = this17[15];
		return $r;
	}(this));
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y];
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.isMirroring = function(this1) {
	var u = chad.geom._Vector3D.Vector3D_Impl_._new((function($this) {
		var $r;
		var this2 = this1.slice();
		$r = this2[0];
		return $r;
	}(this)),(function($this) {
		var $r;
		var this3 = this1.slice();
		$r = this3[4];
		return $r;
	}(this)),(function($this) {
		var $r;
		var this4 = this1.slice();
		$r = this4[8];
		return $r;
	}(this)));
	var v = chad.geom._Vector3D.Vector3D_Impl_._new((function($this) {
		var $r;
		var this5 = this1.slice();
		$r = this5[1];
		return $r;
	}(this)),(function($this) {
		var $r;
		var this6 = this1.slice();
		$r = this6[5];
		return $r;
	}(this)),(function($this) {
		var $r;
		var this7 = this1.slice();
		$r = this7[9];
		return $r;
	}(this)));
	var w = chad.geom._Vector3D.Vector3D_Impl_._new((function($this) {
		var $r;
		var this8 = this1.slice();
		$r = this8[2];
		return $r;
	}(this)),(function($this) {
		var $r;
		var this9 = this1.slice();
		$r = this9[6];
		return $r;
	}(this)),(function($this) {
		var $r;
		var this10 = this1.slice();
		$r = this10[10];
		return $r;
	}(this)));
	var mirrorvalue = chad.geom._Vector3D.Vector3D_Impl_.dot((function($this) {
		var $r;
		var this11;
		{
			var this12 = u.slice();
			this11 = chad.geom._Vector3D.Vector3D_Impl_._new(this12[1] * v[2] - this12[2] * v[1],this12[2] * v[0] - this12[0] * v[2],this12[0] * v[1] - this12[1] * v[0]);
		}
		$r = this11.slice();
		return $r;
	}(this)),w);
	var ismirror = mirrorvalue < 0;
	return ismirror;
};
chad.geom._Matrix4x4.Matrix4x4_Impl_.at = function(this1,index) {
	return this1[index];
};
chad.geom._Vector3D = {};
chad.geom._Vector3D.Vector3D_Impl_ = function() { };
chad.geom._Vector3D.Vector3D_Impl_.__name__ = true;
chad.geom._Vector3D.Vector3D_Impl_._new = function(x,y,z) {
	return [x,y,z];
};
chad.geom._Vector3D.Vector3D_Impl_.fromFloat = function(v) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(v,v,v);
};
chad.geom._Vector3D.Vector3D_Impl_.fromArray = function(arr) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]);
};
chad.geom._Vector3D.Vector3D_Impl_.fromTypedef = function(o) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(o.x,o.y,o.z);
};
chad.geom._Vector3D.Vector3D_Impl_.toArray = function(this1) {
	return this1.slice();
};
chad.geom._Vector3D.Vector3D_Impl_.get_x = function(this1) {
	return this1[0];
};
chad.geom._Vector3D.Vector3D_Impl_.get_y = function(this1) {
	return this1[1];
};
chad.geom._Vector3D.Vector3D_Impl_.get_z = function(this1) {
	return this1[2];
};
chad.geom._Vector3D.Vector3D_Impl_.get_length = function(this1) {
	return Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this1.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2])));
};
chad.geom._Vector3D.Vector3D_Impl_.negate = function(this1) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(-this1[0],-this1[1],-this1[2]);
};
chad.geom._Vector3D.Vector3D_Impl_.add = function(this1,other) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(this1[0] + other[0],this1[1] + other[1],this1[2] + other[2]);
};
chad.geom._Vector3D.Vector3D_Impl_.subtract = function(this1,other) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]);
};
chad.geom._Vector3D.Vector3D_Impl_.multiply = function(this1,multiplier) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(this1[0] * multiplier,this1[1] * multiplier,this1[2] * multiplier);
};
chad.geom._Vector3D.Vector3D_Impl_.divide = function(this1,divisor) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(this1[0] / divisor,this1[1] / divisor,this1[2] / divisor);
};
chad.geom._Vector3D.Vector3D_Impl_.equals = function(this1,other) {
	return this1[0] == other[0] && this1[1] == other[1] && this1[2] == other[2];
};
chad.geom._Vector3D.Vector3D_Impl_.abs = function(this1) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(Math.abs(this1[0]),Math.abs(this1[1]),Math.abs(this1[2]));
};
chad.geom._Vector3D.Vector3D_Impl_.lengthSquared = function(this1) {
	var v = chad.geom._Vector3D.Vector3D_Impl_.dot(this1.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]));
	return chad.geom._Vector3D.Vector3D_Impl_._new(v,v,v);
};
chad.geom._Vector3D.Vector3D_Impl_.distanceTo = function(this1,other) {
	var v;
	var this2 = chad.geom._Vector3D.Vector3D_Impl_.subtract(this1.slice(),other);
	v = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this2.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this2[0]?0:this2[0],null == this2[1]?0:this2[1],null == this2[2]?0:this2[2])));
	return chad.geom._Vector3D.Vector3D_Impl_._new(v,v,v);
};
chad.geom._Vector3D.Vector3D_Impl_.distanceToSquared = function(this1,other) {
	return chad.geom._Vector3D.Vector3D_Impl_.lengthSquared((function($this) {
		var $r;
		var this2 = chad.geom._Vector3D.Vector3D_Impl_.subtract(this1.slice(),other);
		$r = this2.slice();
		return $r;
	}(this)));
};
chad.geom._Vector3D.Vector3D_Impl_.multiply4x4 = function(this1,matrix4x4) {
	return chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix4x4.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]));
};
chad.geom._Vector3D.Vector3D_Impl_.transform = function(this1,matrix4x4) {
	return chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix4x4.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]));
};
chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector = function(this1) {
	var a = chad.geom._Vector3D.Vector3D_Impl_.abs(this1.slice());
	if(a[0] <= a[1] && a[0] <= a[2]) return chad.geom._Vector3D.Vector3D_Impl_._new(1,0,0); else if(a[1] <= a[0] && a[1] <= a[2]) return chad.geom._Vector3D.Vector3D_Impl_._new(0,1,0); else return chad.geom._Vector3D.Vector3D_Impl_._new(0,0,1);
};
chad.geom._Vector3D.Vector3D_Impl_.dot = function(this1,prod) {
	return this1[0] * prod[0] + this1[1] * prod[1] + this1[2] * prod[2];
};
chad.geom._Vector3D.Vector3D_Impl_.lerp = function(this1,other,multiplier) {
	return chad.geom._Vector3D.Vector3D_Impl_.add(this1.slice(),(function($this) {
		var $r;
		var this2;
		{
			var this3 = chad.geom._Vector3D.Vector3D_Impl_.subtract(other.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]));
			this2 = this3.slice();
		}
		$r = chad.geom._Vector3D.Vector3D_Impl_._new(this2[0] * multiplier,this2[1] * multiplier,this2[2] * multiplier);
		return $r;
	}(this)));
};
chad.geom._Vector3D.Vector3D_Impl_.normalize = function(this1) {
	var this2 = this1.slice();
	var divisor = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this1.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2])));
	return chad.geom._Vector3D.Vector3D_Impl_._new(this2[0] / divisor,this2[1] / divisor,this2[2] / divisor);
};
chad.geom._Vector3D.Vector3D_Impl_.cross = function(this1,other) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(this1[1] * other[2] - this1[2] * other[1],this1[2] * other[0] - this1[0] * other[2],this1[0] * other[1] - this1[1] * other[0]);
};
chad.geom._Vector3D.Vector3D_Impl_.min = function(this1,other) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(Math.min(this1[0],other[0]),Math.min(this1[1],other[1]),Math.min(this1[2],other[2]));
};
chad.geom._Vector3D.Vector3D_Impl_.max = function(this1,other) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(Math.max(this1[0],other[0]),Math.max(this1[1],other[1]),Math.max(this1[2],other[2]));
};
chad.geom._Vector3D.Vector3D_Impl_.toString = function(this1) {
	return "Vector3D " + Std.string(this1);
};
chad.geom.Plane = function(normal,w) {
	this.normal = normal;
	this.w = w;
};
chad.geom.Plane.__name__ = true;
chad.geom.Plane.fromVector3Ds = function(a,b,c) {
	var n;
	var this1;
	var this2;
	var this3;
	var this4 = chad.geom._Vector3D.Vector3D_Impl_.subtract(b.slice(),a);
	this3 = this4.slice();
	var other = chad.geom._Vector3D.Vector3D_Impl_.subtract(c.slice(),a);
	this2 = chad.geom._Vector3D.Vector3D_Impl_._new(this3[1] * other[2] - this3[2] * other[1],this3[2] * other[0] - this3[0] * other[2],this3[0] * other[1] - this3[1] * other[0]);
	this1 = this2.slice();
	var this5 = this1.slice();
	var divisor = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this1.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2])));
	n = chad.geom._Vector3D.Vector3D_Impl_._new(this5[0] / divisor,this5[1] / divisor,this5[2] / divisor);
	return new chad.geom.Plane(n,chad.geom._Vector3D.Vector3D_Impl_.dot(n.slice(),a));
};
chad.geom.Plane.anyPlaneFromVector3Ds = function(a,b,c) {
	var v1 = chad.geom._Vector3D.Vector3D_Impl_.subtract(b.slice(),a);
	var v2 = chad.geom._Vector3D.Vector3D_Impl_.subtract(c.slice(),a);
	if(Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(v1.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == v1[0]?0:v1[0],null == v1[1]?0:v1[1],null == v1[2]?0:v1[2]))) < 1e-5) v1 = chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector(v2.slice());
	if(Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(v2.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == v2[0]?0:v2[0],null == v2[1]?0:v2[1],null == v2[2]?0:v2[2]))) < 1e-5) v2 = chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector(v1.slice());
	var normal;
	var this1 = v1.slice();
	normal = chad.geom._Vector3D.Vector3D_Impl_._new(this1[1] * v2[2] - this1[2] * v2[1],this1[2] * v2[0] - this1[0] * v2[2],this1[0] * v2[1] - this1[1] * v2[0]);
	if(Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(normal.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == normal[0]?0:normal[0],null == normal[1]?0:normal[1],null == normal[2]?0:normal[2]))) < 1e-5) {
		v2 = chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector(v1.slice());
		var this2 = v1.slice();
		normal = chad.geom._Vector3D.Vector3D_Impl_._new(this2[1] * v2[2] - this2[2] * v2[1],this2[2] * v2[0] - this2[0] * v2[2],this2[0] * v2[1] - this2[1] * v2[0]);
	}
	var this3 = normal.slice();
	var this4 = this3.slice();
	var divisor = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this3.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this3[0]?0:this3[0],null == this3[1]?0:this3[1],null == this3[2]?0:this3[2])));
	normal = chad.geom._Vector3D.Vector3D_Impl_._new(this4[0] / divisor,this4[1] / divisor,this4[2] / divisor);
	return new chad.geom.Plane(normal,chad.geom._Vector3D.Vector3D_Impl_.dot(normal.slice(),a));
};
chad.geom.Plane.fromPoints = function(a,b,c) {
	var n;
	var this1;
	var this2;
	var this3;
	var this4 = chad.geom._Vector3D.Vector3D_Impl_.subtract(b.slice(),a);
	this3 = this4.slice();
	var other = chad.geom._Vector3D.Vector3D_Impl_.subtract(c.slice(),a);
	this2 = chad.geom._Vector3D.Vector3D_Impl_._new(this3[1] * other[2] - this3[2] * other[1],this3[2] * other[0] - this3[0] * other[2],this3[0] * other[1] - this3[1] * other[0]);
	this1 = this2.slice();
	var this5 = this1.slice();
	var divisor = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this1.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2])));
	n = chad.geom._Vector3D.Vector3D_Impl_._new(this5[0] / divisor,this5[1] / divisor,this5[2] / divisor);
	return new chad.geom.Plane(n,chad.geom._Vector3D.Vector3D_Impl_.dot(n.slice(),a));
};
chad.geom.Plane.fromNormalAndPoint = function(normal,point) {
	var this1 = normal.slice();
	var this2 = this1.slice();
	var divisor = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this1.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2])));
	normal = chad.geom._Vector3D.Vector3D_Impl_._new(this2[0] / divisor,this2[1] / divisor,this2[2] / divisor);
	return new chad.geom.Plane(normal,chad.geom._Vector3D.Vector3D_Impl_.dot(point.slice(),normal));
};
chad.geom.Plane.prototype = {
	flip: function() {
		return new chad.geom.Plane((function($this) {
			var $r;
			var this1 = $this.normal.slice();
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(-this1[0],-this1[1],-this1[2]);
			return $r;
		}(this)),-this.w);
	}
	,splitPolygon: function(polygon,coplanarFront,coplanarBack,front,back) {
		var polygonType = 0;
		var types = [];
		var t;
		var type;
		var f;
		var b;
		var len;
		var j;
		var ti;
		var vi;
		var tj;
		var vj;
		var t1;
		var v;
		var $it0 = HxOverrides.iter(polygon.vertices);
		while( $it0.hasNext() ) {
			var Vertex3D = $it0.next();
			t1 = chad.geom._Vector3D.Vector3D_Impl_.dot(this.normal.slice(),Vertex3D.position) - this.w;
			if(t1 < -1e-05) type = 2; else if(t1 > 1e-5) type = 1; else type = 0;
			polygonType |= type;
			types.push(type);
		}
		switch(polygonType) {
		case 0:
			(chad.geom._Vector3D.Vector3D_Impl_.dot(this.normal.slice(),polygon.get_plane().normal) > 0?coplanarFront:coplanarBack).push(polygon);
			break;
		case 1:
			front.push(polygon);
			break;
		case 2:
			back.push(polygon);
			break;
		case 3:
			f = [];
			b = [];
			len = polygon.vertices.length;
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				j = (i + 1) % len;
				ti = types[i];
				tj = types[j];
				vi = polygon.vertices[i];
				vj = polygon.vertices[j];
				if(ti != 2) f.push(vi);
				if(ti != 1) b.push(vi);
				if((ti | tj) == 3) {
					t1 = (this.w - chad.geom._Vector3D.Vector3D_Impl_.dot(this.normal.slice(),vi.position)) / chad.geom._Vector3D.Vector3D_Impl_.dot(this.normal.slice(),chad.geom._Vector3D.Vector3D_Impl_.subtract(vj.position.slice(),vi.position));
					v = new chad.geom.Vertex3D(chad.geom._Vector3D.Vector3D_Impl_.lerp(vi.position.slice(),vj.position,t1),chad.geom._Vector3D.Vector3D_Impl_.lerp(vi.normal.slice(),vj.normal,t1));
					f.push(v);
					b.push(v);
				}
			}
			if(f.length >= 3) front.push(new chad.geom.Polygon(f));
			if(b.length >= 3) back.push(new chad.geom.Polygon(b));
			break;
		}
	}
	,equals: function(other) {
		return chad.geom._Vector3D.Vector3D_Impl_.equals(this.normal.slice(),other.normal) && this.w == other.w;
	}
	,transform: function(matrix) {
		var ismirror = chad.geom._Matrix4x4.Matrix4x4_Impl_.isMirroring(matrix.slice());
		var r = chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector(this.normal.slice());
		var u;
		var this1 = this.normal.slice();
		u = chad.geom._Vector3D.Vector3D_Impl_._new(this1[1] * r[2] - this1[2] * r[1],this1[2] * r[0] - this1[0] * r[2],this1[0] * r[1] - this1[1] * r[0]);
		var v;
		var this2 = this.normal.slice();
		v = chad.geom._Vector3D.Vector3D_Impl_._new(this2[1] * u[2] - this2[2] * u[1],this2[2] * u[0] - this2[0] * u[2],this2[0] * u[1] - this2[1] * u[0]);
		var point1;
		var this3 = this.normal.slice();
		var multiplier = this.w;
		point1 = chad.geom._Vector3D.Vector3D_Impl_._new(this3[0] * multiplier,this3[1] * multiplier,this3[2] * multiplier);
		var point2 = chad.geom._Vector3D.Vector3D_Impl_.add(point1.slice(),u);
		var point3 = chad.geom._Vector3D.Vector3D_Impl_.add(point1.slice(),v);
		var this4 = point1.slice();
		point1 = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this4[0]?0:this4[0],null == this4[1]?0:this4[1],null == this4[2]?0:this4[2]));
		var this5 = point2.slice();
		point2 = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this5[0]?0:this5[0],null == this5[1]?0:this5[1],null == this5[2]?0:this5[2]));
		var this6 = point3.slice();
		point3 = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this6[0]?0:this6[0],null == this6[1]?0:this6[1],null == this6[2]?0:this6[2]));
		var newplane = chad.geom.Plane.fromVector3Ds(point1,point2,point3);
		if(ismirror) newplane = newplane.flip();
		return newplane;
	}
	,splitLineBetweenPoints: function(p1,p2) {
		var direction = chad.geom._Vector3D.Vector3D_Impl_.subtract(p2.slice(),p1);
		var lambda = (this.w - chad.geom._Vector3D.Vector3D_Impl_.dot(this.normal.slice(),p1)) / chad.geom._Vector3D.Vector3D_Impl_.dot(this.normal.slice(),direction);
		if(Math.isNaN(lambda)) lambda = 0; else if(lambda > 1) lambda = 1; else if(lambda < 0) lambda = 0;
		return chad.geom._Vector3D.Vector3D_Impl_.add(p1.slice(),(function($this) {
			var $r;
			var this1 = direction.slice();
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(this1[0] * lambda,this1[1] * lambda,this1[2] * lambda);
			return $r;
		}(this)));
	}
	,intersectWithLine: function(line) {
		return line.intersectWithPlane(this);
	}
	,intersectWithPlane: function(plane) {
		return chad.geom.Line3D.fromPlanes(this,plane);
	}
	,signedDistanceToPoint: function(point) {
		return chad.geom._Vector3D.Vector3D_Impl_.dot(this.normal.slice(),point) - this.w;
	}
	,toString: function() {
		return "Plane [normal: " + (function($this) {
			var $r;
			var this1 = $this.normal.slice();
			$r = "Vector3D " + Std.string(this1);
			return $r;
		}(this)) + ", w: " + this.w + "]";
	}
	,mirrorPoint: function(point3d) {
		var distance = this.signedDistanceToPoint(point3d);
		var mirrored = chad.geom._Vector3D.Vector3D_Impl_.subtract(point3d.slice(),(function($this) {
			var $r;
			var this1 = $this.normal.slice();
			var multiplier = distance * 2.0;
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(this1[0] * multiplier,this1[1] * multiplier,this1[2] * multiplier);
			return $r;
		}(this)));
		return mirrored;
	}
};
chad.geom.OrthoNormalBasis = function(plane,rightvector) {
	var this1;
	var this2;
	var this3 = plane.normal.slice();
	this2 = chad.geom._Vector3D.Vector3D_Impl_._new(this3[1] * rightvector[2] - this3[2] * rightvector[1],this3[2] * rightvector[0] - this3[0] * rightvector[2],this3[0] * rightvector[1] - this3[1] * rightvector[0]);
	this1 = this2.slice();
	var this4 = this1.slice();
	var divisor = Math.sqrt(chad.geom._Vector3D.Vector3D_Impl_.dot(this1.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2])));
	this.v = chad.geom._Vector3D.Vector3D_Impl_._new(this4[0] / divisor,this4[1] / divisor,this4[2] / divisor);
	var this5 = this.v.slice();
	var other = plane.normal;
	this.u = chad.geom._Vector3D.Vector3D_Impl_._new(this5[1] * other[2] - this5[2] * other[1],this5[2] * other[0] - this5[0] * other[2],this5[0] * other[1] - this5[1] * other[0]);
	this.plane = plane;
	var this6 = plane.normal.slice();
	var multiplier = plane.w;
	this.planeOrigin = chad.geom._Vector3D.Vector3D_Impl_._new(this6[0] * multiplier,this6[1] * multiplier,this6[2] * multiplier);
};
chad.geom.OrthoNormalBasis.__name__ = true;
chad.geom.OrthoNormalBasis.fromPlane = function(plane) {
	return new chad.geom.OrthoNormalBasis(plane,chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector(plane.normal.slice()));
};
chad.geom.OrthoNormalBasis.prototype = {
	getProjectionMatrix: function() {
		return [this.u[0],this.v[0],this.plane.normal[0],0,this.u[1],this.v[1],this.plane.normal[1],0,this.u[2],this.v[2],this.plane.normal[2],0,0,0,-this.plane.w,1];
	}
	,getInverseProjectionMatrix: function() {
		var p;
		var this1 = this.plane.normal.slice();
		var multiplier = this.plane.w;
		p = chad.geom._Vector3D.Vector3D_Impl_._new(this1[0] * multiplier,this1[1] * multiplier,this1[2] * multiplier);
		return [this.u[0],this.u[1],this.u[2],0,this.v[0],this.v[1],this.v[2],0,this.plane.normal[0],this.plane.normal[1],this.plane.normal[2],0,p[0],p[1],p[2],1];
	}
	,to2D: function(vec3) {
		var x = chad.geom._Vector3D.Vector3D_Impl_.dot(vec3.slice(),this.u);
		var y = chad.geom._Vector3D.Vector3D_Impl_.dot(vec3.slice(),this.v);
		return [x,y];
	}
	,to3D: function(vec2) {
		return chad.geom._Vector3D.Vector3D_Impl_.add((function($this) {
			var $r;
			var this1 = chad.geom._Vector3D.Vector3D_Impl_.add($this.planeOrigin.slice(),(function($this) {
				var $r;
				var this2 = $this.u.slice();
				var multiplier = vec2[0];
				$r = chad.geom._Vector3D.Vector3D_Impl_._new(this2[0] * multiplier,this2[1] * multiplier,this2[2] * multiplier);
				return $r;
			}($this)));
			$r = this1.slice();
			return $r;
		}(this)),(function($this) {
			var $r;
			var this3 = $this.v.slice();
			var multiplier1 = vec2[1];
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(this3[0] * multiplier1,this3[1] * multiplier1,this3[2] * multiplier1);
			return $r;
		}(this)));
	}
	,line3Dto2D: function(line) {
		return chad.geom.Line2D.fromPoints(this.to2D(line.point),this.to2D(chad.geom._Vector3D.Vector3D_Impl_.add(line.direction.slice(),line.point)));
	}
	,line2Dto3D: function(line) {
		var a = line.origin();
		var b;
		var this1;
		var this2 = line.direction();
		this1 = this2.slice();
		b = [this1[0] + a[0],this1[1] + a[1]];
		return chad.geom.Line3D.fromPoints(this.to3D(a),this.to3D(b));
	}
	,transform: function(matrix) {
		var newplane = this.plane.transform(matrix);
		var rightpoint_transformed;
		var this1 = this.u.slice();
		rightpoint_transformed = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]));
		var origin_transformed;
		var this2;
		var this3 = chad.geom._Vector3D.Vector3D_Impl_._new(0,0,0);
		this2 = this3.slice();
		origin_transformed = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this2[0]?0:this2[0],null == this2[1]?0:this2[1],null == this2[2]?0:this2[2]));
		var newrighthandvector = chad.geom._Vector3D.Vector3D_Impl_.subtract(rightpoint_transformed.slice(),origin_transformed);
		var newbasis = new chad.geom.OrthoNormalBasis(newplane,newrighthandvector);
		return newbasis;
	}
};
chad.geom.Polygon = function(vertices) {
	this.vertices = vertices;
};
chad.geom.Polygon.__name__ = true;
chad.geom.Polygon.fromVertices = function(vertices) {
	if((vertices instanceof Array) && vertices.__enum__ == null) return new chad.geom.Polygon(vertices.copy()); else return new chad.geom.Polygon((function($this) {
		var $r;
		var _g = [];
		var $it0 = $iterator(vertices)();
		while( $it0.hasNext() ) {
			var v = $it0.next();
			_g.push(v);
		}
		$r = _g;
		return $r;
	}(this)));
};
chad.geom.Polygon.prototype = {
	flip: function() {
		var reverse = this.vertices.slice();
		reverse.reverse();
		return new chad.geom.Polygon(reverse.map(function(v) {
			return v.flip();
		}));
	}
	,iterator: function() {
		return HxOverrides.iter(this.vertices);
	}
	,all: function() {
		return this.vertices.slice();
	}
	,get_plane: function() {
		if(null == this.plane) return this.plane = chad.geom.Plane.fromPoints(this.vertices[0].position,this.vertices[1].position,this.vertices[2].position); else return this.plane;
	}
};
chad.geom.Util = function() { };
chad.geom.Util.__name__ = true;
chad.geom.Util.solve2Linear = function(a,b,c,d,u,v) {
	var det = a * d - b * c;
	var invdet = 1.0 / det;
	var x = u * d - b * v;
	var y = -u * c + a * v;
	return [x * invdet,y * invdet];
};
chad.geom.Util.interpolateBetween2DPointsForY = function(p1,p2,y) {
	var f1 = y - p1[1];
	var f2 = p2[1] - p1[1];
	var t;
	if(f2 < 0) {
		f1 = -f1;
		f2 = -f2;
	}
	if(f1 <= 0) t = 0.0; else if(f1 >= f2) t = 1.0; else if(f2 < 1e-10) t = 0.5; else t = f1 / f2;
	return p1[0] + t * (p2[0] - p1[0]);
};
chad.geom._Vector2D = {};
chad.geom._Vector2D.Vector2D_Impl_ = function() { };
chad.geom._Vector2D.Vector2D_Impl_.__name__ = true;
chad.geom._Vector2D.Vector2D_Impl_._new = function(x,y) {
	return [x,y];
};
chad.geom._Vector2D.Vector2D_Impl_.fromFloat = function(v) {
	return [v,v];
};
chad.geom._Vector2D.Vector2D_Impl_.fromAngle = function(radians) {
	return chad.geom._Vector2D.Vector2D_Impl_.fromAngleRadians(radians);
};
chad.geom._Vector2D.Vector2D_Impl_.fromAngleDegrees = function(degrees) {
	var radians = Math.PI * degrees / 180;
	return chad.geom._Vector2D.Vector2D_Impl_.fromAngleRadians(radians);
};
chad.geom._Vector2D.Vector2D_Impl_.fromAngleRadians = function(radians) {
	var x = Math.cos(radians);
	var y = Math.sin(radians);
	return [x,y];
};
chad.geom._Vector2D.Vector2D_Impl_.fromArray = function(arr) {
	return [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1]];
};
chad.geom._Vector2D.Vector2D_Impl_.fromTypedef = function(o) {
	return [o.x,o.y];
};
chad.geom._Vector2D.Vector2D_Impl_.toArray = function(this1) {
	return this1.slice();
};
chad.geom._Vector2D.Vector2D_Impl_.toVector3D = function(this1,z) {
	return chad.geom._Vector3D.Vector3D_Impl_._new(this1[0],this1[1],z);
};
chad.geom._Vector2D.Vector2D_Impl_.get_x = function(this1) {
	return this1[0];
};
chad.geom._Vector2D.Vector2D_Impl_.get_y = function(this1) {
	return this1[1];
};
chad.geom._Vector2D.Vector2D_Impl_.get_length = function(this1) {
	return Math.sqrt((function($this) {
		var $r;
		var this2 = this1.slice();
		var prod_0;
		if(null == this1[0]) prod_0 = 0; else prod_0 = this1[0];
		var prod_1;
		if(null == this1[1]) prod_1 = 0; else prod_1 = this1[1];
		$r = this2[0] * prod_0 + this2[1] * prod_1;
		return $r;
	}(this)));
};
chad.geom._Vector2D.Vector2D_Impl_.negate = function(this1) {
	return [-this1[0],-this1[1]];
};
chad.geom._Vector2D.Vector2D_Impl_.add = function(this1,other) {
	return [this1[0] + other[0],this1[1] + other[1]];
};
chad.geom._Vector2D.Vector2D_Impl_.subtract = function(this1,other) {
	return [this1[0] - other[0],this1[1] - other[1]];
};
chad.geom._Vector2D.Vector2D_Impl_.multiply = function(this1,multiplier) {
	return [this1[0] * multiplier,this1[1] * multiplier];
};
chad.geom._Vector2D.Vector2D_Impl_.divide = function(this1,divisor) {
	return [this1[0] / divisor,this1[1] / divisor];
};
chad.geom._Vector2D.Vector2D_Impl_.dot = function(this1,prod) {
	return this1[0] * prod[0] + this1[1] * prod[1];
};
chad.geom._Vector2D.Vector2D_Impl_.lerp = function(this1,other,multiplier) {
	var this2 = this1.slice();
	var other1;
	var this3;
	var this4;
	var this5 = other.slice();
	var other_0;
	if(null == this1[0]) other_0 = 0; else other_0 = this1[0];
	var other_1;
	if(null == this1[1]) other_1 = 0; else other_1 = this1[1];
	this4 = [this5[0] - other_0,this5[1] - other_1];
	this3 = this4.slice();
	other1 = [this3[0] * multiplier,this3[1] * multiplier];
	return [this2[0] + other1[0],this2[1] + other1[1]];
};
chad.geom._Vector2D.Vector2D_Impl_.normal = function(this1) {
	return [this1[1],-this1[0]];
};
chad.geom._Vector2D.Vector2D_Impl_.normalize = function(this1) {
	var this2 = this1.slice();
	var divisor = Math.sqrt((function($this) {
		var $r;
		var this3 = this1.slice();
		var prod_0;
		if(null == this1[0]) prod_0 = 0; else prod_0 = this1[0];
		var prod_1;
		if(null == this1[1]) prod_1 = 0; else prod_1 = this1[1];
		$r = this3[0] * prod_0 + this3[1] * prod_1;
		return $r;
	}(this)));
	return [this2[0] / divisor,this2[1] / divisor];
};
chad.geom._Vector2D.Vector2D_Impl_.equals = function(this1,other) {
	return this1[0] == other[0] && this1[1] == other[1];
};
chad.geom._Vector2D.Vector2D_Impl_.distanceTo = function(this1,other) {
	var this2;
	var this3 = this1.slice();
	this2 = [this3[0] - other[0],this3[1] - other[1]];
	return Math.sqrt((function($this) {
		var $r;
		var this4 = this2.slice();
		var prod_0;
		if(null == this2[0]) prod_0 = 0; else prod_0 = this2[0];
		var prod_1;
		if(null == this2[1]) prod_1 = 0; else prod_1 = this2[1];
		$r = this4[0] * prod_0 + this4[1] * prod_1;
		return $r;
	}(this)));
};
chad.geom._Vector2D.Vector2D_Impl_.distanceToSquared = function(this1,other) {
	var this2;
	var this3;
	var this4 = this1.slice();
	this3 = [this4[0] - other[0],this4[1] - other[1]];
	this2 = this3.slice();
	var this5 = this2.slice();
	var prod_0;
	if(null == this2[0]) prod_0 = 0; else prod_0 = this2[0];
	var prod_1;
	if(null == this2[1]) prod_1 = 0; else prod_1 = this2[1];
	return this5[0] * prod_0 + this5[1] * prod_1;
};
chad.geom._Vector2D.Vector2D_Impl_.lengthSquared = function(this1) {
	var this2 = this1.slice();
	var prod_0;
	if(null == this1[0]) prod_0 = 0; else prod_0 = this1[0];
	var prod_1;
	if(null == this1[1]) prod_1 = 0; else prod_1 = this1[1];
	return this2[0] * prod_0 + this2[1] * prod_1;
};
chad.geom._Vector2D.Vector2D_Impl_.multiply4x4 = function(this1,matrix) {
	return chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector2D(matrix.slice(),[null == this1[0]?0:this1[0],null == this1[1]?0:this1[1]]);
};
chad.geom._Vector2D.Vector2D_Impl_.transform = function(this1,matrix) {
	return chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector2D(matrix.slice(),[null == this1[0]?0:this1[0],null == this1[1]?0:this1[1]]);
};
chad.geom._Vector2D.Vector2D_Impl_.angle = function(this1) {
	var this2 = this1.slice();
	return Math.atan2(this2[1],this2[0]);
};
chad.geom._Vector2D.Vector2D_Impl_.angleDegrees = function(this1) {
	var radians;
	var this2 = this1.slice();
	radians = Math.atan2(this2[1],this2[0]);
	return 180 * radians / Math.PI;
};
chad.geom._Vector2D.Vector2D_Impl_.angleRadians = function(this1) {
	return Math.atan2(this1[1],this1[0]);
};
chad.geom._Vector2D.Vector2D_Impl_.cross = function(this1,other) {
	return this1[0] * other[1] - this1[1] * other[0];
};
chad.geom._Vector2D.Vector2D_Impl_.min = function(this1,other) {
	var x = Math.min(this1[0],other[0]);
	var y = Math.min(this1[1],other[1]);
	return [x,y];
};
chad.geom._Vector2D.Vector2D_Impl_.max = function(this1,other) {
	var x = Math.max(this1[0],other[0]);
	var y = Math.max(this1[1],other[1]);
	return [x,y];
};
chad.geom._Vector2D.Vector2D_Impl_.toString = function(this1) {
	return "Vector2D " + Std.string(this1);
};
chad.geom.Vertex3D = function(position,normal) {
	this.position = position;
	this.normal = normal;
};
chad.geom.Vertex3D.__name__ = true;
chad.geom.Vertex3D.prototype = {
	flip: function() {
		return new chad.geom.Vertex3D(this.position,(function($this) {
			var $r;
			var this1 = $this.normal.slice();
			$r = chad.geom._Vector3D.Vector3D_Impl_._new(-this1[0],-this1[1],-this1[2]);
			return $r;
		}(this)));
	}
	,interpolate: function(other,t) {
		return new chad.geom.Vertex3D(chad.geom._Vector3D.Vector3D_Impl_.lerp(this.position.slice(),other.position,t),chad.geom._Vector3D.Vector3D_Impl_.lerp(this.normal.slice(),other.normal,t));
	}
	,transform: function(matrix) {
		return new chad.geom.Vertex3D((function($this) {
			var $r;
			var this1 = $this.position.slice();
			$r = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]));
			return $r;
		}(this)),(function($this) {
			var $r;
			var this2 = $this.normal.slice();
			$r = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix.slice(),chad.geom._Vector3D.Vector3D_Impl_._new(null == this2[0]?0:this2[0],null == this2[1]?0:this2[1],null == this2[2]?0:this2[2]));
			return $r;
		}(this)));
	}
	,toString: function() {
		return "Vertex3D " + ("Vector3D " + Std.string(this.position)) + ", " + ("Vector3D " + Std.string(this.normal));
	}
};
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.__name__ = true;
Array.__name__ = true;
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
chad.csg.Box.baseCube = [{ p : [0,4,6,2], n : [-1.0,0.0,0.0]},{ p : [1,3,7,5], n : [1.0,0.0,0.0]},{ p : [0,1,5,4], n : [0.0,-1.0,0.0]},{ p : [2,6,7,3], n : [0.0,1.0,0.0]},{ p : [0,2,3,1], n : [0.0,0.0,-1.0]},{ p : [4,5,7,6], n : [0.0,0.0,1.0]}];
chad.geom._Matrix4x4.Matrix4x4_Impl_.unity = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
chad.geom.Plane.EPSILON = 1e-5;
chad.geom.Plane.COPLANAR = 0;
chad.geom.Plane.FRONT = 1;
chad.geom.Plane.BACK = 2;
chad.geom.Plane.SPANNING = 3;
chad.geom.OrthoNormalBasis.z0Plane = new chad.geom.OrthoNormalBasis(new chad.geom.Plane(chad.geom._Vector3D.Vector3D_Impl_._new(0,0,1),0),chad.geom._Vector3D.Vector3D_Impl_._new(1,0,0));
Main.main();
})();
