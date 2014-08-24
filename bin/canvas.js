(function () { "use strict";
var Canvas = function() { };
Canvas.__name__ = true;
Canvas.main = function() {
	var canvas = window.document.querySelector("canvas");
	var graphics = chad.render.canvas.CanvasGraphics.scaled(canvas,2);
	var r = new chad.render.Render(graphics);
	var len = 800;
	var xp = thx.geom.Spline.fromArray([[0,0],[len,0]],false);
	var xn = thx.geom.Spline.fromArray([[0,0],[-len,0]],false);
	var yp = thx.geom.Spline.fromArray([[0,0],[0,len]],false);
	var yn = thx.geom.Spline.fromArray([[0,0],[0,-len]],false);
	var red = new chad.render.LineStyle(2,thx.color._RGBA.RGBA_Impl_.fromString("#f00"));
	var green = new chad.render.LineStyle(2,thx.color._RGBA.RGBA_Impl_.fromString("#0f0"));
	r.drawSpline(xp,chad.render.StrokeStyle.StrokeLine(red));
	r.drawSpline(xn,chad.render.StrokeStyle.StrokeDash([8,8],green));
	r.drawSpline(yp,chad.render.StrokeStyle.StrokeLine(green));
	r.drawSpline(yn,chad.render.StrokeStyle.StrokeDash([8,8],red));
	var line = thx.geom.Line.fromPoints([0,500],[500,0]);
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		r.drawLine(line.offset(i * 10),chad.render.StrokeStyle.StrokeDash([3,4]));
		if(i != 0) r.drawLine(line.offset(-i * 10),chad.render.StrokeStyle.StrokeDot(3));
	}
	line = thx.geom.Line.fromPoints([0,120],[500,120]);
	r.drawLine(line,chad.render.StrokeStyle.StrokeLine(new chad.render.LineStyle(2)));
	line = thx.geom.Line.fromPoints([120,0],[120,100]);
	r.drawLine(line,chad.render.StrokeStyle.StrokeLine(new chad.render.LineStyle(3)));
	line = thx.geom.Line.fromPoints([0,100],[500,200]);
	r.drawLine(line,chad.render.StrokeStyle.StrokeLine(new chad.render.LineStyle(4)));
	var rect = [[50,100],[250,300]];
	r.drawSpline(thx.geom.shape._Box.Box_Impl_.toSpline(rect));
	var rect2 = thx.geom.Transformables.translateY(thx.geom.Transformables.translateX(thx.geom.Transformables.rotateZ(thx.geom.shape._Box.Box_Impl_.toSpline([[100,50],[300,250]]),30 / thx.unit.angle.Const.TO_DEGREE),20),-20);
	r.drawSpline(rect2);
	var intersection = thx.geom.shape._Box.Box_Impl_.toSpline(rect).intersectionsSpline(rect2);
	intersection.map(function(p) {
		r.drawDot(p,null,null,4);
	});
	var arc = thx.geom.Transformables.translateY(thx.geom.Transformables.translateX(thx.geom.Transformables.scale(new thx.geom.EdgeCubic([0,0],[0,0.5522847498307936],[0.447715250169206436,1],[1,1]),[200,200,1]),50),50);
	var s = arc.subdivide();
	s[1] = s[1].transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.translation([2,0,0]));
	r.drawSpline(thx.geom.Spline.fromEdges([s[0]],false),chad.render.StrokeStyle.StrokeLine(new chad.render.LineStyle(3)));
	r.drawSpline(thx.geom.Spline.fromEdges([s[1]],false),chad.render.StrokeStyle.StrokeLine(new chad.render.LineStyle(3)));
	r.drawSpline(thx.geom.Transformables.translateY(arc.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.translation([20,0,0])),-20).toSpline(),chad.render.StrokeStyle.StrokeLine(new chad.render.LineStyle(10)));
	r.drawSpline(thx.geom.Transformables.translateY(thx.geom.Transformables.translateX(arc.toSpline().toLinear(),20),-20),chad.render.StrokeStyle.StrokeLine(new chad.render.LineStyle(2,thx.color._RGBA.RGBA_Impl_.fromString("#fff"))));
	var e = [thx.geom.Transformables.translate(thx.geom.Transformables.scale(new thx.geom.EdgeCubic([0,0],[0,0.5522847498307936],[0.447715250169206436,1],[1,1]),[200,200,1]),[40,40,0]),thx.geom.Transformables.translate(thx.geom.Transformables.scale(new thx.geom.EdgeCubic([1,1],[1.55228474983079368,1],[2,0.5522847498307936],[2,0]),[200,200,1]),[40,40,0])];
	var c = thx.geom.Transformables.scale(thx.geom.Spline.fromEdges(e,false),[0.4,0.4,1]);
	r.drawSpline(c,chad.render.StrokeStyle.StrokeLine(new chad.render.LineStyle(8,(function($this) {
		var $r;
		var this1 = thx.color.Color.red;
		var this2 = thx.color._RGBA.RGBA_Impl_.toRGBXA(-16777216 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255);
		$r = thx.color._RGBA.RGBA_Impl_.fromFloats(this2[0],this2[1],this2[2],this2[3]);
		return $r;
	}(this)))));
	r.drawSpline(c.toLinear(),chad.render.StrokeStyle.StrokeDash([5,5],new chad.render.LineStyle(4,(function($this) {
		var $r;
		var this3 = thx.color.Color.lime;
		var this4 = thx.color._RGBA.RGBA_Impl_.toRGBXA(-16777216 | (this3 >> 16 & 255 & 255) << 16 | (this3 >> 8 & 255 & 255) << 8 | this3 & 255 & 255);
		$r = thx.color._RGBA.RGBA_Impl_.fromFloats(this4[0],this4[1],this4[2],this4[3]);
		return $r;
	}(this)))));
	r.drawSpline(e[0].toSpline().toLinear(),chad.render.StrokeStyle.StrokeDash([8,4],new chad.render.LineStyle(4,(function($this) {
		var $r;
		var this5 = thx.color.Color.orange;
		var this6 = thx.color._RGBA.RGBA_Impl_.toRGBXA(-16777216 | (this5 >> 16 & 255 & 255) << 16 | (this5 >> 8 & 255 & 255) << 8 | this5 & 255 & 255);
		$r = thx.color._RGBA.RGBA_Impl_.fromFloats(this6[0],this6[1],this6[2],this6[3]);
		return $r;
	}(this)))));
	var circle1 = { center : [300,250], radius : 100};
	r.drawSpline(thx.geom.shape._Circle.Circle_Impl_.toSpline(circle1).toLinear());
	var circle2 = { center : [200,200], radius : 80};
	r.drawSpline(thx.geom.shape._Circle.Circle_Impl_.toSpline(circle2),chad.render.StrokeStyle.StrokeDash([4,4,8,4]),chad.render.FillStyle.FillColor(thx.color._RGBA.RGBA_Impl_.fromString("rgba(0,255,155,0.1)")));
	var circle3 = { center : [240,280], radius : 60};
	r.drawSpline(thx.geom.shape._Circle.Circle_Impl_.toSpline(circle3),chad.render.StrokeStyle.StrokeDot(4),chad.render.FillStyle.FillColor(thx.color._RGBA.RGBA_Impl_.fromString("rgba(100,255,155,0.5)")));
	var path = new thx.geom.Path([thx.geom.shape._Circle.Circle_Impl_.toSpline(circle1),thx.geom.shape._Circle.Circle_Impl_.toSpline(circle2),thx.geom.shape._Circle.Circle_Impl_.toSpline(circle3)]);
	thx.geom.shape._Circle.Circle_Impl_.toSpline(circle2).intersectionsSpline(thx.geom.shape._Box.Box_Impl_.toSpline(rect)).map(function(point) {
		r.drawDot(point,chad.render.FillStyle.FillColor(thx.color._RGBA.RGBA_Impl_.fromString("#aa3300")),null,6);
	});
	path.selfIntersections().map(function(point1) {
		r.drawDot(point1,chad.render.FillStyle.FillColor(thx.color._RGBA.RGBA_Impl_.fromString("#aa3300")),null,4);
	});
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
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
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
var IMap = function() { };
IMap.__name__ = true;
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
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
var chad = {};
chad.render = {};
chad.render._Cap = {};
chad.render._Cap.Cap_Impl_ = function() { };
chad.render._Cap.Cap_Impl_.__name__ = true;
chad.render.FillStyle = { __ename__ : true, __constructs__ : ["FillColor"] };
chad.render.FillStyle.FillColor = function(c) { var $x = ["FillColor",0,c]; $x.__enum__ = chad.render.FillStyle; return $x; };
chad.render.IGraphics = function() { };
chad.render.IGraphics.__name__ = true;
chad.render.IGraphics.prototype = {
	__class__: chad.render.IGraphics
};
chad.render._Join = {};
chad.render._Join.Join_Impl_ = function() { };
chad.render._Join.Join_Impl_.__name__ = true;
chad.render.LineStyle = function(width,color,join,cap) {
	if(cap == null) cap = "butt";
	if(join == null) join = "miter";
	if(width == null) width = 1.0;
	this.width = width;
	if(null == color) this.color = color = chad.render.LineStyle.defaultColor; else this.color = color;
	this.join = join;
	this.cap = cap;
};
chad.render.LineStyle.__name__ = true;
chad.render.LineStyle.prototype = {
	__class__: chad.render.LineStyle
};
chad.render.Render = function(graphics) {
	this.g = graphics;
	this.g.applyStrokeStyle(chad.render.StrokeStyle.StrokeLine(new chad.render.LineStyle()));
	this.g.applyFillStyle(chad.render.FillStyle.FillColor(thx.color._RGBA.RGBA_Impl_.fromString("#000000")));
};
chad.render.Render.__name__ = true;
chad.render.Render.prototype = {
	drawDot: function(point,fill,stroke,size) {
		if(size == null) size = 2;
		size = this.g.weightScale(size);
		var spline = thx.geom.Transformables.translate(thx.geom.shape._Circle.Circle_Impl_.unitaryCircle.transform(thx.geom._Matrix4x4.Matrix4x4_Impl_.scaling([size,size,1])),[point[0],point[1],1]);
		this.drawSpline(spline,stroke,fill);
	}
	,drawSegment: function(a,b,style) {
		var _g = this;
		this.g.wrap(style,null,function() {
			_g.g.moveTo(a);
			_g.g.lineTo(b);
		});
	}
	,drawLine: function(line,style) {
		var box = this.g.get_reverseCoords();
		var deg;
		deg = (function($this) {
			var $r;
			var this1;
			{
				var this2 = line.normal;
				var angle = Math.atan2(this2[1],this2[0]);
				this1 = angle;
			}
			$r = this1;
			return $r;
		}(this)) % Math.PI;
		var a;
		var b;
		if(deg < Math.PI / 4) {
			a = line.intersectionLine(new thx.geom.Line([0,1],box[1][1]));
			b = line.intersectionLine(new thx.geom.Line([0,1],box[0][1]));
		} else {
			a = line.intersectionLine(new thx.geom.Line([1,0],box[0][0]));
			b = line.intersectionLine(new thx.geom.Line([1,0],box[1][0]));
		}
		this.drawSegment(a,b,style);
	}
	,drawSpline: function(spline,stroke,fill) {
		var _g = this;
		this.g.wrap(stroke,fill,function() {
			spline.iterate(function(init) {
				_g.g.moveTo(init);
			},function(a,b,nout,nin) {
				if(null == nout && null == nin) _g.g.lineTo(b); else {
					if(null == nout) nout = a; else if(null == nin) nin = b;
					_g.g.curveTo(b,nout,nin);
				}
			});
		});
	}
	,lineTo: function(point) {
		this.g.lineTo(point);
	}
	,curveTo: function(point,cout,cin) {
		this.g.curveTo(point,cout,cin);
	}
	,moveTo: function(point) {
		this.g.moveTo(point);
	}
	,applyStrokeStyle: function(style) {
		this.g.applyStrokeStyle(style);
	}
	,applyFillStyle: function(style) {
		this.g.applyFillStyle(style);
	}
	,__class__: chad.render.Render
};
chad.render.StrokeStyle = { __ename__ : true, __constructs__ : ["StrokeLine","StrokeDash","StrokeDot"] };
chad.render.StrokeStyle.StrokeLine = function(style) { var $x = ["StrokeLine",0,style]; $x.__enum__ = chad.render.StrokeStyle; return $x; };
chad.render.StrokeStyle.StrokeDash = function(pattern,style) { var $x = ["StrokeDash",1,pattern,style]; $x.__enum__ = chad.render.StrokeStyle; return $x; };
chad.render.StrokeStyle.StrokeDot = function(spacing,style) { var $x = ["StrokeDot",2,spacing,style]; $x.__enum__ = chad.render.StrokeStyle; return $x; };
chad.render.canvas = {};
chad.render.canvas.CanvasGraphics = function(canvas,matrix,weightScale) {
	this.width = canvas.width;
	this.height = canvas.height;
	this.ctx = canvas.getContext("2d");
	if(null == weightScale) this.weightScale = function(v) {
		return v;
	}; else this.weightScale = weightScale;
	var halfPixel = thx.geom._Matrix4x4.Matrix4x4_Impl_.translation([0.5,0.5,1]);
	var mirror = thx.geom._Matrix4x4.Matrix4x4_Impl_.mirroring(thx.geom.Transformables.MY);
	var translateY = thx.geom._Matrix4x4.Matrix4x4_Impl_.translation([0,this.height,0]);
	var correctionMatrix = thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(thx.geom._Matrix4x4.Matrix4x4_Impl_.identity,halfPixel),mirror),translateY);
	this.matrix = thx.geom._Matrix4x4.Matrix4x4_Impl_.multiply(null == matrix?thx.geom._Matrix4x4.Matrix4x4_Impl_.identity:matrix,correctionMatrix);
	this.ctx.transform(this.matrix[0],this.matrix[1],this.matrix[4],this.matrix[5],this.matrix[12],this.matrix[13]);
};
chad.render.canvas.CanvasGraphics.__name__ = true;
chad.render.canvas.CanvasGraphics.__interfaces__ = [chad.render.IGraphics];
chad.render.canvas.CanvasGraphics.scaled = function(canvas,scale) {
	return new chad.render.canvas.CanvasGraphics(canvas,thx.geom._Matrix4x4.Matrix4x4_Impl_.scaling([scale,scale,1]),function(v) {
		return v / scale;
	});
};
chad.render.canvas.CanvasGraphics.prototype = {
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
		var this1 = style.color;
		this.ctx.strokeStyle = "rgba(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + "," + (this1 >> 24 & 255) / 255 + ")";
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
			this.ctx.fillStyle = "rgba(" + (c >> 16 & 255) + "," + (c >> 8 & 255) + "," + (c & 255) + "," + (c >> 24 & 255) / 255 + ")";
		}
	}
	,get_reverseCoords: function() {
		if(null == this.reverseCoords) {
			var inverted = thx.geom._Matrix4x4.Matrix4x4_Impl_.inverse(this.matrix);
			if(null == inverted) throw "unable to inverse coords matrix";
			this.reverseCoords = thx.geom.shape._Box.Box_Impl_.transform([thx.geom._Point.Point_Impl_.zero,[this.width,this.height]],inverted);
		}
		return this.reverseCoords;
	}
	,__class__: chad.render.canvas.CanvasGraphics
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
	,__class__: haxe.ds.StringMap
};
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
thx.color = {};
thx.color._CMYK = {};
thx.color._CMYK.CMYK_Impl_ = function() { };
thx.color._CMYK.CMYK_Impl_.__name__ = true;
thx.color._CMYK.CMYK_Impl_.fromString = function(color) {
	var info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "cmyk":
			var channels = thx.color.parse.ColorParser.getFloatChannels(info.channels,4);
			return channels;
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._CMYK.CMYK_Impl_.fromFloats = function(cyan,magenta,yellow,black) {
	return [cyan < 0?0:cyan > 1?1:cyan,magenta < 0?0:magenta > 1?1:magenta,yellow < 0?0:yellow > 1?1:yellow,black < 0?0:black > 1?1:black];
};
thx.color._CMYK.CMYK_Impl_._new = function(channels) {
	return channels;
};
thx.color._CMYK.CMYK_Impl_.toGrey = function(this1) {
	var this2;
	var channels = [thx.core.Floats.normalize(1 - this1[0] - this1[3]),thx.core.Floats.normalize(1 - this1[1] - this1[3]),thx.core.Floats.normalize(1 - this1[2] - this1[3])];
	this2 = channels;
	var grey = this2[0] * .2126 + this2[1] * .7152 + this2[2] * .0722;
	var this3;
	if(grey < 0) this3 = 0; else if(grey > 1) this3 = 1; else this3 = grey;
	return this3;
};
thx.color._CMYK.CMYK_Impl_.toHSL = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toHSL((function($this) {
		var $r;
		var channels = [thx.core.Floats.normalize(1 - this1[0] - this1[3]),thx.core.Floats.normalize(1 - this1[1] - this1[3]),thx.core.Floats.normalize(1 - this1[2] - this1[3])];
		$r = channels;
		return $r;
	}(this)));
};
thx.color._CMYK.CMYK_Impl_.toHSV = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toHSV((function($this) {
		var $r;
		var channels = [thx.core.Floats.normalize(1 - this1[0] - this1[3]),thx.core.Floats.normalize(1 - this1[1] - this1[3]),thx.core.Floats.normalize(1 - this1[2] - this1[3])];
		$r = channels;
		return $r;
	}(this)));
};
thx.color._CMYK.CMYK_Impl_.toRGBX = function(this1) {
	var channels = [thx.core.Floats.normalize(1 - this1[0] - this1[3]),thx.core.Floats.normalize(1 - this1[1] - this1[3]),thx.core.Floats.normalize(1 - this1[2] - this1[3])];
	return channels;
};
thx.color._CMYK.CMYK_Impl_.toRGBXA = function(this1) {
	var this2;
	var channels = [thx.core.Floats.normalize(1 - this1[0] - this1[3]),thx.core.Floats.normalize(1 - this1[1] - this1[3]),thx.core.Floats.normalize(1 - this1[2] - this1[3])];
	this2 = channels;
	var channels1 = this2.concat([1.0]);
	return channels1;
};
thx.color._CMYK.CMYK_Impl_.toString = function(this1) {
	return "cmyk(" + this1[0] + "," + this1[1] + "," + this1[2] + "," + this1[3] + ")";
};
thx.color._CMYK.CMYK_Impl_.equals = function(this1,other) {
	return this1[0] == other[0] && this1[1] == other[1] && this1[2] == other[2] && this1[3] == other[3];
};
thx.color._CMYK.CMYK_Impl_.darker = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx.core.Floats.interpolateBetween(t,this1[3],1)];
	return channels;
};
thx.color._CMYK.CMYK_Impl_.lighter = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx.core.Floats.interpolateBetween(t,this1[3],0)];
	return channels;
};
thx.color._CMYK.CMYK_Impl_.interpolate = function(this1,other,t) {
	var channels = [thx.core.Floats.interpolateBetween(t,this1[0],other[0]),thx.core.Floats.interpolateBetween(t,this1[1],other[1]),thx.core.Floats.interpolateBetween(t,this1[2],other[2]),thx.core.Floats.interpolateBetween(t,this1[3],other[3])];
	return channels;
};
thx.color._CMYK.CMYK_Impl_.get_black = function(this1) {
	return this1[3];
};
thx.color._CMYK.CMYK_Impl_.get_cyan = function(this1) {
	return this1[0];
};
thx.color._CMYK.CMYK_Impl_.get_magenta = function(this1) {
	return this1[1];
};
thx.color._CMYK.CMYK_Impl_.get_yellow = function(this1) {
	return this1[2];
};
thx.color.Color = function() { };
thx.color.Color.__name__ = true;
thx.color.Color.parse = function(color) {
	if(thx.color.Color.names.exists(color)) {
		var this1 = thx.color.Color.names.get(color);
		return thx.color._RGBA.RGBA_Impl_.toRGBXA((function($this) {
			var $r;
			var this2 = thx.color._RGBA.RGBA_Impl_.toRGBXA(-16777216 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255);
			$r = thx.color._RGBA.RGBA_Impl_.fromFloats(this2[0],this2[1],this2[2],this2[3]);
			return $r;
		}(this)));
	}
	var info = thx.color.parse.ColorParser.parseHex(color);
	if(null == info) info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "cmyk":
			var this3;
			var channels = thx.color.parse.ColorParser.getFloatChannels(info.channels,4);
			this3 = channels;
			var this4;
			var channels1 = [thx.core.Floats.normalize(1 - this3[0] - this3[3]),thx.core.Floats.normalize(1 - this3[1] - this3[3]),thx.core.Floats.normalize(1 - this3[2] - this3[3])];
			this4 = channels1;
			var channels2 = this4.concat([1.0]);
			return channels2;
		case "grey":case "gray":
			var this5;
			var grey = thx.color.parse.ColorParser.getFloatChannels(info.channels,1)[0];
			var this6;
			if(grey < 0) this6 = 0; else if(grey > 1) this6 = 1; else this6 = grey;
			this5 = this6;
			var channels3 = [this5,this5,this5].concat([1.0]);
			return channels3;
		case "hsl":
			var this7;
			var channels4 = thx.color.parse.ColorParser.getFloatChannels(info.channels,3);
			this7 = channels4;
			var this8;
			var channels5 = [thx.color._HSL.HSL_Impl_._c(this7[0] + 120,this7[1],this7[2]),thx.color._HSL.HSL_Impl_._c(this7[0],this7[1],this7[2]),thx.color._HSL.HSL_Impl_._c(this7[0] + -120,this7[1],this7[2])];
			this8 = channels5;
			var channels6 = this8.concat([1.0]);
			return channels6;
		case "hsla":
			var this9;
			var channels7 = thx.color.parse.ColorParser.getFloatChannels(info.channels,4);
			this9 = channels7;
			var channels8 = [thx.color._HSLA.HSLA_Impl_._c(this9[0] + 120,this9[1],this9[2]),thx.color._HSLA.HSLA_Impl_._c(this9[0],this9[1],this9[2]),thx.color._HSLA.HSLA_Impl_._c(this9[0] + -120,this9[1],this9[2]),this9[3]];
			return channels8;
		case "hsv":
			var this10;
			var channels9 = thx.color.parse.ColorParser.getFloatChannels(info.channels,3);
			this10 = channels9;
			var this11;
			if(this10[1] == 0) this11 = [this10[2],this10[2],this10[2]]; else {
				var r;
				var g;
				var b;
				var i;
				var f;
				var p;
				var q;
				var t;
				var h = this10[0] / 60;
				i = Math.floor(h);
				f = h + -i;
				p = this10[2] * (1 - this10[1]);
				q = this10[2] * (1 - f * this10[1]);
				t = this10[2] * (1 - (1 - f) * this10[1]);
				switch(i) {
				case 0:
					r = this10[2];
					g = t;
					b = p;
					break;
				case 1:
					r = q;
					g = this10[2];
					b = p;
					break;
				case 2:
					r = p;
					g = this10[2];
					b = t;
					break;
				case 3:
					r = p;
					g = q;
					b = this10[2];
					break;
				case 4:
					r = t;
					g = p;
					b = this10[2];
					break;
				default:
					r = this10[2];
					g = p;
					b = q;
				}
				this11 = [r,g,b];
			}
			var channels10 = this11.concat([1.0]);
			return channels10;
		case "hsva":
			var this12;
			var channels11 = thx.color.parse.ColorParser.getFloatChannels(info.channels,4);
			this12 = channels11;
			if(this12[1] == 0) return [this12[2],this12[2],this12[2],this12[3]]; else {
				var r1;
				var g1;
				var b1;
				var i1;
				var f1;
				var p1;
				var q1;
				var t1;
				var h1 = this12[0] / 60;
				i1 = Math.floor(h1);
				f1 = h1 + -i1;
				p1 = this12[2] * (1 - this12[1]);
				q1 = this12[2] * (1 - f1 * this12[1]);
				t1 = this12[2] * (1 - (1 - f1) * this12[1]);
				switch(i1) {
				case 0:
					r1 = this12[2];
					g1 = t1;
					b1 = p1;
					break;
				case 1:
					r1 = q1;
					g1 = this12[2];
					b1 = p1;
					break;
				case 2:
					r1 = p1;
					g1 = this12[2];
					b1 = t1;
					break;
				case 3:
					r1 = p1;
					g1 = q1;
					b1 = this12[2];
					break;
				case 4:
					r1 = t1;
					g1 = p1;
					b1 = this12[2];
					break;
				default:
					r1 = this12[2];
					g1 = p1;
					b1 = q1;
				}
				return [r1,g1,b1,this12[3]];
			}
			break;
		case "rgb":
			var this13 = thx.color._RGBX.RGBX_Impl_.fromArray(thx.color.parse.ColorParser.getFloatChannels(info.channels,3));
			var channels12 = this13.concat([1.0]);
			return channels12;
		case "rgba":
			return thx.color._RGBXA.RGBXA_Impl_.fromArray(thx.color.parse.ColorParser.getFloatChannels(info.channels,4));
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._Grey = {};
thx.color._Grey.Grey_Impl_ = function() { };
thx.color._Grey.Grey_Impl_.__name__ = true;
thx.color._Grey.Grey_Impl_.fromString = function(color) {
	var info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "grey":case "gray":
			var grey = thx.color.parse.ColorParser.getFloatChannels(info.channels,1)[0];
			var this1;
			if(grey < 0) this1 = 0; else if(grey > 1) this1 = 1; else this1 = grey;
			return this1;
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._Grey.Grey_Impl_._new = function(grey) {
	var this1;
	if(grey < 0) this1 = 0; else if(grey > 1) this1 = 1; else this1 = grey;
	return this1;
};
thx.color._Grey.Grey_Impl_.toCMYK = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toCMYK([this1,this1,this1]);
};
thx.color._Grey.Grey_Impl_.toHSL = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toHSL([this1,this1,this1]);
};
thx.color._Grey.Grey_Impl_.toHSV = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toHSV([this1,this1,this1]);
};
thx.color._Grey.Grey_Impl_.toRGBX = function(this1) {
	return [this1,this1,this1];
};
thx.color._Grey.Grey_Impl_.toRGBXA = function(this1) {
	var channels = [this1,this1,this1].concat([1.0]);
	return channels;
};
thx.color._Grey.Grey_Impl_.equals = function(this1,other) {
	return this1 == other;
};
thx.color._Grey.Grey_Impl_.darker = function(color,t) {
	var grey = thx.core.Floats.interpolateBetween(t,color,0);
	var this1;
	if(grey < 0) this1 = 0; else if(grey > 1) this1 = 1; else this1 = grey;
	return this1;
};
thx.color._Grey.Grey_Impl_.lighter = function(color,t) {
	var grey = thx.core.Floats.interpolateBetween(t,color,1);
	var this1;
	if(grey < 0) this1 = 0; else if(grey > 1) this1 = 1; else this1 = grey;
	return this1;
};
thx.color._Grey.Grey_Impl_.interpolate = function(a,b,t) {
	var grey = thx.core.Floats.interpolateBetween(t,a,b);
	var this1;
	if(grey < 0) this1 = 0; else if(grey > 1) this1 = 1; else this1 = grey;
	return this1;
};
thx.color._Grey.Grey_Impl_.get_grey = function(this1) {
	return this1;
};
thx.color._Grey.Grey_Impl_.toString = function(this1) {
	return "grey(" + this1 * 100 + "%)";
};
thx.color._HSL = {};
thx.color._HSL.HSL_Impl_ = function() { };
thx.color._HSL.HSL_Impl_.__name__ = true;
thx.color._HSL.HSL_Impl_.fromString = function(color) {
	var info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsl":
			var channels = thx.color.parse.ColorParser.getFloatChannels(info.channels,3);
			return channels;
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._HSL.HSL_Impl_.fromFloats = function(hue,saturation,lightness) {
	return [hue,saturation,lightness];
};
thx.color._HSL.HSL_Impl_._new = function(channels) {
	return channels;
};
thx.color._HSL.HSL_Impl_.toCMYK = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toCMYK((function($this) {
		var $r;
		var channels = [thx.color._HSL.HSL_Impl_._c(this1[0] + 120,this1[1],this1[2]),thx.color._HSL.HSL_Impl_._c(this1[0],this1[1],this1[2]),thx.color._HSL.HSL_Impl_._c(this1[0] + -120,this1[1],this1[2])];
		$r = channels;
		return $r;
	}(this)));
};
thx.color._HSL.HSL_Impl_.toGrey = function(this1) {
	var this2;
	var channels = [thx.color._HSL.HSL_Impl_._c(this1[0] + 120,this1[1],this1[2]),thx.color._HSL.HSL_Impl_._c(this1[0],this1[1],this1[2]),thx.color._HSL.HSL_Impl_._c(this1[0] + -120,this1[1],this1[2])];
	this2 = channels;
	var grey = this2[0] * .2126 + this2[1] * .7152 + this2[2] * .0722;
	var this3;
	if(grey < 0) this3 = 0; else if(grey > 1) this3 = 1; else this3 = grey;
	return this3;
};
thx.color._HSL.HSL_Impl_.toHSV = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toHSV((function($this) {
		var $r;
		var channels = [thx.color._HSL.HSL_Impl_._c(this1[0] + 120,this1[1],this1[2]),thx.color._HSL.HSL_Impl_._c(this1[0],this1[1],this1[2]),thx.color._HSL.HSL_Impl_._c(this1[0] + -120,this1[1],this1[2])];
		$r = channels;
		return $r;
	}(this)));
};
thx.color._HSL.HSL_Impl_.toRGBX = function(this1) {
	var channels = [thx.color._HSL.HSL_Impl_._c(this1[0] + 120,this1[1],this1[2]),thx.color._HSL.HSL_Impl_._c(this1[0],this1[1],this1[2]),thx.color._HSL.HSL_Impl_._c(this1[0] + -120,this1[1],this1[2])];
	return channels;
};
thx.color._HSL.HSL_Impl_.toRGBXA = function(this1) {
	var this2;
	var channels = [thx.color._HSL.HSL_Impl_._c(this1[0] + 120,this1[1],this1[2]),thx.color._HSL.HSL_Impl_._c(this1[0],this1[1],this1[2]),thx.color._HSL.HSL_Impl_._c(this1[0] + -120,this1[1],this1[2])];
	this2 = channels;
	var channels1 = this2.concat([1.0]);
	return channels1;
};
thx.color._HSL.HSL_Impl_.toHSLA = function(this1) {
	var channels = this1.concat([1.0]);
	return channels;
};
thx.color._HSL.HSL_Impl_.withAlpha = function(this1,alpha) {
	var channels = this1.concat([alpha]);
	return channels;
};
thx.color._HSL.HSL_Impl_.toCSS3 = function(this1) {
	return "hsl(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx.color._HSL.HSL_Impl_.toString = function(this1) {
	return "hsl(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx.color._HSL.HSL_Impl_.equals = function(this1,other) {
	return this1[0] == other[0] && this1[1] == other[1] && this1[2] == other[2];
};
thx.color._HSL.HSL_Impl_.darker = function(this1,t) {
	var channels = [this1[0],this1[1],thx.core.Floats.interpolateBetween(t,this1[2],0)];
	return channels;
};
thx.color._HSL.HSL_Impl_.lighter = function(this1,t) {
	var channels = [this1[0],this1[1],thx.core.Floats.interpolateBetween(t,this1[2],1)];
	return channels;
};
thx.color._HSL.HSL_Impl_.interpolate = function(this1,other,t) {
	var channels = [thx.core.Floats.interpolateBetween(t,this1[0],other[0]),thx.core.Floats.interpolateBetween(t,this1[1],other[1]),thx.core.Floats.interpolateBetween(t,this1[2],other[2])];
	return channels;
};
thx.color._HSL.HSL_Impl_.get_hue = function(this1) {
	return this1[0];
};
thx.color._HSL.HSL_Impl_.get_huef = function(this1) {
	return this1[0];
};
thx.color._HSL.HSL_Impl_.get_saturation = function(this1) {
	return this1[1];
};
thx.color._HSL.HSL_Impl_.get_lightness = function(this1) {
	return this1[2];
};
thx.color._HSL.HSL_Impl_._c = function(d,s,l) {
	var m2;
	if(l <= 0.5) m2 = l * (1 + s); else m2 = l + s - l * s;
	var m1 = 2 * l - m2;
	d = thx.core.Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
};
thx.color._HSLA = {};
thx.color._HSLA.HSLA_Impl_ = function() { };
thx.color._HSLA.HSLA_Impl_.__name__ = true;
thx.color._HSLA.HSLA_Impl_.fromString = function(color) {
	var info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsl":
			var this1;
			var channels = thx.color.parse.ColorParser.getFloatChannels(info.channels,3);
			this1 = channels;
			var channels1 = this1.concat([1.0]);
			return channels1;
		case "hsla":
			var channels2 = thx.color.parse.ColorParser.getFloatChannels(info.channels,4);
			return channels2;
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._HSLA.HSLA_Impl_.fromFloats = function(hue,saturation,lightness,alpha) {
	return [hue,saturation,lightness,alpha];
};
thx.color._HSLA.HSLA_Impl_._new = function(channels) {
	return channels;
};
thx.color._HSLA.HSLA_Impl_.toHSL = function(this1) {
	var channels = this1.slice(0,3);
	return channels;
};
thx.color._HSLA.HSLA_Impl_.toHSVA = function(this1) {
	return thx.color._RGBXA.RGBXA_Impl_.toHSVA((function($this) {
		var $r;
		var channels = [thx.color._HSLA.HSLA_Impl_._c(this1[0] + 120,this1[1],this1[2]),thx.color._HSLA.HSLA_Impl_._c(this1[0],this1[1],this1[2]),thx.color._HSLA.HSLA_Impl_._c(this1[0] + -120,this1[1],this1[2]),this1[3]];
		$r = channels;
		return $r;
	}(this)));
};
thx.color._HSLA.HSLA_Impl_.toRGBXA = function(this1) {
	var channels = [thx.color._HSLA.HSLA_Impl_._c(this1[0] + 120,this1[1],this1[2]),thx.color._HSLA.HSLA_Impl_._c(this1[0],this1[1],this1[2]),thx.color._HSLA.HSLA_Impl_._c(this1[0] + -120,this1[1],this1[2]),this1[3]];
	return channels;
};
thx.color._HSLA.HSLA_Impl_.toCSS3 = function(this1) {
	return "hsla(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx.color._HSLA.HSLA_Impl_.toString = function(this1) {
	return "hsla(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx.color._HSLA.HSLA_Impl_.equals = function(this1,other) {
	return this1[0] == other[0] && this1[1] == other[1] && this1[2] == other[2] && this1[3] == other[3];
};
thx.color._HSLA.HSLA_Impl_.darker = function(this1,t) {
	var channels = [this1[0],this1[1],thx.core.Floats.interpolateBetween(t,this1[2],0),this1[3]];
	return channels;
};
thx.color._HSLA.HSLA_Impl_.lighter = function(this1,t) {
	var channels = [this1[0],this1[1],thx.core.Floats.interpolateBetween(t,this1[2],1),this1[3]];
	return channels;
};
thx.color._HSLA.HSLA_Impl_.transparent = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx.core.Floats.interpolateBetween(t,this1[3],0)];
	return channels;
};
thx.color._HSLA.HSLA_Impl_.opaque = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx.core.Floats.interpolateBetween(t,this1[3],1)];
	return channels;
};
thx.color._HSLA.HSLA_Impl_.interpolate = function(this1,other,t) {
	var channels = [thx.core.Floats.interpolateBetween(t,this1[0],other[0]),thx.core.Floats.interpolateBetween(t,this1[1],other[1]),thx.core.Floats.interpolateBetween(t,this1[2],other[2]),thx.core.Floats.interpolateBetween(t,this1[3],other[3])];
	return channels;
};
thx.color._HSLA.HSLA_Impl_.get_hue = function(this1) {
	return this1[0];
};
thx.color._HSLA.HSLA_Impl_.get_huef = function(this1) {
	return this1[0];
};
thx.color._HSLA.HSLA_Impl_.get_saturation = function(this1) {
	return this1[1];
};
thx.color._HSLA.HSLA_Impl_.get_lightness = function(this1) {
	return this1[2];
};
thx.color._HSLA.HSLA_Impl_.get_alpha = function(this1) {
	return this1[3];
};
thx.color._HSLA.HSLA_Impl_._c = function(d,s,l) {
	var m2;
	if(l <= 0.5) m2 = l * (1 + s); else m2 = l + s - l * s;
	var m1 = 2 * l - m2;
	d = thx.core.Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
};
thx.color._HSV = {};
thx.color._HSV.HSV_Impl_ = function() { };
thx.color._HSV.HSV_Impl_.__name__ = true;
thx.color._HSV.HSV_Impl_.fromString = function(color) {
	var info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsv":
			var channels = thx.color.parse.ColorParser.getFloatChannels(info.channels,3);
			return channels;
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._HSV.HSV_Impl_.fromFloats = function(hue,saturation,value) {
	return [hue,saturation,value];
};
thx.color._HSV.HSV_Impl_._new = function(channels) {
	return channels;
};
thx.color._HSV.HSV_Impl_.toCMYK = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toCMYK(this1[1] == 0?[this1[2],this1[2],this1[2]]:(function($this) {
		var $r;
		var r;
		var g;
		var b;
		var i;
		var f;
		var p;
		var q;
		var t;
		var h = this1[0] / 60;
		i = Math.floor(h);
		f = h + -i;
		p = this1[2] * (1 - this1[1]);
		q = this1[2] * (1 - f * this1[1]);
		t = this1[2] * (1 - (1 - f) * this1[1]);
		switch(i) {
		case 0:
			r = this1[2];
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = this1[2];
			b = p;
			break;
		case 2:
			r = p;
			g = this1[2];
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = this1[2];
			break;
		case 4:
			r = t;
			g = p;
			b = this1[2];
			break;
		default:
			r = this1[2];
			g = p;
			b = q;
		}
		$r = [r,g,b];
		return $r;
	}(this)));
};
thx.color._HSV.HSV_Impl_.toGrey = function(this1) {
	var this2;
	if(this1[1] == 0) this2 = [this1[2],this1[2],this1[2]]; else {
		var r;
		var g;
		var b;
		var i;
		var f;
		var p;
		var q;
		var t;
		var h = this1[0] / 60;
		i = Math.floor(h);
		f = h + -i;
		p = this1[2] * (1 - this1[1]);
		q = this1[2] * (1 - f * this1[1]);
		t = this1[2] * (1 - (1 - f) * this1[1]);
		switch(i) {
		case 0:
			r = this1[2];
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = this1[2];
			b = p;
			break;
		case 2:
			r = p;
			g = this1[2];
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = this1[2];
			break;
		case 4:
			r = t;
			g = p;
			b = this1[2];
			break;
		default:
			r = this1[2];
			g = p;
			b = q;
		}
		this2 = [r,g,b];
	}
	var grey = this2[0] * .2126 + this2[1] * .7152 + this2[2] * .0722;
	var this3;
	if(grey < 0) this3 = 0; else if(grey > 1) this3 = 1; else this3 = grey;
	return this3;
};
thx.color._HSV.HSV_Impl_.toHSL = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toHSL(this1[1] == 0?[this1[2],this1[2],this1[2]]:(function($this) {
		var $r;
		var r;
		var g;
		var b;
		var i;
		var f;
		var p;
		var q;
		var t;
		var h = this1[0] / 60;
		i = Math.floor(h);
		f = h + -i;
		p = this1[2] * (1 - this1[1]);
		q = this1[2] * (1 - f * this1[1]);
		t = this1[2] * (1 - (1 - f) * this1[1]);
		switch(i) {
		case 0:
			r = this1[2];
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = this1[2];
			b = p;
			break;
		case 2:
			r = p;
			g = this1[2];
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = this1[2];
			break;
		case 4:
			r = t;
			g = p;
			b = this1[2];
			break;
		default:
			r = this1[2];
			g = p;
			b = q;
		}
		$r = [r,g,b];
		return $r;
	}(this)));
};
thx.color._HSV.HSV_Impl_.toRGBX = function(this1) {
	if(this1[1] == 0) return [this1[2],this1[2],this1[2]];
	var r;
	var g;
	var b;
	var i;
	var f;
	var p;
	var q;
	var t;
	var h = this1[0] / 60;
	i = Math.floor(h);
	f = h + -i;
	p = this1[2] * (1 - this1[1]);
	q = this1[2] * (1 - f * this1[1]);
	t = this1[2] * (1 - (1 - f) * this1[1]);
	switch(i) {
	case 0:
		r = this1[2];
		g = t;
		b = p;
		break;
	case 1:
		r = q;
		g = this1[2];
		b = p;
		break;
	case 2:
		r = p;
		g = this1[2];
		b = t;
		break;
	case 3:
		r = p;
		g = q;
		b = this1[2];
		break;
	case 4:
		r = t;
		g = p;
		b = this1[2];
		break;
	default:
		r = this1[2];
		g = p;
		b = q;
	}
	return [r,g,b];
};
thx.color._HSV.HSV_Impl_.toRGBXA = function(this1) {
	var this2;
	if(this1[1] == 0) this2 = [this1[2],this1[2],this1[2]]; else {
		var r;
		var g;
		var b;
		var i;
		var f;
		var p;
		var q;
		var t;
		var h = this1[0] / 60;
		i = Math.floor(h);
		f = h + -i;
		p = this1[2] * (1 - this1[1]);
		q = this1[2] * (1 - f * this1[1]);
		t = this1[2] * (1 - (1 - f) * this1[1]);
		switch(i) {
		case 0:
			r = this1[2];
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = this1[2];
			b = p;
			break;
		case 2:
			r = p;
			g = this1[2];
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = this1[2];
			break;
		case 4:
			r = t;
			g = p;
			b = this1[2];
			break;
		default:
			r = this1[2];
			g = p;
			b = q;
		}
		this2 = [r,g,b];
	}
	var channels = this2.concat([1.0]);
	return channels;
};
thx.color._HSV.HSV_Impl_.toHSVA = function(this1) {
	var channels = this1.concat([1.0]);
	return channels;
};
thx.color._HSV.HSV_Impl_.withAlpha = function(this1,alpha) {
	var channels = this1.concat([alpha]);
	return channels;
};
thx.color._HSV.HSV_Impl_.toString = function(this1) {
	return "hsv(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx.color._HSV.HSV_Impl_.equals = function(this1,other) {
	return this1[0] == other[0] && this1[1] == other[1] && this1[2] == other[2];
};
thx.color._HSV.HSV_Impl_.darker = function(this1,t) {
	var channels = [this1[0],this1[1],thx.core.Floats.interpolateBetween(t,this1[2],0)];
	return channels;
};
thx.color._HSV.HSV_Impl_.lighter = function(this1,t) {
	var channels = [this1[0],this1[1],thx.core.Floats.interpolateBetween(t,this1[2],1)];
	return channels;
};
thx.color._HSV.HSV_Impl_.interpolate = function(this1,other,t) {
	var channels = [thx.core.Floats.interpolateBetween(t,this1[0],other[0]),thx.core.Floats.interpolateBetween(t,this1[1],other[1]),thx.core.Floats.interpolateBetween(t,this1[2],other[2])];
	return channels;
};
thx.color._HSV.HSV_Impl_.get_hue = function(this1) {
	return this1[0];
};
thx.color._HSV.HSV_Impl_.get_huef = function(this1) {
	return this1[0];
};
thx.color._HSV.HSV_Impl_.get_saturation = function(this1) {
	return this1[1];
};
thx.color._HSV.HSV_Impl_.get_value = function(this1) {
	return this1[2];
};
thx.color._HSVA = {};
thx.color._HSVA.HSVA_Impl_ = function() { };
thx.color._HSVA.HSVA_Impl_.__name__ = true;
thx.color._HSVA.HSVA_Impl_.fromString = function(color) {
	var info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsv":
			var this1;
			var channels = thx.color.parse.ColorParser.getFloatChannels(info.channels,3);
			this1 = channels;
			var channels1 = this1.concat([1.0]);
			return channels1;
		case "hsva":
			var channels2 = thx.color.parse.ColorParser.getFloatChannels(info.channels,4);
			return channels2;
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._HSVA.HSVA_Impl_.fromFloats = function(hue,saturation,value,alpha) {
	return [hue,saturation,value,alpha];
};
thx.color._HSVA.HSVA_Impl_._new = function(channels) {
	return channels;
};
thx.color._HSVA.HSVA_Impl_.toHSV = function(this1) {
	var channels = this1.slice(0,3);
	return channels;
};
thx.color._HSVA.HSVA_Impl_.toHSLA = function(this1) {
	return thx.color._RGBXA.RGBXA_Impl_.toHSLA(this1[1] == 0?[this1[2],this1[2],this1[2],this1[3]]:(function($this) {
		var $r;
		var r;
		var g;
		var b;
		var i;
		var f;
		var p;
		var q;
		var t;
		var h = this1[0] / 60;
		i = Math.floor(h);
		f = h + -i;
		p = this1[2] * (1 - this1[1]);
		q = this1[2] * (1 - f * this1[1]);
		t = this1[2] * (1 - (1 - f) * this1[1]);
		switch(i) {
		case 0:
			r = this1[2];
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = this1[2];
			b = p;
			break;
		case 2:
			r = p;
			g = this1[2];
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = this1[2];
			break;
		case 4:
			r = t;
			g = p;
			b = this1[2];
			break;
		default:
			r = this1[2];
			g = p;
			b = q;
		}
		$r = [r,g,b,this1[3]];
		return $r;
	}(this)));
};
thx.color._HSVA.HSVA_Impl_.toRGBXA = function(this1) {
	if(this1[1] == 0) return [this1[2],this1[2],this1[2],this1[3]];
	var r;
	var g;
	var b;
	var i;
	var f;
	var p;
	var q;
	var t;
	var h = this1[0] / 60;
	i = Math.floor(h);
	f = h + -i;
	p = this1[2] * (1 - this1[1]);
	q = this1[2] * (1 - f * this1[1]);
	t = this1[2] * (1 - (1 - f) * this1[1]);
	switch(i) {
	case 0:
		r = this1[2];
		g = t;
		b = p;
		break;
	case 1:
		r = q;
		g = this1[2];
		b = p;
		break;
	case 2:
		r = p;
		g = this1[2];
		b = t;
		break;
	case 3:
		r = p;
		g = q;
		b = this1[2];
		break;
	case 4:
		r = t;
		g = p;
		b = this1[2];
		break;
	default:
		r = this1[2];
		g = p;
		b = q;
	}
	return [r,g,b,this1[3]];
};
thx.color._HSVA.HSVA_Impl_.toString = function(this1) {
	return "hsva(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx.color._HSVA.HSVA_Impl_.equals = function(this1,other) {
	return this1[0] == other[0] && this1[1] == other[1] && this1[2] == other[2] && this1[3] == other[3];
};
thx.color._HSVA.HSVA_Impl_.darker = function(this1,t) {
	var channels = [this1[0],this1[1],thx.core.Floats.interpolateBetween(t,this1[2],0),this1[3]];
	return channels;
};
thx.color._HSVA.HSVA_Impl_.lighter = function(this1,t) {
	var channels = [this1[0],this1[1],thx.core.Floats.interpolateBetween(t,this1[2],1),this1[3]];
	return channels;
};
thx.color._HSVA.HSVA_Impl_.transparent = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx.core.Floats.interpolateBetween(t,this1[3],0)];
	return channels;
};
thx.color._HSVA.HSVA_Impl_.opaque = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx.core.Floats.interpolateBetween(t,this1[3],1)];
	return channels;
};
thx.color._HSVA.HSVA_Impl_.interpolate = function(this1,other,t) {
	var channels = [thx.core.Floats.interpolateBetween(t,this1[0],other[0]),thx.core.Floats.interpolateBetween(t,this1[1],other[1]),thx.core.Floats.interpolateBetween(t,this1[2],other[2]),thx.core.Floats.interpolateBetween(t,this1[3],other[3])];
	return channels;
};
thx.color._HSVA.HSVA_Impl_.get_hue = function(this1) {
	return this1[0];
};
thx.color._HSVA.HSVA_Impl_.get_huef = function(this1) {
	return this1[0];
};
thx.color._HSVA.HSVA_Impl_.get_saturation = function(this1) {
	return this1[1];
};
thx.color._HSVA.HSVA_Impl_.get_value = function(this1) {
	return this1[2];
};
thx.color._HSVA.HSVA_Impl_.get_alpha = function(this1) {
	return this1[3];
};
thx.color._RGB = {};
thx.color._RGB.RGB_Impl_ = function() { };
thx.color._RGB.RGB_Impl_.__name__ = true;
thx.color._RGB.RGB_Impl_.fromString = function(color) {
	var info = thx.color.parse.ColorParser.parseHex(color);
	if(null == info) info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			var arr = thx.color.parse.ColorParser.getInt8Channels(info.channels,3);
			return (arr[0] & 255) << 16 | (arr[1] & 255) << 8 | arr[2] & 255;
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._RGB.RGB_Impl_.fromFloats = function(red,green,blue) {
	var red1 = Math.round((red < 0?0:red > 1?1:red) * 255);
	var green1 = Math.round((green < 0?0:green > 1?1:green) * 255);
	var blue1 = Math.round((blue < 0?0:blue > 1?1:blue) * 255);
	return (red1 & 255) << 16 | (green1 & 255) << 8 | blue1 & 255;
};
thx.color._RGB.RGB_Impl_.fromArray = function(arr) {
	return (arr[0] & 255) << 16 | (arr[1] & 255) << 8 | arr[2] & 255;
};
thx.color._RGB.RGB_Impl_.fromInts = function(red,green,blue) {
	return (red & 255) << 16 | (green & 255) << 8 | blue & 255;
};
thx.color._RGB.RGB_Impl_.fromInt = function(rgb) {
	return rgb;
};
thx.color._RGB.RGB_Impl_._new = function(rgb) {
	return rgb;
};
thx.color._RGB.RGB_Impl_.toInt = function(this1) {
	return this1;
};
thx.color._RGB.RGB_Impl_.toCMYK = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toCMYK(thx.color._RGB.RGB_Impl_.toRGBX(this1));
};
thx.color._RGB.RGB_Impl_.toGrey = function(this1) {
	var this2 = thx.color._RGB.RGB_Impl_.toRGBX(this1);
	var grey = this2[0] * .2126 + this2[1] * .7152 + this2[2] * .0722;
	var this3;
	if(grey < 0) this3 = 0; else if(grey > 1) this3 = 1; else this3 = grey;
	return this3;
};
thx.color._RGB.RGB_Impl_.toHSL = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toHSL(thx.color._RGB.RGB_Impl_.toRGBX(this1));
};
thx.color._RGB.RGB_Impl_.toHSV = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toHSV(thx.color._RGB.RGB_Impl_.toRGBX(this1));
};
thx.color._RGB.RGB_Impl_.toRGBX = function(this1) {
	return [(this1 >> 16 & 255) / 255,(this1 >> 8 & 255) / 255,(this1 & 255) / 255];
};
thx.color._RGB.RGB_Impl_.toRGBA = function(this1) {
	var this2 = thx.color._RGBA.RGBA_Impl_.toRGBXA(-16777216 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255);
	return thx.color._RGBA.RGBA_Impl_.fromFloats(this2[0],this2[1],this2[2],this2[3]);
};
thx.color._RGB.RGB_Impl_.toRGBXA = function(this1) {
	return thx.color._RGBA.RGBA_Impl_.toRGBXA((function($this) {
		var $r;
		var this2 = thx.color._RGBA.RGBA_Impl_.toRGBXA(-16777216 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255);
		$r = thx.color._RGBA.RGBA_Impl_.fromFloats(this2[0],this2[1],this2[2],this2[3]);
		return $r;
	}(this)));
};
thx.color._RGB.RGB_Impl_.withAlpha = function(this1,alpha) {
	return thx.color._RGBA.RGBA_Impl_.toRGBXA((alpha & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255);
};
thx.color._RGB.RGB_Impl_.toCSS3 = function(this1) {
	return "rgb(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + ")";
};
thx.color._RGB.RGB_Impl_.toString = function(this1) {
	return "rgb(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + ")";
};
thx.color._RGB.RGB_Impl_.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(this1 >> 16 & 255,2) + StringTools.hex(this1 >> 8 & 255,2) + StringTools.hex(this1 & 255,2);
};
thx.color._RGB.RGB_Impl_.equals = function(this1,other) {
	return (this1 >> 16 & 255) == (other >> 16 & 255) && (this1 >> 8 & 255) == (other >> 8 & 255) && (this1 & 255) == (other & 255);
};
thx.color._RGB.RGB_Impl_.darker = function(this1,t) {
	var this2 = thx.color._RGBX.RGBX_Impl_.darker(thx.color._RGB.RGB_Impl_.toRGBX(this1),t);
	return thx.color._RGB.RGB_Impl_.fromFloats(this2[0],this2[1],this2[2]);
};
thx.color._RGB.RGB_Impl_.lighter = function(this1,t) {
	var this2 = thx.color._RGBX.RGBX_Impl_.lighter(thx.color._RGB.RGB_Impl_.toRGBX(this1),t);
	return thx.color._RGB.RGB_Impl_.fromFloats(this2[0],this2[1],this2[2]);
};
thx.color._RGB.RGB_Impl_.interpolate = function(this1,other,t) {
	var this2 = thx.color._RGBX.RGBX_Impl_.interpolate(thx.color._RGB.RGB_Impl_.toRGBX(this1),thx.color._RGB.RGB_Impl_.toRGBX(other),t);
	return thx.color._RGB.RGB_Impl_.fromFloats(this2[0],this2[1],this2[2]);
};
thx.color._RGB.RGB_Impl_.get_red = function(this1) {
	return this1 >> 16 & 255;
};
thx.color._RGB.RGB_Impl_.get_green = function(this1) {
	return this1 >> 8 & 255;
};
thx.color._RGB.RGB_Impl_.get_blue = function(this1) {
	return this1 & 255;
};
thx.color._RGBA = {};
thx.color._RGBA.RGBA_Impl_ = function() { };
thx.color._RGBA.RGBA_Impl_.__name__ = true;
thx.color._RGBA.RGBA_Impl_.fromString = function(color) {
	var info = thx.color.parse.ColorParser.parseHex(color);
	if(null == info) info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			var this1;
			var arr = thx.color.parse.ColorParser.getInt8Channels(info.channels,3);
			this1 = (arr[0] & 255) << 16 | (arr[1] & 255) << 8 | arr[2] & 255;
			var this2 = thx.color._RGBA.RGBA_Impl_.toRGBXA(-16777216 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255);
			return thx.color._RGBA.RGBA_Impl_.fromFloats(this2[0],this2[1],this2[2],this2[3]);
		case "rgba":
			var arr_0 = thx.color.parse.ColorParser.getInt8Channel(info.channels[0]);
			var arr_1 = thx.color.parse.ColorParser.getInt8Channel(info.channels[1]);
			var arr_2 = thx.color.parse.ColorParser.getInt8Channel(info.channels[2]);
			var arr_3 = Math.round(thx.color.parse.ColorParser.getFloatChannel(info.channels[3]) * 255);
			return (arr_3 & 255) << 24 | (arr_0 & 255) << 16 | (arr_1 & 255) << 8 | arr_2 & 255;
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._RGBA.RGBA_Impl_.fromArray = function(arr) {
	return (arr[3] & 255) << 24 | (arr[0] & 255) << 16 | (arr[1] & 255) << 8 | arr[2] & 255;
};
thx.color._RGBA.RGBA_Impl_.fromFloats = function(red,green,blue,alpha) {
	var red1 = Math.round((red < 0?0:red > 1?1:red) * 255);
	var green1 = Math.round((green < 0?0:green > 1?1:green) * 255);
	var blue1 = Math.round((blue < 0?0:blue > 1?1:blue) * 255);
	var alpha1 = Math.round((alpha < 0?0:alpha > 1?1:alpha) * 255);
	return (alpha1 & 255) << 24 | (red1 & 255) << 16 | (green1 & 255) << 8 | blue1 & 255;
};
thx.color._RGBA.RGBA_Impl_.fromInts = function(red,green,blue,alpha) {
	return (alpha & 255) << 24 | (red & 255) << 16 | (green & 255) << 8 | blue & 255;
};
thx.color._RGBA.RGBA_Impl_.fromInt = function(rgba) {
	return rgba;
};
thx.color._RGBA.RGBA_Impl_._new = function(rgba) {
	return rgba;
};
thx.color._RGBA.RGBA_Impl_.toInt = function(this1) {
	return this1;
};
thx.color._RGBA.RGBA_Impl_.toHSLA = function(this1) {
	return thx.color._RGBXA.RGBXA_Impl_.toHSLA(thx.color._RGBA.RGBA_Impl_.toRGBXA(this1));
};
thx.color._RGBA.RGBA_Impl_.toHSVA = function(this1) {
	return thx.color._RGBXA.RGBXA_Impl_.toHSVA(thx.color._RGBA.RGBA_Impl_.toRGBXA(this1));
};
thx.color._RGBA.RGBA_Impl_.toRGB = function(this1) {
	return (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255;
};
thx.color._RGBA.RGBA_Impl_.toRGBX = function(this1) {
	return [(this1 >> 16 & 255) / 255,(this1 >> 8 & 255) / 255,(this1 & 255) / 255];
};
thx.color._RGBA.RGBA_Impl_.toRGBXA = function(this1) {
	return [(this1 >> 16 & 255) / 255,(this1 >> 8 & 255) / 255,(this1 & 255) / 255,(this1 >> 24 & 255) / 255];
};
thx.color._RGBA.RGBA_Impl_.toCSS3 = function(this1) {
	return "rgba(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + "," + (this1 >> 24 & 255) / 255 + ")";
};
thx.color._RGBA.RGBA_Impl_.toString = function(this1) {
	return "rgba(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + "," + (this1 >> 24 & 255) / 255 + ")";
};
thx.color._RGBA.RGBA_Impl_.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(this1 >> 24 & 255,2) + StringTools.hex(this1 >> 16 & 255,2) + StringTools.hex(this1 >> 8 & 255,2) + StringTools.hex(this1 & 255,2);
};
thx.color._RGBA.RGBA_Impl_.equals = function(this1,other) {
	return (this1 >> 16 & 255) == (other >> 16 & 255) && (this1 >> 24 & 255) == (other >> 24 & 255) && (this1 >> 8 & 255) == (other >> 8 & 255) && (this1 & 255) == (other & 255);
};
thx.color._RGBA.RGBA_Impl_.darker = function(this1,t) {
	var this2 = thx.color._RGBXA.RGBXA_Impl_.darker(thx.color._RGBA.RGBA_Impl_.toRGBXA(this1),t);
	return thx.color._RGBA.RGBA_Impl_.fromFloats(this2[0],this2[1],this2[2],this2[3]);
};
thx.color._RGBA.RGBA_Impl_.lighter = function(this1,t) {
	var this2 = thx.color._RGBXA.RGBXA_Impl_.lighter(thx.color._RGBA.RGBA_Impl_.toRGBXA(this1),t);
	return thx.color._RGBA.RGBA_Impl_.fromFloats(this2[0],this2[1],this2[2],this2[3]);
};
thx.color._RGBA.RGBA_Impl_.transparent = function(this1,t) {
	var this2 = thx.color._RGBXA.RGBXA_Impl_.transparent(thx.color._RGBA.RGBA_Impl_.toRGBXA(this1),t);
	return thx.color._RGBA.RGBA_Impl_.fromFloats(this2[0],this2[1],this2[2],this2[3]);
};
thx.color._RGBA.RGBA_Impl_.opaque = function(this1,t) {
	var this2 = thx.color._RGBXA.RGBXA_Impl_.opaque(thx.color._RGBA.RGBA_Impl_.toRGBXA(this1),t);
	return thx.color._RGBA.RGBA_Impl_.fromFloats(this2[0],this2[1],this2[2],this2[3]);
};
thx.color._RGBA.RGBA_Impl_.interpolate = function(this1,other,t) {
	var this2 = thx.color._RGBXA.RGBXA_Impl_.interpolate(thx.color._RGBA.RGBA_Impl_.toRGBXA(this1),thx.color._RGBA.RGBA_Impl_.toRGBXA(other),t);
	return thx.color._RGBA.RGBA_Impl_.fromFloats(this2[0],this2[1],this2[2],this2[3]);
};
thx.color._RGBA.RGBA_Impl_.get_alpha = function(this1) {
	return this1 >> 24 & 255;
};
thx.color._RGBA.RGBA_Impl_.get_red = function(this1) {
	return this1 >> 16 & 255;
};
thx.color._RGBA.RGBA_Impl_.get_green = function(this1) {
	return this1 >> 8 & 255;
};
thx.color._RGBA.RGBA_Impl_.get_blue = function(this1) {
	return this1 & 255;
};
thx.color._RGBX = {};
thx.color._RGBX.RGBX_Impl_ = function() { };
thx.color._RGBX.RGBX_Impl_.__name__ = true;
thx.color._RGBX.RGBX_Impl_.fromString = function(color) {
	var info = thx.color.parse.ColorParser.parseHex(color);
	if(null == info) info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			return thx.color._RGBX.RGBX_Impl_.fromArray(thx.color.parse.ColorParser.getFloatChannels(info.channels,3));
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._RGBX.RGBX_Impl_.fromArray = function(values) {
	var channels = values.map(function(v) {
		if(v < 0) return 0; else if(v > 1) return 1; else return v;
	}).concat([0,0,0]).slice(0,3);
	return channels;
};
thx.color._RGBX.RGBX_Impl_.fromInts = function(red,green,blue) {
	return [red / 255,green / 255,blue / 255];
};
thx.color._RGBX.RGBX_Impl_.fromFloats = function(red,green,blue) {
	return [red,green,blue];
};
thx.color._RGBX.RGBX_Impl_._new = function(channels) {
	return channels;
};
thx.color._RGBX.RGBX_Impl_.toCSS3 = function(this1) {
	return "rgb(" + this1[0] * 100 + "%," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx.color._RGBX.RGBX_Impl_.toString = function(this1) {
	return "rgb(" + this1[0] * 100 + "%," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx.color._RGBX.RGBX_Impl_.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(Math.round(this1[0] * 255),2) + StringTools.hex(Math.round(this1[1] * 255),2) + StringTools.hex(Math.round(this1[2] * 255),2);
};
thx.color._RGBX.RGBX_Impl_.toCMYK = function(this1) {
	var c = 0.0;
	var y = 0.0;
	var m = 0.0;
	var k;
	if(this1[0] + this1[1] + this1[2] == 0) k = 1.0; else {
		c = 1 - this1[0];
		m = 1 - this1[1];
		y = 1 - this1[2];
		k = Math.min(Math.min(c,m),y);
		c = (c - k) / (1 - k);
		m = (m - k) / (1 - k);
		y = (y - k) / (1 - k);
	}
	return [c,m,y,k];
};
thx.color._RGBX.RGBX_Impl_.toGrey = function(this1) {
	var grey = this1[0] * .2126 + this1[1] * .7152 + this1[2] * .0722;
	var this2;
	if(grey < 0) this2 = 0; else if(grey > 1) this2 = 1; else this2 = grey;
	return this2;
};
thx.color._RGBX.RGBX_Impl_.toPerceivedGrey = function(this1) {
	var grey = this1[0] * .299 + this1[1] * .587 + this1[2] * .114;
	var this2;
	if(grey < 0) this2 = 0; else if(grey > 1) this2 = 1; else this2 = grey;
	return this2;
};
thx.color._RGBX.RGBX_Impl_.toPerceivedAccurateGrey = function(this1) {
	var grey = Math.pow(this1[0],2) * .241 + Math.pow(this1[1],2) * .691 + Math.pow(this1[2],2) * .068;
	var this2;
	if(grey < 0) this2 = 0; else if(grey > 1) this2 = 1; else this2 = grey;
	return this2;
};
thx.color._RGBX.RGBX_Impl_.toHSL = function(this1) {
	var min = Math.min(Math.min(this1[0],this1[1]),this1[2]);
	var max = Math.max(Math.max(this1[0],this1[1]),this1[2]);
	var delta = max - min;
	var h;
	var s;
	var l = (max + min) / 2;
	if(delta == 0.0) s = h = 0.0; else {
		if(l < 0.5) s = delta / (max + min); else s = delta / (2 - max - min);
		if(this1[0] == max) h = (this1[1] - this1[2]) / delta + (this1[1] < Math.round(this1[2] * 255)?6:0); else if(this1[1] == max) h = (this1[2] - this1[0]) / delta + 2; else h = (this1[0] - this1[1]) / delta + 4;
		h *= 60;
	}
	return [h,s,l];
};
thx.color._RGBX.RGBX_Impl_.toHSV = function(this1) {
	var min = Math.min(Math.min(this1[0],this1[1]),this1[2]);
	var max = Math.max(Math.max(this1[0],this1[1]),this1[2]);
	var delta = max - min;
	var h;
	var s;
	var v = max;
	if(delta != 0) s = delta / max; else {
		s = 0;
		h = -1;
		return [h,s,v];
	}
	if(this1[0] == max) h = (this1[1] - this1[2]) / delta; else if(this1[1] == max) h = 2 + (this1[2] - this1[0]) / delta; else h = 4 + (this1[0] - this1[1]) / delta;
	h *= 60;
	if(h < 0) h += 360;
	return [h,s,v];
};
thx.color._RGBX.RGBX_Impl_.toRGBXA = function(this1) {
	var channels = this1.concat([1.0]);
	return channels;
};
thx.color._RGBX.RGBX_Impl_.withAlpha = function(this1,alpha) {
	var channels = this1.concat([alpha]);
	return channels;
};
thx.color._RGBX.RGBX_Impl_.toRGB = function(this1) {
	return thx.color._RGB.RGB_Impl_.fromFloats(this1[0],this1[1],this1[2]);
};
thx.color._RGBX.RGBX_Impl_.equals = function(this1,other) {
	return this1[0] == other[0] && this1[1] == other[1] && this1[2] == other[2];
};
thx.color._RGBX.RGBX_Impl_.darker = function(this1,t) {
	var channels = [thx.core.Floats.interpolateBetween(t,this1[0],0),thx.core.Floats.interpolateBetween(t,this1[1],0),thx.core.Floats.interpolateBetween(t,this1[2],0)];
	return channels;
};
thx.color._RGBX.RGBX_Impl_.lighter = function(this1,t) {
	var channels = [thx.core.Floats.interpolateBetween(t,this1[0],1),thx.core.Floats.interpolateBetween(t,this1[1],1),thx.core.Floats.interpolateBetween(t,this1[2],1)];
	return channels;
};
thx.color._RGBX.RGBX_Impl_.interpolate = function(this1,other,t) {
	var channels = [thx.core.Floats.interpolateBetween(t,this1[0],other[0]),thx.core.Floats.interpolateBetween(t,this1[1],other[1]),thx.core.Floats.interpolateBetween(t,this1[2],other[2])];
	return channels;
};
thx.color._RGBX.RGBX_Impl_.get_red = function(this1) {
	return Math.round(this1[0] * 255);
};
thx.color._RGBX.RGBX_Impl_.get_green = function(this1) {
	return Math.round(this1[1] * 255);
};
thx.color._RGBX.RGBX_Impl_.get_blue = function(this1) {
	return Math.round(this1[2] * 255);
};
thx.color._RGBX.RGBX_Impl_.get_redf = function(this1) {
	return this1[0];
};
thx.color._RGBX.RGBX_Impl_.get_greenf = function(this1) {
	return this1[1];
};
thx.color._RGBX.RGBX_Impl_.get_bluef = function(this1) {
	return this1[2];
};
thx.color._RGBXA = {};
thx.color._RGBXA.RGBXA_Impl_ = function() { };
thx.color._RGBXA.RGBXA_Impl_.__name__ = true;
thx.color._RGBXA.RGBXA_Impl_.parse = function(color) {
	var info = thx.color.parse.ColorParser.parseHex(color);
	if(null == info) info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			var this1 = thx.color._RGBX.RGBX_Impl_.fromArray(thx.color.parse.ColorParser.getFloatChannels(info.channels,3));
			var channels = this1.concat([1.0]);
			return channels;
		case "rgba":
			return thx.color._RGBXA.RGBXA_Impl_.fromArray(thx.color.parse.ColorParser.getFloatChannels(info.channels,4));
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._RGBXA.RGBXA_Impl_.fromArray = function(values) {
	var channels = values.map(function(v) {
		if(v < 0) return 0; else if(v > 1) return 1; else return v;
	}).concat([0,0,0,0]).slice(0,4);
	return channels;
};
thx.color._RGBXA.RGBXA_Impl_.fromInts = function(red,green,blue,alpha) {
	return [red / 255,green / 255,blue / 255,alpha / 255];
};
thx.color._RGBXA.RGBXA_Impl_.fromFloats = function(red,green,blue,alpha) {
	return [red,green,blue,alpha];
};
thx.color._RGBXA.RGBXA_Impl_._new = function(channels) {
	return channels;
};
thx.color._RGBXA.RGBXA_Impl_.toCSS3 = function(this1) {
	return "rgba(" + this1[0] * 100 + "%," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx.color._RGBXA.RGBXA_Impl_.toString = function(this1) {
	return "rgba(" + this1[0] * 100 + "%," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx.color._RGBXA.RGBXA_Impl_.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(Math.round(this1[3] * 255),2) + StringTools.hex(Math.round(this1[0] * 255),2) + StringTools.hex(Math.round(this1[1] * 255),2) + StringTools.hex(Math.round(this1[2] * 255),2);
};
thx.color._RGBXA.RGBXA_Impl_.toHSLA = function(this1) {
	var this2 = thx.color._RGBX.RGBX_Impl_.toHSL((function($this) {
		var $r;
		var channels = this1.slice(0,3);
		$r = channels;
		return $r;
	}(this)));
	var alpha = Math.round(this1[3] * 255);
	var channels1 = this2.concat([alpha]);
	return channels1;
};
thx.color._RGBXA.RGBXA_Impl_.toHSVA = function(this1) {
	var this2 = thx.color._RGBX.RGBX_Impl_.toHSV((function($this) {
		var $r;
		var channels = this1.slice(0,3);
		$r = channels;
		return $r;
	}(this)));
	var alpha = Math.round(this1[3] * 255);
	var channels1 = this2.concat([alpha]);
	return channels1;
};
thx.color._RGBXA.RGBXA_Impl_.toRGBX = function(this1) {
	var channels = this1.slice(0,3);
	return channels;
};
thx.color._RGBXA.RGBXA_Impl_.toRGBA = function(this1) {
	return thx.color._RGBA.RGBA_Impl_.fromFloats(this1[0],this1[1],this1[2],this1[3]);
};
thx.color._RGBXA.RGBXA_Impl_.equals = function(this1,other) {
	return this1[0] == other[0] && this1[1] == other[1] && this1[2] == other[2] && this1[3] == other[3];
};
thx.color._RGBXA.RGBXA_Impl_.darker = function(this1,t) {
	var this2 = thx.color._RGBX.RGBX_Impl_.darker((function($this) {
		var $r;
		var channels = this1.slice(0,3);
		$r = channels;
		return $r;
	}(this)),t);
	var alpha = Math.round(this1[3] * 255);
	var channels1 = this2.concat([alpha]);
	return channels1;
};
thx.color._RGBXA.RGBXA_Impl_.lighter = function(this1,t) {
	var this2 = thx.color._RGBX.RGBX_Impl_.lighter((function($this) {
		var $r;
		var channels = this1.slice(0,3);
		$r = channels;
		return $r;
	}(this)),t);
	var alpha = Math.round(this1[3] * 255);
	var channels1 = this2.concat([alpha]);
	return channels1;
};
thx.color._RGBXA.RGBXA_Impl_.transparent = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx.core.Floats.interpolateBetween(t,this1[3],0)];
	return channels;
};
thx.color._RGBXA.RGBXA_Impl_.opaque = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx.core.Floats.interpolateBetween(t,this1[3],1)];
	return channels;
};
thx.color._RGBXA.RGBXA_Impl_.interpolate = function(this1,other,t) {
	var channels = [thx.core.Floats.interpolateBetween(t,this1[0],other[0]),thx.core.Floats.interpolateBetween(t,this1[1],other[1]),thx.core.Floats.interpolateBetween(t,this1[2],other[2]),thx.core.Floats.interpolateBetween(t,this1[3],other[3])];
	return channels;
};
thx.color._RGBXA.RGBXA_Impl_.get_red = function(this1) {
	return Math.round(this1[0] * 255);
};
thx.color._RGBXA.RGBXA_Impl_.get_green = function(this1) {
	return Math.round(this1[1] * 255);
};
thx.color._RGBXA.RGBXA_Impl_.get_blue = function(this1) {
	return Math.round(this1[2] * 255);
};
thx.color._RGBXA.RGBXA_Impl_.get_alpha = function(this1) {
	return Math.round(this1[3] * 255);
};
thx.color._RGBXA.RGBXA_Impl_.get_redf = function(this1) {
	return this1[0];
};
thx.color._RGBXA.RGBXA_Impl_.get_greenf = function(this1) {
	return this1[1];
};
thx.color._RGBXA.RGBXA_Impl_.get_bluef = function(this1) {
	return this1[2];
};
thx.color._RGBXA.RGBXA_Impl_.get_alphaf = function(this1) {
	return this1[3];
};
thx.color.parse = {};
thx.color.parse.ColorParser = function() {
	this.pattern_color = new EReg("^\\s*([^(]+)\\s*\\(([^)]*)\\)\\s*$","i");
	this.pattern_channel = new EReg("^\\s*(\\d*.\\d+|\\d+)(%|º|deg)?\\s*$","i");
};
thx.color.parse.ColorParser.__name__ = true;
thx.color.parse.ColorParser.parseColor = function(s) {
	return thx.color.parse.ColorParser.parser.processColor(s);
};
thx.color.parse.ColorParser.parseHex = function(s) {
	return thx.color.parse.ColorParser.parser.processHex(s);
};
thx.color.parse.ColorParser.parseChannel = function(s) {
	return thx.color.parse.ColorParser.parser.processChannel(s);
};
thx.color.parse.ColorParser.getFloatChannels = function(channels,length) {
	if(length != channels.length) throw "invalid number of channels, expected " + length + " but it is " + channels.length;
	return channels.map(thx.color.parse.ColorParser.getFloatChannel);
};
thx.color.parse.ColorParser.getInt8Channels = function(channels,length) {
	if(length != channels.length) throw "invalid number of channels, expected " + length + " but it is " + channels.length;
	return channels.map(thx.color.parse.ColorParser.getInt8Channel);
};
thx.color.parse.ColorParser.getFloatChannel = function(channel) {
	switch(channel[1]) {
	case 5:
		var v = channel[2];
		if(v) return 1; else return 0;
		break;
	case 1:
		var v1 = channel[2];
		return v1;
	case 4:
		var v2 = channel[2];
		return v2;
	case 2:
		var v3 = channel[2];
		return v3;
	case 3:
		var v4 = channel[2];
		return v4 / 255;
	case 0:
		var v5 = channel[2];
		return v5 / 100;
	}
};
thx.color.parse.ColorParser.getInt8Channel = function(channel) {
	switch(channel[1]) {
	case 5:
		var v = channel[2];
		if(v) return 1; else return 0;
		break;
	case 3:
		var v1 = channel[2];
		return v1;
	case 0:
		var v2 = channel[2];
		return Math.round(255 * v2 / 100);
	default:
		throw "unable to extract a valid int8 value";
	}
};
thx.color.parse.ColorParser.prototype = {
	processHex: function(s) {
		if(!thx.color.parse.ColorParser.isPureHex.match(s)) {
			if(HxOverrides.substr(s,0,1) == "#") {
				if(s.length == 4) s = s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3); else if(s.length == 5) s = s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3) + s.charAt(4) + s.charAt(4); else s = HxOverrides.substr(s,1,null);
			} else if(HxOverrides.substr(s,0,2) == "0x") s = HxOverrides.substr(s,2,null); else return null;
		}
		var channels = [];
		while(s.length > 0) {
			channels.push(thx.color.parse.ChannelInfo.CIInt8(Std.parseInt("0x" + HxOverrides.substr(s,0,2))));
			s = HxOverrides.substr(s,2,null);
		}
		if(channels.length == 4) return new thx.color.parse.ColorInfo("rgba",channels.slice(1).concat([channels[0]])); else return new thx.color.parse.ColorInfo("rgb",channels);
	}
	,processColor: function(s) {
		if(!this.pattern_color.match(s)) return null;
		var name = this.pattern_color.matched(1);
		if(null == name) return null;
		name = name.toLowerCase();
		var m2 = this.pattern_color.matched(2);
		var s_channels;
		if(null == m2) s_channels = []; else s_channels = m2.split(",");
		var channels = [];
		var channel;
		var _g = 0;
		while(_g < s_channels.length) {
			var s_channel = s_channels[_g];
			++_g;
			channel = this.processChannel(s_channel);
			if(null == channel) return null;
			channels.push(channel);
		}
		return new thx.color.parse.ColorInfo(name,channels);
	}
	,processChannel: function(s) {
		if(!this.pattern_channel.match(s)) return null;
		var value = this.pattern_channel.matched(1);
		var unit = this.pattern_channel.matched(2);
		if(unit == null) unit = "";
		try {
			switch(unit) {
			case "%":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIPercent(thx.core.Floats.parse(value)); else return null;
				break;
			case "deg":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIDegree(thx.core.Floats.parse(value)); else return null;
				break;
			case "DEG":case "º":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIDegree(thx.core.Floats.parse(value)); else return null;
				break;
			case "":
				if(thx.core.Ints.canParse(value)) {
					var i = thx.core.Ints.parse(value);
					if(i == 0) return thx.color.parse.ChannelInfo.CIBool(false); else if(i == 1) return thx.color.parse.ChannelInfo.CIBool(true); else if(i < 256) return thx.color.parse.ChannelInfo.CIInt8(i); else return thx.color.parse.ChannelInfo.CIInt(i);
				} else if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIFloat(thx.core.Floats.parse(value)); else return null;
				break;
			default:
				return null;
			}
		} catch( e ) {
			return null;
		}
	}
	,__class__: thx.color.parse.ColorParser
};
thx.color.parse.ColorInfo = function(name,channels) {
	this.name = name;
	this.channels = channels;
};
thx.color.parse.ColorInfo.__name__ = true;
thx.color.parse.ColorInfo.prototype = {
	toString: function() {
		return "" + this.name + ", channels: " + Std.string(this.channels);
	}
	,__class__: thx.color.parse.ColorInfo
};
thx.color.parse.ChannelInfo = { __ename__ : true, __constructs__ : ["CIPercent","CIFloat","CIDegree","CIInt8","CIInt","CIBool"] };
thx.color.parse.ChannelInfo.CIPercent = function(value) { var $x = ["CIPercent",0,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIFloat = function(value) { var $x = ["CIFloat",1,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIDegree = function(value) { var $x = ["CIDegree",2,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIInt8 = function(value) { var $x = ["CIInt8",3,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIInt = function(value) { var $x = ["CIInt",4,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIBool = function(value) { var $x = ["CIBool",5,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
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
thx.core.Defaults = function() { };
thx.core.Defaults.__name__ = true;
thx.core.Floats = function() { };
thx.core.Floats.__name__ = true;
thx.core.Floats.interpolateBetween = function(t,a,b) {
	return (b - a) * t + a;
};
thx.core.Floats.normalize = function(v) {
	if(v < 0) return 0; else if(v > 1) return 1; else return v;
};
thx.core.Floats.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
};
thx.core.Floats.clampSym = function(v,max) {
	return thx.core.Floats.clamp(v,-max,max);
};
thx.core.Floats.wrap = function(v,min,max) {
	var range = max - min + 1;
	if(v < min) v += range * ((min - v) / range + 1);
	return min + (v - min) % range;
};
thx.core.Floats.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
};
thx.core.Floats.canParse = function(s) {
	return thx.core.Floats.pattern_parse.match(s);
};
thx.core.Floats.parse = function(s) {
	if(HxOverrides.substr(s,0,1) == "+") s = HxOverrides.substr(s,1,null);
	return Std.parseFloat(s);
};
thx.core.Function0 = function() { };
thx.core.Function0.__name__ = true;
thx.core.Function0.noop = function() {
};
thx.core.Function0.join = function(fa,fb) {
	return function() {
		fa();
		fb();
	};
};
thx.core.Function0.once = function(f) {
	return function() {
		f();
		f = function() {
		};
	};
};
thx.core.Function1 = function() { };
thx.core.Function1.__name__ = true;
thx.core.Function1.noop = function(_) {
};
thx.core.Function1.compose = function(fa,fb) {
	return function(v) {
		return fa(fb(v));
	};
};
thx.core.Function1.join = function(fa,fb) {
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
	if((stop - start) / step == Math.POSITIVE_INFINITY) throw "infinite range";
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
	this._lengthSquared = false;
	this._length = false;
	this._isLinear = false;
	this._area = false;
	this.first = this.p0 = p0;
	this.normalOut = this.p1 = p1;
	this.normalIn = this.p2 = p2;
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
		return thx.core.Arrays.flatten(this.get_linearSegments().map(function(edge) {
			return edge.intersectionsEdgeLinear(other);
		}));
	}
	,intersectionsEdgeCubic: function(other) {
		return this.get_linearSpline().intersectionsSpline(other.get_linearSpline());
	}
	,intersectsLine: function(line) {
		return this.intersectionsLine(line).length > 0;
	}
	,intersectionsLine: function(line) {
		return this.get_linearSpline().intersectionsLine(line);
	}
	,intersectionLengths: function(edge) {
		if(js.Boot.__instanceof(edge,thx.geom.EdgeCubic)) return this.intersectionEdgeCubicLengths(edge); else return this.intersectionEdgeLinearLengths(edge);
	}
	,intersectionEdgeCubicLengths: function(edge) {
		throw "not implemented";
	}
	,intersectionEdgeLinearLengths: function(edge) {
		throw "not implemented";
	}
	,intersectionLineLengths: function(line) {
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
		var edges = this.subdivide(v);
		return new thx.geom.SplineNode(edges[0].last,edges[1].normalOut,edges[0].normalIn);
	}
	,toLinear: function() {
		return new thx.geom.EdgeLinear(this.first,this.last);
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
			var this2 = $this.p1;
			$r = "Point(" + this2[0] + "," + this2[1] + ")";
			return $r;
		}(this)) + "," + (function($this) {
			var $r;
			var this3 = $this.p2;
			$r = "Point(" + this3[0] + "," + this3[1] + ")";
			return $r;
		}(this)) + "," + (function($this) {
			var $r;
			var this4 = $this.p3;
			$r = "Point(" + this4[0] + "," + this4[1] + ")";
			return $r;
		}(this)) + ")";
	}
	,toSpline: function() {
		return thx.geom.Spline.fromEdges([this],false);
	}
	,isNearFlat: function() {
		var sum = thx.geom._Point.Point_Impl_.distanceTo(this.p0,this.p1) + thx.geom._Point.Point_Impl_.distanceTo(this.p1,this.p2) + thx.geom._Point.Point_Impl_.distanceTo(this.p2,this.p3);
		var len = thx.geom._Point.Point_Impl_.distanceTo(this.p0,this.p3);
		return sum / len <= thx.geom.EdgeCubic.NEAR_FLAT;
	}
	,subdivide: function(v) {
		if(v == null) v = 0.5;
		var l1;
		var this1 = this.p0;
		var p;
		var this2;
		var this3 = this.p1;
		var p1 = this.p0;
		var p_0 = -p1[0];
		var p_1 = -p1[1];
		this2 = [this3[0] + p_0,this3[1] + p_1];
		p = [this2[0] * v,this2[1] * v];
		l1 = [this1[0] + p[0],this1[1] + p[1]];
		var m;
		var this4 = this.p1;
		var p2;
		var this5;
		var this6 = this.p2;
		var p3 = this.p1;
		var p_01 = -p3[0];
		var p_11 = -p3[1];
		this5 = [this6[0] + p_01,this6[1] + p_11];
		p2 = [this5[0] * v,this5[1] * v];
		m = [this4[0] + p2[0],this4[1] + p2[1]];
		var r2;
		var this7 = this.p2;
		var p4;
		var this8;
		var this9 = this.p3;
		var p5 = this.p2;
		var p_02 = -p5[0];
		var p_12 = -p5[1];
		this8 = [this9[0] + p_02,this9[1] + p_12];
		p4 = [this8[0] * v,this8[1] * v];
		r2 = [this7[0] + p4[0],this7[1] + p4[1]];
		var l2;
		var p6;
		var this10;
		var p_03 = -l1[0];
		var p_13 = -l1[1];
		this10 = [m[0] + p_03,m[1] + p_13];
		p6 = [this10[0] * v,this10[1] * v];
		l2 = [l1[0] + p6[0],l1[1] + p6[1]];
		var r1;
		var p7;
		var this11;
		var p_04 = -m[0];
		var p_14 = -m[1];
		this11 = [r2[0] + p_04,r2[1] + p_14];
		p7 = [this11[0] * v,this11[1] * v];
		r1 = [m[0] + p7[0],m[1] + p7[1]];
		var l3;
		var p8;
		var this12;
		var p_05 = -l2[0];
		var p_15 = -l2[1];
		this12 = [r1[0] + p_05,r1[1] + p_15];
		p8 = [this12[0] * v,this12[1] * v];
		l3 = [l2[0] + p8[0],l2[1] + p8[1]];
		return [new thx.geom.EdgeCubic(this.p0,l1,l2,l3),new thx.geom.EdgeCubic(l3,r1,r2,this.p3)];
	}
	,get_area: function() {
		if(!this._area) {
			this._area = true;
			this.area = thx.core.Arrays.reduce(this.get_linearSegments(),function(acc,edge) {
				return acc + edge.get_area();
			},0);
		}
		return this.area;
	}
	,get_box: function() {
		if(null == this.box) this.box = thx.geom.shape._Box.Box_Impl_.expandByPoints(thx.geom.shape._Box.Box_Impl_.fromPoints(this.p0,this.p1),[this.p2,this.p3]);
		return this.box;
	}
	,get_isLinear: function() {
		if(!this._isLinear) {
			this._isLinear = true;
			var line = thx.geom.Line.fromPoints(this.p0,this.p3);
			if(!thx.geom._Point.Point_Impl_.isOnLine(this.p1,line) || !thx.geom._Point.Point_Impl_.isOnLine(this.p0,line)) this.isLinear = false; else {
				var box = thx.geom.shape._Box.Box_Impl_.fromPoints(this.p0,this.p3);
				this.isLinear = thx.geom.shape._Box.Box_Impl_.contains(box,this.p1) && thx.geom.shape._Box.Box_Impl_.contains(box,this.p2);
			}
		}
		return this.isLinear;
	}
	,get_length: function() {
		if(!this._length) {
			this._length = true;
			this.length = thx.core.Arrays.reduce(this.get_linearSegments(),function(acc,edge) {
				return acc + edge.get_length();
			},0);
		}
		return this.length;
	}
	,get_lengthSquared: function() {
		if(!this._lengthSquared) {
			this._lengthSquared = true;
			this.lengthSquared = thx.core.Arrays.reduce(this.get_linearSegments(),function(acc,edge) {
				return acc + edge.get_lengthSquared();
			},0);
		}
		return this.lengthSquared;
	}
	,get_linearSegments: function() {
		if(null == this.linearSegments) {
			var tosplit = [this];
			var edge;
			this.linearSegments = [];
			while(tosplit.length > 0) {
				edge = tosplit.shift();
				if(edge.isNearFlat()) this.linearSegments.push(edge.toLinear()); else tosplit = edge.subdivide().concat(tosplit);
			}
		}
		return this.linearSegments;
	}
	,get_linearSpline: function() {
		if(null == this.linearSpline) this.linearSpline = thx.geom.Spline.fromEdges(this.get_linearSegments(),false);
		return this.linearSpline;
	}
	,__class__: thx.geom.EdgeCubic
};
thx.geom.EdgeLinear = function(p0,p1) {
	this._lengthSquared = false;
	this._length = false;
	this._area = false;
	this.first = this.p0 = p0;
	this.last = this.p1 = p1;
	this.normalIn = this.normalOut = null;
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
						var this2 = $this.p0;
						var p1 = $this.p1;
						var x = Math.min(this2[0],p1[0]);
						var y = Math.min(this2[1],p1[1]);
						this1 = [x,y];
					}
					$r = this1[1];
					return $r;
				}(this)) && p[1] <= (function($this) {
					var $r;
					var this3;
					{
						var this4 = $this.p0;
						var p2 = $this.p1;
						var x1 = Math.max(this4[0],p2[0]);
						var y1 = Math.max(this4[1],p2[1]);
						this3 = [x1,y1];
					}
					$r = this3[1];
					return $r;
				}(this))) return [p];
			} else if(p[0] >= (function($this) {
				var $r;
				var this5;
				{
					var this6 = $this.p0;
					var p3 = $this.p1;
					var x2 = Math.min(this6[0],p3[0]);
					var y2 = Math.min(this6[1],p3[1]);
					this5 = [x2,y2];
				}
				$r = this5[0];
				return $r;
			}(this)) && p[0] <= (function($this) {
				var $r;
				var this7;
				{
					var this8 = $this.p0;
					var p4 = $this.p1;
					var x3 = Math.max(this8[0],p4[0]);
					var y3 = Math.max(this8[1],p4[1]);
					this7 = [x3,y3];
				}
				$r = this7[0];
				return $r;
			}(this))) return [p];
		}
		return [];
	}
	,intersectionLengths: function(edge) {
		if(js.Boot.__instanceof(edge,thx.geom.EdgeCubic)) return this.intersectionEdgeCubicLengths(edge); else return this.intersectionEdgeLinearLengths(edge);
	}
	,intersectionEdgeCubicLengths: function(edge) {
		throw "not implemented";
	}
	,intersectionEdgeLinearLengths: function(edge) {
		var _g = [];
		var _g1 = 0;
		var _g2 = this.intersectionsEdgeLinear(edge);
		while(_g1 < _g2.length) {
			var p = _g2[_g1];
			++_g1;
			_g.push(thx.geom._Point.Point_Impl_.distanceTo(p,this.first));
		}
		return _g;
	}
	,intersectionLineLengths: function(line) {
		var _g = [];
		var _g1 = 0;
		var _g2 = this.intersectionsLine(line);
		while(_g1 < _g2.length) {
			var p = _g2[_g1];
			++_g1;
			_g.push(thx.geom._Point.Point_Impl_.distanceTo(p,this.first));
		}
		return _g;
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
	,toLinear: function() {
		return this;
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
			var this2 = $this.p1;
			$r = "Point(" + this2[0] + "," + this2[1] + ")";
			return $r;
		}(this)) + ")";
	}
	,toSpline: function() {
		return thx.geom.Spline.fromEdges([this],false);
	}
	,get_area: function() {
		if(!this._area) {
			this._area = true;
			var p;
			var this1 = this.p1;
			var p1 = this.p0;
			var p_0 = -p1[0];
			var p_1 = -p1[1];
			p = [this1[0] + p_0,this1[1] + p_1];
			this.area = this.p0[1] * (this.p1[0] - this.p0[0]) + p[0] * p[1] / 2;
		}
		return this.area;
	}
	,get_box: function() {
		if(null == this.box) this.box = thx.geom.shape._Box.Box_Impl_.fromPoints(this.p0,this.p1);
		return this.box;
	}
	,get_isLinear: function() {
		return true;
	}
	,get_length: function() {
		if(!this._length) {
			this._length = true;
			this.length = Math.sqrt(this.get_lengthSquared());
		}
		return this.length;
	}
	,get_lengthSquared: function() {
		if(!this._lengthSquared) {
			this._lengthSquared = true;
			var this1;
			var this2 = this.p1;
			var p = this.p0;
			var p_0 = -p[0];
			var p_1 = -p[1];
			this1 = [this2[0] + p_0,this2[1] + p_1];
			this.lengthSquared = this1[0] * this1[0] + this1[1] * this1[1];
		}
		return this.lengthSquared;
	}
	,get_line: function() {
		if(null == this.line) this.line = thx.geom.Line.fromPoints(this.p0,this.p1);
		return this.line;
	}
	,get_linearSegments: function() {
		return [this];
	}
	,get_linearSpline: function() {
		return this.linearSpline = thx.geom.Spline.fromEdges([this],false);
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
	,get_isHorizontal: function() {
		return this.normal[0] == 0;
	}
	,get_isVertical: function() {
		return this.normal[1] == 0;
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
thx.geom._Matrix4x4.Matrix4x4_Impl_.inverse = function(this1) {
	var inv_0 = this1[5] * this1[10] * this1[15] - this1[5] * this1[11] * this1[14] - this1[9] * this1[6] * this1[15] + this1[9] * this1[7] * this1[14] + this1[13] * this1[6] * this1[11] - this1[13] * this1[7] * this1[10];
	var inv_4 = -this1[4] * this1[10] * this1[15] + this1[4] * this1[11] * this1[14] + this1[8] * this1[6] * this1[15] - this1[8] * this1[7] * this1[14] - this1[12] * this1[6] * this1[11] + this1[12] * this1[7] * this1[10];
	var inv_8 = this1[4] * this1[9] * this1[15] - this1[4] * this1[11] * this1[13] - this1[8] * this1[5] * this1[15] + this1[8] * this1[7] * this1[13] + this1[12] * this1[5] * this1[11] - this1[12] * this1[7] * this1[9];
	var inv_12 = -this1[4] * this1[9] * this1[14] + this1[4] * this1[10] * this1[13] + this1[8] * this1[5] * this1[14] - this1[8] * this1[6] * this1[13] - this1[12] * this1[5] * this1[10] + this1[12] * this1[6] * this1[9];
	var inv_1 = -this1[1] * this1[10] * this1[15] + this1[1] * this1[11] * this1[14] + this1[9] * this1[2] * this1[15] - this1[9] * this1[3] * this1[14] - this1[13] * this1[2] * this1[11] + this1[13] * this1[3] * this1[10];
	var inv_5 = this1[0] * this1[10] * this1[15] - this1[0] * this1[11] * this1[14] - this1[8] * this1[2] * this1[15] + this1[8] * this1[3] * this1[14] + this1[12] * this1[2] * this1[11] - this1[12] * this1[3] * this1[10];
	var inv_9 = -this1[0] * this1[9] * this1[15] + this1[0] * this1[11] * this1[13] + this1[8] * this1[1] * this1[15] - this1[8] * this1[3] * this1[13] - this1[12] * this1[1] * this1[11] + this1[12] * this1[3] * this1[9];
	var inv_13 = this1[0] * this1[9] * this1[14] - this1[0] * this1[10] * this1[13] - this1[8] * this1[1] * this1[14] + this1[8] * this1[2] * this1[13] + this1[12] * this1[1] * this1[10] - this1[12] * this1[2] * this1[9];
	var inv_2 = this1[1] * this1[6] * this1[15] - this1[1] * this1[7] * this1[14] - this1[5] * this1[2] * this1[15] + this1[5] * this1[3] * this1[14] + this1[13] * this1[2] * this1[7] - this1[13] * this1[3] * this1[6];
	var inv_6 = -this1[0] * this1[6] * this1[15] + this1[0] * this1[7] * this1[14] + this1[4] * this1[2] * this1[15] - this1[4] * this1[3] * this1[14] - this1[12] * this1[2] * this1[7] + this1[12] * this1[3] * this1[6];
	var inv_10 = this1[0] * this1[5] * this1[15] - this1[0] * this1[7] * this1[13] - this1[4] * this1[1] * this1[15] + this1[4] * this1[3] * this1[13] + this1[12] * this1[1] * this1[7] - this1[12] * this1[3] * this1[5];
	var inv_14 = -this1[0] * this1[5] * this1[14] + this1[0] * this1[6] * this1[13] + this1[4] * this1[1] * this1[14] - this1[4] * this1[2] * this1[13] - this1[12] * this1[1] * this1[6] + this1[12] * this1[2] * this1[5];
	var inv_3 = -this1[1] * this1[6] * this1[11] + this1[1] * this1[7] * this1[10] + this1[5] * this1[2] * this1[11] - this1[5] * this1[3] * this1[10] - this1[9] * this1[2] * this1[7] + this1[9] * this1[3] * this1[6];
	var inv_7 = this1[0] * this1[6] * this1[11] - this1[0] * this1[7] * this1[10] - this1[4] * this1[2] * this1[11] + this1[4] * this1[3] * this1[10] + this1[8] * this1[2] * this1[7] - this1[8] * this1[3] * this1[6];
	var inv_11 = -this1[0] * this1[5] * this1[11] + this1[0] * this1[7] * this1[9] + this1[4] * this1[1] * this1[11] - this1[4] * this1[3] * this1[9] - this1[8] * this1[1] * this1[7] + this1[8] * this1[3] * this1[5];
	var inv_15 = this1[0] * this1[5] * this1[10] - this1[0] * this1[6] * this1[9] - this1[4] * this1[1] * this1[10] + this1[4] * this1[2] * this1[9] + this1[8] * this1[1] * this1[6] - this1[8] * this1[2] * this1[5];
	var det = this1[0] * inv_0 + this1[1] * inv_4 + this1[2] * inv_8 + this1[3] * inv_12;
	if(det == 0) return null;
	return [inv_0,inv_1,inv_2,inv_3,inv_4,inv_5,inv_6,inv_7,inv_8,inv_9,inv_10,inv_11,inv_12,inv_13,inv_14,inv_15];
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
		if(Math.isNaN(lambda)) lambda = 0; else if(lambda > 1) lambda = 1; else if(lambda < 0) lambda = 0;
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
	this._isSelfIntersecting = false;
	this._length = false;
	this._area = false;
	this._isClosed = false;
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
	,intersections: function(other) {
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
	,selfIntersections: function() {
		var intersections = [];
		var _g1 = 0;
		var _g = this.splines.length;
		while(_g1 < _g) {
			var i = _g1++;
			intersections = intersections.concat(this.splines[i].selfIntersections());
			var _g3 = i;
			var _g2 = this.splines.length;
			while(_g3 < _g2) {
				var j = _g3++;
				intersections = intersections.concat(this.splines[i].intersectionsSpline(this.splines[j]));
			}
		}
		return intersections;
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
	,asClockwise: function(clockwise) {
		if(clockwise == null) clockwise = true;
		return new thx.geom.Path(this.splines.map(function(spline) {
			return spline.asClockwise(clockwise);
		}));
	}
	,hull: function(other) {
		throw "not implemented";
	}
	,minkowsky: function(other) {
		throw "not implemented";
	}
	,reduce: function() {
		return new thx.geom.Path(this.splines.map(function(spline) {
			return spline.reduce();
		}).filter(function(spline1) {
			return spline1.get_edges().length > 0;
		}));
	}
	,toPoints: function() {
		return thx.core.Arrays.flatten(this.splines.map(function(spline) {
			return spline.toPoints();
		}));
	}
	,toString: function() {
		return "Path(" + this.splines.map(function(s) {
			return "[" + s.toString() + "]";
		}).join(", ") + "," + Std.string(this.get_isClosed()) + ")";
	}
	,get_isClosed: function() {
		if(!this._isClosed) {
			this._isClosed = true;
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
		if(!this._area) {
			this._area = true;
			this.area = this.splines.reduce(function(acc,spline) {
				return acc + spline.get_area();
			},0);
		}
		return this.area;
	}
	,get_length: function() {
		if(!this._length) {
			this._length = true;
			this.length = this.splines.reduce(function(acc,spline) {
				return acc + spline.get_length();
			},0);
		}
		return this.length;
	}
	,get_isSelfIntersecting: function() {
		if(!this._isSelfIntersecting) {
			this._isSelfIntersecting = true;
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
	return Math.abs((function($this) {
		var $r;
		var this2;
		{
			var p_0 = -p[0];
			var p_1 = -p[1];
			this2 = [this1[0] + p_0,this1[1] + p_1];
		}
		$r = Math.sqrt(this2[0] * this2[0] + this2[1] * this2[1]);
		return $r;
	}(this)));
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
thx.geom._Point.Point_Impl_.isOnLine = function(this1,line) {
	if(line.get_isHorizontal()) return thx.math.Number.nearEquals(this1[1],line.w);
	return thx.math.Number.nearEquals(line.xAtY(this1[1]),this1[0]);
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
	this._isSelfIntersecting = false;
	this._length = false;
	this._area = false;
	this._isClockwise = false;
	this.nodes = nodes;
	this.isClosed = closed;
};
thx.geom.Spline.__name__ = true;
thx.geom.Spline.fromEdges = function(arr,closed) {
	var nodes = [];
	var points;
	if(arr.length > 0) {
		var edge = arr[0];
		var prev;
		if(closed) prev = arr[arr.length - 1]; else prev = new thx.geom.EdgeLinear(thx.geom._Point.Point_Impl_.zero,thx.geom._Point.Point_Impl_.zero);
		if(arr.length == 1) {
			nodes.push(new thx.geom.SplineNode(edge.first,edge.normalOut,null));
			nodes.push(new thx.geom.SplineNode(edge.last,null,edge.normalIn));
		} else {
			var _g1 = 0;
			var _g = arr.length;
			while(_g1 < _g) {
				var i = _g1++;
				edge = arr[i];
				nodes.push(new thx.geom.SplineNode(edge.first,edge.normalOut,prev.normalIn));
				prev = edge;
			}
			if(!closed) nodes.push(new thx.geom.SplineNode(edge.last,null,edge.normalIn));
		}
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
	if(null == nout && null == nin) return new thx.geom.EdgeLinear(a,b); else if(null == nout) return new thx.geom.EdgeCubic(a,a,nin,b); else if(null == nin) return new thx.geom.EdgeCubic(a,nout,b,b); else return new thx.geom.EdgeCubic(a,nout,nin,b);
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
	,intersectionLengths: function(spline) {
		var _g = this;
		return thx.core.Arrays.flatten(this.get_edges().map(function(a) {
			var len = a.get_length();
			return thx.core.Arrays.flatten(spline.get_edges().map(function(b) {
				return a.intersectionLengths(b).map(function(d) {
					return d * len;
				});
			}));
		})).map(function(v) {
			return v / _g.get_length();
		});
	}
	,splitBy: function(spline) {
		throw "not implemented";
	}
	,intersectionLineLengths: function(line) {
		throw "not implemented";
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
	,reduce: function() {
		var edges = this.get_edges();
		var i = edges.length;
		var result = [];
		var edge;
		while(--i >= 0) {
			edge = edges[i];
			if(edge.get_length() == 0) continue;
			if(edge.get_isLinear()) edge = edge.toLinear();
			result.unshift(edge);
		}
		return thx.geom.Spline.fromEdges(result,this.isClosed);
	}
	,get_isClockwise: function() {
		if(!this._isClockwise) {
			this._isClockwise = true;
			var sum = 0.0;
			this.iterateEdges(function(edge) {
				sum += (edge.last[0] - edge.first[0]) * (edge.last[1] + edge.first[1]);
			});
			this.isClockwise = sum > 0;
		}
		return this.isClockwise;
	}
	,asClockwise: function(clockwise) {
		if(clockwise == null) clockwise = true;
		if(this.get_isClockwise() == clockwise) return this; else {
			var counter = this.flip();
			counter.isClockwise = !clockwise;
			return counter;
		}
	}
	,toLinear: function() {
		var edges = thx.core.Arrays.flatten(this.get_edges().map(function(edge) {
			return edge.get_linearSegments();
		}));
		return thx.geom.Spline.fromEdges(edges,this.isClosed);
	}
	,toPath: function() {
		return new thx.geom.Path([this]);
	}
	,toPoints: function() {
		return this.nodes.map(function(node) {
			return node.position;
		});
	}
	,toString: function() {
		return "Spline(" + this.nodes.map(function(n) {
			return "[" + n.toStringValues() + "]";
		}).join(", ") + "," + Std.string(this.isClosed) + ")";
	}
	,get_area: function() {
		var _g = this;
		if(!this._area) {
			this._area = true;
			this.area = 0;
			this.iterateEdges(function(edge) {
				_g.area += edge.get_area();
			});
		}
		return this.area;
	}
	,get_length: function() {
		var _g = this;
		if(!this._length) {
			this._length = true;
			this.length = 0;
			this.iterateEdges(function(edge) {
				_g.length += edge.get_length();
			});
		}
		return this.length;
	}
	,get_isSelfIntersecting: function() {
		var _g = this;
		if(!this._isSelfIntersecting) {
			this._isSelfIntersecting = true;
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
				var this2 = node.normalOut;
				$r = !(this2[0] == null[0] && this2[1] == null[1]);
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
		return new thx.geom.SplineNode(thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.position),null != this.normalOut?thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.normalOut):null,null != this.normalIn?thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this.normalIn):null);
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
thx.geom.shape._Box.Box_Impl_.transform = function(this1,matrix) {
	return thx.geom.shape._Box.Box_Impl_.fromPoints(thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this1[0]),thx.geom._Matrix4x4.Matrix4x4_Impl_.leftMultiplyPoint(matrix,this1[1]));
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
	var this2 = this1[0];
	var x = Math.min(this2[0],point[0]);
	var y = Math.min(this2[1],point[1]);
	bottomLeft = [x,y];
	var topRight;
	var this3 = this1[1];
	var x1 = Math.max(this3[0],point[0]);
	var y1 = Math.max(this3[1],point[1]);
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
thx.geom.shape._Box.Box_Impl_.contains = function(this1,point) {
	return this1[0][0] <= point[0] && this1[1][0] >= point[0] && this1[1][1] >= point[1] && this1[0][1] <= point[1];
};
thx.geom.shape._Box.Box_Impl_.equals = function(this1,other) {
	return (function($this) {
		var $r;
		var this2 = this1[0];
		var p = other[0];
		$r = this2[0] == p[0] && this2[1] == p[1];
		return $r;
	}(this)) && (function($this) {
		var $r;
		var this3 = this1[1];
		var p1 = other[1];
		$r = this3[0] == p1[0] && this3[1] == p1[1];
		return $r;
	}(this));
};
thx.geom.shape._Box.Box_Impl_.toString = function(this1) {
	return "Box(x:" + this1[0][0] + ",y:" + this1[1][1] + ",w:" + (this1[1][0] - this1[0][0]) + ",h:" + (this1[1][1] - this1[0][1]) + ")";
};
thx.geom.shape._Box.Box_Impl_.toSpline = function(this1) {
	return thx.geom.Spline.fromArray([[this1[0][0],this1[1][1]],this1[1],[this1[1][0],this1[0][1]],this1[0]],true);
};
thx.geom.shape._Box.Box_Impl_.toPath = function(this1) {
	return new thx.geom.Path([thx.geom.shape._Box.Box_Impl_.toSpline(this1)]);
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
thx.math = {};
thx.math.Number = function() { };
thx.math.Number.__name__ = true;
thx.math.Number.isNearZero = function(n) {
	return Math.abs(n) <= 10e-10;
};
thx.math.Number.nearEquals = function(a,b) {
	return Math.abs(a - b) <= 10e-10;
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
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
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
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
thx.color.Color.names = new haxe.ds.StringMap();
var value = thx.color.Color.aliceblue = 15792383;
thx.color.Color.names.set("aliceblue",value);
thx.color.Color.names.set("alice blue",thx.color.Color.aliceblue);
var value1 = thx.color.Color.antiquewhite = 16444375;
thx.color.Color.names.set("antiquewhite",value1);
thx.color.Color.names.set("antique white",thx.color.Color.antiquewhite);
var value2 = thx.color.Color.aqua = 65535;
thx.color.Color.names.set("aqua",value2);
var value3 = thx.color.Color.aquamarine = 8388564;
thx.color.Color.names.set("aquamarine",value3);
var value4 = thx.color.Color.azure = 15794175;
thx.color.Color.names.set("azure",value4);
var value5 = thx.color.Color.beige = 16119260;
thx.color.Color.names.set("beige",value5);
var value6 = thx.color.Color.bisque = 16770244;
thx.color.Color.names.set("bisque",value6);
var value7 = thx.color.Color.black = 0;
thx.color.Color.names.set("black",value7);
var value8 = thx.color.Color.blanchedalmond = 16772045;
thx.color.Color.names.set("blanchedalmond",value8);
thx.color.Color.names.set("blanched almond",thx.color.Color.blanchedalmond);
var value9 = thx.color.Color.blue = 255;
thx.color.Color.names.set("blue",value9);
var value10 = thx.color.Color.blueviolet = 9055202;
thx.color.Color.names.set("blueviolet",value10);
thx.color.Color.names.set("blue violet",thx.color.Color.blueviolet);
var value11 = thx.color.Color.brown = 10824234;
thx.color.Color.names.set("brown",value11);
var value12 = thx.color.Color.burlywood = 14596231;
thx.color.Color.names.set("burlywood",value12);
thx.color.Color.names.set("burly wood",thx.color.Color.burlywood);
var value13 = thx.color.Color.cadetblue = 6266528;
thx.color.Color.names.set("cadetblue",value13);
thx.color.Color.names.set("cadet blue",thx.color.Color.cadetblue);
var value14 = thx.color.Color.chartreuse = 8388352;
thx.color.Color.names.set("chartreuse",value14);
thx.color.Color.names.set("chart reuse",thx.color.Color.chartreuse);
var value15 = thx.color.Color.chocolate = 13789470;
thx.color.Color.names.set("chocolate",value15);
var value16 = thx.color.Color.coral = 16744272;
thx.color.Color.names.set("coral",value16);
var value17 = thx.color.Color.cornflowerblue = 6591981;
thx.color.Color.names.set("cornflowerblue",value17);
thx.color.Color.names.set("corn flower blue",thx.color.Color.cornflowerblue);
var value18 = thx.color.Color.cornsilk = 16775388;
thx.color.Color.names.set("cornsilk",value18);
thx.color.Color.names.set("corn silk",thx.color.Color.cornsilk);
var value19 = thx.color.Color.crimson = 14423100;
thx.color.Color.names.set("crimson",value19);
var value20 = thx.color.Color.cyan = 65535;
thx.color.Color.names.set("cyan",value20);
var value21 = thx.color.Color.darkblue = 139;
thx.color.Color.names.set("darkblue",value21);
thx.color.Color.names.set("dark blue",thx.color.Color.darkblue);
var value22 = thx.color.Color.darkcyan = 35723;
thx.color.Color.names.set("darkcyan",value22);
thx.color.Color.names.set("dark cyan",thx.color.Color.darkcyan);
var value23 = thx.color.Color.darkgoldenrod = 12092939;
thx.color.Color.names.set("darkgoldenrod",value23);
thx.color.Color.names.set("dark golden rod",thx.color.Color.darkgoldenrod);
var value24 = thx.color.Color.darkgray = thx.color.Color.darkgrey = 11119017;
thx.color.Color.names.set("darkgray",value24);
thx.color.Color.names.set("dark gray",thx.color.Color.darkgray);
thx.color.Color.names.set("darkgrey",thx.color.Color.darkgrey);
thx.color.Color.names.set("dark grey",thx.color.Color.darkgrey);
var value25 = thx.color.Color.darkgreen = 25600;
thx.color.Color.names.set("darkgreen",value25);
thx.color.Color.names.set("dark green",thx.color.Color.darkgreen);
var value26 = thx.color.Color.darkkhaki = 12433259;
thx.color.Color.names.set("darkkhaki",value26);
thx.color.Color.names.set("dark khaki",thx.color.Color.darkkhaki);
var value27 = thx.color.Color.darkmagenta = 9109643;
thx.color.Color.names.set("darkmagenta",value27);
thx.color.Color.names.set("dark magenta",thx.color.Color.darkmagenta);
var value28 = thx.color.Color.darkolivegreen = 5597999;
thx.color.Color.names.set("darkolivegreen",value28);
thx.color.Color.names.set("dark olive green",thx.color.Color.darkolivegreen);
var value29 = thx.color.Color.darkorange = 16747520;
thx.color.Color.names.set("darkorange",value29);
thx.color.Color.names.set("dark orange",thx.color.Color.darkorange);
var value30 = thx.color.Color.darkorchid = 10040012;
thx.color.Color.names.set("darkorchid",value30);
thx.color.Color.names.set("dark orchid",thx.color.Color.darkorchid);
var value31 = thx.color.Color.darkred = 9109504;
thx.color.Color.names.set("darkred",value31);
thx.color.Color.names.set("dark red",thx.color.Color.darkred);
var value32 = thx.color.Color.darksalmon = 15308410;
thx.color.Color.names.set("darksalmon",value32);
thx.color.Color.names.set("dark salmon",thx.color.Color.darksalmon);
var value33 = thx.color.Color.darkseagreen = 9419919;
thx.color.Color.names.set("darkseagreen",value33);
thx.color.Color.names.set("dark sea green",thx.color.Color.darkseagreen);
var value34 = thx.color.Color.darkslateblue = 4734347;
thx.color.Color.names.set("darkslateblue",value34);
thx.color.Color.names.set("dark slate blue",thx.color.Color.darkslateblue);
var value35 = thx.color.Color.darkslategray = thx.color.Color.darkslategrey = 3100495;
thx.color.Color.names.set("darkslategray",value35);
thx.color.Color.names.set("dark slate gray",thx.color.Color.darkslategray);
thx.color.Color.names.set("darkslategrey",thx.color.Color.darkslategrey);
thx.color.Color.names.set("dark slate grey",thx.color.Color.darkslategrey);
var value36 = thx.color.Color.darkturquoise = 52945;
thx.color.Color.names.set("darkturquoise",value36);
thx.color.Color.names.set("dark turquoise",thx.color.Color.darkturquoise);
var value37 = thx.color.Color.darkviolet = 9699539;
thx.color.Color.names.set("darkviolet",value37);
thx.color.Color.names.set("dark violet",thx.color.Color.darkviolet);
var value38 = thx.color.Color.deeppink = 16716947;
thx.color.Color.names.set("deeppink",value38);
thx.color.Color.names.set("deep pink",thx.color.Color.deeppink);
var value39 = thx.color.Color.deepskyblue = 49151;
thx.color.Color.names.set("deepskyblue",value39);
thx.color.Color.names.set("deep sky blue",thx.color.Color.deepskyblue);
var value40 = thx.color.Color.dimgray = thx.color.Color.dimgrey = 6908265;
thx.color.Color.names.set("dimgray",value40);
thx.color.Color.names.set("dim grey",thx.color.Color.dimgrey);
thx.color.Color.names.set("dimgrey",thx.color.Color.dimgrey);
thx.color.Color.names.set("dim grey",thx.color.Color.dimgrey);
var value41 = thx.color.Color.dodgerblue = 2003199;
thx.color.Color.names.set("dodgerblue",value41);
thx.color.Color.names.set("dodger blue",thx.color.Color.dodgerblue);
var value42 = thx.color.Color.firebrick = 11674146;
thx.color.Color.names.set("firebrick",value42);
thx.color.Color.names.set("fire brick",thx.color.Color.firebrick);
var value43 = thx.color.Color.floralwhite = 16775920;
thx.color.Color.names.set("floralwhite",value43);
thx.color.Color.names.set("floral white",thx.color.Color.floralwhite);
var value44 = thx.color.Color.forestgreen = 2263842;
thx.color.Color.names.set("forestgreen",value44);
thx.color.Color.names.set("forest green",thx.color.Color.forestgreen);
var value45 = thx.color.Color.fuchsia = 16711935;
thx.color.Color.names.set("fuchsia",value45);
var value46 = thx.color.Color.gainsboro = 14474460;
thx.color.Color.names.set("gainsboro",value46);
var value47 = thx.color.Color.ghostwhite = 16316671;
thx.color.Color.names.set("ghostwhite",value47);
thx.color.Color.names.set("ghost white",thx.color.Color.ghostwhite);
var value48 = thx.color.Color.gold = 16766720;
thx.color.Color.names.set("gold",value48);
var value49 = thx.color.Color.goldenrod = 14329120;
thx.color.Color.names.set("goldenrod",value49);
thx.color.Color.names.set("golden rod",thx.color.Color.goldenrod);
var value50 = thx.color.Color.gray = thx.color.Color.grey = 8421504;
thx.color.Color.names.set("gray",value50);
thx.color.Color.names.set("grey",thx.color.Color.grey);
var value51 = thx.color.Color.green = 32768;
thx.color.Color.names.set("green",value51);
var value52 = thx.color.Color.greenyellow = 11403055;
thx.color.Color.names.set("greenyellow",value52);
thx.color.Color.names.set("green yellow",thx.color.Color.greenyellow);
var value53 = thx.color.Color.honeydew = 15794160;
thx.color.Color.names.set("honeydew",value53);
thx.color.Color.names.set("honey dew",thx.color.Color.honeydew);
var value54 = thx.color.Color.hotpink = 16738740;
thx.color.Color.names.set("hotpink",value54);
thx.color.Color.names.set("hot pink",thx.color.Color.hotpink);
var value55 = thx.color.Color.indianred = 13458524;
thx.color.Color.names.set("indianred",value55);
thx.color.Color.names.set("indian red",thx.color.Color.indianred);
var value56 = thx.color.Color.indigo = 4915330;
thx.color.Color.names.set("indigo",value56);
var value57 = thx.color.Color.ivory = 16777200;
thx.color.Color.names.set("ivory",value57);
var value58 = thx.color.Color.khaki = 15787660;
thx.color.Color.names.set("khaki",value58);
var value59 = thx.color.Color.lavender = 15132410;
thx.color.Color.names.set("lavender",value59);
var value60 = thx.color.Color.lavenderblush = 16773365;
thx.color.Color.names.set("lavenderblush",value60);
thx.color.Color.names.set("lavender blush",thx.color.Color.lavenderblush);
var value61 = thx.color.Color.lawngreen = 8190976;
thx.color.Color.names.set("lawngreen",value61);
thx.color.Color.names.set("lawn green",thx.color.Color.lawngreen);
var value62 = thx.color.Color.lemonchiffon = 16775885;
thx.color.Color.names.set("lemonchiffon",value62);
thx.color.Color.names.set("lemon chiffon",thx.color.Color.lemonchiffon);
var value63 = thx.color.Color.lightblue = 11393254;
thx.color.Color.names.set("lightblue",value63);
thx.color.Color.names.set("light blue",thx.color.Color.lightblue);
var value64 = thx.color.Color.lightcoral = 15761536;
thx.color.Color.names.set("lightcoral",value64);
thx.color.Color.names.set("light coral",thx.color.Color.lightcoral);
var value65 = thx.color.Color.lightcyan = 14745599;
thx.color.Color.names.set("lightcyan",value65);
thx.color.Color.names.set("light cyan",thx.color.Color.lightcyan);
var value66 = thx.color.Color.lightgoldenrodyellow = 16448210;
thx.color.Color.names.set("lightgoldenrodyellow",value66);
thx.color.Color.names.set("light golden rod yellow",thx.color.Color.lightgoldenrodyellow);
var value67 = thx.color.Color.lightgray = thx.color.Color.lightgrey = 13882323;
thx.color.Color.names.set("lightgray",value67);
thx.color.Color.names.set("light gray",thx.color.Color.lightgray);
thx.color.Color.names.set("lightgrey",thx.color.Color.lightgrey);
thx.color.Color.names.set("light grey",thx.color.Color.lightgrey);
var value68 = thx.color.Color.lightgreen = 9498256;
thx.color.Color.names.set("lightgreen",value68);
thx.color.Color.names.set("light green",thx.color.Color.lightgreen);
var value69 = thx.color.Color.lightpink = 16758465;
thx.color.Color.names.set("lightpink",value69);
thx.color.Color.names.set("light pink",thx.color.Color.lightpink);
var value70 = thx.color.Color.lightsalmon = 16752762;
thx.color.Color.names.set("lightsalmon",value70);
thx.color.Color.names.set("light salmon",thx.color.Color.lightsalmon);
var value71 = thx.color.Color.lightseagreen = 2142890;
thx.color.Color.names.set("lightseagreen",value71);
thx.color.Color.names.set("light sea green",thx.color.Color.lightseagreen);
var value72 = thx.color.Color.lightskyblue = 8900346;
thx.color.Color.names.set("lightskyblue",value72);
thx.color.Color.names.set("light sky blue",thx.color.Color.lightskyblue);
var value73 = thx.color.Color.lightslategray = thx.color.Color.lightslategrey = 7833753;
thx.color.Color.names.set("lightslategray",value73);
thx.color.Color.names.set("light slate gray",thx.color.Color.lightslategray);
thx.color.Color.names.set("lightslategrey",thx.color.Color.lightslategrey);
thx.color.Color.names.set("light slate grey",thx.color.Color.lightslategrey);
var value74 = thx.color.Color.lightsteelblue = 11584734;
thx.color.Color.names.set("lightsteelblue",value74);
thx.color.Color.names.set("light steel blue",thx.color.Color.lightsteelblue);
var value75 = thx.color.Color.lightyellow = 16777184;
thx.color.Color.names.set("lightyellow",value75);
thx.color.Color.names.set("light yellow",thx.color.Color.lightyellow);
var value76 = thx.color.Color.lime = 65280;
thx.color.Color.names.set("lime",value76);
var value77 = thx.color.Color.limegreen = 3329330;
thx.color.Color.names.set("limegreen",value77);
thx.color.Color.names.set("lime green",thx.color.Color.limegreen);
var value78 = thx.color.Color.linen = 16445670;
thx.color.Color.names.set("linen",value78);
var value79 = thx.color.Color.magenta = 16711935;
thx.color.Color.names.set("magenta",value79);
var value80 = thx.color.Color.maroon = 8388608;
thx.color.Color.names.set("maroon",value80);
var value81 = thx.color.Color.mediumaquamarine = 6737322;
thx.color.Color.names.set("mediumaquamarine",value81);
thx.color.Color.names.set("mediuma quamarine",thx.color.Color.mediumaquamarine);
var value82 = thx.color.Color.mediumblue = 205;
thx.color.Color.names.set("mediumblue",value82);
thx.color.Color.names.set("medium blue",thx.color.Color.mediumblue);
var value83 = thx.color.Color.mediumorchid = 12211667;
thx.color.Color.names.set("mediumorchid",value83);
thx.color.Color.names.set("medium orchid",thx.color.Color.mediumorchid);
var value84 = thx.color.Color.mediumpurple = 9662683;
thx.color.Color.names.set("mediumpurple",value84);
thx.color.Color.names.set("medium purple",thx.color.Color.mediumpurple);
var value85 = thx.color.Color.mediumseagreen = 3978097;
thx.color.Color.names.set("mediumseagreen",value85);
thx.color.Color.names.set("medium sea green",thx.color.Color.mediumseagreen);
var value86 = thx.color.Color.mediumslateblue = 8087790;
thx.color.Color.names.set("mediumslateblue",value86);
thx.color.Color.names.set("medium slate blue",thx.color.Color.mediumslateblue);
var value87 = thx.color.Color.mediumspringgreen = 64154;
thx.color.Color.names.set("mediumspringgreen",value87);
thx.color.Color.names.set("medium spring green",thx.color.Color.mediumspringgreen);
var value88 = thx.color.Color.mediumturquoise = 4772300;
thx.color.Color.names.set("mediumturquoise",value88);
thx.color.Color.names.set("medium turquoise",thx.color.Color.mediumturquoise);
var value89 = thx.color.Color.mediumvioletred = 13047173;
thx.color.Color.names.set("mediumvioletred",value89);
thx.color.Color.names.set("medium violet red",thx.color.Color.mediumvioletred);
var value90 = thx.color.Color.midnightblue = 1644912;
thx.color.Color.names.set("midnightblue",value90);
thx.color.Color.names.set("midnight blue",thx.color.Color.midnightblue);
var value91 = thx.color.Color.mintcream = 16121850;
thx.color.Color.names.set("mintcream",value91);
thx.color.Color.names.set("mint cream",thx.color.Color.mintcream);
var value92 = thx.color.Color.mistyrose = 16770273;
thx.color.Color.names.set("mistyrose",value92);
thx.color.Color.names.set("misty rose",thx.color.Color.mistyrose);
var value93 = thx.color.Color.moccasin = 16770229;
thx.color.Color.names.set("moccasin",value93);
var value94 = thx.color.Color.navajowhite = 16768685;
thx.color.Color.names.set("navajowhite",value94);
thx.color.Color.names.set("navajo white",thx.color.Color.navajowhite);
var value95 = thx.color.Color.navy = 128;
thx.color.Color.names.set("navy",value95);
var value96 = thx.color.Color.oldlace = 16643558;
thx.color.Color.names.set("oldlace",value96);
thx.color.Color.names.set("old lace",thx.color.Color.oldlace);
var value97 = thx.color.Color.olive = 8421376;
thx.color.Color.names.set("olive",value97);
var value98 = thx.color.Color.olivedrab = 7048739;
thx.color.Color.names.set("olivedrab",value98);
thx.color.Color.names.set("olive drab",thx.color.Color.olivedrab);
var value99 = thx.color.Color.orange = 16753920;
thx.color.Color.names.set("orange",value99);
var value100 = thx.color.Color.orangered = 16729344;
thx.color.Color.names.set("orangered",value100);
thx.color.Color.names.set("orangered",thx.color.Color.orangered);
var value101 = thx.color.Color.orchid = 14315734;
thx.color.Color.names.set("orchid",value101);
var value102 = thx.color.Color.palegoldenrod = 15657130;
thx.color.Color.names.set("palegoldenrod",value102);
thx.color.Color.names.set("pale golden rod",thx.color.Color.palegoldenrod);
var value103 = thx.color.Color.palegreen = 10025880;
thx.color.Color.names.set("palegreen",value103);
thx.color.Color.names.set("pale green",thx.color.Color.palegreen);
var value104 = thx.color.Color.paleturquoise = 11529966;
thx.color.Color.names.set("paleturquoise",value104);
thx.color.Color.names.set("pale turquoise",thx.color.Color.paleturquoise);
var value105 = thx.color.Color.palevioletred = 14381203;
thx.color.Color.names.set("palevioletred",value105);
thx.color.Color.names.set("pale violet red",thx.color.Color.palevioletred);
var value106 = thx.color.Color.papayawhip = 16773077;
thx.color.Color.names.set("papayawhip",value106);
thx.color.Color.names.set("papaya whip",thx.color.Color.papayawhip);
var value107 = thx.color.Color.peachpuff = 16767673;
thx.color.Color.names.set("peachpuff",value107);
thx.color.Color.names.set("peach puff",thx.color.Color.peachpuff);
var value108 = thx.color.Color.peru = 13468991;
thx.color.Color.names.set("peru",value108);
var value109 = thx.color.Color.pink = 16761035;
thx.color.Color.names.set("pink",value109);
var value110 = thx.color.Color.plum = 14524637;
thx.color.Color.names.set("plum",value110);
var value111 = thx.color.Color.powderblue = 11591910;
thx.color.Color.names.set("powderblue",value111);
thx.color.Color.names.set("powder blue",thx.color.Color.powderblue);
var value112 = thx.color.Color.purple = 8388736;
thx.color.Color.names.set("purple",value112);
var value113 = thx.color.Color.red = 16711680;
thx.color.Color.names.set("red",value113);
var value114 = thx.color.Color.rosybrown = 12357519;
thx.color.Color.names.set("rosybrown",value114);
thx.color.Color.names.set("rosy brown",thx.color.Color.rosybrown);
var value115 = thx.color.Color.royalblue = 4286945;
thx.color.Color.names.set("royalblue",value115);
thx.color.Color.names.set("royal blue",thx.color.Color.royalblue);
var value116 = thx.color.Color.saddlebrown = 9127187;
thx.color.Color.names.set("saddlebrown",value116);
thx.color.Color.names.set("saddle brown",thx.color.Color.saddlebrown);
var value117 = thx.color.Color.salmon = 16416882;
thx.color.Color.names.set("salmon",value117);
var value118 = thx.color.Color.sandybrown = 16032864;
thx.color.Color.names.set("sandybrown",value118);
thx.color.Color.names.set("sandy brown",thx.color.Color.sandybrown);
var value119 = thx.color.Color.seagreen = 3050327;
thx.color.Color.names.set("seagreen",value119);
thx.color.Color.names.set("sea green",thx.color.Color.seagreen);
var value120 = thx.color.Color.seashell = 16774638;
thx.color.Color.names.set("seashell",value120);
thx.color.Color.names.set("sea shell",thx.color.Color.seashell);
var value121 = thx.color.Color.sienna = 10506797;
thx.color.Color.names.set("sienna",value121);
var value122 = thx.color.Color.silver = 12632256;
thx.color.Color.names.set("silver",value122);
var value123 = thx.color.Color.skyblue = 8900331;
thx.color.Color.names.set("skyblue",value123);
thx.color.Color.names.set("sky blue",thx.color.Color.skyblue);
var value124 = thx.color.Color.slateblue = 6970061;
thx.color.Color.names.set("slateblue",value124);
thx.color.Color.names.set("slate blue",thx.color.Color.slateblue);
var value125 = thx.color.Color.slategray = thx.color.Color.slategrey = 7372944;
thx.color.Color.names.set("slategray",value125);
thx.color.Color.names.set("slate gray",thx.color.Color.slategray);
thx.color.Color.names.set("slategrey",thx.color.Color.slategrey);
thx.color.Color.names.set("slate grey",thx.color.Color.slategrey);
var value126 = thx.color.Color.snow = 16775930;
thx.color.Color.names.set("snow",value126);
var value127 = thx.color.Color.springgreen = 65407;
thx.color.Color.names.set("springgreen",value127);
thx.color.Color.names.set("spring green",thx.color.Color.springgreen);
var value128 = thx.color.Color.steelblue = 4620980;
thx.color.Color.names.set("steelblue",value128);
thx.color.Color.names.set("steel blue",thx.color.Color.steelblue);
var value129 = thx.color.Color.tan = 13808780;
thx.color.Color.names.set("tan",value129);
var value130 = thx.color.Color.teal = 32896;
thx.color.Color.names.set("teal",value130);
var value131 = thx.color.Color.thistle = 14204888;
thx.color.Color.names.set("thistle",value131);
var value132 = thx.color.Color.tomato = 16737095;
thx.color.Color.names.set("tomato",value132);
var value133 = thx.color.Color.turquoise = 4251856;
thx.color.Color.names.set("turquoise",value133);
var value134 = thx.color.Color.violet = 15631086;
thx.color.Color.names.set("violet",value134);
var value135 = thx.color.Color.wheat = 16113331;
thx.color.Color.names.set("wheat",value135);
var value136 = thx.color.Color.white = 16777215;
thx.color.Color.names.set("white",value136);
var value137 = thx.color.Color.whitesmoke = 16119285;
thx.color.Color.names.set("whitesmoke",value137);
thx.color.Color.names.set("white smoke",thx.color.Color.whitesmoke);
var value138 = thx.color.Color.yellow = 16776960;
thx.color.Color.names.set("yellow",value138);
var value139 = thx.color.Color.yellowgreen = 10145074;
thx.color.Color.names.set("yellowgreen",value139);
thx.color.Color.names.set("yellow green",thx.color.Color.yellowgreen);
chad.render._Cap.Cap_Impl_.butt = "butt";
chad.render._Cap.Cap_Impl_.round = "round";
chad.render._Cap.Cap_Impl_.square = "square";
chad.render._Join.Join_Impl_.miter = "miter";
chad.render._Join.Join_Impl_.round = "round";
chad.render._Join.Join_Impl_.bevel = "bevel";
chad.render.LineStyle.defaultColor = -16777216;
thx.color.parse.ColorParser.parser = new thx.color.parse.ColorParser();
thx.color.parse.ColorParser.isPureHex = new EReg("^([0-9a-f]{2}){3,4}$","i");
thx.core.Floats.pattern_parse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
thx.core.Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
thx.geom.Const.EPSILON = 1e-5;
thx.geom.Const.KAPPA = 0.5522847498307936;
thx.geom.EdgeCubic.NEAR_FLAT = 1.001;
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
thx.math.Number.TOLERANCE = 10e-5;
thx.math.Number.EPSILON = 10e-10;
thx.math.Number.abscissas = [[0.5773502691896257645091488],[0,0.7745966692414833770358531],[0.3399810435848562648026658,0.8611363115940525752239465],[0,0.5384693101056830910363144,0.9061798459386639927976269],[0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],[0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],[0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],[0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],[0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],[0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],[0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],[0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],[0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],[0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],[0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]];
thx.math.Number.weights = [[1.0],[0.8888888888888888888888889,0.5555555555555555555555556],[0.6521451548625461426269361,0.3478548451374538573730639],[0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],[0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],[0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],[0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],[0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],[0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],[0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],[0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],[0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],[0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],[0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],[0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]];
thx.unit.angle.Const.TO_DEGREE = 180 / Math.PI;
Canvas.main();
})();
