(function () { "use strict";
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
var Perf = function() { };
Perf.__name__ = true;
Perf.r = function() {
	return Math.random();
};
Perf.main = function() {
	var test = new thx_benchmark_SpeedTest(1000000);
	test.add("description",function() {
	});
	test.execute();
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
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
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
StringTools.rpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = s + c;
	return s;
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
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
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
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
					if(i != 2) str += "," + js_Boot.__string_rec(o[i],s); else str += js_Boot.__string_rec(o[i],s);
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
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
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
var thx_benchmark_SpeedTest = function(repetitions,testDelay,averages) {
	if(averages == null) averages = 5;
	if(testDelay == null) testDelay = 0;
	if(repetitions == null) repetitions = 100000;
	this.testDelay = testDelay;
	this.averages = averages;
	this.repetitions = repetitions;
	this.tests = [];
	this.descriptions = [];
	this.reference = -1;
};
thx_benchmark_SpeedTest.__name__ = true;
thx_benchmark_SpeedTest.getTimer = function() {
	return new Date().getTime();
};
thx_benchmark_SpeedTest.formatInt = function(v) {
	return "" + Math.round(v);
};
thx_benchmark_SpeedTest.formatPercentInt = function(v) {
	return thx_benchmark_SpeedTest.formatInt(v) + "%";
};
thx_benchmark_SpeedTest.formatPercent = function(v) {
	return thx_benchmark_SpeedTest.formatDecimal(v,2) + "%";
};
thx_benchmark_SpeedTest.formatDecimal = function(v,decimals) {
	if(decimals == null) decimals = 2;
	var p = Math.pow(10,decimals);
	var s = "" + Math.round(v * p) / p;
	if(s.indexOf(".") < 0) s += "." + StringTools.lpad("","0",decimals);
	return s;
};
thx_benchmark_SpeedTest.prototype = {
	addLoop: function(description,f,isReference) {
		if(isReference == null) isReference = false;
		this.descriptions.push(description);
		if(isReference) this.reference = this.tests.length;
		this.tests.push(f);
		return this;
	}
	,add: function(description,f,isReference) {
		if(isReference == null) isReference = false;
		return this.addLoop(description,function(tot) {
			var _g = 0;
			while(_g < tot) {
				var i = _g++;
				f();
			}
		},isReference);
	}
	,execute: function(handler) {
		this.handler = handler;
		if(null == this.handler) this.handler = function(s) {
			console.log("\n" + s);
		};
		this.results = [];
		var _g1 = 0;
		var _g = this.tests.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.results[i] = 0.0;
		}
		this.toPerform = this.averages;
		this.start = new Date().getTime();
		this.handleRound();
	}
	,test: function(f) {
		var start = new Date().getTime();
		f(this.repetitions);
		return new Date().getTime() - start;
	}
	,takeRound: function() {
		var indexes = thx_core_Arrays.shuffle(thx_core_Ints.range(0,this.tests.length));
		var _g = 0;
		while(_g < indexes.length) {
			var i = indexes[_g];
			++_g;
			this.results[i] += this.test(this.tests[i]);
		}
		this.handleRound();
	}
	,handleRound: function() {
		this.toPerform--;
		if(this.toPerform >= 0) {
			if(this.testDelay > 0) haxe_Timer.delay($bind(this,this.takeRound),this.testDelay); else this.takeRound();
		} else this.handler(this.getOutput());
	}
	,getOutput: function() {
		var total = new Date().getTime() - this.start;
		var sl = 0;
		var slowest = -1.0;
		var bd = 0;
		var ad = 0;
		var r = [];
		var sep = ".";
		var _g1 = 0;
		var _g = this.descriptions.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.descriptions[i];
			if(d.length > sl) sl = d.length;
			if(slowest < 0 || slowest > this.results[i]) slowest = this.results[i];
			var v = thx_benchmark_SpeedTest.formatDecimal(this.results[i] / this.averages,1);
			var n = v.split(sep);
			if(bd < n[0].length) bd = n[0].length;
			r.push(n);
		}
		sl += 3;
		var s = new StringBuf();
		s.b += Std.string("test repeated " + this.repetitions + " time(s), average on " + this.averages + " cycle(s)\n\n");
		if(this.reference >= 0) slowest = this.results[this.reference];
		var _g11 = 0;
		var _g2 = this.descriptions.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			var d1 = this.descriptions[i1];
			s.add(StringTools.rpad(d1,".",sl));
			s.b += ": ";
			s.add(StringTools.lpad(r[i1][0]," ",bd));
			s.b += ".";
			s.b += Std.string(r[i1][1]);
			s.b += " ms. ";
			if(this.reference < 0) s.add(thx_benchmark_SpeedTest.formatPercent(Math.round(100 * slowest / this.results[i1]))); else if(this.reference == i1) s.b += "        reference"; else {
				var v1 = Math.round(100 * slowest / this.results[i1]);
				if(v1 < 100) s.add("(" + StringTools.lpad(thx_benchmark_SpeedTest.formatPercentInt(100 - v1)," ",5) + ") slower"); else if(v1 == 100) s.b += "        same"; else s.add(" " + StringTools.lpad(thx_benchmark_SpeedTest.formatPercentInt(v1 - 100)," ",5) + "  faster");
			}
			s.b += "\n";
		}
		s.b += "\n";
		s.add("total execution time: " + thx_benchmark_SpeedTest.formatInt(total) + " ms.");
		return s.b;
	}
};
var thx_core_Arrays = function() { };
thx_core_Arrays.__name__ = true;
thx_core_Arrays.same = function(a,b,eq) {
	if(a == null || b == null || a.length != b.length) return false;
	if(null == eq) eq = thx_core_Function.equality;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(!eq(a[i],b[i])) return false;
	}
	return true;
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
thx_core_Arrays.crossMulti = function(a) {
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
thx_core_Arrays.pushIf = function(arr,cond,value) {
	if(cond) arr.push(value);
	return arr;
};
thx_core_Arrays.mapi = function(arr,handler) {
	return arr.map(handler);
};
thx_core_Arrays.flatMap = function(arr,callback) {
	return thx_core_Arrays.flatten(arr.map(callback));
};
thx_core_Arrays.flatten = function(arr) {
	return Array.prototype.concat.apply([],arr);
};
thx_core_Arrays.reduce = function(arr,callback,initial) {
	return arr.reduce(callback,initial);
};
thx_core_Arrays.reducei = function(arr,callback,initial) {
	return arr.reduce(callback,initial);
};
thx_core_Arrays.order = function(arr,sort) {
	var n = arr.slice();
	n.sort(sort);
	return n;
};
thx_core_Arrays.isEmpty = function(arr) {
	return arr.length == 0;
};
thx_core_Arrays.contains = function(arr,element,eq) {
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
thx_core_Arrays.shuffle = function(a) {
	var t = thx_core_Ints.range(a.length);
	var arr = [];
	while(t.length > 0) {
		var pos = Std.random(t.length);
		var index = t[pos];
		t.splice(pos,1);
		arr.push(a[index]);
	}
	return arr;
};
var thx_core_Floats = function() { };
thx_core_Floats.__name__ = true;
thx_core_Floats.normalize = function(v) {
	if(v < 0) return 0; else if(v > 1) return 1; else return v;
};
thx_core_Floats.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
};
thx_core_Floats.clampSym = function(v,max) {
	return thx_core_Floats.clamp(v,-max,max);
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
thx_core_Floats.canParse = function(s) {
	return thx_core_Floats.pattern_parse.match(s);
};
thx_core_Floats.parse = function(s) {
	if(HxOverrides.substr(s,0,1) == "+") s = HxOverrides.substr(s,1,null);
	return Std.parseFloat(s);
};
var thx_core_F0 = function() { };
thx_core_F0.__name__ = true;
thx_core_F0.join = function(fa,fb) {
	return function() {
		fa();
		fb();
	};
};
thx_core_F0.once = function(f) {
	return function() {
		f();
		f = function() {
		};
	};
};
var thx_core_F1 = function() { };
thx_core_F1.__name__ = true;
thx_core_F1.compose = function(fa,fb) {
	return function(v) {
		return fa(fb(v));
	};
};
thx_core_F1.join = function(fa,fb) {
	return function(v) {
		fa(v);
		fb(v);
	};
};
var thx_core_Function = function() { };
thx_core_Function.__name__ = true;
thx_core_Function.equality = function(a,b) {
	return a == b;
};
var thx_core_Ints = function() { };
thx_core_Ints.__name__ = true;
thx_core_Ints.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
};
thx_core_Ints.canParse = function(s) {
	return thx_core_Ints.pattern_parse.match(s);
};
thx_core_Ints.min = function(a,b) {
	if(a < b) return a; else return b;
};
thx_core_Ints.max = function(a,b) {
	if(a > b) return a; else return b;
};
thx_core_Ints.parse = function(s) {
	if(HxOverrides.substr(s,0,1) == "+") s = HxOverrides.substr(s,1,null);
	return Std.parseInt(s);
};
thx_core_Ints.compare = function(a,b) {
	return a - b;
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
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
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
thx_core_Floats.pattern_parse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
thx_core_Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
Perf.main();
})();
