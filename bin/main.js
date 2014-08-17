(function () { "use strict";
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
	(window || {}).Main = Main;
};
Main.geom = function() {
	return chad.export.ThreeJS.toModel(chad.csg._Solid.Solid_Impl_.subtract(chad.csg._Solid.Solid_Impl_.subtract(chad.csg._Solid.Solid_Impl_.subtract(chad.csg._Solid.Solid_Impl_.subtract(chad.csg._Solid.Solid_Impl_.intersect(chad.csg._Solid.Solid_Impl_.subtract(chad.csg._Solid.Solid_Impl_.union(chad.csg.Solids.box((function($this) {
		var $r;
		var arr_0 = -0.5;
		var arr_1 = -0.5;
		var arr_2 = -0.5;
		$r = [arr_0,arr_1,arr_2];
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr_01 = 1.0;
		var arr_11 = 1.0;
		var arr_21 = 1.0;
		$r = [arr_01,arr_11,arr_21];
		return $r;
	}(this))),chad.csg.Solids.box((function($this) {
		var $r;
		var arr_02 = 0.1;
		var arr_12 = 0.1;
		var arr_22 = 0.1;
		$r = [arr_02,arr_12,arr_22];
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr_03 = 1.0;
		var arr_13 = 1.0;
		var arr_23 = 1.0;
		$r = [arr_03,arr_13,arr_23];
		return $r;
	}(this)))),chad.csg.Solids.box((function($this) {
		var $r;
		var arr_04 = -1.1;
		var arr_14 = -1.1;
		var arr_24 = -1.1;
		$r = [arr_04,arr_14,arr_24];
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr_05 = 1.0;
		var arr_15 = 1.0;
		var arr_25 = 1.0;
		$r = [arr_05,arr_15,arr_25];
		return $r;
	}(this)))),chad.csg.Solids.sphere((function($this) {
		var $r;
		var arr_06 = 0.0;
		var arr_16 = 0.0;
		var arr_26 = 0.0;
		$r = [arr_06,arr_16,arr_26];
		return $r;
	}(this)),0.7)),chad.csg.Solids.sphere((function($this) {
		var $r;
		var arr_07 = 0.5;
		var arr_17 = 0.5;
		var arr_27 = 0.5;
		$r = [arr_07,arr_17,arr_27];
		return $r;
	}(this)),0.35)),chad.csg.Solids.cylinder((function($this) {
		var $r;
		var arr_08 = 0.0;
		var arr_18 = 0.0;
		var arr_28 = -0.95;
		$r = [arr_08,arr_18,arr_28];
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr_09 = 0.0;
		var arr_19 = 0.0;
		var arr_29 = 0.95;
		$r = [arr_09,arr_19,arr_29];
		return $r;
	}(this)),0.25)),chad.csg.Solids.cylinder((function($this) {
		var $r;
		var arr_010 = 0.0;
		var arr_110 = -0.95;
		var arr_210 = 0.0;
		$r = [arr_010,arr_110,arr_210];
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr_011 = 0.0;
		var arr_111 = 0.95;
		var arr_211 = 0.0;
		$r = [arr_011,arr_111,arr_211];
		return $r;
	}(this)),0.35)),chad.csg.Solids.cylinder((function($this) {
		var $r;
		var arr_012 = -0.95;
		var arr_112 = 0.0;
		var arr_212 = 0.0;
		$r = [arr_012,arr_112,arr_212];
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr_013 = 0.95;
		var arr_113 = 0.0;
		var arr_213 = 0.0;
		$r = [arr_013,arr_113,arr_213];
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
chad.csg = {};
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
		return "Node [length: " + this.polygons.concat(null == this.front?[]:this.front.all()).concat(null == this.back?[]:this.back.all()).length + ", front: " + Std.string(null == this.front) + ", back: " + Std.string(null == this.back) + "]";
	}
};
chad.csg._Solid = {};
chad.csg._Solid.Solid_Impl_ = function() { };
chad.csg._Solid.Solid_Impl_.__name__ = true;
chad.csg._Solid.Solid_Impl_._new = function(polygons) {
	return polygons;
};
chad.csg._Solid.Solid_Impl_.fromPolygons = function(polygons) {
	return chad.csg._Solid.Solid_Impl_._new(polygons);
};
chad.csg._Solid.Solid_Impl_.union = function(this1,other) {
	var a = new chad.csg.Node(this1.slice());
	var b = new chad.csg.Node(other.slice());
	a.clipTo(b);
	b.clipTo(a);
	b.invert();
	b.clipTo(a);
	b.invert();
	a.build(b.polygons.concat(null == b.front?[]:b.front.all()).concat(null == b.back?[]:b.back.all()));
	return chad.csg._Solid.Solid_Impl_.fromPolygons(a.polygons.concat(null == a.front?[]:a.front.all()).concat(null == a.back?[]:a.back.all()));
};
chad.csg._Solid.Solid_Impl_.subtract = function(this1,other) {
	var a = new chad.csg.Node(this1.slice());
	var b = new chad.csg.Node(other.slice());
	a.invert();
	a.clipTo(b);
	b.clipTo(a);
	b.invert();
	b.clipTo(a);
	b.invert();
	a.build(b.polygons.concat(null == b.front?[]:b.front.all()).concat(null == b.back?[]:b.back.all()));
	a.invert();
	return chad.csg._Solid.Solid_Impl_.fromPolygons(a.polygons.concat(null == a.front?[]:a.front.all()).concat(null == a.back?[]:a.back.all()));
};
chad.csg._Solid.Solid_Impl_.intersect = function(this1,other) {
	var a = new chad.csg.Node(this1.slice());
	var b = new chad.csg.Node(other.slice());
	a.invert();
	b.clipTo(a);
	b.invert();
	a.clipTo(b);
	b.clipTo(a);
	a.build(b.polygons.concat(null == b.front?[]:b.front.all()).concat(null == b.back?[]:b.back.all()));
	a.invert();
	return chad.csg._Solid.Solid_Impl_.fromPolygons(a.polygons.concat(null == a.front?[]:a.front.all()).concat(null == a.back?[]:a.back.all()));
};
chad.csg._Solid.Solid_Impl_.toArray = function(this1) {
	return this1.slice();
};
chad.csg._Solid.Solid_Impl_.iterator = function(this1) {
	return HxOverrides.iter(this1);
};
chad.csg._Solid.Solid_Impl_.toString = function(this1) {
	return "Solid(" + this1.length + ")";
};
chad.csg.Solids = function() { };
chad.csg.Solids.__name__ = true;
chad.csg.Solids.box = function(position,size) {
	if(null == position) position = thx.geom._Point3D.Point3D_Impl_.zero;
	return chad.csg._Solid.Solid_Impl_.fromPolygons(chad.csg.Solids.baseCube.map(function(info) {
		return new thx.geom.Polygon(info.p.map(function(i) {
			var pos = [position[0] + size[0] * ((i & 1) != 0?1:0),position[1] + size[1] * ((i & 2) != 0?1:0),position[2] + size[2] * ((i & 4) != 0?1:0)];
			return new thx.geom.Vertex3D(pos,(function($this) {
				var $r;
				var arr = info.n;
				$r = [arr[0],arr[1],arr[2]];
				return $r;
			}(this)));
		}));
	}));
};
chad.csg.Solids.cylinder = function(start,end,radius,resolution) {
	if(radius == null) radius = 1.0;
	if(null == resolution) resolution = chad.csg.Solids.getResolution;
	var slices = resolution(radius);
	var ray;
	var p_0 = -start[0];
	var p_1 = -start[1];
	var p_2 = -start[2];
	ray = [end[0] + p_0,end[1] + p_1,end[2] + p_2];
	var axisZ;
	var v = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(ray,[ray[0],ray[1],ray[2]]));
	axisZ = [ray[0] / v,ray[1] / v,ray[2] / v];
	var isY = Math.abs(axisZ[1]) > 0.5;
	var axisX;
	var this1;
	var this_0;
	if(isY) this_0 = 1; else this_0 = 0;
	var this_1;
	if(isY) this_1 = 0; else this_1 = 1;
	var this_2 = 0;
	this1 = [this_1 * axisZ[2] - this_2 * axisZ[1],this_2 * axisZ[0] - this_0 * axisZ[2],this_0 * axisZ[1] - this_1 * axisZ[0]];
	var v1 = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(this1,[this1[0],this1[1],this1[2]]));
	axisX = [this1[0] / v1,this1[1] / v1,this1[2] / v1];
	var axisY;
	var this2 = [axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]];
	var v2 = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(this2,[this2[0],this2[1],this2[2]]));
	axisY = [this2[0] / v2,this2[1] / v2,this2[2] / v2];
	var s = new thx.geom.Vertex3D(start,[-axisZ[0],-axisZ[1],-axisZ[2]]);
	var e = new thx.geom.Vertex3D(end,(function($this) {
		var $r;
		var v3 = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(axisZ,[axisZ[0],axisZ[1],axisZ[2]]));
		$r = [axisZ[0] / v3,axisZ[1] / v3,axisZ[2] / v3];
		return $r;
	}(this)));
	var polygons = [];
	var t0;
	var t1;
	var point = function(stack,slice,normalBlend) {
		var angle = slice * Math.PI * 2;
		var out;
		var this3;
		var v4 = Math.cos(angle);
		this3 = [axisX[0] * v4,axisX[1] * v4,axisX[2] * v4];
		var p;
		var v5 = Math.sin(angle);
		p = [axisY[0] * v5,axisY[1] * v5,axisY[2] * v5];
		out = [this3[0] + p[0],this3[1] + p[1],this3[2] + p[2]];
		var pos;
		var this4;
		var p_01 = ray[0] * stack;
		var p_11 = ray[1] * stack;
		var p_21 = ray[2] * stack;
		this4 = [start[0] + p_01,start[1] + p_11,start[2] + p_21];
		var p_02 = out[0] * radius;
		var p_12 = out[1] * radius;
		var p_22 = out[2] * radius;
		pos = [this4[0] + p_02,this4[1] + p_12,this4[2] + p_22];
		var normal;
		var this5;
		var v6 = 1 - Math.abs(normalBlend);
		this5 = [out[0] * v6,out[1] * v6,out[2] * v6];
		var p_03 = axisZ[0] * normalBlend;
		var p_13 = axisZ[1] * normalBlend;
		var p_23 = axisZ[2] * normalBlend;
		normal = [this5[0] + p_03,this5[1] + p_13,this5[2] + p_23];
		return new thx.geom.Vertex3D(pos,normal);
	};
	var _g = 0;
	while(_g < slices) {
		var i = _g++;
		t0 = i / slices;
		t1 = (i + 1) / slices;
		polygons.push(new thx.geom.Polygon([s,point(0,t0,-1),point(0,t1,-1)]));
		polygons.push(new thx.geom.Polygon([point(0,t1,0),point(0,t0,0),point(1,t0,0),point(1,t1,0)]));
		polygons.push(new thx.geom.Polygon([e,point(1,t1,1),point(1,t0,1)]));
	}
	return chad.csg._Solid.Solid_Impl_.fromPolygons(polygons);
};
chad.csg.Solids.getResolution = function(r) {
	return 36;
};
chad.csg.Solids.sphere = function(position,radius,resolution) {
	if(radius == null) radius = 1.0;
	if(null == resolution) resolution = chad.csg.Solids.getResolution;
	var slices = resolution(radius);
	var stacks = Math.ceil(slices / 2);
	var polygons = [];
	var vertices = [];
	var vertex = function(theta,phi) {
		theta *= Math.PI * 2;
		phi *= Math.PI;
		var dir;
		var x = Math.cos(theta) * Math.sin(phi);
		var y = Math.cos(phi);
		var z = Math.sin(theta) * Math.sin(phi);
		dir = [x,y,z];
		vertices.push(new thx.geom.Vertex3D((function($this) {
			var $r;
			var p_0 = dir[0] * radius;
			var p_1 = dir[1] * radius;
			var p_2 = dir[2] * radius;
			$r = [position[0] + p_0,position[1] + p_1,position[2] + p_2];
			return $r;
		}(this)),dir));
	};
	var _g = 0;
	while(_g < slices) {
		var i = _g++;
		var _g1 = 0;
		while(_g1 < stacks) {
			var j = _g1++;
			vertices = [];
			vertex(i / slices,j / stacks);
			if(j > 0) vertex((i + 1) / slices,j / stacks);
			if(j < stacks - 1) vertex((i + 1) / slices,(j + 1) / stacks);
			vertex(i / slices,(j + 1) / stacks);
			polygons.push(new thx.geom.Polygon(vertices));
		}
	}
	return chad.csg._Solid.Solid_Impl_.fromPolygons(polygons);
};
chad["export"] = {};
chad.export.ThreeJS = function() { };
chad.export.ThreeJS.__name__ = true;
chad.export.ThreeJS.getVertices = function(vertices) {
	var acc = [];
	var $it0 = vertices.iterator();
	while( $it0.hasNext() ) {
		var combo = $it0.next();
		acc = acc.concat(combo.Vertex3D.position.slice());
	}
	return acc;
};
chad.export.ThreeJS.getNormals = function(vertices) {
	var acc = [];
	var $it0 = vertices.iterator();
	while( $it0.hasNext() ) {
		var combo = $it0.next();
		acc = acc.concat(combo.Vertex3D.normal.slice());
	}
	return acc;
};
chad.export.ThreeJS.toModel = function(solid) {
	var faces = [];
	var vertices = new haxe.ds.StringMap();
	var index = 0;
	var $it0 = HxOverrides.iter(solid);
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
	var $it2 = HxOverrides.iter(solid);
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
var thx = {};
thx.geom = {};
thx.geom.Const = function() { };
thx.geom.Const.__name__ = true;
thx.geom.Line = function(normal,w) {
	var l = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
	this.w = w * l;
	this.normal = [normal[0] / l,normal[1] / l];
};
thx.geom.Line.__name__ = true;
thx.geom.Line.fromPoints = function(p1,p2) {
	var direction;
	var p_0 = -p1[0];
	var p_1 = -p1[1];
	direction = [p2[0] + p_0,p2[1] + p_1];
	var normal;
	var this1;
	var this_0 = direction[1];
	var this_1 = -direction[0];
	this1 = [-this_0,-this_1];
	var v = Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1]);
	normal = [this1[0] / v,this1[1] / v];
	var w = p1[0] * normal[0] + p1[1] * normal[1];
	return new thx.geom.Line(normal,w);
};
thx.geom.Line.prototype = {
	offset: function(value) {
		return new thx.geom.Line(this.normal,this.w + value);
	}
	,reverse: function() {
		return new thx.geom.Line((function($this) {
			var $r;
			var this1 = $this.normal;
			$r = [-this1[0],-this1[1]];
			return $r;
		}(this)),-this.w);
	}
	,equals: function(other) {
		return (function($this) {
			var $r;
			var this1 = $this.normal;
			var p = other.normal;
			$r = this1[0] == p[0] && this1[1] == p[1];
			return $r;
		}(this)) && this.w == other.w;
	}
	,origin: function() {
		var this1 = this.normal;
		var v = this.w;
		return [this1[0] * v,this1[1] * v];
	}
	,direction: function() {
		var this1 = this.normal;
		return [this1[1],-this1[0]];
	}
	,xAtY: function(y) {
		return (this.w - this.normal[1] * y) / this.normal[0];
	}
	,absDistanceToPoint: function(point) {
		return Math.abs((function($this) {
			var $r;
			var p = $this.normal;
			$r = point[0] * p[0] + point[1] * p[1];
			return $r;
		}(this)) - this.w);
	}
	,intersectWithLine: function(line) {
		return thx.geom._Point.Point_Impl_.solve2Linear(this.normal[0],this.normal[1],line.normal[0],line.normal[1],this.w,line.w);
	}
	,transform: function(matrix) {
		var origin = [0,0];
		var pointOnPlane;
		var this1 = this.normal;
		var v = this.w;
		pointOnPlane = [this1[0] * v,this1[1] * v];
		var neworigin = thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,origin);
		var neworiginPlusNormal = thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.normal);
		var newnormal;
		var p_0 = -neworigin[0];
		var p_1 = -neworigin[1];
		newnormal = [neworiginPlusNormal[0] + p_0,neworiginPlusNormal[1] + p_1];
		var newpointOnPlane = thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,pointOnPlane);
		var neww = newnormal[0] * newpointOnPlane[0] + newnormal[1] * newpointOnPlane[1];
		return new thx.geom.Line(newnormal,neww);
	}
};
thx.geom.Line3D = function(point,direction) {
	this.point = point;
	var v = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(direction,[direction[0],direction[1],direction[2]]));
	this.direction = [direction[0] / v,direction[1] / v,direction[2] / v];
};
thx.geom.Line3D.__name__ = true;
thx.geom.Line3D.fromPoints = function(p1,p2) {
	return new thx.geom.Line3D(p1,(function($this) {
		var $r;
		var this1;
		{
			var p_0 = -p1[0];
			var p_1 = -p1[1];
			var p_2 = -p1[2];
			this1 = [p2[0] + p_0,p2[1] + p_1,p2[2] + p_2];
		}
		var v = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(this1,[this1[0],this1[1],this1[2]]));
		$r = [this1[0] / v,this1[1] / v,this1[2] / v];
		return $r;
	}(this)));
};
thx.geom.Line3D.fromPlanes = function(p1,p2) {
	var direction;
	var this1 = p1.normal;
	var p = p2.normal;
	direction = [this1[1] * p[2] - this1[2] * p[1],this1[2] * p[0] - this1[0] * p[2],this1[0] * p[1] - this1[1] * p[0]];
	var l = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(direction,[direction[0],direction[1],direction[2]]));
	if(l < 1e-10) throw "Parallel planes";
	var v = 1.0 / l;
	direction = [direction[0] * v,direction[1] * v,direction[2] * v];
	var mabsx = Math.abs(direction[0]);
	var mabsy = Math.abs(direction[1]);
	var mabsz = Math.abs(direction[2]);
	var origin;
	if(mabsx >= mabsy && mabsx >= mabsz) {
		var r = thx.geom._Point.Point_Impl_.solve2Linear(p1.normal[1],p1.normal[2],p2.normal[1],p2.normal[2],p1.w,p2.w);
		origin = [0,r[0],r[1]];
	} else if(mabsy >= mabsx && mabsy >= mabsz) {
		var r1 = thx.geom._Point.Point_Impl_.solve2Linear(p1.normal[0],p1.normal[2],p2.normal[0],p2.normal[2],p1.w,p2.w);
		origin = [r1[0],0,r1[1]];
	} else {
		var r2 = thx.geom._Point.Point_Impl_.solve2Linear(p1.normal[0],p1.normal[1],p2.normal[0],p2.normal[1],p1.w,p2.w);
		origin = [r2[0],r2[1],0];
	}
	return new thx.geom.Line3D(origin,direction);
};
thx.geom.Line3D.prototype = {
	intersectWithPlane: function(plane) {
		var lambda = (plane.w - thx.geom._Point3D.Point3D_Impl_.dot(plane.normal,this.point)) / thx.geom._Point3D.Point3D_Impl_.dot(plane.normal,this.direction);
		var this1 = this.point;
		var p;
		var this2 = this.direction;
		p = [this2[0] * lambda,this2[1] * lambda,this2[2] * lambda];
		return [this1[0] + p[0],this1[1] + p[1],this1[2] + p[2]];
	}
	,reverse: function() {
		return new thx.geom.Line3D(this.point,(function($this) {
			var $r;
			var this1 = $this.direction;
			$r = [-this1[0],-this1[1],-this1[2]];
			return $r;
		}(this)));
	}
	,transform: function(matrix4x4) {
		var newpoint;
		var this1 = this.point;
		newpoint = thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint3D(matrix4x4,[this1[0],this1[1],this1[2]]);
		var pointaddDirection;
		var this2 = this.point;
		var p = this.direction;
		pointaddDirection = [this2[0] + p[0],this2[1] + p[1],this2[2] + p[2]];
		var newPointaddDirection = thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint3D(matrix4x4,[pointaddDirection[0],pointaddDirection[1],pointaddDirection[2]]);
		var newdirection;
		var p_0 = -newpoint[0];
		var p_1 = -newpoint[1];
		var p_2 = -newpoint[2];
		newdirection = [newPointaddDirection[0] + p_0,newPointaddDirection[1] + p_1,newPointaddDirection[2] + p_2];
		return new thx.geom.Line3D(newpoint,newdirection);
	}
	,closestPointOnLine: function(point) {
		var t = thx.geom._Point3D.Point3D_Impl_.dot((function($this) {
			var $r;
			var p_0 = -point[0];
			var p_1 = -point[1];
			var p_2 = -point[2];
			$r = [point[0] + p_0,point[1] + p_1,point[2] + p_2];
			return $r;
		}(this)),this.direction) / thx.geom._Point3D.Point3D_Impl_.dot(this.direction,this.direction);
		var p;
		var this1 = this.direction;
		p = [this1[0] * t,this1[1] * t,this1[2] * t];
		return [point[0] + p[0],point[1] + p[1],point[2] + p[2]];
	}
	,distanceToPoint: function(point) {
		var closestpoint = this.closestPointOnLine(point);
		var distancevector;
		var p_0 = -closestpoint[0];
		var p_1 = -closestpoint[1];
		var p_2 = -closestpoint[2];
		distancevector = [point[0] + p_0,point[1] + p_1,point[2] + p_2];
		return Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(distancevector,[distancevector[0],distancevector[1],distancevector[2]]));
	}
	,equals: function(line) {
		if(!thx.geom._Point3D.Point3D_Impl_.equals(this.direction,line.direction)) return false;
		return this.distanceToPoint(line.point) <= 1e-8;
	}
};
thx.geom._Matrix4x4 = {};
thx.geom._Matrix4x4.Matrix4x4_Impl_ = function() { };
thx.geom._Matrix4x4.Matrix4x4_Impl_.__name__ = true;
thx.geom._Matrix4x4.Matrix4x4_Impl_.fromArray = function(e) {
	if(e.length != 16) throw "Invalid array length (" + e.length + ") for Matrix4x4, should be 16";
	return [e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.rotationX = function(radians) {
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	return [1,0,0,0,0,cos,sin,0,0,-sin,cos,0,0,0,0,1];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.rotationY = function(radians) {
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	return [cos,0,-sin,0,0,1,0,0,sin,0,cos,0,0,0,0,1];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.rotationZ = function(radians) {
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	return [cos,sin,0,0,-sin,cos,0,0,0,0,1,0,0,0,0,1];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.rotation = function(rotationCenter,rotationAxis,radians) {
	var rotationPlane = thx.geom.Plane.fromNormalAndPoint(rotationAxis,rotationCenter);
	var orthobasis = new thx.geom.OrthoNormalBasis(rotationPlane,thx.geom._Point3D.Point3D_Impl_.randomNonParallelVector(rotationPlane.normal));
	var transformation = thx.geom._Matrix4x4.Matrix4x4_Impl_.translation([-rotationCenter[0],-rotationCenter[1],-rotationCenter[2]]);
	transformation = thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(transformation,orthobasis.getProjectionMatrix());
	transformation = thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(transformation,thx.geom._Matrix4x4.Matrix4x4_Impl_.rotationZ(radians));
	transformation = thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(transformation,orthobasis.getInverseProjectionMatrix());
	transformation = thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(transformation,thx.geom._Matrix4x4.Matrix4x4_Impl_.translation(rotationCenter));
	return transformation;
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.translation = function(vec) {
	return [1,0,0,0,0,1,0,0,0,0,1,0,vec[0],vec[1],vec[2],1];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.mirroring = function(plane) {
	var nx = plane.normal[0];
	var ny = plane.normal[1];
	var nz = plane.normal[2];
	var w = plane.w;
	return [1.0 - 2.0 * nx * nx,-2. * ny * nx,-2. * nz * nx,0,-2. * nx * ny,1.0 - 2.0 * ny * ny,-2. * nz * ny,0,-2. * nx * nz,-2. * ny * nz,1.0 - 2.0 * nz * nz,0,-2. * nx * w,-2. * ny * w,-2. * nz * w,1];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.scaling = function(vec) {
	return [vec[0],0,0,0,0,vec[1],0,0,0,0,vec[2],0,0,0,0,1];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_._new = function(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15) {
	return [e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.toArray = function(this1) {
	return this1.slice();
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.add = function(this1,other) {
	return [this1[0] + other[0],this1[1] + other[1],this1[2] + other[2],this1[3] + other[3],this1[4] + other[4],this1[5] + other[5],this1[6] + other[6],this1[7] + other[7],this1[8] + other[8],this1[9] + other[9],this1[10] + other[10],this1[11] + other[11],this1[12] + other[12],this1[13] + other[13],this1[14] + other[14],this1[15] + other[15]];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.subtract = function(this1,other) {
	return [this1[0] - other[0],this1[1] - other[1],this1[2] - other[2],this1[3] - other[3],this1[4] - other[4],this1[5] - other[5],this1[6] - other[6],this1[7] - other[7],this1[8] - other[8],this1[9] - other[9],this1[10] - other[10],this1[11] - other[11],this1[12] - other[12],this1[13] - other[13],this1[14] - other[14],this1[15] - other[15]];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply = function(this1,other) {
	var t0 = this1[0];
	var t1 = this1[1];
	var t2 = this1[2];
	var t3 = this1[3];
	var t4 = this1[4];
	var t5 = this1[5];
	var t6 = this1[6];
	var t7 = this1[7];
	var t8 = this1[8];
	var t9 = this1[9];
	var t10 = this1[10];
	var t11 = this1[11];
	var t12 = this1[12];
	var t13 = this1[13];
	var t14 = this1[14];
	var t15 = this1[15];
	var m0 = other[0];
	var m1 = other[1];
	var m2 = other[2];
	var m3 = other[3];
	var m4 = other[4];
	var m5 = other[5];
	var m6 = other[6];
	var m7 = other[7];
	var m8 = other[8];
	var m9 = other[9];
	var m10 = other[10];
	var m11 = other[11];
	var m12 = other[12];
	var m13 = other[13];
	var m14 = other[14];
	var m15 = other[15];
	return [t0 * m0 + t1 * m4 + t2 * m8 + t3 * m12,t0 * m1 + t1 * m5 + t2 * m9 + t3 * m13,t0 * m2 + t1 * m6 + t2 * m10 + t3 * m14,t0 * m3 + t1 * m7 + t2 * m11 + t3 * m15,t4 * m0 + t5 * m4 + t6 * m8 + t7 * m12,t4 * m1 + t5 * m5 + t6 * m9 + t7 * m13,t4 * m2 + t5 * m6 + t6 * m10 + t7 * m14,t4 * m3 + t5 * m7 + t6 * m11 + t7 * m15,t8 * m0 + t9 * m4 + t10 * m8 + t11 * m12,t8 * m1 + t9 * m5 + t10 * m9 + t11 * m13,t8 * m2 + t9 * m6 + t10 * m10 + t11 * m14,t8 * m3 + t9 * m7 + t10 * m11 + t11 * m15,t12 * m0 + t13 * m4 + t14 * m8 + t15 * m12,t12 * m1 + t13 * m5 + t14 * m9 + t15 * m13,t12 * m2 + t13 * m6 + t14 * m10 + t15 * m14,t12 * m3 + t13 * m7 + t14 * m11 + t15 * m15];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.rightMultiplyPoint3D = function(this1,vector) {
	var v0 = vector[0];
	var v1 = vector[1];
	var v2 = vector[2];
	var v3 = 1;
	var x = v0 * this1[0] + v1 * this1[1] + v2 * this1[2] + v3 * this1[3];
	var y = v0 * this1[4] + v1 * this1[5] + v2 * this1[6] + v3 * this1[7];
	var z = v0 * this1[8] + v1 * this1[9] + v2 * this1[10] + v3 * this1[11];
	var w = v0 * this1[12] + v1 * this1[13] + v2 * this1[14] + v3 * this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y,z];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint3D = function(this1,vector) {
	var v0 = vector[0];
	var v1 = vector[1];
	var v2 = vector[2];
	var v3 = 1;
	var x = v0 * this1[0] + v1 * this1[4] + v2 * this1[8] + v3 * this1[12];
	var y = v0 * this1[1] + v1 * this1[5] + v2 * this1[9] + v3 * this1[13];
	var z = v0 * this1[2] + v1 * this1[6] + v2 * this1[10] + v3 * this1[14];
	var w = v0 * this1[3] + v1 * this1[7] + v2 * this1[11] + v3 * this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y,z];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.rightMultiplyPoint = function(this1,vector) {
	var v0 = vector[0];
	var v1 = vector[1];
	var v2 = 0;
	var v3 = 1;
	var x = v0 * this1[0] + v1 * this1[1] + v2 * this1[2] + v3 * this1[3];
	var y = v0 * this1[4] + v1 * this1[5] + v2 * this1[6] + v3 * this1[7];
	var z = v0 * this1[8] + v1 * this1[9] + v2 * this1[10] + v3 * this1[11];
	var w = v0 * this1[12] + v1 * this1[13] + v2 * this1[14] + v3 * this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint = function(this1,vector) {
	var v0 = vector[0];
	var v1 = vector[1];
	var v2 = 0;
	var v3 = 1;
	var x = v0 * this1[0] + v1 * this1[4] + v2 * this1[8] + v3 * this1[12];
	var y = v0 * this1[1] + v1 * this1[5] + v2 * this1[9] + v3 * this1[13];
	var z = v0 * this1[2] + v1 * this1[6] + v2 * this1[10] + v3 * this1[14];
	var w = v0 * this1[3] + v1 * this1[7] + v2 * this1[11] + v3 * this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.isMirroring = function(this1) {
	var u_0 = this1[0];
	var u_1 = this1[4];
	var u_2 = this1[8];
	var v_0 = this1[1];
	var v_1 = this1[5];
	var v_2 = this1[9];
	var w = [this1[2],this1[6],this1[10]];
	var mirrorvalue = thx.geom._Point3D.Point3D_Impl_.dot([u_1 * v_2 - u_2 * v_1,u_2 * v_0 - u_0 * v_2,u_0 * v_1 - u_1 * v_0],w);
	var ismirror = mirrorvalue < 0;
	return ismirror;
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.at = function(this1,index) {
	return this1[index];
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.toString = function(this1) {
	return "Matrix(" + this1.join(",") + ")";
};
thx.geom.Plane = function(normal,w) {
	this.normal = normal;
	this.w = w;
};
thx.geom.Plane.__name__ = true;
thx.geom.Plane.fromPoint3Ds = function(a,b,c) {
	var n;
	var this1;
	var this2;
	var p_0 = -a[0];
	var p_1 = -a[1];
	var p_2 = -a[2];
	this2 = [b[0] + p_0,b[1] + p_1,b[2] + p_2];
	var p;
	var p_01 = -a[0];
	var p_11 = -a[1];
	var p_21 = -a[2];
	p = [c[0] + p_01,c[1] + p_11,c[2] + p_21];
	this1 = [this2[1] * p[2] - this2[2] * p[1],this2[2] * p[0] - this2[0] * p[2],this2[0] * p[1] - this2[1] * p[0]];
	var v = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(this1,[this1[0],this1[1],this1[2]]));
	n = [this1[0] / v,this1[1] / v,this1[2] / v];
	return new thx.geom.Plane(n,thx.geom._Point3D.Point3D_Impl_.dot(n,a));
};
thx.geom.Plane.anyPlaneFromPoint3Ds = function(a,b,c) {
	var v1;
	var p_0 = -a[0];
	var p_1 = -a[1];
	var p_2 = -a[2];
	v1 = [b[0] + p_0,b[1] + p_1,b[2] + p_2];
	var v2;
	var p_01 = -a[0];
	var p_11 = -a[1];
	var p_21 = -a[2];
	v2 = [c[0] + p_01,c[1] + p_11,c[2] + p_21];
	if(Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(v1,[v1[0],v1[1],v1[2]])) < 1e-5) v1 = thx.geom._Point3D.Point3D_Impl_.randomNonParallelVector(v2);
	if(Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(v2,[v2[0],v2[1],v2[2]])) < 1e-5) v2 = thx.geom._Point3D.Point3D_Impl_.randomNonParallelVector(v1);
	var normal = [v1[1] * v2[2] - v1[2] * v2[1],v1[2] * v2[0] - v1[0] * v2[2],v1[0] * v2[1] - v1[1] * v2[0]];
	if(Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(normal,[normal[0],normal[1],normal[2]])) < 1e-5) {
		v2 = thx.geom._Point3D.Point3D_Impl_.randomNonParallelVector(v1);
		normal = [v1[1] * v2[2] - v1[2] * v2[1],v1[2] * v2[0] - v1[0] * v2[2],v1[0] * v2[1] - v1[1] * v2[0]];
	}
	var v = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(normal,[normal[0],normal[1],normal[2]]));
	normal = [normal[0] / v,normal[1] / v,normal[2] / v];
	return new thx.geom.Plane(normal,thx.geom._Point3D.Point3D_Impl_.dot(normal,a));
};
thx.geom.Plane.fromPoints = function(a,b,c) {
	var n;
	var this1;
	var this2;
	var p_0 = -a[0];
	var p_1 = -a[1];
	var p_2 = -a[2];
	this2 = [b[0] + p_0,b[1] + p_1,b[2] + p_2];
	var p;
	var p_01 = -a[0];
	var p_11 = -a[1];
	var p_21 = -a[2];
	p = [c[0] + p_01,c[1] + p_11,c[2] + p_21];
	this1 = [this2[1] * p[2] - this2[2] * p[1],this2[2] * p[0] - this2[0] * p[2],this2[0] * p[1] - this2[1] * p[0]];
	var v = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(this1,[this1[0],this1[1],this1[2]]));
	n = [this1[0] / v,this1[1] / v,this1[2] / v];
	return new thx.geom.Plane(n,thx.geom._Point3D.Point3D_Impl_.dot(n,a));
};
thx.geom.Plane.fromNormalAndPoint = function(normal,point) {
	var v = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(normal,[normal[0],normal[1],normal[2]]));
	normal = [normal[0] / v,normal[1] / v,normal[2] / v];
	return new thx.geom.Plane(normal,thx.geom._Point3D.Point3D_Impl_.dot(point,normal));
};
thx.geom.Plane.prototype = {
	flip: function() {
		return new thx.geom.Plane((function($this) {
			var $r;
			var this1 = $this.normal;
			$r = [-this1[0],-this1[1],-this1[2]];
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
			var vertex = $it0.next();
			t1 = thx.geom._Point3D.Point3D_Impl_.dot(this.normal,vertex.position) - this.w;
			if(t1 < -1e-05) type = 2; else if(t1 > 1e-5) type = 1; else type = 0;
			polygonType |= type;
			types.push(type);
		}
		switch(polygonType) {
		case 0:
			(thx.geom._Point3D.Point3D_Impl_.dot(this.normal,polygon.get_plane().normal) > 0?coplanarFront:coplanarBack).push(polygon);
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
					t1 = (this.w - thx.geom._Point3D.Point3D_Impl_.dot(this.normal,vi.position)) / thx.geom._Point3D.Point3D_Impl_.dot(this.normal,(function($this) {
						var $r;
						var this1 = vj.position;
						var p = vi.position;
						var p_0 = -p[0];
						var p_1 = -p[1];
						var p_2 = -p[2];
						$r = [this1[0] + p_0,this1[1] + p_1,this1[2] + p_2];
						return $r;
					}(this)));
					v = new thx.geom.Vertex3D(thx.geom._Point3D.Point3D_Impl_.interpolate(vi.position,vj.position,t1),thx.geom._Point3D.Point3D_Impl_.interpolate(vi.normal,vj.normal,t1));
					f.push(v);
					b.push(v);
				}
			}
			if(f.length >= 3) front.push(new thx.geom.Polygon(f));
			if(b.length >= 3) back.push(new thx.geom.Polygon(b));
			break;
		}
	}
	,equals: function(other) {
		return thx.geom._Point3D.Point3D_Impl_.equals(this.normal,other.normal) && this.w == other.w;
	}
	,transform: function(matrix) {
		var ismirror = thx.geom._Matrix4x4.Matrix4x4_Impl_.isMirroring(matrix);
		var r = thx.geom._Point3D.Point3D_Impl_.randomNonParallelVector(this.normal);
		var u;
		var this1 = this.normal;
		u = [this1[1] * r[2] - this1[2] * r[1],this1[2] * r[0] - this1[0] * r[2],this1[0] * r[1] - this1[1] * r[0]];
		var v;
		var this2 = this.normal;
		v = [this2[1] * u[2] - this2[2] * u[1],this2[2] * u[0] - this2[0] * u[2],this2[0] * u[1] - this2[1] * u[0]];
		var point1;
		var this3 = this.normal;
		var v1 = this.w;
		point1 = [this3[0] * v1,this3[1] * v1,this3[2] * v1];
		var point2 = [point1[0] + u[0],point1[1] + u[1],point1[2] + u[2]];
		var point3 = [point1[0] + v[0],point1[1] + v[1],point1[2] + v[2]];
		point1 = thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint3D(matrix,[point1[0],point1[1],point1[2]]);
		point2 = thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint3D(matrix,[point2[0],point2[1],point2[2]]);
		point3 = thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint3D(matrix,[point3[0],point3[1],point3[2]]);
		var newplane = thx.geom.Plane.fromPoint3Ds(point1,point2,point3);
		if(ismirror) newplane = newplane.flip();
		return newplane;
	}
	,splitLineBetweenPoints: function(p1,p2) {
		var direction;
		var p_0 = -p1[0];
		var p_1 = -p1[1];
		var p_2 = -p1[2];
		direction = [p2[0] + p_0,p2[1] + p_1,p2[2] + p_2];
		var lambda = (this.w - thx.geom._Point3D.Point3D_Impl_.dot(this.normal,p1)) / thx.geom._Point3D.Point3D_Impl_.dot(this.normal,direction);
		if(isNaN(lambda)) lambda = 0; else if(lambda > 1) lambda = 1; else if(lambda < 0) lambda = 0;
		var p_01 = direction[0] * lambda;
		var p_11 = direction[1] * lambda;
		var p_21 = direction[2] * lambda;
		return [p1[0] + p_01,p1[1] + p_11,p1[2] + p_21];
	}
	,intersectWithLine: function(line) {
		return line.intersectWithPlane(this);
	}
	,intersectWithPlane: function(plane) {
		return thx.geom.Line3D.fromPlanes(this,plane);
	}
	,signedDistanceToPoint: function(point) {
		return thx.geom._Point3D.Point3D_Impl_.dot(this.normal,point) - this.w;
	}
	,toString: function() {
		return "Plane [normal: " + (function($this) {
			var $r;
			var this1 = $this.normal;
			$r = "Point3D(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
			return $r;
		}(this)) + ", w: " + this.w + "]";
	}
	,mirrorPoint: function(point3d) {
		var distance = this.signedDistanceToPoint(point3d);
		var mirrored;
		var p;
		var this1 = this.normal;
		var v = distance * 2.0;
		p = [this1[0] * v,this1[1] * v,this1[2] * v];
		var p_0 = -p[0];
		var p_1 = -p[1];
		var p_2 = -p[2];
		mirrored = [point3d[0] + p_0,point3d[1] + p_1,point3d[2] + p_2];
		return mirrored;
	}
};
thx.geom._Point3D = {};
thx.geom._Point3D.Point3D_Impl_ = function() { };
thx.geom._Point3D.Point3D_Impl_.__name__ = true;
thx.geom._Point3D.Point3D_Impl_.fromObject = function(o) {
	return [o.x,o.y,o.z];
};
thx.geom._Point3D.Point3D_Impl_.fromArray = function(arr) {
	return [arr[0],arr[1],arr[2]];
};
thx.geom._Point3D.Point3D_Impl_._new = function(x,y,z) {
	return [x,y,z];
};
thx.geom._Point3D.Point3D_Impl_.get_x = function(this1) {
	return this1[0];
};
thx.geom._Point3D.Point3D_Impl_.get_y = function(this1) {
	return this1[1];
};
thx.geom._Point3D.Point3D_Impl_.get_z = function(this1) {
	return this1[2];
};
thx.geom._Point3D.Point3D_Impl_.get_length = function(this1) {
	return Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(this1,[this1[0],this1[1],this1[2]]));
};
thx.geom._Point3D.Point3D_Impl_.get_lengthSquared = function(this1) {
	return thx.geom._Point3D.Point3D_Impl_.dot(this1,[this1[0],this1[1],this1[2]]);
};
thx.geom._Point3D.Point3D_Impl_.get_inst = function(this1) {
	return this1;
};
thx.geom._Point3D.Point3D_Impl_.addPoint3D = function(this1,p) {
	return [this1[0] + p[0],this1[1] + p[1],this1[2] + p[2]];
};
thx.geom._Point3D.Point3D_Impl_.add = function(this1,v) {
	return [this1[0] + v,this1[1] + v,this1[2] + v];
};
thx.geom._Point3D.Point3D_Impl_.negate = function(this1) {
	return [-this1[0],-this1[1],-this1[2]];
};
thx.geom._Point3D.Point3D_Impl_.subtractPoint3D = function(this1,p) {
	var p_0 = -p[0];
	var p_1 = -p[1];
	var p_2 = -p[2];
	return [this1[0] + p_0,this1[1] + p_1,this1[2] + p_2];
};
thx.geom._Point3D.Point3D_Impl_.subtract = function(this1,v) {
	var v1 = -v;
	return [this1[0] + v1,this1[1] + v1,this1[2] + v1];
};
thx.geom._Point3D.Point3D_Impl_.multiplyPoint3D = function(this1,p) {
	return [this1[0] * p[0],this1[1] * p[1],this1[2] * p[2]];
};
thx.geom._Point3D.Point3D_Impl_.multiply = function(this1,v) {
	return [this1[0] * v,this1[1] * v,this1[2] * v];
};
thx.geom._Point3D.Point3D_Impl_.dividePoint3D = function(this1,p) {
	return [this1[0] / p[0],this1[1] / p[1],this1[2] / p[2]];
};
thx.geom._Point3D.Point3D_Impl_.divide = function(this1,v) {
	return [this1[0] / v,this1[1] / v,this1[2] / v];
};
thx.geom._Point3D.Point3D_Impl_.equals = function(this1,p) {
	return this1[0] == p[0] && this1[1] == p[1] && this1[2] == p[2];
};
thx.geom._Point3D.Point3D_Impl_.notEquals = function(this1,p) {
	return !thx.geom._Point3D.Point3D_Impl_.equals(this1,p);
};
thx.geom._Point3D.Point3D_Impl_.abs = function(this1) {
	var x = Math.abs(this1[0]);
	var y = Math.abs(this1[1]);
	var z = Math.abs(this1[2]);
	return [x,y,z];
};
thx.geom._Point3D.Point3D_Impl_.nearEquals = function(this1,p) {
	return Math.abs(this1[0] - p[0]) <= 1e-5 && Math.abs(this1[1] - p[1]) <= 1e-5 && Math.abs(this1[2] - p[2]) <= 1e-5;
};
thx.geom._Point3D.Point3D_Impl_.interpolate = function(this1,p,f) {
	var p1;
	var this2;
	var p_0 = this1[0];
	var p_1 = this1[1];
	var p_2 = this1[2];
	var p_01 = -p_0;
	var p_11 = -p_1;
	var p_21 = -p_2;
	this2 = [p[0] + p_01,p[1] + p_11,p[2] + p_21];
	p1 = [this2[0] * f,this2[1] * f,this2[2] * f];
	return [this1[0] + p1[0],this1[1] + p1[1],this1[2] + p1[2]];
};
thx.geom._Point3D.Point3D_Impl_.isZero = function(this1) {
	return thx.geom._Point3D.Point3D_Impl_.equals(this1,thx.geom._Point3D.Point3D_Impl_.zero);
};
thx.geom._Point3D.Point3D_Impl_.isNearZero = function(this1) {
	return thx.geom._Point3D.Point3D_Impl_.nearEquals(this1,thx.geom._Point3D.Point3D_Impl_.zero);
};
thx.geom._Point3D.Point3D_Impl_.dot = function(this1,prod) {
	return this1[0] * prod[0] + this1[1] * prod[1] + this1[2] * prod[2];
};
thx.geom._Point3D.Point3D_Impl_.normalize = function(this1) {
	var v = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(this1,[this1[0],this1[1],this1[2]]));
	return [this1[0] / v,this1[1] / v,this1[2] / v];
};
thx.geom._Point3D.Point3D_Impl_.distanceTo = function(this1,p) {
	var this2;
	var p_0 = -p[0];
	var p_1 = -p[1];
	var p_2 = -p[2];
	this2 = [this1[0] + p_0,this1[1] + p_1,this1[2] + p_2];
	return Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(this2,[this2[0],this2[1],this2[2]]));
};
thx.geom._Point3D.Point3D_Impl_.distanceToSquared = function(this1,p) {
	var this2;
	var p_0 = -p[0];
	var p_1 = -p[1];
	var p_2 = -p[2];
	this2 = [this1[0] + p_0,this1[1] + p_1,this1[2] + p_2];
	return thx.geom._Point3D.Point3D_Impl_.dot(this2,[this2[0],this2[1],this2[2]]);
};
thx.geom._Point3D.Point3D_Impl_.multiply4x4 = function(this1,matrix4x4) {
	return thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint3D(matrix4x4,[this1[0],this1[1],this1[2]]);
};
thx.geom._Point3D.Point3D_Impl_.transform = function(this1,matrix4x4) {
	return thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint3D(matrix4x4,[this1[0],this1[1],this1[2]]);
};
thx.geom._Point3D.Point3D_Impl_.randomNonParallelVector = function(this1) {
	var a = thx.geom._Point3D.Point3D_Impl_.abs(this1);
	if(a[0] <= a[1] && a[0] <= a[2]) return [1,0,0]; else if(a[1] <= a[0] && a[1] <= a[2]) return [0,1,0]; else return [0,0,1];
};
thx.geom._Point3D.Point3D_Impl_.cross = function(this1,p) {
	return [this1[1] * p[2] - this1[2] * p[1],this1[2] * p[0] - this1[0] * p[2],this1[0] * p[1] - this1[1] * p[0]];
};
thx.geom._Point3D.Point3D_Impl_.min = function(this1,p) {
	var x = Math.min(this1[0],p[0]);
	var y = Math.min(this1[1],p[1]);
	var z = Math.min(this1[2],p[2]);
	return [x,y,z];
};
thx.geom._Point3D.Point3D_Impl_.max = function(this1,p) {
	var x = Math.max(this1[0],p[0]);
	var y = Math.max(this1[1],p[1]);
	var z = Math.max(this1[2],p[2]);
	return [x,y,z];
};
thx.geom._Point3D.Point3D_Impl_.toArray = function(this1) {
	return this1.slice();
};
thx.geom._Point3D.Point3D_Impl_.toObject = function(this1) {
	return { x : this1[0], y : this1[1], z : this1[2]};
};
thx.geom._Point3D.Point3D_Impl_.toString = function(this1) {
	return "Point3D(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
thx.geom.OrthoNormalBasis = function(plane,rightvector) {
	var this1;
	var this2 = plane.normal;
	this1 = [this2[1] * rightvector[2] - this2[2] * rightvector[1],this2[2] * rightvector[0] - this2[0] * rightvector[2],this2[0] * rightvector[1] - this2[1] * rightvector[0]];
	var v = Math.sqrt(thx.geom._Point3D.Point3D_Impl_.dot(this1,[this1[0],this1[1],this1[2]]));
	this.v = [this1[0] / v,this1[1] / v,this1[2] / v];
	var this3 = this.v;
	var p = plane.normal;
	this.u = [this3[1] * p[2] - this3[2] * p[1],this3[2] * p[0] - this3[0] * p[2],this3[0] * p[1] - this3[1] * p[0]];
	this.plane = plane;
	var this4 = plane.normal;
	var v1 = plane.w;
	this.planeOrigin = [this4[0] * v1,this4[1] * v1,this4[2] * v1];
};
thx.geom.OrthoNormalBasis.__name__ = true;
thx.geom.OrthoNormalBasis.fromPlane = function(plane) {
	return new thx.geom.OrthoNormalBasis(plane,thx.geom._Point3D.Point3D_Impl_.randomNonParallelVector(plane.normal));
};
thx.geom.OrthoNormalBasis.prototype = {
	getProjectionMatrix: function() {
		return [this.u[0],this.v[0],this.plane.normal[0],0,this.u[1],this.v[1],this.plane.normal[1],0,this.u[2],this.v[2],this.plane.normal[2],0,0,0,-this.plane.w,1];
	}
	,getInverseProjectionMatrix: function() {
		var p;
		var this1 = this.plane.normal;
		var v = this.plane.w;
		p = [this1[0] * v,this1[1] * v,this1[2] * v];
		return [this.u[0],this.u[1],this.u[2],0,this.v[0],this.v[1],this.v[2],0,this.plane.normal[0],this.plane.normal[1],this.plane.normal[2],0,p[0],p[1],p[2],1];
	}
	,to2D: function(vec3) {
		var x = thx.geom._Point3D.Point3D_Impl_.dot(vec3,this.u);
		var y = thx.geom._Point3D.Point3D_Impl_.dot(vec3,this.v);
		return [x,y];
	}
	,to3D: function(vec2) {
		var this1;
		var this2 = this.planeOrigin;
		var p;
		var this3 = this.u;
		var v = vec2[0];
		p = [this3[0] * v,this3[1] * v,this3[2] * v];
		this1 = [this2[0] + p[0],this2[1] + p[1],this2[2] + p[2]];
		var p1;
		var this4 = this.v;
		var v1 = vec2[1];
		p1 = [this4[0] * v1,this4[1] * v1,this4[2] * v1];
		return [this1[0] + p1[0],this1[1] + p1[1],this1[2] + p1[2]];
	}
	,line3Dto2D: function(line) {
		return thx.geom.Line.fromPoints(this.to2D(line.point),this.to2D((function($this) {
			var $r;
			var this1 = line.direction;
			var p = line.point;
			$r = [this1[0] + p[0],this1[1] + p[1],this1[2] + p[2]];
			return $r;
		}(this))));
	}
	,line2Dto3D: function(line) {
		var a = line.origin();
		var b;
		var this1 = line.direction();
		b = [this1[0] + a[0],this1[1] + a[1]];
		return thx.geom.Line3D.fromPoints(this.to3D(a),this.to3D(b));
	}
	,transform: function(matrix) {
		var newplane = this.plane.transform(matrix);
		var rightpoint_transformed;
		var this1 = this.u;
		rightpoint_transformed = thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint3D(matrix,[this1[0],this1[1],this1[2]]);
		var origin_transformed;
		var this_0 = 0;
		var this_1 = 0;
		var this_2 = 0;
		origin_transformed = thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint3D(matrix,[this_0,this_1,this_2]);
		var newrighthandvector;
		var p_0 = -origin_transformed[0];
		var p_1 = -origin_transformed[1];
		var p_2 = -origin_transformed[2];
		newrighthandvector = [rightpoint_transformed[0] + p_0,rightpoint_transformed[1] + p_1,rightpoint_transformed[2] + p_2];
		var newbasis = new thx.geom.OrthoNormalBasis(newplane,newrighthandvector);
		return newbasis;
	}
};
thx.geom._Point = {};
thx.geom._Point.Point_Impl_ = function() { };
thx.geom._Point.Point_Impl_.__name__ = true;
thx.geom._Point.Point_Impl_.fromObject = function(o) {
	return [o.x,o.y];
};
thx.geom._Point.Point_Impl_.fromArray = function(arr) {
	return [arr[0],arr[1]];
};
thx.geom._Point.Point_Impl_.fromAngle = function(angle) {
	var x = Math.cos(angle);
	var y = Math.sin(angle);
	return [x,y];
};
thx.geom._Point.Point_Impl_._new = function(x,y) {
	return [x,y];
};
thx.geom._Point.Point_Impl_.get_x = function(this1) {
	return this1[0];
};
thx.geom._Point.Point_Impl_.get_y = function(this1) {
	return this1[1];
};
thx.geom._Point.Point_Impl_.get_length = function(this1) {
	return Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1]);
};
thx.geom._Point.Point_Impl_.get_lengthSquared = function(this1) {
	return this1[0] * this1[0] + this1[1] * this1[1];
};
thx.geom._Point.Point_Impl_.get_inst = function(this1) {
	return this1;
};
thx.geom._Point.Point_Impl_.addPoint = function(this1,p) {
	return [this1[0] + p[0],this1[1] + p[1]];
};
thx.geom._Point.Point_Impl_.add = function(this1,v) {
	return [this1[0] + v,this1[1] + v];
};
thx.geom._Point.Point_Impl_.negate = function(this1) {
	return [-this1[0],-this1[1]];
};
thx.geom._Point.Point_Impl_.subtractPoint = function(this1,p) {
	var p_0 = -p[0];
	var p_1 = -p[1];
	return [this1[0] + p_0,this1[1] + p_1];
};
thx.geom._Point.Point_Impl_.subtract = function(this1,v) {
	var v1 = -v;
	return [this1[0] + v1,this1[1] + v1];
};
thx.geom._Point.Point_Impl_.multiplyPoint = function(this1,p) {
	return [this1[0] * p[0],this1[1] * p[1]];
};
thx.geom._Point.Point_Impl_.multiply = function(this1,v) {
	return [this1[0] * v,this1[1] * v];
};
thx.geom._Point.Point_Impl_.dividePoint = function(this1,p) {
	return [this1[0] / p[0],this1[1] / p[1]];
};
thx.geom._Point.Point_Impl_.divide = function(this1,v) {
	return [this1[0] / v,this1[1] / v];
};
thx.geom._Point.Point_Impl_.equals = function(this1,p) {
	return this1[0] == p[0] && this1[1] == p[1];
};
thx.geom._Point.Point_Impl_.notEquals = function(this1,p) {
	return !(this1[0] == p[0] && this1[1] == p[1]);
};
thx.geom._Point.Point_Impl_.abs = function(this1) {
	var x = Math.abs(this1[0]);
	var y = Math.abs(this1[1]);
	return [x,y];
};
thx.geom._Point.Point_Impl_.nearEquals = function(this1,p) {
	return Math.abs(this1[0] - p[0]) <= 1e-5 && Math.abs(this1[1] - p[1]) <= 1e-5;
};
thx.geom._Point.Point_Impl_.interpolate = function(this1,p,f) {
	var p1;
	var this2;
	var p2 = this1;
	var p_0 = -p2[0];
	var p_1 = -p2[1];
	this2 = [p[0] + p_0,p[1] + p_1];
	p1 = [this2[0] * f,this2[1] * f];
	return [this1[0] + p1[0],this1[1] + p1[1]];
};
thx.geom._Point.Point_Impl_.isZero = function(this1) {
	var p = thx.geom._Point.Point_Impl_.zero;
	return this1[0] == p[0] && this1[1] == p[1];
};
thx.geom._Point.Point_Impl_.isNearZero = function(this1) {
	return thx.geom._Point.Point_Impl_.nearEquals(this1,thx.geom._Point.Point_Impl_.zero);
};
thx.geom._Point.Point_Impl_.dot = function(this1,p) {
	return this1[0] * p[0] + this1[1] * p[1];
};
thx.geom._Point.Point_Impl_.normal = function(this1) {
	return [this1[1],-this1[0]];
};
thx.geom._Point.Point_Impl_.normalize = function(this1) {
	var v = Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1]);
	return [this1[0] / v,this1[1] / v];
};
thx.geom._Point.Point_Impl_.distanceTo = function(this1,p) {
	var this2;
	var p_0 = -p[0];
	var p_1 = -p[1];
	this2 = [this1[0] + p_0,this1[1] + p_1];
	return Math.sqrt(this2[0] * this2[0] + this2[1] * this2[1]);
};
thx.geom._Point.Point_Impl_.distanceToSquared = function(this1,p) {
	var this2;
	var p_0 = -p[0];
	var p_1 = -p[1];
	this2 = [this1[0] + p_0,this1[1] + p_1];
	return this2[0] * this2[0] + this2[1] * this2[1];
};
thx.geom._Point.Point_Impl_.transform = function(this1,matrix) {
	return thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this1);
};
thx.geom._Point.Point_Impl_.cross = function(this1,p) {
	return this1[0] * p[1] - this1[1] * p[0];
};
thx.geom._Point.Point_Impl_.min = function(this1,p) {
	var x = Math.min(this1[0],p[0]);
	var y = Math.min(this1[1],p[1]);
	return [x,y];
};
thx.geom._Point.Point_Impl_.max = function(this1,p) {
	var x = Math.max(this1[0],p[0]);
	var y = Math.max(this1[1],p[1]);
	return [x,y];
};
thx.geom._Point.Point_Impl_.pointAt = function(this1,angle,distance) {
	var this2 = this1;
	var p;
	var this3;
	var x = Math.cos(angle);
	var y = Math.sin(angle);
	this3 = [x,y];
	p = [this3[0] * distance,this3[1] * distance];
	return [this2[0] + p[0],this2[1] + p[1]];
};
thx.geom._Point.Point_Impl_.toAngle = function(this1) {
	return Math.atan2(this1[1],this1[0]);
};
thx.geom._Point.Point_Impl_.toArray = function(this1) {
	return this1.slice();
};
thx.geom._Point.Point_Impl_.toObject = function(this1) {
	return { x : this1[0], y : this1[1]};
};
thx.geom._Point.Point_Impl_.toString = function(this1) {
	return "Point(" + this1[0] + "," + this1[1] + ")";
};
thx.geom._Point.Point_Impl_.solve2Linear = function(a,b,c,d,u,v) {
	var det = a * d - b * c;
	if(det == 0) return null;
	var invdet = 1.0 / det;
	var x = u * d - b * v;
	var y = -u * c + a * v;
	return [x * invdet,y * invdet];
};
thx.geom._Point.Point_Impl_.interpolateBetween2DPointsForY = function(p1,p2,y) {
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
thx.geom.Polygon = function(vertices) {
	this.vertices = vertices;
};
thx.geom.Polygon.__name__ = true;
thx.geom.Polygon.fromVertices = function(vertices) {
	if((vertices instanceof Array) && vertices.__enum__ == null) return new thx.geom.Polygon(vertices.copy()); else return new thx.geom.Polygon((function($this) {
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
thx.geom.Polygon.prototype = {
	flip: function() {
		var reverse = this.vertices.slice();
		reverse.reverse();
		return new thx.geom.Polygon(reverse.map(function(v) {
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
		if(null == this.plane) return this.plane = thx.geom.Plane.fromPoints(this.vertices[0].position,this.vertices[1].position,this.vertices[2].position); else return this.plane;
	}
};
thx.geom.Vertex3D = function(position,normal) {
	this.position = position;
	this.normal = normal;
};
thx.geom.Vertex3D.__name__ = true;
thx.geom.Vertex3D.prototype = {
	flip: function() {
		return new thx.geom.Vertex3D(this.position,(function($this) {
			var $r;
			var this1 = $this.normal;
			$r = [-this1[0],-this1[1],-this1[2]];
			return $r;
		}(this)));
	}
	,interpolate: function(other,t) {
		return new thx.geom.Vertex3D(thx.geom._Point3D.Point3D_Impl_.interpolate(this.position,other.position,t),thx.geom._Point3D.Point3D_Impl_.interpolate(this.normal,other.normal,t));
	}
	,transform: function(matrix) {
		return new thx.geom.Vertex3D((function($this) {
			var $r;
			var this1 = $this.position;
			$r = thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint3D(matrix,[this1[0],this1[1],this1[2]]);
			return $r;
		}(this)),(function($this) {
			var $r;
			var this2 = $this.normal;
			$r = thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint3D(matrix,[this2[0],this2[1],this2[2]]);
			return $r;
		}(this)));
	}
	,toString: function() {
		return "Vertex3D " + (function($this) {
			var $r;
			var this1 = $this.position;
			$r = "Point3D(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
			return $r;
		}(this)) + ", " + (function($this) {
			var $r;
			var this2 = $this.normal;
			$r = "Point3D(" + this2[0] + "," + this2[1] + "," + this2[2] + ")";
			return $r;
		}(this));
	}
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
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
chad.csg.Solids.baseCube = [{ p : [0,4,6,2], n : [-1.0,0.0,0.0]},{ p : [1,3,7,5], n : [1.0,0.0,0.0]},{ p : [0,1,5,4], n : [0.0,-1.0,0.0]},{ p : [2,6,7,3], n : [0.0,1.0,0.0]},{ p : [0,2,3,1], n : [0.0,0.0,-1.0]},{ p : [4,5,7,6], n : [0.0,0.0,1.0]}];
thx.geom.Const.EPSILON = 1e-5;
thx.geom._Matrix4x4.Matrix4x4_Impl_.unity = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
thx.geom.Plane.COPLANAR = 0;
thx.geom.Plane.FRONT = 1;
thx.geom.Plane.BACK = 2;
thx.geom.Plane.SPANNING = 3;
thx.geom._Point3D.Point3D_Impl_.zero = [0,0,0];
thx.geom.OrthoNormalBasis.z0Plane = new thx.geom.OrthoNormalBasis(new thx.geom.Plane([0,0,1],0),[1,0,0]);
thx.geom._Point.Point_Impl_.zero = [0,0];
Main.main();
})();
