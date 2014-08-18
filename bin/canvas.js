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
	var len = 800;
	var xp = thx.geom.Spline.fromArray([[0,0],[len,0]],false);
	var xn = thx.geom.Spline.fromArray([[0,0],[-len,0]],false);
	var yp = thx.geom.Spline.fromArray([[0,0],[0,len]],false);
	var yn = thx.geom.Spline.fromArray([[0,0],[0,-len]],false);
	var r = new chad.render.LineStyle(2,"red");
	var g = new chad.render.LineStyle(2,"green");
	render.drawSpline(xp,chad.render.StrokeStyle.StrokeLine(r));
	render.drawSpline(xn,chad.render.StrokeStyle.StrokeDash([8,8],g));
	render.drawSpline(yp,chad.render.StrokeStyle.StrokeLine(g));
	render.drawSpline(yn,chad.render.StrokeStyle.StrokeDash([8,8],r));
	var line = thx.geom.Line.fromPoints([0,500],[500,0]);
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		render.drawLine(line.offset(i * 10),chad.render.StrokeStyle.StrokeDash([3,4]));
		if(i != 0) render.drawLine(line.offset(-i * 10),chad.render.StrokeStyle.StrokeDot(3));
	}
	var rect = [[50,100],[250,300]];
	render.drawSpline(thx.geom.shape._Box.Box_Impl_.toSpline(rect));
	var rect2 = thx.geom.Transformables.translateY(thx.geom.Transformables.translateX(thx.geom.Transformables.rotateZ(thx.geom.shape._Box.Box_Impl_.toSpline([[100,50],[300,250]]),30 / thx.unit.angle.Const.TO_DEGREE),20),-20);
	render.drawSpline(rect2);
	var intersection = thx.geom.shape._Box.Box_Impl_.toSpline(rect).intersectionsSpline(rect2);
	intersection.map(function(p) {
		render.drawDot(p,null,null,4);
	});
	var circle = { center : [300,250], radius : 100};
	render.drawSpline(thx.geom.shape._Circle.Circle_Impl_.toSpline(circle),chad.render.StrokeStyle.StrokeDot(4));
	var circle1 = { center : [200,200], radius : 80};
	render.drawSpline(thx.geom.shape._Circle.Circle_Impl_.toSpline(circle1),chad.render.StrokeStyle.StrokeDash([4,4,8,4]),chad.render.FillStyle.FillColor("rgba(0,255,155,0.1)"));
	var circle2 = { center : [240,280], radius : 60};
	render.drawSpline(thx.geom.shape._Circle.Circle_Impl_.toSpline(circle2),null,chad.render.FillStyle.FillColor("rgba(100,255,155,0.5)"));
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
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
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var chad = {};
chad.render = {};
chad.render.IRender = function() { };
chad.render.IRender.__name__ = true;
chad.render.BaseRender = function() { };
chad.render.BaseRender.__name__ = true;
chad.render.BaseRender.__interfaces__ = [chad.render.IRender];
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
	if(null == matrix) matrix = thx.geom._Matrix4x4.Matrix4x4_Impl_.identity;
	var halfPixel = thx.geom._Matrix4x4.Matrix4x4_Impl_.translation([0.5,0.5,1]);
	var mirror = thx.geom._Matrix4x4.Matrix4x4_Impl_.mirroring(thx.geom.Transformables.MY);
	var translateY = thx.geom._Matrix4x4.Matrix4x4_Impl_.translation([0,this.height,0]);
	var correctionMatrix = thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(thx.geom._Matrix4x4.Matrix4x4_Impl_.identity,halfPixel),mirror),translateY);
	matrix = thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(matrix,correctionMatrix);
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
	,drawDot: function(point,fill,stroke,size) {
		if(size == null) size = 2;
		var s = this.weightScale(size * 2);
		var s2 = s / 2;
		this.wrap(stroke,fill,(function(f,x,y,a1,a2) {
			return function() {
				return f(x,y,a1,a2);
			};
		})(($_=this.ctx,$bind($_,$_.fillRect)),point[0] - s2,point[1] - s2,s,s));
	}
	,drawSegment: function(a,b,style) {
		var _g = this;
		this.wrap(style,null,function() {
			_g.ctx.moveTo(a[0],a[1]);
			_g.ctx.lineTo(b[0],b[1]);
		});
	}
	,drawLine: function(line,style) {
		var a = line.intersectionLine(this.top);
		var b;
		if(null == a) {
			a = line.intersectionLine(this.left);
			b = line.intersectionLine(this.right);
		} else b = line.intersectionLine(this.bottom);
		this.drawSegment(a,b,style);
	}
	,drawSpline: function(spline,stroke,fill) {
		var _g = this;
		this.wrap(stroke,fill,function() {
			spline.iterate(function(init) {
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
			this.ctx.setLineDash([this.ctx.lineWidth,this.weightScale(spacing)]);
			break;
		}
	}
	,applyFillStyle: function(style) {
		{
			var c = style[2];
			this.ctx.fillStyle = c;
		}
	}
	,__class__: chad.render.CanvasRender
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
chad.render.LineStyle.prototype = {
	__class__: chad.render.LineStyle
};
chad.render._CanvasRender = {};
chad.render._CanvasRender.Join_Impl_ = function() { };
chad.render._CanvasRender.Join_Impl_.__name__ = true;
chad.render._CanvasRender.Cap_Impl_ = function() { };
chad.render._CanvasRender.Cap_Impl_.__name__ = true;
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
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
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
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
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
var thx = {};
thx.core = {};
thx.core.Arrays = function() { };
thx.core.Arrays.__name__ = true;
thx.core.Arrays.same = function(a,b,eq) {
	if(a == null || b == null || a.length != b.length) return false;
	if(null == eq) eq = thx.core.Function.equality;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(!eq(a[i],b[i])) return false;
	}
	return true;
};
thx.core.Arrays.cross = function(a,b) {
	var r = [];
	var _g = 0;
	while(_g < a.length) {
		var va = a[_g];
		++_g;
		var _g1 = 0;
		while(_g1 < b.length) {
			var vb = b[_g1];
			++_g1;
			r.push([va,vb]);
		}
	}
	return r;
};
thx.core.Arrays.crossMulti = function(a) {
	var acopy = a.slice();
	var result = acopy.shift().map(function(v) {
		return [v];
	});
	while(acopy.length > 0) {
		var arr = acopy.shift();
		var tresult = result;
		result = [];
		var _g = 0;
		while(_g < arr.length) {
			var v1 = arr[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < tresult.length) {
				var ar = tresult[_g1];
				++_g1;
				var t = ar.slice();
				t.push(v1);
				result.push(t);
			}
		}
	}
	return result;
};
thx.core.Arrays.pushIf = function(arr,cond,value) {
	if(cond) arr.push(value);
	return arr;
};
thx.core.Arrays.eachPair = function(arr,handler) {
	var _g1 = 0;
	var _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		var _g3 = i;
		var _g2 = arr.length;
		while(_g3 < _g2) {
			var j = _g3++;
			if(!handler(arr[i],arr[j])) return;
		}
	}
};
thx.core.Arrays.mapi = function(arr,handler) {
	return arr.map(handler);
};
thx.core.Arrays.flatMap = function(arr,callback) {
	return thx.core.Arrays.flatten(arr.map(callback));
};
thx.core.Arrays.flatten = function(arr) {
	return Array.prototype.concat.apply([],arr);
};
thx.core.Arrays.reduce = function(arr,callback,initial) {
	return arr.reduce(callback,initial);
};
thx.core.Arrays.reducei = function(arr,callback,initial) {
	return arr.reduce(callback,initial);
};
thx.core.Arrays.order = function(arr,sort) {
	var n = arr.slice();
	n.sort(sort);
	return n;
};
thx.core.Arrays.isEmpty = function(arr) {
	return arr.length == 0;
};
thx.core.Arrays.contains = function(arr,element,eq) {
	if(null == eq) return HxOverrides.indexOf(arr,element,0) >= 0; else {
		var _g1 = 0;
		var _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(eq(arr[i],element)) return true;
		}
		return false;
	}
};
thx.core.Arrays.shuffle = function(a) {
	var t = thx.core.Ints.range(a.length);
	var arr = [];
	while(t.length > 0) {
		var pos = Std.random(t.length);
		var index = t[pos];
		t.splice(pos,1);
		arr.push(a[index]);
	}
	return arr;
};
thx.core.F0 = function() { };
thx.core.F0.__name__ = true;
thx.core.F0.join = function(fa,fb) {
	return function() {
		fa();
		fb();
	};
};
thx.core.F0.once = function(f) {
	return function() {
		f();
		f = function() {
		};
	};
};
thx.core.F1 = function() { };
thx.core.F1.__name__ = true;
thx.core.F1.compose = function(fa,fb) {
	return function(v) {
		return fa(fb(v));
	};
};
thx.core.F1.join = function(fa,fb) {
	return function(v) {
		fa(v);
		fb(v);
	};
};
thx.core.Function = function() { };
thx.core.Function.__name__ = true;
thx.core.Function.equality = function(a,b) {
	return a == b;
};
thx.core.Ints = function() { };
thx.core.Ints.__name__ = true;
thx.core.Ints.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
};
thx.core.Ints.canParse = function(s) {
	return thx.core.Ints.pattern_parse.match(s);
};
thx.core.Ints.min = function(a,b) {
	if(a < b) return a; else return b;
};
thx.core.Ints.max = function(a,b) {
	if(a > b) return a; else return b;
};
thx.core.Ints.parse = function(s) {
	if(HxOverrides.substr(s,0,1) == "+") s = HxOverrides.substr(s,1,null);
	return Std.parseInt(s);
};
thx.core.Ints.compare = function(a,b) {
	return a - b;
};
thx.core.Ints.range = function(start,stop,step) {
	if(step == null) step = 1;
	if(null == stop) {
		stop = start;
		start = 0;
	}
	if((stop - start) / step == Infinity) throw "infinite range";
	var range = [];
	var i = -1;
	var j;
	if(step < 0) while((j = start + step * ++i) > stop) range.push(j); else while((j = start + step * ++i) < stop) range.push(j);
	return range;
};
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
thx.core.Iterators.eachPair = function(it,handler) {
	thx.core.Arrays.eachPair(thx.core.Iterators.toArray(it),handler);
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
thx.geom = {};
thx.geom.Const = function() { };
thx.geom.Const.__name__ = true;
thx.geom.Edge = function() { };
thx.geom.Edge.__name__ = true;
thx.geom.Edge.prototype = {
	__class__: thx.geom.Edge
};
thx.geom.EdgeCubic = function(p0,p1,p2,p3) {
	this.isLinear = false;
	this.first = this.p0 = p0;
	this.p1 = p1;
	this.p2 = p2;
	this.last = this.p3 = p3;
};
thx.geom.EdgeCubic.__name__ = true;
thx.geom.EdgeCubic.__interfaces__ = [thx.geom.Edge];
thx.geom.EdgeCubic.prototype = {
	equals: function(other) {
		if(!js.Boot.__instanceof(other,thx.geom.EdgeCubic)) return false;
		var t = other;
		return thx.geom._Point.Point_Impl_.nearEquals(this.p0,t.p0) && thx.geom._Point.Point_Impl_.nearEquals(this.p1,t.p1) && thx.geom._Point.Point_Impl_.nearEquals(this.p2,t.p2) && thx.geom._Point.Point_Impl_.nearEquals(this.p3,t.p3);
	}
	,matches: function(other) {
		return thx.geom._Point.Point_Impl_.nearEquals(this.first,other.first) && thx.geom._Point.Point_Impl_.nearEquals(this.last,other.last);
	}
	,transform: function(matrix) {
		return new thx.geom.EdgeCubic(thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.p0),thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.p1),thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.p2),thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.p3));
	}
	,flip: function() {
		return new thx.geom.EdgeCubic(this.p3,this.p2,this.p1,this.p0);
	}
	,direction: function() {
		var this1 = this.last;
		var p = this.first;
		var p_0 = -p[0];
		var p_1 = -p[1];
		return [this1[0] + p_0,this1[1] + p_1];
	}
	,intersects: function(other) {
		return this.intersections(other).length > 0;
	}
	,intersections: function(other) {
		if(js.Boot.__instanceof(other,thx.geom.EdgeLinear)) return this.intersectionsEdgeLinear(other); else return this.intersectionsEdgeCubic(other);
	}
	,intersectionsEdgeLinear: function(other) {
		throw "not implemented";
	}
	,intersectionsEdgeCubic: function(other) {
		throw "not implemented";
	}
	,intersectsLine: function(line) {
		return this.intersectionsLine(line).length > 0;
	}
	,intersectionsLine: function(line) {
		throw "not implemented";
	}
	,split: function(v) {
		var node = this.interpolateNode(v);
		if(null == node) return [];
		return [new thx.geom.EdgeCubic(this.p0,this.p1,node.normalIn,node.position),new thx.geom.EdgeCubic(node.position,node.normalOut,this.p2,this.p3)];
	}
	,interpolate: function(v) {
		var n = this.interpolateNode(v);
		if(null == n) return null;
		return n.position;
	}
	,interpolateNode: function(v) {
		throw "not implemented";
	}
	,toArray: function() {
		return [this.p0,this.p1,this.p2,this.p3];
	}
	,toString: function() {
		return "Edge(" + (function($this) {
			var $r;
			var this1 = $this.p0;
			$r = "Point(" + this1[0] + "," + this1[1] + ")";
			return $r;
		}(this)) + "," + (function($this) {
			var $r;
			var this11 = $this.p1;
			$r = "Point(" + this11[0] + "," + this11[1] + ")";
			return $r;
		}(this)) + "," + (function($this) {
			var $r;
			var this12 = $this.p2;
			$r = "Point(" + this12[0] + "," + this12[1] + ")";
			return $r;
		}(this)) + "," + (function($this) {
			var $r;
			var this13 = $this.p3;
			$r = "Point(" + this13[0] + "," + this13[1] + ")";
			return $r;
		}(this)) + ")";
	}
	,get_area: function() {
		throw "not implemented";
	}
	,get_box: function() {
		if(null == this.box) this.box = thx.geom.shape._Box.Box_Impl_.expandByPoints(thx.geom.shape._Box.Box_Impl_.fromPoints(this.p0,this.p1),[this.p2,this.p3]);
		return this.box;
	}
	,get_length: function() {
		if(null == this.length) this.length = Math.sqrt(this.get_lengthSquared());
		return this.length;
	}
	,get_lengthSquared: function() {
		throw "not implemented";
	}
	,__class__: thx.geom.EdgeCubic
};
thx.geom.EdgeLinear = function(p0,p1) {
	this.isLinear = true;
	this.first = this.p0 = p0;
	this.last = this.p1 = p1;
};
thx.geom.EdgeLinear.__name__ = true;
thx.geom.EdgeLinear.__interfaces__ = [thx.geom.Edge];
thx.geom.EdgeLinear.prototype = {
	equals: function(other) {
		if(!js.Boot.__instanceof(other,thx.geom.EdgeLinear)) return false;
		var t = other;
		return thx.geom._Point.Point_Impl_.nearEquals(this.p0,t.p0) && thx.geom._Point.Point_Impl_.nearEquals(this.p1,t.p1);
	}
	,matches: function(other) {
		return thx.geom._Point.Point_Impl_.nearEquals(this.first,other.first) && thx.geom._Point.Point_Impl_.nearEquals(this.last,other.last);
	}
	,transform: function(matrix) {
		return new thx.geom.EdgeLinear(thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.p0),thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.p1));
	}
	,flip: function() {
		return new thx.geom.EdgeLinear(this.p1,this.p0);
	}
	,direction: function() {
		var this1 = this.last;
		var p = this.first;
		var p_0 = -p[0];
		var p_1 = -p[1];
		return [this1[0] + p_0,this1[1] + p_1];
	}
	,intersects: function(other) {
		return this.intersections(other).length > 0;
	}
	,intersections: function(other) {
		if(!thx.geom.shape._Box.Box_Impl_.intersects(this.get_box(),other.get_box())) return [];
		if(js.Boot.__instanceof(other,thx.geom.EdgeLinear)) return this.intersectionsEdgeLinear(other); else return this.intersectionsEdgeCubic(other);
	}
	,intersectionsEdgeLinear: function(other) {
		var ps = this.intersectionsLine(other.get_line());
		if(ps.length == 0 || other.intersectsLine(this.get_line())) return ps; else return [];
	}
	,intersectionsEdgeCubic: function(other) {
		return other.intersectionsEdgeLinear(this);
	}
	,intersectsLine: function(line) {
		return this.intersectionsLine(line).length > 0;
	}
	,intersectionsLine: function(line) {
		var l = thx.geom.Line.fromPoints(this.p0,this.p1);
		var p = l.intersectionLine(line);
		if(null != p) {
			if(this.p0[0] == this.p1[0]) {
				if(p[1] >= (function($this) {
					var $r;
					var this1;
					{
						var this11 = $this.p0;
						var p1 = $this.p1;
						var x = Math.min(this11[0],p1[0]);
						var y = Math.min(this11[1],p1[1]);
						this1 = [x,y];
					}
					$r = this1[1];
					return $r;
				}(this)) && p[1] <= (function($this) {
					var $r;
					var this12;
					{
						var this13 = $this.p0;
						var p2 = $this.p1;
						var x1 = Math.max(this13[0],p2[0]);
						var y1 = Math.max(this13[1],p2[1]);
						this12 = [x1,y1];
					}
					$r = this12[1];
					return $r;
				}(this))) return [p];
			} else if(p[0] >= (function($this) {
				var $r;
				var this14;
				{
					var this15 = $this.p0;
					var p3 = $this.p1;
					var x2 = Math.min(this15[0],p3[0]);
					var y2 = Math.min(this15[1],p3[1]);
					this14 = [x2,y2];
				}
				$r = this14[0];
				return $r;
			}(this)) && p[0] <= (function($this) {
				var $r;
				var this16;
				{
					var this17 = $this.p0;
					var p4 = $this.p1;
					var x3 = Math.max(this17[0],p4[0]);
					var y3 = Math.max(this17[1],p4[1]);
					this16 = [x3,y3];
				}
				$r = this16[0];
				return $r;
			}(this))) return [p];
		}
		return [];
	}
	,split: function(v) {
		var mid = this.interpolate(v);
		return [new thx.geom.EdgeLinear(this.p0,mid),new thx.geom.EdgeLinear(mid,this.p1)];
	}
	,interpolate: function(v) {
		return thx.geom._Point.Point_Impl_.interpolate(this.p0,this.p1,v);
	}
	,interpolateNode: function(v) {
		var p = this.interpolate(v);
		if(null == v) return null;
		return new thx.geom.SplineNode(p,null,null);
	}
	,toArray: function() {
		return [this.p0,this.p1];
	}
	,toString: function() {
		return "Edge(" + (function($this) {
			var $r;
			var this1 = $this.p0;
			$r = "Point(" + this1[0] + "," + this1[1] + ")";
			return $r;
		}(this)) + "," + (function($this) {
			var $r;
			var this11 = $this.p1;
			$r = "Point(" + this11[0] + "," + this11[1] + ")";
			return $r;
		}(this)) + ")";
	}
	,get_area: function() {
		if(null == this.area) {
			var p;
			var this1 = this.p1;
			var p1 = this.p0;
			var p_0 = -p1[0];
			var p_1 = -p1[1];
			p = [this1[0] + p_0,this1[1] + p_1];
			this.area = p[0] * p[1] / 2;
		}
		return this.area;
	}
	,get_box: function() {
		if(null == this.box) this.box = thx.geom.shape._Box.Box_Impl_.fromPoints(this.p0,this.p1);
		return this.box;
	}
	,get_length: function() {
		if(null == this.length) this.length = Math.sqrt(this.get_lengthSquared());
		return this.length;
	}
	,get_lengthSquared: function() {
		if(null == this.lengthSquared) {
			var this1;
			var this11 = this.p1;
			var p = this.p0;
			var p_0 = -p[0];
			var p_1 = -p[1];
			this1 = [this11[0] + p_0,this11[1] + p_1];
			this.lengthSquared = this1[0] * this1[0] + this1[1] * this1[1];
		}
		return this.lengthSquared;
	}
	,get_line: function() {
		if(null == this.line) this.line = thx.geom.Line.fromPoints(this.p0,this.p1);
		return this.line;
	}
	,__class__: thx.geom.EdgeLinear
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
	,intersectionLine: function(line) {
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
	,toString: function() {
		return "Line(" + this.normal[0] + "," + this.normal[1] + ",w:" + this.w + ")";
	}
	,__class__: thx.geom.Line
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
	,__class__: thx.geom.Line3D
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
thx.geom._Matrix4x4.Matrix4x4_Impl_.mirrorX = function() {
	return thx.geom._Matrix4x4.Matrix4x4_Impl_.mirroring(thx.geom.Transformables.MX);
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.mirrorY = function() {
	return thx.geom._Matrix4x4.Matrix4x4_Impl_.mirroring(thx.geom.Transformables.MY);
};
thx.geom._Matrix4x4.Matrix4x4_Impl_.mirrorZ = function() {
	return thx.geom._Matrix4x4.Matrix4x4_Impl_.mirroring(thx.geom.Transformables.MZ);
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
	,__class__: thx.geom.Plane
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
	,__class__: thx.geom.OrthoNormalBasis
};
thx.geom.Path = function(splines) {
	this.splines = splines;
};
thx.geom.Path.__name__ = true;
thx.geom.Path.prototype = {
	contains: function(p) {
		var _g = 0;
		var _g1 = this.splines;
		while(_g < _g1.length) {
			var spline = _g1[_g];
			++_g;
			if(spline.contains(p)) return true;
		}
		return false;
	}
	,union: function(other) {
		throw "not implemented";
	}
	,difference: function(other) {
		throw "not implemented";
	}
	,intersection: function(other) {
		throw "not implemented";
	}
	,transform: function(matrix) {
		return new thx.geom.Path(this.splines.map(function(spline) {
			return spline.transform(matrix);
		}));
	}
	,flip: function() {
		var s = this.splines.map(function(spline) {
			return spline.flip();
		});
		s.reverse();
		return new thx.geom.Path(s);
	}
	,intersectsPath: function(other) {
		return this.intersectionsPath(other).length > 0;
	}
	,intersectsSpline: function(other) {
		return this.intersectionsSpline(other).length > 0;
	}
	,intersectsLine: function(line) {
		return this.intersectionsLine(line).length > 0;
	}
	,intersectionsPath: function(other) {
		return thx.core.Arrays.flatten(this.splines.map(function(spline) {
			return spline.intersectionsPath(other);
		}));
	}
	,intersectionsSpline: function(other) {
		return thx.core.Arrays.flatten(this.splines.map(function(spline) {
			return spline.intersectionsSpline(other);
		}));
	}
	,intersectionsLine: function(line) {
		return thx.core.Arrays.flatten(this.splines.map(function(spline) {
			return spline.intersectionsLine(line);
		}));
	}
	,split: function(value) {
		var len = this.get_length();
		var l;
		var spline;
		var _g1 = 0;
		var _g = this.splines.length;
		while(_g1 < _g) {
			var i = _g1++;
			spline = this.splines[i];
			l = spline.get_length() / len;
			if(value <= l) {
				var n = spline.split(value);
				return [new thx.geom.Path(this.splines.slice(0,i).concat([n[0]])),new thx.geom.Path([n[1]].concat(this.splines.slice(i)))];
			}
			value -= l;
		}
		return [];
	}
	,interpolate: function(value) {
		var len = this.get_length();
		var l;
		var _g = 0;
		var _g1 = this.splines;
		while(_g < _g1.length) {
			var spline = _g1[_g];
			++_g;
			l = spline.get_length() / len;
			if(value <= l) return spline.interpolate(value);
			value -= l;
		}
		return null;
	}
	,hull: function(other) {
		throw "not implemented";
	}
	,minkowsky: function(other) {
		throw "not implemented";
	}
	,toString: function() {
		return "Path(" + this.splines.map(function(s) {
			return "[" + s.toString() + "]";
		}).join(", ") + "," + Std.string(this.get_isClosed()) + ")";
	}
	,get_isClosed: function() {
		if(null == this.isClosed) {
			this.isClosed = true;
			var _g = 0;
			var _g1 = this.splines;
			while(_g < _g1.length) {
				var spline = _g1[_g];
				++_g;
				if(!spline.isClosed) {
					this.isClosed = false;
					break;
				}
			}
		}
		return this.isClosed;
	}
	,get_area: function() {
		if(null == this.area) this.area = this.splines.reduce(function(acc,spline) {
			return acc + spline.get_area();
		},0);
		return this.area;
	}
	,get_length: function() {
		if(null == this.length) this.length = this.splines.reduce(function(acc,spline) {
			return acc + spline.get_length();
		},0);
		return this.length;
	}
	,get_isSelfIntersecting: function() {
		if(null == this.isSelfIntersecting) {
			this.isSelfIntersecting = false;
			var _g = 0;
			var _g1 = this.splines;
			while(_g < _g1.length) {
				var spline = _g1[_g];
				++_g;
				if(spline.get_isSelfIntersecting()) {
					this.isSelfIntersecting = true;
					break;
				}
			}
		}
		return this.isSelfIntersecting;
	}
	,get_box: function() {
		if(null == this.box) {
			if(this.splines.length == 0) return null;
			this.box = this.splines[0].get_box();
			var _g1 = 1;
			var _g = this.splines.length;
			while(_g1 < _g) {
				var i = _g1++;
				var obox = this.splines[i].get_box();
				this.box = thx.geom.shape._Box.Box_Impl_.expandByPoints(this.box,[obox[0],obox[1]]);
			}
		}
		return this.box;
	}
	,__class__: thx.geom.Path
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
	var angle = Math.atan2(this1[1],this1[0]);
	return angle;
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
	,__class__: thx.geom.Polygon
};
thx.geom.Spline = function(nodes,closed) {
	if(closed == null) closed = true;
	this.nodes = nodes;
	this.isClosed = closed;
};
thx.geom.Spline.__name__ = true;
thx.geom.Spline.fromEdges = function(arr,closed) {
	var nodes = [];
	var points;
	if(arr.length > 0) {
		var prev = arr[arr.length - 1].toArray();
		arr.map(function(edge) {
			points = edge.toArray();
			nodes.push(new thx.geom.SplineNode(points[0],points.length == 4?points[1]:null,prev[2]));
			prev = points;
		});
	}
	var spline = new thx.geom.Spline(nodes,closed);
	spline.edges = arr;
	return spline;
};
thx.geom.Spline.fromPoints = function(arr,closed) {
	var nodes = arr.map(function(c) {
		return new thx.geom.SplineNode(c[0],c[1],c[2]);
	});
	return new thx.geom.Spline(nodes,closed);
};
thx.geom.Spline.fromArray = function(arr,closed) {
	var nodes = arr.map(function(c) {
		return new thx.geom.SplineNode(c,null,null);
	});
	return new thx.geom.Spline(nodes,closed);
};
thx.geom.Spline.fromCoords = function(arr,closed) {
	var nodes = arr.map(function(c) {
		var p = [c[0],c[1]];
		var nout;
		if(null == c[2]) nout = thx.geom._Point.Point_Impl_.zero; else nout = [c[2],c[3]];
		var nin;
		if(null == c[4]) nin = thx.geom._Point.Point_Impl_.zero; else nin = [c[4],c[5]];
		return new thx.geom.SplineNode(p,nout,nin);
	});
	return new thx.geom.Spline(nodes,closed);
};
thx.geom.Spline.createEdge = function(a,b,nout,nin) {
	if(null == nout && null == nin) return new thx.geom.EdgeLinear(a,b); else if(null != nout) return new thx.geom.EdgeCubic(a,nout,b,b); else if(null != nin) return new thx.geom.EdgeCubic(a,a,nin,b); else return new thx.geom.EdgeCubic(a,nout,nin,b);
};
thx.geom.Spline.prototype = {
	iterator: function() {
		return HxOverrides.iter(this.nodes);
	}
	,iterate: function(fstart,fit) {
		var a;
		var b;
		if(null != fstart) fstart(this.nodes[0].position);
		var _g1 = 0;
		var _g = this.nodes.length - 1;
		while(_g1 < _g) {
			var i = _g1++;
			a = this.nodes[i];
			b = this.nodes[i + 1];
			fit(a.position,b.position,a.normalOut,b.normalIn);
		}
		if(this.isClosed) {
			a = this.nodes[this.nodes.length - 1];
			b = this.nodes[0];
			fit(a.position,b.position,a.normalOut,b.normalIn);
		}
	}
	,iterateEdges: function(f) {
		this.get_edges().map(f);
	}
	,get_edges: function() {
		var _g = this;
		if(null == this.edges) {
			this.edges = [];
			this.iterate(null,function(a,b,nout,nin) {
				_g.get_edges().push(thx.geom.Spline.createEdge(a,b,nout,nin));
			});
		}
		return this.edges;
	}
	,transform: function(matrix) {
		var ismirror = thx.geom._Matrix4x4.Matrix4x4_Impl_.isMirroring(matrix);
		var result = new thx.geom.Spline(thx.core.Iterators.map(this.iterator(),function(node) {
			return node.transform(matrix);
		}),this.isClosed);
		if(ismirror) result = result.flip();
		return result;
	}
	,flip: function() {
		var arr = thx.core.Iterators.map(this.iterator(),function(node) {
			return node.flip();
		});
		arr.reverse();
		return new thx.geom.Spline(arr,this.isClosed);
	}
	,contains: function(p) {
		throw "not implemented";
	}
	,selfIntersections: function() {
		var intersections = [];
		thx.core.Arrays.eachPair(this.get_edges(),function(a,b) {
			intersections = intersections.concat(a.intersections(b));
			return true;
		});
		return intersections;
	}
	,intersectsPath: function(other) {
		return this.intersectionsPath(other).length > 0;
	}
	,intersectsSpline: function(other) {
		return this.intersectionsSpline(other).length > 0;
	}
	,intersectsLine: function(line) {
		return this.intersectionsLine(line).length > 0;
	}
	,intersectionsPath: function(other) {
		return other.intersectionsSpline(this);
	}
	,intersectionsSpline: function(other) {
		return thx.core.Arrays.flatten(this.get_edges().map(function(a) {
			return thx.core.Arrays.flatten(other.get_edges().map(function(b) {
				return a.intersections(b);
			}));
		}));
	}
	,intersectionsLine: function(line) {
		return thx.core.Arrays.flatten(this.get_edges().map(function(edge) {
			return edge.intersectionsLine(line);
		}));
	}
	,split: function(value) {
		if(value < 0 || value > 1) return null;
		var len = this.get_length();
		var nor;
		var edge;
		var edges = this.get_edges();
		var _g1 = 0;
		var _g = edges.length;
		while(_g1 < _g) {
			var i = _g1++;
			edge = edges[i];
			nor = edge.get_length() / len;
			if(value <= nor) {
				var n = edge.split(value);
				return [thx.geom.Spline.fromEdges(edges.slice(0,i).concat([n[0]]),this.isClosed),thx.geom.Spline.fromEdges([n[1]].concat(edges.slice(i + 1)),this.isClosed)];
			}
			value -= nor;
		}
		return [];
	}
	,interpolate: function(value) {
		if(value < 0 || value > 1) return null;
		var len = this.get_length();
		var nor;
		var _g = 0;
		var _g1 = this.get_edges();
		while(_g < _g1.length) {
			var edge = _g1[_g];
			++_g;
			nor = edge.get_length() / len;
			if(value <= nor) return edge.interpolate(value);
			value -= nor;
		}
		return null;
	}
	,toString: function() {
		return "Spline(" + this.nodes.map(function(n) {
			return "[" + n.toStringValues() + "]";
		}).join(", ") + "," + Std.string(this.isClosed) + ")";
	}
	,toPath: function() {
		return new thx.geom.Path([this]);
	}
	,get_area: function() {
		var _g = this;
		if(null == this.area) {
			this.area = 0;
			this.iterateEdges(function(edge) {
				_g.area += edge.get_area();
			});
		}
		return this.area;
	}
	,get_length: function() {
		var _g = this;
		if(null == this.length) {
			this.length = 0;
			this.iterateEdges(function(edge) {
				_g.length += edge.get_length();
			});
		}
		return this.length;
	}
	,get_isSelfIntersecting: function() {
		var _g = this;
		if(null == this.isSelfIntersecting) {
			var edges = this.get_edges();
			this.isSelfIntersecting = false;
			thx.core.Arrays.eachPair(edges,function(a,b) {
				return !(_g.isSelfIntersecting = a.intersects(b));
			});
		}
		return this.isSelfIntersecting;
	}
	,get_isPolygon: function() {
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			if((function($this) {
				var $r;
				var this1 = node.normalIn;
				$r = !(this1[0] == null[0] && this1[1] == null[1]);
				return $r;
			}(this)) || (function($this) {
				var $r;
				var this11 = node.normalOut;
				$r = !(this11[0] == null[0] && this11[1] == null[1]);
				return $r;
			}(this))) return false;
		}
		return true;
	}
	,get_isEmpty: function() {
		return this.nodes.length > 1;
	}
	,get_box: function() {
		var _g = this;
		if(null == this.box) {
			if(this.nodes.length > 0) {
				this.box = [this.nodes[0].position,this.nodes[0].position];
				this.iterate(null,function(a,b,nout,nin) {
					_g.box = thx.geom.shape._Box.Box_Impl_.expandByPoints(_g.get_box(),[a,b,nout,nin]);
				});
			}
		}
		return this.box;
	}
	,__class__: thx.geom.Spline
};
thx.geom.SplineNode = function(position,normalout,normalin) {
	this.position = position;
	if(null == normalout || thx.geom._Point.Point_Impl_.nearEquals(normalout,position)) this.normalOut = null; else this.normalOut = normalout;
	if(null == normalin || thx.geom._Point.Point_Impl_.nearEquals(normalin,position)) this.normalIn = null; else this.normalIn = normalin;
};
thx.geom.SplineNode.__name__ = true;
thx.geom.SplineNode.prototype = {
	transform: function(matrix) {
		return new thx.geom.SplineNode(thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.position),null != this.normalIn?thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.normalIn):null,null != this.normalOut?thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.normalOut):null);
	}
	,flip: function() {
		return new thx.geom.SplineNode(this.position,this.normalIn,this.normalOut);
	}
	,toStringValues: function() {
		var nout;
		if(null == this.normalOut) nout = "null"; else nout = "" + this.normalOut[1] + "," + this.normalOut[1];
		var nin;
		if(null == this.normalIn) nin = "null"; else nin = "" + this.normalIn[1] + "," + this.normalIn[1];
		return "" + this.position[0] + "," + this.position[1] + "," + nout + "," + nin;
	}
	,toString: function() {
		return "SplineNode(" + this.toStringValues() + ")";
	}
	,__class__: thx.geom.SplineNode
};
thx.geom.Transformables = function() { };
thx.geom.Transformables.__name__ = true;
thx.geom.Transformables.mirror = function(t,plane) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.mirroring(plane));
};
thx.geom.Transformables.mirrorX = function(t) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.mirroring(thx.geom.Transformables.MX));
};
thx.geom.Transformables.mirrorY = function(t) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.mirroring(thx.geom.Transformables.MY));
};
thx.geom.Transformables.mirrorZ = function(t) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.mirroring(thx.geom.Transformables.MZ));
};
thx.geom.Transformables.translate = function(t,v) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.translation(v));
};
thx.geom.Transformables.translateX = function(t,x) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.translation([x,0,0]));
};
thx.geom.Transformables.translateY = function(t,y) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.translation([0,y,0]));
};
thx.geom.Transformables.translateZ = function(t,z) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.translation([0,0,z]));
};
thx.geom.Transformables.scale = function(t,f) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.scaling(f));
};
thx.geom.Transformables.rotateX = function(t,angle) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.rotationX(angle));
};
thx.geom.Transformables.rotateY = function(t,angle) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.rotationY(angle));
};
thx.geom.Transformables.rotateZ = function(t,angle) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.rotationZ(angle));
};
thx.geom.Transformables.rotateOnAxis = function(t,center,axis,angle) {
	return t.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.rotation(center,axis,angle));
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
	,__class__: thx.geom.Vertex3D
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
	return [this1[0][0] + (this1[1][0] - this1[0][0]) / 2,this1[1][1] + (this1[1][1] - this1[0][1]) / 2];
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
	return this1[1][1] - this1[0][1];
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
thx.geom.shape._Box.Box_Impl_.expandByPoints = function(this1,points) {
	var min = this1[0];
	var max = this1[1];
	var $it0 = $iterator(points)();
	while( $it0.hasNext() ) {
		var point = $it0.next();
		var x = Math.min(min[0],point[0]);
		var y = Math.min(min[1],point[1]);
		min = [x,y];
		var x1 = Math.max(max[0],point[0]);
		var y1 = Math.max(max[1],point[1]);
		max = [x1,y1];
	}
	return [min,max];
};
thx.geom.shape._Box.Box_Impl_.intersects = function(this1,other) {
	return this1[1][0] >= other[0][0] && this1[0][0] <= other[1][0] || this1[0][1] >= other[1][1] && this1[1][1] <= other[0][1];
};
thx.geom.shape._Box.Box_Impl_.equals = function(this1,other) {
	return (function($this) {
		var $r;
		var this11 = this1[0];
		var p = other[0];
		$r = this11[0] == p[0] && this11[1] == p[1];
		return $r;
	}(this)) && (function($this) {
		var $r;
		var this12 = this1[1];
		var p1 = other[1];
		$r = this12[0] == p1[0] && this12[1] == p1[1];
		return $r;
	}(this));
};
thx.geom.shape._Box.Box_Impl_.toString = function(this1) {
	return "Box(x:" + this1[0][0] + ",y:" + this1[1][1] + ",w:" + (this1[1][0] - this1[0][0]) + ",h:" + (this1[1][1] - this1[0][1]) + ")";
};
thx.geom.shape._Box.Box_Impl_.toSpline = function(this1) {
	return thx.geom.Spline.fromArray([[this1[0][0],this1[1][1]],this1[1],[this1[1][0],this1[0][1]],this1[0]],true);
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
thx.geom.shape._Circle.Circle_Impl_.toSpline = function(this1) {
	return thx.geom.Transformables.translate(thx.geom.shape._Circle.Circle_Impl_.unitaryCircle.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.scaling([this1.radius,this1.radius,1])),[this1.center[0],this1.center[1],0]);
};
thx.unit = {};
thx.unit.angle = {};
thx.unit.angle.Const = function() { };
thx.unit.angle.Const.__name__ = true;
thx.unit.angle._Degree = {};
thx.unit.angle._Degree.Degree_Impl_ = function() { };
thx.unit.angle._Degree.Degree_Impl_.__name__ = true;
thx.unit.angle._Degree.Degree_Impl_.fromFloat = function(angle) {
	return angle;
};
thx.unit.angle._Degree.Degree_Impl_._new = function(degrees) {
	return degrees;
};
thx.unit.angle._Degree.Degree_Impl_.cos = function(this1) {
	return Math.cos(this1 / thx.unit.angle.Const.TO_DEGREE);
};
thx.unit.angle._Degree.Degree_Impl_.sin = function(this1) {
	return Math.sin(this1 / thx.unit.angle.Const.TO_DEGREE);
};
thx.unit.angle._Degree.Degree_Impl_.toString = function(this1) {
	return "" + this1 + "̊";
};
thx.unit.angle._Degree.Degree_Impl_.toRadians = function(this1) {
	return this1 / thx.unit.angle.Const.TO_DEGREE;
};
thx.unit.angle._Degree.Degree_Impl_.toFloat = function(this1) {
	return this1;
};
thx.unit.angle._Degree.Degree_Impl_.negate = function(this1) {
	return -this1;
};
thx.unit.angle._Degree.Degree_Impl_.multiply = function(this1,v) {
	return this1 * v;
};
thx.unit.angle._Degree.Degree_Impl_.divide = function(this1,v) {
	return this1 / v;
};
thx.unit.angle._Degree.Degree_Impl_.add = function(this1,r) {
	return this1 + r;
};
thx.unit.angle._Degree.Degree_Impl_.addFloat = function(this1,v) {
	return this1 + v;
};
thx.unit.angle._Degree.Degree_Impl_.subtract = function(this1,r) {
	return this1 + -r;
};
thx.unit.angle._Degree.Degree_Impl_.subtractFloat = function(this1,v) {
	return this1 + -v;
};
thx.unit.angle._Degree.Degree_Impl_.equals = function(this1,v) {
	return this1 == v;
};
thx.unit.angle.FloatDegree = function() { };
thx.unit.angle.FloatDegree.__name__ = true;
thx.unit.angle.FloatDegree.toDegrees = function(v) {
	return v;
};
thx.unit.angle._Radian = {};
thx.unit.angle._Radian.Radian_Impl_ = function() { };
thx.unit.angle._Radian.Radian_Impl_.__name__ = true;
thx.unit.angle._Radian.Radian_Impl_.fromFloat = function(angle) {
	return angle;
};
thx.unit.angle._Radian.Radian_Impl_._new = function(radians) {
	return radians;
};
thx.unit.angle._Radian.Radian_Impl_.cos = function(this1) {
	return Math.cos(this1);
};
thx.unit.angle._Radian.Radian_Impl_.sin = function(this1) {
	return Math.sin(this1);
};
thx.unit.angle._Radian.Radian_Impl_.toString = function(this1) {
	return "" + this1 + "rad";
};
thx.unit.angle._Radian.Radian_Impl_.toDegrees = function(this1) {
	return this1 * thx.unit.angle.Const.TO_DEGREE;
};
thx.unit.angle._Radian.Radian_Impl_.toFloat = function(this1) {
	return this1;
};
thx.unit.angle._Radian.Radian_Impl_.negate = function(this1) {
	return -this1;
};
thx.unit.angle._Radian.Radian_Impl_.multiply = function(this1,v) {
	return this1 * v;
};
thx.unit.angle._Radian.Radian_Impl_.divide = function(this1,v) {
	return this1 / v;
};
thx.unit.angle._Radian.Radian_Impl_.add = function(this1,r) {
	return this1 + r;
};
thx.unit.angle._Radian.Radian_Impl_.addFloat = function(this1,v) {
	return this1 + v;
};
thx.unit.angle._Radian.Radian_Impl_.subtract = function(this1,r) {
	return this1 + -r;
};
thx.unit.angle._Radian.Radian_Impl_.subtractFloat = function(this1,v) {
	return this1 + -v;
};
thx.unit.angle._Radian.Radian_Impl_.equals = function(this1,v) {
	return this1 == v;
};
thx.unit.angle.FloatRadian = function() { };
thx.unit.angle.FloatRadian.__name__ = true;
thx.unit.angle.FloatRadian.toRadians = function(v) {
	return v;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
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
chad.render._CanvasRender.Join_Impl_.miter = "miter";
chad.render._CanvasRender.Join_Impl_.round = "round";
chad.render._CanvasRender.Join_Impl_.bevel = "bevel";
chad.render._CanvasRender.Cap_Impl_.butt = "butt";
chad.render._CanvasRender.Cap_Impl_.round = "round";
chad.render._CanvasRender.Cap_Impl_.square = "square";
thx.core.Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
thx.geom.Const.EPSILON = 1e-5;
thx.geom.Const.KAPPA = 0.5522847498307936;
thx.geom._Matrix4x4.Matrix4x4_Impl_.identity = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
thx.geom.Plane.COPLANAR = 0;
thx.geom.Plane.FRONT = 1;
thx.geom.Plane.BACK = 2;
thx.geom.Plane.SPANNING = 3;
thx.geom._Point3D.Point3D_Impl_.zero = [0,0,0];
thx.geom.OrthoNormalBasis.z0Plane = new thx.geom.OrthoNormalBasis(new thx.geom.Plane([0,0,1],0),[1,0,0]);
thx.geom._Point.Point_Impl_.zero = [0,0];
thx.geom.Transformables.MX = new thx.geom.Plane([1,0,0],0);
thx.geom.Transformables.MY = new thx.geom.Plane([0,1,0],0);
thx.geom.Transformables.MZ = new thx.geom.Plane([0,0,1],0);
thx.geom.shape._Circle.Circle_Impl_.unitaryCircle = new thx.geom.Spline([new thx.geom.SplineNode([1,0],[1,-0.552284749830793564],[1,0.5522847498307936]),new thx.geom.SplineNode([0,-1],[-0.552284749830793564,-1],[0.5522847498307936,-1]),new thx.geom.SplineNode([-1,0],[-1,0.5522847498307936],[-1,-0.552284749830793564]),new thx.geom.SplineNode([0,1],[0.5522847498307936,1],[-0.552284749830793564,1])],true);
thx.unit.angle.Const.TO_DEGREE = 180 / Math.PI;
Canvas.main();
})();
