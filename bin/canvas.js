(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Canvas = function() { };
Canvas.__name__ = true;
Canvas.main = function() {
	var canvas = window.document.querySelector("canvas");
	var render = chad.render.CanvasRender.scaled(canvas,2);
	var p = [30,50];
	render.drawDot(p);
	render.drawSegment([100,100],[500,100]);
	render.drawSegment([100,100],[100,500]);
	render.drawSegment([100,100],[500,500]);
	var line = thx.geom.Line.fromPoints([0,500],[500,0]);
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		render.drawLine(line.offset(i * 10),chad.render.StrokeStyle.StrokeDash([3,4]));
		if(i != 0) render.drawLine(line.offset(-i * 10),chad.render.StrokeStyle.StrokeDot(3));
	}
	var rect = [[30,30],[300,300]];
	render.drawPath(thx.geom.shape._Box.Box_Impl_.toPath(rect));
	var circle = { center : [300,250], radius : 100};
	render.drawPath(thx.geom.shape._Circle.Circle_Impl_.toPath(circle),chad.render.StrokeStyle.StrokeDot(4));
	var circle1 = { center : [200,200], radius : 80};
	render.drawPath(thx.geom.shape._Circle.Circle_Impl_.toPath(circle1),chad.render.StrokeStyle.StrokeDash([3,4,5,6]),chad.render.FillStyle.FillColor("rgba(0,255,155,0.1)"));
	var circle2 = { center : [240,280], radius : 60};
	render.drawPath(thx.geom.shape._Circle.Circle_Impl_.toPath(circle2),null,chad.render.FillStyle.FillColor("rgba(100,255,155,0.5)"));
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var chad = {};
chad.render = {};
chad.render.IRender = function() { };
chad.render.IRender.__name__ = true;
chad.render.BaseRender = function() { };
chad.render.BaseRender.__name__ = true;
chad.render.BaseRender.__interfaces__ = [chad.render.IRender];
var thx = {};
thx.geom = {};
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
chad.render.CanvasRender = function(canvas,matrix,weightScale) {
	this.ctx = canvas.getContext("2d");
	this.width = canvas.width;
	this.height = canvas.height;
	this.topLeft = [0,0];
	this.topRight = [this.width,0];
	this.bottomLeft = [0,this.height];
	this.bottomRight = [this.width,this.height];
	this.top = thx.geom.Line.fromPoints(this.topLeft,this.topRight);
	this.bottom = thx.geom.Line.fromPoints(this.bottomLeft,this.bottomRight);
	this.left = thx.geom.Line.fromPoints(this.topLeft,this.bottomLeft);
	this.right = thx.geom.Line.fromPoints(this.topRight,this.bottomRight);
	if(null == weightScale) this.weightScale = function(v) {
		return v;
	}; else this.weightScale = weightScale;
	if(null == matrix) matrix = thx.geom._Matrix4x4.Matrix4x4_Impl_.unity;
	matrix = thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(matrix,chad.render.CanvasRender.correctionMatrix);
	this.ctx.transform(matrix[0],matrix[1],matrix[4],matrix[5],matrix[12],matrix[13]);
	this.applyStrokeStyle(chad.render.StrokeStyle.StrokeLine(new chad.render.LineStyle()));
	this.applyFillStyle(chad.render.FillStyle.FillColor("#000000"));
};
chad.render.CanvasRender.__name__ = true;
chad.render.CanvasRender.scaled = function(canvas,scale) {
	return new chad.render.CanvasRender(canvas,thx.geom._Matrix4x4.Matrix4x4_Impl_.scaling([scale,scale,1]),function(v) {
		return v / scale;
	});
};
chad.render.CanvasRender.__super__ = chad.render.BaseRender;
chad.render.CanvasRender.prototype = $extend(chad.render.BaseRender.prototype,{
	wrap: function(stroke,fill,f) {
		var hasStyle = null != fill || null != stroke;
		if(hasStyle) this.ctx.save();
		this.ctx.beginPath();
		if(null != stroke) this.applyStrokeStyle(stroke);
		if(null != fill) this.applyFillStyle(fill);
		f();
		if(null != fill) this.ctx.fill();
		if(null != stroke || null == fill) this.ctx.stroke();
		if(hasStyle) this.ctx.restore();
	}
	,drawDot: function(point,style) {
		this.wrap(null,style,(function(f,x,y,a1,a2) {
			return function() {
				return f(x,y,a1,a2);
			};
		})(($_=this.ctx,$bind($_,$_.fillRect)),point[0],point[1],1,1));
	}
	,drawSegment: function(a,b,style) {
		var _g = this;
		this.wrap(style,null,function() {
			_g.ctx.moveTo(a[0],a[1]);
			_g.ctx.lineTo(b[0],b[1]);
		});
	}
	,drawLine: function(line,style) {
		var a = line.intersectWithLine(this.top);
		var b;
		if(null == a) {
			a = line.intersectWithLine(this.left);
			b = line.intersectWithLine(this.right);
		} else b = line.intersectWithLine(this.bottom);
		this.drawSegment(a,b,style);
	}
	,drawPath: function(path,stroke,fill) {
		var _g = this;
		this.wrap(stroke,fill,function() {
			path.iterate(function(init) {
				_g.ctx.moveTo(init[0],init[1]);
			},function(a,b,nout,nin) {
				if(null == nout && null == nin) _g.ctx.lineTo(b[0],b[1]); else {
					if(null == nout) nout = a; else if(null == nin) nin = b;
					_g.ctx.bezierCurveTo(nout[0],nout[1],nin[0],nin[1],b[0],b[1]);
				}
			});
		});
	}
	,lineTo: function(point) {
		this.ctx.lineTo(point[0],point[1]);
	}
	,curveTo: function(point,cout,cin) {
		this.ctx.bezierCurveTo(cout[0],cout[1],cin[0],cin[1],point[0],point[1]);
	}
	,moveTo: function(point) {
		this.ctx.moveTo(point[0],point[1]);
	}
	,applyLineStyle: function(style) {
		if(null == style) return;
		this.ctx.lineWidth = this.weightScale(style.width);
		this.ctx.lineCap = style.cap;
		this.ctx.lineJoin = style.join;
		this.ctx.strokeStyle = style.color;
	}
	,applyStrokeStyle: function(style) {
		switch(style[1]) {
		case 0:
			var style1 = style[2];
			this.applyLineStyle(style1);
			this.ctx.setLineDash([]);
			break;
		case 1:
			var style2 = style[3];
			var pattern = style[2];
			this.applyLineStyle(style2);
			this.ctx.setLineDash(pattern.map(this.weightScale));
			break;
		case 2:
			var style3 = style[3];
			var spacing = style[2];
			this.applyLineStyle(style3);
			this.ctx.setLineDash([1,spacing].map(this.weightScale));
			break;
		}
	}
	,applyFillStyle: function(style) {
		{
			var c = style[2];
			this.ctx.fillStyle = c;
		}
	}
});
chad.render.FillStyle = { __ename__ : true, __constructs__ : ["FillColor"] };
chad.render.FillStyle.FillColor = function(c) { var $x = ["FillColor",0,c]; $x.__enum__ = chad.render.FillStyle; return $x; };
chad.render.StrokeStyle = { __ename__ : true, __constructs__ : ["StrokeLine","StrokeDash","StrokeDot"] };
chad.render.StrokeStyle.StrokeLine = function(style) { var $x = ["StrokeLine",0,style]; $x.__enum__ = chad.render.StrokeStyle; return $x; };
chad.render.StrokeStyle.StrokeDash = function(pattern,style) { var $x = ["StrokeDash",1,pattern,style]; $x.__enum__ = chad.render.StrokeStyle; return $x; };
chad.render.StrokeStyle.StrokeDot = function(spacing,style) { var $x = ["StrokeDot",2,spacing,style]; $x.__enum__ = chad.render.StrokeStyle; return $x; };
chad.render.LineStyle = function(width,color,join,cap) {
	if(cap == null) cap = "butt";
	if(join == null) join = "miter";
	if(color == null) color = "#000000";
	if(width == null) width = 1.0;
	this.width = width;
	this.color = color;
	this.join = join;
	this.cap = cap;
};
chad.render.LineStyle.__name__ = true;
chad.render._CanvasRender = {};
chad.render._CanvasRender.Join_Impl_ = function() { };
chad.render._CanvasRender.Join_Impl_.__name__ = true;
chad.render._CanvasRender.Cap_Impl_ = function() { };
chad.render._CanvasRender.Cap_Impl_.__name__ = true;
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
thx.core = {};
thx.core.Iterators = function() { };
thx.core.Iterators.__name__ = true;
thx.core.Iterators.map = function(it,f) {
	var acc = [];
	while( it.hasNext() ) {
		var v = it.next();
		acc.push(f(v));
	}
	return acc;
};
thx.core.Iterators.mapi = function(it,f) {
	var acc = [];
	var i = 0;
	while( it.hasNext() ) {
		var v = it.next();
		acc.push(f(v,i++));
	}
	return acc;
};
thx.core.Iterators.toArray = function(it) {
	var items = [];
	while( it.hasNext() ) {
		var item = it.next();
		items.push(item);
	}
	return items;
};
thx.core.Iterators.order = function(it,sort) {
	var n = thx.core.Iterators.toArray(it);
	n.sort(sort);
	return n;
};
thx.core.Iterators.reduce = function(it,callback,initial) {
	thx.core.Iterators.map(it,function(v) {
		initial = callback(initial,v);
	});
	return initial;
};
thx.core.Iterators.reducei = function(it,callback,initial) {
	thx.core.Iterators.mapi(it,function(v,i) {
		initial = callback(initial,v,i);
	});
	return initial;
};
thx.core.Iterators.isEmpty = function(it) {
	return !it.hasNext();
};
thx.core.Iterators.filter = function(it,predicate) {
	return thx.core.Iterators.reduce(it,function(acc,item) {
		if(predicate(item)) acc.push(item);
		return acc;
	},[]);
};
thx.geom.Const = function() { };
thx.geom.Const.__name__ = true;
thx.geom.Edge = function(vertex0,vertex1) {
	this.vertex0 = vertex0;
	this.vertex1 = vertex1;
};
thx.geom.Edge.__name__ = true;
thx.geom.Edge.prototype = {
	intersects: function(other) {
		if(this.vertex0.equals(other.vertex1) || this.vertex1.equals(other.vertex0)) {
			if((function($this) {
				var $r;
				var this1;
				{
					var this11;
					var this12;
					var this13 = other.vertex1.position;
					var p = other.vertex0.position;
					var p_0 = -p[0];
					var p_1 = -p[1];
					this12 = [this13[0] + p_0,this13[1] + p_1];
					var v = Math.sqrt(this12[0] * this12[0] + this12[1] * this12[1]);
					this11 = [this12[0] / v,this12[1] / v];
					var p1;
					var this14;
					var this15 = $this.vertex1.position;
					var p2 = $this.vertex0.position;
					var p_01 = -p2[0];
					var p_11 = -p2[1];
					this14 = [this15[0] + p_01,this15[1] + p_11];
					var v1 = Math.sqrt(this14[0] * this14[0] + this14[1] * this14[1]);
					p1 = [this14[0] / v1,this14[1] / v1];
					this1 = [this11[0] + p1[0],this11[1] + p1[1]];
				}
				$r = Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1]);
				return $r;
			}(this)) < 1e-5) return true;
		} else {
			var d0;
			var this16 = this.vertex1.position;
			var p3 = this.vertex0.position;
			var p_02 = -p3[0];
			var p_12 = -p3[1];
			d0 = [this16[0] + p_02,this16[1] + p_12];
			var d1;
			var this17 = other.vertex1.position;
			var p4 = other.vertex0.position;
			var p_03 = -p4[0];
			var p_13 = -p4[1];
			d1 = [this17[0] + p_03,this17[1] + p_13];
			if(Math.abs(d0[0] * d1[1] - d0[1] * d1[0]) < 1e-9) return false;
			var alphas = thx.geom._Point.Point_Impl_.solve2Linear(-d0[0],d1[0],-d0[1],d1[1],this.vertex0.position[0] - other.vertex0.position[0],this.vertex0.position[1] - other.vertex0.position[1]);
			if(alphas[0] > 1e-6 && alphas[0] < 0.999999 && alphas[1] > 1e-5 && alphas[1] < 0.999999) return true;
		}
		return false;
	}
	,isLinear: function() {
		return thx.geom._Point.Point_Impl_.isNearZero(this.vertex0.normal) && thx.geom._Point.Point_Impl_.isNearZero(this.vertex1.normal);
	}
	,transform: function(matrix) {
		return new thx.geom.Edge(this.vertex0.transform(matrix),this.vertex1.transform(matrix));
	}
	,flip: function() {
		return new thx.geom.Edge(this.vertex1,this.vertex0);
	}
	,direction: function() {
		var this1 = this.vertex1.position;
		var p = this.vertex0.position;
		var p_0 = -p[0];
		var p_1 = -p[1];
		return [this1[0] + p_0,this1[1] + p_1];
	}
	,get_lengthSquared: function() {
		if(null == this.lengthSquared) {
			var w = this.vertex1.position[0] - this.vertex0.position[0];
			var h = this.vertex1.position[1] - this.vertex0.position[1];
			this.lengthSquared = w * w + h * h;
		}
		return this.lengthSquared;
	}
	,get_length: function() {
		if(null == this.length) this.length = Math.sqrt(this.get_lengthSquared());
		return this.length;
	}
	,toString: function() {
		return "Edge (" + this.vertex0.toString() + " -> " + this.vertex1.toString() + ")";
	}
};
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
	,intersectWithLine: function(line2d) {
		return thx.geom._Point.Point_Impl_.solve2Linear(this.normal[0],this.normal[1],line2d.normal[0],line2d.normal[1],this.w,line2d.w);
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
thx.geom.Path = function(nodes,closed) {
	if(closed == null) closed = true;
	this.computed = false;
	this.nodes = nodes;
	this.closed = closed;
};
thx.geom.Path.__name__ = true;
thx.geom.Path.fromPoints = function(arr,closed) {
	var nodes = arr.map(function(c) {
		return new thx.geom.PathNode(c[0],c[1],c[2]);
	});
	return new thx.geom.Path(nodes,closed);
};
thx.geom.Path.fromArray = function(arr,closed) {
	var nodes = arr.map(function(c) {
		return new thx.geom.PathNode(c,null,null);
	});
	return new thx.geom.Path(nodes,closed);
};
thx.geom.Path.fromCoords = function(arr,closed) {
	var nodes = arr.map(function(c) {
		var p = [c[0],c[1]];
		var nout;
		if(null == c[2]) nout = thx.geom._Point.Point_Impl_.zero; else nout = [c[2],c[3]];
		var nin;
		if(null == c[4]) nin = thx.geom._Point.Point_Impl_.zero; else nin = [c[4],c[5]];
		return new thx.geom.PathNode(p,nout,nin);
	});
	return new thx.geom.Path(nodes,closed);
};
thx.geom.Path.prototype = {
	iterator: function() {
		return HxOverrides.iter(this.nodes);
	}
	,iterate: function(fstart,fit) {
		var a;
		var b;
		if(null != fstart) fstart(this.nodes[0].point);
		var _g1 = 0;
		var _g = this.nodes.length - 1;
		while(_g1 < _g) {
			var i = _g1++;
			a = this.nodes[i];
			b = this.nodes[i + 1];
			fit(a.point,b.point,a.normalOut,b.normalIn);
		}
		if(this.closed) {
			a = this.nodes[this.nodes.length - 1];
			b = this.nodes[0];
			fit(a.point,b.point,a.normalOut,b.normalIn);
		}
	}
	,iterateSides: function(f) {
		var _g = this;
		if(null != this.edges) this.edges.map(f); else {
			this.edges = [];
			this.iterate(null,function(a,b,nout,nin) {
				var side = new thx.geom.Edge(new thx.geom.Vertex(a,nout),new thx.geom.Vertex(b,nin));
				_g.edges.push(side);
				f(side);
			});
		}
	}
	,transform: function(matrix) {
		var ismirror = thx.geom._Matrix4x4.Matrix4x4_Impl_.isMirroring(matrix);
		var result = new thx.geom.Path(thx.core.Iterators.map(this.iterator(),function(node) {
			return node.transform(matrix);
		}),this.closed);
		if(ismirror) result = result.flip();
		return result;
	}
	,flip: function() {
		var arr = thx.core.Iterators.map(this.iterator(),function(node) {
			return node.flip();
		});
		arr.reverse();
		return new thx.geom.Path(arr,this.closed);
	}
	,get_area: function() {
		this.compute();
		return this.area;
	}
	,get_length: function() {
		this.compute();
		return this.length;
	}
	,get_isSelfIntersecting: function() {
		this.compute();
		return this.isSelfIntersecting;
	}
	,get_isPolygon: function() {
		this.compute();
		return this.isPolygon;
	}
	,compute: function() {
		var _g = this;
		if(this.computed) return;
		this.area = 0;
		this.length = 0;
		this.isSelfIntersecting = false;
		this.isPolygon = true;
		this.iterateSides(function(side) {
			if(null == side.length) side.length = Math.sqrt(side.get_lengthSquared());
			_g.length += side.length;
			if(_g.get_isPolygon() && !side.isLinear()) _g.isPolygon = false;
		});
	}
	,toString: function() {
		return "Path(" + this.nodes.map(function(n) {
			return "[" + n.toStringValues() + "]";
		}).join(", ") + "," + Std.string(this.closed) + ")";
	}
};
thx.geom.PathNode = function(point,normalout,normalin) {
	this.point = point;
	this.normalOut = normalout;
	this.normalIn = normalin;
};
thx.geom.PathNode.__name__ = true;
thx.geom.PathNode.prototype = {
	transform: function(matrix) {
		return new thx.geom.PathNode(thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.point),thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.normalIn),thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.normalOut));
	}
	,flip: function() {
		return new thx.geom.PathNode(this.point,this.normalIn,this.normalOut);
	}
	,toStringValues: function() {
		var nout;
		if(null == this.normalOut) nout = "null"; else nout = "" + this.normalOut[1] + "," + this.normalOut[1];
		var nin;
		if(null == this.normalIn) nin = "null"; else nin = "" + this.normalIn[1] + "," + this.normalIn[1];
		return "" + this.point[0] + "," + this.point[1] + "," + nout + "," + nin;
	}
	,toString: function() {
		return "PathNode(" + this.toStringValues() + ")";
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
thx.geom.Vertex = function(position,normal) {
	this.position = position;
	this.normal = normal;
};
thx.geom.Vertex.__name__ = true;
thx.geom.Vertex.linearVertex = function(position) {
	return new thx.geom.Vertex(position,thx.geom._Point.Point_Impl_.zero);
};
thx.geom.Vertex.getLengthSquaredIntegrand = function(v) {
	var p1x = v[0];
	var p1y = v[1];
	var c1x = v[2];
	var c1y = v[3];
	var c2x = v[4];
	var c2y = v[5];
	var p2x = v[6];
	var p2y = v[7];
	var ax = 9 * (c1x - c2x) + 3 * (p2x - p1x);
	var bx = 6 * (p1x + c2x) - 12 * c1x;
	var cx = 3 * (c1x - p1x);
	var ay = 9 * (c1y - c2y) + 3 * (p2y - p1y);
	var by = 6 * (p1y + c2y) - 12 * c1y;
	var cy = 3 * (c1y - p1y);
	return function(t) {
		var dx = (ax * t + bx) * t + cx;
		var dy = (ay * t + by) * t + cy;
		return dx * dx + dy * dy;
	};
};
thx.geom.Vertex.prototype = {
	flip: function() {
		return new thx.geom.Vertex(this.position,(function($this) {
			var $r;
			var this1 = $this.normal;
			$r = [-this1[0],-this1[1]];
			return $r;
		}(this)));
	}
	,interpolate: function(other,t) {
		return new thx.geom.Vertex(thx.geom._Point.Point_Impl_.interpolate(this.position,other.position,t),thx.geom._Point.Point_Impl_.interpolate(this.normal,other.normal,t));
	}
	,getDistanceSquared: function(other) {
		var v = [this.position[0],this.position[1],this.position[0] + this.normal[0],this.position[1] + this.normal[1],other.position[0] + other.normal[0],other.position[1] + other.normal[1],other.position[0],other.position[1]];
		if(Math.abs(v[0] - v[2]) <= 10e-10 && Math.abs(v[1] - v[3]) <= 10e-10 && Math.abs(v[6] - v[4]) <= 10e-10 && Math.abs(v[7] - v[5]) <= 10e-10) return thx.geom._Point.Point_Impl_.distanceToSquared(this.position,other.position);
		return thx.math.Number.integrate(thx.geom.Vertex.getLengthSquaredIntegrand(v),0,1,16);
	}
	,getDistance: function(other) {
		return Math.sqrt(this.getDistanceSquared(other));
	}
	,transform: function(matrix) {
		return new thx.geom.Vertex(thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.position),thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.normal));
	}
	,equals: function(other) {
		return (function($this) {
			var $r;
			var this1 = $this.position;
			var p = other.position;
			$r = this1[0] == p[0] && this1[1] == p[1];
			return $r;
		}(this)) && (function($this) {
			var $r;
			var this2 = $this.normal;
			var p1 = other.normal;
			$r = this2[0] == p1[0] && this2[1] == p1[1];
			return $r;
		}(this));
	}
	,toString: function() {
		return "Vertex " + (function($this) {
			var $r;
			var this1 = $this.position;
			$r = "Point(" + this1[0] + "," + this1[1] + ")";
			return $r;
		}(this)) + ", " + (function($this) {
			var $r;
			var this2 = $this.normal;
			$r = "Point(" + this2[0] + "," + this2[1] + ")";
			return $r;
		}(this));
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
thx.geom.shape = {};
thx.geom.shape._Box = {};
thx.geom.shape._Box.Box_Impl_ = function() { };
thx.geom.shape._Box.Box_Impl_.__name__ = true;
thx.geom.shape._Box.Box_Impl_.fromPoints = function(a,b) {
	var bottomLeft;
	var x = Math.min(a[0],b[0]);
	var y = Math.min(a[1],b[1]);
	bottomLeft = [x,y];
	var topRight;
	var x1 = Math.max(a[0],b[0]);
	var y1 = Math.max(a[1],b[1]);
	topRight = [x1,y1];
	return [bottomLeft,topRight];
};
thx.geom.shape._Box.Box_Impl_._new = function(bottomLeft,topRight) {
	return [bottomLeft,topRight];
};
thx.geom.shape._Box.Box_Impl_.get_topLeft = function(this1) {
	return [this1[0][0],this1[1][1]];
};
thx.geom.shape._Box.Box_Impl_.get_topRight = function(this1) {
	return this1[1];
};
thx.geom.shape._Box.Box_Impl_.get_bottomLeft = function(this1) {
	return this1[0];
};
thx.geom.shape._Box.Box_Impl_.get_bottomRight = function(this1) {
	return [this1[1][0],this1[0][1]];
};
thx.geom.shape._Box.Box_Impl_.get_center = function(this1) {
	return [this1[0][0] + (this1[1][0] - this1[0][0]) / 2,this1[1][1] + (this1[0][1] - this1[1][1]) / 2];
};
thx.geom.shape._Box.Box_Impl_.get_left = function(this1) {
	return this1[0][0];
};
thx.geom.shape._Box.Box_Impl_.get_right = function(this1) {
	return this1[1][0];
};
thx.geom.shape._Box.Box_Impl_.get_top = function(this1) {
	return this1[1][1];
};
thx.geom.shape._Box.Box_Impl_.get_bottom = function(this1) {
	return this1[0][1];
};
thx.geom.shape._Box.Box_Impl_.get_width = function(this1) {
	return this1[1][0] - this1[0][0];
};
thx.geom.shape._Box.Box_Impl_.get_height = function(this1) {
	return this1[0][1] - this1[1][1];
};
thx.geom.shape._Box.Box_Impl_.expandByPoint = function(this1,point) {
	var bottomLeft;
	var this11 = this1[0];
	var x = Math.min(this11[0],point[0]);
	var y = Math.min(this11[1],point[1]);
	bottomLeft = [x,y];
	var topRight;
	var this12 = this1[1];
	var x1 = Math.max(this12[0],point[0]);
	var y1 = Math.max(this12[1],point[1]);
	topRight = [x1,y1];
	return [bottomLeft,topRight];
};
thx.geom.shape._Box.Box_Impl_.toString = function(this1) {
	return "Box(" + [this1[0][0],this1[1][1]][0] + "," + [this1[0][0],this1[1][1]][1] + "," + (this1[1][0] - this1[0][0]) + "," + (this1[0][1] - this1[1][1]) + ")";
};
thx.geom.shape._Box.Box_Impl_.toPath = function(this1) {
	return thx.geom.Path.fromArray([[this1[0][0],this1[1][1]],this1[1],[this1[1][0],this1[0][1]],this1[0]],true);
};
thx.geom.shape._Circle = {};
thx.geom.shape._Circle.Circle_Impl_ = function() { };
thx.geom.shape._Circle.Circle_Impl_.__name__ = true;
thx.geom.shape._Circle.Circle_Impl_._new = function(center,radius) {
	return { center : center, radius : radius};
};
thx.geom.shape._Circle.Circle_Impl_.get_center = function(this1) {
	return this1.center;
};
thx.geom.shape._Circle.Circle_Impl_.get_radius = function(this1) {
	return this1.radius;
};
thx.geom.shape._Circle.Circle_Impl_.toString = function(this1) {
	return "Circle(" + this1.center[0] + "," + this1.center[1] + "," + this1.radius + ")";
};
thx.geom.shape._Circle.Circle_Impl_.toPath = function(this1) {
	var segments = 32;
	var angle = Math.PI / segments;
	var points = [];
	var nodes = [];
	var j;
	var _g1 = 0;
	var _g = segments * 2;
	while(_g1 < _g) {
		var i = _g1++;
		points.push(thx.geom._Point.Point_Impl_.pointAt(this1.center,angle * i,this1.radius));
	}
	nodes.push(new thx.geom.PathNode(points[0],points[1],points[points.length - 1]));
	var _g11 = 1;
	var _g2 = segments - 1;
	while(_g11 < _g2) {
		var i1 = _g11++;
		j = i1 * 2;
		nodes.push(new thx.geom.PathNode(points[j],points[j + 1],points[j - 1]));
	}
	nodes.push(new thx.geom.PathNode(points[points.length - 2],points[points.length - 1],points[points.length - 3]));
	return new thx.geom.Path(nodes,true);
};
thx.math = {};
thx.math.Number = function() { };
thx.math.Number.__name__ = true;
thx.math.Number.isNearZero = function(n) {
	return Math.abs(n) <= 10e-10;
};
thx.math.Number.integrate = function(f,a,b,n) {
	var x = thx.math.Number.abscissas[n - 2];
	var w = thx.math.Number.weights[n - 2];
	var A = 0.5 * (b - a);
	var B = A + a;
	var i = 0;
	var m = n + 1 >> 1;
	var sum;
	if((n & 1) == 1) sum = w[i++] * f(B); else sum = 0;
	var Ax;
	while(i < m) {
		Ax = A * x[i];
		sum += w[i++] * (f(B + Ax) + f(B - Ax));
	}
	return A * sum;
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
thx.geom._Matrix4x4.Matrix4x4_Impl_.unity = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
chad.render.CanvasRender.correctionMatrix = thx.geom._Matrix4x4.Matrix4x4_Impl_.translation([0.5,0.5,1]);
chad.render._CanvasRender.Join_Impl_.miter = "miter";
chad.render._CanvasRender.Join_Impl_.round = "round";
chad.render._CanvasRender.Join_Impl_.bevel = "bevel";
chad.render._CanvasRender.Cap_Impl_.butt = "butt";
chad.render._CanvasRender.Cap_Impl_.round = "round";
chad.render._CanvasRender.Cap_Impl_.square = "square";
thx.geom.Const.EPSILON = 1e-5;
thx.geom.Plane.COPLANAR = 0;
thx.geom.Plane.FRONT = 1;
thx.geom.Plane.BACK = 2;
thx.geom.Plane.SPANNING = 3;
thx.geom._Point3D.Point3D_Impl_.zero = [0,0,0];
thx.geom.OrthoNormalBasis.z0Plane = new thx.geom.OrthoNormalBasis(new thx.geom.Plane([0,0,1],0),[1,0,0]);
thx.geom._Point.Point_Impl_.zero = [0,0];
thx.math.Number.TOLERANCE = 10e-5;
thx.math.Number.EPSILON = 10e-10;
thx.math.Number.abscissas = [[0.5773502691896257645091488],[0,0.7745966692414833770358531],[0.3399810435848562648026658,0.8611363115940525752239465],[0,0.5384693101056830910363144,0.9061798459386639927976269],[0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],[0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],[0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],[0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],[0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],[0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],[0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],[0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],[0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],[0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],[0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]];
thx.math.Number.weights = [[1.0],[0.8888888888888888888888889,0.5555555555555555555555556],[0.6521451548625461426269361,0.3478548451374538573730639],[0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],[0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],[0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],[0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],[0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],[0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],[0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],[0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],[0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],[0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],[0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],[0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]];
Canvas.main();
})();
