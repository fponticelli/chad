(function () { "use strict";
var console = (1,eval)('this').console || {log:function(){}};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Canvas = function() { };
Canvas.__name__ = true;
Canvas.main = function() {
	Canvas.sample("simple",null,null,function(g) {
		g.begin();
		g.moveTo(10,10);
		g.lineTo(100,100);
		g.lineTo(190,10);
		g.lineTo(10,10);
		g.stroke();
	});
};
Canvas.sample = function(name,width,height,callback) {
	if(height == null) height = 200;
	if(width == null) width = 200;
	var canvas = new MiniCanvas(width,height);
	var g = new chad_render_CanvasGraphics(canvas.canvas);
	callback(g);
	canvas.display(name);
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
HxOverrides.__name__ = true;
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
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
Math.__name__ = true;
var ScaleMode = { __ename__ : true, __constructs__ : ["NoScale","Auto","Scaled"] };
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
MiniCanvas.__name__ = true;
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
	processScale: function() {
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
var Std = function() { };
Std.__name__ = true;
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
StringBuf.__name__ = true;
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = true;
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
var chad_render_IGraphics = function() { };
chad_render_IGraphics.__name__ = true;
chad_render_IGraphics.prototype = {
	__class__: chad_render_IGraphics
};
var chad_render_CanvasGraphics = function(canvas) {
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
};
chad_render_CanvasGraphics.__name__ = true;
chad_render_CanvasGraphics.__interfaces__ = [chad_render_IGraphics];
chad_render_CanvasGraphics.prototype = {
	begin: function() {
		this.ctx.beginPath();
	}
	,curveTo: function(coutx,couty,cinx,ciny,x,y) {
		this.ctx.bezierCurveTo(coutx,couty,cinx,ciny,x,y);
	}
	,lineTo: function(x,y) {
		this.ctx.lineTo(x,y);
	}
	,moveTo: function(x,y) {
		this.ctx.moveTo(x,y);
	}
	,fill: function(fillStyle) {
		if(fillStyle == null) {
		} else {
			var color = fillStyle[2];
			this.ctx.fillStyle = "rgba(" + color[0] * 100 + "%," + color[1] * 100 + "%," + color[2] * 100 + "%," + color[3] + ")";
		}
		this.ctx.fill();
	}
	,stroke: function(width,color,join,cap,strokeStyle) {
		if(null != width) this.ctx.lineWidth = width;
		if(null != color) this.ctx.strokeStyle = "rgba(" + color[0] * 100 + "%," + color[1] * 100 + "%," + color[2] * 100 + "%," + color[3] + ")";
		if(null != join) this.ctx.lineJoin = join;
		if(null != cap) this.ctx.lineCap = cap;
		if(strokeStyle == null) {
		} else switch(strokeStyle[1]) {
		case 0:
			this.ctx.setLineDash([]);
			break;
		case 1:
			var pattern = strokeStyle[2];
			this.ctx.setLineDash(pattern);
			break;
		case 2:
			var interval = strokeStyle[2];
			this.ctx.setLineDash([1,interval]);
			break;
		}
		this.ctx.stroke();
	}
	,__class__: chad_render_CanvasGraphics
};
var chad_render_FillStyle = { __ename__ : true, __constructs__ : ["FillColor"] };
chad_render_FillStyle.FillColor = function(c) { var $x = ["FillColor",0,c]; $x.__enum__ = chad_render_FillStyle; return $x; };
var chad_render_StrokeStyle = { __ename__ : true, __constructs__ : ["Solid","Dashed","Dotted"] };
chad_render_StrokeStyle.Solid = ["Solid",0];
chad_render_StrokeStyle.Solid.__enum__ = chad_render_StrokeStyle;
chad_render_StrokeStyle.Dashed = function(pattern) { var $x = ["Dashed",1,pattern]; $x.__enum__ = chad_render_StrokeStyle; return $x; };
chad_render_StrokeStyle.Dotted = function(spacing) { var $x = ["Dotted",2,spacing]; $x.__enum__ = chad_render_StrokeStyle; return $x; };
var haxe_StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; return $x; };
var haxe_CallStack = function() { };
haxe_CallStack.__name__ = true;
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
haxe_IMap.__name__ = true;
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	__class__: haxe_ds_StringMap
};
var js_Boot = function() { };
js_Boot.__name__ = true;
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
thx_color__$CIELCh_CIELCh_$Impl_$.__name__ = true;
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
thx_color__$CIELab_CIELab_$Impl_$.__name__ = true;
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
thx_color__$CMY_CMY_$Impl_$.__name__ = true;
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
thx_color__$CMYK_CMYK_$Impl_$.__name__ = true;
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
thx_color_Color.__name__ = true;
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
thx_color__$Grey_Grey_$Impl_$.__name__ = true;
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
thx_color__$HSL_HSL_$Impl_$.__name__ = true;
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
thx_color__$HSLA_HSLA_$Impl_$.__name__ = true;
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
thx_color__$HSV_HSV_$Impl_$.__name__ = true;
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
thx_color__$HSVA_HSVA_$Impl_$.__name__ = true;
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
thx_color__$RGB_RGB_$Impl_$.__name__ = true;
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
thx_color__$RGBA_RGBA_$Impl_$.__name__ = true;
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
thx_color__$RGBX_RGBX_$Impl_$.__name__ = true;
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
thx_color__$RGBXA_RGBXA_$Impl_$.__name__ = true;
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
thx_color__$XYZ_XYZ_$Impl_$.__name__ = true;
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
thx_color__$Yxy_Yxy_$Impl_$.__name__ = true;
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
thx_color_parse_ColorParser.__name__ = true;
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
	processHex: function(s) {
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
thx_color_parse_ColorInfo.__name__ = true;
thx_color_parse_ColorInfo.prototype = {
	toString: function() {
		return "" + this.name + ", channels: " + Std.string(this.channels);
	}
	,__class__: thx_color_parse_ColorInfo
};
var thx_color_parse_ChannelInfo = { __ename__ : true, __constructs__ : ["CIPercent","CIFloat","CIDegree","CIInt8","CIInt","CIBool"] };
thx_color_parse_ChannelInfo.CIPercent = function(value) { var $x = ["CIPercent",0,value]; $x.__enum__ = thx_color_parse_ChannelInfo; return $x; };
thx_color_parse_ChannelInfo.CIFloat = function(value) { var $x = ["CIFloat",1,value]; $x.__enum__ = thx_color_parse_ChannelInfo; return $x; };
thx_color_parse_ChannelInfo.CIDegree = function(value) { var $x = ["CIDegree",2,value]; $x.__enum__ = thx_color_parse_ChannelInfo; return $x; };
thx_color_parse_ChannelInfo.CIInt8 = function(value) { var $x = ["CIInt8",3,value]; $x.__enum__ = thx_color_parse_ChannelInfo; return $x; };
thx_color_parse_ChannelInfo.CIInt = function(value) { var $x = ["CIInt",4,value]; $x.__enum__ = thx_color_parse_ChannelInfo; return $x; };
thx_color_parse_ChannelInfo.CIBool = function(value) { var $x = ["CIBool",5,value]; $x.__enum__ = thx_color_parse_ChannelInfo; return $x; };
var thx_core_Arrays = function() { };
thx_core_Arrays.__name__ = true;
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
thx_core_Arrays.rotate = function(arr) {
	var result = [];
	var _g1 = 0;
	var _g = arr[0].length;
	while(_g1 < _g) {
		var i = _g1++;
		var row = [];
		result.push(row);
		var _g3 = 0;
		var _g2 = arr.length;
		while(_g3 < _g2) {
			var j = _g3++;
			row.push(arr[j][i]);
		}
	}
	return result;
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
thx_core_ArrayFloats.__name__ = true;
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
thx_core_ArrayInts.__name__ = true;
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
thx_core_ArrayStrings.__name__ = true;
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
thx_core_Error.__name__ = true;
thx_core_Error.fromDynamic = function(err,pos) {
	if(js_Boot.__instanceof(err,thx_core_Error)) return err;
	return new thx_core_Error("" + Std.string(err),null,pos);
};
thx_core_Error.__super__ = Error;
thx_core_Error.prototype = $extend(Error.prototype,{
	toString: function() {
		return this.message + "\nfrom: " + this.pos.className + "." + this.pos.methodName + "() at " + this.pos.lineNumber + "\n\n" + haxe_CallStack.toString(this.stackItems);
	}
	,__class__: thx_core_Error
});
var thx_core_Floats = function() { };
thx_core_Floats.__name__ = true;
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
thx_core_Functions0.__name__ = true;
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
thx_core_Functions1.__name__ = true;
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
thx_core_Functions2.__name__ = true;
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
thx_core_Functions3.__name__ = true;
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
thx_core_Functions.__name__ = true;
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
thx_core_Ints.__name__ = true;
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
var thx_core_Nil = { __ename__ : true, __constructs__ : ["nil"] };
thx_core_Nil.nil = ["nil",0];
thx_core_Nil.nil.__enum__ = thx_core_Nil;
var thx_core_Strings = function() { };
thx_core_Strings.__name__ = true;
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
thx_core_Timer.__name__ = true;
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
thx_core__$Tuple_Tuple0_$Impl_$.__name__ = true;
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
thx_core__$Tuple_Tuple1_$Impl_$.__name__ = true;
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
thx_core__$Tuple_Tuple2_$Impl_$.__name__ = true;
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
thx_core__$Tuple_Tuple3_$Impl_$.__name__ = true;
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
thx_core__$Tuple_Tuple4_$Impl_$.__name__ = true;
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
thx_core__$Tuple_Tuple5_$Impl_$.__name__ = true;
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
thx_core__$Tuple_Tuple6_$Impl_$.__name__ = true;
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
var thx_core_error_NullArgument = function(message,posInfo) {
	thx_core_Error.call(this,message,null,posInfo);
};
thx_core_error_NullArgument.__name__ = true;
thx_core_error_NullArgument.__super__ = thx_core_Error;
thx_core_error_NullArgument.prototype = $extend(thx_core_Error.prototype,{
	__class__: thx_core_error_NullArgument
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
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
Canvas.main();
})();
