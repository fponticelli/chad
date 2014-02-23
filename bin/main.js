(function () { "use strict";
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Main = function() { }
Main.__name__ = true;
Main.main = function() {
	(window || {}).Main = Main;
}
Main.geom = function() {
	return chad.export.ThreeJS.toModel(chad.csg.Box.create((function($this) {
		var $r;
		var arr = [-0.5,-0.5,-0.5];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr = [1.0,1.0,1.0];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this))).union(chad.csg.Box.create((function($this) {
		var $r;
		var arr = [0.1,0.1,0.1];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr = [1.0,1.0,1.0];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)))).subtract(chad.csg.Box.create((function($this) {
		var $r;
		var arr = [-1.1,-1.1,-1.1];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr = [1.0,1.0,1.0];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)))).intersect(chad.csg.Sphere.create((function($this) {
		var $r;
		var arr = [0.0,0.0,0.0];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)),0.7)).subtract(chad.csg.Sphere.create((function($this) {
		var $r;
		var arr = [0.5,0.5,0.5];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)),0.35)).subtract(chad.csg.Cylinder.create((function($this) {
		var $r;
		var arr = [0.0,0.0,-0.95];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr = [0.0,0.0,0.95];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)),0.25)).subtract(chad.csg.Cylinder.create((function($this) {
		var $r;
		var arr = [0.0,-0.95,0.0];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr = [0.0,0.95,0.0];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)),0.35)).subtract(chad.csg.Cylinder.create((function($this) {
		var $r;
		var arr = [-0.95,0.0,0.0];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)),(function($this) {
		var $r;
		var arr = [0.95,0.0,0.0];
		$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
		return $r;
	}(this)),0.15)));
}
var IMap = function() { }
IMap.__name__ = true;
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var chad = {}
chad.csg = {}
chad.csg.Box = function() { }
chad.csg.Box.__name__ = true;
chad.csg.Box.create = function(position,size) {
	return chad.csg.Solid.fromPolygons(chad.csg.Box.baseCube.map(function(info) {
		return new chad.geom.Polygon(info.p.map(function(i) {
			var pos = [position[0] + size[0] * ((i & 1) != 0?1:0),position[1] + size[1] * ((i & 2) != 0?1:0),position[2] + size[2] * ((i & 4) != 0?1:0)];
			return new chad.geom.Vertex3(pos,(function($this) {
				var $r;
				var arr = info.n;
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}(this)));
		}));
	}));
}
chad.csg.Cylinder = function() { }
chad.csg.Cylinder.__name__ = true;
chad.csg.Cylinder.create = function(start,end,radius) {
	if(radius == null) radius = 1.0;
	var slices = Math.ceil(128 * radius);
	var ray = [end[0] - start[0],end[1] - start[1],end[2] - start[2]];
	var axisZ = (function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == ray[0]?0:ray[0],null == ray[1]?0:ray[1],null == ray[2]?0:ray[2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = ray[0] * prod[0] + ray[1] * prod[1] + ray[2] * prod[2];
			return $r;
		}($this)));
		$r = [ray[0] / divisor,ray[1] / divisor,ray[2] / divisor];
		return $r;
	}(this)), isY = Math.abs(axisZ[1]) > 0.5;
	var axisX = (function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == [[isY?1:0,isY?0:1,0][1] * axisZ[2] - [isY?1:0,isY?0:1,0][2] * axisZ[1],[isY?1:0,isY?0:1,0][2] * axisZ[0] - [isY?1:0,isY?0:1,0][0] * axisZ[2],[isY?1:0,isY?0:1,0][0] * axisZ[1] - [isY?1:0,isY?0:1,0][1] * axisZ[0]][0]?0:[[isY?1:0,isY?0:1,0][1] * axisZ[2] - [isY?1:0,isY?0:1,0][2] * axisZ[1],[isY?1:0,isY?0:1,0][2] * axisZ[0] - [isY?1:0,isY?0:1,0][0] * axisZ[2],[isY?1:0,isY?0:1,0][0] * axisZ[1] - [isY?1:0,isY?0:1,0][1] * axisZ[0]][0],null == [[isY?1:0,isY?0:1,0][1] * axisZ[2] - [isY?1:0,isY?0:1,0][2] * axisZ[1],[isY?1:0,isY?0:1,0][2] * axisZ[0] - [isY?1:0,isY?0:1,0][0] * axisZ[2],[isY?1:0,isY?0:1,0][0] * axisZ[1] - [isY?1:0,isY?0:1,0][1] * axisZ[0]][1]?0:[[isY?1:0,isY?0:1,0][1] * axisZ[2] - [isY?1:0,isY?0:1,0][2] * axisZ[1],[isY?1:0,isY?0:1,0][2] * axisZ[0] - [isY?1:0,isY?0:1,0][0] * axisZ[2],[isY?1:0,isY?0:1,0][0] * axisZ[1] - [isY?1:0,isY?0:1,0][1] * axisZ[0]][1],null == [[isY?1:0,isY?0:1,0][1] * axisZ[2] - [isY?1:0,isY?0:1,0][2] * axisZ[1],[isY?1:0,isY?0:1,0][2] * axisZ[0] - [isY?1:0,isY?0:1,0][0] * axisZ[2],[isY?1:0,isY?0:1,0][0] * axisZ[1] - [isY?1:0,isY?0:1,0][1] * axisZ[0]][2]?0:[[isY?1:0,isY?0:1,0][1] * axisZ[2] - [isY?1:0,isY?0:1,0][2] * axisZ[1],[isY?1:0,isY?0:1,0][2] * axisZ[0] - [isY?1:0,isY?0:1,0][0] * axisZ[2],[isY?1:0,isY?0:1,0][0] * axisZ[1] - [isY?1:0,isY?0:1,0][1] * axisZ[0]][2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = [[isY?1:0,isY?0:1,0][1] * axisZ[2] - [isY?1:0,isY?0:1,0][2] * axisZ[1],[isY?1:0,isY?0:1,0][2] * axisZ[0] - [isY?1:0,isY?0:1,0][0] * axisZ[2],[isY?1:0,isY?0:1,0][0] * axisZ[1] - [isY?1:0,isY?0:1,0][1] * axisZ[0]][0] * prod[0] + [[isY?1:0,isY?0:1,0][1] * axisZ[2] - [isY?1:0,isY?0:1,0][2] * axisZ[1],[isY?1:0,isY?0:1,0][2] * axisZ[0] - [isY?1:0,isY?0:1,0][0] * axisZ[2],[isY?1:0,isY?0:1,0][0] * axisZ[1] - [isY?1:0,isY?0:1,0][1] * axisZ[0]][1] * prod[1] + [[isY?1:0,isY?0:1,0][1] * axisZ[2] - [isY?1:0,isY?0:1,0][2] * axisZ[1],[isY?1:0,isY?0:1,0][2] * axisZ[0] - [isY?1:0,isY?0:1,0][0] * axisZ[2],[isY?1:0,isY?0:1,0][0] * axisZ[1] - [isY?1:0,isY?0:1,0][1] * axisZ[0]][2] * prod[2];
			return $r;
		}($this)));
		$r = [[[isY?1:0,isY?0:1,0][1] * axisZ[2] - [isY?1:0,isY?0:1,0][2] * axisZ[1],[isY?1:0,isY?0:1,0][2] * axisZ[0] - [isY?1:0,isY?0:1,0][0] * axisZ[2],[isY?1:0,isY?0:1,0][0] * axisZ[1] - [isY?1:0,isY?0:1,0][1] * axisZ[0]][0] / divisor,[[isY?1:0,isY?0:1,0][1] * axisZ[2] - [isY?1:0,isY?0:1,0][2] * axisZ[1],[isY?1:0,isY?0:1,0][2] * axisZ[0] - [isY?1:0,isY?0:1,0][0] * axisZ[2],[isY?1:0,isY?0:1,0][0] * axisZ[1] - [isY?1:0,isY?0:1,0][1] * axisZ[0]][1] / divisor,[[isY?1:0,isY?0:1,0][1] * axisZ[2] - [isY?1:0,isY?0:1,0][2] * axisZ[1],[isY?1:0,isY?0:1,0][2] * axisZ[0] - [isY?1:0,isY?0:1,0][0] * axisZ[2],[isY?1:0,isY?0:1,0][0] * axisZ[1] - [isY?1:0,isY?0:1,0][1] * axisZ[0]][2] / divisor];
		return $r;
	}(this));
	var axisY = (function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == [axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]][0]?0:[axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]][0],null == [axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]][1]?0:[axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]][1],null == [axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]][2]?0:[axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]][2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = [axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]][0] * prod[0] + [axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]][1] * prod[1] + [axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]][2] * prod[2];
			return $r;
		}($this)));
		$r = [[axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]][0] / divisor,[axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]][1] / divisor,[axisX[1] * axisZ[2] - axisX[2] * axisZ[1],axisX[2] * axisZ[0] - axisX[0] * axisZ[2],axisX[0] * axisZ[1] - axisX[1] * axisZ[0]][2] / divisor];
		return $r;
	}(this));
	var s = new chad.geom.Vertex3(start,[-axisZ[0],-axisZ[1],-axisZ[2]]);
	var e = new chad.geom.Vertex3(end,(function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == axisZ[0]?0:axisZ[0],null == axisZ[1]?0:axisZ[1],null == axisZ[2]?0:axisZ[2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = axisZ[0] * prod[0] + axisZ[1] * prod[1] + axisZ[2] * prod[2];
			return $r;
		}($this)));
		$r = [axisZ[0] / divisor,axisZ[1] / divisor,axisZ[2] / divisor];
		return $r;
	}(this)));
	var polygons = [];
	var point = function(stack,slice,normalBlend) {
		var angle = slice * Math.PI * 2;
		var out = (function($this) {
			var $r;
			var other = (function($this) {
				var $r;
				var multiplier = Math.sin(angle);
				$r = [axisY[0] * multiplier,axisY[1] * multiplier,axisY[2] * multiplier];
				return $r;
			}($this));
			$r = [((function($this) {
				var $r;
				var multiplier = Math.cos(angle);
				$r = [axisX[0] * multiplier,axisX[1] * multiplier,axisX[2] * multiplier];
				return $r;
			}($this)))[0] + other[0],((function($this) {
				var $r;
				var multiplier = Math.cos(angle);
				$r = [axisX[0] * multiplier,axisX[1] * multiplier,axisX[2] * multiplier];
				return $r;
			}($this)))[1] + other[1],((function($this) {
				var $r;
				var multiplier = Math.cos(angle);
				$r = [axisX[0] * multiplier,axisX[1] * multiplier,axisX[2] * multiplier];
				return $r;
			}($this)))[2] + other[2]];
			return $r;
		}(this));
		var pos = (function($this) {
			var $r;
			var other = [out[0] * radius,out[1] * radius,out[2] * radius];
			$r = [((function($this) {
				var $r;
				var other1 = [ray[0] * stack,ray[1] * stack,ray[2] * stack];
				$r = [start[0] + other1[0],start[1] + other1[1],start[2] + other1[2]];
				return $r;
			}($this)))[0] + other[0],((function($this) {
				var $r;
				var other1 = [ray[0] * stack,ray[1] * stack,ray[2] * stack];
				$r = [start[0] + other1[0],start[1] + other1[1],start[2] + other1[2]];
				return $r;
			}($this)))[1] + other[1],((function($this) {
				var $r;
				var other1 = [ray[0] * stack,ray[1] * stack,ray[2] * stack];
				$r = [start[0] + other1[0],start[1] + other1[1],start[2] + other1[2]];
				return $r;
			}($this)))[2] + other[2]];
			return $r;
		}(this));
		var normal = (function($this) {
			var $r;
			var other = [axisZ[0] * normalBlend,axisZ[1] * normalBlend,axisZ[2] * normalBlend];
			$r = [((function($this) {
				var $r;
				var multiplier = 1 - Math.abs(normalBlend);
				$r = [out[0] * multiplier,out[1] * multiplier,out[2] * multiplier];
				return $r;
			}($this)))[0] + other[0],((function($this) {
				var $r;
				var multiplier = 1 - Math.abs(normalBlend);
				$r = [out[0] * multiplier,out[1] * multiplier,out[2] * multiplier];
				return $r;
			}($this)))[1] + other[1],((function($this) {
				var $r;
				var multiplier = 1 - Math.abs(normalBlend);
				$r = [out[0] * multiplier,out[1] * multiplier,out[2] * multiplier];
				return $r;
			}($this)))[2] + other[2]];
			return $r;
		}(this));
		return new chad.geom.Vertex3(pos,normal);
	};
	var _g = 0;
	while(_g < slices) {
		var i = _g++;
		var t0 = i / slices, t1 = (i + 1) / slices;
		polygons.push(new chad.geom.Polygon([s,point(0,t0,-1),point(0,t1,-1)]));
		polygons.push(new chad.geom.Polygon([point(0,t1,0),point(0,t0,0),point(1,t0,0),point(1,t1,0)]));
		polygons.push(new chad.geom.Polygon([e,point(1,t1,1),point(1,t0,1)]));
	}
	return chad.csg.Solid.fromPolygons(polygons);
}
chad.csg.Node = function(polygons) {
	this.plane = null;
	this.front = null;
	this.back = null;
	this.polygons = [];
	if(null != polygons) this.build(polygons);
};
chad.csg.Node.__name__ = true;
chad.csg.Node.prototype = {
	toString: function() {
		return "Node [length: " + this.all().length + ", front: " + Std.string(null == this.front) + ", back: " + Std.string(null == this.back) + "]";
	}
	,all: function() {
		return this.polygons.concat(null == this.front?[]:this.front.all()).concat(null == this.back?[]:this.back.all());
	}
	,iterator: function() {
		return HxOverrides.iter(this.polygons);
	}
	,clipTo: function(other) {
		this.polygons = other.clipPolygons(this.polygons);
		if(null != this.front) this.front.clipTo(other);
		if(null != this.back) this.back.clipTo(other);
	}
	,clipPolygons: function(polygons) {
		if(null == this.plane) return polygons.slice();
		var front = [], back = [];
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
	,invert: function() {
		var _g1 = 0, _g = this.polygons.length;
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
	,build: function(polygons) {
		if(polygons.length == 0) return;
		if(null == this.plane) this.plane = polygons[0].get_plane();
		var front = [], back = [];
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
	,__class__: chad.csg.Node
}
chad.csg.Solid = function() {
};
chad.csg.Solid.__name__ = true;
chad.csg.Solid.fromPolygons = function(polygons) {
	var solid = new chad.csg.Solid();
	solid.polygons = polygons;
	return solid;
}
chad.csg.Solid.prototype = {
	toString: function() {
		return "Solid [" + this.polygons.length + "]";
	}
	,iterator: function() {
		return HxOverrides.iter(this.polygons);
	}
	,intersect: function(other) {
		var a = new chad.csg.Node(this.polygons.slice()), b = new chad.csg.Node(other.polygons.slice());
		a.invert();
		b.clipTo(a);
		b.invert();
		a.clipTo(b);
		b.clipTo(a);
		a.build(b.all());
		a.invert();
		return chad.csg.Solid.fromPolygons(a.all());
	}
	,subtract: function(other) {
		var a = new chad.csg.Node(this.polygons.slice()), b = new chad.csg.Node(other.polygons.slice());
		a.invert();
		a.clipTo(b);
		b.clipTo(a);
		b.invert();
		b.clipTo(a);
		b.invert();
		a.build(b.all());
		a.invert();
		return chad.csg.Solid.fromPolygons(a.all());
	}
	,union: function(other) {
		var a = new chad.csg.Node(this.polygons.slice()), b = new chad.csg.Node(other.polygons.slice());
		a.clipTo(b);
		b.clipTo(a);
		b.invert();
		b.clipTo(a);
		b.invert();
		a.build(b.all());
		return chad.csg.Solid.fromPolygons(a.all());
	}
	,__class__: chad.csg.Solid
}
chad.csg.Sphere = function() { }
chad.csg.Sphere.__name__ = true;
chad.csg.Sphere.create = function(position,radius) {
	if(radius == null) radius = 1.0;
	var slices = Math.ceil(128 * radius), stacks = Math.ceil(slices / 2);
	var polygons = [], vertices = [];
	var vertex = function(theta,phi) {
		theta *= Math.PI * 2;
		phi *= Math.PI;
		var dir = [Math.cos(theta) * Math.sin(phi),Math.cos(phi),Math.sin(theta) * Math.sin(phi)];
		vertices.push(new chad.geom.Vertex3((function($this) {
			var $r;
			var other = [dir[0] * radius,dir[1] * radius,dir[2] * radius];
			$r = [position[0] + other[0],position[1] + other[1],position[2] + other[2]];
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
			polygons.push(new chad.geom.Polygon(vertices));
		}
	}
	return chad.csg.Solid.fromPolygons(polygons);
}
chad["export"] = {}
chad.export.ThreeJS = function() { }
chad.export.ThreeJS.__name__ = true;
chad.export.ThreeJS.getVertices = function(vertices) {
	var acc = [];
	var $it0 = ((function(_e) {
		return function() {
			return _e.iterator();
		};
	})(vertices))();
	while( $it0.hasNext() ) {
		var combo = $it0.next();
		acc = acc.concat(combo.vertex.slice());
	}
	return acc;
}
chad.export.ThreeJS.toModel = function(solid) {
	var faces = [], vertices = new haxe.ds.StringMap(), index = 0;
	var $it0 = solid.iterator();
	while( $it0.hasNext() ) {
		var polygon = $it0.next();
		var $it1 = polygon.iterator();
		while( $it1.hasNext() ) {
			var vertex = $it1.next();
			var key = "Vector3 " + Std.string(vertex.position);
			if(!vertices.exists(key)) vertices.set(key,{ index : index++, vertex : vertex.position});
		}
	}
	var $it2 = solid.iterator();
	while( $it2.hasNext() ) {
		var polygon = $it2.next();
		index = 0;
		var arr = polygon.all();
		var _g1 = 2, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			faces = faces.concat([0,vertices.get("Vector3 " + Std.string(arr[0].position)).index,vertices.get("Vector3 " + Std.string(arr[i - 1].position)).index,vertices.get("Vector3 " + Std.string(arr[i].position)).index]);
		}
	}
	return { metadata : { formatVersion : 3}, vertices : chad.export.ThreeJS.getVertices(vertices), faces : faces};
}
chad.geom = {}
chad.geom.Plane = function(normal,w) {
	this.normal = normal;
	this.w = w;
};
chad.geom.Plane.__name__ = true;
chad.geom.Plane.fromPoints = function(a,b,c) {
	var n = (function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == ((function($this) {
					var $r;
					var other = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
					$r = [[b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[2] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[1],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[0] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[2],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[1] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[0]];
					return $r;
				}($this)))[0]?0:((function($this) {
					var $r;
					var other = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
					$r = [[b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[2] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[1],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[0] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[2],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[1] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[0]];
					return $r;
				}($this)))[0],null == ((function($this) {
					var $r;
					var other = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
					$r = [[b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[2] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[1],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[0] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[2],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[1] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[0]];
					return $r;
				}($this)))[1]?0:((function($this) {
					var $r;
					var other = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
					$r = [[b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[2] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[1],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[0] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[2],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[1] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[0]];
					return $r;
				}($this)))[1],null == ((function($this) {
					var $r;
					var other = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
					$r = [[b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[2] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[1],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[0] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[2],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[1] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[0]];
					return $r;
				}($this)))[2]?0:((function($this) {
					var $r;
					var other = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
					$r = [[b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[2] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[1],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[0] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[2],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[1] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[0]];
					return $r;
				}($this)))[2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = ((function($this) {
				var $r;
				var other = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
				$r = [[b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[2] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[1],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[0] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[2],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[1] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[0]];
				return $r;
			}($this)))[0] * prod[0] + ((function($this) {
				var $r;
				var other = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
				$r = [[b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[2] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[1],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[0] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[2],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[1] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[0]];
				return $r;
			}($this)))[1] * prod[1] + ((function($this) {
				var $r;
				var other = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
				$r = [[b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[2] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[1],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[0] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[2],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[1] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[0]];
				return $r;
			}($this)))[2] * prod[2];
			return $r;
		}($this)));
		$r = [((function($this) {
			var $r;
			var other = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
			$r = [[b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[2] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[1],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[0] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[2],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[1] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[0]];
			return $r;
		}($this)))[0] / divisor,((function($this) {
			var $r;
			var other = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
			$r = [[b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[2] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[1],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[0] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[2],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[1] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[0]];
			return $r;
		}($this)))[1] / divisor,((function($this) {
			var $r;
			var other = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
			$r = [[b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[2] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[1],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][2] * other[0] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[2],[b[0] - a[0],b[1] - a[1],b[2] - a[2]][0] * other[1] - [b[0] - a[0],b[1] - a[1],b[2] - a[2]][1] * other[0]];
			return $r;
		}($this)))[2] / divisor];
		return $r;
	}(this));
	return new chad.geom.Plane(n,n[0] * a[0] + n[1] * a[1] + n[2] * a[2]);
}
chad.geom.Plane.prototype = {
	splitPolygon: function(polygon,coplanarFront,coplanarBack,front,back) {
		var polygonType = 0, types = [], t, type;
		var $it0 = polygon.iterator();
		while( $it0.hasNext() ) {
			var vertex = $it0.next();
			t = (function($this) {
				var $r;
				var prod = vertex.position;
				$r = $this.normal[0] * prod[0] + $this.normal[1] * prod[1] + $this.normal[2] * prod[2];
				return $r;
			}(this)) - this.w;
			type = t < -1e-05?2:t > 1e-5?1:0;
			polygonType |= type;
			types.push(type);
		}
		switch(polygonType) {
		case 0:
			((function($this) {
				var $r;
				var prod = polygon.get_plane().normal;
				$r = $this.normal[0] * prod[0] + $this.normal[1] * prod[1] + $this.normal[2] * prod[2];
				return $r;
			}(this)) > 0?coplanarFront:coplanarBack).push(polygon);
			break;
		case 1:
			front.push(polygon);
			break;
		case 2:
			back.push(polygon);
			break;
		case 3:
			var f = [], b = [], len = polygon.vertices.length, j, ti, vi, tj, vj, t1, v;
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
					t1 = (this.w - (function($this) {
						var $r;
						var prod = vi.position;
						$r = $this.normal[0] * prod[0] + $this.normal[1] * prod[1] + $this.normal[2] * prod[2];
						return $r;
					}(this))) / (function($this) {
						var $r;
						var prod = (function($this) {
							var $r;
							var other = vi.position;
							$r = [vj.position[0] - other[0],vj.position[1] - other[1],vj.position[2] - other[2]];
							return $r;
						}($this));
						$r = $this.normal[0] * prod[0] + $this.normal[1] * prod[1] + $this.normal[2] * prod[2];
						return $r;
					}(this));
					v = vi.interpolate(vj,t1);
					f.push(v);
					b.push(v);
				}
			}
			if(f.length >= 3) front.push(new chad.geom.Polygon(f));
			if(b.length >= 3) back.push(new chad.geom.Polygon(b));
			break;
		}
	}
	,flip: function() {
		return new chad.geom.Plane([-this.normal[0],-this.normal[1],-this.normal[2]],-this.w);
	}
	,__class__: chad.geom.Plane
}
chad.geom.Polygon = function(vertices) {
	this.vertices = vertices;
};
chad.geom.Polygon.__name__ = true;
chad.geom.Polygon.fromVertices = function(vertices) {
	if(js.Boot.__instanceof(vertices,Array)) return new chad.geom.Polygon(vertices.copy()); else {
		var nvertices = [];
		var $it0 = $iterator(vertices)();
		while( $it0.hasNext() ) {
			var v = $it0.next();
			nvertices.push(v);
		}
		return new chad.geom.Polygon(nvertices);
	}
}
chad.geom.Polygon.prototype = {
	get_plane: function() {
		return null == this.plane?this.plane = chad.geom.Plane.fromPoints(this.vertices[0].position,this.vertices[1].position,this.vertices[2].position):this.plane;
	}
	,all: function() {
		return this.vertices.slice();
	}
	,iterator: function() {
		return HxOverrides.iter(this.vertices);
	}
	,flip: function() {
		var reverse = this.vertices.slice();
		reverse.reverse();
		return new chad.geom.Polygon(reverse.map(function(v) {
			return new chad.geom.Vertex3(v.position,[-v.normal[0],-v.normal[1],-v.normal[2]]);
		}));
	}
	,__class__: chad.geom.Polygon
}
chad.geom._Vector3 = {}
chad.geom._Vector3.Vector3_Impl_ = function() { }
chad.geom._Vector3.Vector3_Impl_.__name__ = true;
chad.geom._Vector3.Vector3_Impl_._new = function(x,y,z) {
	return [x,y,z];
}
chad.geom._Vector3.Vector3_Impl_.fromFloat = function(v) {
	return [v,v,v];
}
chad.geom._Vector3.Vector3_Impl_.fromArray = function(arr) {
	return [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
}
chad.geom._Vector3.Vector3_Impl_.fromTypedef = function(o) {
	return [o.x,o.y,o.z];
}
chad.geom._Vector3.Vector3_Impl_.toArray = function(this1) {
	return this1.slice();
}
chad.geom._Vector3.Vector3_Impl_.get_x = function(this1) {
	return this1[0];
}
chad.geom._Vector3.Vector3_Impl_.get_y = function(this1) {
	return this1[1];
}
chad.geom._Vector3.Vector3_Impl_.get_z = function(this1) {
	return this1[2];
}
chad.geom._Vector3.Vector3_Impl_.get_length = function(this1) {
	return Math.sqrt((function($this) {
		var $r;
		var prod = (function($this) {
			var $r;
			var arr = [null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]];
			$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
			return $r;
		}($this));
		$r = this1[0] * prod[0] + this1[1] * prod[1] + this1[2] * prod[2];
		return $r;
	}(this)));
}
chad.geom._Vector3.Vector3_Impl_.negate = function(this1) {
	return [-this1[0],-this1[1],-this1[2]];
}
chad.geom._Vector3.Vector3_Impl_.add = function(this1,other) {
	return [this1[0] + other[0],this1[1] + other[1],this1[2] + other[2]];
}
chad.geom._Vector3.Vector3_Impl_.subtract = function(this1,other) {
	return [this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]];
}
chad.geom._Vector3.Vector3_Impl_.multiply = function(this1,multiplier) {
	return [this1[0] * multiplier,this1[1] * multiplier,this1[2] * multiplier];
}
chad.geom._Vector3.Vector3_Impl_.divide = function(this1,divisor) {
	return [this1[0] / divisor,this1[1] / divisor,this1[2] / divisor];
}
chad.geom._Vector3.Vector3_Impl_.dot = function(this1,prod) {
	return this1[0] * prod[0] + this1[1] * prod[1] + this1[2] * prod[2];
}
chad.geom._Vector3.Vector3_Impl_.lerp = function(this1,other,multiplier) {
	return (function($this) {
		var $r;
		var other1 = [((function($this) {
			var $r;
			var other2 = (function($this) {
				var $r;
				var arr = [null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = [other[0] - other2[0],other[1] - other2[1],other[2] - other2[2]];
			return $r;
		}($this)))[0] * multiplier,((function($this) {
			var $r;
			var other2 = (function($this) {
				var $r;
				var arr = [null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = [other[0] - other2[0],other[1] - other2[1],other[2] - other2[2]];
			return $r;
		}($this)))[1] * multiplier,((function($this) {
			var $r;
			var other2 = (function($this) {
				var $r;
				var arr = [null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = [other[0] - other2[0],other[1] - other2[1],other[2] - other2[2]];
			return $r;
		}($this)))[2] * multiplier];
		$r = [this1[0] + other1[0],this1[1] + other1[1],this1[2] + other1[2]];
		return $r;
	}(this));
}
chad.geom._Vector3.Vector3_Impl_.normalize = function(this1) {
	return (function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = this1[0] * prod[0] + this1[1] * prod[1] + this1[2] * prod[2];
			return $r;
		}($this)));
		$r = [this1[0] / divisor,this1[1] / divisor,this1[2] / divisor];
		return $r;
	}(this));
}
chad.geom._Vector3.Vector3_Impl_.cross = function(this1,other) {
	return [this1[1] * other[2] - this1[2] * other[1],this1[2] * other[0] - this1[0] * other[2],this1[0] * other[1] - this1[1] * other[0]];
}
chad.geom._Vector3.Vector3_Impl_.toString = function(this1) {
	return "Vector3 " + Std.string(this1);
}
chad.geom.Vertex3 = function(position,normal) {
	this.position = position;
	this.normal = normal;
};
chad.geom.Vertex3.__name__ = true;
chad.geom.Vertex3.prototype = {
	toString: function() {
		return "Vertex3 $position, $normal";
	}
	,interpolate: function(other,t) {
		return new chad.geom.Vertex3((function($this) {
			var $r;
			var other1 = other.position;
			var other2 = [((function($this) {
				var $r;
				var other3 = (function($this) {
					var $r;
					var arr = [null == $this.position[0]?0:$this.position[0],null == $this.position[1]?0:$this.position[1],null == $this.position[2]?0:$this.position[2]];
					$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
					return $r;
				}($this));
				$r = [other1[0] - other3[0],other1[1] - other3[1],other1[2] - other3[2]];
				return $r;
			}($this)))[0] * t,((function($this) {
				var $r;
				var other3 = (function($this) {
					var $r;
					var arr = [null == $this.position[0]?0:$this.position[0],null == $this.position[1]?0:$this.position[1],null == $this.position[2]?0:$this.position[2]];
					$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
					return $r;
				}($this));
				$r = [other1[0] - other3[0],other1[1] - other3[1],other1[2] - other3[2]];
				return $r;
			}($this)))[1] * t,((function($this) {
				var $r;
				var other3 = (function($this) {
					var $r;
					var arr = [null == $this.position[0]?0:$this.position[0],null == $this.position[1]?0:$this.position[1],null == $this.position[2]?0:$this.position[2]];
					$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
					return $r;
				}($this));
				$r = [other1[0] - other3[0],other1[1] - other3[1],other1[2] - other3[2]];
				return $r;
			}($this)))[2] * t];
			$r = [$this.position[0] + other2[0],$this.position[1] + other2[1],$this.position[2] + other2[2]];
			return $r;
		}(this)),(function($this) {
			var $r;
			var other1 = other.normal;
			var other2 = [((function($this) {
				var $r;
				var other3 = (function($this) {
					var $r;
					var arr = [null == $this.normal[0]?0:$this.normal[0],null == $this.normal[1]?0:$this.normal[1],null == $this.normal[2]?0:$this.normal[2]];
					$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
					return $r;
				}($this));
				$r = [other1[0] - other3[0],other1[1] - other3[1],other1[2] - other3[2]];
				return $r;
			}($this)))[0] * t,((function($this) {
				var $r;
				var other3 = (function($this) {
					var $r;
					var arr = [null == $this.normal[0]?0:$this.normal[0],null == $this.normal[1]?0:$this.normal[1],null == $this.normal[2]?0:$this.normal[2]];
					$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
					return $r;
				}($this));
				$r = [other1[0] - other3[0],other1[1] - other3[1],other1[2] - other3[2]];
				return $r;
			}($this)))[1] * t,((function($this) {
				var $r;
				var other3 = (function($this) {
					var $r;
					var arr = [null == $this.normal[0]?0:$this.normal[0],null == $this.normal[1]?0:$this.normal[1],null == $this.normal[2]?0:$this.normal[2]];
					$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
					return $r;
				}($this));
				$r = [other1[0] - other3[0],other1[1] - other3[1],other1[2] - other3[2]];
				return $r;
			}($this)))[2] * t];
			$r = [$this.normal[0] + other2[0],$this.normal[1] + other2[1],$this.normal[2] + other2[2]];
			return $r;
		}(this)));
	}
	,flip: function() {
		return new chad.geom.Vertex3(this.position,[-this.normal[0],-this.normal[1],-this.normal[2]]);
	}
	,__class__: chad.geom.Vertex3
}
var haxe = {}
haxe.ds = {}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
var js = {}
js.Boot = function() { }
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
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
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
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
chad.csg.Box.baseCube = [{ p : [0,4,6,2], n : [-1.0,0.0,0.0]},{ p : [1,3,7,5], n : [1.0,0.0,0.0]},{ p : [0,1,5,4], n : [0.0,-1.0,0.0]},{ p : [2,6,7,3], n : [0.0,1.0,0.0]},{ p : [0,2,3,1], n : [0.0,0.0,-1.0]},{ p : [4,5,7,6], n : [0.0,0.0,1.0]}];
chad.csg.Solid.baseCube = [{ p : [0,4,6,2], n : [-1.0,0.0,0.0]},{ p : [1,3,7,5], n : [1.0,0.0,0.0]},{ p : [0,1,5,4], n : [0.0,-1.0,0.0]},{ p : [2,6,7,3], n : [0.0,1.0,0.0]},{ p : [0,2,3,1], n : [0.0,0.0,-1.0]},{ p : [4,5,7,6], n : [0.0,0.0,1.0]}];
chad.geom.Plane.EPSILON = 1e-5;
chad.geom.Plane.COPLANAR = 0;
chad.geom.Plane.FRONT = 1;
chad.geom.Plane.BACK = 2;
chad.geom.Plane.SPANNING = 3;
Main.main();
})();
