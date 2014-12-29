(function () { "use strict";
var console = (1,eval)('this').console || {log:function(){}};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Boolean = function() { };
Boolean.__name__ = ["Boolean"];
Boolean.main = function() {
	Boolean.create("squares",120,120,function(render) {
		var sq1 = [[10,10],[100,100]];
		var sq2 = [[0,0],[70,70]];
		var tmp;
		var tmp1;
		var t1 = thx_geom_shape__$Box_Box_$Impl_$.toSpline(sq2);
		var tmp2;
		var tmp3;
		var this11 = thx_unit_angle__$Degree_Degree_$Impl_$._new(45);
		tmp3 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this11 * 0.0174532925199433);
		var this1 = tmp3;
		tmp2 = this1;
		var angle = tmp2;
		tmp1 = t1.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.rotationZ(angle));
		var t = tmp1;
		tmp = t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.translation([30,0,0]));
		render.drawPath(thx_geom_shape__$Box_Box_$Impl_$.toPath(sq1).difference(tmp.toPath()));
	});
};
Boolean.create = function(title,w,h,handler) {
	MiniCanvas.displayGenerationTime = true;
	var mini = new MiniCanvas(w,h);
	var graphics = new chad_render_canvas_MiniCanvasGraphics(mini);
	var render = new chad_render_Render(graphics);
	handler(render);
	mini.display(title);
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		var tmp;
		if((this.r.m != null?n >= 0:false)?n < this.r.m.length:false) tmp = this.r.m[n]; else throw "EReg::matched";
		return tmp;
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		var tmp;
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) this.r.s = s;
			tmp = b;
		} else {
			var b1 = this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			tmp = b1;
		}
		return tmp;
	}
	,split: function(s) {
		return s.replace(this.r,"#__delim__#").split("#__delim__#");
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		do {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				var x = HxOverrides.substr(s,offset,null);
				buf_b += x == null?"null":"" + x;
				break;
			}
			var p = this.matchedPos();
			var x1 = HxOverrides.substr(s,offset,p.pos - offset);
			buf_b += x1 == null?"null":"" + x1;
			var x2 = f(this);
			buf_b += x2 == null?"null":"" + x2;
			if(p.len == 0) {
				var x3 = HxOverrides.substr(s,p.pos,1);
				buf_b += x3 == null?"null":"" + x3;
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
		} while(this.r.global);
		if((!this.r.global?offset > 0:false)?offset < s.length:false) {
			var x4 = HxOverrides.substr(s,offset,null);
			buf_b += x4 == null?"null":"" + x4;
		}
		return buf_b;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(((pos != null?pos != 0:false)?len != null:false)?len < 0:false) return "";
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
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Math.__name__ = ["Math"];
var ScaleMode = { __ename__ : ["ScaleMode"], __constructs__ : ["NoScale","Auto","Scaled"] };
ScaleMode.NoScale = ["NoScale",0];
ScaleMode.NoScale.__enum__ = ScaleMode;
ScaleMode.Auto = ["Auto",1];
ScaleMode.Auto.__enum__ = ScaleMode;
ScaleMode.Scaled = function(v) { var $x = ["Scaled",2,v]; $x.__enum__ = ScaleMode; return $x; };
var MiniCanvas = function(width,height,scaleMode) {
	this.scaleMode = scaleMode;
	this.width = width;
	this.height = height;
	this.processScale();
	if(MiniCanvas.isNode()) this.initNode(); else this.initBrowser();
	this.startTime = performance.now();
};
MiniCanvas.__name__ = ["MiniCanvas"];
MiniCanvas.isNode = function() {
	return typeof module !== 'undefined' && module.exports;
};
MiniCanvas.devicePixelRatio = function() {
	return window.devicePixelRatio || 1;
};
MiniCanvas.backingStoreRatio = function() {
	if(MiniCanvas._backingStoreRatio == 0) {
		var tmp;
		var _this = window.document;
		tmp = _this.createElement("canvas");
		var canvas = tmp;
		var context = canvas.getContext("2d");
		MiniCanvas._backingStoreRatio = (function(c) {
        return c.webkitBackingStorePixelRatio ||
          c.mozBackingStorePixelRatio ||
          c.msBackingStorePixelRatio ||
          c.oBackingStorePixelRatio ||
          c.backingStorePixelRatio || 1;
        })(context);
	}
	return MiniCanvas._backingStoreRatio;
};
MiniCanvas.prototype = {
	width: null
	,height: null
	,scaleMode: null
	,canvas: null
	,ctx: null
	,startTime: null
	,deltaTime: null
	,processScale: function() {
		var tmp;
		if(null != this.scaleMode) tmp = this.scaleMode; else if(MiniCanvas.isNode()) tmp = MiniCanvas.defaultNodeScaleMode; else tmp = MiniCanvas.defaultBrowserScaleMode;
		this.scaleMode = tmp;
		var _g = this.scaleMode;
		switch(_g[1]) {
		case 1:
			var ratio = MiniCanvas.devicePixelRatio() / MiniCanvas.backingStoreRatio();
			if(ratio != 1) this.scaleMode = ScaleMode.Scaled(ratio); else this.scaleMode = ScaleMode.NoScale;
			break;
		default:
		}
	}
	,display: function(name) {
		this.deltaTime = performance.now() - this.startTime;
		if(!MiniCanvas.displayGenerationTime) console.log("generated \"" + name + "\" in " + thx_core_Floats.roundTo(this.deltaTime,2) + "ms");
		if(MiniCanvas.isNode()) this.save(name); else this.append(name);
		return this;
	}
	,box: function(handler) {
		var _g1 = 0;
		var _g = this.width;
		while(_g1 < _g) {
			var x = _g1++;
			var _g3 = 0;
			var _g2 = this.height;
			while(_g3 < _g2) {
				var y = _g3++;
				var tmp;
				var this1 = handler(x / this.width,y / this.height);
				tmp = "rgba(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + "," + (this1 >> 24 & 255) / 255 + ")";
				this.ctx.fillStyle = tmp;
				this.ctx.fillRect(x,y,1,1);
			}
		}
		return this;
	}
	,checkboard: function(size,light,dark) {
		if(size == null) size = 8;
		var cols = Math.ceil(this.width / size);
		var rows = Math.ceil(this.height / size);
		var tmp;
		var this1 = null == light?thx_color_Color.white:light;
		tmp = "rgb(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + ")";
		var slight = tmp;
		var tmp1;
		var this2 = null == dark?thx_color_Color.lightgrey:dark;
		tmp1 = "rgb(" + (this2 >> 16 & 255) + "," + (this2 >> 8 & 255) + "," + (this2 & 255) + ")";
		var sdark = tmp1;
		var _g = 0;
		while(_g < cols) {
			var c = _g++;
			var _g1 = 0;
			while(_g1 < rows) {
				var r = _g1++;
				this.ctx.fillStyle = c % 2 != r % 2?slight:sdark;
				this.ctx.fillRect(c * size,r * size,size,size);
			}
		}
		return this;
	}
	,gradientHorizontal: function(handler) {
		var _g1 = 0;
		var _g = this.width;
		while(_g1 < _g) {
			var x = _g1++;
			var tmp;
			var this1 = handler(x / this.width);
			tmp = "rgba(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + "," + (this1 >> 24 & 255) / 255 + ")";
			this.ctx.fillStyle = tmp;
			this.ctx.fillRect(x,0,1,this.height);
		}
		return this;
	}
	,gradientVertical: function(handler) {
		var _g1 = 0;
		var _g = this.height;
		while(_g1 < _g) {
			var y = _g1++;
			var tmp;
			var this1 = handler(y / this.height);
			tmp = "rgba(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + "," + (this1 >> 24 & 255) / 255 + ")";
			this.ctx.fillStyle = tmp;
			this.ctx.fillRect(0,y,this.width,1);
		}
		return this;
	}
	,initBrowser: function() {
		var tmp;
		var _this = window.document;
		tmp = _this.createElement("canvas");
		this.canvas = tmp;
		{
			var _g = this.scaleMode;
			switch(_g[1]) {
			case 2:
				var v = _g[2];
				this.canvas.width = Math.round(this.width * v);
				this.canvas.height = Math.round(this.height * v);
				this.canvas.style.width = "" + this.width + "px";
				this.canvas.style.height = "" + this.height + "px";
				this.ctx = this.canvas.getContext("2d");
				this.ctx.scale(v,v);
				break;
			default:
				this.canvas.width = this.width;
				this.canvas.height = this.height;
				this.ctx = this.canvas.getContext("2d");
			}
		}
	}
	,append: function(name) {
		var figure = window.document.createElement("figure");
		var caption = window.document.createElement("figcaption");
		figure.className = "minicanvas";
		figure.appendChild(this.canvas);
		caption.innerHTML = thx_core_Strings.humanize(name) + (MiniCanvas.displayGenerationTime?" <span class=\"info\">(" + thx_core_Floats.roundTo(this.deltaTime,2) + "ms)</span>":"");
		figure.appendChild(caption);
		MiniCanvas.parentNode.appendChild(figure);
	}
	,save: function(name) {
		var fs = require("fs");
		var out = fs.createWriteStream("" + MiniCanvas.imagePath + "/" + name + ".png");
		var stream = this.canvas.pngStream();
		stream.on("data",function(chunk) {
			out.write(chunk);
		});
		stream.on("end",function(_) {
			console.log("saved " + name + ".png");
		});
	}
	,initNode: function() {
		var Canvas = require("canvas");
		{
			var _g = this.scaleMode;
			switch(_g[1]) {
			case 2:
				var v = _g[2];
				this.canvas = new Canvas(this.width * v,this.height * v);
				this.ctx = this.canvas.getContext("2d");
				this.ctx.scale(v,v);
				break;
			default:
				this.canvas = new Canvas(this.width,this.height);
				this.ctx = this.canvas.getContext("2d");
			}
		}
	}
	,__class__: MiniCanvas
};
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	var tmp;
	try {
		tmp = o[field];
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if((f != "__id__"?f != "hx__closures__":false)?hasOwnProperty.call(o,f):false) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	var tmp;
	if(typeof(f) == "function") {
		var tmp1;
		if(!f.__name__) tmp1 = f.__ename__; else tmp1 = true;
		tmp = !tmp1;
	} else tmp = false;
	return tmp;
};
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	var tmp;
	if(!(t == "string")) {
		if(t == "object") tmp = v.__enum__ == null; else tmp = false;
	} else tmp = true;
	var tmp1;
	if(!tmp) {
		if(t == "function") {
			var tmp2;
			if(!v.__name__) tmp2 = v.__ename__; else tmp2 = true;
			tmp1 = tmp2 != null;
		} else tmp1 = false;
	} else tmp1 = true;
	return tmp1;
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	var tmp;
	if(v == 0) {
		if(!(HxOverrides.cca(x,1) == 120)) tmp = HxOverrides.cca(x,1) == 88; else tmp = true;
	} else tmp = false;
	if(tmp) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.random = function(x) {
	return x <= 0?0:Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.startsWith = function(s,start) {
	return s.length >= start.length?HxOverrides.substr(s,0,start.length) == start:false;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen?HxOverrides.substr(s,slen - elen,elen) == end:false;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return !(c > 8?c < 14:false)?c == 32:true;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l?StringTools.isSpace(s,r):false) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l?StringTools.isSpace(s,l - r - 1):false) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	do {
		s = "0123456789ABCDEF".charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
var ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	var tmp;
	if((o instanceof Array)?o.__enum__ == null:false) tmp = Array; else {
		var cl = o.__class__;
		if(cl != null) tmp = cl; else {
			var name = js_Boot.__nativeClassName(o);
			if(name != null) tmp = js_Boot.__resolveNativeClass(name); else tmp = null;
		}
	}
	return tmp;
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var tmp;
		if((v instanceof Array)?v.__enum__ == null:false) tmp = Array; else {
			var cl = v.__class__;
			if(cl != null) tmp = cl; else {
				var name = js_Boot.__nativeClassName(v);
				if(name != null) tmp = js_Boot.__resolveNativeClass(name); else tmp = null;
			}
		}
		var c = tmp;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(!v.__name__?v.__ename__:true) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var chad_render_FillStyle = { __ename__ : ["chad","render","FillStyle"], __constructs__ : ["FillColor"] };
chad_render_FillStyle.FillColor = function(c) { var $x = ["FillColor",0,c]; $x.__enum__ = chad_render_FillStyle; return $x; };
var chad_render_IGraphics = function() { };
chad_render_IGraphics.__name__ = ["chad","render","IGraphics"];
chad_render_IGraphics.prototype = {
	get_reverseCoords: null
	,weightScale: null
	,reverseCoords: null
	,wrap: null
	,lineTo: null
	,curveTo: null
	,moveTo: null
	,applyStrokeStyle: null
	,applyFillStyle: null
	,__class__: chad_render_IGraphics
};
var chad_render_LineStyle = function(width,color,join,cap) {
	if(cap == null) cap = "butt";
	if(join == null) join = "miter";
	if(width == null) width = 1.0;
	this.width = width;
	var tmp;
	var tmp1;
	var _0 = color;
	if(null == _0) tmp1 = null; else tmp1 = _0;
	var t = tmp1;
	if(t != null) tmp = t; else tmp = chad_render_LineStyle.defaultColor;
	this.color = tmp;
	this.join = join;
	this.cap = cap;
};
chad_render_LineStyle.__name__ = ["chad","render","LineStyle"];
chad_render_LineStyle.prototype = {
	width: null
	,color: null
	,join: null
	,cap: null
	,__class__: chad_render_LineStyle
};
var chad_render_Render = function(graphics) {
	this.g = graphics;
	this.g.applyStrokeStyle(chad_render_StrokeStyle.StrokeLine(new chad_render_LineStyle()));
	this.g.applyFillStyle(chad_render_FillStyle.FillColor(thx_color__$RGBA_RGBA_$Impl_$.fromString("#000000")));
};
chad_render_Render.__name__ = ["chad","render","Render"];
chad_render_Render.prototype = {
	g: null
	,drawDot: function(point,fill,stroke,size) {
		if(size == null) size = 2;
		size = this.g.weightScale(size);
		var tmp;
		var t = thx_geom_shape__$Circle_Circle_$Impl_$.unitaryCircle.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.scaling([size,size,1]));
		tmp = t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.translation([point[0],point[1],1]));
		var spline = tmp;
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
		var tmp;
		var this1 = line.normal;
		tmp = Math.atan2(this1[1],this1[0]);
		var deg = tmp % Math.PI;
		var a;
		var b;
		if(deg < Math.PI / 4) {
			a = line.intersectionLine(new thx_geom_Line([0,1],box[1][1]));
			b = line.intersectionLine(new thx_geom_Line([0,1],box[0][1]));
		} else {
			a = line.intersectionLine(new thx_geom_Line([1,0],box[0][0]));
			b = line.intersectionLine(new thx_geom_Line([1,0],box[1][0]));
		}
		this.drawSegment(a,b,style);
	}
	,drawPath: function(path,stroke,fill) {
		var _g = this;
		thx_core_Iterators.map(path.iterator(),function(_) {
			return _g.drawSpline(_,stroke,fill);
		});
	}
	,drawSpline: function(spline,stroke,fill) {
		var _g = this;
		this.g.wrap(stroke,fill,function() {
			spline.iterate(function(init) {
				_g.g.moveTo(init);
			},function(a,b,nout,nin) {
				if(null == nout?null == nin:false) _g.g.lineTo(b); else {
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
	,__class__: chad_render_Render
};
var chad_render_StrokeStyle = { __ename__ : ["chad","render","StrokeStyle"], __constructs__ : ["StrokeLine","StrokeDash","StrokeDot"] };
chad_render_StrokeStyle.StrokeLine = function(style) { var $x = ["StrokeLine",0,style]; $x.__enum__ = chad_render_StrokeStyle; return $x; };
chad_render_StrokeStyle.StrokeDash = function(pattern,style) { var $x = ["StrokeDash",1,pattern,style]; $x.__enum__ = chad_render_StrokeStyle; return $x; };
chad_render_StrokeStyle.StrokeDot = function(spacing,style) { var $x = ["StrokeDot",2,spacing,style]; $x.__enum__ = chad_render_StrokeStyle; return $x; };
var chad_render_canvas_MiniCanvasGraphics = function(mini,weightScale) {
	this.weightScale = null == weightScale?function(x) {
		return x;
	}:weightScale;
	this.mini = mini;
	this.ctx = mini.ctx;
	var halfPixel = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.translation([0.5,0.5,1]);
	var mirror = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.mirroring(thx_geom_Transformables.MY);
	var translateY = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.translation([0,mini.height,0]);
	var correctionMatrix = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.multiply(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.multiply(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.multiply(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.identity,halfPixel),mirror),translateY);
	this.matrix = correctionMatrix;
	this.ctx.transform(this.matrix[0],this.matrix[1],this.matrix[4],this.matrix[5],this.matrix[12],this.matrix[13]);
};
chad_render_canvas_MiniCanvasGraphics.__name__ = ["chad","render","canvas","MiniCanvasGraphics"];
chad_render_canvas_MiniCanvasGraphics.__interfaces__ = [chad_render_IGraphics];
chad_render_canvas_MiniCanvasGraphics.prototype = {
	mini: null
	,ctx: null
	,matrix: null
	,weightScale: null
	,reverseCoords: null
	,wrap: function(stroke,fill,f) {
		var hasStyle = !(null != fill)?null != stroke:true;
		if(hasStyle) this.ctx.save();
		this.ctx.beginPath();
		if(null != stroke) this.applyStrokeStyle(stroke);
		if(null != fill) this.applyFillStyle(fill);
		f();
		if(null != fill) this.ctx.fill();
		if(!(null != stroke)?null == fill:true) this.ctx.stroke();
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
		console.log(this.ctx.lineWidth);
		this.ctx.lineCap = style.cap;
		this.ctx.lineJoin = style.join;
		var tmp;
		var this1 = style.color;
		tmp = "rgba(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + "," + (this1 >> 24 & 255) / 255 + ")";
		this.ctx.strokeStyle = tmp;
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
			var inverted = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.inverse(this.matrix);
			if(null == inverted) throw "unable to inverse coords matrix";
			this.reverseCoords = thx_geom_shape__$Box_Box_$Impl_$.transform([thx_geom__$Point_Point_$Impl_$.zero,[this.mini.width,this.mini.height]],inverted);
		}
		return this.reverseCoords;
	}
	,__class__: chad_render_canvas_MiniCanvasGraphics
};
var haxe_StackItem = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; return $x; };
var haxe_CallStack = function() { };
haxe_CallStack.__name__ = ["haxe","CallStack"];
haxe_CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe_StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe_StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe_CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.exceptionStack = function() {
	return [];
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		b.b += m == null?"null":"" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe_CallStack.itemToString(b,s1);
			b.b += " (";
		}
		b.b += file == null?"null":"" + file;
		b.b += " line ";
		b.b += line == null?"null":"" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		b.b += cname == null?"null":"" + cname;
		b.b += ".";
		b.b += meth == null?"null":"" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		b.b += n == null?"null":"" + n;
		break;
	}
};
haxe_CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe_StackItem.Module(line));
		}
		return m;
	} else return s;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,__class__: haxe_ds_StringMap
};
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array)?o.__enum__ == null:false) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	var tmp;
	if(t == "function") {
		if(!o.__name__) tmp = o.__ename__; else tmp = true;
	} else tmp = false;
	if(tmp) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
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
		if((tostr != null?tostr != Object.toString:false)?typeof(tostr) == "function":false) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp?!o.hasOwnProperty(k):false) {
			continue;
		}
		if(!(!(!(!(k == "prototype")?k == "__class__":true)?k == "__super__":true)?k == "__interfaces__":true)?k == "__properties__":true) {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
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
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(!(i1 == cl)?js_Boot.__interfLoop(i1,cl):true) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
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
		return (o instanceof Array)?o.__enum__ == null:false;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object"?js_Boot.__isNativeObj(cl):false) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(!(!(!(name == "Object")?name == "Function":true)?name == "Math":true)?name == "JSON":true) return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var thx_color__$CIELCh_CIELCh_$Impl_$ = {};
thx_color__$CIELCh_CIELCh_$Impl_$.__name__ = ["thx","color","_CIELCh","CIELCh_Impl_"];
thx_color__$CIELCh_CIELCh_$Impl_$.create = function(lightness,chroma,hue) {
	var tmp;
	var channels = [lightness,chroma,thx_core_Floats.wrapCircular(hue,360)];
	tmp = channels;
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$CIELCh_CIELCh_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$CIELCh_CIELCh_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "cielch":
			tmp = thx_color__$CIELCh_CIELCh_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3,false));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$CIELCh_CIELCh_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var tmp;
	var _0 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.complement = function(this1) {
	return thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,180);
};
thx_color__$CIELCh_CIELCh_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolateAngle(t,this1[2],other[2],360)];
	tmp = channels;
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$CIELCh_CIELCh_$Impl_$.withHue(this1,this1[2] + angle);
};
thx_color__$CIELCh_CIELCh_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 144.0;
	var tmp;
	var _0 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.square = function(this1) {
	return thx_color__$CIELCh_CIELCh_$Impl_$.tetrad(this1,90);
};
thx_color__$CIELCh_CIELCh_$Impl_$.tetrad = function(this1,angle) {
	var tmp;
	var _0 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,0);
	var _1 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,angle);
	var _2 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,180);
	var _3 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,180 + angle);
	tmp = { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.triad = function(this1) {
	var tmp;
	var _0 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,-120);
	var _1 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,0);
	var _2 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,120);
	tmp = { _0 : _0, _1 : _1, _2 : _2};
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.withLightness = function(this1,newlightness) {
	return [newlightness,this1[1],this1[2]];
};
thx_color__$CIELCh_CIELCh_$Impl_$.withChroma = function(this1,newchroma) {
	return [this1[0],newchroma,this1[2]];
};
thx_color__$CIELCh_CIELCh_$Impl_$.withHue = function(this1,newhue) {
	var tmp;
	var channels = [this1[0],this1[1],thx_core_Floats.wrapCircular(newhue,360)];
	tmp = channels;
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$CIELCh_CIELCh_$Impl_$.toString = function(this1) {
	return "CIELCh(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab = function(this1) {
	var hradi = this1[2] * (Math.PI / 180);
	var a = Math.cos(hradi) * this1[1];
	var b = Math.sin(hradi) * this1[1];
	return [this1[0],a,b];
};
thx_color__$CIELCh_CIELCh_$Impl_$.toCMY = function(this1) {
	var tmp;
	var this2 = thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1);
	tmp = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this2));
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(tmp);
};
thx_color__$CIELCh_CIELCh_$Impl_$.toCMYK = function(this1) {
	var tmp;
	var this2 = thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1);
	tmp = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this2));
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(tmp);
};
thx_color__$CIELCh_CIELCh_$Impl_$.toGrey = function(this1) {
	var tmp;
	var tmp1;
	var this3 = thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1);
	tmp1 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this3));
	var this2 = tmp1;
	tmp = this2[0] * .2126 + this2[1] * .7152 + this2[2] * .0722;
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.toHSL = function(this1) {
	var tmp;
	var this2 = thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1);
	tmp = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this2));
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(tmp);
};
thx_color__$CIELCh_CIELCh_$Impl_$.toHSV = function(this1) {
	var tmp;
	var this2 = thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1);
	tmp = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this2));
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(tmp);
};
thx_color__$CIELCh_CIELCh_$Impl_$.toRGB = function(this1) {
	var tmp;
	var tmp1;
	var this3 = thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1);
	tmp1 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this3));
	var this2 = tmp1;
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this2[0],this2[1],this2[2]);
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.toRGBA = function(this1) {
	var tmp;
	var tmp1;
	var tmp2;
	var this4 = thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1);
	tmp2 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this4));
	var this3 = tmp2;
	var tmp3;
	var channels = this3.concat([1.0]);
	tmp3 = channels;
	tmp1 = tmp3;
	var this2 = tmp1;
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX = function(this1) {
	var tmp;
	var this2 = thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1);
	tmp = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this2));
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.toRGBXA = function(this1) {
	var tmp;
	var tmp1;
	var this3 = thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1);
	tmp1 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this3));
	var this2 = tmp1;
	var tmp2;
	var channels = this2.concat([1.0]);
	tmp2 = channels;
	tmp = tmp2;
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.toXYZ = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toXYZ(thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toYxy = function(this1) {
	var tmp;
	var this2 = thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1);
	tmp = thx_color__$XYZ_XYZ_$Impl_$.toYxy(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this2));
	return tmp;
};
thx_color__$CIELCh_CIELCh_$Impl_$.get_lightness = function(this1) {
	return this1[0];
};
thx_color__$CIELCh_CIELCh_$Impl_$.get_chroma = function(this1) {
	return this1[1];
};
thx_color__$CIELCh_CIELCh_$Impl_$.get_hue = function(this1) {
	return this1[2];
};
var thx_color__$CIELab_CIELab_$Impl_$ = {};
thx_color__$CIELab_CIELab_$Impl_$.__name__ = ["thx","color","_CIELab","CIELab_Impl_"];
thx_color__$CIELab_CIELab_$Impl_$.create = function(l,a,b) {
	return [l,a,b];
};
thx_color__$CIELab_CIELab_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$CIELab_CIELab_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$CIELab_CIELab_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "cielab":
			tmp = thx_color__$CIELab_CIELab_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3,false));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$CIELab_CIELab_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$CIELab_CIELab_$Impl_$.distance = function(this1,other) {
	return (this1[0] - other[0]) * (this1[0] - other[0]) + (this1[1] - other[1]) * (this1[1] - other[1]) + (this1[2] - other[2]) * (this1[2] - other[2]);
};
thx_color__$CIELab_CIELab_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$CIELab_CIELab_$Impl_$.darker = function(this1,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],0),this1[1],this1[2]];
	tmp = channels;
	return tmp;
};
thx_color__$CIELab_CIELab_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],100),this1[1],this1[2]];
	tmp = channels;
	return tmp;
};
thx_color__$CIELab_CIELab_$Impl_$.match = function(this1,palette) {
	var it = palette;
	if(null == it) throw new thx_core_error_NullArgument("Iterable argument \"this\" cannot be null",{ fileName : "NullArgument.hx", lineNumber : 73, className : "thx.color._CIELab.CIELab_Impl_", methodName : "match"}); else if(!$iterator(it)().hasNext()) throw new thx_core_error_NullArgument("Iterable argument \"this\" cannot be empty",{ fileName : "NullArgument.hx", lineNumber : 75, className : "thx.color._CIELab.CIELab_Impl_", methodName : "match"});
	var dist = Infinity;
	var closest = null;
	var $it0 = $iterator(palette)();
	while( $it0.hasNext() ) {
		var color = $it0.next();
		var ndist = thx_color__$CIELab_CIELab_$Impl_$.distance(this1,color);
		if(ndist < dist) {
			dist = ndist;
			closest = color;
		}
	}
	return closest;
};
thx_color__$CIELab_CIELab_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$CIELab_CIELab_$Impl_$.withLightness = function(this1,lightness) {
	return [lightness,this1[1],this1[2]];
};
thx_color__$CIELab_CIELab_$Impl_$.withA = function(this1,newa) {
	return [this1[0],newa,this1[2]];
};
thx_color__$CIELab_CIELab_$Impl_$.withB = function(this1,newb) {
	return [this1[0],this1[1],newb];
};
thx_color__$CIELab_CIELab_$Impl_$.toString = function(this1) {
	return "CIELab(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
thx_color__$CIELab_CIELab_$Impl_$.toCIELCh = function(this1) {
	var h = thx_core_Floats.wrapCircular(Math.atan2(this1[2],this1[1]) * 180 / Math.PI,360);
	var c = Math.sqrt(this1[1] * this1[1] + this1[2] * this1[2]);
	return [this1[0],c,h];
};
thx_color__$CIELab_CIELab_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1)));
};
thx_color__$CIELab_CIELab_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1)));
};
thx_color__$CIELab_CIELab_$Impl_$.toGrey = function(this1) {
	var tmp;
	var this2 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1));
	tmp = this2[0] * .2126 + this2[1] * .7152 + this2[2] * .0722;
	return tmp;
};
thx_color__$CIELab_CIELab_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1)));
};
thx_color__$CIELab_CIELab_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1)));
};
thx_color__$CIELab_CIELab_$Impl_$.toRGB = function(this1) {
	var tmp;
	var this2 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1));
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this2[0],this2[1],this2[2]);
	return tmp;
};
thx_color__$CIELab_CIELab_$Impl_$.toRGBA = function(this1) {
	var tmp;
	var tmp1;
	var this3 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1));
	var tmp2;
	var channels = this3.concat([1.0]);
	tmp2 = channels;
	tmp1 = tmp2;
	var this2 = tmp1;
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$CIELab_CIELab_$Impl_$.toRGBX = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toRGBXA = function(this1) {
	var tmp;
	var this2 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1));
	var tmp1;
	var channels = this2.concat([1.0]);
	tmp1 = channels;
	tmp = tmp1;
	return tmp;
};
thx_color__$CIELab_CIELab_$Impl_$.toXYZ = function(this1) {
	var y = (this1[0] + 16) / 116;
	var x = this1[1] / 500 + y;
	var z = y - this1[2] / 200;
	var p;
	p = Math.pow(y,3);
	y = p > 0.008856?p:(y - 0.137931034482758619) / 7.787;
	p = Math.pow(x,3);
	x = p > 0.008856?p:(x - 0.137931034482758619) / 7.787;
	p = Math.pow(z,3);
	z = p > 0.008856?p:(z - 0.137931034482758619) / 7.787;
	return [95.047 * x,100 * y,108.883 * z];
};
thx_color__$CIELab_CIELab_$Impl_$.toYxy = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toYxy(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.get_l = function(this1) {
	return this1[0];
};
thx_color__$CIELab_CIELab_$Impl_$.get_a = function(this1) {
	return this1[1];
};
thx_color__$CIELab_CIELab_$Impl_$.get_b = function(this1) {
	return this1[2];
};
var thx_color__$CMY_CMY_$Impl_$ = {};
thx_color__$CMY_CMY_$Impl_$.__name__ = ["thx","color","_CMY","CMY_Impl_"];
thx_color__$CMY_CMY_$Impl_$.create = function(cyan,magenta,yellow) {
	var tmp;
	if(cyan < 0) tmp = 0; else if(cyan > 1) tmp = 1; else tmp = cyan;
	var tmp1;
	if(magenta < 0) tmp1 = 0; else if(magenta > 1) tmp1 = 1; else tmp1 = magenta;
	var tmp2;
	if(yellow < 0) tmp2 = 0; else if(yellow > 1) tmp2 = 1; else tmp2 = yellow;
	return [tmp,tmp1,tmp2];
};
thx_color__$CMY_CMY_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$CMY_CMY_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$CMY_CMY_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "cmy":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp = channels;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$CMY_CMY_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$CMY_CMY_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$CMY_CMY_$Impl_$.withCyan = function(this1,newcyan) {
	var tmp;
	if(newcyan < 0) tmp = 0; else if(newcyan > 1) tmp = 1; else tmp = newcyan;
	return [tmp,this1[1],this1[2]];
};
thx_color__$CMY_CMY_$Impl_$.withMagenta = function(this1,newmagenta) {
	var tmp;
	if(newmagenta < 0) tmp = 0; else if(newmagenta > 1) tmp = 1; else tmp = newmagenta;
	return [this1[0],tmp,this1[2]];
};
thx_color__$CMY_CMY_$Impl_$.withYellow = function(this1,newyellow) {
	var tmp;
	if(newyellow < 0) tmp = 0; else if(newyellow > 1) tmp = 1; else tmp = newyellow;
	return [this1[0],this1[1],tmp];
};
thx_color__$CMY_CMY_$Impl_$.toString = function(this1) {
	return "cmy(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
thx_color__$CMY_CMY_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$CMY_CMY_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab([1 - this1[0],1 - this1[1],1 - this1[2]]);
};
thx_color__$CMY_CMY_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh([1 - this1[0],1 - this1[1],1 - this1[2]]);
};
thx_color__$CMY_CMY_$Impl_$.toCMYK = function(this1) {
	var k = Math.min(Math.min(this1[0],this1[1]),this1[2]);
	if(k == 1) return [0,0,0,1]; else return [(this1[0] - k) / (1 - k),(this1[1] - k) / (1 - k),(this1[2] - k) / (1 - k),k];
};
thx_color__$CMY_CMY_$Impl_$.toGrey = function(this1) {
	var tmp;
	var this_0 = 1 - this1[0];
	var this_1 = 1 - this1[1];
	var this_2 = 1 - this1[2];
	tmp = this_0 * .2126 + this_1 * .7152 + this_2 * .0722;
	return tmp;
};
thx_color__$CMY_CMY_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL([1 - this1[0],1 - this1[1],1 - this1[2]]);
};
thx_color__$CMY_CMY_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV([1 - this1[0],1 - this1[1],1 - this1[2]]);
};
thx_color__$CMY_CMY_$Impl_$.toRGB = function(this1) {
	var tmp;
	var this_0 = 1 - this1[0];
	var this_1 = 1 - this1[1];
	var this_2 = 1 - this1[2];
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this_0,this_1,this_2);
	return tmp;
};
thx_color__$CMY_CMY_$Impl_$.toRGBA = function(this1) {
	var tmp;
	var tmp1;
	var channels = [1 - this1[0],1 - this1[1],1 - this1[2]].concat([1.0]);
	tmp1 = channels;
	var this2 = tmp1;
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$CMY_CMY_$Impl_$.toRGBX = function(this1) {
	return [1 - this1[0],1 - this1[1],1 - this1[2]];
};
thx_color__$CMY_CMY_$Impl_$.toRGBXA = function(this1) {
	var tmp;
	var channels = [1 - this1[0],1 - this1[1],1 - this1[2]].concat([1.0]);
	tmp = channels;
	return tmp;
};
thx_color__$CMY_CMY_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ([1 - this1[0],1 - this1[1],1 - this1[2]]);
};
thx_color__$CMY_CMY_$Impl_$.toYxy = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toYxy(thx_color__$RGBX_RGBX_$Impl_$.toXYZ([1 - this1[0],1 - this1[1],1 - this1[2]]));
};
thx_color__$CMY_CMY_$Impl_$.get_cyan = function(this1) {
	return this1[0];
};
thx_color__$CMY_CMY_$Impl_$.get_magenta = function(this1) {
	return this1[1];
};
thx_color__$CMY_CMY_$Impl_$.get_yellow = function(this1) {
	return this1[2];
};
var thx_color__$CMYK_CMYK_$Impl_$ = {};
thx_color__$CMYK_CMYK_$Impl_$.__name__ = ["thx","color","_CMYK","CMYK_Impl_"];
thx_color__$CMYK_CMYK_$Impl_$.create = function(cyan,magenta,yellow,black) {
	var tmp;
	if(cyan < 0) tmp = 0; else if(cyan > 1) tmp = 1; else tmp = cyan;
	var tmp1;
	if(magenta < 0) tmp1 = 0; else if(magenta > 1) tmp1 = 1; else tmp1 = magenta;
	var tmp2;
	if(yellow < 0) tmp2 = 0; else if(yellow > 1) tmp2 = 1; else tmp2 = yellow;
	var tmp3;
	if(black < 0) tmp3 = 0; else if(black > 1) tmp3 = 1; else tmp3 = black;
	return [tmp,tmp1,tmp2,tmp3];
};
thx_color__$CMYK_CMYK_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,4);
	return thx_color__$CMYK_CMYK_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$CMYK_CMYK_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "cmyk":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,4);
			tmp = channels;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$CMYK_CMYK_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$CMYK_CMYK_$Impl_$.darker = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Floats.interpolate(t,this1[3],1)];
	tmp = channels;
	return tmp;
};
thx_color__$CMYK_CMYK_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Floats.interpolate(t,this1[3],0)];
	tmp = channels;
	return tmp;
};
thx_color__$CMYK_CMYK_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2]),thx_core_Floats.interpolate(t,this1[3],other[3])];
	tmp = channels;
	return tmp;
};
thx_color__$CMYK_CMYK_$Impl_$.withCyan = function(this1,newcyan) {
	var tmp;
	if(newcyan < 0) tmp = 0; else if(newcyan > 1) tmp = 1; else tmp = newcyan;
	return [tmp,this1[1],this1[2],this1[3]];
};
thx_color__$CMYK_CMYK_$Impl_$.withMagenta = function(this1,newmagenta) {
	var tmp;
	if(newmagenta < 0) tmp = 0; else if(newmagenta > 1) tmp = 1; else tmp = newmagenta;
	return [this1[0],tmp,this1[2],this1[3]];
};
thx_color__$CMYK_CMYK_$Impl_$.withYellow = function(this1,newyellow) {
	var tmp;
	if(newyellow < 0) tmp = 0; else if(newyellow > 1) tmp = 1; else tmp = newyellow;
	return [this1[0],this1[1],tmp,this1[3]];
};
thx_color__$CMYK_CMYK_$Impl_$.withBlack = function(this1,newblack) {
	var tmp;
	if(newblack < 0) tmp = 0; else if(newblack > 1) tmp = 1; else tmp = newblack;
	return [this1[0],this1[1],this1[2],tmp];
};
thx_color__$CMYK_CMYK_$Impl_$.toString = function(this1) {
	return "cmyk(" + this1[0] + "," + this1[1] + "," + this1[2] + "," + this1[3] + ")";
};
thx_color__$CMYK_CMYK_$Impl_$.equals = function(this1,other) {
	return ((Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false)?Math.abs(this1[3] - other[3]) <= 10e-10:false;
};
thx_color__$CMYK_CMYK_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab([(1 - this1[3]) * (1 - this1[0]),(1 - this1[3]) * (1 - this1[1]),(1 - this1[3]) * (1 - this1[2])]);
};
thx_color__$CMYK_CMYK_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh([(1 - this1[3]) * (1 - this1[0]),(1 - this1[3]) * (1 - this1[1]),(1 - this1[3]) * (1 - this1[2])]);
};
thx_color__$CMYK_CMYK_$Impl_$.toCMY = function(this1) {
	return [this1[3] + (1 - this1[3]) * this1[0],this1[3] + (1 - this1[3]) * this1[1],this1[3] + (1 - this1[3]) * this1[2]];
};
thx_color__$CMYK_CMYK_$Impl_$.toGrey = function(this1) {
	var tmp;
	var this_0 = (1 - this1[3]) * (1 - this1[0]);
	var this_1 = (1 - this1[3]) * (1 - this1[1]);
	var this_2 = (1 - this1[3]) * (1 - this1[2]);
	tmp = this_0 * .2126 + this_1 * .7152 + this_2 * .0722;
	return tmp;
};
thx_color__$CMYK_CMYK_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL([(1 - this1[3]) * (1 - this1[0]),(1 - this1[3]) * (1 - this1[1]),(1 - this1[3]) * (1 - this1[2])]);
};
thx_color__$CMYK_CMYK_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV([(1 - this1[3]) * (1 - this1[0]),(1 - this1[3]) * (1 - this1[1]),(1 - this1[3]) * (1 - this1[2])]);
};
thx_color__$CMYK_CMYK_$Impl_$.toRGB = function(this1) {
	var tmp;
	var this_0 = (1 - this1[3]) * (1 - this1[0]);
	var this_1 = (1 - this1[3]) * (1 - this1[1]);
	var this_2 = (1 - this1[3]) * (1 - this1[2]);
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this_0,this_1,this_2);
	return tmp;
};
thx_color__$CMYK_CMYK_$Impl_$.toRGBA = function(this1) {
	var tmp;
	var tmp1;
	var channels = [(1 - this1[3]) * (1 - this1[0]),(1 - this1[3]) * (1 - this1[1]),(1 - this1[3]) * (1 - this1[2])].concat([1.0]);
	tmp1 = channels;
	var this2 = tmp1;
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$CMYK_CMYK_$Impl_$.toRGBX = function(this1) {
	return [(1 - this1[3]) * (1 - this1[0]),(1 - this1[3]) * (1 - this1[1]),(1 - this1[3]) * (1 - this1[2])];
};
thx_color__$CMYK_CMYK_$Impl_$.toRGBXA = function(this1) {
	var tmp;
	var channels = [(1 - this1[3]) * (1 - this1[0]),(1 - this1[3]) * (1 - this1[1]),(1 - this1[3]) * (1 - this1[2])].concat([1.0]);
	tmp = channels;
	return tmp;
};
thx_color__$CMYK_CMYK_$Impl_$.get_cyan = function(this1) {
	return this1[0];
};
thx_color__$CMYK_CMYK_$Impl_$.get_magenta = function(this1) {
	return this1[1];
};
thx_color__$CMYK_CMYK_$Impl_$.get_yellow = function(this1) {
	return this1[2];
};
thx_color__$CMYK_CMYK_$Impl_$.get_black = function(this1) {
	return this1[3];
};
thx_color__$CMYK_CMYK_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ([(1 - this1[3]) * (1 - this1[0]),(1 - this1[3]) * (1 - this1[1]),(1 - this1[3]) * (1 - this1[2])]);
};
thx_color__$CMYK_CMYK_$Impl_$.toYxy = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toYxy(thx_color__$RGBX_RGBX_$Impl_$.toXYZ([(1 - this1[3]) * (1 - this1[0]),(1 - this1[3]) * (1 - this1[1]),(1 - this1[3]) * (1 - this1[2])]));
};
var thx_color_Color = function() { };
thx_color_Color.__name__ = ["thx","color","Color"];
thx_color_Color.parse = function(color) {
	if(thx_color_Color.names.h.hasOwnProperty("$" + color)) {
		var tmp1;
		var this1 = thx_color_Color.names.h["$" + color];
		tmp1 = thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255,255]));
		return tmp1;
	}
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "cielab":
			var this2 = thx_color__$CIELab_CIELab_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3,false));
			var this3 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this2));
			var tmp2;
			var channels = this3.concat([1.0]);
			tmp2 = channels;
			tmp = tmp2;
			break;
		case "cielch":
			var this4 = thx_color__$CIELCh_CIELCh_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3,false));
			var tmp3;
			var this6 = thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this4);
			tmp3 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this6));
			var this5 = tmp3;
			var tmp4;
			var channels1 = this5.concat([1.0]);
			tmp4 = channels1;
			tmp = tmp4;
			break;
		case "cmy":
			var this7 = thx_color__$CMY_CMY_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3));
			var tmp5;
			var channels2 = [1 - this7[0],1 - this7[1],1 - this7[2]].concat([1.0]);
			tmp5 = channels2;
			tmp = tmp5;
			break;
		case "cmyk":
			var this8 = thx_color__$CMYK_CMYK_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,4));
			var tmp6;
			var channels3 = [(1 - this8[3]) * (1 - this8[0]),(1 - this8[3]) * (1 - this8[1]),(1 - this8[3]) * (1 - this8[2])].concat([1.0]);
			tmp6 = channels3;
			tmp = tmp6;
			break;
		case "grey":case "gray":
			var this9 = thx_color__$Grey_Grey_$Impl_$.create(thx_color_parse_ColorParser.getFloatChannels(info.channels,1)[0]);
			var tmp7;
			var channels4 = [this9,this9,this9].concat([1.0]);
			tmp7 = channels4;
			tmp = tmp7;
			break;
		case "hsl":
			var this10 = thx_color__$HSL_HSL_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3));
			var tmp8;
			var channels5 = [thx_color__$HSL_HSL_$Impl_$._c(this10[0] + 120,this10[1],this10[2]),thx_color__$HSL_HSL_$Impl_$._c(this10[0],this10[1],this10[2]),thx_color__$HSL_HSL_$Impl_$._c(this10[0] - 120,this10[1],this10[2])];
			tmp8 = channels5;
			var this11 = tmp8;
			var tmp9;
			var channels6 = this11.concat([1.0]);
			tmp9 = channels6;
			tmp = tmp9;
			break;
		case "hsla":
			var this12 = thx_color__$HSLA_HSLA_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,4));
			var channels7 = [thx_color__$HSLA_HSLA_$Impl_$._c(this12[0] + 120,this12[1],this12[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this12[0],this12[1],this12[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this12[0] - 120,this12[1],this12[2]),this12[3]];
			tmp = channels7;
			break;
		case "hsv":
			var this13 = thx_color__$HSV_HSV_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3));
			var tmp10;
			if(this13[1] == 0) tmp10 = [this13[2],this13[2],this13[2]]; else {
				var r;
				var g;
				var b;
				var i;
				var f;
				var p;
				var q;
				var t;
				var h = this13[0] / 60;
				i = Math.floor(h);
				f = h - i;
				p = this13[2] * (1 - this13[1]);
				q = this13[2] * (1 - f * this13[1]);
				t = this13[2] * (1 - (1 - f) * this13[1]);
				switch(i) {
				case 0:
					r = this13[2];
					g = t;
					b = p;
					break;
				case 1:
					r = q;
					g = this13[2];
					b = p;
					break;
				case 2:
					r = p;
					g = this13[2];
					b = t;
					break;
				case 3:
					r = p;
					g = q;
					b = this13[2];
					break;
				case 4:
					r = t;
					g = p;
					b = this13[2];
					break;
				default:
					r = this13[2];
					g = p;
					b = q;
				}
				tmp10 = [r,g,b];
			}
			var this14 = tmp10;
			var tmp11;
			var channels8 = this14.concat([1.0]);
			tmp11 = channels8;
			tmp = tmp11;
			break;
		case "hsva":
			var this15 = thx_color__$HSVA_HSVA_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,4));
			if(this15[1] == 0) tmp = [this15[2],this15[2],this15[2],this15[3]]; else {
				var r1;
				var g1;
				var b1;
				var i1;
				var f1;
				var p1;
				var q1;
				var t1;
				var h1 = this15[0] / 60;
				i1 = Math.floor(h1);
				f1 = h1 - i1;
				p1 = this15[2] * (1 - this15[1]);
				q1 = this15[2] * (1 - f1 * this15[1]);
				t1 = this15[2] * (1 - (1 - f1) * this15[1]);
				switch(i1) {
				case 0:
					r1 = this15[2];
					g1 = t1;
					b1 = p1;
					break;
				case 1:
					r1 = q1;
					g1 = this15[2];
					b1 = p1;
					break;
				case 2:
					r1 = p1;
					g1 = this15[2];
					b1 = t1;
					break;
				case 3:
					r1 = p1;
					g1 = q1;
					b1 = this15[2];
					break;
				case 4:
					r1 = t1;
					g1 = p1;
					b1 = this15[2];
					break;
				default:
					r1 = this15[2];
					g1 = p1;
					b1 = q1;
				}
				tmp = [r1,g1,b1,this15[3]];
			}
			break;
		case "rgb":
			var this16 = thx_color__$RGBX_RGBX_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3));
			var tmp12;
			var channels9 = this16.concat([1.0]);
			tmp12 = channels9;
			tmp = tmp12;
			break;
		case "rgba":
			tmp = thx_color__$RGBXA_RGBXA_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,4));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
var thx_color__$Grey_Grey_$Impl_$ = {};
thx_color__$Grey_Grey_$Impl_$.__name__ = ["thx","color","_Grey","Grey_Impl_"];
thx_color__$Grey_Grey_$Impl_$.create = function(v) {
	var tmp;
	if(v < 0) tmp = 0; else if(v > 1) tmp = 1; else tmp = v;
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "grey":case "gray":
			var grey = thx_color_parse_ColorParser.getFloatChannels(info.channels,1)[0];
			tmp = grey;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$._new = function(grey) {
	return grey;
};
thx_color__$Grey_Grey_$Impl_$.contrast = function(this1) {
	return this1 > 0.5?thx_color__$Grey_Grey_$Impl_$.black:thx_color__$Grey_Grey_$Impl_$.white;
};
thx_color__$Grey_Grey_$Impl_$.darker = function(this1,t) {
	var tmp;
	var grey = thx_core_Floats.interpolate(t,this1,0);
	tmp = grey;
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var grey = thx_core_Floats.interpolate(t,this1,1);
	tmp = grey;
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var grey = thx_core_Floats.interpolate(t,this1,other);
	tmp = grey;
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$.toString = function(this1) {
	return "grey(" + this1 * 100 + "%)";
};
thx_color__$Grey_Grey_$Impl_$.equals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_color__$Grey_Grey_$Impl_$.get_grey = function(this1) {
	return this1;
};
thx_color__$Grey_Grey_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab([this1,this1,this1]);
};
thx_color__$Grey_Grey_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh([this1,this1,this1]);
};
thx_color__$Grey_Grey_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY([this1,this1,this1]);
};
thx_color__$Grey_Grey_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK([this1,this1,this1]);
};
thx_color__$Grey_Grey_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL([this1,this1,this1]);
};
thx_color__$Grey_Grey_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV([this1,this1,this1]);
};
thx_color__$Grey_Grey_$Impl_$.toRGB = function(this1) {
	var tmp;
	var this_0 = this1;
	var this_1 = this1;
	var this_2 = this1;
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this_0,this_1,this_2);
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$.toRGBA = function(this1) {
	var tmp;
	var tmp1;
	var channels = [this1,this1,this1].concat([1.0]);
	tmp1 = channels;
	var this2 = tmp1;
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$.toRGBX = function(this1) {
	return [this1,this1,this1];
};
thx_color__$Grey_Grey_$Impl_$.toRGBXA = function(this1) {
	var tmp;
	var channels = [this1,this1,this1].concat([1.0]);
	tmp = channels;
	return tmp;
};
thx_color__$Grey_Grey_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ([this1,this1,this1]);
};
thx_color__$Grey_Grey_$Impl_$.toYxy = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toYxy(thx_color__$RGBX_RGBX_$Impl_$.toXYZ([this1,this1,this1]));
};
var thx_color__$HSL_HSL_$Impl_$ = {};
thx_color__$HSL_HSL_$Impl_$.__name__ = ["thx","color","_HSL","HSL_Impl_"];
thx_color__$HSL_HSL_$Impl_$.create = function(hue,saturation,lightness) {
	var tmp;
	var tmp1;
	if(saturation < 0) tmp1 = 0; else if(saturation > 1) tmp1 = 1; else tmp1 = saturation;
	var tmp2;
	if(lightness < 0) tmp2 = 0; else if(lightness > 1) tmp2 = 1; else tmp2 = lightness;
	var channels = [thx_core_Floats.wrapCircular(hue,360),tmp1,tmp2];
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$HSL_HSL_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$HSL_HSL_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsl":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp = channels;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$HSL_HSL_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var tmp;
	var _0 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.complement = function(this1) {
	return thx_color__$HSL_HSL_$Impl_$.rotate(this1,180);
};
thx_color__$HSL_HSL_$Impl_$.darker = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],thx_core_Floats.interpolate(t,this1[2],0)];
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],thx_core_Floats.interpolate(t,this1[2],1)];
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolateAngle(t,this1[0],other[0],360),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.rotate = function(this1,angle) {
	var tmp;
	var newhue = this1[0] + angle;
	var tmp1;
	if(newhue < 0) tmp1 = 0; else if(newhue > 1) tmp1 = 1; else tmp1 = newhue;
	tmp = [tmp1,this1[1],this1[2]];
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 144.0;
	var tmp;
	var _0 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.square = function(this1) {
	return thx_color__$HSL_HSL_$Impl_$.tetrad(this1,90);
};
thx_color__$HSL_HSL_$Impl_$.tetrad = function(this1,angle) {
	var tmp;
	var _0 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,0);
	var _1 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,angle);
	var _2 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,180);
	var _3 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,180 + angle);
	tmp = { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.triad = function(this1) {
	var tmp;
	var _0 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,-120);
	var _1 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,0);
	var _2 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,120);
	tmp = { _0 : _0, _1 : _1, _2 : _2};
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.withAlpha = function(this1,alpha) {
	var tmp;
	var tmp1;
	if(alpha < 0) tmp1 = 0; else if(alpha > 1) tmp1 = 1; else tmp1 = alpha;
	var channels = this1.concat([tmp1]);
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.withHue = function(this1,newhue) {
	var tmp;
	if(newhue < 0) tmp = 0; else if(newhue > 1) tmp = 1; else tmp = newhue;
	return [tmp,this1[1],this1[2]];
};
thx_color__$HSL_HSL_$Impl_$.withLightness = function(this1,newlightness) {
	var tmp;
	if(newlightness < 0) tmp = 0; else if(newlightness > 1) tmp = 1; else tmp = newlightness;
	return [this1[0],this1[1],tmp];
};
thx_color__$HSL_HSL_$Impl_$.withSaturation = function(this1,newsaturation) {
	var tmp;
	if(newsaturation < 0) tmp = 0; else if(newsaturation > 1) tmp = 1; else tmp = newsaturation;
	return [this1[0],tmp,this1[2]];
};
thx_color__$HSL_HSL_$Impl_$.toCSS3 = function(this1) {
	return "hsl(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx_color__$HSL_HSL_$Impl_$.toString = function(this1) {
	return "hsl(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx_color__$HSL_HSL_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$HSL_HSL_$Impl_$.toCIELab = function(this1) {
	var tmp;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp = channels;
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(tmp);
};
thx_color__$HSL_HSL_$Impl_$.toCIELCh = function(this1) {
	var tmp;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp = channels;
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(tmp);
};
thx_color__$HSL_HSL_$Impl_$.toCMY = function(this1) {
	var tmp;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp = channels;
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(tmp);
};
thx_color__$HSL_HSL_$Impl_$.toCMYK = function(this1) {
	var tmp;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp = channels;
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(tmp);
};
thx_color__$HSL_HSL_$Impl_$.toGrey = function(this1) {
	var tmp;
	var tmp1;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp1 = channels;
	var this2 = tmp1;
	tmp = this2[0] * .2126 + this2[1] * .7152 + this2[2] * .0722;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.toHSV = function(this1) {
	var tmp;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp = channels;
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(tmp);
};
thx_color__$HSL_HSL_$Impl_$.toRGB = function(this1) {
	var tmp;
	var tmp1;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp1 = channels;
	var this2 = tmp1;
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this2[0],this2[1],this2[2]);
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.toRGBA = function(this1) {
	var tmp;
	var tmp1;
	var tmp2;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp2 = channels;
	var this3 = tmp2;
	var tmp3;
	var channels1 = this3.concat([1.0]);
	tmp3 = channels1;
	tmp1 = tmp3;
	var this2 = tmp1;
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.toRGBX = function(this1) {
	var tmp;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.toRGBXA = function(this1) {
	var tmp;
	var tmp1;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp1 = channels;
	var this2 = tmp1;
	var tmp2;
	var channels1 = this2.concat([1.0]);
	tmp2 = channels1;
	tmp = tmp2;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.toHSLA = function(this1) {
	var tmp;
	var channels = this1.concat([1.0]);
	tmp = channels;
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.toXYZ = function(this1) {
	var tmp;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp = channels;
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(tmp);
};
thx_color__$HSL_HSL_$Impl_$.toYxy = function(this1) {
	var tmp;
	var tmp1;
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	tmp1 = channels;
	var this2 = tmp1;
	tmp = thx_color__$XYZ_XYZ_$Impl_$.toYxy(thx_color__$RGBX_RGBX_$Impl_$.toXYZ(this2));
	return tmp;
};
thx_color__$HSL_HSL_$Impl_$.get_hue = function(this1) {
	return this1[0];
};
thx_color__$HSL_HSL_$Impl_$.get_huef = function(this1) {
	return this1[0];
};
thx_color__$HSL_HSL_$Impl_$.get_saturation = function(this1) {
	return this1[1];
};
thx_color__$HSL_HSL_$Impl_$.get_lightness = function(this1) {
	return this1[2];
};
thx_color__$HSL_HSL_$Impl_$._c = function(d,s,l) {
	var m2 = l <= 0.5?l * (1 + s):l + s - l * s;
	var m1 = 2 * l - m2;
	d = thx_core_Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
};
var thx_color__$HSLA_HSLA_$Impl_$ = {};
thx_color__$HSLA_HSLA_$Impl_$.__name__ = ["thx","color","_HSLA","HSLA_Impl_"];
thx_color__$HSLA_HSLA_$Impl_$.create = function(hue,saturation,lightness,alpha) {
	var tmp;
	var tmp1;
	if(saturation < 0) tmp1 = 0; else if(saturation > 1) tmp1 = 1; else tmp1 = saturation;
	var tmp2;
	if(lightness < 0) tmp2 = 0; else if(lightness > 1) tmp2 = 1; else tmp2 = lightness;
	var tmp3;
	if(alpha < 0) tmp3 = 0; else if(alpha > 1) tmp3 = 1; else tmp3 = alpha;
	var channels = [thx_core_Floats.wrapCircular(hue,360),tmp1,tmp2,tmp3];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,4);
	return thx_color__$HSLA_HSLA_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$HSLA_HSLA_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsl":
			var tmp1;
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp1 = channels;
			var this1 = tmp1;
			var tmp2;
			var channels1 = this1.concat([1.0]);
			tmp2 = channels1;
			tmp = tmp2;
			break;
		case "hsla":
			var channels2 = thx_color_parse_ColorParser.getFloatChannels(info.channels,4);
			tmp = channels2;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$HSLA_HSLA_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var tmp;
	var _0 = thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.complement = function(this1) {
	return thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,180);
};
thx_color__$HSLA_HSLA_$Impl_$.darker = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],thx_core_Floats.interpolate(t,this1[2],0),this1[3]];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],thx_core_Floats.interpolate(t,this1[2],1),this1[3]];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.transparent = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Floats.interpolate(t,this1[3],0)];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.opaque = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Floats.interpolate(t,this1[3],1)];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolateAngle(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2]),thx_core_Floats.interpolate(t,this1[3],other[3])];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$HSLA_HSLA_$Impl_$.create(this1[0] + angle,this1[1],this1[2],this1[3]);
};
thx_color__$HSLA_HSLA_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 150.0;
	var tmp;
	var _0 = thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.withAlpha = function(this1,newalpha) {
	var tmp;
	if(newalpha < 0) tmp = 0; else if(newalpha > 1) tmp = 1; else tmp = newalpha;
	return [this1[0],this1[1],this1[2],tmp];
};
thx_color__$HSLA_HSLA_$Impl_$.withHue = function(this1,newhue) {
	var tmp;
	if(newhue < 0) tmp = 0; else if(newhue > 1) tmp = 1; else tmp = newhue;
	return [tmp,this1[1],this1[2],this1[3]];
};
thx_color__$HSLA_HSLA_$Impl_$.withLightness = function(this1,newlightness) {
	var tmp;
	if(newlightness < 0) tmp = 0; else if(newlightness > 1) tmp = 1; else tmp = newlightness;
	return [this1[0],this1[1],tmp,this1[3]];
};
thx_color__$HSLA_HSLA_$Impl_$.withSaturation = function(this1,newsaturation) {
	var tmp;
	if(newsaturation < 0) tmp = 0; else if(newsaturation > 1) tmp = 1; else tmp = newsaturation;
	return [this1[0],tmp,this1[2],this1[3]];
};
thx_color__$HSLA_HSLA_$Impl_$.toCSS3 = function(this1) {
	return "hsla(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx_color__$HSLA_HSLA_$Impl_$.toString = function(this1) {
	return "hsla(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx_color__$HSLA_HSLA_$Impl_$.equals = function(this1,other) {
	return ((Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false)?Math.abs(this1[3] - other[3]) <= 10e-10:false;
};
thx_color__$HSLA_HSLA_$Impl_$.toHSL = function(this1) {
	var tmp;
	var channels = this1.slice(0,3);
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.toHSVA = function(this1) {
	var tmp;
	var channels = [thx_color__$HSLA_HSLA_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this1[0] - 120,this1[1],this1[2]),this1[3]];
	tmp = channels;
	return thx_color__$RGBXA_RGBXA_$Impl_$.toHSVA(tmp);
};
thx_color__$HSLA_HSLA_$Impl_$.toRGB = function(this1) {
	var tmp;
	var tmp1;
	var channels = [thx_color__$HSLA_HSLA_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this1[0] - 120,this1[1],this1[2]),this1[3]];
	tmp1 = channels;
	var this2 = tmp1;
	var tmp2;
	var channels1 = this2.slice(0,3);
	tmp2 = channels1;
	var this3 = tmp2;
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this3[0],this3[1],this3[2]);
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.toRGBA = function(this1) {
	var tmp;
	var tmp1;
	var channels = [thx_color__$HSLA_HSLA_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this1[0] - 120,this1[1],this1[2]),this1[3]];
	tmp1 = channels;
	var this2 = tmp1;
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.toRGBXA = function(this1) {
	var tmp;
	var channels = [thx_color__$HSLA_HSLA_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this1[0] - 120,this1[1],this1[2]),this1[3]];
	tmp = channels;
	return tmp;
};
thx_color__$HSLA_HSLA_$Impl_$.get_hue = function(this1) {
	return this1[0];
};
thx_color__$HSLA_HSLA_$Impl_$.get_huef = function(this1) {
	return this1[0];
};
thx_color__$HSLA_HSLA_$Impl_$.get_saturation = function(this1) {
	return this1[1];
};
thx_color__$HSLA_HSLA_$Impl_$.get_lightness = function(this1) {
	return this1[2];
};
thx_color__$HSLA_HSLA_$Impl_$.get_alpha = function(this1) {
	return this1[3];
};
thx_color__$HSLA_HSLA_$Impl_$._c = function(d,s,l) {
	var m2 = l <= 0.5?l * (1 + s):l + s - l * s;
	var m1 = 2 * l - m2;
	d = thx_core_Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
};
var thx_color__$HSV_HSV_$Impl_$ = {};
thx_color__$HSV_HSV_$Impl_$.__name__ = ["thx","color","_HSV","HSV_Impl_"];
thx_color__$HSV_HSV_$Impl_$.create = function(hue,saturation,lightness) {
	var tmp;
	var tmp1;
	if(saturation < 0) tmp1 = 0; else if(saturation > 1) tmp1 = 1; else tmp1 = saturation;
	var tmp2;
	if(lightness < 0) tmp2 = 0; else if(lightness > 1) tmp2 = 1; else tmp2 = lightness;
	var channels = [thx_core_Floats.wrapCircular(hue,360),tmp1,tmp2];
	tmp = channels;
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$HSV_HSV_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$HSV_HSV_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsv":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp = channels;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$HSV_HSV_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var tmp;
	var _0 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.complement = function(this1) {
	return thx_color__$HSV_HSV_$Impl_$.rotate(this1,180);
};
thx_color__$HSV_HSV_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolateAngle(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.rotate = function(this1,angle) {
	var tmp;
	var newhue = this1[0] + angle;
	var tmp1;
	if(newhue < 0) tmp1 = 0; else if(newhue > 1) tmp1 = 1; else tmp1 = newhue;
	tmp = [tmp1,this1[1],this1[2]];
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 144.0;
	var tmp;
	var _0 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.square = function(this1) {
	return thx_color__$HSV_HSV_$Impl_$.tetrad(this1,90);
};
thx_color__$HSV_HSV_$Impl_$.tetrad = function(this1,angle) {
	var tmp;
	var _0 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,0);
	var _1 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,angle);
	var _2 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,180);
	var _3 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,180 + angle);
	tmp = { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.triad = function(this1) {
	var tmp;
	var _0 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,-120);
	var _1 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,0);
	var _2 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,120);
	tmp = { _0 : _0, _1 : _1, _2 : _2};
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.withAlpha = function(this1,alpha) {
	var tmp;
	var tmp1;
	if(alpha < 0) tmp1 = 0; else if(alpha > 1) tmp1 = 1; else tmp1 = alpha;
	var channels = this1.concat([tmp1]);
	tmp = channels;
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.withHue = function(this1,newhue) {
	var tmp;
	if(newhue < 0) tmp = 0; else if(newhue > 1) tmp = 1; else tmp = newhue;
	return [tmp,this1[1],this1[2]];
};
thx_color__$HSV_HSV_$Impl_$.withValue = function(this1,newvalue) {
	var tmp;
	if(newvalue < 0) tmp = 0; else if(newvalue > 1) tmp = 1; else tmp = newvalue;
	return [this1[0],this1[1],tmp];
};
thx_color__$HSV_HSV_$Impl_$.withSaturation = function(this1,newsaturation) {
	var tmp;
	if(newsaturation < 0) tmp = 0; else if(newsaturation > 1) tmp = 1; else tmp = newsaturation;
	return [this1[0],tmp,this1[2]];
};
thx_color__$HSV_HSV_$Impl_$.toString = function(this1) {
	return "hsv(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx_color__$HSV_HSV_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$HSV_HSV_$Impl_$.toCIELab = function(this1) {
	var tmp;
	if(this1[1] == 0) tmp = [this1[2],this1[2],this1[2]]; else {
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
		f = h - i;
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
		tmp = [r,g,b];
	}
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(tmp);
};
thx_color__$HSV_HSV_$Impl_$.toCIELCh = function(this1) {
	var tmp;
	if(this1[1] == 0) tmp = [this1[2],this1[2],this1[2]]; else {
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
		f = h - i;
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
		tmp = [r,g,b];
	}
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(tmp);
};
thx_color__$HSV_HSV_$Impl_$.toCMY = function(this1) {
	var tmp;
	if(this1[1] == 0) tmp = [this1[2],this1[2],this1[2]]; else {
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
		f = h - i;
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
		tmp = [r,g,b];
	}
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(tmp);
};
thx_color__$HSV_HSV_$Impl_$.toCMYK = function(this1) {
	var tmp;
	if(this1[1] == 0) tmp = [this1[2],this1[2],this1[2]]; else {
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
		f = h - i;
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
		tmp = [r,g,b];
	}
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(tmp);
};
thx_color__$HSV_HSV_$Impl_$.toGrey = function(this1) {
	var tmp;
	var tmp1;
	if(this1[1] == 0) tmp1 = [this1[2],this1[2],this1[2]]; else {
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
		f = h - i;
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
		tmp1 = [r,g,b];
	}
	var this2 = tmp1;
	tmp = this2[0] * .2126 + this2[1] * .7152 + this2[2] * .0722;
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.toHSL = function(this1) {
	var tmp;
	if(this1[1] == 0) tmp = [this1[2],this1[2],this1[2]]; else {
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
		f = h - i;
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
		tmp = [r,g,b];
	}
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(tmp);
};
thx_color__$HSV_HSV_$Impl_$.toHSVA = function(this1) {
	var tmp;
	var channels = this1.concat([1.0]);
	tmp = channels;
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.toRGB = function(this1) {
	var tmp;
	var tmp1;
	if(this1[1] == 0) tmp1 = [this1[2],this1[2],this1[2]]; else {
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
		f = h - i;
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
		tmp1 = [r,g,b];
	}
	var this2 = tmp1;
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this2[0],this2[1],this2[2]);
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.toRGBA = function(this1) {
	var tmp;
	var tmp1;
	var tmp2;
	if(this1[1] == 0) tmp2 = [this1[2],this1[2],this1[2]]; else {
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
		f = h - i;
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
		tmp2 = [r,g,b];
	}
	var this3 = tmp2;
	var tmp3;
	var channels = this3.concat([1.0]);
	tmp3 = channels;
	tmp1 = tmp3;
	var this2 = tmp1;
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.toRGBX = function(this1) {
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
	f = h - i;
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
thx_color__$HSV_HSV_$Impl_$.toRGBXA = function(this1) {
	var tmp;
	var tmp1;
	if(this1[1] == 0) tmp1 = [this1[2],this1[2],this1[2]]; else {
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
		f = h - i;
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
		tmp1 = [r,g,b];
	}
	var this2 = tmp1;
	var tmp2;
	var channels = this2.concat([1.0]);
	tmp2 = channels;
	tmp = tmp2;
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.toXYZ = function(this1) {
	var tmp;
	if(this1[1] == 0) tmp = [this1[2],this1[2],this1[2]]; else {
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
		f = h - i;
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
		tmp = [r,g,b];
	}
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(tmp);
};
thx_color__$HSV_HSV_$Impl_$.toYxy = function(this1) {
	var tmp;
	var tmp1;
	if(this1[1] == 0) tmp1 = [this1[2],this1[2],this1[2]]; else {
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
		f = h - i;
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
		tmp1 = [r,g,b];
	}
	var this2 = tmp1;
	tmp = thx_color__$XYZ_XYZ_$Impl_$.toYxy(thx_color__$RGBX_RGBX_$Impl_$.toXYZ(this2));
	return tmp;
};
thx_color__$HSV_HSV_$Impl_$.get_hue = function(this1) {
	return this1[0];
};
thx_color__$HSV_HSV_$Impl_$.get_huef = function(this1) {
	return this1[0];
};
thx_color__$HSV_HSV_$Impl_$.get_saturation = function(this1) {
	return this1[1];
};
thx_color__$HSV_HSV_$Impl_$.get_value = function(this1) {
	return this1[2];
};
var thx_color__$HSVA_HSVA_$Impl_$ = {};
thx_color__$HSVA_HSVA_$Impl_$.__name__ = ["thx","color","_HSVA","HSVA_Impl_"];
thx_color__$HSVA_HSVA_$Impl_$.create = function(hue,saturation,value,alpha) {
	var tmp;
	var tmp1;
	if(saturation < 0) tmp1 = 0; else if(saturation > 1) tmp1 = 1; else tmp1 = saturation;
	var tmp2;
	if(value < 0) tmp2 = 0; else if(value > 1) tmp2 = 1; else tmp2 = value;
	var tmp3;
	if(alpha < 0) tmp3 = 0; else if(alpha > 1) tmp3 = 1; else tmp3 = alpha;
	var channels = [thx_core_Floats.wrapCircular(hue,360),tmp1,tmp2,tmp3];
	tmp = channels;
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,4);
	return thx_color__$HSVA_HSVA_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$HSVA_HSVA_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsv":
			var tmp1;
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp1 = channels;
			var this1 = tmp1;
			var tmp2;
			var channels1 = this1.concat([1.0]);
			tmp2 = channels1;
			tmp = tmp2;
			break;
		case "hsva":
			var channels2 = thx_color_parse_ColorParser.getFloatChannels(info.channels,4);
			tmp = channels2;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$HSVA_HSVA_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var tmp;
	var _0 = thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.complement = function(this1) {
	return thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,180);
};
thx_color__$HSVA_HSVA_$Impl_$.transparent = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Floats.interpolate(t,this1[3],0)];
	tmp = channels;
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.opaque = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Floats.interpolate(t,this1[3],1)];
	tmp = channels;
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolateAngle(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2]),thx_core_Floats.interpolate(t,this1[3],other[3])];
	tmp = channels;
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$HSVA_HSVA_$Impl_$.create(this1[0] + angle,this1[1],this1[2],this1[3]);
};
thx_color__$HSVA_HSVA_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 150.0;
	var tmp;
	var _0 = thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,spread);
	tmp = { _0 : _0, _1 : _1};
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.withAlpha = function(this1,newalpha) {
	var tmp;
	if(newalpha < 0) tmp = 0; else if(newalpha > 1) tmp = 1; else tmp = newalpha;
	return [this1[0],this1[1],this1[2],tmp];
};
thx_color__$HSVA_HSVA_$Impl_$.withHue = function(this1,newhue) {
	var tmp;
	if(newhue < 0) tmp = 0; else if(newhue > 1) tmp = 1; else tmp = newhue;
	return [tmp,this1[1],this1[2],this1[3]];
};
thx_color__$HSVA_HSVA_$Impl_$.withLightness = function(this1,newvalue) {
	var tmp;
	if(newvalue < 0) tmp = 0; else if(newvalue > 1) tmp = 1; else tmp = newvalue;
	return [this1[0],this1[1],tmp,this1[3]];
};
thx_color__$HSVA_HSVA_$Impl_$.withSaturation = function(this1,newsaturation) {
	var tmp;
	if(newsaturation < 0) tmp = 0; else if(newsaturation > 1) tmp = 1; else tmp = newsaturation;
	return [this1[0],tmp,this1[2],this1[3]];
};
thx_color__$HSVA_HSVA_$Impl_$.toString = function(this1) {
	return "hsva(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx_color__$HSVA_HSVA_$Impl_$.equals = function(this1,other) {
	return ((Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false)?Math.abs(this1[3] - other[3]) <= 10e-10:false;
};
thx_color__$HSVA_HSVA_$Impl_$.toHSV = function(this1) {
	var tmp;
	var channels = this1.slice(0,3);
	tmp = channels;
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.toHSLA = function(this1) {
	var tmp;
	if(this1[1] == 0) tmp = [this1[2],this1[2],this1[2],this1[3]]; else {
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
		f = h - i;
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
		tmp = [r,g,b,this1[3]];
	}
	return thx_color__$RGBXA_RGBXA_$Impl_$.toHSLA(tmp);
};
thx_color__$HSVA_HSVA_$Impl_$.toRGB = function(this1) {
	var tmp;
	var tmp1;
	if(this1[1] == 0) tmp1 = [this1[2],this1[2],this1[2],this1[3]]; else {
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
		f = h - i;
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
		tmp1 = [r,g,b,this1[3]];
	}
	var this2 = tmp1;
	var tmp2;
	var channels = this2.slice(0,3);
	tmp2 = channels;
	var this3 = tmp2;
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this3[0],this3[1],this3[2]);
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.toRGBA = function(this1) {
	var tmp;
	var tmp1;
	if(this1[1] == 0) tmp1 = [this1[2],this1[2],this1[2],this1[3]]; else {
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
		f = h - i;
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
		tmp1 = [r,g,b,this1[3]];
	}
	var this2 = tmp1;
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$HSVA_HSVA_$Impl_$.toRGBXA = function(this1) {
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
	f = h - i;
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
thx_color__$HSVA_HSVA_$Impl_$.get_hue = function(this1) {
	return this1[0];
};
thx_color__$HSVA_HSVA_$Impl_$.get_huef = function(this1) {
	return this1[0];
};
thx_color__$HSVA_HSVA_$Impl_$.get_saturation = function(this1) {
	return this1[1];
};
thx_color__$HSVA_HSVA_$Impl_$.get_value = function(this1) {
	return this1[2];
};
thx_color__$HSVA_HSVA_$Impl_$.get_alpha = function(this1) {
	return this1[3];
};
var thx_color__$RGB_RGB_$Impl_$ = {};
thx_color__$RGB_RGB_$Impl_$.__name__ = ["thx","color","_RGB","RGB_Impl_"];
thx_color__$RGB_RGB_$Impl_$.create = function(red,green,blue) {
	return (red & 255) << 16 | (green & 255) << 8 | blue & 255;
};
thx_color__$RGB_RGB_$Impl_$.createf = function(red,green,blue) {
	return thx_color__$RGB_RGB_$Impl_$.create(Math.round(red * 255),Math.round(green * 255),Math.round(blue * 255));
};
thx_color__$RGB_RGB_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			tmp = thx_color__$RGB_RGB_$Impl_$.fromInts(thx_color_parse_ColorParser.getInt8Channels(info.channels,3));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$RGB_RGB_$Impl_$.fromInts = function(arr) {
	thx_core_ArrayInts.resize(arr,3);
	return thx_color__$RGB_RGB_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$RGB_RGB_$Impl_$._new = function(rgb) {
	return rgb;
};
thx_color__$RGB_RGB_$Impl_$.darker = function(this1,t) {
	var tmp;
	var this2 = thx_color__$RGBX_RGBX_$Impl_$.darker(thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]),t);
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this2[0],this2[1],this2[2]);
	return tmp;
};
thx_color__$RGB_RGB_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var this2 = thx_color__$RGBX_RGBX_$Impl_$.lighter(thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]),t);
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this2[0],this2[1],this2[2]);
	return tmp;
};
thx_color__$RGB_RGB_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var this2 = thx_color__$RGBX_RGBX_$Impl_$.interpolate(thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]),thx_color__$RGBX_RGBX_$Impl_$.fromInts([other >> 16 & 255,other >> 8 & 255,other & 255]),t);
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this2[0],this2[1],this2[2]);
	return tmp;
};
thx_color__$RGB_RGB_$Impl_$.withAlpha = function(this1,alpha) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255,alpha]);
};
thx_color__$RGB_RGB_$Impl_$.withRed = function(this1,newred) {
	return thx_color__$RGB_RGB_$Impl_$.fromInts([newred,this1 >> 8 & 255,this1 & 255]);
};
thx_color__$RGB_RGB_$Impl_$.withGreen = function(this1,newgreen) {
	return thx_color__$RGB_RGB_$Impl_$.fromInts([this1 >> 16 & 255,newgreen,this1 & 255]);
};
thx_color__$RGB_RGB_$Impl_$.withBlue = function(this1,newblue) {
	return thx_color__$RGB_RGB_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,newblue]);
};
thx_color__$RGB_RGB_$Impl_$.toCSS3 = function(this1) {
	return "rgb(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + ")";
};
thx_color__$RGB_RGB_$Impl_$.toString = function(this1) {
	return thx_color__$RGB_RGB_$Impl_$.toHex(this1);
};
thx_color__$RGB_RGB_$Impl_$.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(this1 >> 16 & 255,2) + StringTools.hex(this1 >> 8 & 255,2) + StringTools.hex(this1 & 255,2);
};
thx_color__$RGB_RGB_$Impl_$.equals = function(this1,other) {
	return ((this1 >> 16 & 255) == (other >> 16 & 255)?(this1 >> 8 & 255) == (other >> 8 & 255):false)?(this1 & 255) == (other & 255):false;
};
thx_color__$RGB_RGB_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]));
};
thx_color__$RGB_RGB_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]));
};
thx_color__$RGB_RGB_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]));
};
thx_color__$RGB_RGB_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]));
};
thx_color__$RGB_RGB_$Impl_$.toGrey = function(this1) {
	var tmp;
	var this2 = thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]);
	tmp = this2[0] * .2126 + this2[1] * .7152 + this2[2] * .0722;
	return tmp;
};
thx_color__$RGB_RGB_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]));
};
thx_color__$RGB_RGB_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]));
};
thx_color__$RGB_RGB_$Impl_$.toRGBX = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]);
};
thx_color__$RGB_RGB_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255,255]);
};
thx_color__$RGB_RGB_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255,255]));
};
thx_color__$RGB_RGB_$Impl_$.toYxy = function(this1) {
	var tmp;
	var this2 = thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]);
	tmp = thx_color__$XYZ_XYZ_$Impl_$.toYxy(thx_color__$RGBX_RGBX_$Impl_$.toXYZ(this2));
	return tmp;
};
thx_color__$RGB_RGB_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]));
};
thx_color__$RGB_RGB_$Impl_$.get_red = function(this1) {
	return this1 >> 16 & 255;
};
thx_color__$RGB_RGB_$Impl_$.get_green = function(this1) {
	return this1 >> 8 & 255;
};
thx_color__$RGB_RGB_$Impl_$.get_blue = function(this1) {
	return this1 & 255;
};
var thx_color__$RGBA_RGBA_$Impl_$ = {};
thx_color__$RGBA_RGBA_$Impl_$.__name__ = ["thx","color","_RGBA","RGBA_Impl_"];
thx_color__$RGBA_RGBA_$Impl_$.create = function(red,green,blue,alpha) {
	return (alpha & 255) << 24 | (red & 255) << 16 | (green & 255) << 8 | blue & 255;
};
thx_color__$RGBA_RGBA_$Impl_$.fromFloats = function(arr) {
	var ints = thx_core_ArrayFloats.resize(arr,4).map(function(_) {
		return Math.round(_ * 255);
	});
	return thx_color__$RGBA_RGBA_$Impl_$.create(ints[0],ints[1],ints[2],ints[3]);
};
thx_color__$RGBA_RGBA_$Impl_$.fromInt = function(rgba) {
	return rgba;
};
thx_color__$RGBA_RGBA_$Impl_$.fromInts = function(arr) {
	thx_core_ArrayInts.resize(arr,4);
	return thx_color__$RGBA_RGBA_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$RGBA_RGBA_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			var this1 = thx_color__$RGB_RGB_$Impl_$.fromInts(thx_color_parse_ColorParser.getInt8Channels(info.channels,3));
			tmp = thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255,255]);
			break;
		case "rgba":
			tmp = thx_color__$RGBA_RGBA_$Impl_$.create(thx_color_parse_ColorParser.getInt8Channel(info.channels[0]),thx_color_parse_ColorParser.getInt8Channel(info.channels[1]),thx_color_parse_ColorParser.getInt8Channel(info.channels[2]),Math.round(thx_color_parse_ColorParser.getFloatChannel(info.channels[3]) * 255));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$RGBA_RGBA_$Impl_$._new = function(rgba) {
	return rgba;
};
thx_color__$RGBA_RGBA_$Impl_$.darker = function(this1,t) {
	var tmp;
	var this2 = thx_color__$RGBXA_RGBXA_$Impl_$.darker(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),t);
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$RGBA_RGBA_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var this2 = thx_color__$RGBXA_RGBXA_$Impl_$.lighter(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),t);
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$RGBA_RGBA_$Impl_$.transparent = function(this1,t) {
	var tmp;
	var this2 = thx_color__$RGBXA_RGBXA_$Impl_$.transparent(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),t);
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$RGBA_RGBA_$Impl_$.opaque = function(this1,t) {
	var tmp;
	var this2 = thx_color__$RGBXA_RGBXA_$Impl_$.opaque(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),t);
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$RGBA_RGBA_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var this2 = thx_color__$RGBXA_RGBXA_$Impl_$.interpolate(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(other),t);
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$RGBA_RGBA_$Impl_$.withAlpha = function(this1,newalpha) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255,newalpha]);
};
thx_color__$RGBA_RGBA_$Impl_$.withRed = function(this1,newred) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([newred,this1 >> 8 & 255,this1 & 255]);
};
thx_color__$RGBA_RGBA_$Impl_$.withGreen = function(this1,newgreen) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 16 & 255,newgreen,this1 & 255]);
};
thx_color__$RGBA_RGBA_$Impl_$.withBlue = function(this1,newblue) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,newblue]);
};
thx_color__$RGBA_RGBA_$Impl_$.toHSLA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toHSLA(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1));
};
thx_color__$RGBA_RGBA_$Impl_$.toHSVA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toHSVA(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1));
};
thx_color__$RGBA_RGBA_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGB_RGB_$Impl_$.create(this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255);
};
thx_color__$RGBA_RGBA_$Impl_$.toRGBX = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]);
};
thx_color__$RGBA_RGBA_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.fromInts([this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255,this1 >> 24 & 255]);
};
thx_color__$RGBA_RGBA_$Impl_$.toCSS3 = function(this1) {
	return "rgba(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + "," + (this1 >> 24 & 255) / 255 + ")";
};
thx_color__$RGBA_RGBA_$Impl_$.toString = function(this1) {
	return "rgba(" + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) + "," + (this1 >> 24 & 255) / 255 + ")";
};
thx_color__$RGBA_RGBA_$Impl_$.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(this1 >> 24 & 255,2) + StringTools.hex(this1 >> 16 & 255,2) + StringTools.hex(this1 >> 8 & 255,2) + StringTools.hex(this1 & 255,2);
};
thx_color__$RGBA_RGBA_$Impl_$.equals = function(this1,other) {
	return (((this1 >> 16 & 255) == (other >> 16 & 255)?(this1 >> 24 & 255) == (other >> 24 & 255):false)?(this1 >> 8 & 255) == (other >> 8 & 255):false)?(this1 & 255) == (other & 255):false;
};
thx_color__$RGBA_RGBA_$Impl_$.get_alpha = function(this1) {
	return this1 >> 24 & 255;
};
thx_color__$RGBA_RGBA_$Impl_$.get_red = function(this1) {
	return this1 >> 16 & 255;
};
thx_color__$RGBA_RGBA_$Impl_$.get_green = function(this1) {
	return this1 >> 8 & 255;
};
thx_color__$RGBA_RGBA_$Impl_$.get_blue = function(this1) {
	return this1 & 255;
};
var thx_color__$RGBX_RGBX_$Impl_$ = {};
thx_color__$RGBX_RGBX_$Impl_$.__name__ = ["thx","color","_RGBX","RGBX_Impl_"];
thx_color__$RGBX_RGBX_$Impl_$.create = function(red,green,blue) {
	var tmp;
	if(red < 0) tmp = 0; else if(red > 1) tmp = 1; else tmp = red;
	var tmp1;
	if(green < 0) tmp1 = 0; else if(green > 1) tmp1 = 1; else tmp1 = green;
	var tmp2;
	if(blue < 0) tmp2 = 0; else if(blue > 1) tmp2 = 1; else tmp2 = blue;
	return [tmp,tmp1,tmp2];
};
thx_color__$RGBX_RGBX_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$RGBX_RGBX_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$RGBX_RGBX_$Impl_$.fromInts = function(arr) {
	thx_core_ArrayInts.resize(arr,3);
	return thx_color__$RGBX_RGBX_$Impl_$.create(arr[0] / 255,arr[1] / 255,arr[2] / 255);
};
thx_color__$RGBX_RGBX_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			tmp = thx_color__$RGBX_RGBX_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$RGBX_RGBX_$Impl_$.darker = function(this1,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],0),thx_core_Floats.interpolate(t,this1[1],0),thx_core_Floats.interpolate(t,this1[2],0)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],1),thx_core_Floats.interpolate(t,this1[1],1),thx_core_Floats.interpolate(t,this1[2],1)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.toCSS3 = function(this1) {
	return "rgb(" + this1[0] * 100 + "%," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx_color__$RGBX_RGBX_$Impl_$.toString = function(this1) {
	return "rgb(" + this1[0] * 100 + "%," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx_color__$RGBX_RGBX_$Impl_$.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(Math.round(this1[0] * 255),2) + StringTools.hex(Math.round(this1[1] * 255),2) + StringTools.hex(Math.round(this1[2] * 255),2);
};
thx_color__$RGBX_RGBX_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$RGBX_RGBX_$Impl_$.withAlpha = function(this1,alpha) {
	var tmp;
	var tmp1;
	if(alpha < 0) tmp1 = 0; else if(alpha > 1) tmp1 = 1; else tmp1 = alpha;
	var channels = this1.concat([tmp1]);
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.withRed = function(this1,newred) {
	var tmp;
	var tmp1;
	if(newred < 0) tmp1 = 0; else if(newred > 1) tmp1 = 1; else tmp1 = newred;
	var channels = [tmp1,Math.round(this1[1] * 255),Math.round(this1[2] * 255)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.withGreen = function(this1,newgreen) {
	var tmp;
	var tmp1;
	if(newgreen < 0) tmp1 = 0; else if(newgreen > 1) tmp1 = 1; else tmp1 = newgreen;
	var channels = [Math.round(this1[0] * 255),tmp1,Math.round(this1[2] * 255)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.withBlue = function(this1,newblue) {
	var tmp;
	var tmp1;
	if(newblue < 0) tmp1 = 0; else if(newblue > 1) tmp1 = 1; else tmp1 = newblue;
	var channels = [Math.round(this1[0] * 255),Math.round(this1[1] * 255),tmp1];
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.toCIELab = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toCIELab(thx_color__$RGBX_RGBX_$Impl_$.toXYZ(this1));
};
thx_color__$RGBX_RGBX_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toCIELCh(thx_color__$RGBX_RGBX_$Impl_$.toCIELab(this1));
};
thx_color__$RGBX_RGBX_$Impl_$.toCMY = function(this1) {
	return [1 - this1[0],1 - this1[1],1 - this1[2]];
};
thx_color__$RGBX_RGBX_$Impl_$.toCMYK = function(this1) {
	var c = 0.0;
	var y = 0.0;
	var m = 0.0;
	var k;
	if(this1[0] + this1[1] + this1[2] == 0) k = 1.0; else {
		k = 1 - Math.max(Math.max(this1[0],this1[1]),this1[2]);
		c = (1 - this1[0] - k) / (1 - k);
		m = (1 - this1[1] - k) / (1 - k);
		y = (1 - this1[2] - k) / (1 - k);
	}
	return [c,m,y,k];
};
thx_color__$RGBX_RGBX_$Impl_$.toGrey = function(this1) {
	return this1[0] * .2126 + this1[1] * .7152 + this1[2] * .0722;
};
thx_color__$RGBX_RGBX_$Impl_$.toPerceivedGrey = function(this1) {
	return this1[0] * .299 + this1[1] * .587 + this1[2] * .114;
};
thx_color__$RGBX_RGBX_$Impl_$.toPerceivedAccurateGrey = function(this1) {
	var tmp;
	var grey = Math.pow(this1[0],2) * .241 + Math.pow(this1[1],2) * .691 + Math.pow(this1[2],2) * .068;
	tmp = grey;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.toHSL = function(this1) {
	var min = Math.min(Math.min(this1[0],this1[1]),this1[2]);
	var max = Math.max(Math.max(this1[0],this1[1]),this1[2]);
	var delta = max - min;
	var h;
	var s;
	var l = (max + min) / 2;
	if(delta == 0.0) s = h = 0.0; else {
		s = l < 0.5?delta / (max + min):delta / (2 - max - min);
		if(this1[0] == max) h = (this1[1] - this1[2]) / delta + (this1[1] < Math.round(this1[2] * 255)?6:0); else if(this1[1] == max) h = (this1[2] - this1[0]) / delta + 2; else h = (this1[0] - this1[1]) / delta + 4;
		h *= 60;
	}
	return [h,s,l];
};
thx_color__$RGBX_RGBX_$Impl_$.toHSV = function(this1) {
	var min = Math.min(Math.min(this1[0],this1[1]),this1[2]);
	var max = Math.max(Math.max(this1[0],this1[1]),this1[2]);
	var delta = max - min;
	var h;
	var s;
	var v = max;
	if(delta != 0) s = delta / max; else {
		s = 0;
		h = -1;
		return [-1,0,v];
	}
	if(this1[0] == max) h = (this1[1] - this1[2]) / delta; else if(this1[1] == max) h = 2 + (this1[2] - this1[0]) / delta; else h = 4 + (this1[0] - this1[1]) / delta;
	h *= 60;
	if(h < 0) h += 360;
	return [h,s,v];
};
thx_color__$RGBX_RGBX_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGB_RGB_$Impl_$.createf(this1[0],this1[1],this1[2]);
};
thx_color__$RGBX_RGBX_$Impl_$.toRGBXA = function(this1) {
	var tmp;
	var channels = this1.concat([1.0]);
	tmp = channels;
	return tmp;
};
thx_color__$RGBX_RGBX_$Impl_$.toXYZ = function(this1) {
	var r = this1[0];
	var g = this1[1];
	var b = this1[2];
	r = 100 * (r > 0.04045?Math.pow((r + 0.055) / 1.055,2.4):r / 12.92);
	g = 100 * (g > 0.04045?Math.pow((g + 0.055) / 1.055,2.4):g / 12.92);
	b = 100 * (b > 0.04045?Math.pow((b + 0.055) / 1.055,2.4):b / 12.92);
	return [r * 0.4124 + g * 0.3576 + b * 0.1805,r * 0.2126 + g * 0.7152 + b * 0.0722,r * 0.0193 + g * 0.1192 + b * 0.9505];
};
thx_color__$RGBX_RGBX_$Impl_$.toYxy = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toYxy(thx_color__$RGBX_RGBX_$Impl_$.toXYZ(this1));
};
thx_color__$RGBX_RGBX_$Impl_$.get_red = function(this1) {
	return Math.round(this1[0] * 255);
};
thx_color__$RGBX_RGBX_$Impl_$.get_green = function(this1) {
	return Math.round(this1[1] * 255);
};
thx_color__$RGBX_RGBX_$Impl_$.get_blue = function(this1) {
	return Math.round(this1[2] * 255);
};
thx_color__$RGBX_RGBX_$Impl_$.get_redf = function(this1) {
	return this1[0];
};
thx_color__$RGBX_RGBX_$Impl_$.get_greenf = function(this1) {
	return this1[1];
};
thx_color__$RGBX_RGBX_$Impl_$.get_bluef = function(this1) {
	return this1[2];
};
var thx_color__$RGBXA_RGBXA_$Impl_$ = {};
thx_color__$RGBXA_RGBXA_$Impl_$.__name__ = ["thx","color","_RGBXA","RGBXA_Impl_"];
thx_color__$RGBXA_RGBXA_$Impl_$.create = function(red,green,blue,alpha) {
	var tmp;
	if(red < 0) tmp = 0; else if(red > 1) tmp = 1; else tmp = red;
	var tmp1;
	if(green < 0) tmp1 = 0; else if(green > 1) tmp1 = 1; else tmp1 = green;
	var tmp2;
	if(blue < 0) tmp2 = 0; else if(blue > 1) tmp2 = 1; else tmp2 = blue;
	var tmp3;
	if(alpha < 0) tmp3 = 0; else if(alpha > 1) tmp3 = 1; else tmp3 = alpha;
	return [tmp,tmp1,tmp2,tmp3];
};
thx_color__$RGBXA_RGBXA_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,4);
	return thx_color__$RGBXA_RGBXA_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$RGBXA_RGBXA_$Impl_$.fromInts = function(arr) {
	thx_core_ArrayInts.resize(arr,4);
	return thx_color__$RGBXA_RGBXA_$Impl_$.create(arr[0] / 255,arr[1] / 255,arr[2] / 255,arr[3] / 255);
};
thx_color__$RGBXA_RGBXA_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			var this1 = thx_color__$RGBX_RGBX_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3));
			var tmp1;
			var channels = this1.concat([1.0]);
			tmp1 = channels;
			tmp = tmp1;
			break;
		case "rgba":
			tmp = thx_color__$RGBXA_RGBXA_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,4));
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$RGBXA_RGBXA_$Impl_$.darker = function(this1,t) {
	var tmp;
	var tmp1;
	var channels1 = this1.slice(0,3);
	tmp1 = channels1;
	var this2 = thx_color__$RGBX_RGBX_$Impl_$.darker(tmp1,t);
	var alpha = Math.round(this1[3] * 255);
	var tmp2;
	if(alpha < 0) tmp2 = 0; else if(alpha > 1) tmp2 = 1; else tmp2 = alpha;
	var channels = this2.concat([tmp2]);
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.lighter = function(this1,t) {
	var tmp;
	var tmp1;
	var channels1 = this1.slice(0,3);
	tmp1 = channels1;
	var this2 = thx_color__$RGBX_RGBX_$Impl_$.lighter(tmp1,t);
	var alpha = Math.round(this1[3] * 255);
	var tmp2;
	if(alpha < 0) tmp2 = 0; else if(alpha > 1) tmp2 = 1; else tmp2 = alpha;
	var channels = this2.concat([tmp2]);
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.transparent = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Ints.interpolate(t,this1[3],0)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.opaque = function(this1,t) {
	var tmp;
	var channels = [this1[0],this1[1],this1[2],thx_core_Ints.interpolate(t,this1[3],1)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Ints.interpolate(t,this1[0],other[0]),thx_core_Ints.interpolate(t,this1[1],other[1]),thx_core_Ints.interpolate(t,this1[2],other[2]),thx_core_Ints.interpolate(t,this1[3],other[3])];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.withAlpha = function(this1,newalpha) {
	var tmp;
	var tmp1;
	if(newalpha < 0) tmp1 = 0; else if(newalpha > 1) tmp1 = 1; else tmp1 = newalpha;
	var channels = [Math.round(this1[0] * 255),Math.round(this1[1] * 255),Math.round(this1[2] * 255),tmp1];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.withRed = function(this1,newred) {
	var tmp;
	var tmp1;
	if(newred < 0) tmp1 = 0; else if(newred > 1) tmp1 = 1; else tmp1 = newred;
	var channels = [tmp1,Math.round(this1[1] * 255),Math.round(this1[2] * 255),Math.round(this1[3] * 255)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.withGreen = function(this1,newgreen) {
	var tmp;
	var tmp1;
	if(newgreen < 0) tmp1 = 0; else if(newgreen > 1) tmp1 = 1; else tmp1 = newgreen;
	var channels = [Math.round(this1[0] * 255),tmp1,Math.round(this1[2] * 255),Math.round(this1[3] * 255)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.withBlue = function(this1,newblue) {
	var tmp;
	var tmp1;
	if(newblue < 0) tmp1 = 0; else if(newblue > 1) tmp1 = 1; else tmp1 = newblue;
	var channels = [Math.round(this1[0] * 255),Math.round(this1[1] * 255),tmp1,Math.round(this1[3] * 255)];
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.toCSS3 = function(this1) {
	return "rgba(" + this1[0] * 100 + "%," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx_color__$RGBXA_RGBXA_$Impl_$.toString = function(this1) {
	return "rgba(" + this1[0] * 100 + "%," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx_color__$RGBXA_RGBXA_$Impl_$.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(Math.round(this1[3] * 255),2) + StringTools.hex(Math.round(this1[0] * 255),2) + StringTools.hex(Math.round(this1[1] * 255),2) + StringTools.hex(Math.round(this1[2] * 255),2);
};
thx_color__$RGBXA_RGBXA_$Impl_$.equals = function(this1,other) {
	return ((Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false)?Math.abs(this1[3] - other[3]) <= 10e-10:false;
};
thx_color__$RGBXA_RGBXA_$Impl_$.toHSLA = function(this1) {
	var tmp;
	var tmp1;
	var channels1 = this1.slice(0,3);
	tmp1 = channels1;
	var this2 = thx_color__$RGBX_RGBX_$Impl_$.toHSL(tmp1);
	var alpha = Math.round(this1[3] * 255);
	var tmp2;
	if(alpha < 0) tmp2 = 0; else if(alpha > 1) tmp2 = 1; else tmp2 = alpha;
	var channels = this2.concat([tmp2]);
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.toHSVA = function(this1) {
	var tmp;
	var tmp1;
	var channels1 = this1.slice(0,3);
	tmp1 = channels1;
	var this2 = thx_color__$RGBX_RGBX_$Impl_$.toHSV(tmp1);
	var alpha = Math.round(this1[3] * 255);
	var tmp2;
	if(alpha < 0) tmp2 = 0; else if(alpha > 1) tmp2 = 1; else tmp2 = alpha;
	var channels = this2.concat([tmp2]);
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.toRGB = function(this1) {
	var tmp;
	var tmp1;
	var channels = this1.slice(0,3);
	tmp1 = channels;
	var this2 = tmp1;
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this2[0],this2[1],this2[2]);
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX = function(this1) {
	var tmp;
	var channels = this1.slice(0,3);
	tmp = channels;
	return tmp;
};
thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this1[0],this1[1],this1[2],this1[3]]);
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_red = function(this1) {
	return Math.round(this1[0] * 255);
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_green = function(this1) {
	return Math.round(this1[1] * 255);
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_blue = function(this1) {
	return Math.round(this1[2] * 255);
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha = function(this1) {
	return Math.round(this1[3] * 255);
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_redf = function(this1) {
	return this1[0];
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_greenf = function(this1) {
	return this1[1];
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_bluef = function(this1) {
	return this1[2];
};
thx_color__$RGBXA_RGBXA_$Impl_$.get_alphaf = function(this1) {
	return this1[3];
};
var thx_color__$XYZ_XYZ_$Impl_$ = {};
thx_color__$XYZ_XYZ_$Impl_$.__name__ = ["thx","color","_XYZ","XYZ_Impl_"];
thx_color__$XYZ_XYZ_$Impl_$.create = function(x,y,z) {
	return [x,y,z];
};
thx_color__$XYZ_XYZ_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$XYZ_XYZ_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$XYZ_XYZ_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "ciexyz":case "xyz":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp = channels;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$XYZ_XYZ_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$XYZ_XYZ_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$XYZ_XYZ_$Impl_$.withX = function(this1,newx) {
	return [newx,this1[1],this1[2]];
};
thx_color__$XYZ_XYZ_$Impl_$.withY = function(this1,newy) {
	return [this1[0],newy,this1[2]];
};
thx_color__$XYZ_XYZ_$Impl_$.withZ = function(this1,newz) {
	return [this1[0],this1[1],newz];
};
thx_color__$XYZ_XYZ_$Impl_$.toString = function(this1) {
	return "XYZ(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
thx_color__$XYZ_XYZ_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$XYZ_XYZ_$Impl_$.toCIELab = function(this1) {
	var x = this1[0] * 0.0105211106;
	var y = this1[1] * 0.01;
	var z = this1[2] * 0.00918417016;
	x = x > 0.008856?Math.pow(x,0.333333333333333315):7.787 * x + 0.137931034482758619;
	y = y > 0.008856?Math.pow(y,0.333333333333333315):7.787 * y + 0.137931034482758619;
	z = z > 0.008856?Math.pow(z,0.333333333333333315):7.787 * z + 0.137931034482758619;
	return y > 0.008856?[116 * y - 16,500 * (x - y),200 * (y - z)]:[903.3 * y,500 * (x - y),200 * (y - z)];
};
thx_color__$XYZ_XYZ_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toCIELCh(thx_color__$XYZ_XYZ_$Impl_$.toCIELab(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toGrey = function(this1) {
	var tmp;
	var this2 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1);
	tmp = this2[0] * .2126 + this2[1] * .7152 + this2[2] * .0722;
	return tmp;
};
thx_color__$XYZ_XYZ_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toRGB = function(this1) {
	var tmp;
	var this2 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1);
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this2[0],this2[1],this2[2]);
	return tmp;
};
thx_color__$XYZ_XYZ_$Impl_$.toRGBA = function(this1) {
	var tmp;
	var tmp1;
	var this3 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1);
	var tmp2;
	var channels = this3.concat([1.0]);
	tmp2 = channels;
	tmp1 = tmp2;
	var this2 = tmp1;
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$XYZ_XYZ_$Impl_$.toRGBX = function(this1) {
	var x = this1[0] / 100;
	var y = this1[1] / 100;
	var z = this1[2] / 100;
	var r = x * 3.2406 + y * -1.5372 + z * -0.4986;
	var g = x * -0.9689 + y * 1.8758 + z * 0.0415;
	var b = x * 0.0557 + y * -0.204 + z * 1.0570;
	r = r > 0.0031308?1.055 * Math.pow(r,0.416666666666666685) - 0.055:12.92 * r;
	g = g > 0.0031308?1.055 * Math.pow(g,0.416666666666666685) - 0.055:12.92 * g;
	b = b > 0.0031308?1.055 * Math.pow(b,0.416666666666666685) - 0.055:12.92 * b;
	return [r,g,b];
};
thx_color__$XYZ_XYZ_$Impl_$.toRGBXA = function(this1) {
	var tmp;
	var this2 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1);
	var tmp1;
	var channels = this2.concat([1.0]);
	tmp1 = channels;
	tmp = tmp1;
	return tmp;
};
thx_color__$XYZ_XYZ_$Impl_$.toYxy = function(this1) {
	var sum = this1[0] + this1[1] + this1[2];
	return [this1[1],sum == 0?1:this1[0] / sum,sum == 0?1:this1[1] / sum];
};
thx_color__$XYZ_XYZ_$Impl_$.get_x = function(this1) {
	return this1[0];
};
thx_color__$XYZ_XYZ_$Impl_$.get_y = function(this1) {
	return this1[1];
};
thx_color__$XYZ_XYZ_$Impl_$.get_z = function(this1) {
	return this1[2];
};
var thx_color__$Yxy_Yxy_$Impl_$ = {};
thx_color__$Yxy_Yxy_$Impl_$.__name__ = ["thx","color","_Yxy","Yxy_Impl_"];
thx_color__$Yxy_Yxy_$Impl_$.create = function(y1,x,y2) {
	return [y1,x,y2];
};
thx_color__$Yxy_Yxy_$Impl_$.fromFloats = function(arr) {
	thx_core_ArrayFloats.resize(arr,3);
	return thx_color__$Yxy_Yxy_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$Yxy_Yxy_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	var tmp;
	try {
		var _g = info.name;
		switch(_g) {
		case "yxy":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			tmp = channels;
			break;
		default:
			tmp = null;
		}
	} catch( e ) {
		tmp = null;
	}
	return tmp;
};
thx_color__$Yxy_Yxy_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$Yxy_Yxy_$Impl_$.interpolate = function(this1,other,t) {
	var tmp;
	var channels = [thx_core_Floats.interpolate(t,this1[0],other[0]),thx_core_Floats.interpolate(t,this1[1],other[1]),thx_core_Floats.interpolate(t,this1[2],other[2])];
	tmp = channels;
	return tmp;
};
thx_color__$Yxy_Yxy_$Impl_$.withY1 = function(this1,newy1) {
	return [newy1,this1[1],this1[2]];
};
thx_color__$Yxy_Yxy_$Impl_$.withY = function(this1,newx) {
	return [this1[0],this1[1],this1[2]];
};
thx_color__$Yxy_Yxy_$Impl_$.withZ = function(this1,newy2) {
	return [this1[0],this1[1],this1[2]];
};
thx_color__$Yxy_Yxy_$Impl_$.toString = function(this1) {
	return "Yxy(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
thx_color__$Yxy_Yxy_$Impl_$.equals = function(this1,other) {
	return (Math.abs(this1[0] - other[0]) <= 10e-10?Math.abs(this1[1] - other[1]) <= 10e-10:false)?Math.abs(this1[2] - other[2]) <= 10e-10:false;
};
thx_color__$Yxy_Yxy_$Impl_$.toCIELab = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toCIELab(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toCIELCh(thx_color__$XYZ_XYZ_$Impl_$.toCIELab(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1)));
};
thx_color__$Yxy_Yxy_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1)));
};
thx_color__$Yxy_Yxy_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1)));
};
thx_color__$Yxy_Yxy_$Impl_$.toGrey = function(this1) {
	var tmp;
	var this2 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1));
	tmp = this2[0] * .2126 + this2[1] * .7152 + this2[2] * .0722;
	return tmp;
};
thx_color__$Yxy_Yxy_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1)));
};
thx_color__$Yxy_Yxy_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1)));
};
thx_color__$Yxy_Yxy_$Impl_$.toRGB = function(this1) {
	var tmp;
	var this2 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1));
	tmp = thx_color__$RGB_RGB_$Impl_$.createf(this2[0],this2[1],this2[2]);
	return tmp;
};
thx_color__$Yxy_Yxy_$Impl_$.toRGBA = function(this1) {
	var tmp;
	var tmp1;
	var this3 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1));
	var tmp2;
	var channels = this3.concat([1.0]);
	tmp2 = channels;
	tmp1 = tmp2;
	var this2 = tmp1;
	tmp = thx_color__$RGBA_RGBA_$Impl_$.fromFloats([this2[0],this2[1],this2[2],this2[3]]);
	return tmp;
};
thx_color__$Yxy_Yxy_$Impl_$.toRGBX = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toRGBXA = function(this1) {
	var tmp;
	var this2 = thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1));
	var tmp1;
	var channels = this2.concat([1.0]);
	tmp1 = channels;
	tmp = tmp1;
	return tmp;
};
thx_color__$Yxy_Yxy_$Impl_$.toXYZ = function(this1) {
	return [this1[1] * (this1[0] / this1[2]),this1[0],(1 - this1[1] - this1[2]) * (this1[0] / this1[2])];
};
thx_color__$Yxy_Yxy_$Impl_$.get_y1 = function(this1) {
	return this1[0];
};
thx_color__$Yxy_Yxy_$Impl_$.get_x = function(this1) {
	return this1[1];
};
thx_color__$Yxy_Yxy_$Impl_$.get_y2 = function(this1) {
	return this1[2];
};
var thx_color_parse_ColorParser = function() {
	this.pattern_color = new EReg("^\\s*([^(]+)\\s*\\(([^)]*)\\)\\s*$","i");
	this.pattern_channel = new EReg("^\\s*(\\d*.\\d+|\\d+)(%|deg|rad)?\\s*$","i");
};
thx_color_parse_ColorParser.__name__ = ["thx","color","parse","ColorParser"];
thx_color_parse_ColorParser.parseColor = function(s) {
	return thx_color_parse_ColorParser.parser.processColor(s);
};
thx_color_parse_ColorParser.parseHex = function(s) {
	return thx_color_parse_ColorParser.parser.processHex(s);
};
thx_color_parse_ColorParser.parseChannel = function(s) {
	return thx_color_parse_ColorParser.parser.processChannel(s);
};
thx_color_parse_ColorParser.getFloatChannels = function(channels,length,useInt8) {
	if(useInt8 == null) useInt8 = true;
	if(length != channels.length) throw "invalid number of channels, expected " + length + " but it is " + channels.length;
	var tmp;
	var a2 = useInt8;
	tmp = function(a1) {
		return thx_color_parse_ColorParser.getFloatChannel(a1,a2);
	};
	return channels.map(tmp);
};
thx_color_parse_ColorParser.getInt8Channels = function(channels,length) {
	if(length != channels.length) throw "invalid number of channels, expected " + length + " but it is " + channels.length;
	return channels.map(thx_color_parse_ColorParser.getInt8Channel);
};
thx_color_parse_ColorParser.getFloatChannel = function(channel,useInt8) {
	if(useInt8 == null) useInt8 = true;
	var tmp;
	switch(channel[1]) {
	case 5:
		var v = channel[2];
		if(v) tmp = 1; else tmp = 0;
		break;
	case 1:
		var v1 = channel[2];
		tmp = v1;
		break;
	case 4:
		var v2 = channel[2];
		tmp = v2;
		break;
	case 2:
		var v3 = channel[2];
		tmp = v3;
		break;
	case 3:
		var v4 = channel[2];
		if(useInt8) tmp = v4 / 255; else {
			var v5 = channel[2];
			tmp = v5;
		}
		break;
	case 0:
		var v6 = channel[2];
		tmp = v6 / 100;
		break;
	}
	return tmp;
};
thx_color_parse_ColorParser.getInt8Channel = function(channel) {
	var tmp;
	switch(channel[1]) {
	case 5:
		var v = channel[2];
		if(v) tmp = 1; else tmp = 0;
		break;
	case 3:
		var v1 = channel[2];
		tmp = v1;
		break;
	case 0:
		var v2 = channel[2];
		tmp = Math.round(255 * v2 / 100);
		break;
	default:
		throw "unable to extract a valid int8 value";
	}
	return tmp;
};
thx_color_parse_ColorParser.prototype = {
	pattern_color: null
	,pattern_channel: null
	,processHex: function(s) {
		if(!thx_color_parse_ColorParser.isPureHex.match(s)) {
			if(HxOverrides.substr(s,0,1) == "#") {
				if(s.length == 4) s = s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3); else if(s.length == 5) s = s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3) + s.charAt(4) + s.charAt(4); else s = HxOverrides.substr(s,1,null);
			} else if(HxOverrides.substr(s,0,2) == "0x") s = HxOverrides.substr(s,2,null); else return null;
		}
		var channels = [];
		while(s.length > 0) {
			channels.push(thx_color_parse_ChannelInfo.CIInt8(Std.parseInt("0x" + HxOverrides.substr(s,0,2))));
			s = HxOverrides.substr(s,2,null);
		}
		if(channels.length == 4) return new thx_color_parse_ColorInfo("rgba",channels.slice(1).concat([channels[0]])); else return new thx_color_parse_ColorInfo("rgb",channels);
	}
	,processColor: function(s) {
		if(!this.pattern_color.match(s)) return null;
		var name = this.pattern_color.matched(1);
		if(null == name) return null;
		name = name.toLowerCase();
		var m2 = this.pattern_color.matched(2);
		var s_channels = null == m2?[]:m2.split(",");
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
		return new thx_color_parse_ColorInfo(name,channels);
	}
	,processChannel: function(s) {
		if(!this.pattern_channel.match(s)) return null;
		var value = this.pattern_channel.matched(1);
		var unit = this.pattern_channel.matched(2);
		if(unit == null) unit = "";
		var tmp;
		try {
			switch(unit) {
			case "%":
				if(thx_core_Floats.canParse(value)) tmp = thx_color_parse_ChannelInfo.CIPercent(thx_core_Floats.parse(value)); else tmp = null;
				break;
			case "deg":
				if(thx_core_Floats.canParse(value)) tmp = thx_color_parse_ChannelInfo.CIDegree(thx_core_Floats.parse(value)); else tmp = null;
				break;
			case "DEG":
				if(thx_core_Floats.canParse(value)) tmp = thx_color_parse_ChannelInfo.CIDegree(thx_core_Floats.parse(value)); else tmp = null;
				break;
			case "rad":
				if(thx_core_Floats.canParse(value)) tmp = thx_color_parse_ChannelInfo.CIDegree(thx_core_Floats.parse(value) * 180 / Math.PI); else tmp = null;
				break;
			case "RAD":
				if(thx_core_Floats.canParse(value)) tmp = thx_color_parse_ChannelInfo.CIDegree(thx_core_Floats.parse(value) * 180 / Math.PI); else tmp = null;
				break;
			case "":
				if(thx_core_Ints.canParse(value)) {
					var i = thx_core_Ints.parse(value);
					if(i == 0) tmp = thx_color_parse_ChannelInfo.CIBool(false); else if(i == 1) tmp = thx_color_parse_ChannelInfo.CIBool(true); else if(i < 256) tmp = thx_color_parse_ChannelInfo.CIInt8(i); else tmp = thx_color_parse_ChannelInfo.CIInt(i);
				} else if(thx_core_Floats.canParse(value)) tmp = thx_color_parse_ChannelInfo.CIFloat(thx_core_Floats.parse(value)); else tmp = null;
				break;
			default:
				tmp = null;
			}
		} catch( e ) {
			return null;
		}
		return tmp;
	}
	,__class__: thx_color_parse_ColorParser
};
var thx_color_parse_ColorInfo = function(name,channels) {
	this.name = name;
	this.channels = channels;
};
thx_color_parse_ColorInfo.__name__ = ["thx","color","parse","ColorInfo"];
thx_color_parse_ColorInfo.prototype = {
	name: null
	,channels: null
	,toString: function() {
		return "" + this.name + ", channels: " + Std.string(this.channels);
	}
	,__class__: thx_color_parse_ColorInfo
};
var thx_color_parse_ChannelInfo = { __ename__ : ["thx","color","parse","ChannelInfo"], __constructs__ : ["CIPercent","CIFloat","CIDegree","CIInt8","CIInt","CIBool"] };
thx_color_parse_ChannelInfo.CIPercent = function(value) { var $x = ["CIPercent",0,value]; $x.__enum__ = thx_color_parse_ChannelInfo; return $x; };
thx_color_parse_ChannelInfo.CIFloat = function(value) { var $x = ["CIFloat",1,value]; $x.__enum__ = thx_color_parse_ChannelInfo; return $x; };
thx_color_parse_ChannelInfo.CIDegree = function(value) { var $x = ["CIDegree",2,value]; $x.__enum__ = thx_color_parse_ChannelInfo; return $x; };
thx_color_parse_ChannelInfo.CIInt8 = function(value) { var $x = ["CIInt8",3,value]; $x.__enum__ = thx_color_parse_ChannelInfo; return $x; };
thx_color_parse_ChannelInfo.CIInt = function(value) { var $x = ["CIInt",4,value]; $x.__enum__ = thx_color_parse_ChannelInfo; return $x; };
thx_color_parse_ChannelInfo.CIBool = function(value) { var $x = ["CIBool",5,value]; $x.__enum__ = thx_color_parse_ChannelInfo; return $x; };
var thx_core_Arrays = function() { };
thx_core_Arrays.__name__ = ["thx","core","Arrays"];
thx_core_Arrays.after = function(array,element) {
	return array.slice(HxOverrides.indexOf(array,element,0) + 1);
};
thx_core_Arrays.all = function(arr,predicate) {
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(!predicate(item)) return false;
	}
	return true;
};
thx_core_Arrays.any = function(arr,predicate) {
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(predicate(item)) return true;
	}
	return false;
};
thx_core_Arrays.at = function(arr,indexes) {
	return indexes.map(function(i) {
		return arr[i];
	});
};
thx_core_Arrays.before = function(array,element) {
	return array.slice(0,HxOverrides.indexOf(array,element,0));
};
thx_core_Arrays.compact = function(arr) {
	return arr.filter(function(v) {
		return null != v;
	});
};
thx_core_Arrays.contains = function(array,element,eq) {
	if(null == eq) return HxOverrides.indexOf(array,element,0) >= 0; else {
		var _g1 = 0;
		var _g = array.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(eq(array[i],element)) return true;
		}
		return false;
	}
};
thx_core_Arrays.cross = function(a,b) {
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
thx_core_Arrays.crossMulti = function(array) {
	var acopy = array.slice();
	var result = acopy.shift().map(function(v) {
		return [v];
	});
	while(acopy.length > 0) {
		var array1 = acopy.shift();
		var tresult = result;
		result = [];
		var _g = 0;
		while(_g < array1.length) {
			var v1 = array1[_g];
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
thx_core_Arrays.eachPair = function(array,callback) {
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		var _g3 = i;
		var _g2 = array.length;
		while(_g3 < _g2) {
			var j = _g3++;
			if(!callback(array[i],array[j])) return;
		}
	}
};
thx_core_Arrays.equals = function(a,b,equality) {
	if(!(!(a == null)?b == null:true)?a.length != b.length:true) return false;
	if(null == equality) equality = thx_core_Functions.equality;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(!equality(a[i],b[i])) return false;
	}
	return true;
};
thx_core_Arrays.extract = function(a,predicate) {
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(predicate(a[i])) return a.splice(i,1)[0];
	}
	return null;
};
thx_core_Arrays.find = function(array,predicate) {
	var _g = 0;
	while(_g < array.length) {
		var item = array[_g];
		++_g;
		if(predicate(item)) return item;
	}
	return null;
};
thx_core_Arrays.findLast = function(array,predicate) {
	var len = array.length;
	var j;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		j = len - i - 1;
		if(predicate(array[j])) return array[j];
	}
	return null;
};
thx_core_Arrays.first = function(array) {
	return array[0];
};
thx_core_Arrays.flatMap = function(array,callback) {
	var tmp;
	var array1 = array.map(callback);
	tmp = Array.prototype.concat.apply([],array1);
	return tmp;
};
thx_core_Arrays.flatten = function(array) {
	return Array.prototype.concat.apply([],array);
};
thx_core_Arrays.from = function(array,element) {
	return array.slice(HxOverrides.indexOf(array,element,0));
};
thx_core_Arrays.head = function(array) {
	return array[0];
};
thx_core_Arrays.ifEmpty = function(value,alt) {
	return (null != value?0 != value.length:false)?value:alt;
};
thx_core_Arrays.initial = function(array) {
	return array.slice(0,array.length - 1);
};
thx_core_Arrays.isEmpty = function(array) {
	return array.length == 0;
};
thx_core_Arrays.last = function(array) {
	return array[array.length - 1];
};
thx_core_Arrays.mapi = function(array,callback) {
	var r = [];
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		r.push(callback(array[i],i));
	}
	return r;
};
thx_core_Arrays.mapRight = function(array,callback) {
	var i = array.length;
	var result = [];
	while(--i >= 0) result.push(callback(array[i]));
	return result;
};
thx_core_Arrays.order = function(array,sort) {
	var n = array.slice();
	n.sort(sort);
	return n;
};
thx_core_Arrays.pull = function(array,toRemove,equality) {
	var _g = 0;
	while(_g < toRemove.length) {
		var item = toRemove[_g];
		++_g;
		thx_core_Arrays.removeAll(array,item,equality);
	}
};
thx_core_Arrays.pushIf = function(array,condition,value) {
	if(condition) array.push(value);
	return array;
};
thx_core_Arrays.reduce = function(array,callback,initial) {
	return array.reduce(callback,initial);
};
thx_core_Arrays.resize = function(array,length,fill) {
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx_core_Arrays.reducei = function(array,callback,initial) {
	return array.reduce(callback,initial);
};
thx_core_Arrays.reduceRight = function(array,callback,initial) {
	var i = array.length;
	while(--i >= 0) initial = callback(initial,array[i]);
	return initial;
};
thx_core_Arrays.removeAll = function(array,element,equality) {
	if(null == equality) equality = thx_core_Functions.equality;
	var i = array.length;
	while(--i >= 0) if(equality(array[i],element)) array.splice(i,1);
};
thx_core_Arrays.rest = function(array) {
	return array.slice(1);
};
thx_core_Arrays.sample = function(array,n) {
	var tmp;
	var b = array.length;
	if(n < b) tmp = n; else tmp = b;
	n = tmp;
	var copy = array.slice();
	var result = [];
	var _g = 0;
	while(_g < n) {
		_g++;
		result.push(copy.splice(Std.random(copy.length),1)[0]);
	}
	return result;
};
thx_core_Arrays.sampleOne = function(array) {
	return array[Std.random(array.length)];
};
thx_core_Arrays.shuffle = function(a) {
	var t = thx_core_Ints.range(a.length);
	var array = [];
	while(t.length > 0) {
		var pos = Std.random(t.length);
		var index = t[pos];
		t.splice(pos,1);
		array.push(a[index]);
	}
	return array;
};
thx_core_Arrays.take = function(arr,n) {
	return arr.slice(0,n);
};
thx_core_Arrays.takeLast = function(arr,n) {
	return arr.slice(arr.length - n);
};
thx_core_Arrays.zip = function(array1,array2) {
	var tmp;
	var a = array1.length;
	var b = array2.length;
	if(a < b) tmp = a; else tmp = b;
	var length = tmp;
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i]});
	}
	return array;
};
thx_core_Arrays.zip3 = function(array1,array2,array3) {
	var length = thx_core_ArrayInts.min([array1.length,array2.length,array3.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i]});
	}
	return array;
};
thx_core_Arrays.zip4 = function(array1,array2,array3,array4) {
	var length = thx_core_ArrayInts.min([array1.length,array2.length,array3.length,array4.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i], _3 : array4[i]});
	}
	return array;
};
thx_core_Arrays.zip5 = function(array1,array2,array3,array4,array5) {
	var length = thx_core_ArrayInts.min([array1.length,array2.length,array3.length,array4.length,array5.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i], _3 : array4[i], _4 : array5[i]});
	}
	return array;
};
thx_core_Arrays.unzip = function(array) {
	var a1 = [];
	var a2 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
	});
	return { _0 : a1, _1 : a2};
};
thx_core_Arrays.unzip3 = function(array) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
	});
	return { _0 : a1, _1 : a2, _2 : a3};
};
thx_core_Arrays.unzip4 = function(array) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
		a4.push(t._3);
	});
	return { _0 : a1, _1 : a2, _2 : a3, _3 : a4};
};
thx_core_Arrays.unzip5 = function(array) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	var a5 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
		a4.push(t._3);
		a5.push(t._4);
	});
	return { _0 : a1, _1 : a2, _2 : a3, _3 : a4, _4 : a5};
};
var thx_core_ArrayFloats = function() { };
thx_core_ArrayFloats.__name__ = ["thx","core","ArrayFloats"];
thx_core_ArrayFloats.average = function(arr) {
	return thx_core_ArrayFloats.sum(arr) / arr.length;
};
thx_core_ArrayFloats.compact = function(arr) {
	return arr.filter(function(v) {
		return null != v?isFinite(v):false;
	});
};
thx_core_ArrayFloats.max = function(arr) {
	return arr.length == 0?null:arr.reduce(function(max,v) {
		return v > max?v:max;
	},arr[0]);
};
thx_core_ArrayFloats.min = function(arr) {
	return arr.length == 0?null:arr.reduce(function(min,v) {
		return v < min?v:min;
	},arr[0]);
};
thx_core_ArrayFloats.resize = function(array,length,fill) {
	if(fill == null) fill = 0.0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx_core_ArrayFloats.sum = function(arr) {
	return arr.reduce(function(tot,v) {
		return tot + v;
	},0.0);
};
var thx_core_ArrayInts = function() { };
thx_core_ArrayInts.__name__ = ["thx","core","ArrayInts"];
thx_core_ArrayInts.average = function(arr) {
	return thx_core_ArrayInts.sum(arr) / arr.length;
};
thx_core_ArrayInts.max = function(arr) {
	return arr.length == 0?null:arr.reduce(function(max,v) {
		return v > max?v:max;
	},arr[0]);
};
thx_core_ArrayInts.min = function(arr) {
	return arr.length == 0?null:arr.reduce(function(min,v) {
		return v < min?v:min;
	},arr[0]);
};
thx_core_ArrayInts.resize = function(array,length,fill) {
	if(fill == null) fill = 0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx_core_ArrayInts.sum = function(arr) {
	return arr.reduce(function(tot,v) {
		return tot + v;
	},0);
};
var thx_core_ArrayStrings = function() { };
thx_core_ArrayStrings.__name__ = ["thx","core","ArrayStrings"];
thx_core_ArrayStrings.compact = function(arr) {
	return arr.filter(function(v) {
		return !thx_core_Strings.isEmpty(v);
	});
};
thx_core_ArrayStrings.max = function(arr) {
	return arr.length == 0?null:arr.reduce(function(max,v) {
		return v > max?v:max;
	},arr[0]);
};
thx_core_ArrayStrings.min = function(arr) {
	return arr.length == 0?null:arr.reduce(function(min,v) {
		return v < min?v:min;
	},arr[0]);
};
var thx_core_Bools = function() { };
thx_core_Bools.__name__ = ["thx","core","Bools"];
thx_core_Bools.compare = function(a,b) {
	var tmp;
	if(a == b) tmp = 0; else if(a) tmp = -1; else tmp = 1;
	return tmp;
};
thx_core_Bools.toInt = function(v) {
	return v?1:0;
};
var thx_core_Error = function(message,stack,pos) {
	Error.call(this,message);
	this.message = message;
	if(null == stack) {
		var tmp;
		try {
			tmp = haxe_CallStack.exceptionStack();
		} catch( e ) {
			tmp = [];
		}
		stack = tmp;
		if(stack.length == 0) {
			var tmp1;
			try {
				tmp1 = haxe_CallStack.callStack();
			} catch( e1 ) {
				tmp1 = [];
			}
			stack = tmp1;
		}
	}
	this.stackItems = stack;
	this.pos = pos;
};
thx_core_Error.__name__ = ["thx","core","Error"];
thx_core_Error.fromDynamic = function(err,pos) {
	if(js_Boot.__instanceof(err,thx_core_Error)) return err;
	return new thx_core_Error("" + Std.string(err),null,pos);
};
thx_core_Error.__super__ = Error;
thx_core_Error.prototype = $extend(Error.prototype,{
	pos: null
	,stackItems: null
	,toString: function() {
		return this.message + "\nfrom: " + this.pos.className + "." + this.pos.methodName + "() at " + this.pos.lineNumber + "\n\n" + haxe_CallStack.toString(this.stackItems);
	}
	,__class__: thx_core_Error
});
var thx_core_Floats = function() { };
thx_core_Floats.__name__ = ["thx","core","Floats"];
thx_core_Floats.angleDifference = function(a,b,turn) {
	if(turn == null) turn = 360;
	var r = (b - a) % turn;
	if(r < 0) r += turn;
	if(r > turn / 2) r -= turn;
	return r;
};
thx_core_Floats.ceilTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.ceil(f * p) / p;
};
thx_core_Floats.canParse = function(s) {
	return thx_core_Floats.pattern_parse.match(s);
};
thx_core_Floats.clamp = function(v,min,max) {
	var tmp;
	if(v < min) tmp = min; else if(v > max) tmp = max; else tmp = v;
	return tmp;
};
thx_core_Floats.clampSym = function(v,max) {
	var tmp;
	var min = -max;
	if(v < min) tmp = min; else if(v > max) tmp = max; else tmp = v;
	return tmp;
};
thx_core_Floats.compare = function(a,b) {
	var tmp;
	if(a < b) tmp = -1; else if(b > a) tmp = 1; else tmp = 0;
	return tmp;
};
thx_core_Floats.floorTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.floor(f * p) / p;
};
thx_core_Floats.interpolate = function(f,a,b) {
	return (b - a) * f + a;
};
thx_core_Floats.interpolateAngle = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	return thx_core_Floats.wrapCircular(thx_core_Floats.interpolate(f,a,a + thx_core_Floats.angleDifference(a,b,turn)),turn);
};
thx_core_Floats.interpolateAngleWidest = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	return thx_core_Floats.wrapCircular(thx_core_Floats.interpolateAngle(f,a,b,turn) - turn / 2,turn);
};
thx_core_Floats.interpolateAngleCW = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	a = thx_core_Floats.wrapCircular(a,turn);
	b = thx_core_Floats.wrapCircular(b,turn);
	if(b < a) b += turn;
	return thx_core_Floats.wrapCircular(thx_core_Floats.interpolate(f,a,b),turn);
};
thx_core_Floats.interpolateAngleCCW = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	a = thx_core_Floats.wrapCircular(a,turn);
	b = thx_core_Floats.wrapCircular(b,turn);
	if(b > a) b -= turn;
	return thx_core_Floats.wrapCircular(thx_core_Floats.interpolate(f,a,b),turn);
};
thx_core_Floats.nearEquals = function(a,b) {
	return Math.abs(a - b) <= 10e-10;
};
thx_core_Floats.nearZero = function(n) {
	return Math.abs(n) <= 10e-10;
};
thx_core_Floats.normalize = function(v) {
	var tmp;
	if(v < 0) tmp = 0; else if(v > 1) tmp = 1; else tmp = v;
	return tmp;
};
thx_core_Floats.parse = function(s) {
	if(s.substring(0,1) == "+") s = s.substring(1);
	return parseFloat(s);
};
thx_core_Floats.root = function(base,index) {
	return Math.pow(base,1 / index);
};
thx_core_Floats.roundTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.round(f * p) / p;
};
thx_core_Floats.sign = function(value) {
	return value < 0?-1:1;
};
thx_core_Floats.wrap = function(v,min,max) {
	var range = max - min + 1;
	if(v < min) v += range * ((min - v) / range + 1);
	return min + (v - min) % range;
};
thx_core_Floats.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
};
var thx_core_Functions0 = function() { };
thx_core_Functions0.__name__ = ["thx","core","Functions0"];
thx_core_Functions0.after = function(callback,n) {
	return function() {
		if(--n == 0) callback();
	};
};
thx_core_Functions0.join = function(fa,fb) {
	return function() {
		fa();
		fb();
	};
};
thx_core_Functions0.once = function(f) {
	return function() {
		var t = f;
		t();
	};
};
thx_core_Functions0.negate = function(callback) {
	return function() {
		return !callback();
	};
};
thx_core_Functions0.times = function(n,callback) {
	return function() {
		return thx_core_Ints.range(n).map(function(_) {
			return callback();
		});
	};
};
thx_core_Functions0.timesi = function(n,callback) {
	return function() {
		return thx_core_Ints.range(n).map(function(i) {
			return callback(i);
		});
	};
};
var thx_core_Functions1 = function() { };
thx_core_Functions1.__name__ = ["thx","core","Functions1"];
thx_core_Functions1.compose = function(fa,fb) {
	return function(v) {
		return fa(fb(v));
	};
};
thx_core_Functions1.join = function(fa,fb) {
	return function(v) {
		fa(v);
		fb(v);
	};
};
thx_core_Functions1.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v) {
		return "" + Std.string(v);
	};
	var map_h = { };
	return function(v1) {
		var key = resolver(v1);
		if(map_h.hasOwnProperty("$" + key)) return map_h["$" + key];
		var result = callback(v1);
		map_h["$" + key] = result;
		return result;
	};
};
thx_core_Functions1.negate = function(callback) {
	return function(v) {
		return !callback(v);
	};
};
thx_core_Functions1.noop = function(_) {
};
thx_core_Functions1.times = function(n,callback) {
	return function(value) {
		return thx_core_Ints.range(n).map(function(_) {
			return callback(value);
		});
	};
};
thx_core_Functions1.timesi = function(n,callback) {
	return function(value) {
		return thx_core_Ints.range(n).map(function(i) {
			return callback(value,i);
		});
	};
};
thx_core_Functions1.swapArguments = function(callback) {
	return function(a2,a1) {
		return callback(a1,a2);
	};
};
var thx_core_Functions2 = function() { };
thx_core_Functions2.__name__ = ["thx","core","Functions2"];
thx_core_Functions2.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v1,v2) {
		return "" + Std.string(v1) + ":" + Std.string(v2);
	};
	var map_h = { };
	return function(v11,v21) {
		var key = resolver(v11,v21);
		if(map_h.hasOwnProperty("$" + key)) return map_h["$" + key];
		var result = callback(v11,v21);
		map_h["$" + key] = result;
		return result;
	};
};
thx_core_Functions2.negate = function(callback) {
	return function(v1,v2) {
		return !callback(v1,v2);
	};
};
var thx_core_Functions3 = function() { };
thx_core_Functions3.__name__ = ["thx","core","Functions3"];
thx_core_Functions3.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v1,v2,v3) {
		return "" + Std.string(v1) + ":" + Std.string(v2) + ":" + Std.string(v3);
	};
	var map_h = { };
	return function(v11,v21,v31) {
		var key = resolver(v11,v21,v31);
		if(map_h.hasOwnProperty("$" + key)) return map_h["$" + key];
		var result = callback(v11,v21,v31);
		map_h["$" + key] = result;
		return result;
	};
};
thx_core_Functions3.negate = function(callback) {
	return function(v1,v2,v3) {
		return !callback(v1,v2,v3);
	};
};
var thx_core_Functions = function() { };
thx_core_Functions.__name__ = ["thx","core","Functions"];
thx_core_Functions.constant = function(v) {
	return function() {
		return v;
	};
};
thx_core_Functions.equality = function(a,b) {
	return a == b;
};
thx_core_Functions.identity = function(value) {
	return value;
};
thx_core_Functions.noop = function() {
};
var thx_core_Ints = function() { };
thx_core_Ints.__name__ = ["thx","core","Ints"];
thx_core_Ints.abs = function(v) {
	return v < 0?-v:v;
};
thx_core_Ints.canParse = function(s) {
	return thx_core_Ints.pattern_parse.match(s);
};
thx_core_Ints.clamp = function(v,min,max) {
	var tmp;
	if(v < min) tmp = min; else if(v > max) tmp = max; else tmp = v;
	return tmp;
};
thx_core_Ints.clampSym = function(v,max) {
	var tmp;
	var min = -max;
	if(v < min) tmp = min; else if(v > max) tmp = max; else tmp = v;
	return tmp;
};
thx_core_Ints.compare = function(a,b) {
	return a - b;
};
thx_core_Ints.interpolate = function(f,a,b) {
	return Math.round(a + (b - a) * f);
};
thx_core_Ints.isEven = function(v) {
	return v % 2 == 0;
};
thx_core_Ints.isOdd = function(v) {
	return v % 2 != 0;
};
thx_core_Ints.max = function(a,b) {
	return a > b?a:b;
};
thx_core_Ints.min = function(a,b) {
	return a < b?a:b;
};
thx_core_Ints.parse = function(s,base) {
	var v = parseInt(s,base);
	return isNaN(v)?null:v;
};
thx_core_Ints.random = function(min,max) {
	if(min == null) min = 0;
	return Std.random(max + 1) + min;
};
thx_core_Ints.range = function(start,stop,step) {
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
thx_core_Ints.toString = function(value,base) {
	return value.toString(base);
};
thx_core_Ints.sign = function(value) {
	return value < 0?-1:1;
};
thx_core_Ints.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
};
var thx_core_Iterables = function() { };
thx_core_Iterables.__name__ = ["thx","core","Iterables"];
thx_core_Iterables.all = function(it,predicate) {
	return thx_core_Iterators.all($iterator(it)(),predicate);
};
thx_core_Iterables.any = function(it,predicate) {
	return thx_core_Iterators.any($iterator(it)(),predicate);
};
thx_core_Iterables.eachPair = function(it,handler) {
	return thx_core_Iterators.eachPair($iterator(it)(),handler);
};
thx_core_Iterables.filter = function(it,predicate) {
	return thx_core_Iterators.filter($iterator(it)(),predicate);
};
thx_core_Iterables.find = function(it,predicate) {
	return thx_core_Iterators.find($iterator(it)(),predicate);
};
thx_core_Iterables.first = function(it) {
	return thx_core_Iterators.first($iterator(it)());
};
thx_core_Iterables.last = function(it) {
	return thx_core_Iterators.last($iterator(it)());
};
thx_core_Iterables.isEmpty = function(it) {
	var tmp;
	var it1 = $iterator(it)();
	tmp = !it1.hasNext();
	return tmp;
};
thx_core_Iterables.isIterable = function(v) {
	var fields = (Reflect.isObject(v)?null == Type.getClass(v):false)?Reflect.fields(v):Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"iterator")) return false;
	return Reflect.isFunction(Reflect.field(v,"iterator"));
};
thx_core_Iterables.map = function(it,f) {
	return thx_core_Iterators.map($iterator(it)(),f);
};
thx_core_Iterables.mapi = function(it,f) {
	return thx_core_Iterators.mapi($iterator(it)(),f);
};
thx_core_Iterables.order = function(it,sort) {
	return thx_core_Iterators.order($iterator(it)(),sort);
};
thx_core_Iterables.reduce = function(it,callback,initial) {
	return thx_core_Iterators.reduce($iterator(it)(),callback,initial);
};
thx_core_Iterables.reducei = function(it,callback,initial) {
	return thx_core_Iterators.reducei($iterator(it)(),callback,initial);
};
thx_core_Iterables.toArray = function(it) {
	return thx_core_Iterators.toArray($iterator(it)());
};
var thx_core_Iterators = function() { };
thx_core_Iterators.__name__ = ["thx","core","Iterators"];
thx_core_Iterators.all = function(it,predicate) {
	while( it.hasNext() ) {
		var item = it.next();
		if(!predicate(item)) return false;
	}
	return true;
};
thx_core_Iterators.any = function(it,predicate) {
	while( it.hasNext() ) {
		var item = it.next();
		if(predicate(item)) return true;
	}
	return false;
};
thx_core_Iterators.eachPair = function(it,handler) {
	thx_core_Arrays.eachPair(thx_core_Iterators.toArray(it),handler);
};
thx_core_Iterators.filter = function(it,predicate) {
	return thx_core_Iterators.reduce(it,function(acc,item) {
		if(predicate(item)) acc.push(item);
		return acc;
	},[]);
};
thx_core_Iterators.find = function(it,f) {
	while( it.hasNext() ) {
		var item = it.next();
		if(f(item)) return item;
	}
	return null;
};
thx_core_Iterators.first = function(it) {
	return it.hasNext()?it.next():null;
};
thx_core_Iterators.isEmpty = function(it) {
	return !it.hasNext();
};
thx_core_Iterators.isIterator = function(v) {
	var fields = (Reflect.isObject(v)?null == Type.getClass(v):false)?Reflect.fields(v):Type.getInstanceFields(Type.getClass(v));
	if(!(!Lambda.has(fields,"next"))?!Lambda.has(fields,"hasNext"):true) return false;
	return Reflect.isFunction(Reflect.field(v,"next"))?Reflect.isFunction(Reflect.field(v,"hasNext")):false;
};
thx_core_Iterators.last = function(it) {
	var buf = null;
	while(it.hasNext()) buf = it.next();
	return buf;
};
thx_core_Iterators.map = function(it,f) {
	var acc = [];
	while( it.hasNext() ) {
		var v = it.next();
		acc.push(f(v));
	}
	return acc;
};
thx_core_Iterators.mapi = function(it,f) {
	var acc = [];
	var i = 0;
	while( it.hasNext() ) {
		var v = it.next();
		acc.push(f(v,i++));
	}
	return acc;
};
thx_core_Iterators.order = function(it,sort) {
	var n = thx_core_Iterators.toArray(it);
	n.sort(sort);
	return n;
};
thx_core_Iterators.reduce = function(it,callback,initial) {
	thx_core_Iterators.map(it,function(v) {
		initial = callback(initial,v);
	});
	return initial;
};
thx_core_Iterators.reducei = function(it,callback,initial) {
	thx_core_Iterators.mapi(it,function(v,i) {
		initial = callback(initial,v,i);
	});
	return initial;
};
thx_core_Iterators.toArray = function(it) {
	var items = [];
	while( it.hasNext() ) {
		var item = it.next();
		items.push(item);
	}
	return items;
};
var thx_core_Nil = { __ename__ : ["thx","core","Nil"], __constructs__ : ["nil"] };
thx_core_Nil.nil = ["nil",0];
thx_core_Nil.nil.__enum__ = thx_core_Nil;
var thx_core_Nulls = function() { };
thx_core_Nulls.__name__ = ["thx","core","Nulls"];
var thx_core_Strings = function() { };
thx_core_Strings.__name__ = ["thx","core","Strings"];
thx_core_Strings.after = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return ""; else return value.substring(pos + searchFor.length);
};
thx_core_Strings.capitalize = function(s) {
	return s.substring(0,1).toUpperCase() + s.substring(1);
};
thx_core_Strings.capitalizeWords = function(value,whiteSpaceOnly) {
	if(whiteSpaceOnly == null) whiteSpaceOnly = false;
	if(whiteSpaceOnly) return thx_core_Strings.UCWORDSWS.map(value.substring(0,1).toUpperCase() + value.substring(1),thx_core_Strings.upperMatch); else return thx_core_Strings.UCWORDS.map(value.substring(0,1).toUpperCase() + value.substring(1),thx_core_Strings.upperMatch);
};
thx_core_Strings.collapse = function(value) {
	return thx_core_Strings.WSG.replace(StringTools.trim(value)," ");
};
thx_core_Strings.compare = function(a,b) {
	var tmp;
	if(a < b) tmp = -1; else if(a > b) tmp = 1; else tmp = 0;
	return tmp;
};
thx_core_Strings.contains = function(s,test) {
	return s.indexOf(test) >= 0;
};
thx_core_Strings.dasherize = function(s) {
	return StringTools.replace(s,"_","-");
};
thx_core_Strings.ellipsis = function(s,maxlen,symbol) {
	if(symbol == null) symbol = "...";
	if(maxlen == null) maxlen = 20;
	return s.length > maxlen?s.substring(0,symbol.length > maxlen - symbol.length?symbol.length:maxlen - symbol.length) + symbol:s;
};
thx_core_Strings.filter = function(s,predicate) {
	return s.split("").filter(predicate).join("");
};
thx_core_Strings.filterCharcode = function(s,predicate) {
	return thx_core_Strings.map(s,function(s1) {
		return HxOverrides.cca(s1,0);
	}).filter(predicate).map(function(i) {
		return String.fromCharCode(i);
	}).join("");
};
thx_core_Strings.from = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return ""; else return value.substring(pos);
};
thx_core_Strings.humanize = function(s) {
	return StringTools.replace(thx_core_Strings.underscore(s),"_"," ");
};
thx_core_Strings.isAlphaNum = function(value) {
	return thx_core_Strings.ALPHANUM.match(value);
};
thx_core_Strings.isLowerCase = function(value) {
	return value.toLowerCase() == value;
};
thx_core_Strings.isUpperCase = function(value) {
	return value.toUpperCase() == value;
};
thx_core_Strings.ifEmpty = function(value,alt) {
	return (null != value?"" != value:false)?value:alt;
};
thx_core_Strings.isDigitsOnly = function(value) {
	return thx_core_Strings.DIGITS.match(value);
};
thx_core_Strings.isEmpty = function(value) {
	return !(value == null)?value == "":true;
};
thx_core_Strings.iterator = function(s) {
	var tmp;
	var _this = s.split("");
	tmp = HxOverrides.iter(_this);
	return tmp;
};
thx_core_Strings.map = function(value,callback) {
	return value.split("").map(callback);
};
thx_core_Strings.remove = function(value,toremove) {
	return StringTools.replace(value,toremove,"");
};
thx_core_Strings.removeAfter = function(value,toremove) {
	return StringTools.endsWith(value,toremove)?value.substring(0,value.length - toremove.length):value;
};
thx_core_Strings.removeBefore = function(value,toremove) {
	return StringTools.startsWith(value,toremove)?value.substring(toremove.length):value;
};
thx_core_Strings.repeat = function(s,times) {
	var tmp;
	var _g = [];
	var _g1 = 0;
	while(_g1 < times) {
		_g1++;
		_g.push(s);
	}
	tmp = _g;
	return tmp.join("");
};
thx_core_Strings.reverse = function(s) {
	var arr = s.split("");
	arr.reverse();
	return arr.join("");
};
thx_core_Strings.stripTags = function(s) {
	return thx_core_Strings.STRIPTAGS.replace(s,"");
};
thx_core_Strings.surround = function(s,left,right) {
	return "" + left + s + (null == right?left:right);
};
thx_core_Strings.toArray = function(s) {
	return s.split("");
};
thx_core_Strings.toCharcodeArray = function(s) {
	return thx_core_Strings.map(s,function(s1) {
		return HxOverrides.cca(s1,0);
	});
};
thx_core_Strings.toChunks = function(s,len) {
	var chunks = [];
	while(s.length > 0) {
		chunks.push(s.substring(0,len));
		s = s.substring(len);
	}
	return chunks;
};
thx_core_Strings.trimChars = function(value,charlist) {
	return thx_core_Strings.trimCharsRight(thx_core_Strings.trimCharsLeft(value,charlist),charlist);
};
thx_core_Strings.trimCharsLeft = function(value,charlist) {
	var pos = 0;
	var _g1 = 0;
	var _g = value.length;
	while(_g1 < _g) {
		var i = _g1++;
		var tmp;
		var test = value.charAt(i);
		tmp = charlist.indexOf(test) >= 0;
		if(tmp) pos++; else break;
	}
	return value.substring(pos);
};
thx_core_Strings.trimCharsRight = function(value,charlist) {
	var len = value.length;
	var pos = len;
	var i;
	var _g = 0;
	while(_g < len) {
		var j = _g++;
		i = len - j - 1;
		var tmp;
		var test = value.charAt(i);
		tmp = charlist.indexOf(test) >= 0;
		if(tmp) pos = i; else break;
	}
	return value.substring(0,pos);
};
thx_core_Strings.underscore = function(s) {
	s = new EReg("::","g").replace(s,"/");
	s = new EReg("([A-Z]+)([A-Z][a-z])","g").replace(s,"$1_$2");
	s = new EReg("([a-z\\d])([A-Z])","g").replace(s,"$1_$2");
	s = new EReg("-","g").replace(s,"_");
	return s.toLowerCase();
};
thx_core_Strings.upTo = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return value; else return value.substring(0,pos);
};
thx_core_Strings.wrapColumns = function(s,columns,indent,newline) {
	if(newline == null) newline = "\n";
	if(indent == null) indent = "";
	if(columns == null) columns = 78;
	return thx_core_Strings.SPLIT_LINES.split(s).map(function(part) {
		return thx_core_Strings.wrapLine(StringTools.trim(thx_core_Strings.WSG.replace(part," ")),columns,indent,newline);
	}).join(newline);
};
thx_core_Strings.upperMatch = function(re) {
	return re.matched(0).toUpperCase();
};
thx_core_Strings.wrapLine = function(s,columns,indent,newline) {
	var parts = [];
	var pos = 0;
	var len = s.length;
	var ilen = indent.length;
	columns -= ilen;
	while(true) {
		if(pos + columns >= len - ilen) {
			parts.push(s.substring(pos));
			break;
		}
		var i = 0;
		while(!StringTools.isSpace(s,pos + columns - i)?i < columns:false) i++;
		if(i == columns) {
			i = 0;
			while(!StringTools.isSpace(s,pos + columns + i)?pos + columns + i < len:false) i++;
			parts.push(s.substring(pos,pos + columns + i));
			pos += columns + i + 1;
		} else {
			parts.push(s.substring(pos,pos + columns - i));
			pos += columns - i + 1;
		}
	}
	return indent + parts.join(newline + indent);
};
var thx_core_Timer = function() { };
thx_core_Timer.__name__ = ["thx","core","Timer"];
thx_core_Timer.debounce = function(callback,delayms,leading) {
	if(leading == null) leading = false;
	var cancel = thx_core_Functions.noop;
	var poll = function() {
		cancel();
		thx_core_Timer.delay(callback,delayms);
	};
	return function() {
		if(leading) callback();
		poll();
	};
};
thx_core_Timer.throttle = function(callback,delayms,leading) {
	if(leading == null) leading = false;
	var waiting = false;
	var poll = function() {
		waiting = true;
		thx_core_Timer.delay(callback,delayms);
	};
	return function() {
		if(leading) {
			callback();
			return;
		}
		if(waiting) return;
		poll();
	};
};
thx_core_Timer.repeat = function(callback,delayms) {
	var tmp;
	var id = setInterval(callback,delayms);
	tmp = function() {
		thx_core_Timer.clear(id);
	};
	return tmp;
};
thx_core_Timer.delay = function(callback,delayms) {
	var tmp;
	var id = setTimeout(callback,delayms);
	tmp = function() {
		thx_core_Timer.clear(id);
	};
	return tmp;
};
thx_core_Timer.frame = function(callback) {
	var cancelled = false;
	var f = thx_core_Functions.noop;
	var current = performance.now();
	var next;
	f = function() {
		if(cancelled) return;
		next = performance.now();
		callback(next - current);
		current = next;
		requestAnimationFrame(f);
	};
	requestAnimationFrame(f);
	return function() {
		cancelled = false;
	};
};
thx_core_Timer.nextFrame = function(callback) {
	var id = requestAnimationFrame(callback);
	return function() {
		cancelAnimationFrame(id);
	};
};
thx_core_Timer.immediate = function(callback) {
	var tmp;
	var id = setImmediate(callback);
	tmp = function() {
		thx_core_Timer.clear(id);
	};
	return tmp;
};
thx_core_Timer.clear = function(id) {
	return clearTimeout(id);
};
thx_core_Timer.time = function() {
	return performance.now();
};
var thx_core__$Tuple_Tuple0_$Impl_$ = {};
thx_core__$Tuple_Tuple0_$Impl_$.__name__ = ["thx","core","_Tuple","Tuple0_Impl_"];
thx_core__$Tuple_Tuple0_$Impl_$._new = function() {
	return thx_core_Nil.nil;
};
thx_core__$Tuple_Tuple0_$Impl_$["with"] = function(this1,v) {
	return v;
};
thx_core__$Tuple_Tuple0_$Impl_$.toString = function(this1) {
	return "Tuple0()";
};
thx_core__$Tuple_Tuple0_$Impl_$.toNil = function(this1) {
	return this1;
};
thx_core__$Tuple_Tuple0_$Impl_$.nilToTuple = function(v) {
	return thx_core_Nil.nil;
};
var thx_core__$Tuple_Tuple1_$Impl_$ = {};
thx_core__$Tuple_Tuple1_$Impl_$.__name__ = ["thx","core","_Tuple","Tuple1_Impl_"];
thx_core__$Tuple_Tuple1_$Impl_$._new = function(_0) {
	return _0;
};
thx_core__$Tuple_Tuple1_$Impl_$.get__0 = function(this1) {
	return this1;
};
thx_core__$Tuple_Tuple1_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1, _1 : v};
};
thx_core__$Tuple_Tuple1_$Impl_$.toString = function(this1) {
	return "Tuple1(" + Std.string(this1) + ")";
};
var thx_core__$Tuple_Tuple2_$Impl_$ = {};
thx_core__$Tuple_Tuple2_$Impl_$.__name__ = ["thx","core","_Tuple","Tuple2_Impl_"];
thx_core__$Tuple_Tuple2_$Impl_$._new = function(_0,_1) {
	return { _0 : _0, _1 : _1};
};
thx_core__$Tuple_Tuple2_$Impl_$.get_left = function(this1) {
	return this1._0;
};
thx_core__$Tuple_Tuple2_$Impl_$.get_right = function(this1) {
	return this1._1;
};
thx_core__$Tuple_Tuple2_$Impl_$.flip = function(this1) {
	return { _0 : this1._1, _1 : this1._0};
};
thx_core__$Tuple_Tuple2_$Impl_$.dropLeft = function(this1) {
	return this1._1;
};
thx_core__$Tuple_Tuple2_$Impl_$.dropRight = function(this1) {
	return this1._0;
};
thx_core__$Tuple_Tuple2_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : v};
};
thx_core__$Tuple_Tuple2_$Impl_$.toString = function(this1) {
	return "Tuple2(" + Std.string(this1._0) + "," + Std.string(this1._1) + ")";
};
var thx_core__$Tuple_Tuple3_$Impl_$ = {};
thx_core__$Tuple_Tuple3_$Impl_$.__name__ = ["thx","core","_Tuple","Tuple3_Impl_"];
thx_core__$Tuple_Tuple3_$Impl_$._new = function(_0,_1,_2) {
	return { _0 : _0, _1 : _1, _2 : _2};
};
thx_core__$Tuple_Tuple3_$Impl_$.flip = function(this1) {
	return { _0 : this1._2, _1 : this1._1, _2 : this1._0};
};
thx_core__$Tuple_Tuple3_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2};
};
thx_core__$Tuple_Tuple3_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1};
};
thx_core__$Tuple_Tuple3_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : v};
};
thx_core__$Tuple_Tuple3_$Impl_$.toString = function(this1) {
	return "Tuple3(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + ")";
};
var thx_core__$Tuple_Tuple4_$Impl_$ = {};
thx_core__$Tuple_Tuple4_$Impl_$.__name__ = ["thx","core","_Tuple","Tuple4_Impl_"];
thx_core__$Tuple_Tuple4_$Impl_$._new = function(_0,_1,_2,_3) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
};
thx_core__$Tuple_Tuple4_$Impl_$.flip = function(this1) {
	return { _0 : this1._3, _1 : this1._2, _2 : this1._1, _3 : this1._0};
};
thx_core__$Tuple_Tuple4_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3};
};
thx_core__$Tuple_Tuple4_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2};
};
thx_core__$Tuple_Tuple4_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : v};
};
thx_core__$Tuple_Tuple4_$Impl_$.toString = function(this1) {
	return "Tuple4(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + ")";
};
var thx_core__$Tuple_Tuple5_$Impl_$ = {};
thx_core__$Tuple_Tuple5_$Impl_$.__name__ = ["thx","core","_Tuple","Tuple5_Impl_"];
thx_core__$Tuple_Tuple5_$Impl_$._new = function(_0,_1,_2,_3,_4) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4};
};
thx_core__$Tuple_Tuple5_$Impl_$.flip = function(this1) {
	return { _0 : this1._4, _1 : this1._3, _2 : this1._2, _3 : this1._1, _4 : this1._0};
};
thx_core__$Tuple_Tuple5_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3, _3 : this1._4};
};
thx_core__$Tuple_Tuple5_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3};
};
thx_core__$Tuple_Tuple5_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : this1._4, _5 : v};
};
thx_core__$Tuple_Tuple5_$Impl_$.toString = function(this1) {
	return "Tuple5(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + "," + Std.string(this1._4) + ")";
};
var thx_core__$Tuple_Tuple6_$Impl_$ = {};
thx_core__$Tuple_Tuple6_$Impl_$.__name__ = ["thx","core","_Tuple","Tuple6_Impl_"];
thx_core__$Tuple_Tuple6_$Impl_$._new = function(_0,_1,_2,_3,_4,_5) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4, _5 : _5};
};
thx_core__$Tuple_Tuple6_$Impl_$.flip = function(this1) {
	return { _0 : this1._5, _1 : this1._4, _2 : this1._3, _3 : this1._2, _4 : this1._1, _5 : this1._0};
};
thx_core__$Tuple_Tuple6_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3, _3 : this1._4, _4 : this1._5};
};
thx_core__$Tuple_Tuple6_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : this1._4};
};
thx_core__$Tuple_Tuple6_$Impl_$.toString = function(this1) {
	return "Tuple6(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + "," + Std.string(this1._4) + "," + Std.string(this1._5) + ")";
};
var thx_core_Types = function() { };
thx_core_Types.__name__ = ["thx","core","Types"];
thx_core_Types.isAnonymousObject = function(v) {
	return Reflect.isObject(v)?null == Type.getClass(v):false;
};
thx_core_Types.isPrimitive = function(v) {
	var tmp;
	var _g = Type["typeof"](v);
	switch(_g[1]) {
	case 1:case 2:case 3:
		tmp = true;
		break;
	case 0:case 5:case 7:case 4:case 8:
		tmp = false;
		break;
	case 6:
		var c = _g[2];
		tmp = Type.getClassName(c) == "String";
		break;
	}
	return tmp;
};
thx_core_Types.hasSuperClass = function(cls,sup) {
	while(null != cls) {
		if(cls == sup) return true;
		cls = Type.getSuperClass(cls);
	}
	return false;
};
thx_core_Types.sameType = function(a,b) {
	return thx_core_Types.typeToString(Type["typeof"](a)) == thx_core_Types.typeToString(Type["typeof"](b));
};
thx_core_Types.typeInheritance = function(type) {
	var tmp;
	switch(type[1]) {
	case 1:
		tmp = ["Int"];
		break;
	case 2:
		tmp = ["Float"];
		break;
	case 3:
		tmp = ["Bool"];
		break;
	case 4:
		tmp = ["{}"];
		break;
	case 5:
		tmp = ["Function"];
		break;
	case 6:
		var c = type[2];
		var classes = [];
		while(null != c) {
			classes.push(c);
			c = Type.getSuperClass(c);
		}
		tmp = classes.map(Type.getClassName);
		break;
	case 7:
		var e = type[2];
		tmp = [Type.getEnumName(e)];
		break;
	default:
		throw "invalid type " + Std.string(type);
	}
	return tmp;
};
thx_core_Types.typeToString = function(type) {
	var tmp;
	switch(type[1]) {
	case 1:
		tmp = "Int";
		break;
	case 2:
		tmp = "Float";
		break;
	case 3:
		tmp = "Bool";
		break;
	case 4:
		tmp = "{}";
		break;
	case 5:
		tmp = "Function";
		break;
	case 6:
		var c = type[2];
		tmp = Type.getClassName(c);
		break;
	case 7:
		var e = type[2];
		tmp = Type.getEnumName(e);
		break;
	default:
		throw "invalid type " + Std.string(type);
	}
	return tmp;
};
thx_core_Types.valueTypeInheritance = function(value) {
	return thx_core_Types.typeInheritance(Type["typeof"](value));
};
thx_core_Types.valueTypeToString = function(value) {
	return thx_core_Types.typeToString(Type["typeof"](value));
};
var thx_core_error_NullArgument = function(message,posInfo) {
	thx_core_Error.call(this,message,null,posInfo);
};
thx_core_error_NullArgument.__name__ = ["thx","core","error","NullArgument"];
thx_core_error_NullArgument.__super__ = thx_core_Error;
thx_core_error_NullArgument.prototype = $extend(thx_core_Error.prototype,{
	__class__: thx_core_error_NullArgument
});
var thx_geom_Edge = function() { };
thx_geom_Edge.__name__ = ["thx","geom","Edge"];
thx_geom_Edge.prototype = {
	get_box: null
	,get_area: null
	,get_length: null
	,get_lengthSquared: null
	,get_isLinear: null
	,get_linearSegments: null
	,get_linearSpline: null
	,box: null
	,area: null
	,length: null
	,lengthSquared: null
	,isLinear: null
	,first: null
	,last: null
	,normalIn: null
	,normalOut: null
	,linearSegments: null
	,linearSpline: null
	,equals: null
	,matches: null
	,transform: null
	,flip: null
	,direction: null
	,intersects: null
	,intersections: null
	,intersectsLine: null
	,intersectionsLine: null
	,split: null
	,interpolate: null
	,interpolateNode: null
	,toArray: null
	,toLinear: null
	,toString: null
	,toSpline: null
	,__class__: thx_geom_Edge
};
var thx_geom_EdgeCubic = function(p0,p1,p2,p3) {
	this._lengthSquared = false;
	this._length = false;
	this._isLinear = false;
	this._area = false;
	this.first = this.p0 = p0;
	this.normalOut = this.p1 = p1;
	this.normalIn = this.p2 = p2;
	this.last = this.p3 = p3;
};
thx_geom_EdgeCubic.__name__ = ["thx","geom","EdgeCubic"];
thx_geom_EdgeCubic.__interfaces__ = [thx_geom_Edge];
thx_geom_EdgeCubic.prototype = {
	box: null
	,area: null
	,length: null
	,lengthSquared: null
	,linearSegments: null
	,linearSpline: null
	,isLinear: null
	,p0: null
	,p1: null
	,p2: null
	,p3: null
	,first: null
	,last: null
	,normalIn: null
	,normalOut: null
	,equals: function(other) {
		if(!js_Boot.__instanceof(other,thx_geom_EdgeCubic)) return false;
		var t = other;
		return ((thx_geom__$Point_Point_$Impl_$.nearEquals(this.p0,t.p0)?thx_geom__$Point_Point_$Impl_$.nearEquals(this.p1,t.p1):false)?thx_geom__$Point_Point_$Impl_$.nearEquals(this.p2,t.p2):false)?thx_geom__$Point_Point_$Impl_$.nearEquals(this.p3,t.p3):false;
	}
	,matches: function(other) {
		return thx_geom__$Point_Point_$Impl_$.nearEquals(this.first,other.first)?thx_geom__$Point_Point_$Impl_$.nearEquals(this.last,other.last):false;
	}
	,transform: function(matrix) {
		return new thx_geom_EdgeCubic(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this.p0),thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this.p1),thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this.p2),thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this.p3));
	}
	,flip: function() {
		return new thx_geom_EdgeCubic(this.p3,this.p2,this.p1,this.p0);
	}
	,direction: function() {
		var tmp;
		var this1 = this.last;
		var p = this.first;
		var p_0 = -p[0];
		var p_1 = -p[1];
		tmp = [this1[0] + p_0,this1[1] + p_1];
		return tmp;
	}
	,intersects: function(other) {
		return this.intersections(other).length > 0;
	}
	,intersections: function(other) {
		return js_Boot.__instanceof(other,thx_geom_EdgeLinear)?this.intersectionsEdgeLinear(other):this.intersectionsEdgeCubic(other);
	}
	,intersectionsEdgeLinear: function(other) {
		var tmp;
		var array = this.get_linearSegments().map(function(edge) {
			return edge.intersectionsEdgeLinear(other);
		});
		tmp = Array.prototype.concat.apply([],array);
		return tmp;
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
	,split: function(v) {
		var node = this.interpolateNode(v);
		if(null == node) return [];
		return [new thx_geom_EdgeCubic(this.p0,this.p1,node.normalIn,node.position),new thx_geom_EdgeCubic(node.position,node.normalOut,this.p2,this.p3)];
	}
	,interpolate: function(v) {
		var n = this.interpolateNode(v);
		if(null == n) return null;
		return n.position;
	}
	,interpolateNode: function(v) {
		var edges = this.subdivide(v);
		return new thx_geom_SplineNode(edges[0].last,edges[1].normalOut,edges[0].normalIn);
	}
	,toLinear: function() {
		return new thx_geom_EdgeLinear(this.first,this.last);
	}
	,toArray: function() {
		return [this.p0,this.p1,this.p2,this.p3];
	}
	,toString: function() {
		var tmp;
		var this1 = this.p0;
		tmp = "Point(" + this1[0] + "," + this1[1] + ")";
		var tmp1;
		var this2 = this.p1;
		tmp1 = "Point(" + this2[0] + "," + this2[1] + ")";
		var tmp2;
		var this3 = this.p2;
		tmp2 = "Point(" + this3[0] + "," + this3[1] + ")";
		var tmp3;
		var this4 = this.p3;
		tmp3 = "Point(" + this4[0] + "," + this4[1] + ")";
		return "Edge(" + tmp + "," + tmp1 + "," + tmp2 + "," + tmp3 + ")";
	}
	,toSpline: function() {
		return thx_geom_Spline.fromEdges([this],false);
	}
	,isNearFlat: function() {
		var sum = thx_geom__$Point_Point_$Impl_$.distanceTo(this.p0,this.p1) + thx_geom__$Point_Point_$Impl_$.distanceTo(this.p1,this.p2) + thx_geom__$Point_Point_$Impl_$.distanceTo(this.p2,this.p3);
		var len = thx_geom__$Point_Point_$Impl_$.distanceTo(this.p0,this.p3);
		return sum / len <= thx_geom_EdgeCubic.NEAR_FLAT;
	}
	,subdivide: function(v) {
		if(v == null) v = 0.5;
		var tmp;
		var this1 = this.p0;
		var tmp6;
		var tmp7;
		var this3 = this.p1;
		var p1 = this.p0;
		var p_0 = -p1[0];
		var p_1 = -p1[1];
		tmp7 = [this3[0] + p_0,this3[1] + p_1];
		var this2 = tmp7;
		tmp6 = [this2[0] * v,this2[1] * v];
		var p = tmp6;
		tmp = [this1[0] + p[0],this1[1] + p[1]];
		var l1 = tmp;
		var tmp1;
		var this4 = this.p1;
		var tmp8;
		var tmp9;
		var this6 = this.p2;
		var p3 = this.p1;
		var p_01 = -p3[0];
		var p_11 = -p3[1];
		tmp9 = [this6[0] + p_01,this6[1] + p_11];
		var this5 = tmp9;
		tmp8 = [this5[0] * v,this5[1] * v];
		var p2 = tmp8;
		tmp1 = [this4[0] + p2[0],this4[1] + p2[1]];
		var m = tmp1;
		var tmp2;
		var this7 = this.p2;
		var tmp10;
		var tmp11;
		var this9 = this.p3;
		var p5 = this.p2;
		var p_02 = -p5[0];
		var p_12 = -p5[1];
		tmp11 = [this9[0] + p_02,this9[1] + p_12];
		var this8 = tmp11;
		tmp10 = [this8[0] * v,this8[1] * v];
		var p4 = tmp10;
		tmp2 = [this7[0] + p4[0],this7[1] + p4[1]];
		var r2 = tmp2;
		var tmp3;
		var tmp12;
		var tmp13;
		var p_03 = -l1[0];
		var p_13 = -l1[1];
		tmp13 = [m[0] + p_03,m[1] + p_13];
		var this10 = tmp13;
		tmp12 = [this10[0] * v,this10[1] * v];
		var p6 = tmp12;
		tmp3 = [l1[0] + p6[0],l1[1] + p6[1]];
		var l2 = tmp3;
		var tmp4;
		var tmp14;
		var tmp15;
		var p_04 = -m[0];
		var p_14 = -m[1];
		tmp15 = [r2[0] + p_04,r2[1] + p_14];
		var this11 = tmp15;
		tmp14 = [this11[0] * v,this11[1] * v];
		var p7 = tmp14;
		tmp4 = [m[0] + p7[0],m[1] + p7[1]];
		var r1 = tmp4;
		var tmp5;
		var tmp16;
		var tmp17;
		var p_05 = -l2[0];
		var p_15 = -l2[1];
		tmp17 = [r1[0] + p_05,r1[1] + p_15];
		var this12 = tmp17;
		tmp16 = [this12[0] * v,this12[1] * v];
		var p8 = tmp16;
		tmp5 = [l2[0] + p8[0],l2[1] + p8[1]];
		var l3 = tmp5;
		return [new thx_geom_EdgeCubic(this.p0,l1,l2,l3),new thx_geom_EdgeCubic(l3,r1,r2,this.p3)];
	}
	,_area: null
	,get_area: function() {
		if(!this._area) {
			this._area = true;
			var tmp;
			var array = this.get_linearSegments();
			tmp = array.reduce(function(acc,edge) {
				return acc + edge.get_area();
			},0);
			this.area = tmp;
		}
		return this.area;
	}
	,get_box: function() {
		if(null == this.box) this.box = thx_geom_shape__$Box_Box_$Impl_$.expandByPoints(thx_geom_shape__$Box_Box_$Impl_$.fromPoints(this.p0,this.p1),[this.p2,this.p3]);
		return this.box;
	}
	,_isLinear: null
	,get_isLinear: function() {
		if(!this._isLinear) {
			this._isLinear = true;
			var line = thx_geom_Line.fromPoints(this.p0,this.p3);
			if(!(!thx_geom__$Point_Point_$Impl_$.isOnLine(this.p1,line))?!thx_geom__$Point_Point_$Impl_$.isOnLine(this.p0,line):true) this.isLinear = false; else {
				var box = thx_geom_shape__$Box_Box_$Impl_$.fromPoints(this.p0,this.p3);
				this.isLinear = thx_geom_shape__$Box_Box_$Impl_$.contains(box,this.p1)?thx_geom_shape__$Box_Box_$Impl_$.contains(box,this.p2):false;
			}
		}
		return this.isLinear;
	}
	,_length: null
	,get_length: function() {
		if(!this._length) {
			this._length = true;
			var tmp;
			var array = this.get_linearSegments();
			tmp = array.reduce(function(acc,edge) {
				return acc + edge.get_length();
			},0);
			this.length = tmp;
		}
		return this.length;
	}
	,_lengthSquared: null
	,get_lengthSquared: function() {
		if(!this._lengthSquared) {
			this._lengthSquared = true;
			var tmp;
			var array = this.get_linearSegments();
			tmp = array.reduce(function(acc,edge) {
				return acc + edge.get_lengthSquared();
			},0);
			this.lengthSquared = tmp;
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
		if(null == this.linearSpline) this.linearSpline = thx_geom_Spline.fromEdges(this.get_linearSegments(),false);
		return this.linearSpline;
	}
	,__class__: thx_geom_EdgeCubic
};
var thx_geom_EdgeLinear = function(p0,p1) {
	this._lengthSquared = false;
	this._length = false;
	this._area = false;
	this.first = this.p0 = p0;
	this.last = this.p1 = p1;
	this.normalIn = this.normalOut = null;
};
thx_geom_EdgeLinear.__name__ = ["thx","geom","EdgeLinear"];
thx_geom_EdgeLinear.__interfaces__ = [thx_geom_Edge];
thx_geom_EdgeLinear.prototype = {
	area: null
	,box: null
	,length: null
	,lengthSquared: null
	,line: null
	,linearSegments: null
	,linearSpline: null
	,isLinear: null
	,p0: null
	,p1: null
	,first: null
	,last: null
	,normalIn: null
	,normalOut: null
	,equals: function(other) {
		if(!js_Boot.__instanceof(other,thx_geom_EdgeLinear)) return false;
		var t = other;
		return thx_geom__$Point_Point_$Impl_$.nearEquals(this.p0,t.p0)?thx_geom__$Point_Point_$Impl_$.nearEquals(this.p1,t.p1):false;
	}
	,matches: function(other) {
		return thx_geom__$Point_Point_$Impl_$.nearEquals(this.first,other.first)?thx_geom__$Point_Point_$Impl_$.nearEquals(this.last,other.last):false;
	}
	,transform: function(matrix) {
		return new thx_geom_EdgeLinear(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this.p0),thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this.p1));
	}
	,flip: function() {
		return new thx_geom_EdgeLinear(this.p1,this.p0);
	}
	,direction: function() {
		var tmp;
		var this1 = this.last;
		var p = this.first;
		var p_0 = -p[0];
		var p_1 = -p[1];
		tmp = [this1[0] + p_0,this1[1] + p_1];
		return tmp;
	}
	,intersects: function(other) {
		return this.intersections(other).length > 0;
	}
	,intersections: function(other) {
		if(!thx_geom_shape__$Box_Box_$Impl_$.intersects(this.get_box(),other.get_box())) return [];
		if(js_Boot.__instanceof(other,thx_geom_EdgeLinear)) return this.intersectionsEdgeLinear(other); else return this.intersectionsEdgeCubic(other);
	}
	,intersectionsEdgeLinear: function(other) {
		var ps = this.intersectionsLine(other.get_line());
		if(!(ps.length == 0)?other.intersectsLine(this.get_line()):true) return ps; else return [];
	}
	,intersectionsEdgeCubic: function(other) {
		return other.intersectionsEdgeLinear(this);
	}
	,intersectsLine: function(line) {
		return this.intersectionsLine(line).length > 0;
	}
	,intersectionsLine: function(line) {
		var l = thx_geom_Line.fromPoints(this.p0,this.p1);
		var p = l.intersectionLine(line);
		if(null != p) {
			if(this.p0[0] == this.p1[0]) {
				var tmp;
				var tmp2;
				var this2 = this.p0;
				var p1 = this.p1;
				var x = Math.min(this2[0],p1[0]);
				var y = Math.min(this2[1],p1[1]);
				tmp2 = [x,y];
				var this1 = tmp2;
				tmp = this1[1];
				var tmp1;
				if(p[1] >= tmp) {
					var tmp3;
					var tmp4;
					var this4 = this.p0;
					var p2 = this.p1;
					var x1 = Math.max(this4[0],p2[0]);
					var y1 = Math.max(this4[1],p2[1]);
					tmp4 = [x1,y1];
					var this3 = tmp4;
					tmp3 = this3[1];
					tmp1 = p[1] <= tmp3;
				} else tmp1 = false;
				if(tmp1) return [p];
			} else {
				var tmp5;
				var tmp7;
				var this6 = this.p0;
				var p3 = this.p1;
				var x2 = Math.min(this6[0],p3[0]);
				var y2 = Math.min(this6[1],p3[1]);
				tmp7 = [x2,y2];
				var this5 = tmp7;
				tmp5 = this5[0];
				var tmp6;
				if(p[0] >= tmp5) {
					var tmp8;
					var tmp9;
					var this8 = this.p0;
					var p4 = this.p1;
					var x3 = Math.max(this8[0],p4[0]);
					var y3 = Math.max(this8[1],p4[1]);
					tmp9 = [x3,y3];
					var this7 = tmp9;
					tmp8 = this7[0];
					tmp6 = p[0] <= tmp8;
				} else tmp6 = false;
				if(tmp6) return [p];
			}
		}
		return [];
	}
	,split: function(v) {
		var mid = this.interpolate(v);
		return [new thx_geom_EdgeLinear(this.p0,mid),new thx_geom_EdgeLinear(mid,this.p1)];
	}
	,interpolate: function(v) {
		return thx_geom__$Point_Point_$Impl_$.interpolate(this.p0,this.p1,v);
	}
	,interpolateNode: function(v) {
		var p = this.interpolate(v);
		if(null == p) return null;
		return new thx_geom_SplineNode(p,null,null);
	}
	,toLinear: function() {
		return this;
	}
	,toArray: function() {
		return [this.p0,this.p1];
	}
	,toString: function() {
		var tmp;
		var this1 = this.p0;
		tmp = "Point(" + this1[0] + "," + this1[1] + ")";
		var tmp1;
		var this2 = this.p1;
		tmp1 = "Point(" + this2[0] + "," + this2[1] + ")";
		return "Edge(" + tmp + "," + tmp1 + ")";
	}
	,toSpline: function() {
		return thx_geom_Spline.fromEdges([this],false);
	}
	,_area: null
	,get_area: function() {
		if(!this._area) {
			this._area = true;
			var tmp;
			var this1 = this.p1;
			var p1 = this.p0;
			var p_0 = -p1[0];
			var p_1 = -p1[1];
			tmp = [this1[0] + p_0,this1[1] + p_1];
			var p = tmp;
			this.area = this.p0[1] * (this.p1[0] - this.p0[0]) + p[0] * p[1] / 2;
		}
		return this.area;
	}
	,get_box: function() {
		if(null == this.box) this.box = thx_geom_shape__$Box_Box_$Impl_$.fromPoints(this.p0,this.p1);
		return this.box;
	}
	,get_isLinear: function() {
		return true;
	}
	,_length: null
	,get_length: function() {
		if(!this._length) {
			this._length = true;
			this.length = Math.sqrt(this.get_lengthSquared());
		}
		return this.length;
	}
	,_lengthSquared: null
	,get_lengthSquared: function() {
		if(!this._lengthSquared) {
			this._lengthSquared = true;
			var tmp;
			var tmp1;
			var this2 = this.p1;
			var p = this.p0;
			var p_0 = -p[0];
			var p_1 = -p[1];
			tmp1 = [this2[0] + p_0,this2[1] + p_1];
			var this1 = tmp1;
			tmp = this1[0] * this1[0] + this1[1] * this1[1];
			this.lengthSquared = tmp;
		}
		return this.lengthSquared;
	}
	,get_line: function() {
		if(null == this.line) this.line = thx_geom_Line.fromPoints(this.p0,this.p1);
		return this.line;
	}
	,get_linearSegments: function() {
		return [this];
	}
	,get_linearSpline: function() {
		return this.linearSpline = thx_geom_Spline.fromEdges([this],false);
	}
	,__class__: thx_geom_EdgeLinear
};
var thx_geom_Line = function(normal,w) {
	var l = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
	this.w = w * l;
	this.normal = [normal[0] / l,normal[1] / l];
};
thx_geom_Line.__name__ = ["thx","geom","Line"];
thx_geom_Line.fromPoints = function(p1,p2) {
	var tmp;
	var p_0 = -p1[0];
	var p_1 = -p1[1];
	tmp = [p2[0] + p_0,p2[1] + p_1];
	var direction = tmp;
	var tmp1;
	var tmp2;
	var this_0 = direction[1];
	var this_1 = -direction[0];
	tmp2 = [-this_0,-this_1];
	var this1 = tmp2;
	var v = Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1]);
	tmp1 = [this1[0] / v,this1[1] / v];
	var normal = tmp1;
	var w = p1[0] * normal[0] + p1[1] * normal[1];
	return new thx_geom_Line(normal,w);
};
thx_geom_Line.prototype = {
	normal: null
	,w: null
	,isHorizontal: null
	,isVertical: null
	,offset: function(value) {
		return new thx_geom_Line(this.normal,this.w + value);
	}
	,reverse: function() {
		var tmp;
		var this1 = this.normal;
		tmp = [-this1[0],-this1[1]];
		return new thx_geom_Line(tmp,-this.w);
	}
	,equals: function(other) {
		var tmp;
		var this1 = this.normal;
		var p = other.normal;
		if(this1[0] == p[0]) tmp = this1[1] == p[1]; else tmp = false;
		return tmp?this.w == other.w:false;
	}
	,origin: function() {
		var tmp;
		var this1 = this.normal;
		var v = this.w;
		tmp = [this1[0] * v,this1[1] * v];
		return tmp;
	}
	,direction: function() {
		var tmp;
		var this1 = this.normal;
		tmp = [this1[1],-this1[0]];
		return tmp;
	}
	,xAtY: function(y) {
		return (this.w - this.normal[1] * y) / this.normal[0];
	}
	,absDistanceToPoint: function(point) {
		var tmp;
		var p = this.normal;
		tmp = point[0] * p[0] + point[1] * p[1];
		return Math.abs(tmp - this.w);
	}
	,intersectionLine: function(line) {
		return thx_geom__$Point_Point_$Impl_$.solve2Linear(this.normal[0],this.normal[1],line.normal[0],line.normal[1],this.w,line.w);
	}
	,transform: function(matrix) {
		var origin = [0,0];
		var tmp;
		var this1 = this.normal;
		var v = this.w;
		tmp = [this1[0] * v,this1[1] * v];
		var pointOnPlane = tmp;
		var neworigin = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,origin);
		var neworiginPlusNormal = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this.normal);
		var tmp1;
		var p_0 = -neworigin[0];
		var p_1 = -neworigin[1];
		tmp1 = [neworiginPlusNormal[0] + p_0,neworiginPlusNormal[1] + p_1];
		var newnormal = tmp1;
		var newpointOnPlane = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,pointOnPlane);
		var neww = newnormal[0] * newpointOnPlane[0] + newnormal[1] * newpointOnPlane[1];
		return new thx_geom_Line(newnormal,neww);
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
	,__class__: thx_geom_Line
};
var thx_geom_Line3D = function(point,direction) {
	this.point = point;
	var tmp;
	var v = Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(direction,[direction[0],direction[1],direction[2]]));
	tmp = [direction[0] / v,direction[1] / v,direction[2] / v];
	this.direction = tmp;
};
thx_geom_Line3D.__name__ = ["thx","geom","Line3D"];
thx_geom_Line3D.fromPoints = function(p1,p2) {
	var tmp;
	var tmp1;
	var p_0 = -p1[0];
	var p_1 = -p1[1];
	var p_2 = -p1[2];
	tmp1 = [p2[0] + p_0,p2[1] + p_1,p2[2] + p_2];
	var this1 = tmp1;
	var v = Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(this1,[this1[0],this1[1],this1[2]]));
	tmp = [this1[0] / v,this1[1] / v,this1[2] / v];
	return new thx_geom_Line3D(p1,tmp);
};
thx_geom_Line3D.fromPlanes = function(p1,p2) {
	var tmp;
	var this1 = p1.normal;
	var p = p2.normal;
	tmp = [this1[1] * p[2] - this1[2] * p[1],this1[2] * p[0] - this1[0] * p[2],this1[0] * p[1] - this1[1] * p[0]];
	var direction = tmp;
	var l = Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(direction,[direction[0],direction[1],direction[2]]));
	if(l < 1e-10) throw "Parallel planes";
	var tmp1;
	var v = 1.0 / l;
	tmp1 = [direction[0] * v,direction[1] * v,direction[2] * v];
	direction = tmp1;
	var mabsx = Math.abs(direction[0]);
	var mabsy = Math.abs(direction[1]);
	var mabsz = Math.abs(direction[2]);
	var origin;
	if(mabsx >= mabsy?mabsx >= mabsz:false) {
		var r = thx_geom__$Point_Point_$Impl_$.solve2Linear(p1.normal[1],p1.normal[2],p2.normal[1],p2.normal[2],p1.w,p2.w);
		origin = [0,r[0],r[1]];
	} else if(mabsy >= mabsx?mabsy >= mabsz:false) {
		var r1 = thx_geom__$Point_Point_$Impl_$.solve2Linear(p1.normal[0],p1.normal[2],p2.normal[0],p2.normal[2],p1.w,p2.w);
		origin = [r1[0],0,r1[1]];
	} else {
		var r2 = thx_geom__$Point_Point_$Impl_$.solve2Linear(p1.normal[0],p1.normal[1],p2.normal[0],p2.normal[1],p1.w,p2.w);
		origin = [r2[0],r2[1],0];
	}
	return new thx_geom_Line3D(origin,direction);
};
thx_geom_Line3D.prototype = {
	point: null
	,direction: null
	,intersectWithPlane: function(plane) {
		var lambda = (plane.w - thx_geom__$Point3D_Point3D_$Impl_$.dot(plane.normal,this.point)) / thx_geom__$Point3D_Point3D_$Impl_$.dot(plane.normal,this.direction);
		var tmp;
		var this1 = this.point;
		var tmp1;
		var this2 = this.direction;
		tmp1 = [this2[0] * lambda,this2[1] * lambda,this2[2] * lambda];
		var p = tmp1;
		tmp = [this1[0] + p[0],this1[1] + p[1],this1[2] + p[2]];
		return tmp;
	}
	,reverse: function() {
		var tmp;
		var this1 = this.direction;
		tmp = [-this1[0],-this1[1],-this1[2]];
		return new thx_geom_Line3D(this.point,tmp);
	}
	,transform: function(matrix4x4) {
		var tmp;
		var this1 = this.point;
		tmp = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint3D(matrix4x4,[this1[0],this1[1],this1[2]]);
		var newpoint = tmp;
		var tmp1;
		var this2 = this.point;
		var p = this.direction;
		tmp1 = [this2[0] + p[0],this2[1] + p[1],this2[2] + p[2]];
		var pointaddDirection = tmp1;
		var newPointaddDirection = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint3D(matrix4x4,[pointaddDirection[0],pointaddDirection[1],pointaddDirection[2]]);
		var tmp2;
		var p_0 = -newpoint[0];
		var p_1 = -newpoint[1];
		var p_2 = -newpoint[2];
		tmp2 = [newPointaddDirection[0] + p_0,newPointaddDirection[1] + p_1,newPointaddDirection[2] + p_2];
		var newdirection = tmp2;
		return new thx_geom_Line3D(newpoint,newdirection);
	}
	,closestPointOnLine: function(point) {
		var tmp;
		var p_0 = -point[0];
		var p_1 = -point[1];
		var p_2 = -point[2];
		tmp = [point[0] + p_0,point[1] + p_1,point[2] + p_2];
		var t = thx_geom__$Point3D_Point3D_$Impl_$.dot(tmp,this.direction) / thx_geom__$Point3D_Point3D_$Impl_$.dot(this.direction,this.direction);
		var tmp1;
		var tmp2;
		var this1 = this.direction;
		tmp2 = [this1[0] * t,this1[1] * t,this1[2] * t];
		var p = tmp2;
		tmp1 = [point[0] + p[0],point[1] + p[1],point[2] + p[2]];
		return tmp1;
	}
	,distanceToPoint: function(point) {
		var closestpoint = this.closestPointOnLine(point);
		var tmp;
		var p_0 = -closestpoint[0];
		var p_1 = -closestpoint[1];
		var p_2 = -closestpoint[2];
		tmp = [point[0] + p_0,point[1] + p_1,point[2] + p_2];
		var distancevector = tmp;
		return Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(distancevector,[distancevector[0],distancevector[1],distancevector[2]]));
	}
	,equals: function(line) {
		if(!thx_geom__$Point3D_Point3D_$Impl_$.equals(this.direction,line.direction)) return false;
		return this.distanceToPoint(line.point) <= 1e-8;
	}
	,__class__: thx_geom_Line3D
};
var thx_geom__$Matrix4x4_Matrix4x4_$Impl_$ = {};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.__name__ = ["thx","geom","_Matrix4x4","Matrix4x4_Impl_"];
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.fromArray = function(e) {
	if(e.length != 16) throw "Invalid array length (" + e.length + ") for Matrix4x4, should be 16";
	return [e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.rotationX = function(radians) {
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	return [1,0,0,0,0,cos,sin,0,0,-sin,cos,0,0,0,0,1];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.rotationY = function(radians) {
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	return [cos,0,-sin,0,0,1,0,0,sin,0,cos,0,0,0,0,1];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.rotationZ = function(radians) {
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	return [cos,sin,0,0,-sin,cos,0,0,0,0,1,0,0,0,0,1];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.rotation = function(rotationCenter,rotationAxis,radians) {
	var rotationPlane = thx_geom_Plane.fromNormalAndPoint(rotationAxis,rotationCenter);
	var orthobasis = new thx_geom_OrthoNormalBasis(rotationPlane,thx_geom__$Point3D_Point3D_$Impl_$.randomNonParallelVector(rotationPlane.normal));
	var transformation = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.translation([-rotationCenter[0],-rotationCenter[1],-rotationCenter[2]]);
	transformation = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.multiply(transformation,orthobasis.getProjectionMatrix());
	transformation = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.multiply(transformation,thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.rotationZ(radians));
	transformation = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.multiply(transformation,orthobasis.getInverseProjectionMatrix());
	transformation = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.multiply(transformation,thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.translation(rotationCenter));
	return transformation;
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.translation = function(vec) {
	return [1,0,0,0,0,1,0,0,0,0,1,0,vec[0],vec[1],vec[2],1];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.mirrorX = function() {
	return thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.mirroring(thx_geom_Transformables.MX);
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.mirrorY = function() {
	return thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.mirroring(thx_geom_Transformables.MY);
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.mirrorZ = function() {
	return thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.mirroring(thx_geom_Transformables.MZ);
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.mirroring = function(plane) {
	var nx = plane.normal[0];
	var ny = plane.normal[1];
	var nz = plane.normal[2];
	var w = plane.w;
	return [1.0 - 2.0 * nx * nx,-2. * ny * nx,-2. * nz * nx,0,-2. * nx * ny,1.0 - 2.0 * ny * ny,-2. * nz * ny,0,-2. * nx * nz,-2. * ny * nz,1.0 - 2.0 * nz * nz,0,-2. * nx * w,-2. * ny * w,-2. * nz * w,1];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.scaling = function(vec) {
	return [vec[0],0,0,0,0,vec[1],0,0,0,0,vec[2],0,0,0,0,1];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$._new = function(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15) {
	return [e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.toArray = function(this1) {
	return this1.slice();
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.add = function(this1,other) {
	return [this1[0] + other[0],this1[1] + other[1],this1[2] + other[2],this1[3] + other[3],this1[4] + other[4],this1[5] + other[5],this1[6] + other[6],this1[7] + other[7],this1[8] + other[8],this1[9] + other[9],this1[10] + other[10],this1[11] + other[11],this1[12] + other[12],this1[13] + other[13],this1[14] + other[14],this1[15] + other[15]];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.subtract = function(this1,other) {
	return [this1[0] - other[0],this1[1] - other[1],this1[2] - other[2],this1[3] - other[3],this1[4] - other[4],this1[5] - other[5],this1[6] - other[6],this1[7] - other[7],this1[8] - other[8],this1[9] - other[9],this1[10] - other[10],this1[11] - other[11],this1[12] - other[12],this1[13] - other[13],this1[14] - other[14],this1[15] - other[15]];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.multiply = function(this1,other) {
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
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.rightMultiplyPoint3D = function(this1,vector) {
	var v0 = vector[0];
	var v1 = vector[1];
	var v2 = vector[2];
	var x = v0 * this1[0] + v1 * this1[1] + v2 * this1[2] + this1[3];
	var y = v0 * this1[4] + v1 * this1[5] + v2 * this1[6] + this1[7];
	var z = v0 * this1[8] + v1 * this1[9] + v2 * this1[10] + this1[11];
	var w = v0 * this1[12] + v1 * this1[13] + v2 * this1[14] + this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y,z];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint3D = function(this1,vector) {
	var v0 = vector[0];
	var v1 = vector[1];
	var v2 = vector[2];
	var x = v0 * this1[0] + v1 * this1[4] + v2 * this1[8] + this1[12];
	var y = v0 * this1[1] + v1 * this1[5] + v2 * this1[9] + this1[13];
	var z = v0 * this1[2] + v1 * this1[6] + v2 * this1[10] + this1[14];
	var w = v0 * this1[3] + v1 * this1[7] + v2 * this1[11] + this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y,z];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.rightMultiplyPoint = function(this1,vector) {
	var v0 = vector[0];
	var v1 = vector[1];
	var x = v0 * this1[0] + v1 * this1[1] + 0 * this1[2] + this1[3];
	var y = v0 * this1[4] + v1 * this1[5] + 0 * this1[6] + this1[7];
	var z = v0 * this1[8] + v1 * this1[9] + 0 * this1[10] + this1[11];
	var w = v0 * this1[12] + v1 * this1[13] + 0 * this1[14] + this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint = function(this1,vector) {
	var v0 = vector[0];
	var v1 = vector[1];
	var x = v0 * this1[0] + v1 * this1[4] + 0 * this1[8] + this1[12];
	var y = v0 * this1[1] + v1 * this1[5] + 0 * this1[9] + this1[13];
	var z = v0 * this1[2] + v1 * this1[6] + 0 * this1[10] + this1[14];
	var w = v0 * this1[3] + v1 * this1[7] + 0 * this1[11] + this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
		z *= invw;
	}
	return [x,y];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.isMirroring = function(this1) {
	var u_0 = this1[0];
	var u_1 = this1[4];
	var u_2 = this1[8];
	var v_0 = this1[1];
	var v_1 = this1[5];
	var v_2 = this1[9];
	var w = [this1[2],this1[6],this1[10]];
	var mirrorvalue = thx_geom__$Point3D_Point3D_$Impl_$.dot([u_1 * v_2 - u_2 * v_1,u_2 * v_0 - u_0 * v_2,u_0 * v_1 - u_1 * v_0],w);
	var ismirror = mirrorvalue < 0;
	return ismirror;
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.inverse = function(this1) {
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
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.at = function(this1,index) {
	return this1[index];
};
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.toString = function(this1) {
	return "Matrix(" + this1.join(",") + ")";
};
var thx_geom_Plane = function(normal,w) {
	this.normal = normal;
	this.w = w;
};
thx_geom_Plane.__name__ = ["thx","geom","Plane"];
thx_geom_Plane.fromPoint3Ds = function(a,b,c) {
	var tmp;
	var tmp1;
	var tmp2;
	var p_0 = -a[0];
	var p_1 = -a[1];
	var p_2 = -a[2];
	tmp2 = [b[0] + p_0,b[1] + p_1,b[2] + p_2];
	var this2 = tmp2;
	var tmp3;
	var p_01 = -a[0];
	var p_11 = -a[1];
	var p_21 = -a[2];
	tmp3 = [c[0] + p_01,c[1] + p_11,c[2] + p_21];
	var p = tmp3;
	tmp1 = [this2[1] * p[2] - this2[2] * p[1],this2[2] * p[0] - this2[0] * p[2],this2[0] * p[1] - this2[1] * p[0]];
	var this1 = tmp1;
	var v = Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(this1,[this1[0],this1[1],this1[2]]));
	tmp = [this1[0] / v,this1[1] / v,this1[2] / v];
	var n = tmp;
	return new thx_geom_Plane(n,thx_geom__$Point3D_Point3D_$Impl_$.dot(n,a));
};
thx_geom_Plane.anyPlaneFromPoint3Ds = function(a,b,c) {
	var tmp;
	var p_0 = -a[0];
	var p_1 = -a[1];
	var p_2 = -a[2];
	tmp = [b[0] + p_0,b[1] + p_1,b[2] + p_2];
	var v1 = tmp;
	var tmp1;
	var p_01 = -a[0];
	var p_11 = -a[1];
	var p_21 = -a[2];
	tmp1 = [c[0] + p_01,c[1] + p_11,c[2] + p_21];
	var v2 = tmp1;
	if(Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(v1,[v1[0],v1[1],v1[2]])) < 10e-10) v1 = thx_geom__$Point3D_Point3D_$Impl_$.randomNonParallelVector(v2);
	if(Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(v2,[v2[0],v2[1],v2[2]])) < 10e-10) v2 = thx_geom__$Point3D_Point3D_$Impl_$.randomNonParallelVector(v1);
	var normal = [v1[1] * v2[2] - v1[2] * v2[1],v1[2] * v2[0] - v1[0] * v2[2],v1[0] * v2[1] - v1[1] * v2[0]];
	if(Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(normal,[normal[0],normal[1],normal[2]])) < 10e-10) {
		v2 = thx_geom__$Point3D_Point3D_$Impl_$.randomNonParallelVector(v1);
		normal = [v1[1] * v2[2] - v1[2] * v2[1],v1[2] * v2[0] - v1[0] * v2[2],v1[0] * v2[1] - v1[1] * v2[0]];
	}
	var tmp2;
	var v = Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(normal,[normal[0],normal[1],normal[2]]));
	tmp2 = [normal[0] / v,normal[1] / v,normal[2] / v];
	normal = tmp2;
	return new thx_geom_Plane(normal,thx_geom__$Point3D_Point3D_$Impl_$.dot(normal,a));
};
thx_geom_Plane.fromPoints = function(a,b,c) {
	var tmp;
	var tmp1;
	var tmp2;
	var p_0 = -a[0];
	var p_1 = -a[1];
	var p_2 = -a[2];
	tmp2 = [b[0] + p_0,b[1] + p_1,b[2] + p_2];
	var this2 = tmp2;
	var tmp3;
	var p_01 = -a[0];
	var p_11 = -a[1];
	var p_21 = -a[2];
	tmp3 = [c[0] + p_01,c[1] + p_11,c[2] + p_21];
	var p = tmp3;
	tmp1 = [this2[1] * p[2] - this2[2] * p[1],this2[2] * p[0] - this2[0] * p[2],this2[0] * p[1] - this2[1] * p[0]];
	var this1 = tmp1;
	var v = Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(this1,[this1[0],this1[1],this1[2]]));
	tmp = [this1[0] / v,this1[1] / v,this1[2] / v];
	var n = tmp;
	return new thx_geom_Plane(n,thx_geom__$Point3D_Point3D_$Impl_$.dot(n,a));
};
thx_geom_Plane.fromNormalAndPoint = function(normal,point) {
	var tmp;
	var v = Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(normal,[normal[0],normal[1],normal[2]]));
	tmp = [normal[0] / v,normal[1] / v,normal[2] / v];
	normal = tmp;
	return new thx_geom_Plane(normal,thx_geom__$Point3D_Point3D_$Impl_$.dot(point,normal));
};
thx_geom_Plane.prototype = {
	normal: null
	,w: null
	,flip: function() {
		var tmp;
		var this1 = this.normal;
		tmp = [-this1[0],-this1[1],-this1[2]];
		return new thx_geom_Plane(tmp,-this.w);
	}
	,splitPolygon: function(polygon,coplanarFront,coplanarBack,front,back) {
		var polygonType = 0;
		var types = [];
		var type;
		var f;
		var b;
		var len;
		var j;
		var ti;
		var vi;
		var tj;
		var vj;
		var t;
		var v;
		var $it0 = HxOverrides.iter(polygon.vertices);
		while( $it0.hasNext() ) {
			var vertex = $it0.next();
			t = thx_geom__$Point3D_Point3D_$Impl_$.dot(this.normal,vertex.position) - this.w;
			var tmp;
			if(t < -1e-09) tmp = 2; else if(t > 10e-10) tmp = 1; else tmp = 0;
			type = tmp;
			polygonType |= type;
			types.push(type);
		}
		switch(polygonType) {
		case 0:
			(thx_geom__$Point3D_Point3D_$Impl_$.dot(this.normal,polygon.get_plane().normal) > 0?coplanarFront:coplanarBack).push(polygon);
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
					var tmp1;
					var this1 = vj.position;
					var p = vi.position;
					var p_0 = -p[0];
					var p_1 = -p[1];
					var p_2 = -p[2];
					tmp1 = [this1[0] + p_0,this1[1] + p_1,this1[2] + p_2];
					t = (this.w - thx_geom__$Point3D_Point3D_$Impl_$.dot(this.normal,vi.position)) / thx_geom__$Point3D_Point3D_$Impl_$.dot(this.normal,tmp1);
					v = new thx_geom_Vertex3D(thx_geom__$Point3D_Point3D_$Impl_$.interpolate(vi.position,vj.position,t),thx_geom__$Point3D_Point3D_$Impl_$.interpolate(vi.normal,vj.normal,t));
					f.push(v);
					b.push(v);
				}
			}
			if(f.length >= 3) front.push(new thx_geom_Polygon(f));
			if(b.length >= 3) back.push(new thx_geom_Polygon(b));
			break;
		}
	}
	,equals: function(other) {
		return thx_geom__$Point3D_Point3D_$Impl_$.equals(this.normal,other.normal)?this.w == other.w:false;
	}
	,transform: function(matrix) {
		var ismirror = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.isMirroring(matrix);
		var r = thx_geom__$Point3D_Point3D_$Impl_$.randomNonParallelVector(this.normal);
		var tmp;
		var this1 = this.normal;
		tmp = [this1[1] * r[2] - this1[2] * r[1],this1[2] * r[0] - this1[0] * r[2],this1[0] * r[1] - this1[1] * r[0]];
		var u = tmp;
		var tmp1;
		var this2 = this.normal;
		tmp1 = [this2[1] * u[2] - this2[2] * u[1],this2[2] * u[0] - this2[0] * u[2],this2[0] * u[1] - this2[1] * u[0]];
		var v = tmp1;
		var tmp2;
		var this3 = this.normal;
		var v1 = this.w;
		tmp2 = [this3[0] * v1,this3[1] * v1,this3[2] * v1];
		var point1 = tmp2;
		var point2 = [point1[0] + u[0],point1[1] + u[1],point1[2] + u[2]];
		var point3 = [point1[0] + v[0],point1[1] + v[1],point1[2] + v[2]];
		point1 = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint3D(matrix,[point1[0],point1[1],point1[2]]);
		point2 = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint3D(matrix,[point2[0],point2[1],point2[2]]);
		point3 = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint3D(matrix,[point3[0],point3[1],point3[2]]);
		var newplane = thx_geom_Plane.fromPoint3Ds(point1,point2,point3);
		if(ismirror) newplane = newplane.flip();
		return newplane;
	}
	,splitLineBetweenPoints: function(p1,p2) {
		var tmp;
		var p_0 = -p1[0];
		var p_1 = -p1[1];
		var p_2 = -p1[2];
		tmp = [p2[0] + p_0,p2[1] + p_1,p2[2] + p_2];
		var direction = tmp;
		var lambda = (this.w - thx_geom__$Point3D_Point3D_$Impl_$.dot(this.normal,p1)) / thx_geom__$Point3D_Point3D_$Impl_$.dot(this.normal,direction);
		if(isNaN(lambda)) lambda = 0; else if(lambda > 1) lambda = 1; else if(lambda < 0) lambda = 0;
		var tmp1;
		var p_01 = direction[0] * lambda;
		var p_11 = direction[1] * lambda;
		var p_21 = direction[2] * lambda;
		tmp1 = [p1[0] + p_01,p1[1] + p_11,p1[2] + p_21];
		return tmp1;
	}
	,intersectWithLine: function(line) {
		return line.intersectWithPlane(this);
	}
	,intersectWithPlane: function(plane) {
		return thx_geom_Line3D.fromPlanes(this,plane);
	}
	,signedDistanceToPoint: function(point) {
		return thx_geom__$Point3D_Point3D_$Impl_$.dot(this.normal,point) - this.w;
	}
	,toString: function() {
		var tmp;
		var this1 = this.normal;
		tmp = "Point3D(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
		return "Plane [normal: " + tmp + ", w: " + this.w + "]";
	}
	,mirrorPoint: function(point3d) {
		var distance = this.signedDistanceToPoint(point3d);
		var tmp;
		var tmp1;
		var this1 = this.normal;
		var v = distance * 2.0;
		tmp1 = [this1[0] * v,this1[1] * v,this1[2] * v];
		var p = tmp1;
		var p_0 = -p[0];
		var p_1 = -p[1];
		var p_2 = -p[2];
		tmp = [point3d[0] + p_0,point3d[1] + p_1,point3d[2] + p_2];
		var mirrored = tmp;
		return mirrored;
	}
	,__class__: thx_geom_Plane
};
var thx_geom__$Point3D_Point3D_$Impl_$ = {};
thx_geom__$Point3D_Point3D_$Impl_$.__name__ = ["thx","geom","_Point3D","Point3D_Impl_"];
thx_geom__$Point3D_Point3D_$Impl_$.fromObject = function(o) {
	return [o.x,o.y,o.z];
};
thx_geom__$Point3D_Point3D_$Impl_$.fromArray = function(arr) {
	return [arr[0],arr[1],arr[2]];
};
thx_geom__$Point3D_Point3D_$Impl_$._new = function(x,y,z) {
	return [x,y,z];
};
thx_geom__$Point3D_Point3D_$Impl_$.get_x = function(this1) {
	return this1[0];
};
thx_geom__$Point3D_Point3D_$Impl_$.get_y = function(this1) {
	return this1[1];
};
thx_geom__$Point3D_Point3D_$Impl_$.get_z = function(this1) {
	return this1[2];
};
thx_geom__$Point3D_Point3D_$Impl_$.get_length = function(this1) {
	return Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(this1,[this1[0],this1[1],this1[2]]));
};
thx_geom__$Point3D_Point3D_$Impl_$.get_lengthSquared = function(this1) {
	return thx_geom__$Point3D_Point3D_$Impl_$.dot(this1,[this1[0],this1[1],this1[2]]);
};
thx_geom__$Point3D_Point3D_$Impl_$.get_inst = function(this1) {
	return this1;
};
thx_geom__$Point3D_Point3D_$Impl_$.addPoint3D = function(this1,p) {
	return [this1[0] + p[0],this1[1] + p[1],this1[2] + p[2]];
};
thx_geom__$Point3D_Point3D_$Impl_$.add = function(this1,v) {
	return [this1[0] + v,this1[1] + v,this1[2] + v];
};
thx_geom__$Point3D_Point3D_$Impl_$.negate = function(this1) {
	return [-this1[0],-this1[1],-this1[2]];
};
thx_geom__$Point3D_Point3D_$Impl_$.subtractPoint3D = function(this1,p) {
	var tmp;
	var p_0 = -p[0];
	var p_1 = -p[1];
	var p_2 = -p[2];
	tmp = [this1[0] + p_0,this1[1] + p_1,this1[2] + p_2];
	return tmp;
};
thx_geom__$Point3D_Point3D_$Impl_$.subtract = function(this1,v) {
	var tmp;
	var v1 = -v;
	tmp = [this1[0] + v1,this1[1] + v1,this1[2] + v1];
	return tmp;
};
thx_geom__$Point3D_Point3D_$Impl_$.multiplyPoint3D = function(this1,p) {
	return [this1[0] * p[0],this1[1] * p[1],this1[2] * p[2]];
};
thx_geom__$Point3D_Point3D_$Impl_$.multiply = function(this1,v) {
	return [this1[0] * v,this1[1] * v,this1[2] * v];
};
thx_geom__$Point3D_Point3D_$Impl_$.dividePoint3D = function(this1,p) {
	return [this1[0] / p[0],this1[1] / p[1],this1[2] / p[2]];
};
thx_geom__$Point3D_Point3D_$Impl_$.divide = function(this1,v) {
	return [this1[0] / v,this1[1] / v,this1[2] / v];
};
thx_geom__$Point3D_Point3D_$Impl_$.equals = function(this1,p) {
	return (this1[0] == p[0]?this1[1] == p[1]:false)?this1[2] == p[2]:false;
};
thx_geom__$Point3D_Point3D_$Impl_$.notEquals = function(this1,p) {
	return !thx_geom__$Point3D_Point3D_$Impl_$.equals(this1,p);
};
thx_geom__$Point3D_Point3D_$Impl_$.abs = function(this1) {
	var tmp;
	var x = Math.abs(this1[0]);
	var y = Math.abs(this1[1]);
	var z = Math.abs(this1[2]);
	tmp = [x,y,z];
	return tmp;
};
thx_geom__$Point3D_Point3D_$Impl_$.nearEquals = function(this1,p) {
	return (Math.abs(this1[0] - p[0]) <= 10e-10?Math.abs(this1[1] - p[1]) <= 10e-10:false)?Math.abs(this1[2] - p[2]) <= 10e-10:false;
};
thx_geom__$Point3D_Point3D_$Impl_$.interpolate = function(this1,p,f) {
	var tmp;
	var tmp1;
	var tmp2;
	var p_0 = this1[0];
	var p_1 = this1[1];
	var p_2 = this1[2];
	var p_01 = -p_0;
	var p_11 = -p_1;
	var p_21 = -p_2;
	tmp2 = [p[0] + p_01,p[1] + p_11,p[2] + p_21];
	var this2 = tmp2;
	tmp1 = [this2[0] * f,this2[1] * f,this2[2] * f];
	var p1 = tmp1;
	tmp = [this1[0] + p1[0],this1[1] + p1[1],this1[2] + p1[2]];
	return tmp;
};
thx_geom__$Point3D_Point3D_$Impl_$.isZero = function(this1) {
	return thx_geom__$Point3D_Point3D_$Impl_$.equals(this1,thx_geom__$Point3D_Point3D_$Impl_$.zero);
};
thx_geom__$Point3D_Point3D_$Impl_$.isNearZero = function(this1) {
	return thx_geom__$Point3D_Point3D_$Impl_$.nearEquals(this1,thx_geom__$Point3D_Point3D_$Impl_$.zero);
};
thx_geom__$Point3D_Point3D_$Impl_$.dot = function(this1,prod) {
	return this1[0] * prod[0] + this1[1] * prod[1] + this1[2] * prod[2];
};
thx_geom__$Point3D_Point3D_$Impl_$.normalize = function(this1) {
	var tmp;
	var v = Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(this1,[this1[0],this1[1],this1[2]]));
	tmp = [this1[0] / v,this1[1] / v,this1[2] / v];
	return tmp;
};
thx_geom__$Point3D_Point3D_$Impl_$.distanceTo = function(this1,p) {
	var tmp;
	var tmp1;
	var p_0 = -p[0];
	var p_1 = -p[1];
	var p_2 = -p[2];
	tmp1 = [this1[0] + p_0,this1[1] + p_1,this1[2] + p_2];
	var this2 = tmp1;
	tmp = Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(this2,[this2[0],this2[1],this2[2]]));
	return tmp;
};
thx_geom__$Point3D_Point3D_$Impl_$.distanceToSquared = function(this1,p) {
	var tmp;
	var tmp1;
	var p_0 = -p[0];
	var p_1 = -p[1];
	var p_2 = -p[2];
	tmp1 = [this1[0] + p_0,this1[1] + p_1,this1[2] + p_2];
	var this2 = tmp1;
	tmp = thx_geom__$Point3D_Point3D_$Impl_$.dot(this2,[this2[0],this2[1],this2[2]]);
	return tmp;
};
thx_geom__$Point3D_Point3D_$Impl_$.multiply4x4 = function(this1,matrix4x4) {
	return thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint3D(matrix4x4,[this1[0],this1[1],this1[2]]);
};
thx_geom__$Point3D_Point3D_$Impl_$.transform = function(this1,matrix4x4) {
	return thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint3D(matrix4x4,[this1[0],this1[1],this1[2]]);
};
thx_geom__$Point3D_Point3D_$Impl_$.randomNonParallelVector = function(this1) {
	var a = thx_geom__$Point3D_Point3D_$Impl_$.abs(this1);
	if(a[0] <= a[1]?a[0] <= a[2]:false) return [1,0,0]; else if(a[1] <= a[0]?a[1] <= a[2]:false) return [0,1,0]; else return [0,0,1];
};
thx_geom__$Point3D_Point3D_$Impl_$.cross = function(this1,p) {
	return [this1[1] * p[2] - this1[2] * p[1],this1[2] * p[0] - this1[0] * p[2],this1[0] * p[1] - this1[1] * p[0]];
};
thx_geom__$Point3D_Point3D_$Impl_$.min = function(this1,p) {
	var tmp;
	var x = Math.min(this1[0],p[0]);
	var y = Math.min(this1[1],p[1]);
	var z = Math.min(this1[2],p[2]);
	tmp = [x,y,z];
	return tmp;
};
thx_geom__$Point3D_Point3D_$Impl_$.max = function(this1,p) {
	var tmp;
	var x = Math.max(this1[0],p[0]);
	var y = Math.max(this1[1],p[1]);
	var z = Math.max(this1[2],p[2]);
	tmp = [x,y,z];
	return tmp;
};
thx_geom__$Point3D_Point3D_$Impl_$.toArray = function(this1) {
	return this1.slice();
};
thx_geom__$Point3D_Point3D_$Impl_$.toObject = function(this1) {
	return { x : this1[0], y : this1[1], z : this1[2]};
};
thx_geom__$Point3D_Point3D_$Impl_$.toString = function(this1) {
	return "Point3D(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
var thx_geom_OrthoNormalBasis = function(plane,rightvector) {
	var tmp;
	var tmp3;
	var this2 = plane.normal;
	tmp3 = [this2[1] * rightvector[2] - this2[2] * rightvector[1],this2[2] * rightvector[0] - this2[0] * rightvector[2],this2[0] * rightvector[1] - this2[1] * rightvector[0]];
	var this1 = tmp3;
	var v = Math.sqrt(thx_geom__$Point3D_Point3D_$Impl_$.dot(this1,[this1[0],this1[1],this1[2]]));
	tmp = [this1[0] / v,this1[1] / v,this1[2] / v];
	this.v = tmp;
	var tmp1;
	var this3 = this.v;
	var p = plane.normal;
	tmp1 = [this3[1] * p[2] - this3[2] * p[1],this3[2] * p[0] - this3[0] * p[2],this3[0] * p[1] - this3[1] * p[0]];
	this.u = tmp1;
	this.plane = plane;
	var tmp2;
	var this4 = plane.normal;
	var v1 = plane.w;
	tmp2 = [this4[0] * v1,this4[1] * v1,this4[2] * v1];
	this.planeOrigin = tmp2;
};
thx_geom_OrthoNormalBasis.__name__ = ["thx","geom","OrthoNormalBasis"];
thx_geom_OrthoNormalBasis.fromPlane = function(plane) {
	return new thx_geom_OrthoNormalBasis(plane,thx_geom__$Point3D_Point3D_$Impl_$.randomNonParallelVector(plane.normal));
};
thx_geom_OrthoNormalBasis.prototype = {
	v: null
	,u: null
	,plane: null
	,planeOrigin: null
	,getProjectionMatrix: function() {
		return [this.u[0],this.v[0],this.plane.normal[0],0,this.u[1],this.v[1],this.plane.normal[1],0,this.u[2],this.v[2],this.plane.normal[2],0,0,0,-this.plane.w,1];
	}
	,getInverseProjectionMatrix: function() {
		var tmp;
		var this1 = this.plane.normal;
		var v = this.plane.w;
		tmp = [this1[0] * v,this1[1] * v,this1[2] * v];
		var p = tmp;
		return [this.u[0],this.u[1],this.u[2],0,this.v[0],this.v[1],this.v[2],0,this.plane.normal[0],this.plane.normal[1],this.plane.normal[2],0,p[0],p[1],p[2],1];
	}
	,to2D: function(vec3) {
		var tmp;
		var x = thx_geom__$Point3D_Point3D_$Impl_$.dot(vec3,this.u);
		var y = thx_geom__$Point3D_Point3D_$Impl_$.dot(vec3,this.v);
		tmp = [x,y];
		return tmp;
	}
	,to3D: function(vec2) {
		var tmp;
		var tmp1;
		var this2 = this.planeOrigin;
		var tmp3;
		var this3 = this.u;
		var v = vec2[0];
		tmp3 = [this3[0] * v,this3[1] * v,this3[2] * v];
		var p1 = tmp3;
		tmp1 = [this2[0] + p1[0],this2[1] + p1[1],this2[2] + p1[2]];
		var this1 = tmp1;
		var tmp2;
		var this4 = this.v;
		var v1 = vec2[1];
		tmp2 = [this4[0] * v1,this4[1] * v1,this4[2] * v1];
		var p = tmp2;
		tmp = [this1[0] + p[0],this1[1] + p[1],this1[2] + p[2]];
		return tmp;
	}
	,line3Dto2D: function(line) {
		var tmp;
		var this1 = line.direction;
		var p = line.point;
		tmp = [this1[0] + p[0],this1[1] + p[1],this1[2] + p[2]];
		return thx_geom_Line.fromPoints(this.to2D(line.point),this.to2D(tmp));
	}
	,line2Dto3D: function(line) {
		var a = line.origin();
		var tmp;
		var this1 = line.direction();
		tmp = [this1[0] + a[0],this1[1] + a[1]];
		var b = tmp;
		return thx_geom_Line3D.fromPoints(this.to3D(a),this.to3D(b));
	}
	,transform: function(matrix) {
		var newplane = this.plane.transform(matrix);
		var tmp;
		var this1 = this.u;
		tmp = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint3D(matrix,[this1[0],this1[1],this1[2]]);
		var rightpoint_transformed = tmp;
		var tmp1;
		tmp1 = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint3D(matrix,[0,0,0]);
		var origin_transformed = tmp1;
		var tmp2;
		var p_0 = -origin_transformed[0];
		var p_1 = -origin_transformed[1];
		var p_2 = -origin_transformed[2];
		tmp2 = [rightpoint_transformed[0] + p_0,rightpoint_transformed[1] + p_1,rightpoint_transformed[2] + p_2];
		var newrighthandvector = tmp2;
		var newbasis = new thx_geom_OrthoNormalBasis(newplane,newrighthandvector);
		return newbasis;
	}
	,__class__: thx_geom_OrthoNormalBasis
};
var thx_geom_Path = function(splines) {
	this._isSelfIntersecting = false;
	this._length = false;
	this._area = false;
	this._isClosed = false;
	this.splines = splines;
};
thx_geom_Path.__name__ = ["thx","geom","Path"];
thx_geom_Path.prototype = {
	area: null
	,length: null
	,isSelfIntersecting: null
	,isClosed: null
	,box: null
	,splines: null
	,contains: function(p) {
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
		var result = [];
		var _g = 0;
		var _g1 = this.splines;
		while(_g < _g1.length) {
			var spline = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = other.splines;
			while(_g2 < _g3.length) {
				var ospline = _g3[_g2];
				++_g2;
				result = result.concat(spline.union(ospline));
			}
		}
		if(result.length == 0) result = this.splines;
		return new thx_geom_Path(result);
	}
	,difference: function(other) {
		var result = [];
		var _g = 0;
		var _g1 = this.splines;
		while(_g < _g1.length) {
			var spline = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = other.splines;
			while(_g2 < _g3.length) {
				var ospline = _g3[_g2];
				++_g2;
				result = result.concat(spline.difference(ospline));
			}
		}
		if(result.length == 0) result = this.splines;
		return new thx_geom_Path(result);
	}
	,intersection: function(other) {
		var result = [];
		var _g = 0;
		var _g1 = this.splines;
		while(_g < _g1.length) {
			var spline = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = other.splines;
			while(_g2 < _g3.length) {
				var ospline = _g3[_g2];
				++_g2;
				result = result.concat(spline.intersection(ospline));
			}
		}
		if(result.length == 0) result = this.splines;
		return new thx_geom_Path(result);
	}
	,intersections: function(other) {
		throw "not implemented";
	}
	,transform: function(matrix) {
		return new thx_geom_Path(this.splines.map(function(spline) {
			return spline.transform(matrix);
		}));
	}
	,flip: function() {
		var s = this.splines.map(function(spline) {
			return spline.flip();
		});
		s.reverse();
		return new thx_geom_Path(s);
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
		var tmp;
		var array = this.splines.map(function(spline) {
			return spline.intersectionsPath(other);
		});
		tmp = Array.prototype.concat.apply([],array);
		return tmp;
	}
	,intersectionsSpline: function(other) {
		var tmp;
		var array = this.splines.map(function(spline) {
			return spline.intersectionsSpline(other);
		});
		tmp = Array.prototype.concat.apply([],array);
		return tmp;
	}
	,intersectionsLine: function(line) {
		var tmp;
		var array = this.splines.map(function(spline) {
			return spline.intersectionsLine(line);
		});
		tmp = Array.prototype.concat.apply([],array);
		return tmp;
	}
	,iterator: function() {
		return HxOverrides.iter(this.splines);
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
				return [new thx_geom_Path(this.splines.slice(0,i).concat([n[0]])),new thx_geom_Path([n[1]].concat(this.splines.slice(i)))];
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
		return new thx_geom_Path(this.splines.map(function(spline) {
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
		return new thx_geom_Path(this.splines.map(function(spline) {
			return spline.reduce();
		}).filter(function(spline1) {
			return spline1.get_edges().length > 0;
		}));
	}
	,toPoints: function() {
		var tmp;
		var array = this.splines.map(function(spline) {
			return spline.toPoints();
		});
		tmp = Array.prototype.concat.apply([],array);
		return tmp;
	}
	,toString: function() {
		return "Path(" + this.splines.map(function(s) {
			return "[" + s.toString() + "]";
		}).join(", ") + "," + Std.string(this.get_isClosed()) + ")";
	}
	,_isClosed: null
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
	,_area: null
	,get_area: function() {
		if(!this._area) {
			this._area = true;
			this.area = this.splines.reduce(function(acc,spline) {
				return acc + spline.get_area();
			},0);
		}
		return this.area;
	}
	,_length: null
	,get_length: function() {
		if(!this._length) {
			this._length = true;
			this.length = this.splines.reduce(function(acc,spline) {
				return acc + spline.get_length();
			},0);
		}
		return this.length;
	}
	,_isSelfIntersecting: null
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
				this.box = thx_geom_shape__$Box_Box_$Impl_$.expandByPoints(this.box,[obox[0],obox[1]]);
			}
		}
		return this.box;
	}
	,__class__: thx_geom_Path
};
var thx_geom__$Point_Point_$Impl_$ = {};
thx_geom__$Point_Point_$Impl_$.__name__ = ["thx","geom","_Point","Point_Impl_"];
thx_geom__$Point_Point_$Impl_$.fromObject = function(o) {
	return [o.x,o.y];
};
thx_geom__$Point_Point_$Impl_$.fromArray = function(arr) {
	return [arr[0],arr[1]];
};
thx_geom__$Point_Point_$Impl_$.fromAngle = function(angle) {
	var tmp;
	var x = Math.cos(angle);
	var y = Math.sin(angle);
	tmp = [x,y];
	return tmp;
};
thx_geom__$Point_Point_$Impl_$._new = function(x,y) {
	return [x,y];
};
thx_geom__$Point_Point_$Impl_$.get_x = function(this1) {
	return this1[0];
};
thx_geom__$Point_Point_$Impl_$.get_y = function(this1) {
	return this1[1];
};
thx_geom__$Point_Point_$Impl_$.get_length = function(this1) {
	return Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1]);
};
thx_geom__$Point_Point_$Impl_$.get_lengthSquared = function(this1) {
	return this1[0] * this1[0] + this1[1] * this1[1];
};
thx_geom__$Point_Point_$Impl_$.get_inst = function(this1) {
	return this1;
};
thx_geom__$Point_Point_$Impl_$.addPoint = function(this1,p) {
	return [this1[0] + p[0],this1[1] + p[1]];
};
thx_geom__$Point_Point_$Impl_$.add = function(this1,v) {
	return [this1[0] + v,this1[1] + v];
};
thx_geom__$Point_Point_$Impl_$.negate = function(this1) {
	return [-this1[0],-this1[1]];
};
thx_geom__$Point_Point_$Impl_$.subtractPoint = function(this1,p) {
	var tmp;
	var p_0 = -p[0];
	var p_1 = -p[1];
	tmp = [this1[0] + p_0,this1[1] + p_1];
	return tmp;
};
thx_geom__$Point_Point_$Impl_$.subtract = function(this1,v) {
	var tmp;
	var v1 = -v;
	tmp = [this1[0] + v1,this1[1] + v1];
	return tmp;
};
thx_geom__$Point_Point_$Impl_$.multiplyPoint = function(this1,p) {
	return [this1[0] * p[0],this1[1] * p[1]];
};
thx_geom__$Point_Point_$Impl_$.multiply = function(this1,v) {
	return [this1[0] * v,this1[1] * v];
};
thx_geom__$Point_Point_$Impl_$.dividePoint = function(this1,p) {
	return [this1[0] / p[0],this1[1] / p[1]];
};
thx_geom__$Point_Point_$Impl_$.divide = function(this1,v) {
	return [this1[0] / v,this1[1] / v];
};
thx_geom__$Point_Point_$Impl_$.equals = function(this1,p) {
	return this1[0] == p[0]?this1[1] == p[1]:false;
};
thx_geom__$Point_Point_$Impl_$.notEquals = function(this1,p) {
	return !(this1[0] == p[0]?this1[1] == p[1]:false);
};
thx_geom__$Point_Point_$Impl_$.abs = function(this1) {
	var tmp;
	var x = Math.abs(this1[0]);
	var y = Math.abs(this1[1]);
	tmp = [x,y];
	return tmp;
};
thx_geom__$Point_Point_$Impl_$.nearEquals = function(this1,p) {
	return Math.abs(this1[0] - p[0]) <= 10e-10?Math.abs(this1[1] - p[1]) <= 10e-10:false;
};
thx_geom__$Point_Point_$Impl_$.interpolate = function(this1,p,f) {
	var tmp;
	var tmp1;
	var tmp2;
	var p2 = this1;
	var p_0 = -p2[0];
	var p_1 = -p2[1];
	tmp2 = [p[0] + p_0,p[1] + p_1];
	var this2 = tmp2;
	tmp1 = [this2[0] * f,this2[1] * f];
	var p1 = tmp1;
	tmp = [this1[0] + p1[0],this1[1] + p1[1]];
	return tmp;
};
thx_geom__$Point_Point_$Impl_$.isZero = function(this1) {
	var tmp;
	var p = thx_geom__$Point_Point_$Impl_$.zero;
	if(this1[0] == p[0]) tmp = this1[1] == p[1]; else tmp = false;
	return tmp;
};
thx_geom__$Point_Point_$Impl_$.isNearZero = function(this1) {
	return thx_geom__$Point_Point_$Impl_$.nearEquals(this1,thx_geom__$Point_Point_$Impl_$.zero);
};
thx_geom__$Point_Point_$Impl_$.dot = function(this1,p) {
	return this1[0] * p[0] + this1[1] * p[1];
};
thx_geom__$Point_Point_$Impl_$.normal = function(this1) {
	return [this1[1],-this1[0]];
};
thx_geom__$Point_Point_$Impl_$.normalize = function(this1) {
	var tmp;
	var v = Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1]);
	tmp = [this1[0] / v,this1[1] / v];
	return tmp;
};
thx_geom__$Point_Point_$Impl_$.distanceTo = function(this1,p) {
	var tmp;
	var tmp1;
	var p_0 = -p[0];
	var p_1 = -p[1];
	tmp1 = [this1[0] + p_0,this1[1] + p_1];
	var this2 = tmp1;
	tmp = Math.sqrt(this2[0] * this2[0] + this2[1] * this2[1]);
	return Math.abs(tmp);
};
thx_geom__$Point_Point_$Impl_$.distanceToSquared = function(this1,p) {
	var tmp;
	var tmp1;
	var p_0 = -p[0];
	var p_1 = -p[1];
	tmp1 = [this1[0] + p_0,this1[1] + p_1];
	var this2 = tmp1;
	tmp = this2[0] * this2[0] + this2[1] * this2[1];
	return tmp;
};
thx_geom__$Point_Point_$Impl_$.transform = function(this1,matrix) {
	return thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this1);
};
thx_geom__$Point_Point_$Impl_$.cross = function(this1,p) {
	return this1[0] * p[1] - this1[1] * p[0];
};
thx_geom__$Point_Point_$Impl_$.min = function(this1,p) {
	var tmp;
	var x = Math.min(this1[0],p[0]);
	var y = Math.min(this1[1],p[1]);
	tmp = [x,y];
	return tmp;
};
thx_geom__$Point_Point_$Impl_$.max = function(this1,p) {
	var tmp;
	var x = Math.max(this1[0],p[0]);
	var y = Math.max(this1[1],p[1]);
	tmp = [x,y];
	return tmp;
};
thx_geom__$Point_Point_$Impl_$.pointAt = function(this1,angle,distance) {
	var tmp;
	var this2 = this1;
	var tmp1;
	var tmp2;
	var x = Math.cos(angle);
	var y = Math.sin(angle);
	tmp2 = [x,y];
	var this3 = tmp2;
	tmp1 = [this3[0] * distance,this3[1] * distance];
	var p = tmp1;
	tmp = [this2[0] + p[0],this2[1] + p[1]];
	return tmp;
};
thx_geom__$Point_Point_$Impl_$.isOnLine = function(this1,line) {
	if(line.get_isHorizontal()) return Math.abs(this1[1] - line.w) <= 10e-10;
	var tmp;
	var a = line.xAtY(this1[1]);
	tmp = Math.abs(a - this1[0]) <= 10e-10;
	return tmp;
};
thx_geom__$Point_Point_$Impl_$.toAngle = function(this1) {
	return Math.atan2(this1[1],this1[0]);
};
thx_geom__$Point_Point_$Impl_$.toArray = function(this1) {
	return this1.slice();
};
thx_geom__$Point_Point_$Impl_$.toObject = function(this1) {
	return { x : this1[0], y : this1[1]};
};
thx_geom__$Point_Point_$Impl_$.toString = function(this1) {
	return "Point(" + this1[0] + "," + this1[1] + ")";
};
thx_geom__$Point_Point_$Impl_$.solve2Linear = function(a,b,c,d,u,v) {
	var det = a * d - b * c;
	if(det == 0) return null;
	var invdet = 1.0 / det;
	var x = u * d - b * v;
	var y = -u * c + a * v;
	return [x * invdet,y * invdet];
};
thx_geom__$Point_Point_$Impl_$.interpolateBetween2DPointsForY = function(p1,p2,y) {
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
var thx_geom_Polygon = function(vertices) {
	this.vertices = vertices;
};
thx_geom_Polygon.__name__ = ["thx","geom","Polygon"];
thx_geom_Polygon.fromVertices = function(vertices) {
	if((vertices instanceof Array)?vertices.__enum__ == null:false) return new thx_geom_Polygon(vertices.copy()); else {
		var tmp;
		var _g = [];
		var $it0 = $iterator(vertices)();
		while( $it0.hasNext() ) {
			var v = $it0.next();
			_g.push(v);
		}
		tmp = _g;
		return new thx_geom_Polygon(tmp);
	}
};
thx_geom_Polygon.prototype = {
	plane: null
	,vertices: null
	,flip: function() {
		var reverse = this.vertices.slice();
		reverse.reverse();
		return new thx_geom_Polygon(reverse.map(function(v) {
			var tmp;
			var this1 = v.normal;
			tmp = [-this1[0],-this1[1],-this1[2]];
			return new thx_geom_Vertex3D(v.position,tmp);
		}));
	}
	,iterator: function() {
		return HxOverrides.iter(this.vertices);
	}
	,all: function() {
		return this.vertices.slice();
	}
	,get_plane: function() {
		return null == this.plane?this.plane = thx_geom_Plane.fromPoints(this.vertices[0].position,this.vertices[1].position,this.vertices[2].position):this.plane;
	}
	,__class__: thx_geom_Polygon
};
var thx_geom_Spline = function(nodes,closed) {
	if(closed == null) closed = true;
	this._isSelfIntersecting = false;
	this._length = false;
	this._area = false;
	this._isClockwise = false;
	this.nodes = nodes;
	this.isClosed = closed;
};
thx_geom_Spline.__name__ = ["thx","geom","Spline"];
thx_geom_Spline.fromEdges = function(arr,closed) {
	var nodes = [];
	if(arr.length > 0) {
		var edge = arr[0];
		var prev = closed?arr[arr.length - 1]:new thx_geom_EdgeLinear(thx_geom__$Point_Point_$Impl_$.zero,thx_geom__$Point_Point_$Impl_$.zero);
		if(arr.length == 1) {
			nodes.push(new thx_geom_SplineNode(edge.first,edge.normalOut,null));
			nodes.push(new thx_geom_SplineNode(edge.last,null,edge.normalIn));
		} else {
			var _g1 = 0;
			var _g = arr.length;
			while(_g1 < _g) {
				var i = _g1++;
				edge = arr[i];
				nodes.push(new thx_geom_SplineNode(edge.first,edge.normalOut,prev.normalIn));
				prev = edge;
			}
			if(!closed) nodes.push(new thx_geom_SplineNode(edge.last,null,edge.normalIn));
		}
	}
	var spline = new thx_geom_Spline(nodes,closed);
	spline.edges = arr;
	return spline;
};
thx_geom_Spline.fromPoints = function(arr,closed) {
	var nodes = arr.map(function(c) {
		return new thx_geom_SplineNode(c[0],c[1],c[2]);
	});
	return new thx_geom_Spline(nodes,closed);
};
thx_geom_Spline.fromArray = function(arr,closed) {
	var nodes = arr.map(function(c) {
		return new thx_geom_SplineNode(c,null,null);
	});
	return new thx_geom_Spline(nodes,closed);
};
thx_geom_Spline.fromCoords = function(arr,closed) {
	var nodes = arr.map(function(c) {
		var p = [c[0],c[1]];
		var nout = null == c[2]?thx_geom__$Point_Point_$Impl_$.zero:[c[2],c[3]];
		var nin = null == c[4]?thx_geom__$Point_Point_$Impl_$.zero:[c[4],c[5]];
		return new thx_geom_SplineNode(p,nout,nin);
	});
	return new thx_geom_Spline(nodes,closed);
};
thx_geom_Spline.createEdge = function(a,b,nout,nin) {
	if(null == nout?null == nin:false) return new thx_geom_EdgeLinear(a,b); else if(null == nout) return new thx_geom_EdgeCubic(a,a,nin,b); else if(null == nin) return new thx_geom_EdgeCubic(a,nout,b,b); else return new thx_geom_EdgeCubic(a,nout,nin,b);
};
thx_geom_Spline.prototype = {
	area: null
	,length: null
	,isSelfIntersecting: null
	,isPolygon: null
	,isEmpty: null
	,isClockwise: null
	,box: null
	,edges: null
	,nodes: null
	,isClosed: null
	,iterator: function() {
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
				_g.get_edges().push(thx_geom_Spline.createEdge(a,b,nout,nin));
			});
		}
		return this.edges;
	}
	,transform: function(matrix) {
		var ismirror = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.isMirroring(matrix);
		var result = new thx_geom_Spline(thx_core_Iterators.map(this.iterator(),function(node) {
			return node.transform(matrix);
		}),this.isClosed);
		if(ismirror) result = result.flip();
		return result;
	}
	,flip: function() {
		var arr = thx_core_Iterators.map(this.iterator(),function(node) {
			return node.flip();
		});
		arr.reverse();
		return new thx_geom_Spline(arr,this.isClosed);
	}
	,contains: function(p) {
		throw "not implemented";
	}
	,selfIntersections: function() {
		var intersections = [];
		thx_core_Arrays.eachPair(this.get_edges(),function(a,b) {
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
		var tmp;
		var array1 = this.get_edges().map(function(a) {
			var tmp1;
			var array = other.get_edges().map(function(b) {
				return a.intersections(b);
			});
			tmp1 = Array.prototype.concat.apply([],array);
			return tmp1;
		});
		tmp = Array.prototype.concat.apply([],array1);
		return tmp;
	}
	,intersectionsLine: function(line) {
		var tmp;
		var array = this.get_edges().map(function(edge) {
			return edge.intersectionsLine(line);
		});
		tmp = Array.prototype.concat.apply([],array);
		return tmp;
	}
	,split: function(value) {
		if(!(value < 0)?value > 1:true) return null;
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
				return [thx_geom_Spline.fromEdges(edges.slice(0,i).concat([n[0]]),this.isClosed),thx_geom_Spline.fromEdges([n[1]].concat(edges.slice(i + 1)),this.isClosed)];
			}
			value -= nor;
		}
		return [];
	}
	,interpolate: function(value) {
		if(!(value < 0)?value > 1:true) return null;
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
		return thx_geom_Spline.fromEdges(result,this.isClosed);
	}
	,_isClockwise: null
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
		var tmp;
		var array = this.get_edges().map(function(edge) {
			return edge.get_linearSegments();
		});
		tmp = Array.prototype.concat.apply([],array);
		var edges = tmp;
		return thx_geom_Spline.fromEdges(edges,this.isClosed);
	}
	,union: function(other) {
		return thx_geom_bool_Polygon.fromSpline(this.toLinear()).union(thx_geom_bool_Polygon.fromSpline(other.toLinear())).map(function(_) {
			return _.toSpline();
		});
	}
	,difference: function(other) {
		return thx_geom_bool_Polygon.fromSpline(this.toLinear()).difference(thx_geom_bool_Polygon.fromSpline(other.toLinear())).map(function(_) {
			return _.toSpline();
		});
	}
	,intersection: function(other) {
		return thx_geom_bool_Polygon.fromSpline(this.toLinear()).intersection(thx_geom_bool_Polygon.fromSpline(other.toLinear())).map(function(_) {
			return _.toSpline();
		});
	}
	,intersections: function(other) {
		throw "not implemented";
	}
	,toPath: function() {
		return new thx_geom_Path([this]);
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
	,_area: null
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
	,_length: null
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
	,_isSelfIntersecting: null
	,get_isSelfIntersecting: function() {
		var _g = this;
		if(!this._isSelfIntersecting) {
			this._isSelfIntersecting = true;
			var edges = this.get_edges();
			this.isSelfIntersecting = false;
			thx_core_Arrays.eachPair(edges,function(a,b) {
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
			var tmp;
			var this1 = node.normalIn;
			var tmp2;
			if(this1[0] == null[0]) tmp2 = this1[1] == null[1]; else tmp2 = false;
			tmp = !tmp2;
			var tmp1;
			if(!tmp) {
				var this2 = node.normalOut;
				var tmp3;
				if(this2[0] == null[0]) tmp3 = this2[1] == null[1]; else tmp3 = false;
				tmp1 = !tmp3;
			} else tmp1 = true;
			if(tmp1) return false;
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
					_g.box = thx_geom_shape__$Box_Box_$Impl_$.expandByPoints(_g.get_box(),[a,b,nout,nin]);
				});
			}
		}
		return this.box;
	}
	,__class__: thx_geom_Spline
};
var thx_geom_SplineNode = function(position,normalout,normalin) {
	this.position = position;
	this.normalOut = (!(null == normalout)?thx_geom__$Point_Point_$Impl_$.nearEquals(normalout,position):true)?null:normalout;
	this.normalIn = (!(null == normalin)?thx_geom__$Point_Point_$Impl_$.nearEquals(normalin,position):true)?null:normalin;
};
thx_geom_SplineNode.__name__ = ["thx","geom","SplineNode"];
thx_geom_SplineNode.prototype = {
	position: null
	,normalIn: null
	,normalOut: null
	,transform: function(matrix) {
		return new thx_geom_SplineNode(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this.position),null != this.normalOut?thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this.normalOut):null,null != this.normalIn?thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this.normalIn):null);
	}
	,flip: function() {
		return new thx_geom_SplineNode(this.position,this.normalIn,this.normalOut);
	}
	,toStringValues: function() {
		var nout = null == this.normalOut?"null":"" + this.normalOut[1] + "," + this.normalOut[1];
		var nin = null == this.normalIn?"null":"" + this.normalIn[1] + "," + this.normalIn[1];
		return "" + this.position[0] + "," + this.position[1] + "," + nout + "," + nin;
	}
	,toString: function() {
		return "SplineNode(" + this.toStringValues() + ")";
	}
	,__class__: thx_geom_SplineNode
};
var thx_geom_Transformables = function() { };
thx_geom_Transformables.__name__ = ["thx","geom","Transformables"];
thx_geom_Transformables.mirror = function(t,plane) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.mirroring(plane));
};
thx_geom_Transformables.mirrorX = function(t) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.mirroring(thx_geom_Transformables.MX));
};
thx_geom_Transformables.mirrorY = function(t) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.mirroring(thx_geom_Transformables.MY));
};
thx_geom_Transformables.mirrorZ = function(t) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.mirroring(thx_geom_Transformables.MZ));
};
thx_geom_Transformables.translate = function(t,v) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.translation(v));
};
thx_geom_Transformables.translateX = function(t,x) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.translation([x,0,0]));
};
thx_geom_Transformables.translateY = function(t,y) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.translation([0,y,0]));
};
thx_geom_Transformables.translateZ = function(t,z) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.translation([0,0,z]));
};
thx_geom_Transformables.scale = function(t,f) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.scaling(f));
};
thx_geom_Transformables.rotateX = function(t,angle) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.rotationX(angle));
};
thx_geom_Transformables.rotateY = function(t,angle) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.rotationY(angle));
};
thx_geom_Transformables.rotateZ = function(t,angle) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.rotationZ(angle));
};
thx_geom_Transformables.rotateOnAxis = function(t,center,axis,angle) {
	return t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.rotation(center,axis,angle));
};
var thx_geom_Vertex3D = function(position,normal) {
	this.position = position;
	this.normal = normal;
};
thx_geom_Vertex3D.__name__ = ["thx","geom","Vertex3D"];
thx_geom_Vertex3D.prototype = {
	position: null
	,normal: null
	,flip: function() {
		var tmp;
		var this1 = this.normal;
		tmp = [-this1[0],-this1[1],-this1[2]];
		return new thx_geom_Vertex3D(this.position,tmp);
	}
	,interpolate: function(other,t) {
		return new thx_geom_Vertex3D(thx_geom__$Point3D_Point3D_$Impl_$.interpolate(this.position,other.position,t),thx_geom__$Point3D_Point3D_$Impl_$.interpolate(this.normal,other.normal,t));
	}
	,transform: function(matrix) {
		var tmp;
		var this1 = this.position;
		tmp = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint3D(matrix,[this1[0],this1[1],this1[2]]);
		var tmp1;
		var this2 = this.normal;
		tmp1 = thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint3D(matrix,[this2[0],this2[1],this2[2]]);
		return new thx_geom_Vertex3D(tmp,tmp1);
	}
	,toString: function() {
		var tmp;
		var this1 = this.position;
		tmp = "Point3D(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
		var tmp1;
		var this2 = this.normal;
		tmp1 = "Point3D(" + this2[0] + "," + this2[1] + "," + this2[2] + ")";
		return "Vertex3D " + tmp + ", " + tmp1;
	}
	,__class__: thx_geom_Vertex3D
};
var thx_geom_bool_Polygon = function(points) {
	this.vertices = 0;
	var _g = this;
	if(null != points) thx_core_Iterators.map($iterator(points)(),function(_) {
		return _g.add(new thx_geom_bool_PolygonVertex(_));
	});
};
thx_geom_bool_Polygon.__name__ = ["thx","geom","bool","Polygon"];
thx_geom_bool_Polygon.fromSpline = function(spline) {
	var points = spline.toPoints();
	return new thx_geom_bool_Polygon(points);
};
thx_geom_bool_Polygon.prototype = {
	first: null
	,vertices: null
	,add: function(vertex) {
		if(null == this.first) {
			this.first = vertex;
			this.first.next = vertex;
			this.first.prev = vertex;
		} else {
			var next;
			var prev;
			prev = this.first.prev;
			next = this.first;
			next.prev = vertex;
			vertex.next = next;
			vertex.prev = prev;
			prev.next = vertex;
		}
		this.vertices++;
	}
	,insert: function(vertex,start,end) {
		var curr = start;
		var prev;
		while(curr != end?curr.alpha < vertex.alpha:false) curr = curr.next;
		vertex.next = curr;
		prev = curr.prev;
		vertex.prev = prev;
		prev.next = vertex;
		curr.prev = vertex;
		this.vertices++;
	}
	,getNext: function(vertex) {
		var c = vertex;
		while(c.intersect) c = c.next;
		return c;
	}
	,getFirstIntersect: function() {
		var vertex = this.first;
		do {
			if(vertex.intersect?!vertex.checked:false) break;
			vertex = vertex.next;
		} while(vertex != this.first);
		return vertex;
	}
	,hasUnprocessed: function() {
		var vertex = this.first;
		do {
			if(vertex.intersect?!vertex.checked:false) return true;
			vertex = vertex.next;
		} while(vertex != this.first);
		return false;
	}
	,union: function(other) {
		return this.clip(other,false,false);
	}
	,intersection: function(other) {
		return this.clip(other,true,true);
	}
	,difference: function(other) {
		return this.clip(other,false,true);
	}
	,clip: function(clip,subjectFlag,clipperFlag) {
		var subject = this.first;
		var clipper = clip.first;
		var intersection;
		do {
			if(!subject.intersect) do {
				if(!clipper.intersect) {
					intersection = new thx_geom_bool_Intersection(subject,this.getNext(subject.next),clipper,clip.getNext(clipper.next));
					if(intersection.test()) {
						var intersectionSubject = thx_geom_bool_PolygonVertex.createIntersection(intersection.point,intersection.uSubject);
						var intersectionClipper = thx_geom_bool_PolygonVertex.createIntersection(intersection.point,intersection.uClipper);
						intersectionSubject.nextPolygon = intersectionClipper;
						intersectionClipper.nextPolygon = intersectionSubject;
						this.insert(intersectionSubject,subject,this.getNext(subject.next));
						clip.insert(intersectionClipper,clipper,clip.getNext(clipper.next));
					}
				}
				clipper = clipper.next;
			} while(clipper != clip.first);
			subject = subject.next;
		} while(subject != this.first);
		subject = this.first;
		clipper = clip.first;
		subjectFlag = subjectFlag != subject.isInside(clip);
		clipperFlag = clipperFlag != clipper.isInside(this);
		do {
			if(subject.intersect) {
				subject.entry = subjectFlag;
				subjectFlag = !subjectFlag;
			}
			subject = subject.next;
		} while(subject != this.first);
		do {
			if(clipper.intersect) {
				clipper.entry = clipperFlag;
				clipperFlag = !clipperFlag;
			}
			clipper = clipper.next;
		} while(clipper != clip.first);
		var polygons = [];
		while(this.hasUnprocessed()) {
			var current = this.getFirstIntersect();
			var clipped = new thx_geom_bool_Polygon();
			clipped.add(new thx_geom_bool_PolygonVertex(current.point));
			do {
				current.setChecked();
				if(current.entry) do {
					current = current.next;
					clipped.add(new thx_geom_bool_PolygonVertex(current.point));
				} while(!current.intersect); else do {
					current = current.prev;
					clipped.add(new thx_geom_bool_PolygonVertex(current.point));
				} while(!current.intersect);
				current = current.nextPolygon;
			} while(!current.checked);
			polygons.push(clipped);
		}
		return polygons;
	}
	,toSpline: function() {
		var nodes = [];
		var vertex = this.first;
		do {
			nodes.push(new thx_geom_SplineNode(vertex.point));
			vertex = vertex.next;
		} while(vertex != this.first);
		return new thx_geom_Spline(nodes,true);
	}
	,__class__: thx_geom_bool_Polygon
};
var thx_geom_bool_PolygonVertex = function(point) {
	this.point = point;
	this.next = null;
	this.prev = null;
	this.nextPolygon = null;
	this.alpha = 0.0;
	this.entry = true;
	this.intersect = false;
	this.checked = false;
};
thx_geom_bool_PolygonVertex.__name__ = ["thx","geom","bool","PolygonVertex"];
thx_geom_bool_PolygonVertex.createIntersection = function(point,alpha) {
	var v = new thx_geom_bool_PolygonVertex(point);
	v.alpha = alpha;
	v.intersect = true;
	v.entry = false;
	return v;
};
thx_geom_bool_PolygonVertex.prototype = {
	point: null
	,next: null
	,prev: null
	,nextPolygon: null
	,alpha: null
	,entry: null
	,intersect: null
	,checked: null
	,setChecked: function() {
		this.checked = true;
		if(null != this.nextPolygon?!this.nextPolygon.checked:false) this.nextPolygon.setChecked();
	}
	,isInside: function(polygon) {
		var windings = 0;
		var tmp;
		var x = Infinity;
		tmp = [x,this.point[1]];
		var boundary = new thx_geom_bool_PolygonVertex(tmp);
		var q = polygon.first;
		do {
			if(!q.intersect?new thx_geom_bool_Intersection(this,boundary,q,polygon.getNext(q.next)).test():false) windings++;
			q = q.next;
		} while(q != polygon.first);
		return windings % 2 != 0;
	}
	,__class__: thx_geom_bool_PolygonVertex
};
var thx_geom_bool_Intersection = function(s1,s2,c1,c2) {
	var den = (c2.point[1] - c1.point[1]) * (s2.point[0] - s1.point[0]) - (c2.point[0] - c1.point[0]) * (s2.point[1] - s1.point[1]);
	if(den == 0.0) return;
	this.uSubject = ((c2.point[0] - c1.point[0]) * (s1.point[1] - c1.point[1]) - (c2.point[1] - c1.point[1]) * (s1.point[0] - c1.point[0])) / den;
	this.uClipper = ((s2.point[0] - s1.point[0]) * (s1.point[1] - c1.point[1]) - (s2.point[1] - s1.point[1]) * (s1.point[0] - c1.point[0])) / den;
	if(this.test()) this.point = [s1.point[0] + this.uSubject * (s2.point[0] - s1.point[0]),s1.point[1] + this.uSubject * (s2.point[1] - s1.point[1])];
};
thx_geom_bool_Intersection.__name__ = ["thx","geom","bool","Intersection"];
thx_geom_bool_Intersection.prototype = {
	point: null
	,uSubject: null
	,uClipper: null
	,test: function() {
		var tmp;
		if(0 < this.uSubject?this.uSubject < 1:false) {
			if(0 < this.uClipper) tmp = this.uClipper < 1; else tmp = false;
		} else tmp = false;
		return tmp;
	}
	,__class__: thx_geom_bool_Intersection
};
var thx_geom_shape__$Box_Box_$Impl_$ = {};
thx_geom_shape__$Box_Box_$Impl_$.__name__ = ["thx","geom","shape","_Box","Box_Impl_"];
thx_geom_shape__$Box_Box_$Impl_$.fromPoints = function(a,b) {
	var tmp;
	var tmp1;
	var x = Math.min(a[0],b[0]);
	var y = Math.min(a[1],b[1]);
	tmp1 = [x,y];
	var bottomLeft = tmp1;
	var tmp2;
	var x1 = Math.max(a[0],b[0]);
	var y1 = Math.max(a[1],b[1]);
	tmp2 = [x1,y1];
	var topRight = tmp2;
	tmp = [bottomLeft,topRight];
	return tmp;
};
thx_geom_shape__$Box_Box_$Impl_$._new = function(bottomLeft,topRight) {
	return [bottomLeft,topRight];
};
thx_geom_shape__$Box_Box_$Impl_$.transform = function(this1,matrix) {
	return thx_geom_shape__$Box_Box_$Impl_$.fromPoints(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this1[0]),thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.leftMultiplyPoint(matrix,this1[1]));
};
thx_geom_shape__$Box_Box_$Impl_$.get_topLeft = function(this1) {
	return [this1[0][0],this1[1][1]];
};
thx_geom_shape__$Box_Box_$Impl_$.get_topRight = function(this1) {
	return this1[1];
};
thx_geom_shape__$Box_Box_$Impl_$.get_bottomLeft = function(this1) {
	return this1[0];
};
thx_geom_shape__$Box_Box_$Impl_$.get_bottomRight = function(this1) {
	return [this1[1][0],this1[0][1]];
};
thx_geom_shape__$Box_Box_$Impl_$.get_center = function(this1) {
	return [this1[0][0] + (this1[1][0] - this1[0][0]) / 2,this1[1][1] + (this1[1][1] - this1[0][1]) / 2];
};
thx_geom_shape__$Box_Box_$Impl_$.get_left = function(this1) {
	return this1[0][0];
};
thx_geom_shape__$Box_Box_$Impl_$.get_right = function(this1) {
	return this1[1][0];
};
thx_geom_shape__$Box_Box_$Impl_$.get_top = function(this1) {
	return this1[1][1];
};
thx_geom_shape__$Box_Box_$Impl_$.get_bottom = function(this1) {
	return this1[0][1];
};
thx_geom_shape__$Box_Box_$Impl_$.get_width = function(this1) {
	return this1[1][0] - this1[0][0];
};
thx_geom_shape__$Box_Box_$Impl_$.get_height = function(this1) {
	return this1[1][1] - this1[0][1];
};
thx_geom_shape__$Box_Box_$Impl_$.expandByPoint = function(this1,point) {
	var tmp;
	var tmp1;
	var this2 = this1[0];
	var x = Math.min(this2[0],point[0]);
	var y = Math.min(this2[1],point[1]);
	tmp1 = [x,y];
	var bottomLeft = tmp1;
	var tmp2;
	var this3 = this1[1];
	var x1 = Math.max(this3[0],point[0]);
	var y1 = Math.max(this3[1],point[1]);
	tmp2 = [x1,y1];
	var topRight = tmp2;
	tmp = [bottomLeft,topRight];
	return tmp;
};
thx_geom_shape__$Box_Box_$Impl_$.expandByPoints = function(this1,points) {
	var min = this1[0];
	var max = this1[1];
	var $it0 = $iterator(points)();
	while( $it0.hasNext() ) {
		var point = $it0.next();
		var tmp;
		var x = Math.min(min[0],point[0]);
		var y = Math.min(min[1],point[1]);
		tmp = [x,y];
		min = tmp;
		var tmp1;
		var x1 = Math.max(max[0],point[0]);
		var y1 = Math.max(max[1],point[1]);
		tmp1 = [x1,y1];
		max = tmp1;
	}
	return [min,max];
};
thx_geom_shape__$Box_Box_$Impl_$.intersects = function(this1,other) {
	var tmp;
	if(!(this1[1][0] >= other[0][0]?this1[0][0] <= other[1][0]:false)) {
		if(this1[0][1] >= other[1][1]) tmp = this1[1][1] <= other[0][1]; else tmp = false;
	} else tmp = true;
	return tmp;
};
thx_geom_shape__$Box_Box_$Impl_$.contains = function(this1,point) {
	return ((this1[0][0] <= point[0]?this1[1][0] >= point[0]:false)?this1[1][1] >= point[1]:false)?this1[0][1] <= point[1]:false;
};
thx_geom_shape__$Box_Box_$Impl_$.equals = function(this1,other) {
	var tmp;
	var this2 = this1[0];
	var p = other[0];
	if(this2[0] == p[0]) tmp = this2[1] == p[1]; else tmp = false;
	var tmp1;
	if(tmp) {
		var this3 = this1[1];
		var p1 = other[1];
		if(this3[0] == p1[0]) tmp1 = this3[1] == p1[1]; else tmp1 = false;
	} else tmp1 = false;
	return tmp1;
};
thx_geom_shape__$Box_Box_$Impl_$.toString = function(this1) {
	return "Box(x:" + this1[0][0] + ",y:" + this1[1][1] + ",w:" + (this1[1][0] - this1[0][0]) + ",h:" + (this1[1][1] - this1[0][1]) + ")";
};
thx_geom_shape__$Box_Box_$Impl_$.toSpline = function(this1) {
	return thx_geom_Spline.fromArray([[this1[0][0],this1[1][1]],this1[1],[this1[1][0],this1[0][1]],this1[0]],true);
};
thx_geom_shape__$Box_Box_$Impl_$.toPath = function(this1) {
	return thx_geom_shape__$Box_Box_$Impl_$.toSpline(this1).toPath();
};
var thx_geom_shape__$Circle_Circle_$Impl_$ = {};
thx_geom_shape__$Circle_Circle_$Impl_$.__name__ = ["thx","geom","shape","_Circle","Circle_Impl_"];
thx_geom_shape__$Circle_Circle_$Impl_$._new = function(center,radius) {
	return { center : center, radius : radius};
};
thx_geom_shape__$Circle_Circle_$Impl_$.get_center = function(this1) {
	return this1.center;
};
thx_geom_shape__$Circle_Circle_$Impl_$.get_radius = function(this1) {
	return this1.radius;
};
thx_geom_shape__$Circle_Circle_$Impl_$.toString = function(this1) {
	return "Circle(" + this1.center[0] + "," + this1.center[1] + "," + this1.radius + ")";
};
thx_geom_shape__$Circle_Circle_$Impl_$.toSpline = function(this1) {
	var tmp;
	var t = thx_geom_shape__$Circle_Circle_$Impl_$.unitaryCircle.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.scaling([this1.radius,this1.radius,1]));
	tmp = t.transform(thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.translation([this1.center[0],this1.center[1],0]));
	return tmp;
};
thx_geom_shape__$Circle_Circle_$Impl_$.toPath = function(this1) {
	return thx_geom_shape__$Circle_Circle_$Impl_$.toSpline(this1).toPath();
};
var thx_math_Const = function() { };
thx_math_Const.__name__ = ["thx","math","Const"];
var thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$ = {};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.__name__ = ["thx","unit","angle","_BinaryDegree","BinaryDegree_Impl_"];
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.pointToBinaryDegree = function(x,y) {
	var tmp;
	var tmp1;
	var value = Math.atan2(y,x);
	tmp1 = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	var this1 = tmp1;
	tmp = thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * 40.7436654315252);
	return tmp;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.floatToBinaryDegree = function(value) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(value);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new = function(value) {
	return value;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.cos = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.0245436926061703);
	tmp = Math.cos(this2);
	return tmp;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.sin = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.0245436926061703);
	tmp = Math.sin(this2);
	return tmp;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.abs = function(this1) {
	var tmp;
	var value = Math.abs(this1);
	tmp = thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.min = function(this1,other) {
	var tmp;
	var value = Math.min(this1,other);
	tmp = thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.max = function(this1,other) {
	var tmp;
	var value = Math.max(this1,other);
	tmp = thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.normalize = function(this1) {
	var a = this1 % thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.turn;
	var tmp;
	if(a < 0) {
		var other = thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(a);
		tmp = thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.turn + other);
	} else tmp = thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(a);
	return tmp;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.normalizeDirection = function(this1) {
	var a = thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.normalize(this1);
	var tmp;
	var other = thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(180);
	tmp = a > other;
	return tmp?thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(a - thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.turn):a;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.negate = function(this1) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(-this1);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.add = function(this1,other) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 + other);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.subtract = function(this1,other) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 - other);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.multiply = function(this1,other) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * other);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.divide = function(this1,other) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 / other);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.modulo = function(this1,other) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 % other);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.equal = function(this1,other) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1) == other;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.nearEquals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.notEqual = function(this1,other) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1) != other;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.less = function(this1,other) {
	return this1 < other;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.lessEqual = function(this1,other) {
	return this1 <= other;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.more = function(this1,other) {
	return this1 > other;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.moreEqual = function(this1,other) {
	return this1 >= other;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toFloat = function(this1) {
	return this1;
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toDegree = function(this1) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * 1.40625);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toGrad = function(this1) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * 1.5625);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toHourAngle = function(this1) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * 0.09375);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toMinuteOfArc = function(this1) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * 84.375);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toPoint = function(this1) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 * 0.125);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toQuadrant = function(this1) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * 0.015625);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toRadian = function(this1) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.0245436926061703);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toRevolution = function(this1) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 * 0.00390625);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toSecondOfArc = function(this1) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * 5062.5);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toSextant = function(this1) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * 0.0234375);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toTurn = function(this1) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 * 0.00390625);
};
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.toString = function(this1) {
	return this1 + "binary degree";
};
var thx_unit_angle__$Degree_Degree_$Impl_$ = {};
thx_unit_angle__$Degree_Degree_$Impl_$.__name__ = ["thx","unit","angle","_Degree","Degree_Impl_"];
thx_unit_angle__$Degree_Degree_$Impl_$.pointToDegree = function(x,y) {
	var tmp;
	var tmp1;
	var value = Math.atan2(y,x);
	tmp1 = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	var this1 = tmp1;
	tmp = thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * 57.2957795130823);
	return tmp;
};
thx_unit_angle__$Degree_Degree_$Impl_$.floatToDegree = function(value) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(value);
};
thx_unit_angle__$Degree_Degree_$Impl_$._new = function(value) {
	return value;
};
thx_unit_angle__$Degree_Degree_$Impl_$.cos = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.0174532925199433);
	tmp = Math.cos(this2);
	return tmp;
};
thx_unit_angle__$Degree_Degree_$Impl_$.sin = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.0174532925199433);
	tmp = Math.sin(this2);
	return tmp;
};
thx_unit_angle__$Degree_Degree_$Impl_$.abs = function(this1) {
	var tmp;
	var value = Math.abs(this1);
	tmp = thx_unit_angle__$Degree_Degree_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Degree_Degree_$Impl_$.min = function(this1,other) {
	var tmp;
	var value = Math.min(this1,other);
	tmp = thx_unit_angle__$Degree_Degree_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Degree_Degree_$Impl_$.max = function(this1,other) {
	var tmp;
	var value = Math.max(this1,other);
	tmp = thx_unit_angle__$Degree_Degree_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Degree_Degree_$Impl_$.normalize = function(this1) {
	var a = this1 % thx_unit_angle__$Degree_Degree_$Impl_$.turn;
	var tmp;
	if(a < 0) {
		var other = thx_unit_angle__$Degree_Degree_$Impl_$._new(a);
		tmp = thx_unit_angle__$Degree_Degree_$Impl_$._new(thx_unit_angle__$Degree_Degree_$Impl_$.turn + other);
	} else tmp = thx_unit_angle__$Degree_Degree_$Impl_$._new(a);
	return tmp;
};
thx_unit_angle__$Degree_Degree_$Impl_$.normalizeDirection = function(this1) {
	var a = thx_unit_angle__$Degree_Degree_$Impl_$.normalize(this1);
	var tmp;
	var other = thx_unit_angle__$Degree_Degree_$Impl_$._new(180);
	tmp = a > other;
	return tmp?thx_unit_angle__$Degree_Degree_$Impl_$._new(a - thx_unit_angle__$Degree_Degree_$Impl_$.turn):a;
};
thx_unit_angle__$Degree_Degree_$Impl_$.negate = function(this1) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(-this1);
};
thx_unit_angle__$Degree_Degree_$Impl_$.add = function(this1,other) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 + other);
};
thx_unit_angle__$Degree_Degree_$Impl_$.subtract = function(this1,other) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 - other);
};
thx_unit_angle__$Degree_Degree_$Impl_$.multiply = function(this1,other) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * other);
};
thx_unit_angle__$Degree_Degree_$Impl_$.divide = function(this1,other) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 / other);
};
thx_unit_angle__$Degree_Degree_$Impl_$.modulo = function(this1,other) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 % other);
};
thx_unit_angle__$Degree_Degree_$Impl_$.equal = function(this1,other) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1) == other;
};
thx_unit_angle__$Degree_Degree_$Impl_$.nearEquals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_unit_angle__$Degree_Degree_$Impl_$.notEqual = function(this1,other) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1) != other;
};
thx_unit_angle__$Degree_Degree_$Impl_$.less = function(this1,other) {
	return this1 < other;
};
thx_unit_angle__$Degree_Degree_$Impl_$.lessEqual = function(this1,other) {
	return this1 <= other;
};
thx_unit_angle__$Degree_Degree_$Impl_$.more = function(this1,other) {
	return this1 > other;
};
thx_unit_angle__$Degree_Degree_$Impl_$.moreEqual = function(this1,other) {
	return this1 >= other;
};
thx_unit_angle__$Degree_Degree_$Impl_$.toFloat = function(this1) {
	return this1;
};
thx_unit_angle__$Degree_Degree_$Impl_$.toBinaryDegree = function(this1) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * 0.711111111111111);
};
thx_unit_angle__$Degree_Degree_$Impl_$.toGrad = function(this1) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * 1.11111111111111);
};
thx_unit_angle__$Degree_Degree_$Impl_$.toHourAngle = function(this1) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * 0.0666666666666667);
};
thx_unit_angle__$Degree_Degree_$Impl_$.toMinuteOfArc = function(this1) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * 60);
};
thx_unit_angle__$Degree_Degree_$Impl_$.toPoint = function(this1) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 * 0.0888888888888889);
};
thx_unit_angle__$Degree_Degree_$Impl_$.toQuadrant = function(this1) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * 0.0111111111111111);
};
thx_unit_angle__$Degree_Degree_$Impl_$.toRadian = function(this1) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.0174532925199433);
};
thx_unit_angle__$Degree_Degree_$Impl_$.toRevolution = function(this1) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 * 0.00277777777777778);
};
thx_unit_angle__$Degree_Degree_$Impl_$.toSecondOfArc = function(this1) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * 3600);
};
thx_unit_angle__$Degree_Degree_$Impl_$.toSextant = function(this1) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * 0.0166666666666667);
};
thx_unit_angle__$Degree_Degree_$Impl_$.toTurn = function(this1) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 * 0.00277777777777778);
};
thx_unit_angle__$Degree_Degree_$Impl_$.toString = function(this1) {
	return this1 + "°";
};
var thx_unit_angle__$Grad_Grad_$Impl_$ = {};
thx_unit_angle__$Grad_Grad_$Impl_$.__name__ = ["thx","unit","angle","_Grad","Grad_Impl_"];
thx_unit_angle__$Grad_Grad_$Impl_$.pointToGrad = function(x,y) {
	var tmp;
	var tmp1;
	var value = Math.atan2(y,x);
	tmp1 = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	var this1 = tmp1;
	tmp = thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * 63.6619772367581);
	return tmp;
};
thx_unit_angle__$Grad_Grad_$Impl_$.floatToGrad = function(value) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(value);
};
thx_unit_angle__$Grad_Grad_$Impl_$._new = function(value) {
	return value;
};
thx_unit_angle__$Grad_Grad_$Impl_$.cos = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.015707963267949);
	tmp = Math.cos(this2);
	return tmp;
};
thx_unit_angle__$Grad_Grad_$Impl_$.sin = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.015707963267949);
	tmp = Math.sin(this2);
	return tmp;
};
thx_unit_angle__$Grad_Grad_$Impl_$.abs = function(this1) {
	var tmp;
	var value = Math.abs(this1);
	tmp = thx_unit_angle__$Grad_Grad_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Grad_Grad_$Impl_$.min = function(this1,other) {
	var tmp;
	var value = Math.min(this1,other);
	tmp = thx_unit_angle__$Grad_Grad_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Grad_Grad_$Impl_$.max = function(this1,other) {
	var tmp;
	var value = Math.max(this1,other);
	tmp = thx_unit_angle__$Grad_Grad_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Grad_Grad_$Impl_$.normalize = function(this1) {
	var a = this1 % thx_unit_angle__$Grad_Grad_$Impl_$.turn;
	var tmp;
	if(a < 0) {
		var other = thx_unit_angle__$Grad_Grad_$Impl_$._new(a);
		tmp = thx_unit_angle__$Grad_Grad_$Impl_$._new(thx_unit_angle__$Grad_Grad_$Impl_$.turn + other);
	} else tmp = thx_unit_angle__$Grad_Grad_$Impl_$._new(a);
	return tmp;
};
thx_unit_angle__$Grad_Grad_$Impl_$.normalizeDirection = function(this1) {
	var a = thx_unit_angle__$Grad_Grad_$Impl_$.normalize(this1);
	var tmp;
	var other = thx_unit_angle__$Grad_Grad_$Impl_$._new(180);
	tmp = a > other;
	return tmp?thx_unit_angle__$Grad_Grad_$Impl_$._new(a - thx_unit_angle__$Grad_Grad_$Impl_$.turn):a;
};
thx_unit_angle__$Grad_Grad_$Impl_$.negate = function(this1) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(-this1);
};
thx_unit_angle__$Grad_Grad_$Impl_$.add = function(this1,other) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 + other);
};
thx_unit_angle__$Grad_Grad_$Impl_$.subtract = function(this1,other) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 - other);
};
thx_unit_angle__$Grad_Grad_$Impl_$.multiply = function(this1,other) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * other);
};
thx_unit_angle__$Grad_Grad_$Impl_$.divide = function(this1,other) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 / other);
};
thx_unit_angle__$Grad_Grad_$Impl_$.modulo = function(this1,other) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 % other);
};
thx_unit_angle__$Grad_Grad_$Impl_$.equal = function(this1,other) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1) == other;
};
thx_unit_angle__$Grad_Grad_$Impl_$.nearEquals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_unit_angle__$Grad_Grad_$Impl_$.notEqual = function(this1,other) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1) != other;
};
thx_unit_angle__$Grad_Grad_$Impl_$.less = function(this1,other) {
	return this1 < other;
};
thx_unit_angle__$Grad_Grad_$Impl_$.lessEqual = function(this1,other) {
	return this1 <= other;
};
thx_unit_angle__$Grad_Grad_$Impl_$.more = function(this1,other) {
	return this1 > other;
};
thx_unit_angle__$Grad_Grad_$Impl_$.moreEqual = function(this1,other) {
	return this1 >= other;
};
thx_unit_angle__$Grad_Grad_$Impl_$.toFloat = function(this1) {
	return this1;
};
thx_unit_angle__$Grad_Grad_$Impl_$.toBinaryDegree = function(this1) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * 0.64);
};
thx_unit_angle__$Grad_Grad_$Impl_$.toDegree = function(this1) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * 0.9);
};
thx_unit_angle__$Grad_Grad_$Impl_$.toHourAngle = function(this1) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * 0.06);
};
thx_unit_angle__$Grad_Grad_$Impl_$.toMinuteOfArc = function(this1) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * 54);
};
thx_unit_angle__$Grad_Grad_$Impl_$.toPoint = function(this1) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 * 0.08);
};
thx_unit_angle__$Grad_Grad_$Impl_$.toQuadrant = function(this1) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * 0.01);
};
thx_unit_angle__$Grad_Grad_$Impl_$.toRadian = function(this1) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.015707963267949);
};
thx_unit_angle__$Grad_Grad_$Impl_$.toRevolution = function(this1) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 * 0.0025);
};
thx_unit_angle__$Grad_Grad_$Impl_$.toSecondOfArc = function(this1) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * 3240);
};
thx_unit_angle__$Grad_Grad_$Impl_$.toSextant = function(this1) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * 0.015);
};
thx_unit_angle__$Grad_Grad_$Impl_$.toTurn = function(this1) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 * 0.0025);
};
thx_unit_angle__$Grad_Grad_$Impl_$.toString = function(this1) {
	return this1 + "grad";
};
var thx_unit_angle__$HourAngle_HourAngle_$Impl_$ = {};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.__name__ = ["thx","unit","angle","_HourAngle","HourAngle_Impl_"];
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.pointToHourAngle = function(x,y) {
	var tmp;
	var tmp1;
	var value = Math.atan2(y,x);
	tmp1 = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	var this1 = tmp1;
	tmp = thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * 3.81971863420549);
	return tmp;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.floatToHourAngle = function(value) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(value);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new = function(value) {
	return value;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.cos = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.261799387799149);
	tmp = Math.cos(this2);
	return tmp;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.sin = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.261799387799149);
	tmp = Math.sin(this2);
	return tmp;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.abs = function(this1) {
	var tmp;
	var value = Math.abs(this1);
	tmp = thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.min = function(this1,other) {
	var tmp;
	var value = Math.min(this1,other);
	tmp = thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.max = function(this1,other) {
	var tmp;
	var value = Math.max(this1,other);
	tmp = thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.normalize = function(this1) {
	var a = this1 % thx_unit_angle__$HourAngle_HourAngle_$Impl_$.turn;
	var tmp;
	if(a < 0) {
		var other = thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(a);
		tmp = thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(thx_unit_angle__$HourAngle_HourAngle_$Impl_$.turn + other);
	} else tmp = thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(a);
	return tmp;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.normalizeDirection = function(this1) {
	var a = thx_unit_angle__$HourAngle_HourAngle_$Impl_$.normalize(this1);
	var tmp;
	var other = thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(180);
	tmp = a > other;
	return tmp?thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(a - thx_unit_angle__$HourAngle_HourAngle_$Impl_$.turn):a;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.negate = function(this1) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(-this1);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.add = function(this1,other) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 + other);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.subtract = function(this1,other) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 - other);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.multiply = function(this1,other) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * other);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.divide = function(this1,other) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 / other);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.modulo = function(this1,other) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 % other);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.equal = function(this1,other) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1) == other;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.nearEquals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.notEqual = function(this1,other) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1) != other;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.less = function(this1,other) {
	return this1 < other;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.lessEqual = function(this1,other) {
	return this1 <= other;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.more = function(this1,other) {
	return this1 > other;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.moreEqual = function(this1,other) {
	return this1 >= other;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toFloat = function(this1) {
	return this1;
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toBinaryDegree = function(this1) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * 10.6666666666667);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toDegree = function(this1) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * 15);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toGrad = function(this1) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * 16.6666666666667);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toMinuteOfArc = function(this1) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * 900);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toPoint = function(this1) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 * 1.33333333333333);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toQuadrant = function(this1) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * 0.166666666666667);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toRadian = function(this1) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.261799387799149);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toRevolution = function(this1) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 * 0.0416666666666667);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toSecondOfArc = function(this1) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * 54000);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toSextant = function(this1) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * 0.25);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toTurn = function(this1) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 * 0.0416666666666667);
};
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.toString = function(this1) {
	return this1 + "hour";
};
var thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$ = {};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.__name__ = ["thx","unit","angle","_MinuteOfArc","MinuteOfArc_Impl_"];
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.pointToMinuteOfArc = function(x,y) {
	var tmp;
	var tmp1;
	var value = Math.atan2(y,x);
	tmp1 = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	var this1 = tmp1;
	tmp = thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * 3437.74677078494);
	return tmp;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.floatToMinuteOfArc = function(value) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(value);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new = function(value) {
	return value;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.cos = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.000290888208665722);
	tmp = Math.cos(this2);
	return tmp;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.sin = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.000290888208665722);
	tmp = Math.sin(this2);
	return tmp;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.abs = function(this1) {
	var tmp;
	var value = Math.abs(this1);
	tmp = thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.min = function(this1,other) {
	var tmp;
	var value = Math.min(this1,other);
	tmp = thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.max = function(this1,other) {
	var tmp;
	var value = Math.max(this1,other);
	tmp = thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.normalize = function(this1) {
	var a = this1 % thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.turn;
	var tmp;
	if(a < 0) {
		var other = thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(a);
		tmp = thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.turn + other);
	} else tmp = thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(a);
	return tmp;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.normalizeDirection = function(this1) {
	var a = thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.normalize(this1);
	var tmp;
	var other = thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(180);
	tmp = a > other;
	return tmp?thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(a - thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.turn):a;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.negate = function(this1) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(-this1);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.add = function(this1,other) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 + other);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.subtract = function(this1,other) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 - other);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.multiply = function(this1,other) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * other);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.divide = function(this1,other) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 / other);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.modulo = function(this1,other) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 % other);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.equal = function(this1,other) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1) == other;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.nearEquals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.notEqual = function(this1,other) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1) != other;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.less = function(this1,other) {
	return this1 < other;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.lessEqual = function(this1,other) {
	return this1 <= other;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.more = function(this1,other) {
	return this1 > other;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.moreEqual = function(this1,other) {
	return this1 >= other;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toFloat = function(this1) {
	return this1;
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toBinaryDegree = function(this1) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * 0.0118518518518519);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toDegree = function(this1) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * 0.0166666666666667);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toGrad = function(this1) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * 0.0185185185185185);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toHourAngle = function(this1) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * 0.00111111111111111);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toPoint = function(this1) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 * 0.00148148148148148);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toQuadrant = function(this1) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * 0.000185185185185185);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toRadian = function(this1) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.000290888208665722);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toRevolution = function(this1) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 * 4.62962962962963e-05);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toSecondOfArc = function(this1) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * 60);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toSextant = function(this1) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * 0.000277777777777778);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toTurn = function(this1) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 * 4.62962962962963e-05);
};
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.toString = function(this1) {
	return this1 + "′";
};
var thx_unit_angle__$Point_Point_$Impl_$ = {};
thx_unit_angle__$Point_Point_$Impl_$.__name__ = ["thx","unit","angle","_Point","Point_Impl_"];
thx_unit_angle__$Point_Point_$Impl_$.pointToPoint = function(x,y) {
	var tmp;
	var tmp1;
	var value = Math.atan2(y,x);
	tmp1 = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	var this1 = tmp1;
	tmp = thx_unit_angle__$Point_Point_$Impl_$._new(this1 * 5.09295817894065);
	return tmp;
};
thx_unit_angle__$Point_Point_$Impl_$.floatToPoint = function(value) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(value);
};
thx_unit_angle__$Point_Point_$Impl_$._new = function(value) {
	return value;
};
thx_unit_angle__$Point_Point_$Impl_$.cos = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.196349540849362);
	tmp = Math.cos(this2);
	return tmp;
};
thx_unit_angle__$Point_Point_$Impl_$.sin = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.196349540849362);
	tmp = Math.sin(this2);
	return tmp;
};
thx_unit_angle__$Point_Point_$Impl_$.abs = function(this1) {
	var tmp;
	var value = Math.abs(this1);
	tmp = thx_unit_angle__$Point_Point_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Point_Point_$Impl_$.min = function(this1,other) {
	var tmp;
	var value = Math.min(this1,other);
	tmp = thx_unit_angle__$Point_Point_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Point_Point_$Impl_$.max = function(this1,other) {
	var tmp;
	var value = Math.max(this1,other);
	tmp = thx_unit_angle__$Point_Point_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Point_Point_$Impl_$.normalize = function(this1) {
	var a = this1 % thx_unit_angle__$Point_Point_$Impl_$.turn;
	var tmp;
	if(a < 0) {
		var other = thx_unit_angle__$Point_Point_$Impl_$._new(a);
		tmp = thx_unit_angle__$Point_Point_$Impl_$._new(thx_unit_angle__$Point_Point_$Impl_$.turn + other);
	} else tmp = thx_unit_angle__$Point_Point_$Impl_$._new(a);
	return tmp;
};
thx_unit_angle__$Point_Point_$Impl_$.normalizeDirection = function(this1) {
	var a = thx_unit_angle__$Point_Point_$Impl_$.normalize(this1);
	var tmp;
	var other = thx_unit_angle__$Point_Point_$Impl_$._new(180);
	tmp = a > other;
	return tmp?thx_unit_angle__$Point_Point_$Impl_$._new(a - thx_unit_angle__$Point_Point_$Impl_$.turn):a;
};
thx_unit_angle__$Point_Point_$Impl_$.negate = function(this1) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(-this1);
};
thx_unit_angle__$Point_Point_$Impl_$.add = function(this1,other) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 + other);
};
thx_unit_angle__$Point_Point_$Impl_$.subtract = function(this1,other) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 - other);
};
thx_unit_angle__$Point_Point_$Impl_$.multiply = function(this1,other) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 * other);
};
thx_unit_angle__$Point_Point_$Impl_$.divide = function(this1,other) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 / other);
};
thx_unit_angle__$Point_Point_$Impl_$.modulo = function(this1,other) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 % other);
};
thx_unit_angle__$Point_Point_$Impl_$.equal = function(this1,other) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1) == other;
};
thx_unit_angle__$Point_Point_$Impl_$.nearEquals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_unit_angle__$Point_Point_$Impl_$.notEqual = function(this1,other) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1) != other;
};
thx_unit_angle__$Point_Point_$Impl_$.less = function(this1,other) {
	return this1 < other;
};
thx_unit_angle__$Point_Point_$Impl_$.lessEqual = function(this1,other) {
	return this1 <= other;
};
thx_unit_angle__$Point_Point_$Impl_$.more = function(this1,other) {
	return this1 > other;
};
thx_unit_angle__$Point_Point_$Impl_$.moreEqual = function(this1,other) {
	return this1 >= other;
};
thx_unit_angle__$Point_Point_$Impl_$.toFloat = function(this1) {
	return this1;
};
thx_unit_angle__$Point_Point_$Impl_$.toBinaryDegree = function(this1) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * 8);
};
thx_unit_angle__$Point_Point_$Impl_$.toDegree = function(this1) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * 11.25);
};
thx_unit_angle__$Point_Point_$Impl_$.toGrad = function(this1) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * 12.5);
};
thx_unit_angle__$Point_Point_$Impl_$.toHourAngle = function(this1) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * 0.75);
};
thx_unit_angle__$Point_Point_$Impl_$.toMinuteOfArc = function(this1) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * 675);
};
thx_unit_angle__$Point_Point_$Impl_$.toQuadrant = function(this1) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * 0.125);
};
thx_unit_angle__$Point_Point_$Impl_$.toRadian = function(this1) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 0.196349540849362);
};
thx_unit_angle__$Point_Point_$Impl_$.toRevolution = function(this1) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 * 0.03125);
};
thx_unit_angle__$Point_Point_$Impl_$.toSecondOfArc = function(this1) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * 40500);
};
thx_unit_angle__$Point_Point_$Impl_$.toSextant = function(this1) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * 0.1875);
};
thx_unit_angle__$Point_Point_$Impl_$.toTurn = function(this1) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 * 0.03125);
};
thx_unit_angle__$Point_Point_$Impl_$.toString = function(this1) {
	return this1 + "point";
};
var thx_unit_angle__$Quadrant_Quadrant_$Impl_$ = {};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.__name__ = ["thx","unit","angle","_Quadrant","Quadrant_Impl_"];
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.pointToQuadrant = function(x,y) {
	var tmp;
	var tmp1;
	var value = Math.atan2(y,x);
	tmp1 = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	var this1 = tmp1;
	tmp = thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * 0.636619772367581);
	return tmp;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.floatToQuadrant = function(value) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(value);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new = function(value) {
	return value;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.cos = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 1.5707963267949);
	tmp = Math.cos(this2);
	return tmp;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.sin = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 1.5707963267949);
	tmp = Math.sin(this2);
	return tmp;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.abs = function(this1) {
	var tmp;
	var value = Math.abs(this1);
	tmp = thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.min = function(this1,other) {
	var tmp;
	var value = Math.min(this1,other);
	tmp = thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.max = function(this1,other) {
	var tmp;
	var value = Math.max(this1,other);
	tmp = thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.normalize = function(this1) {
	var a = this1 % thx_unit_angle__$Quadrant_Quadrant_$Impl_$.turn;
	var tmp;
	if(a < 0) {
		var other = thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(a);
		tmp = thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(thx_unit_angle__$Quadrant_Quadrant_$Impl_$.turn + other);
	} else tmp = thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(a);
	return tmp;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.normalizeDirection = function(this1) {
	var a = thx_unit_angle__$Quadrant_Quadrant_$Impl_$.normalize(this1);
	var tmp;
	var other = thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(180);
	tmp = a > other;
	return tmp?thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(a - thx_unit_angle__$Quadrant_Quadrant_$Impl_$.turn):a;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.negate = function(this1) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(-this1);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.add = function(this1,other) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 + other);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.subtract = function(this1,other) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 - other);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.multiply = function(this1,other) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * other);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.divide = function(this1,other) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 / other);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.modulo = function(this1,other) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 % other);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.equal = function(this1,other) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1) == other;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.nearEquals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.notEqual = function(this1,other) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1) != other;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.less = function(this1,other) {
	return this1 < other;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.lessEqual = function(this1,other) {
	return this1 <= other;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.more = function(this1,other) {
	return this1 > other;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.moreEqual = function(this1,other) {
	return this1 >= other;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toFloat = function(this1) {
	return this1;
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toBinaryDegree = function(this1) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * 64);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toDegree = function(this1) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * 90);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toGrad = function(this1) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * 100);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toHourAngle = function(this1) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * 6);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toMinuteOfArc = function(this1) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * 5400);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toPoint = function(this1) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 * 8);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toRadian = function(this1) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 1.5707963267949);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toRevolution = function(this1) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 * 0.25);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toSecondOfArc = function(this1) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * 324000);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toSextant = function(this1) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * 1.5);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toTurn = function(this1) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 * 0.25);
};
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.toString = function(this1) {
	return this1 + "quad.";
};
var thx_unit_angle__$Radian_Radian_$Impl_$ = {};
thx_unit_angle__$Radian_Radian_$Impl_$.__name__ = ["thx","unit","angle","_Radian","Radian_Impl_"];
thx_unit_angle__$Radian_Radian_$Impl_$.pointToRadian = function(x,y) {
	var tmp;
	var value = Math.atan2(y,x);
	tmp = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Radian_Radian_$Impl_$.floatToRadian = function(value) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
};
thx_unit_angle__$Radian_Radian_$Impl_$._new = function(value) {
	return value;
};
thx_unit_angle__$Radian_Radian_$Impl_$.cos = function(this1) {
	return Math.cos(this1);
};
thx_unit_angle__$Radian_Radian_$Impl_$.sin = function(this1) {
	return Math.sin(this1);
};
thx_unit_angle__$Radian_Radian_$Impl_$.abs = function(this1) {
	var tmp;
	var value = Math.abs(this1);
	tmp = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Radian_Radian_$Impl_$.min = function(this1,other) {
	var tmp;
	var value = Math.min(this1,other);
	tmp = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Radian_Radian_$Impl_$.max = function(this1,other) {
	var tmp;
	var value = Math.max(this1,other);
	tmp = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Radian_Radian_$Impl_$.normalize = function(this1) {
	var a = this1 % thx_unit_angle__$Radian_Radian_$Impl_$.turn;
	var tmp;
	if(a < 0) {
		var other = thx_unit_angle__$Radian_Radian_$Impl_$._new(a);
		tmp = thx_unit_angle__$Radian_Radian_$Impl_$._new(thx_unit_angle__$Radian_Radian_$Impl_$.turn + other);
	} else tmp = thx_unit_angle__$Radian_Radian_$Impl_$._new(a);
	return tmp;
};
thx_unit_angle__$Radian_Radian_$Impl_$.normalizeDirection = function(this1) {
	var a = thx_unit_angle__$Radian_Radian_$Impl_$.normalize(this1);
	var tmp;
	var other = thx_unit_angle__$Radian_Radian_$Impl_$._new(180);
	tmp = a > other;
	return tmp?thx_unit_angle__$Radian_Radian_$Impl_$._new(a - thx_unit_angle__$Radian_Radian_$Impl_$.turn):a;
};
thx_unit_angle__$Radian_Radian_$Impl_$.negate = function(this1) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(-this1);
};
thx_unit_angle__$Radian_Radian_$Impl_$.add = function(this1,other) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 + other);
};
thx_unit_angle__$Radian_Radian_$Impl_$.subtract = function(this1,other) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 - other);
};
thx_unit_angle__$Radian_Radian_$Impl_$.multiply = function(this1,other) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * other);
};
thx_unit_angle__$Radian_Radian_$Impl_$.divide = function(this1,other) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 / other);
};
thx_unit_angle__$Radian_Radian_$Impl_$.modulo = function(this1,other) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 % other);
};
thx_unit_angle__$Radian_Radian_$Impl_$.equal = function(this1,other) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1) == other;
};
thx_unit_angle__$Radian_Radian_$Impl_$.nearEquals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_unit_angle__$Radian_Radian_$Impl_$.notEqual = function(this1,other) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1) != other;
};
thx_unit_angle__$Radian_Radian_$Impl_$.less = function(this1,other) {
	return this1 < other;
};
thx_unit_angle__$Radian_Radian_$Impl_$.lessEqual = function(this1,other) {
	return this1 <= other;
};
thx_unit_angle__$Radian_Radian_$Impl_$.more = function(this1,other) {
	return this1 > other;
};
thx_unit_angle__$Radian_Radian_$Impl_$.moreEqual = function(this1,other) {
	return this1 >= other;
};
thx_unit_angle__$Radian_Radian_$Impl_$.toFloat = function(this1) {
	return this1;
};
thx_unit_angle__$Radian_Radian_$Impl_$.toBinaryDegree = function(this1) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * 40.7436654315252);
};
thx_unit_angle__$Radian_Radian_$Impl_$.toDegree = function(this1) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * 57.2957795130823);
};
thx_unit_angle__$Radian_Radian_$Impl_$.toGrad = function(this1) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * 63.6619772367581);
};
thx_unit_angle__$Radian_Radian_$Impl_$.toHourAngle = function(this1) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * 3.81971863420549);
};
thx_unit_angle__$Radian_Radian_$Impl_$.toMinuteOfArc = function(this1) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * 3437.74677078494);
};
thx_unit_angle__$Radian_Radian_$Impl_$.toPoint = function(this1) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 * 5.09295817894065);
};
thx_unit_angle__$Radian_Radian_$Impl_$.toQuadrant = function(this1) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * 0.636619772367581);
};
thx_unit_angle__$Radian_Radian_$Impl_$.toRevolution = function(this1) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 * 0.159154943091895);
};
thx_unit_angle__$Radian_Radian_$Impl_$.toSecondOfArc = function(this1) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * 206264.806247096);
};
thx_unit_angle__$Radian_Radian_$Impl_$.toSextant = function(this1) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * 0.954929658551372);
};
thx_unit_angle__$Radian_Radian_$Impl_$.toTurn = function(this1) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 * 0.159154943091895);
};
thx_unit_angle__$Radian_Radian_$Impl_$.toString = function(this1) {
	return this1 + "rad";
};
var thx_unit_angle__$Revolution_Revolution_$Impl_$ = {};
thx_unit_angle__$Revolution_Revolution_$Impl_$.__name__ = ["thx","unit","angle","_Revolution","Revolution_Impl_"];
thx_unit_angle__$Revolution_Revolution_$Impl_$.pointToRevolution = function(x,y) {
	var tmp;
	var tmp1;
	var value = Math.atan2(y,x);
	tmp1 = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	var this1 = tmp1;
	tmp = thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 * 0.159154943091895);
	return tmp;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.floatToRevolution = function(value) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(value);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$._new = function(value) {
	return value;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.cos = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 6.28318530717959);
	tmp = Math.cos(this2);
	return tmp;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.sin = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 6.28318530717959);
	tmp = Math.sin(this2);
	return tmp;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.abs = function(this1) {
	var tmp;
	var value = Math.abs(this1);
	tmp = thx_unit_angle__$Revolution_Revolution_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.min = function(this1,other) {
	var tmp;
	var value = Math.min(this1,other);
	tmp = thx_unit_angle__$Revolution_Revolution_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.max = function(this1,other) {
	var tmp;
	var value = Math.max(this1,other);
	tmp = thx_unit_angle__$Revolution_Revolution_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.normalize = function(this1) {
	var a = this1 % thx_unit_angle__$Revolution_Revolution_$Impl_$.turn;
	var tmp;
	if(a < 0) {
		var other = thx_unit_angle__$Revolution_Revolution_$Impl_$._new(a);
		tmp = thx_unit_angle__$Revolution_Revolution_$Impl_$._new(thx_unit_angle__$Revolution_Revolution_$Impl_$.turn + other);
	} else tmp = thx_unit_angle__$Revolution_Revolution_$Impl_$._new(a);
	return tmp;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.normalizeDirection = function(this1) {
	var a = thx_unit_angle__$Revolution_Revolution_$Impl_$.normalize(this1);
	var tmp;
	var other = thx_unit_angle__$Revolution_Revolution_$Impl_$._new(180);
	tmp = a > other;
	return tmp?thx_unit_angle__$Revolution_Revolution_$Impl_$._new(a - thx_unit_angle__$Revolution_Revolution_$Impl_$.turn):a;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.negate = function(this1) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(-this1);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.add = function(this1,other) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 + other);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.subtract = function(this1,other) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 - other);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.multiply = function(this1,other) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 * other);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.divide = function(this1,other) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 / other);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.modulo = function(this1,other) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 % other);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.equal = function(this1,other) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1) == other;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.nearEquals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.notEqual = function(this1,other) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1) != other;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.less = function(this1,other) {
	return this1 < other;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.lessEqual = function(this1,other) {
	return this1 <= other;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.more = function(this1,other) {
	return this1 > other;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.moreEqual = function(this1,other) {
	return this1 >= other;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toFloat = function(this1) {
	return this1;
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toBinaryDegree = function(this1) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * 256);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toDegree = function(this1) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * 360);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toGrad = function(this1) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * 400);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toHourAngle = function(this1) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * 24);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toMinuteOfArc = function(this1) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * 21600);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toPoint = function(this1) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 * 32);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toQuadrant = function(this1) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * 4);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toRadian = function(this1) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 6.28318530717959);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toSecondOfArc = function(this1) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * 1296000);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toSextant = function(this1) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * 6);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toTurn = function(this1) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1);
};
thx_unit_angle__$Revolution_Revolution_$Impl_$.toString = function(this1) {
	return this1 + "r";
};
var thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$ = {};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.__name__ = ["thx","unit","angle","_SecondOfArc","SecondOfArc_Impl_"];
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.pointToSecondOfArc = function(x,y) {
	var tmp;
	var tmp1;
	var value = Math.atan2(y,x);
	tmp1 = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	var this1 = tmp1;
	tmp = thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * 206264.806247096);
	return tmp;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.floatToSecondOfArc = function(value) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(value);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new = function(value) {
	return value;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.cos = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 4.84813681109536e-06);
	tmp = Math.cos(this2);
	return tmp;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.sin = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 4.84813681109536e-06);
	tmp = Math.sin(this2);
	return tmp;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.abs = function(this1) {
	var tmp;
	var value = Math.abs(this1);
	tmp = thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.min = function(this1,other) {
	var tmp;
	var value = Math.min(this1,other);
	tmp = thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.max = function(this1,other) {
	var tmp;
	var value = Math.max(this1,other);
	tmp = thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.normalize = function(this1) {
	var a = this1 % thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.turn;
	var tmp;
	if(a < 0) {
		var other = thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(a);
		tmp = thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.turn + other);
	} else tmp = thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(a);
	return tmp;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.normalizeDirection = function(this1) {
	var a = thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.normalize(this1);
	var tmp;
	var other = thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(180);
	tmp = a > other;
	return tmp?thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(a - thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.turn):a;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.negate = function(this1) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(-this1);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.add = function(this1,other) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 + other);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.subtract = function(this1,other) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 - other);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.multiply = function(this1,other) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * other);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.divide = function(this1,other) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 / other);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.modulo = function(this1,other) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 % other);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.equal = function(this1,other) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1) == other;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.nearEquals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.notEqual = function(this1,other) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1) != other;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.less = function(this1,other) {
	return this1 < other;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.lessEqual = function(this1,other) {
	return this1 <= other;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.more = function(this1,other) {
	return this1 > other;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.moreEqual = function(this1,other) {
	return this1 >= other;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toFloat = function(this1) {
	return this1;
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toBinaryDegree = function(this1) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * 0.000197530864197531);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toDegree = function(this1) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * 0.000277777777777778);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toGrad = function(this1) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * 0.000308641975308642);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toHourAngle = function(this1) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * 1.85185185185185e-05);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toMinuteOfArc = function(this1) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * 0.0166666666666667);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toPoint = function(this1) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 * 2.46913580246914e-05);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toQuadrant = function(this1) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * 3.08641975308642e-06);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toRadian = function(this1) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 4.84813681109536e-06);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toRevolution = function(this1) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 * 7.71604938271605e-07);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toSextant = function(this1) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * 4.62962962962963e-06);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toTurn = function(this1) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 * 7.71604938271605e-07);
};
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.toString = function(this1) {
	return this1 + "″";
};
var thx_unit_angle__$Sextant_Sextant_$Impl_$ = {};
thx_unit_angle__$Sextant_Sextant_$Impl_$.__name__ = ["thx","unit","angle","_Sextant","Sextant_Impl_"];
thx_unit_angle__$Sextant_Sextant_$Impl_$.pointToSextant = function(x,y) {
	var tmp;
	var tmp1;
	var value = Math.atan2(y,x);
	tmp1 = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	var this1 = tmp1;
	tmp = thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * 0.954929658551372);
	return tmp;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.floatToSextant = function(value) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(value);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$._new = function(value) {
	return value;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.cos = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 1.0471975511966);
	tmp = Math.cos(this2);
	return tmp;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.sin = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 1.0471975511966);
	tmp = Math.sin(this2);
	return tmp;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.abs = function(this1) {
	var tmp;
	var value = Math.abs(this1);
	tmp = thx_unit_angle__$Sextant_Sextant_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.min = function(this1,other) {
	var tmp;
	var value = Math.min(this1,other);
	tmp = thx_unit_angle__$Sextant_Sextant_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.max = function(this1,other) {
	var tmp;
	var value = Math.max(this1,other);
	tmp = thx_unit_angle__$Sextant_Sextant_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.normalize = function(this1) {
	var a = this1 % thx_unit_angle__$Sextant_Sextant_$Impl_$.turn;
	var tmp;
	if(a < 0) {
		var other = thx_unit_angle__$Sextant_Sextant_$Impl_$._new(a);
		tmp = thx_unit_angle__$Sextant_Sextant_$Impl_$._new(thx_unit_angle__$Sextant_Sextant_$Impl_$.turn + other);
	} else tmp = thx_unit_angle__$Sextant_Sextant_$Impl_$._new(a);
	return tmp;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.normalizeDirection = function(this1) {
	var a = thx_unit_angle__$Sextant_Sextant_$Impl_$.normalize(this1);
	var tmp;
	var other = thx_unit_angle__$Sextant_Sextant_$Impl_$._new(180);
	tmp = a > other;
	return tmp?thx_unit_angle__$Sextant_Sextant_$Impl_$._new(a - thx_unit_angle__$Sextant_Sextant_$Impl_$.turn):a;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.negate = function(this1) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(-this1);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.add = function(this1,other) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 + other);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.subtract = function(this1,other) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 - other);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.multiply = function(this1,other) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * other);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.divide = function(this1,other) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 / other);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.modulo = function(this1,other) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 % other);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.equal = function(this1,other) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1) == other;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.nearEquals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.notEqual = function(this1,other) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1) != other;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.less = function(this1,other) {
	return this1 < other;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.lessEqual = function(this1,other) {
	return this1 <= other;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.more = function(this1,other) {
	return this1 > other;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.moreEqual = function(this1,other) {
	return this1 >= other;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toFloat = function(this1) {
	return this1;
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toBinaryDegree = function(this1) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * 42.6666666666667);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toDegree = function(this1) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * 60);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toGrad = function(this1) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * 66.6666666666667);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toHourAngle = function(this1) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * 4);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toMinuteOfArc = function(this1) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * 3600);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toPoint = function(this1) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 * 5.33333333333333);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toQuadrant = function(this1) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * 0.666666666666667);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toRadian = function(this1) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 1.0471975511966);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toRevolution = function(this1) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1 * 0.166666666666667);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toSecondOfArc = function(this1) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * 216000);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toTurn = function(this1) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 * 0.166666666666667);
};
thx_unit_angle__$Sextant_Sextant_$Impl_$.toString = function(this1) {
	return this1 + "sextant";
};
var thx_unit_angle__$Turn_Turn_$Impl_$ = {};
thx_unit_angle__$Turn_Turn_$Impl_$.__name__ = ["thx","unit","angle","_Turn","Turn_Impl_"];
thx_unit_angle__$Turn_Turn_$Impl_$.pointToTurn = function(x,y) {
	var tmp;
	var tmp1;
	var value = Math.atan2(y,x);
	tmp1 = thx_unit_angle__$Radian_Radian_$Impl_$._new(value);
	var this1 = tmp1;
	tmp = thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 * 0.159154943091895);
	return tmp;
};
thx_unit_angle__$Turn_Turn_$Impl_$.floatToTurn = function(value) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(value);
};
thx_unit_angle__$Turn_Turn_$Impl_$._new = function(value) {
	return value;
};
thx_unit_angle__$Turn_Turn_$Impl_$.cos = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 6.28318530717959);
	tmp = Math.cos(this2);
	return tmp;
};
thx_unit_angle__$Turn_Turn_$Impl_$.sin = function(this1) {
	var tmp;
	var this2 = thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 6.28318530717959);
	tmp = Math.sin(this2);
	return tmp;
};
thx_unit_angle__$Turn_Turn_$Impl_$.abs = function(this1) {
	var tmp;
	var value = Math.abs(this1);
	tmp = thx_unit_angle__$Turn_Turn_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Turn_Turn_$Impl_$.min = function(this1,other) {
	var tmp;
	var value = Math.min(this1,other);
	tmp = thx_unit_angle__$Turn_Turn_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Turn_Turn_$Impl_$.max = function(this1,other) {
	var tmp;
	var value = Math.max(this1,other);
	tmp = thx_unit_angle__$Turn_Turn_$Impl_$._new(value);
	return tmp;
};
thx_unit_angle__$Turn_Turn_$Impl_$.normalize = function(this1) {
	var a = this1 % thx_unit_angle__$Turn_Turn_$Impl_$.turn;
	var tmp;
	if(a < 0) {
		var other = thx_unit_angle__$Turn_Turn_$Impl_$._new(a);
		tmp = thx_unit_angle__$Turn_Turn_$Impl_$._new(thx_unit_angle__$Turn_Turn_$Impl_$.turn + other);
	} else tmp = thx_unit_angle__$Turn_Turn_$Impl_$._new(a);
	return tmp;
};
thx_unit_angle__$Turn_Turn_$Impl_$.normalizeDirection = function(this1) {
	var a = thx_unit_angle__$Turn_Turn_$Impl_$.normalize(this1);
	var tmp;
	var other = thx_unit_angle__$Turn_Turn_$Impl_$._new(180);
	tmp = a > other;
	return tmp?thx_unit_angle__$Turn_Turn_$Impl_$._new(a - thx_unit_angle__$Turn_Turn_$Impl_$.turn):a;
};
thx_unit_angle__$Turn_Turn_$Impl_$.negate = function(this1) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(-this1);
};
thx_unit_angle__$Turn_Turn_$Impl_$.add = function(this1,other) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 + other);
};
thx_unit_angle__$Turn_Turn_$Impl_$.subtract = function(this1,other) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 - other);
};
thx_unit_angle__$Turn_Turn_$Impl_$.multiply = function(this1,other) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 * other);
};
thx_unit_angle__$Turn_Turn_$Impl_$.divide = function(this1,other) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 / other);
};
thx_unit_angle__$Turn_Turn_$Impl_$.modulo = function(this1,other) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1 % other);
};
thx_unit_angle__$Turn_Turn_$Impl_$.equal = function(this1,other) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1) == other;
};
thx_unit_angle__$Turn_Turn_$Impl_$.nearEquals = function(this1,other) {
	return Math.abs(this1 - other) <= 10e-10;
};
thx_unit_angle__$Turn_Turn_$Impl_$.notEqual = function(this1,other) {
	return thx_unit_angle__$Turn_Turn_$Impl_$._new(this1) != other;
};
thx_unit_angle__$Turn_Turn_$Impl_$.less = function(this1,other) {
	return this1 < other;
};
thx_unit_angle__$Turn_Turn_$Impl_$.lessEqual = function(this1,other) {
	return this1 <= other;
};
thx_unit_angle__$Turn_Turn_$Impl_$.more = function(this1,other) {
	return this1 > other;
};
thx_unit_angle__$Turn_Turn_$Impl_$.moreEqual = function(this1,other) {
	return this1 >= other;
};
thx_unit_angle__$Turn_Turn_$Impl_$.toFloat = function(this1) {
	return this1;
};
thx_unit_angle__$Turn_Turn_$Impl_$.toBinaryDegree = function(this1) {
	return thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(this1 * 256);
};
thx_unit_angle__$Turn_Turn_$Impl_$.toDegree = function(this1) {
	return thx_unit_angle__$Degree_Degree_$Impl_$._new(this1 * 360);
};
thx_unit_angle__$Turn_Turn_$Impl_$.toGrad = function(this1) {
	return thx_unit_angle__$Grad_Grad_$Impl_$._new(this1 * 400);
};
thx_unit_angle__$Turn_Turn_$Impl_$.toHourAngle = function(this1) {
	return thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(this1 * 24);
};
thx_unit_angle__$Turn_Turn_$Impl_$.toMinuteOfArc = function(this1) {
	return thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(this1 * 21600);
};
thx_unit_angle__$Turn_Turn_$Impl_$.toPoint = function(this1) {
	return thx_unit_angle__$Point_Point_$Impl_$._new(this1 * 32);
};
thx_unit_angle__$Turn_Turn_$Impl_$.toQuadrant = function(this1) {
	return thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(this1 * 4);
};
thx_unit_angle__$Turn_Turn_$Impl_$.toRadian = function(this1) {
	return thx_unit_angle__$Radian_Radian_$Impl_$._new(this1 * 6.28318530717959);
};
thx_unit_angle__$Turn_Turn_$Impl_$.toRevolution = function(this1) {
	return thx_unit_angle__$Revolution_Revolution_$Impl_$._new(this1);
};
thx_unit_angle__$Turn_Turn_$Impl_$.toSecondOfArc = function(this1) {
	return thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(this1 * 1296000);
};
thx_unit_angle__$Turn_Turn_$Impl_$.toSextant = function(this1) {
	return thx_unit_angle__$Sextant_Sextant_$Impl_$._new(this1 * 6);
};
thx_unit_angle__$Turn_Turn_$Impl_$.toString = function(this1) {
	return this1 + "τ";
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
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
thx_color_Color.names = new haxe_ds_StringMap();
var value = thx_color_Color.aliceblue = 15792383;
thx_color_Color.names.h["$" + "aliceblue"] = value;
thx_color_Color.names.h["$" + "alice blue"] = thx_color_Color.aliceblue;
var value1 = thx_color_Color.antiquewhite = 16444375;
thx_color_Color.names.h["$" + "antiquewhite"] = value1;
thx_color_Color.names.h["$" + "antique white"] = thx_color_Color.antiquewhite;
var value2 = thx_color_Color.aqua = 65535;
thx_color_Color.names.h["$" + "aqua"] = value2;
var value3 = thx_color_Color.aquamarine = 8388564;
thx_color_Color.names.h["$" + "aquamarine"] = value3;
var value4 = thx_color_Color.azure = 15794175;
thx_color_Color.names.h["$" + "azure"] = value4;
var value5 = thx_color_Color.beige = 16119260;
thx_color_Color.names.h["$" + "beige"] = value5;
var value6 = thx_color_Color.bisque = 16770244;
thx_color_Color.names.h["$" + "bisque"] = value6;
var value7 = thx_color_Color.black = 0;
thx_color_Color.names.h["$" + "black"] = value7;
var value8 = thx_color_Color.blanchedalmond = 16772045;
thx_color_Color.names.h["$" + "blanchedalmond"] = value8;
thx_color_Color.names.h["$" + "blanched almond"] = thx_color_Color.blanchedalmond;
var value9 = thx_color_Color.blue = 255;
thx_color_Color.names.h["$" + "blue"] = value9;
var value10 = thx_color_Color.blueviolet = 9055202;
thx_color_Color.names.h["$" + "blueviolet"] = value10;
thx_color_Color.names.h["$" + "blue violet"] = thx_color_Color.blueviolet;
var value11 = thx_color_Color.brown = 10824234;
thx_color_Color.names.h["$" + "brown"] = value11;
var value12 = thx_color_Color.burlywood = 14596231;
thx_color_Color.names.h["$" + "burlywood"] = value12;
thx_color_Color.names.h["$" + "burly wood"] = thx_color_Color.burlywood;
var value13 = thx_color_Color.cadetblue = 6266528;
thx_color_Color.names.h["$" + "cadetblue"] = value13;
thx_color_Color.names.h["$" + "cadet blue"] = thx_color_Color.cadetblue;
var value14 = thx_color_Color.chartreuse = 8388352;
thx_color_Color.names.h["$" + "chartreuse"] = value14;
thx_color_Color.names.h["$" + "chart reuse"] = thx_color_Color.chartreuse;
var value15 = thx_color_Color.chocolate = 13789470;
thx_color_Color.names.h["$" + "chocolate"] = value15;
var value16 = thx_color_Color.coral = 16744272;
thx_color_Color.names.h["$" + "coral"] = value16;
var value17 = thx_color_Color.cornflowerblue = 6591981;
thx_color_Color.names.h["$" + "cornflowerblue"] = value17;
thx_color_Color.names.h["$" + "corn flower blue"] = thx_color_Color.cornflowerblue;
var value18 = thx_color_Color.cornsilk = 16775388;
thx_color_Color.names.h["$" + "cornsilk"] = value18;
thx_color_Color.names.h["$" + "corn silk"] = thx_color_Color.cornsilk;
var value19 = thx_color_Color.crimson = 14423100;
thx_color_Color.names.h["$" + "crimson"] = value19;
var value20 = thx_color_Color.cyan = 65535;
thx_color_Color.names.h["$" + "cyan"] = value20;
var value21 = thx_color_Color.darkblue = 139;
thx_color_Color.names.h["$" + "darkblue"] = value21;
thx_color_Color.names.h["$" + "dark blue"] = thx_color_Color.darkblue;
var value22 = thx_color_Color.darkcyan = 35723;
thx_color_Color.names.h["$" + "darkcyan"] = value22;
thx_color_Color.names.h["$" + "dark cyan"] = thx_color_Color.darkcyan;
var value23 = thx_color_Color.darkgoldenrod = 12092939;
thx_color_Color.names.h["$" + "darkgoldenrod"] = value23;
thx_color_Color.names.h["$" + "dark golden rod"] = thx_color_Color.darkgoldenrod;
var value24 = thx_color_Color.darkgray = thx_color_Color.darkgrey = 11119017;
thx_color_Color.names.h["$" + "darkgray"] = value24;
thx_color_Color.names.h["$" + "dark gray"] = thx_color_Color.darkgray;
thx_color_Color.names.h["$" + "darkgrey"] = thx_color_Color.darkgrey;
thx_color_Color.names.h["$" + "dark grey"] = thx_color_Color.darkgrey;
var value25 = thx_color_Color.darkgreen = 25600;
thx_color_Color.names.h["$" + "darkgreen"] = value25;
thx_color_Color.names.h["$" + "dark green"] = thx_color_Color.darkgreen;
var value26 = thx_color_Color.darkkhaki = 12433259;
thx_color_Color.names.h["$" + "darkkhaki"] = value26;
thx_color_Color.names.h["$" + "dark khaki"] = thx_color_Color.darkkhaki;
var value27 = thx_color_Color.darkmagenta = 9109643;
thx_color_Color.names.h["$" + "darkmagenta"] = value27;
thx_color_Color.names.h["$" + "dark magenta"] = thx_color_Color.darkmagenta;
var value28 = thx_color_Color.darkolivegreen = 5597999;
thx_color_Color.names.h["$" + "darkolivegreen"] = value28;
thx_color_Color.names.h["$" + "dark olive green"] = thx_color_Color.darkolivegreen;
var value29 = thx_color_Color.darkorange = 16747520;
thx_color_Color.names.h["$" + "darkorange"] = value29;
thx_color_Color.names.h["$" + "dark orange"] = thx_color_Color.darkorange;
var value30 = thx_color_Color.darkorchid = 10040012;
thx_color_Color.names.h["$" + "darkorchid"] = value30;
thx_color_Color.names.h["$" + "dark orchid"] = thx_color_Color.darkorchid;
var value31 = thx_color_Color.darkred = 9109504;
thx_color_Color.names.h["$" + "darkred"] = value31;
thx_color_Color.names.h["$" + "dark red"] = thx_color_Color.darkred;
var value32 = thx_color_Color.darksalmon = 15308410;
thx_color_Color.names.h["$" + "darksalmon"] = value32;
thx_color_Color.names.h["$" + "dark salmon"] = thx_color_Color.darksalmon;
var value33 = thx_color_Color.darkseagreen = 9419919;
thx_color_Color.names.h["$" + "darkseagreen"] = value33;
thx_color_Color.names.h["$" + "dark sea green"] = thx_color_Color.darkseagreen;
var value34 = thx_color_Color.darkslateblue = 4734347;
thx_color_Color.names.h["$" + "darkslateblue"] = value34;
thx_color_Color.names.h["$" + "dark slate blue"] = thx_color_Color.darkslateblue;
var value35 = thx_color_Color.darkslategray = thx_color_Color.darkslategrey = 3100495;
thx_color_Color.names.h["$" + "darkslategray"] = value35;
thx_color_Color.names.h["$" + "dark slate gray"] = thx_color_Color.darkslategray;
thx_color_Color.names.h["$" + "darkslategrey"] = thx_color_Color.darkslategrey;
thx_color_Color.names.h["$" + "dark slate grey"] = thx_color_Color.darkslategrey;
var value36 = thx_color_Color.darkturquoise = 52945;
thx_color_Color.names.h["$" + "darkturquoise"] = value36;
thx_color_Color.names.h["$" + "dark turquoise"] = thx_color_Color.darkturquoise;
var value37 = thx_color_Color.darkviolet = 9699539;
thx_color_Color.names.h["$" + "darkviolet"] = value37;
thx_color_Color.names.h["$" + "dark violet"] = thx_color_Color.darkviolet;
var value38 = thx_color_Color.deeppink = 16716947;
thx_color_Color.names.h["$" + "deeppink"] = value38;
thx_color_Color.names.h["$" + "deep pink"] = thx_color_Color.deeppink;
var value39 = thx_color_Color.deepskyblue = 49151;
thx_color_Color.names.h["$" + "deepskyblue"] = value39;
thx_color_Color.names.h["$" + "deep sky blue"] = thx_color_Color.deepskyblue;
var value40 = thx_color_Color.dimgray = thx_color_Color.dimgrey = 6908265;
thx_color_Color.names.h["$" + "dimgray"] = value40;
thx_color_Color.names.h["$" + "dim gray"] = thx_color_Color.dimgray;
thx_color_Color.names.h["$" + "dimgrey"] = thx_color_Color.dimgrey;
thx_color_Color.names.h["$" + "dim grey"] = thx_color_Color.dimgrey;
var value41 = thx_color_Color.dodgerblue = 2003199;
thx_color_Color.names.h["$" + "dodgerblue"] = value41;
thx_color_Color.names.h["$" + "dodger blue"] = thx_color_Color.dodgerblue;
var value42 = thx_color_Color.firebrick = 11674146;
thx_color_Color.names.h["$" + "firebrick"] = value42;
thx_color_Color.names.h["$" + "fire brick"] = thx_color_Color.firebrick;
var value43 = thx_color_Color.floralwhite = 16775920;
thx_color_Color.names.h["$" + "floralwhite"] = value43;
thx_color_Color.names.h["$" + "floral white"] = thx_color_Color.floralwhite;
var value44 = thx_color_Color.forestgreen = 2263842;
thx_color_Color.names.h["$" + "forestgreen"] = value44;
thx_color_Color.names.h["$" + "forest green"] = thx_color_Color.forestgreen;
var value45 = thx_color_Color.fuchsia = 16711935;
thx_color_Color.names.h["$" + "fuchsia"] = value45;
var value46 = thx_color_Color.gainsboro = 14474460;
thx_color_Color.names.h["$" + "gainsboro"] = value46;
var value47 = thx_color_Color.ghostwhite = 16316671;
thx_color_Color.names.h["$" + "ghostwhite"] = value47;
thx_color_Color.names.h["$" + "ghost white"] = thx_color_Color.ghostwhite;
var value48 = thx_color_Color.gold = 16766720;
thx_color_Color.names.h["$" + "gold"] = value48;
var value49 = thx_color_Color.goldenrod = 14329120;
thx_color_Color.names.h["$" + "goldenrod"] = value49;
thx_color_Color.names.h["$" + "golden rod"] = thx_color_Color.goldenrod;
var value50 = thx_color_Color.gray = thx_color_Color.grey = 8421504;
thx_color_Color.names.h["$" + "gray"] = value50;
thx_color_Color.names.h["$" + "grey"] = thx_color_Color.grey;
var value51 = thx_color_Color.green = 32768;
thx_color_Color.names.h["$" + "green"] = value51;
var value52 = thx_color_Color.greenyellow = 11403055;
thx_color_Color.names.h["$" + "greenyellow"] = value52;
thx_color_Color.names.h["$" + "green yellow"] = thx_color_Color.greenyellow;
var value53 = thx_color_Color.honeydew = 15794160;
thx_color_Color.names.h["$" + "honeydew"] = value53;
thx_color_Color.names.h["$" + "honey dew"] = thx_color_Color.honeydew;
var value54 = thx_color_Color.hotpink = 16738740;
thx_color_Color.names.h["$" + "hotpink"] = value54;
thx_color_Color.names.h["$" + "hot pink"] = thx_color_Color.hotpink;
var value55 = thx_color_Color.indianred = 13458524;
thx_color_Color.names.h["$" + "indianred"] = value55;
thx_color_Color.names.h["$" + "indian red"] = thx_color_Color.indianred;
var value56 = thx_color_Color.indigo = 4915330;
thx_color_Color.names.h["$" + "indigo"] = value56;
var value57 = thx_color_Color.ivory = 16777200;
thx_color_Color.names.h["$" + "ivory"] = value57;
var value58 = thx_color_Color.khaki = 15787660;
thx_color_Color.names.h["$" + "khaki"] = value58;
var value59 = thx_color_Color.lavender = 15132410;
thx_color_Color.names.h["$" + "lavender"] = value59;
var value60 = thx_color_Color.lavenderblush = 16773365;
thx_color_Color.names.h["$" + "lavenderblush"] = value60;
thx_color_Color.names.h["$" + "lavender blush"] = thx_color_Color.lavenderblush;
var value61 = thx_color_Color.lawngreen = 8190976;
thx_color_Color.names.h["$" + "lawngreen"] = value61;
thx_color_Color.names.h["$" + "lawn green"] = thx_color_Color.lawngreen;
var value62 = thx_color_Color.lemonchiffon = 16775885;
thx_color_Color.names.h["$" + "lemonchiffon"] = value62;
thx_color_Color.names.h["$" + "lemon chiffon"] = thx_color_Color.lemonchiffon;
var value63 = thx_color_Color.lightblue = 11393254;
thx_color_Color.names.h["$" + "lightblue"] = value63;
thx_color_Color.names.h["$" + "light blue"] = thx_color_Color.lightblue;
var value64 = thx_color_Color.lightcoral = 15761536;
thx_color_Color.names.h["$" + "lightcoral"] = value64;
thx_color_Color.names.h["$" + "light coral"] = thx_color_Color.lightcoral;
var value65 = thx_color_Color.lightcyan = 14745599;
thx_color_Color.names.h["$" + "lightcyan"] = value65;
thx_color_Color.names.h["$" + "light cyan"] = thx_color_Color.lightcyan;
var value66 = thx_color_Color.lightgoldenrodyellow = 16448210;
thx_color_Color.names.h["$" + "lightgoldenrodyellow"] = value66;
thx_color_Color.names.h["$" + "light golden rod yellow"] = thx_color_Color.lightgoldenrodyellow;
var value67 = thx_color_Color.lightgray = thx_color_Color.lightgrey = 13882323;
thx_color_Color.names.h["$" + "lightgray"] = value67;
thx_color_Color.names.h["$" + "light gray"] = thx_color_Color.lightgray;
thx_color_Color.names.h["$" + "lightgrey"] = thx_color_Color.lightgrey;
thx_color_Color.names.h["$" + "light grey"] = thx_color_Color.lightgrey;
var value68 = thx_color_Color.lightgreen = 9498256;
thx_color_Color.names.h["$" + "lightgreen"] = value68;
thx_color_Color.names.h["$" + "light green"] = thx_color_Color.lightgreen;
var value69 = thx_color_Color.lightpink = 16758465;
thx_color_Color.names.h["$" + "lightpink"] = value69;
thx_color_Color.names.h["$" + "light pink"] = thx_color_Color.lightpink;
var value70 = thx_color_Color.lightsalmon = 16752762;
thx_color_Color.names.h["$" + "lightsalmon"] = value70;
thx_color_Color.names.h["$" + "light salmon"] = thx_color_Color.lightsalmon;
var value71 = thx_color_Color.lightseagreen = 2142890;
thx_color_Color.names.h["$" + "lightseagreen"] = value71;
thx_color_Color.names.h["$" + "light sea green"] = thx_color_Color.lightseagreen;
var value72 = thx_color_Color.lightskyblue = 8900346;
thx_color_Color.names.h["$" + "lightskyblue"] = value72;
thx_color_Color.names.h["$" + "light sky blue"] = thx_color_Color.lightskyblue;
var value73 = thx_color_Color.lightslategray = thx_color_Color.lightslategrey = 7833753;
thx_color_Color.names.h["$" + "lightslategray"] = value73;
thx_color_Color.names.h["$" + "light slate gray"] = thx_color_Color.lightslategray;
thx_color_Color.names.h["$" + "lightslategrey"] = thx_color_Color.lightslategrey;
thx_color_Color.names.h["$" + "light slate grey"] = thx_color_Color.lightslategrey;
var value74 = thx_color_Color.lightsteelblue = 11584734;
thx_color_Color.names.h["$" + "lightsteelblue"] = value74;
thx_color_Color.names.h["$" + "light steel blue"] = thx_color_Color.lightsteelblue;
var value75 = thx_color_Color.lightyellow = 16777184;
thx_color_Color.names.h["$" + "lightyellow"] = value75;
thx_color_Color.names.h["$" + "light yellow"] = thx_color_Color.lightyellow;
var value76 = thx_color_Color.lime = 65280;
thx_color_Color.names.h["$" + "lime"] = value76;
var value77 = thx_color_Color.limegreen = 3329330;
thx_color_Color.names.h["$" + "limegreen"] = value77;
thx_color_Color.names.h["$" + "lime green"] = thx_color_Color.limegreen;
var value78 = thx_color_Color.linen = 16445670;
thx_color_Color.names.h["$" + "linen"] = value78;
var value79 = thx_color_Color.magenta = 16711935;
thx_color_Color.names.h["$" + "magenta"] = value79;
var value80 = thx_color_Color.maroon = 8388608;
thx_color_Color.names.h["$" + "maroon"] = value80;
var value81 = thx_color_Color.mediumaquamarine = 6737322;
thx_color_Color.names.h["$" + "mediumaquamarine"] = value81;
thx_color_Color.names.h["$" + "mediuma quamarine"] = thx_color_Color.mediumaquamarine;
var value82 = thx_color_Color.mediumblue = 205;
thx_color_Color.names.h["$" + "mediumblue"] = value82;
thx_color_Color.names.h["$" + "medium blue"] = thx_color_Color.mediumblue;
var value83 = thx_color_Color.mediumorchid = 12211667;
thx_color_Color.names.h["$" + "mediumorchid"] = value83;
thx_color_Color.names.h["$" + "medium orchid"] = thx_color_Color.mediumorchid;
var value84 = thx_color_Color.mediumpurple = 9662683;
thx_color_Color.names.h["$" + "mediumpurple"] = value84;
thx_color_Color.names.h["$" + "medium purple"] = thx_color_Color.mediumpurple;
var value85 = thx_color_Color.mediumseagreen = 3978097;
thx_color_Color.names.h["$" + "mediumseagreen"] = value85;
thx_color_Color.names.h["$" + "medium sea green"] = thx_color_Color.mediumseagreen;
var value86 = thx_color_Color.mediumslateblue = 8087790;
thx_color_Color.names.h["$" + "mediumslateblue"] = value86;
thx_color_Color.names.h["$" + "medium slate blue"] = thx_color_Color.mediumslateblue;
var value87 = thx_color_Color.mediumspringgreen = 64154;
thx_color_Color.names.h["$" + "mediumspringgreen"] = value87;
thx_color_Color.names.h["$" + "medium spring green"] = thx_color_Color.mediumspringgreen;
var value88 = thx_color_Color.mediumturquoise = 4772300;
thx_color_Color.names.h["$" + "mediumturquoise"] = value88;
thx_color_Color.names.h["$" + "medium turquoise"] = thx_color_Color.mediumturquoise;
var value89 = thx_color_Color.mediumvioletred = 13047173;
thx_color_Color.names.h["$" + "mediumvioletred"] = value89;
thx_color_Color.names.h["$" + "medium violet red"] = thx_color_Color.mediumvioletred;
var value90 = thx_color_Color.midnightblue = 1644912;
thx_color_Color.names.h["$" + "midnightblue"] = value90;
thx_color_Color.names.h["$" + "midnight blue"] = thx_color_Color.midnightblue;
var value91 = thx_color_Color.mintcream = 16121850;
thx_color_Color.names.h["$" + "mintcream"] = value91;
thx_color_Color.names.h["$" + "mint cream"] = thx_color_Color.mintcream;
var value92 = thx_color_Color.mistyrose = 16770273;
thx_color_Color.names.h["$" + "mistyrose"] = value92;
thx_color_Color.names.h["$" + "misty rose"] = thx_color_Color.mistyrose;
var value93 = thx_color_Color.moccasin = 16770229;
thx_color_Color.names.h["$" + "moccasin"] = value93;
var value94 = thx_color_Color.navajowhite = 16768685;
thx_color_Color.names.h["$" + "navajowhite"] = value94;
thx_color_Color.names.h["$" + "navajo white"] = thx_color_Color.navajowhite;
var value95 = thx_color_Color.navy = 128;
thx_color_Color.names.h["$" + "navy"] = value95;
var value96 = thx_color_Color.oldlace = 16643558;
thx_color_Color.names.h["$" + "oldlace"] = value96;
thx_color_Color.names.h["$" + "old lace"] = thx_color_Color.oldlace;
var value97 = thx_color_Color.olive = 8421376;
thx_color_Color.names.h["$" + "olive"] = value97;
var value98 = thx_color_Color.olivedrab = 7048739;
thx_color_Color.names.h["$" + "olivedrab"] = value98;
thx_color_Color.names.h["$" + "olive drab"] = thx_color_Color.olivedrab;
var value99 = thx_color_Color.orange = 16753920;
thx_color_Color.names.h["$" + "orange"] = value99;
var value100 = thx_color_Color.orangered = 16729344;
thx_color_Color.names.h["$" + "orangered"] = value100;
thx_color_Color.names.h["$" + "orange red"] = thx_color_Color.orangered;
var value101 = thx_color_Color.orchid = 14315734;
thx_color_Color.names.h["$" + "orchid"] = value101;
var value102 = thx_color_Color.palegoldenrod = 15657130;
thx_color_Color.names.h["$" + "palegoldenrod"] = value102;
thx_color_Color.names.h["$" + "pale golden rod"] = thx_color_Color.palegoldenrod;
var value103 = thx_color_Color.palegreen = 10025880;
thx_color_Color.names.h["$" + "palegreen"] = value103;
thx_color_Color.names.h["$" + "pale green"] = thx_color_Color.palegreen;
var value104 = thx_color_Color.paleturquoise = 11529966;
thx_color_Color.names.h["$" + "paleturquoise"] = value104;
thx_color_Color.names.h["$" + "pale turquoise"] = thx_color_Color.paleturquoise;
var value105 = thx_color_Color.palevioletred = 14381203;
thx_color_Color.names.h["$" + "palevioletred"] = value105;
thx_color_Color.names.h["$" + "pale violet red"] = thx_color_Color.palevioletred;
var value106 = thx_color_Color.papayawhip = 16773077;
thx_color_Color.names.h["$" + "papayawhip"] = value106;
thx_color_Color.names.h["$" + "papaya whip"] = thx_color_Color.papayawhip;
var value107 = thx_color_Color.peachpuff = 16767673;
thx_color_Color.names.h["$" + "peachpuff"] = value107;
thx_color_Color.names.h["$" + "peach puff"] = thx_color_Color.peachpuff;
var value108 = thx_color_Color.peru = 13468991;
thx_color_Color.names.h["$" + "peru"] = value108;
var value109 = thx_color_Color.pink = 16761035;
thx_color_Color.names.h["$" + "pink"] = value109;
var value110 = thx_color_Color.plum = 14524637;
thx_color_Color.names.h["$" + "plum"] = value110;
var value111 = thx_color_Color.powderblue = 11591910;
thx_color_Color.names.h["$" + "powderblue"] = value111;
thx_color_Color.names.h["$" + "powder blue"] = thx_color_Color.powderblue;
var value112 = thx_color_Color.purple = 8388736;
thx_color_Color.names.h["$" + "purple"] = value112;
var value113 = thx_color_Color.red = 16711680;
thx_color_Color.names.h["$" + "red"] = value113;
var value114 = thx_color_Color.rosybrown = 12357519;
thx_color_Color.names.h["$" + "rosybrown"] = value114;
thx_color_Color.names.h["$" + "rosy brown"] = thx_color_Color.rosybrown;
var value115 = thx_color_Color.royalblue = 4286945;
thx_color_Color.names.h["$" + "royalblue"] = value115;
thx_color_Color.names.h["$" + "royal blue"] = thx_color_Color.royalblue;
var value116 = thx_color_Color.saddlebrown = 9127187;
thx_color_Color.names.h["$" + "saddlebrown"] = value116;
thx_color_Color.names.h["$" + "saddle brown"] = thx_color_Color.saddlebrown;
var value117 = thx_color_Color.salmon = 16416882;
thx_color_Color.names.h["$" + "salmon"] = value117;
var value118 = thx_color_Color.sandybrown = 16032864;
thx_color_Color.names.h["$" + "sandybrown"] = value118;
thx_color_Color.names.h["$" + "sandy brown"] = thx_color_Color.sandybrown;
var value119 = thx_color_Color.seagreen = 3050327;
thx_color_Color.names.h["$" + "seagreen"] = value119;
thx_color_Color.names.h["$" + "sea green"] = thx_color_Color.seagreen;
var value120 = thx_color_Color.seashell = 16774638;
thx_color_Color.names.h["$" + "seashell"] = value120;
thx_color_Color.names.h["$" + "sea shell"] = thx_color_Color.seashell;
var value121 = thx_color_Color.sienna = 10506797;
thx_color_Color.names.h["$" + "sienna"] = value121;
var value122 = thx_color_Color.silver = 12632256;
thx_color_Color.names.h["$" + "silver"] = value122;
var value123 = thx_color_Color.skyblue = 8900331;
thx_color_Color.names.h["$" + "skyblue"] = value123;
thx_color_Color.names.h["$" + "sky blue"] = thx_color_Color.skyblue;
var value124 = thx_color_Color.slateblue = 6970061;
thx_color_Color.names.h["$" + "slateblue"] = value124;
thx_color_Color.names.h["$" + "slate blue"] = thx_color_Color.slateblue;
var value125 = thx_color_Color.slategray = thx_color_Color.slategrey = 7372944;
thx_color_Color.names.h["$" + "slategray"] = value125;
thx_color_Color.names.h["$" + "slate gray"] = thx_color_Color.slategray;
thx_color_Color.names.h["$" + "slategrey"] = thx_color_Color.slategrey;
thx_color_Color.names.h["$" + "slate grey"] = thx_color_Color.slategrey;
var value126 = thx_color_Color.snow = 16775930;
thx_color_Color.names.h["$" + "snow"] = value126;
var value127 = thx_color_Color.springgreen = 65407;
thx_color_Color.names.h["$" + "springgreen"] = value127;
thx_color_Color.names.h["$" + "spring green"] = thx_color_Color.springgreen;
var value128 = thx_color_Color.steelblue = 4620980;
thx_color_Color.names.h["$" + "steelblue"] = value128;
thx_color_Color.names.h["$" + "steel blue"] = thx_color_Color.steelblue;
var value129 = thx_color_Color.tan = 13808780;
thx_color_Color.names.h["$" + "tan"] = value129;
var value130 = thx_color_Color.teal = 32896;
thx_color_Color.names.h["$" + "teal"] = value130;
var value131 = thx_color_Color.thistle = 14204888;
thx_color_Color.names.h["$" + "thistle"] = value131;
var value132 = thx_color_Color.tomato = 16737095;
thx_color_Color.names.h["$" + "tomato"] = value132;
var value133 = thx_color_Color.turquoise = 4251856;
thx_color_Color.names.h["$" + "turquoise"] = value133;
var value134 = thx_color_Color.violet = 15631086;
thx_color_Color.names.h["$" + "violet"] = value134;
var value135 = thx_color_Color.wheat = 16113331;
thx_color_Color.names.h["$" + "wheat"] = value135;
var value136 = thx_color_Color.white = 16777215;
thx_color_Color.names.h["$" + "white"] = value136;
var value137 = thx_color_Color.whitesmoke = 16119285;
thx_color_Color.names.h["$" + "whitesmoke"] = value137;
thx_color_Color.names.h["$" + "white smoke"] = thx_color_Color.whitesmoke;
var value138 = thx_color_Color.yellow = 16776960;
thx_color_Color.names.h["$" + "yellow"] = value138;
var value139 = thx_color_Color.yellowgreen = 10145074;
thx_color_Color.names.h["$" + "yellowgreen"] = value139;
thx_color_Color.names.h["$" + "yellow green"] = thx_color_Color.yellowgreen;

      // Production steps of ECMA-262, Edition 5, 15.4.4.21
      // Reference: http://es5.github.io/#x15.4.4.21
      if (!Array.prototype.reduce) {
        Array.prototype.reduce = function(callback /*, initialValue*/) {
          'use strict';
          if (this == null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
          }
          if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
          }
          var t = Object(this), len = t.length >>> 0, k = 0, value;
          if (arguments.length == 2) {
            value = arguments[1];
          } else {
            while (k < len && ! k in t) {
              k++;
            }
            if (k >= len) {
              throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
          }
          for (; k < len; k++) {
            if (k in t) {
              value = callback(value, t[k], k, t);
            }
          }
          return value;
        };
      }
    ;
var scope = ("undefined" !== typeof window && window) || ("undefined" !== typeof global && global) || this;
if(!scope.setImmediate) scope.setImmediate = function(callback) {
	scope.setTimeout(callback,0);
};
var lastTime = 0;
var vendors = ["webkit","moz"];
var x = 0;
while(x < vendors.length && !scope.requestAnimationFrame) {
	scope.requestAnimationFrame = scope[vendors[x] + "RequestAnimationFrame"];
	scope.cancelAnimationFrame = scope[vendors[x] + "CancelAnimationFrame"] || scope[vendors[x] + "CancelRequestAnimationFrame"];
	x++;
}
if(!scope.requestAnimationFrame) scope.requestAnimationFrame = function(callback1) {
	var currTime = new Date().getTime();
	var timeToCall = Math.max(0,16 - (currTime - lastTime));
	var id = scope.setTimeout(function() {
		callback1(currTime + timeToCall);
	},timeToCall);
	lastTime = currTime + timeToCall;
	return id;
};
if(!scope.cancelAnimationFrame) scope.cancelAnimationFrame = function(id1) {
	scope.clearTimeout(id1);
};
if(typeof(scope.performance) == "undefined") scope.performance = { };
if(typeof(scope.performance.now) == "undefined") {
	var nowOffset = new Date().getTime();
	if(scope.performance.timing && scope.performance.timing.navigationStart) nowOffset = scope.performance.timing.navigationStart;
	scope.performance.now = (function($this) {
		var $r;
		var now = function() {
			return new Date() - nowOffset;
		};
		$r = now;
		return $r;
	}(this));
}
MiniCanvas.defaultNodeScaleMode = ScaleMode.NoScale;
MiniCanvas.defaultBrowserScaleMode = ScaleMode.Auto;
MiniCanvas.displayGenerationTime = false;
MiniCanvas.imagePath = "images";
MiniCanvas.parentNode = typeof document != 'undefined' && document.body;
MiniCanvas._backingStoreRatio = 0;
chad_render_LineStyle.defaultColor = -16777216;
js_Boot.__toStr = {}.toString;
thx_color__$Grey_Grey_$Impl_$.black = 0;
thx_color__$Grey_Grey_$Impl_$.white = 1;
thx_color_parse_ColorParser.parser = new thx_color_parse_ColorParser();
thx_color_parse_ColorParser.isPureHex = new EReg("^([0-9a-f]{2}){3,4}$","i");
thx_core_Floats.TOLERANCE = 10e-5;
thx_core_Floats.EPSILON = 10e-10;
thx_core_Floats.pattern_parse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
thx_core_Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
thx_core_Ints.BASE = "0123456789abcdefghijklmnopqrstuvwxyz";
thx_core_Strings.UCWORDS = new EReg("[^a-zA-Z]([a-z])","g");
thx_core_Strings.UCWORDSWS = new EReg("\\s[a-z]","g");
thx_core_Strings.ALPHANUM = new EReg("^[a-z0-9]+$","i");
thx_core_Strings.DIGITS = new EReg("^[0-9]+$","");
thx_core_Strings.STRIPTAGS = new EReg("</?[a-z]+[^>]*?/?>","gi");
thx_core_Strings.WSG = new EReg("\\s+","g");
thx_core_Strings.SPLIT_LINES = new EReg("\r\n|\n\r|\n|\r","g");
thx_core_Timer.FRAME_RATE = Math.round(16.6666666666666679);
thx_geom_EdgeCubic.NEAR_FLAT = 1.000000001;
thx_geom__$Matrix4x4_Matrix4x4_$Impl_$.identity = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
thx_geom_Plane.COPLANAR = 0;
thx_geom_Plane.FRONT = 1;
thx_geom_Plane.BACK = 2;
thx_geom_Plane.SPANNING = 3;
thx_geom__$Point3D_Point3D_$Impl_$.zero = [0,0,0];
thx_geom_OrthoNormalBasis.z0Plane = new thx_geom_OrthoNormalBasis(new thx_geom_Plane([0,0,1],0),[1,0,0]);
thx_geom__$Point_Point_$Impl_$.zero = [0,0];
thx_geom_Transformables.MX = new thx_geom_Plane([1,0,0],0);
thx_geom_Transformables.MY = new thx_geom_Plane([0,1,0],0);
thx_geom_Transformables.MZ = new thx_geom_Plane([0,0,1],0);
thx_geom_shape__$Circle_Circle_$Impl_$.unitaryCircle = new thx_geom_Spline([new thx_geom_SplineNode([1,0],[1,-0.552284749830793564],[1,0.5522847498307936]),new thx_geom_SplineNode([0,-1],[-0.552284749830793564,-1],[0.5522847498307936,-1]),new thx_geom_SplineNode([-1,0],[-1,0.5522847498307936],[-1,-0.552284749830793564]),new thx_geom_SplineNode([0,1],[0.5522847498307936,1],[-0.552284749830793564,1])],true);
thx_math_Const.TWO_PI = 6.283185307179586477;
thx_math_Const.PI = 3.141592653589793238;
thx_math_Const.HALF_PI = 1.570796326794896619;
thx_math_Const.TO_DEGREE = 57.29577951308232088;
thx_math_Const.TO_RADIAN = 0.01745329251994329577;
thx_math_Const.LN10 = 2.302585092994046;
thx_math_Const.E = 2.71828182845904523536;
thx_math_Const.GOLDEN_RATIO = 1.6180339887498948482;
thx_math_Const.EULER = 0.5772156649015329;
thx_math_Const.KAPPA = 0.5522847498307936;
thx_math_Const.INT16_MAX = 32767;
thx_math_Const.INT16_MIN = -32768;
thx_math_Const.INT32_MAX = 2147483647;
thx_math_Const.INT32_MIN = -2147483648;
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.turn = thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$._new(256);
thx_unit_angle__$BinaryDegree_BinaryDegree_$Impl_$.symbol = "binary degree";
thx_unit_angle__$Degree_Degree_$Impl_$.turn = thx_unit_angle__$Degree_Degree_$Impl_$._new(360);
thx_unit_angle__$Degree_Degree_$Impl_$.symbol = "°";
thx_unit_angle__$Grad_Grad_$Impl_$.turn = thx_unit_angle__$Grad_Grad_$Impl_$._new(400);
thx_unit_angle__$Grad_Grad_$Impl_$.symbol = "grad";
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.turn = thx_unit_angle__$HourAngle_HourAngle_$Impl_$._new(24);
thx_unit_angle__$HourAngle_HourAngle_$Impl_$.symbol = "hour";
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.turn = thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$._new(21600);
thx_unit_angle__$MinuteOfArc_MinuteOfArc_$Impl_$.symbol = "′";
thx_unit_angle__$Point_Point_$Impl_$.turn = thx_unit_angle__$Point_Point_$Impl_$._new(32);
thx_unit_angle__$Point_Point_$Impl_$.symbol = "point";
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.turn = thx_unit_angle__$Quadrant_Quadrant_$Impl_$._new(4);
thx_unit_angle__$Quadrant_Quadrant_$Impl_$.symbol = "quad.";
thx_unit_angle__$Radian_Radian_$Impl_$.turn = thx_unit_angle__$Radian_Radian_$Impl_$._new(6.28318530717959);
thx_unit_angle__$Radian_Radian_$Impl_$.symbol = "rad";
thx_unit_angle__$Revolution_Revolution_$Impl_$.turn = thx_unit_angle__$Revolution_Revolution_$Impl_$._new(1);
thx_unit_angle__$Revolution_Revolution_$Impl_$.symbol = "r";
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.turn = thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$._new(1296000);
thx_unit_angle__$SecondOfArc_SecondOfArc_$Impl_$.symbol = "″";
thx_unit_angle__$Sextant_Sextant_$Impl_$.turn = thx_unit_angle__$Sextant_Sextant_$Impl_$._new(6);
thx_unit_angle__$Sextant_Sextant_$Impl_$.symbol = "sextant";
thx_unit_angle__$Turn_Turn_$Impl_$.turn = thx_unit_angle__$Turn_Turn_$Impl_$._new(1);
thx_unit_angle__$Turn_Turn_$Impl_$.symbol = "τ";
Boolean.main();
})();
