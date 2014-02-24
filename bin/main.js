(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
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
	var project = new chad.Project();
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
chad.Node = function(boundingBox) {
	this.boundingBox = boundingBox;
};
chad.Node.__name__ = true;
chad.Node.prototype = {
	__class__: chad.Node
}
chad.Project = function() {
	chad.Node.call(this,new chad.geom.Box([0.0,0.0,0.0],[0.0,0.0,0.0]));
	this.nodes = [];
};
chad.Project.__name__ = true;
chad.Project.__super__ = chad.Node;
chad.Project.prototype = $extend(chad.Node.prototype,{
	add: function(node) {
	}
	,__class__: chad.Project
});
chad.csg = {}
chad.csg.Box = function() { }
chad.csg.Box.__name__ = true;
chad.csg.Box.create = function(position,size) {
	return chad.csg.Solid.fromPolygons(chad.csg.Box.baseCube.map(function(info) {
		return new chad.geom.Polygon(info.p.map(function(i) {
			var pos = [position[0] + size[0] * ((i & 1) != 0?1:0),position[1] + size[1] * ((i & 2) != 0?1:0),position[2] + size[2] * ((i & 4) != 0?1:0)];
			return new chad.geom.Vertex3D(pos,(function($this) {
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
	var s = new chad.geom.Vertex3D(start,[-axisZ[0],-axisZ[1],-axisZ[2]]);
	var e = new chad.geom.Vertex3D(end,(function($this) {
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
		return new chad.geom.Vertex3D(pos,normal);
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
		vertices.push(new chad.geom.Vertex3D((function($this) {
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
			var key = "Vector3D " + Std.string(vertex.position);
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
			faces = faces.concat([0,vertices.get("Vector3D " + Std.string(arr[0].position)).index,vertices.get("Vector3D " + Std.string(arr[i - 1].position)).index,vertices.get("Vector3D " + Std.string(arr[i].position)).index]);
		}
	}
	return { metadata : { formatVersion : 3}, vertices : chad.export.ThreeJS.getVertices(vertices), faces : faces};
}
chad.geom = {}
chad.geom.Box = function(min,max) {
	this.min = min;
	this.max = max;
};
chad.geom.Box.__name__ = true;
chad.geom.Box.create = function(a,b) {
	return new chad.geom.Box([Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.min(a[2],b[2])],[Math.max(a[0],b[0]),Math.max(a[1],b[1]),Math.max(a[2],b[2])]);
}
chad.geom.Box.prototype = {
	transform: function(matrix) {
		return (function($this) {
			var $r;
			throw "not implemented";
			return $r;
		}(this));
	}
	,intersect: function(other) {
		return (function($this) {
			var $r;
			throw "not implemented";
			return $r;
		}(this));
	}
	,subtract: function(other) {
		return (function($this) {
			var $r;
			throw "not implemented";
			return $r;
		}(this));
	}
	,union: function(other) {
		return new chad.geom.Box((function($this) {
			var $r;
			var other1 = $this.min;
			$r = [Math.min(other.min[0],other1[0]),Math.min(other.min[1],other1[1]),Math.min(other.min[2],other1[2])];
			return $r;
		}(this)),(function($this) {
			var $r;
			var other1 = $this.max;
			$r = [Math.max(other.max[0],other1[0]),Math.max(other.max[1],other1[1]),Math.max(other.max[2],other1[2])];
			return $r;
		}(this)));
	}
	,__class__: chad.geom.Box
}
chad.geom.Line2D = function(normal,w) {
	var l = Math.sqrt((function($this) {
		var $r;
		var prod = (function($this) {
			var $r;
			var arr = [null == normal[0]?0:normal[0],null == normal[1]?0:normal[1]];
			$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1]];
			return $r;
		}($this));
		$r = normal[0] * prod[0] + normal[1] * prod[1];
		return $r;
	}(this)));
	this.w = w * l;
	this.normal = [normal[0] / l,normal[1] / l];
};
chad.geom.Line2D.__name__ = true;
chad.geom.Line2D.fromPoints = function(p1,p2) {
	var direction = [p2[0] - p1[0],p2[1] - p1[1]], normal = (function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == [-[direction[1],-direction[0]][0],-[direction[1],-direction[0]][1]][0]?0:[-[direction[1],-direction[0]][0],-[direction[1],-direction[0]][1]][0],null == [-[direction[1],-direction[0]][0],-[direction[1],-direction[0]][1]][1]?0:[-[direction[1],-direction[0]][0],-[direction[1],-direction[0]][1]][1]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1]];
				return $r;
			}($this));
			$r = [-[direction[1],-direction[0]][0],-[direction[1],-direction[0]][1]][0] * prod[0] + [-[direction[1],-direction[0]][0],-[direction[1],-direction[0]][1]][1] * prod[1];
			return $r;
		}($this)));
		$r = [[-[direction[1],-direction[0]][0],-[direction[1],-direction[0]][1]][0] / divisor,[-[direction[1],-direction[0]][0],-[direction[1],-direction[0]][1]][1] / divisor];
		return $r;
	}(this)), w = p1[0] * normal[0] + p1[1] * normal[1];
	return new chad.geom.Line2D(normal,w);
}
chad.geom.Line2D.prototype = {
	transform: function(matrix) {
		var origin = [0,0], pointOnPlane = (function($this) {
			var $r;
			var multiplier = $this.w;
			$r = [$this.normal[0] * multiplier,$this.normal[1] * multiplier];
			return $r;
		}(this)), neworigin = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector2D(matrix,origin), neworiginPlusNormal = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector2D(matrix,this.normal), newnormal = [neworiginPlusNormal[0] - neworigin[0],neworiginPlusNormal[1] - neworigin[1]], newpointOnPlane = chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector2D(matrix,pointOnPlane), neww = newnormal[0] * newpointOnPlane[0] + newnormal[1] * newpointOnPlane[1];
		return new chad.geom.Line2D(newnormal,neww);
	}
	,intersectWithLine: function(line2d) {
		return chad.geom.Util.solve2Linear(this.normal[0],this.normal[1],line2d.normal[0],line2d.normal[1],this.w,line2d.w);
	}
	,absDistanceToPoint: function(point) {
		return Math.abs((function($this) {
			var $r;
			var prod = $this.normal;
			$r = point[0] * prod[0] + point[1] * prod[1];
			return $r;
		}(this)) - this.w);
	}
	,xAtY: function(y) {
		return (this.w - this.normal[1] * y) / this.normal[0];
	}
	,direction: function() {
		return [this.normal[1],-this.normal[0]];
	}
	,origin: function() {
		return (function($this) {
			var $r;
			var multiplier = $this.w;
			$r = [$this.normal[0] * multiplier,$this.normal[1] * multiplier];
			return $r;
		}(this));
	}
	,equals: function(other) {
		return (function($this) {
			var $r;
			var other1 = other.normal;
			$r = $this.normal[0] == other1[0] && $this.normal[1] == other1[1];
			return $r;
		}(this)) && this.w == other.w;
	}
	,reverse: function() {
		return new chad.geom.Line2D([-this.normal[0],-this.normal[1]],-this.w);
	}
	,__class__: chad.geom.Line2D
}
chad.geom.Line3D = function(point,direction) {
	this.point = point;
	this.direction = (function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == direction[0]?0:direction[0],null == direction[1]?0:direction[1],null == direction[2]?0:direction[2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = direction[0] * prod[0] + direction[1] * prod[1] + direction[2] * prod[2];
			return $r;
		}($this)));
		$r = [direction[0] / divisor,direction[1] / divisor,direction[2] / divisor];
		return $r;
	}(this));
};
chad.geom.Line3D.__name__ = true;
chad.geom.Line3D.fromPoints = function(p1,p2) {
	return new chad.geom.Line3D(p1,(function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == [p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]][0]?0:[p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]][0],null == [p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]][1]?0:[p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]][1],null == [p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]][2]?0:[p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]][2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = [p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]][0] * prod[0] + [p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]][1] * prod[1] + [p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]][2] * prod[2];
			return $r;
		}($this)));
		$r = [[p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]][0] / divisor,[p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]][1] / divisor,[p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]][2] / divisor];
		return $r;
	}(this)));
}
chad.geom.Line3D.fromPlanes = function(p1,p2) {
	var direction = (function($this) {
		var $r;
		var other = p2.normal;
		$r = [p1.normal[1] * other[2] - p1.normal[2] * other[1],p1.normal[2] * other[0] - p1.normal[0] * other[2],p1.normal[0] * other[1] - p1.normal[1] * other[0]];
		return $r;
	}(this)), l = Math.sqrt((function($this) {
		var $r;
		var prod = (function($this) {
			var $r;
			var arr = [null == direction[0]?0:direction[0],null == direction[1]?0:direction[1],null == direction[2]?0:direction[2]];
			$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
			return $r;
		}($this));
		$r = direction[0] * prod[0] + direction[1] * prod[1] + direction[2] * prod[2];
		return $r;
	}(this)));
	if(l < 1e-10) throw "Parallel planes";
	direction = (function($this) {
		var $r;
		var multiplier = 1.0 / l;
		$r = [direction[0] * multiplier,direction[1] * multiplier,direction[2] * multiplier];
		return $r;
	}(this));
	var mabsx = Math.abs(direction[0]), mabsy = Math.abs(direction[1]), mabsz = Math.abs(direction[2]), origin;
	if(mabsx >= mabsy && mabsx >= mabsz) {
		var r = chad.geom.Util.solve2Linear(p1.normal[1],p1.normal[2],p2.normal[1],p2.normal[2],p1.w,p2.w);
		origin = [0,r[0],r[1]];
	} else if(mabsy >= mabsx && mabsy >= mabsz) {
		var r = chad.geom.Util.solve2Linear(p1.normal[0],p1.normal[2],p2.normal[0],p2.normal[2],p1.w,p2.w);
		origin = [r[0],0,r[1]];
	} else {
		var r = chad.geom.Util.solve2Linear(p1.normal[0],p1.normal[1],p2.normal[0],p2.normal[1],p1.w,p2.w);
		origin = [r[0],r[1],0];
	}
	return new chad.geom.Line3D(origin,direction);
}
chad.geom.Line3D.prototype = {
	equals: function(line) {
		if(!(function($this) {
			var $r;
			var other = line.direction;
			$r = $this.direction[0] == other[0] && $this.direction[1] == other[1] && $this.direction[2] == other[2];
			return $r;
		}(this))) return false;
		return this.distanceToPoint(line.point) <= 1e-8;
	}
	,distanceToPoint: function(point) {
		var closestpoint = this.closestPointOnLine(point), distancevector = [point[0] - closestpoint[0],point[1] - closestpoint[1],point[2] - closestpoint[2]];
		return Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == distancevector[0]?0:distancevector[0],null == distancevector[1]?0:distancevector[1],null == distancevector[2]?0:distancevector[2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = distancevector[0] * prod[0] + distancevector[1] * prod[1] + distancevector[2] * prod[2];
			return $r;
		}(this)));
	}
	,closestPointOnLine: function(point) {
		var t = (function($this) {
			var $r;
			var prod = $this.direction;
			$r = [point[0] - point[0],point[1] - point[1],point[2] - point[2]][0] * prod[0] + [point[0] - point[0],point[1] - point[1],point[2] - point[2]][1] * prod[1] + [point[0] - point[0],point[1] - point[1],point[2] - point[2]][2] * prod[2];
			return $r;
		}(this)) / (function($this) {
			var $r;
			var prod = $this.direction;
			$r = $this.direction[0] * prod[0] + $this.direction[1] * prod[1] + $this.direction[2] * prod[2];
			return $r;
		}(this));
		return (function($this) {
			var $r;
			var other = [$this.direction[0] * t,$this.direction[1] * t,$this.direction[2] * t];
			$r = [point[0] + other[0],point[1] + other[1],point[2] + other[2]];
			return $r;
		}(this));
	}
	,transform: function(matrix4x4) {
		var newpoint = chad.geom._Vector3D.Vector3D_Impl_.multiply4x4(this.point,matrix4x4), pointaddDirection = (function($this) {
			var $r;
			var other = $this.direction;
			$r = [$this.point[0] + other[0],$this.point[1] + other[1],$this.point[2] + other[2]];
			return $r;
		}(this)), newPointaddDirection = chad.geom._Vector3D.Vector3D_Impl_.multiply4x4(pointaddDirection,matrix4x4), newdirection = [newPointaddDirection[0] - newpoint[0],newPointaddDirection[1] - newpoint[1],newPointaddDirection[2] - newpoint[2]];
		return new chad.geom.Line3D(newpoint,newdirection);
	}
	,reverse: function() {
		return new chad.geom.Line3D(this.point,[-this.direction[0],-this.direction[1],-this.direction[2]]);
	}
	,intersectWithPlane: function(plane) {
		var lambda = (plane.w - (function($this) {
			var $r;
			var prod = $this.point;
			$r = plane.normal[0] * prod[0] + plane.normal[1] * prod[1] + plane.normal[2] * prod[2];
			return $r;
		}(this))) / (function($this) {
			var $r;
			var prod = $this.direction;
			$r = plane.normal[0] * prod[0] + plane.normal[1] * prod[1] + plane.normal[2] * prod[2];
			return $r;
		}(this));
		return (function($this) {
			var $r;
			var other = [$this.direction[0] * lambda,$this.direction[1] * lambda,$this.direction[2] * lambda];
			$r = [$this.point[0] + other[0],$this.point[1] + other[1],$this.point[2] + other[2]];
			return $r;
		}(this));
	}
	,__class__: chad.geom.Line3D
}
chad.geom._Matrix4x4 = {}
chad.geom._Matrix4x4.Matrix4x4_Impl_ = function() { }
chad.geom._Matrix4x4.Matrix4x4_Impl_.__name__ = true;
chad.geom._Matrix4x4.Matrix4x4_Impl_.fromArray = function(e) {
	if(e.length != 16) throw "Invalid array length (" + e.length + ") for Matrix4x4, should be 16";
	return [e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.rotationX = function(degrees) {
	var radians = degrees * Math.PI * (1.0 / 180.0), cos = Math.cos(radians), sin = Math.sin(radians);
	return [1,0,0,0,0,cos,sin,0,0,-sin,cos,0,0,0,0,1];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.rotationY = function(degrees) {
	var radians = degrees * Math.PI * (1.0 / 180.0), cos = Math.cos(radians), sin = Math.sin(radians);
	return [cos,0,-sin,0,0,1,0,0,sin,0,cos,0,0,0,0,1];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.rotationZ = function(degrees) {
	var radians = degrees * Math.PI * (1.0 / 180.0), cos = Math.cos(radians), sin = Math.sin(radians);
	return [cos,sin,0,0,-sin,cos,0,0,0,0,1,0,0,0,0,1];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.rotation = function(rotationCenter,rotationAxis,degrees) {
	var rotationPlane = chad.geom.Plane.fromNormalAndPoint(rotationAxis,rotationCenter), orthobasis = new chad.geom.OrthoNormalBasis(rotationPlane,chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector(rotationPlane.normal)), transformation = chad.geom._Matrix4x4.Matrix4x4_Impl_.translation([-rotationCenter[0],-rotationCenter[1],-rotationCenter[2]]);
	transformation = chad.geom._Matrix4x4.Matrix4x4_Impl_.multiply(transformation,orthobasis.getProjectionMatrix());
	transformation = chad.geom._Matrix4x4.Matrix4x4_Impl_.multiply(transformation,chad.geom._Matrix4x4.Matrix4x4_Impl_.rotationZ(degrees));
	transformation = chad.geom._Matrix4x4.Matrix4x4_Impl_.multiply(transformation,orthobasis.getInverseProjectionMatrix());
	transformation = chad.geom._Matrix4x4.Matrix4x4_Impl_.multiply(transformation,chad.geom._Matrix4x4.Matrix4x4_Impl_.translation(rotationCenter));
	return transformation;
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.translation = function(vec) {
	return [1,0,0,0,0,1,0,0,0,0,1,0,vec[0],vec[1],vec[2],1];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.mirroring = function(plane) {
	var nx = plane.normal[0], ny = plane.normal[1], nz = plane.normal[2], w = plane.w;
	return [1.0 - 2.0 * nx * nx,-2. * ny * nx,-2. * nz * nx,0,-2. * nx * ny,1.0 - 2.0 * ny * ny,-2. * nz * ny,0,-2. * nx * nz,-2. * ny * nz,1.0 - 2.0 * nz * nz,0,-2. * nx * w,-2. * ny * w,-2. * nz * w,1];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.scaling = function(vec) {
	return [vec[0],0,0,0,0,vec[1],0,0,0,0,vec[2],0,0,0,0,1];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_._new = function(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15) {
	return [e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.toArray = function(this1) {
	return this1.slice();
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.add = function(this1,other) {
	return [this1[0] + other[0],this1[1] + other[1],this1[2] + other[2],this1[3] + other[3],this1[4] + other[4],this1[5] + other[5],this1[6] + other[6],this1[7] + other[7],this1[8] + other[8],this1[9] + other[9],this1[10] + other[10],this1[11] + other[11],this1[12] + other[12],this1[13] + other[13],this1[14] + other[14],this1[15] + other[15]];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.subtract = function(this1,other) {
	return [this1[0] - other[0],this1[1] - other[1],this1[2] - other[2],this1[3] - other[3],this1[4] - other[4],this1[5] - other[5],this1[6] - other[6],this1[7] - other[7],this1[8] - other[8],this1[9] - other[9],this1[10] - other[10],this1[11] - other[11],this1[12] - other[12],this1[13] - other[13],this1[14] - other[14],this1[15] - other[15]];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.multiply = function(this1,other) {
	var t0 = this1[0], t1 = this1[1], t2 = this1[2], t3 = this1[3], t4 = this1[4], t5 = this1[5], t6 = this1[6], t7 = this1[7], t8 = this1[8], t9 = this1[9], t10 = this1[10], t11 = this1[11], t12 = this1[12], t13 = this1[13], t14 = this1[14], t15 = this1[15], m0 = other[0], m1 = other[1], m2 = other[2], m3 = other[3], m4 = other[4], m5 = other[5], m6 = other[6], m7 = other[7], m8 = other[8], m9 = other[9], m10 = other[10], m11 = other[11], m12 = other[12], m13 = other[13], m14 = other[14], m15 = other[15];
	return [t0 * m0 + t1 * m4 + t2 * m8 + t3 * m12,t0 * m1 + t1 * m5 + t2 * m9 + t3 * m13,t0 * m2 + t1 * m6 + t2 * m10 + t3 * m14,t0 * m3 + t1 * m7 + t2 * m11 + t3 * m15,t4 * m0 + t5 * m4 + t6 * m8 + t7 * m12,t4 * m1 + t5 * m5 + t6 * m9 + t7 * m13,t4 * m2 + t5 * m6 + t6 * m10 + t7 * m14,t4 * m3 + t5 * m7 + t6 * m11 + t7 * m15,t8 * m0 + t9 * m4 + t10 * m8 + t11 * m12,t8 * m1 + t9 * m5 + t10 * m9 + t11 * m13,t8 * m2 + t9 * m6 + t10 * m10 + t11 * m14,t8 * m3 + t9 * m7 + t10 * m11 + t11 * m15,t12 * m0 + t13 * m4 + t14 * m8 + t15 * m12,t12 * m1 + t13 * m5 + t14 * m9 + t15 * m13,t12 * m2 + t13 * m6 + t14 * m10 + t15 * m14,t12 * m3 + t13 * m7 + t14 * m11 + t15 * m15];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.rightMultiplyVector3D = function(this1,vector) {
	var v0 = vector[0], v1 = vector[1], v2 = vector[2], v3 = 1, x = v0 * this1[0] + v1 * this1[1] + v2 * this1[2] + v3 * this1[3], y = v0 * this1[4] + v1 * this1[5] + v2 * this1[6] + v3 * this1[7], z = v0 * this1[8] + v1 * this1[9] + v2 * this1[10] + v3 * this1[11], w = v0 * this1[12] + v1 * this1[13] + v2 * this1[14] + v3 * this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y,z];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D = function(this1,vector) {
	var v0 = vector[0], v1 = vector[1], v2 = vector[2], v3 = 1, x = v0 * this1[0] + v1 * this1[4] + v2 * this1[8] + v3 * this1[12], y = v0 * this1[1] + v1 * this1[5] + v2 * this1[9] + v3 * this1[13], z = v0 * this1[2] + v1 * this1[6] + v2 * this1[10] + v3 * this1[14], w = v0 * this1[3] + v1 * this1[7] + v2 * this1[11] + v3 * this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y,z];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.rightMultiplyVector2D = function(this1,vector) {
	var v0 = vector[0], v1 = vector[1], v2 = 0, v3 = 1, x = v0 * this1[0] + v1 * this1[1] + v2 * this1[2] + v3 * this1[3], y = v0 * this1[4] + v1 * this1[5] + v2 * this1[6] + v3 * this1[7], z = v0 * this1[8] + v1 * this1[9] + v2 * this1[10] + v3 * this1[11], w = v0 * this1[12] + v1 * this1[13] + v2 * this1[14] + v3 * this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector2D = function(this1,vector) {
	var v0 = vector[0], v1 = vector[1], v2 = 0, v3 = 1, x = v0 * this1[0] + v1 * this1[4] + v2 * this1[8] + v3 * this1[12], y = v0 * this1[1] + v1 * this1[5] + v2 * this1[9] + v3 * this1[13], z = v0 * this1[2] + v1 * this1[6] + v2 * this1[10] + v3 * this1[14], w = v0 * this1[3] + v1 * this1[7] + v2 * this1[11] + v3 * this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y];
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.isMirroring = function(this1) {
	var u = [this1[0],this1[4],this1[8]], v = [this1[1],this1[5],this1[9]], w = [this1[2],this1[6],this1[10]];
	var mirrorvalue = [u[1] * v[2] - u[2] * v[1],u[2] * v[0] - u[0] * v[2],u[0] * v[1] - u[1] * v[0]][0] * w[0] + [u[1] * v[2] - u[2] * v[1],u[2] * v[0] - u[0] * v[2],u[0] * v[1] - u[1] * v[0]][1] * w[1] + [u[1] * v[2] - u[2] * v[1],u[2] * v[0] - u[0] * v[2],u[0] * v[1] - u[1] * v[0]][2] * w[2], ismirror = mirrorvalue < 0;
	return ismirror;
}
chad.geom._Matrix4x4.Matrix4x4_Impl_.at = function(this1,index) {
	return this1[index];
}
chad.geom.Plane = function(normal,w) {
	this.normal = normal;
	this.w = w;
};
chad.geom.Plane.__name__ = true;
chad.geom.Plane.fromVector3DDs = function(a,b,c) {
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
chad.geom.Plane.anyPlaneFromVector3DDs = function(a,b,c) {
	var v1 = [b[0] - a[0],b[1] - a[1],b[2] - a[2]], v2 = [c[0] - a[0],c[1] - a[1],c[2] - a[2]];
	if(Math.sqrt((function($this) {
		var $r;
		var prod = (function($this) {
			var $r;
			var arr = [null == v1[0]?0:v1[0],null == v1[1]?0:v1[1],null == v1[2]?0:v1[2]];
			$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
			return $r;
		}($this));
		$r = v1[0] * prod[0] + v1[1] * prod[1] + v1[2] * prod[2];
		return $r;
	}(this))) < 1e-5) v1 = chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector(v2);
	if(Math.sqrt((function($this) {
		var $r;
		var prod = (function($this) {
			var $r;
			var arr = [null == v2[0]?0:v2[0],null == v2[1]?0:v2[1],null == v2[2]?0:v2[2]];
			$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
			return $r;
		}($this));
		$r = v2[0] * prod[0] + v2[1] * prod[1] + v2[2] * prod[2];
		return $r;
	}(this))) < 1e-5) v2 = chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector(v1);
	var normal = [v1[1] * v2[2] - v1[2] * v2[1],v1[2] * v2[0] - v1[0] * v2[2],v1[0] * v2[1] - v1[1] * v2[0]];
	if(Math.sqrt((function($this) {
		var $r;
		var prod = (function($this) {
			var $r;
			var arr = [null == normal[0]?0:normal[0],null == normal[1]?0:normal[1],null == normal[2]?0:normal[2]];
			$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
			return $r;
		}($this));
		$r = normal[0] * prod[0] + normal[1] * prod[1] + normal[2] * prod[2];
		return $r;
	}(this))) < 1e-5) {
		v2 = chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector(v1);
		normal = [v1[1] * v2[2] - v1[2] * v2[1],v1[2] * v2[0] - v1[0] * v2[2],v1[0] * v2[1] - v1[1] * v2[0]];
	}
	normal = (function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == normal[0]?0:normal[0],null == normal[1]?0:normal[1],null == normal[2]?0:normal[2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = normal[0] * prod[0] + normal[1] * prod[1] + normal[2] * prod[2];
			return $r;
		}($this)));
		$r = [normal[0] / divisor,normal[1] / divisor,normal[2] / divisor];
		return $r;
	}(this));
	return new chad.geom.Plane(normal,normal[0] * a[0] + normal[1] * a[1] + normal[2] * a[2]);
}
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
chad.geom.Plane.fromNormalAndPoint = function(normal,point) {
	normal = (function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == normal[0]?0:normal[0],null == normal[1]?0:normal[1],null == normal[2]?0:normal[2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = normal[0] * prod[0] + normal[1] * prod[1] + normal[2] * prod[2];
			return $r;
		}($this)));
		$r = [normal[0] / divisor,normal[1] / divisor,normal[2] / divisor];
		return $r;
	}(this));
	return new chad.geom.Plane(normal,point[0] * normal[0] + point[1] * normal[1] + point[2] * normal[2]);
}
chad.geom.Plane.prototype = {
	mirrorPoint: function(point3d) {
		var distance = this.signedDistanceToPoint(point3d);
		var mirrored = (function($this) {
			var $r;
			var other = (function($this) {
				var $r;
				var multiplier = distance * 2.0;
				$r = [$this.normal[0] * multiplier,$this.normal[1] * multiplier,$this.normal[2] * multiplier];
				return $r;
			}($this));
			$r = [point3d[0] - other[0],point3d[1] - other[1],point3d[2] - other[2]];
			return $r;
		}(this));
		return mirrored;
	}
	,toString: function() {
		return "Plane [normal: " + ("Vector3D " + Std.string(this.normal)) + ", w: " + this.w + "]";
	}
	,signedDistanceToPoint: function(point) {
		return this.normal[0] * point[0] + this.normal[1] * point[1] + this.normal[2] * point[2] - this.w;
	}
	,intersectWithPlane: function(plane) {
		return chad.geom.Line3D.fromPlanes(this,plane);
	}
	,intersectWithLine: function(line) {
		return line.intersectWithPlane(this);
	}
	,splitLineBetweenPoints: function(p1,p2) {
		var direction = [p2[0] - p1[0],p2[1] - p1[1],p2[2] - p1[2]], lambda = (this.w - (this.normal[0] * p1[0] + this.normal[1] * p1[1] + this.normal[2] * p1[2])) / (this.normal[0] * direction[0] + this.normal[1] * direction[1] + this.normal[2] * direction[2]);
		if(Math.isNaN(lambda)) lambda = 0;
		if(lambda > 1) lambda = 1;
		if(lambda < 0) lambda = 0;
		return (function($this) {
			var $r;
			var other = [direction[0] * lambda,direction[1] * lambda,direction[2] * lambda];
			$r = [p1[0] + other[0],p1[1] + other[1],p1[2] + other[2]];
			return $r;
		}(this));
	}
	,transform: function(matrix) {
		var ismirror = chad.geom._Matrix4x4.Matrix4x4_Impl_.isMirroring(matrix), r = chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector(this.normal), u = [this.normal[1] * r[2] - this.normal[2] * r[1],this.normal[2] * r[0] - this.normal[0] * r[2],this.normal[0] * r[1] - this.normal[1] * r[0]], v = [this.normal[1] * u[2] - this.normal[2] * u[1],this.normal[2] * u[0] - this.normal[0] * u[2],this.normal[0] * u[1] - this.normal[1] * u[0]], point1 = (function($this) {
			var $r;
			var multiplier = $this.w;
			$r = [$this.normal[0] * multiplier,$this.normal[1] * multiplier,$this.normal[2] * multiplier];
			return $r;
		}(this)), point2 = [point1[0] + u[0],point1[1] + u[1],point1[2] + u[2]], point3 = [point1[0] + v[0],point1[1] + v[1],point1[2] + v[2]];
		point1 = chad.geom._Vector3D.Vector3D_Impl_.multiply4x4(point1,matrix);
		point2 = chad.geom._Vector3D.Vector3D_Impl_.multiply4x4(point2,matrix);
		point3 = chad.geom._Vector3D.Vector3D_Impl_.multiply4x4(point3,matrix);
		var newplane = chad.geom.Plane.fromVector3DDs(point1,point2,point3);
		if(ismirror) newplane = newplane.flip();
		return newplane;
	}
	,equals: function(other) {
		return (function($this) {
			var $r;
			var other1 = other.normal;
			$r = $this.normal[0] == other1[0] && $this.normal[1] == other1[1] && $this.normal[2] == other1[2];
			return $r;
		}(this)) && this.w == other.w;
	}
	,splitPolygon: function(polygon,coplanarFront,coplanarBack,front,back) {
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
chad.geom.OrthoNormalBasis = function(plane,rightvector) {
	this.v = (function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == [plane.normal[1] * rightvector[2] - plane.normal[2] * rightvector[1],plane.normal[2] * rightvector[0] - plane.normal[0] * rightvector[2],plane.normal[0] * rightvector[1] - plane.normal[1] * rightvector[0]][0]?0:[plane.normal[1] * rightvector[2] - plane.normal[2] * rightvector[1],plane.normal[2] * rightvector[0] - plane.normal[0] * rightvector[2],plane.normal[0] * rightvector[1] - plane.normal[1] * rightvector[0]][0],null == [plane.normal[1] * rightvector[2] - plane.normal[2] * rightvector[1],plane.normal[2] * rightvector[0] - plane.normal[0] * rightvector[2],plane.normal[0] * rightvector[1] - plane.normal[1] * rightvector[0]][1]?0:[plane.normal[1] * rightvector[2] - plane.normal[2] * rightvector[1],plane.normal[2] * rightvector[0] - plane.normal[0] * rightvector[2],plane.normal[0] * rightvector[1] - plane.normal[1] * rightvector[0]][1],null == [plane.normal[1] * rightvector[2] - plane.normal[2] * rightvector[1],plane.normal[2] * rightvector[0] - plane.normal[0] * rightvector[2],plane.normal[0] * rightvector[1] - plane.normal[1] * rightvector[0]][2]?0:[plane.normal[1] * rightvector[2] - plane.normal[2] * rightvector[1],plane.normal[2] * rightvector[0] - plane.normal[0] * rightvector[2],plane.normal[0] * rightvector[1] - plane.normal[1] * rightvector[0]][2]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
				return $r;
			}($this));
			$r = [plane.normal[1] * rightvector[2] - plane.normal[2] * rightvector[1],plane.normal[2] * rightvector[0] - plane.normal[0] * rightvector[2],plane.normal[0] * rightvector[1] - plane.normal[1] * rightvector[0]][0] * prod[0] + [plane.normal[1] * rightvector[2] - plane.normal[2] * rightvector[1],plane.normal[2] * rightvector[0] - plane.normal[0] * rightvector[2],plane.normal[0] * rightvector[1] - plane.normal[1] * rightvector[0]][1] * prod[1] + [plane.normal[1] * rightvector[2] - plane.normal[2] * rightvector[1],plane.normal[2] * rightvector[0] - plane.normal[0] * rightvector[2],plane.normal[0] * rightvector[1] - plane.normal[1] * rightvector[0]][2] * prod[2];
			return $r;
		}($this)));
		$r = [[plane.normal[1] * rightvector[2] - plane.normal[2] * rightvector[1],plane.normal[2] * rightvector[0] - plane.normal[0] * rightvector[2],plane.normal[0] * rightvector[1] - plane.normal[1] * rightvector[0]][0] / divisor,[plane.normal[1] * rightvector[2] - plane.normal[2] * rightvector[1],plane.normal[2] * rightvector[0] - plane.normal[0] * rightvector[2],plane.normal[0] * rightvector[1] - plane.normal[1] * rightvector[0]][1] / divisor,[plane.normal[1] * rightvector[2] - plane.normal[2] * rightvector[1],plane.normal[2] * rightvector[0] - plane.normal[0] * rightvector[2],plane.normal[0] * rightvector[1] - plane.normal[1] * rightvector[0]][2] / divisor];
		return $r;
	}(this));
	this.u = (function($this) {
		var $r;
		var other = plane.normal;
		$r = [$this.v[1] * other[2] - $this.v[2] * other[1],$this.v[2] * other[0] - $this.v[0] * other[2],$this.v[0] * other[1] - $this.v[1] * other[0]];
		return $r;
	}(this));
	this.plane = plane;
	this.planeOrigin = (function($this) {
		var $r;
		var multiplier = plane.w;
		$r = [plane.normal[0] * multiplier,plane.normal[1] * multiplier,plane.normal[2] * multiplier];
		return $r;
	}(this));
};
chad.geom.OrthoNormalBasis.__name__ = true;
chad.geom.OrthoNormalBasis.fromPlane = function(plane) {
	return new chad.geom.OrthoNormalBasis(plane,chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector(plane.normal));
}
chad.geom.OrthoNormalBasis.prototype = {
	transform: function(matrix4x4) {
		var newplane = this.plane.transform(matrix4x4), rightpoint_transformed = chad.geom._Vector3D.Vector3D_Impl_.transform(this.u,matrix4x4), origin_transformed = chad.geom._Vector3D.Vector3D_Impl_.transform([0,0,0],matrix4x4), newrighthandvector = [rightpoint_transformed[0] - origin_transformed[0],rightpoint_transformed[1] - origin_transformed[1],rightpoint_transformed[2] - origin_transformed[2]], newbasis = new chad.geom.OrthoNormalBasis(newplane,newrighthandvector);
		return newbasis;
	}
	,line2Dto3D: function(line) {
		var a = line.origin(), b = [line.direction()[0] + a[0],line.direction()[1] + a[1]];
		return chad.geom.Line3D.fromPoints(this.to3D(a),this.to3D(b));
	}
	,line3Dto2D: function(line) {
		return chad.geom.Line2D.fromPoints(this.to2D(line.point),this.to2D((function($this) {
			var $r;
			var other = line.point;
			$r = [line.direction[0] + other[0],line.direction[1] + other[1],line.direction[2] + other[2]];
			return $r;
		}(this))));
	}
	,to3D: function(vec2) {
		return (function($this) {
			var $r;
			var other = (function($this) {
				var $r;
				var multiplier = vec2[1];
				$r = [$this.v[0] * multiplier,$this.v[1] * multiplier,$this.v[2] * multiplier];
				return $r;
			}($this));
			$r = [((function($this) {
				var $r;
				var other1 = (function($this) {
					var $r;
					var multiplier = vec2[0];
					$r = [$this.u[0] * multiplier,$this.u[1] * multiplier,$this.u[2] * multiplier];
					return $r;
				}($this));
				$r = [$this.planeOrigin[0] + other1[0],$this.planeOrigin[1] + other1[1],$this.planeOrigin[2] + other1[2]];
				return $r;
			}($this)))[0] + other[0],((function($this) {
				var $r;
				var other1 = (function($this) {
					var $r;
					var multiplier = vec2[0];
					$r = [$this.u[0] * multiplier,$this.u[1] * multiplier,$this.u[2] * multiplier];
					return $r;
				}($this));
				$r = [$this.planeOrigin[0] + other1[0],$this.planeOrigin[1] + other1[1],$this.planeOrigin[2] + other1[2]];
				return $r;
			}($this)))[1] + other[1],((function($this) {
				var $r;
				var other1 = (function($this) {
					var $r;
					var multiplier = vec2[0];
					$r = [$this.u[0] * multiplier,$this.u[1] * multiplier,$this.u[2] * multiplier];
					return $r;
				}($this));
				$r = [$this.planeOrigin[0] + other1[0],$this.planeOrigin[1] + other1[1],$this.planeOrigin[2] + other1[2]];
				return $r;
			}($this)))[2] + other[2]];
			return $r;
		}(this));
	}
	,to2D: function(vec3) {
		return [(function($this) {
			var $r;
			var prod = $this.u;
			$r = vec3[0] * prod[0] + vec3[1] * prod[1] + vec3[2] * prod[2];
			return $r;
		}(this)),(function($this) {
			var $r;
			var prod = $this.v;
			$r = vec3[0] * prod[0] + vec3[1] * prod[1] + vec3[2] * prod[2];
			return $r;
		}(this))];
	}
	,getInverseProjectionMatrix: function() {
		var p = (function($this) {
			var $r;
			var multiplier = $this.plane.w;
			$r = [$this.plane.normal[0] * multiplier,$this.plane.normal[1] * multiplier,$this.plane.normal[2] * multiplier];
			return $r;
		}(this));
		return [this.u[0],this.u[1],this.u[2],0,this.v[0],this.v[1],this.v[2],0,this.plane.normal[0],this.plane.normal[1],this.plane.normal[2],0,p[0],p[1],p[2],1];
	}
	,getProjectionMatrix: function() {
		return [this.u[0],this.v[0],this.plane.normal[0],0,this.u[1],this.v[1],this.plane.normal[1],0,this.u[2],this.v[2],this.plane.normal[2],0,0,0,-this.plane.w,1];
	}
	,__class__: chad.geom.OrthoNormalBasis
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
			return new chad.geom.Vertex3D(v.position,[-v.normal[0],-v.normal[1],-v.normal[2]]);
		}));
	}
	,__class__: chad.geom.Polygon
}
chad.geom.Util = function() { }
chad.geom.Util.__name__ = true;
chad.geom.Util.solve2Linear = function(a,b,c,d,u,v) {
	var det = a * d - b * c, invdet = 1.0 / det, x = u * d - b * v, y = -u * c + a * v;
	return [x * invdet,y * invdet];
}
chad.geom._Vector2D = {}
chad.geom._Vector2D.Vector2D_Impl_ = function() { }
chad.geom._Vector2D.Vector2D_Impl_.__name__ = true;
chad.geom._Vector2D.Vector2D_Impl_._new = function(x,y) {
	return [x,y];
}
chad.geom._Vector2D.Vector2D_Impl_.fromFloat = function(v) {
	return [v,v];
}
chad.geom._Vector2D.Vector2D_Impl_.fromAngle = function(radians) {
	return chad.geom._Vector2D.Vector2D_Impl_.fromAngleRadians(radians);
}
chad.geom._Vector2D.Vector2D_Impl_.fromAngleDegrees = function(degrees) {
	var radians = Math.PI * degrees / 180;
	return chad.geom._Vector2D.Vector2D_Impl_.fromAngleRadians(radians);
}
chad.geom._Vector2D.Vector2D_Impl_.fromAngleRadians = function(radians) {
	return [Math.cos(radians),Math.sin(radians)];
}
chad.geom._Vector2D.Vector2D_Impl_.fromArray = function(arr) {
	return [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1]];
}
chad.geom._Vector2D.Vector2D_Impl_.fromTypedef = function(o) {
	return [o.x,o.y];
}
chad.geom._Vector2D.Vector2D_Impl_.toArray = function(this1) {
	return this1.slice();
}
chad.geom._Vector2D.Vector2D_Impl_.toVector3DD = function(this1,z) {
	return [this1[0],this1[1],z];
}
chad.geom._Vector2D.Vector2D_Impl_.get_x = function(this1) {
	return this1[0];
}
chad.geom._Vector2D.Vector2D_Impl_.get_y = function(this1) {
	return this1[1];
}
chad.geom._Vector2D.Vector2D_Impl_.get_length = function(this1) {
	return Math.sqrt((function($this) {
		var $r;
		var prod = (function($this) {
			var $r;
			var arr = [null == this1[0]?0:this1[0],null == this1[1]?0:this1[1]];
			$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1]];
			return $r;
		}($this));
		$r = this1[0] * prod[0] + this1[1] * prod[1];
		return $r;
	}(this)));
}
chad.geom._Vector2D.Vector2D_Impl_.negate = function(this1) {
	return [-this1[0],-this1[1]];
}
chad.geom._Vector2D.Vector2D_Impl_.add = function(this1,other) {
	return [this1[0] + other[0],this1[1] + other[1]];
}
chad.geom._Vector2D.Vector2D_Impl_.subtract = function(this1,other) {
	return [this1[0] - other[0],this1[1] - other[1]];
}
chad.geom._Vector2D.Vector2D_Impl_.multiply = function(this1,multiplier) {
	return [this1[0] * multiplier,this1[1] * multiplier];
}
chad.geom._Vector2D.Vector2D_Impl_.divide = function(this1,divisor) {
	return [this1[0] / divisor,this1[1] / divisor];
}
chad.geom._Vector2D.Vector2D_Impl_.dot = function(this1,prod) {
	return this1[0] * prod[0] + this1[1] * prod[1];
}
chad.geom._Vector2D.Vector2D_Impl_.lerp = function(this1,other,multiplier) {
	return (function($this) {
		var $r;
		var other1 = [((function($this) {
			var $r;
			var other2 = (function($this) {
				var $r;
				var arr = [null == this1[0]?0:this1[0],null == this1[1]?0:this1[1]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1]];
				return $r;
			}($this));
			$r = [other[0] - other2[0],other[1] - other2[1]];
			return $r;
		}($this)))[0] * multiplier,((function($this) {
			var $r;
			var other2 = (function($this) {
				var $r;
				var arr = [null == this1[0]?0:this1[0],null == this1[1]?0:this1[1]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1]];
				return $r;
			}($this));
			$r = [other[0] - other2[0],other[1] - other2[1]];
			return $r;
		}($this)))[1] * multiplier];
		$r = [this1[0] + other1[0],this1[1] + other1[1]];
		return $r;
	}(this));
}
chad.geom._Vector2D.Vector2D_Impl_.normal = function(this1) {
	return [this1[1],-this1[0]];
}
chad.geom._Vector2D.Vector2D_Impl_.normalize = function(this1) {
	return (function($this) {
		var $r;
		var divisor = Math.sqrt((function($this) {
			var $r;
			var prod = (function($this) {
				var $r;
				var arr = [null == this1[0]?0:this1[0],null == this1[1]?0:this1[1]];
				$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1]];
				return $r;
			}($this));
			$r = this1[0] * prod[0] + this1[1] * prod[1];
			return $r;
		}($this)));
		$r = [this1[0] / divisor,this1[1] / divisor];
		return $r;
	}(this));
}
chad.geom._Vector2D.Vector2D_Impl_.equals = function(this1,other) {
	return this1[0] == other[0] && this1[1] == other[1];
}
chad.geom._Vector2D.Vector2D_Impl_.distanceTo = function(this1,other) {
	return Math.sqrt((function($this) {
		var $r;
		var prod = (function($this) {
			var $r;
			var arr = [null == [this1[0] - other[0],this1[1] - other[1]][0]?0:[this1[0] - other[0],this1[1] - other[1]][0],null == [this1[0] - other[0],this1[1] - other[1]][1]?0:[this1[0] - other[0],this1[1] - other[1]][1]];
			$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1]];
			return $r;
		}($this));
		$r = [this1[0] - other[0],this1[1] - other[1]][0] * prod[0] + [this1[0] - other[0],this1[1] - other[1]][1] * prod[1];
		return $r;
	}(this)));
}
chad.geom._Vector2D.Vector2D_Impl_.distanceToSquared = function(this1,other) {
	return (function($this) {
		var $r;
		var prod = (function($this) {
			var $r;
			var arr = [null == [this1[0] - other[0],this1[1] - other[1]][0]?0:[this1[0] - other[0],this1[1] - other[1]][0],null == [this1[0] - other[0],this1[1] - other[1]][1]?0:[this1[0] - other[0],this1[1] - other[1]][1]];
			$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1]];
			return $r;
		}($this));
		$r = [this1[0] - other[0],this1[1] - other[1]][0] * prod[0] + [this1[0] - other[0],this1[1] - other[1]][1] * prod[1];
		return $r;
	}(this));
}
chad.geom._Vector2D.Vector2D_Impl_.lengthSquared = function(this1) {
	return (function($this) {
		var $r;
		var prod = (function($this) {
			var $r;
			var arr = [null == this1[0]?0:this1[0],null == this1[1]?0:this1[1]];
			$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1]];
			return $r;
		}($this));
		$r = this1[0] * prod[0] + this1[1] * prod[1];
		return $r;
	}(this));
}
chad.geom._Vector2D.Vector2D_Impl_.multiply4x4 = function(this1,matrix) {
	return chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector2D(matrix,[null == this1[0]?0:this1[0],null == this1[1]?0:this1[1]]);
}
chad.geom._Vector2D.Vector2D_Impl_.transform = function(this1,matrix) {
	return chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector2D(matrix,[null == this1[0]?0:this1[0],null == this1[1]?0:this1[1]]);
}
chad.geom._Vector2D.Vector2D_Impl_.angle = function(this1) {
	return Math.atan2(this1[1],this1[0]);
}
chad.geom._Vector2D.Vector2D_Impl_.angleDegrees = function(this1) {
	var radians = Math.atan2(this1[1],this1[0]);
	return 180 * radians / Math.PI;
}
chad.geom._Vector2D.Vector2D_Impl_.angleRadians = function(this1) {
	return Math.atan2(this1[1],this1[0]);
}
chad.geom._Vector2D.Vector2D_Impl_.cross = function(this1,other) {
	return this1[0] * other[1] - this1[1] * other[0];
}
chad.geom._Vector2D.Vector2D_Impl_.min = function(this1,other) {
	return [Math.min(this1[0],other[0]),Math.min(this1[1],other[1])];
}
chad.geom._Vector2D.Vector2D_Impl_.max = function(this1,other) {
	return [Math.max(this1[0],other[0]),Math.max(this1[1],other[1])];
}
chad.geom._Vector2D.Vector2D_Impl_.toString = function(this1) {
	return "Vector2D " + Std.string(this1);
}
chad.geom._Vector3D = {}
chad.geom._Vector3D.Vector3D_Impl_ = function() { }
chad.geom._Vector3D.Vector3D_Impl_.__name__ = true;
chad.geom._Vector3D.Vector3D_Impl_._new = function(x,y,z) {
	return [x,y,z];
}
chad.geom._Vector3D.Vector3D_Impl_.fromFloat = function(v) {
	return [v,v,v];
}
chad.geom._Vector3D.Vector3D_Impl_.fromArray = function(arr) {
	return [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
}
chad.geom._Vector3D.Vector3D_Impl_.fromTypedef = function(o) {
	return [o.x,o.y,o.z];
}
chad.geom._Vector3D.Vector3D_Impl_.toArray = function(this1) {
	return this1.slice();
}
chad.geom._Vector3D.Vector3D_Impl_.get_x = function(this1) {
	return this1[0];
}
chad.geom._Vector3D.Vector3D_Impl_.get_y = function(this1) {
	return this1[1];
}
chad.geom._Vector3D.Vector3D_Impl_.get_z = function(this1) {
	return this1[2];
}
chad.geom._Vector3D.Vector3D_Impl_.get_length = function(this1) {
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
chad.geom._Vector3D.Vector3D_Impl_.negate = function(this1) {
	return [-this1[0],-this1[1],-this1[2]];
}
chad.geom._Vector3D.Vector3D_Impl_.add = function(this1,other) {
	return [this1[0] + other[0],this1[1] + other[1],this1[2] + other[2]];
}
chad.geom._Vector3D.Vector3D_Impl_.subtract = function(this1,other) {
	return [this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]];
}
chad.geom._Vector3D.Vector3D_Impl_.multiply = function(this1,multiplier) {
	return [this1[0] * multiplier,this1[1] * multiplier,this1[2] * multiplier];
}
chad.geom._Vector3D.Vector3D_Impl_.divide = function(this1,divisor) {
	return [this1[0] / divisor,this1[1] / divisor,this1[2] / divisor];
}
chad.geom._Vector3D.Vector3D_Impl_.equals = function(this1,other) {
	return this1[0] == other[0] && this1[1] == other[1] && this1[2] == other[2];
}
chad.geom._Vector3D.Vector3D_Impl_.abs = function(this1) {
	return [Math.abs(this1[0]),Math.abs(this1[1]),Math.abs(this1[2])];
}
chad.geom._Vector3D.Vector3D_Impl_.lengthSquared = function(this1) {
	return (function($this) {
		var $r;
		var prod = (function($this) {
			var $r;
			var arr = [null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]];
			$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
			return $r;
		}($this));
		$r = this1[0] * prod[0] + this1[1] * prod[1] + this1[2] * prod[2];
		return $r;
	}(this));
}
chad.geom._Vector3D.Vector3D_Impl_.distanceTo = function(this1,other) {
	return Math.sqrt((function($this) {
		var $r;
		var prod = (function($this) {
			var $r;
			var arr = [null == [this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]][0]?0:[this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]][0],null == [this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]][1]?0:[this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]][1],null == [this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]][2]?0:[this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]][2]];
			$r = [null == arr[0]?0:arr[0],null == arr[1]?0:arr[1],null == arr[2]?0:arr[2]];
			return $r;
		}($this));
		$r = [this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]][0] * prod[0] + [this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]][1] * prod[1] + [this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]][2] * prod[2];
		return $r;
	}(this)));
}
chad.geom._Vector3D.Vector3D_Impl_.distanceToSquared = function(this1,other) {
	return chad.geom._Vector3D.Vector3D_Impl_.lengthSquared([this1[0] - other[0],this1[1] - other[1],this1[2] - other[2]]);
}
chad.geom._Vector3D.Vector3D_Impl_.multiply4x4 = function(this1,matrix4x4) {
	return chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix4x4,[null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]]);
}
chad.geom._Vector3D.Vector3D_Impl_.transform = function(this1,matrix4x4) {
	return chad.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyVector3D(matrix4x4,[null == this1[0]?0:this1[0],null == this1[1]?0:this1[1],null == this1[2]?0:this1[2]]);
}
chad.geom._Vector3D.Vector3D_Impl_.randomNonParallelVector = function(this1) {
	var a = chad.geom._Vector3D.Vector3D_Impl_.abs(this1);
	if(a[0] <= a[1] && a[0] <= a[2]) return [1,0,0]; else if(a[1] <= a[0] && a[1] <= a[2]) return [0,1,0]; else return [0,0,1];
}
chad.geom._Vector3D.Vector3D_Impl_.dot = function(this1,prod) {
	return this1[0] * prod[0] + this1[1] * prod[1] + this1[2] * prod[2];
}
chad.geom._Vector3D.Vector3D_Impl_.lerp = function(this1,other,multiplier) {
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
chad.geom._Vector3D.Vector3D_Impl_.normalize = function(this1) {
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
chad.geom._Vector3D.Vector3D_Impl_.cross = function(this1,other) {
	return [this1[1] * other[2] - this1[2] * other[1],this1[2] * other[0] - this1[0] * other[2],this1[0] * other[1] - this1[1] * other[0]];
}
chad.geom._Vector3D.Vector3D_Impl_.min = function(this1,other) {
	return [Math.min(this1[0],other[0]),Math.min(this1[1],other[1]),Math.min(this1[2],other[2])];
}
chad.geom._Vector3D.Vector3D_Impl_.max = function(this1,other) {
	return [Math.max(this1[0],other[0]),Math.max(this1[1],other[1]),Math.max(this1[2],other[2])];
}
chad.geom._Vector3D.Vector3D_Impl_.toString = function(this1) {
	return "Vector3D " + Std.string(this1);
}
chad.geom.Vertex3D = function(position,normal) {
	this.position = position;
	this.normal = normal;
};
chad.geom.Vertex3D.__name__ = true;
chad.geom.Vertex3D.prototype = {
	toString: function() {
		return "Vertex3D $position, $normal";
	}
	,interpolate: function(other,t) {
		return new chad.geom.Vertex3D((function($this) {
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
		return new chad.geom.Vertex3D(this.position,[-this.normal[0],-this.normal[1],-this.normal[2]]);
	}
	,__class__: chad.geom.Vertex3D
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
chad.geom._Matrix4x4.Matrix4x4_Impl_.unity = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
chad.geom.Plane.EPSILON = 1e-5;
chad.geom.Plane.COPLANAR = 0;
chad.geom.Plane.FRONT = 1;
chad.geom.Plane.BACK = 2;
chad.geom.Plane.SPANNING = 3;
chad.geom.OrthoNormalBasis.z0Plane = new chad.geom.OrthoNormalBasis(new chad.geom.Plane([0,0,1],0),[1,0,0]);
Main.main();
})();
