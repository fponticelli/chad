(function () { "use strict";
var console = (1,eval)('this').console || {log:function(){}};
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
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) this.r.s = s;
			return b;
		} else {
			var b1 = this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b1;
		}
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf = new StringBuf();
		do {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				buf.add(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf.add(HxOverrides.substr(s,offset,p.pos - offset));
			buf.add(f(this));
			if(p.len == 0) {
				buf.add(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
		} while(this.r.global);
		if(!this.r.global && offset > 0 && offset < s.length) buf.add(HxOverrides.substr(s,offset,null));
		return buf.b;
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
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	(window || {}).Main = Main;
};
Main.geom = function() {
	return chad.export.ThreeJS.toModel(thx.geom.d3.csg._Solid.Solid_Impl_.subtract(thx.geom.d3.csg._Solid.Solid_Impl_.subtract(thx.geom.d3.csg._Solid.Solid_Impl_.subtract(thx.geom.d3.csg._Solid.Solid_Impl_.subtract(thx.geom.d3.csg._Solid.Solid_Impl_.intersect(thx.geom.d3.csg._Solid.Solid_Impl_.subtract(thx.geom.d3.csg._Solid.Solid_Impl_.union(thx.geom.d3.csg.Solids.box(thx.geom.d3._Point.Point_Impl_.fromFloats([-0.5,-0.5,-0.5]),thx.geom.d3._Point.Point_Impl_.fromFloats([1.0,1.0,1.0])),thx.geom.d3.csg.Solids.box(thx.geom.d3._Point.Point_Impl_.fromFloats([0.1,0.1,0.1]),thx.geom.d3._Point.Point_Impl_.fromFloats([1.0,1.0,1.0]))),thx.geom.d3.csg.Solids.box(thx.geom.d3._Point.Point_Impl_.fromFloats([-1.1,-1.1,-1.1]),thx.geom.d3._Point.Point_Impl_.fromFloats([1.0,1.0,1.0]))),thx.geom.d3.csg.Solids.sphere(thx.geom.d3._Point.Point_Impl_.fromFloats([0.0,0.0,0.0]),0.7)),thx.geom.d3.csg.Solids.sphere(thx.geom.d3._Point.Point_Impl_.fromFloats([0.5,0.5,0.5]),0.35)),thx.geom.d3.csg.Solids.cylinder(thx.geom.d3._Point.Point_Impl_.fromFloats([0.0,0.0,-0.95]),thx.geom.d3._Point.Point_Impl_.fromFloats([0.0,0.0,0.95]),0.25)),thx.geom.d3.csg.Solids.cylinder(thx.geom.d3._Point.Point_Impl_.fromFloats([0.0,-0.95,0.0]),thx.geom.d3._Point.Point_Impl_.fromFloats([0.0,0.95,0.0]),0.35)),thx.geom.d3.csg.Solids.cylinder(thx.geom.d3._Point.Point_Impl_.fromFloats([-0.95,0.0,0.0]),thx.geom.d3._Point.Point_Impl_.fromFloats([0.95,0.0,0.0]),0.15)));
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
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
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var chad = {};
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
			var this1 = combo.Vertex3D.position;
			$r = [this1.get_x(),this1.get_y(),this1.get_z()];
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
			var this1 = combo.Vertex3D.normal;
			$r = [this1.get_x(),this1.get_y(),this1.get_z()];
			return $r;
		}(this)));
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
			if(!vertices.h.hasOwnProperty("$" + key)) {
				var value = { index : index++, Vertex3D : Vertex3D};
				vertices.h["$" + key] = value;
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
				$r = vertices.h["$" + key1];
				return $r;
			}(this))).index,((function($this) {
				var $r;
				var key2 = arr[i - 1].toString();
				$r = vertices.h["$" + key2];
				return $r;
			}(this))).index,((function($this) {
				var $r;
				var key3 = arr[i].toString();
				$r = vertices.h["$" + key3];
				return $r;
			}(this))).index,((function($this) {
				var $r;
				var key4 = arr[0].toString();
				$r = vertices.h["$" + key4];
				return $r;
			}(this))).index,((function($this) {
				var $r;
				var key5 = arr[i - 1].toString();
				$r = vertices.h["$" + key5];
				return $r;
			}(this))).index,((function($this) {
				var $r;
				var key6 = arr[i].toString();
				$r = vertices.h["$" + key6];
				return $r;
			}(this))).index]);
		}
	}
	return { metadata : { formatVersion : 3}, vertices : chad.export.ThreeJS.getVertices(vertices), normals : chad.export.ThreeJS.getNormals(vertices), faces : faces};
};
var haxe = {};
haxe.IMap = function() { };
haxe.IMap.__name__ = true;
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [haxe.IMap];
haxe.ds.StringMap.prototype = {
	keys: function() {
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
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js.Boot.__string_rec(o[i1],s); else str2 += js.Boot.__string_rec(o[i1],s);
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
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
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
};
var thx = {};
thx.core = {};
thx.core.Arrays = function() { };
thx.core.Arrays.__name__ = true;
thx.core.Arrays.after = function(array,element) {
	return array.slice(HxOverrides.indexOf(array,element,0) + 1);
};
thx.core.Arrays.all = function(arr,predicate) {
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(!predicate(item)) return false;
	}
	return true;
};
thx.core.Arrays.any = function(arr,predicate) {
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(predicate(item)) return true;
	}
	return false;
};
thx.core.Arrays.at = function(arr,indexes) {
	return indexes.map(function(i) {
		return arr[i];
	});
};
thx.core.Arrays.before = function(array,element) {
	return array.slice(0,HxOverrides.indexOf(array,element,0));
};
thx.core.Arrays.compact = function(arr) {
	return arr.filter(function(v) {
		return null != v;
	});
};
thx.core.Arrays.contains = function(array,element,eq) {
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
thx.core.Arrays.crossMulti = function(array) {
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
thx.core.Arrays.eachPair = function(array,callback) {
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
thx.core.Arrays.equals = function(a,b,equality) {
	if(a == null || b == null || a.length != b.length) return false;
	if(null == equality) equality = thx.core.Functions.equality;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(!equality(a[i],b[i])) return false;
	}
	return true;
};
thx.core.Arrays.extract = function(a,predicate) {
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(predicate(a[i])) return a.splice(i,1)[0];
	}
	return null;
};
thx.core.Arrays.find = function(array,predicate) {
	var _g = 0;
	while(_g < array.length) {
		var item = array[_g];
		++_g;
		if(predicate(item)) return item;
	}
	return null;
};
thx.core.Arrays.findLast = function(array,predicate) {
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
thx.core.Arrays.first = function(array) {
	return array[0];
};
thx.core.Arrays.flatMap = function(array,callback) {
	return thx.core.Arrays.flatten(array.map(callback));
};
thx.core.Arrays.flatten = function(array) {
	return Array.prototype.concat.apply([],array);
};
thx.core.Arrays.from = function(array,element) {
	return array.slice(HxOverrides.indexOf(array,element,0));
};
thx.core.Arrays.head = function(array) {
	return array[0];
};
thx.core.Arrays.ifEmpty = function(value,alt) {
	if(null != value && 0 != value.length) return value; else return alt;
};
thx.core.Arrays.initial = function(array) {
	return array.slice(0,array.length - 1);
};
thx.core.Arrays.isEmpty = function(array) {
	return array.length == 0;
};
thx.core.Arrays.last = function(array) {
	return array[array.length - 1];
};
thx.core.Arrays.mapi = function(array,callback) {
	var r = [];
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		r.push(callback(array[i],i));
	}
	return r;
};
thx.core.Arrays.mapRight = function(array,callback) {
	var i = array.length;
	var result = [];
	while(--i >= 0) result.push(callback(array[i]));
	return result;
};
thx.core.Arrays.order = function(array,sort) {
	var n = array.slice();
	n.sort(sort);
	return n;
};
thx.core.Arrays.pull = function(array,toRemove,equality) {
	var _g = 0;
	while(_g < toRemove.length) {
		var item = toRemove[_g];
		++_g;
		thx.core.Arrays.removeAll(array,item,equality);
	}
};
thx.core.Arrays.pushIf = function(array,condition,value) {
	if(condition) array.push(value);
	return array;
};
thx.core.Arrays.reduce = function(array,callback,initial) {
	return array.reduce(callback,initial);
};
thx.core.Arrays.resize = function(array,length,fill) {
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx.core.Arrays.reducei = function(array,callback,initial) {
	return array.reduce(callback,initial);
};
thx.core.Arrays.reduceRight = function(array,callback,initial) {
	var i = array.length;
	while(--i >= 0) initial = callback(initial,array[i]);
	return initial;
};
thx.core.Arrays.removeAll = function(array,element,equality) {
	if(null == equality) equality = thx.core.Functions.equality;
	var i = array.length;
	while(--i >= 0) if(equality(array[i],element)) array.splice(i,1);
};
thx.core.Arrays.rest = function(array) {
	return array.slice(1);
};
thx.core.Arrays.sample = function(array,n) {
	n = thx.core.Ints.min(n,array.length);
	var copy = array.slice();
	var result = [];
	var _g = 0;
	while(_g < n) {
		var i = _g++;
		result.push(copy.splice(Std.random(copy.length),1)[0]);
	}
	return result;
};
thx.core.Arrays.sampleOne = function(array) {
	return array[Std.random(array.length)];
};
thx.core.Arrays.shuffle = function(a) {
	var t = thx.core.Ints.range(a.length);
	var array = [];
	while(t.length > 0) {
		var pos = Std.random(t.length);
		var index = t[pos];
		t.splice(pos,1);
		array.push(a[index]);
	}
	return array;
};
thx.core.Arrays.take = function(arr,n) {
	return arr.slice(0,n);
};
thx.core.Arrays.takeLast = function(arr,n) {
	return arr.slice(arr.length - n);
};
thx.core.Arrays.rotate = function(arr) {
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
thx.core.Arrays.zip = function(array1,array2) {
	var length = thx.core.Ints.min(array1.length,array2.length);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i]});
	}
	return array;
};
thx.core.Arrays.zip3 = function(array1,array2,array3) {
	var length = thx.core.ArrayInts.min([array1.length,array2.length,array3.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i]});
	}
	return array;
};
thx.core.Arrays.zip4 = function(array1,array2,array3,array4) {
	var length = thx.core.ArrayInts.min([array1.length,array2.length,array3.length,array4.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i], _3 : array4[i]});
	}
	return array;
};
thx.core.Arrays.zip5 = function(array1,array2,array3,array4,array5) {
	var length = thx.core.ArrayInts.min([array1.length,array2.length,array3.length,array4.length,array5.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i], _3 : array4[i], _4 : array5[i]});
	}
	return array;
};
thx.core.Arrays.unzip = function(array) {
	var a1 = [];
	var a2 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
	});
	return { _0 : a1, _1 : a2};
};
thx.core.Arrays.unzip3 = function(array) {
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
thx.core.Arrays.unzip4 = function(array) {
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
thx.core.Arrays.unzip5 = function(array) {
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
thx.core.ArrayFloats = function() { };
thx.core.ArrayFloats.__name__ = true;
thx.core.ArrayFloats.average = function(arr) {
	return thx.core.ArrayFloats.sum(arr) / arr.length;
};
thx.core.ArrayFloats.compact = function(arr) {
	return arr.filter(function(v) {
		return null != v && isFinite(v);
	});
};
thx.core.ArrayFloats.max = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(max,v) {
		if(v > max) return v; else return max;
	},arr[0]);
};
thx.core.ArrayFloats.min = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(min,v) {
		if(v < min) return v; else return min;
	},arr[0]);
};
thx.core.ArrayFloats.resize = function(array,length,fill) {
	if(fill == null) fill = 0.0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx.core.ArrayFloats.sum = function(arr) {
	return arr.reduce(function(tot,v) {
		return tot + v;
	},0.0);
};
thx.core.ArrayInts = function() { };
thx.core.ArrayInts.__name__ = true;
thx.core.ArrayInts.average = function(arr) {
	return thx.core.ArrayInts.sum(arr) / arr.length;
};
thx.core.ArrayInts.max = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(max,v) {
		if(v > max) return v; else return max;
	},arr[0]);
};
thx.core.ArrayInts.min = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(min,v) {
		if(v < min) return v; else return min;
	},arr[0]);
};
thx.core.ArrayInts.resize = function(array,length,fill) {
	if(fill == null) fill = 0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx.core.ArrayInts.sum = function(arr) {
	return arr.reduce(function(tot,v) {
		return tot + v;
	},0);
};
thx.core.ArrayStrings = function() { };
thx.core.ArrayStrings.__name__ = true;
thx.core.ArrayStrings.compact = function(arr) {
	return arr.filter(function(v) {
		return !thx.core.Strings.isEmpty(v);
	});
};
thx.core.ArrayStrings.max = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(max,v) {
		if(v > max) return v; else return max;
	},arr[0]);
};
thx.core.ArrayStrings.min = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(min,v) {
		if(v < min) return v; else return min;
	},arr[0]);
};
thx.core.Floats = function() { };
thx.core.Floats.__name__ = true;
thx.core.Floats.angleDifference = function(a,b,turn) {
	if(turn == null) turn = 360;
	var r = (b - a) % turn;
	if(r < 0) r += turn;
	if(r > turn / 2) r -= turn;
	return r;
};
thx.core.Floats.ceilTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.ceil(f * p) / p;
};
thx.core.Floats.canParse = function(s) {
	return thx.core.Floats.pattern_parse.match(s);
};
thx.core.Floats.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
};
thx.core.Floats.clampSym = function(v,max) {
	return thx.core.Floats.clamp(v,-max,max);
};
thx.core.Floats.compare = function(a,b) {
	if(a < b) return -1; else if(b > a) return 1; else return 0;
};
thx.core.Floats.floorTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.floor(f * p) / p;
};
thx.core.Floats.interpolate = function(f,a,b) {
	return (b - a) * f + a;
};
thx.core.Floats.interpolateAngle = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	return thx.core.Floats.wrapCircular(thx.core.Floats.interpolate(f,a,a + thx.core.Floats.angleDifference(a,b,turn)),turn);
};
thx.core.Floats.interpolateAngleWidest = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	return thx.core.Floats.wrapCircular(thx.core.Floats.interpolateAngle(f,a,b,turn) - turn / 2,turn);
};
thx.core.Floats.interpolateAngleCW = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	a = thx.core.Floats.wrapCircular(a,turn);
	b = thx.core.Floats.wrapCircular(b,turn);
	if(b < a) b += turn;
	return thx.core.Floats.wrapCircular(thx.core.Floats.interpolate(f,a,b),turn);
};
thx.core.Floats.interpolateAngleCCW = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	a = thx.core.Floats.wrapCircular(a,turn);
	b = thx.core.Floats.wrapCircular(b,turn);
	if(b > a) b -= turn;
	return thx.core.Floats.wrapCircular(thx.core.Floats.interpolate(f,a,b),turn);
};
thx.core.Floats.nearEquals = function(a,b) {
	return Math.abs(a - b) <= 10e-10;
};
thx.core.Floats.nearZero = function(n) {
	return Math.abs(n) <= 10e-10;
};
thx.core.Floats.normalize = function(v) {
	if(v < 0) return 0; else if(v > 1) return 1; else return v;
};
thx.core.Floats.parse = function(s) {
	if(s.substring(0,1) == "+") s = s.substring(1);
	return parseFloat(s);
};
thx.core.Floats.root = function(base,index) {
	return Math.pow(base,1 / index);
};
thx.core.Floats.roundTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.round(f * p) / p;
};
thx.core.Floats.sign = function(value) {
	if(value < 0) return -1; else return 1;
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
thx.core.Functions0 = function() { };
thx.core.Functions0.__name__ = true;
thx.core.Functions0.after = function(callback,n) {
	return function() {
		if(--n == 0) callback();
	};
};
thx.core.Functions0.join = function(fa,fb) {
	return function() {
		fa();
		fb();
	};
};
thx.core.Functions0.once = function(f) {
	return function() {
		var t = f;
		f = thx.core.Functions.noop;
		t();
	};
};
thx.core.Functions0.negate = function(callback) {
	return function() {
		return !callback();
	};
};
thx.core.Functions0.times = function(n,callback) {
	return function() {
		return thx.core.Ints.range(n).map(function(_) {
			return callback();
		});
	};
};
thx.core.Functions0.timesi = function(n,callback) {
	return function() {
		return thx.core.Ints.range(n).map(function(i) {
			return callback(i);
		});
	};
};
thx.core.Functions1 = function() { };
thx.core.Functions1.__name__ = true;
thx.core.Functions1.compose = function(fa,fb) {
	return function(v) {
		return fa(fb(v));
	};
};
thx.core.Functions1.join = function(fa,fb) {
	return function(v) {
		fa(v);
		fb(v);
	};
};
thx.core.Functions1.memoize = function(callback,resolver) {
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
thx.core.Functions1.negate = function(callback) {
	return function(v) {
		return !callback(v);
	};
};
thx.core.Functions1.noop = function(_) {
};
thx.core.Functions1.times = function(n,callback) {
	return function(value) {
		return thx.core.Ints.range(n).map(function(_) {
			return callback(value);
		});
	};
};
thx.core.Functions1.timesi = function(n,callback) {
	return function(value) {
		return thx.core.Ints.range(n).map(function(i) {
			return callback(value,i);
		});
	};
};
thx.core.Functions1.swapArguments = function(callback) {
	return function(a2,a1) {
		return callback(a1,a2);
	};
};
thx.core.Functions2 = function() { };
thx.core.Functions2.__name__ = true;
thx.core.Functions2.memoize = function(callback,resolver) {
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
thx.core.Functions2.negate = function(callback) {
	return function(v1,v2) {
		return !callback(v1,v2);
	};
};
thx.core.Functions3 = function() { };
thx.core.Functions3.__name__ = true;
thx.core.Functions3.memoize = function(callback,resolver) {
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
thx.core.Functions3.negate = function(callback) {
	return function(v1,v2,v3) {
		return !callback(v1,v2,v3);
	};
};
thx.core.Functions = function() { };
thx.core.Functions.__name__ = true;
thx.core.Functions.constant = function(v) {
	return function() {
		return v;
	};
};
thx.core.Functions.equality = function(a,b) {
	return a == b;
};
thx.core.Functions.identity = function(value) {
	return value;
};
thx.core.Functions.noop = function() {
};
thx.core.Ints = function() { };
thx.core.Ints.__name__ = true;
thx.core.Ints.abs = function(v) {
	if(v < 0) return -v; else return v;
};
thx.core.Ints.canParse = function(s) {
	return thx.core.Ints.pattern_parse.match(s);
};
thx.core.Ints.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
};
thx.core.Ints.clampSym = function(v,max) {
	return thx.core.Ints.clamp(v,-max,max);
};
thx.core.Ints.compare = function(a,b) {
	return a - b;
};
thx.core.Ints.interpolate = function(f,a,b) {
	return Math.round(a + (b - a) * f);
};
thx.core.Ints.isEven = function(v) {
	return v % 2 == 0;
};
thx.core.Ints.isOdd = function(v) {
	return v % 2 != 0;
};
thx.core.Ints.max = function(a,b) {
	if(a > b) return a; else return b;
};
thx.core.Ints.min = function(a,b) {
	if(a < b) return a; else return b;
};
thx.core.Ints.parse = function(s,base) {
	var v = parseInt(s,base);
	if(isNaN(v)) return null; else return v;
};
thx.core.Ints.random = function(min,max) {
	if(min == null) min = 0;
	return Std.random(max + 1) + min;
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
thx.core.Ints.toString = function(value,base) {
	return value.toString(base);
};
thx.core.Ints.sign = function(value) {
	if(value < 0) return -1; else return 1;
};
thx.core.Ints.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
};
thx.core.Nil = { __ename__ : true, __constructs__ : ["nil"] };
thx.core.Nil.nil = ["nil",0];
thx.core.Nil.nil.__enum__ = thx.core.Nil;
thx.core.Strings = function() { };
thx.core.Strings.__name__ = true;
thx.core.Strings.after = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return ""; else return value.substring(pos + searchFor.length);
};
thx.core.Strings.capitalize = function(s) {
	return s.substring(0,1).toUpperCase() + s.substring(1);
};
thx.core.Strings.capitalizeWords = function(value,whiteSpaceOnly) {
	if(whiteSpaceOnly == null) whiteSpaceOnly = false;
	if(whiteSpaceOnly) return thx.core.Strings.UCWORDSWS.map(value.substring(0,1).toUpperCase() + value.substring(1),thx.core.Strings.upperMatch); else return thx.core.Strings.UCWORDS.map(value.substring(0,1).toUpperCase() + value.substring(1),thx.core.Strings.upperMatch);
};
thx.core.Strings.collapse = function(value) {
	return thx.core.Strings.WSG.replace(StringTools.trim(value)," ");
};
thx.core.Strings.compare = function(a,b) {
	if(a < b) return -1; else if(a > b) return 1; else return 0;
};
thx.core.Strings.contains = function(s,test) {
	return s.indexOf(test) >= 0;
};
thx.core.Strings.dasherize = function(s) {
	return StringTools.replace(s,"_","-");
};
thx.core.Strings.ellipsis = function(s,maxlen,symbol) {
	if(symbol == null) symbol = "...";
	if(maxlen == null) maxlen = 20;
	if(s.length > maxlen) return s.substring(0,symbol.length > maxlen - symbol.length?symbol.length:maxlen - symbol.length) + symbol; else return s;
};
thx.core.Strings.filter = function(s,predicate) {
	return s.split("").filter(predicate).join("");
};
thx.core.Strings.filterCharcode = function(s,predicate) {
	return thx.core.Strings.toCharcodeArray(s).filter(predicate).map(function(i) {
		return String.fromCharCode(i);
	}).join("");
};
thx.core.Strings.from = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return ""; else return value.substring(pos);
};
thx.core.Strings.humanize = function(s) {
	return StringTools.replace(thx.core.Strings.underscore(s),"_"," ");
};
thx.core.Strings.isAlphaNum = function(value) {
	return thx.core.Strings.ALPHANUM.match(value);
};
thx.core.Strings.isLowerCase = function(value) {
	return value.toLowerCase() == value;
};
thx.core.Strings.isUpperCase = function(value) {
	return value.toUpperCase() == value;
};
thx.core.Strings.ifEmpty = function(value,alt) {
	if(null != value && "" != value) return value; else return alt;
};
thx.core.Strings.isDigitsOnly = function(value) {
	return thx.core.Strings.DIGITS.match(value);
};
thx.core.Strings.isEmpty = function(value) {
	return value == null || value == "";
};
thx.core.Strings.iterator = function(s) {
	var _this = s.split("");
	return HxOverrides.iter(_this);
};
thx.core.Strings.map = function(value,callback) {
	return value.split("").map(callback);
};
thx.core.Strings.remove = function(value,toremove) {
	return StringTools.replace(value,toremove,"");
};
thx.core.Strings.removeAfter = function(value,toremove) {
	if(StringTools.endsWith(value,toremove)) return value.substring(0,value.length - toremove.length); else return value;
};
thx.core.Strings.removeBefore = function(value,toremove) {
	if(StringTools.startsWith(value,toremove)) return value.substring(toremove.length); else return value;
};
thx.core.Strings.repeat = function(s,times) {
	return ((function($this) {
		var $r;
		var _g = [];
		{
			var _g1 = 0;
			while(_g1 < times) {
				var i = _g1++;
				_g.push(s);
			}
		}
		$r = _g;
		return $r;
	}(this))).join("");
};
thx.core.Strings.reverse = function(s) {
	var arr = s.split("");
	arr.reverse();
	return arr.join("");
};
thx.core.Strings.stripTags = function(s) {
	return thx.core.Strings.STRIPTAGS.replace(s,"");
};
thx.core.Strings.surround = function(s,left,right) {
	return "" + left + s + (null == right?left:right);
};
thx.core.Strings.toArray = function(s) {
	return s.split("");
};
thx.core.Strings.toCharcodeArray = function(s) {
	return thx.core.Strings.map(s,function(s1) {
		return HxOverrides.cca(s1,0);
	});
};
thx.core.Strings.toChunks = function(s,len) {
	var chunks = [];
	while(s.length > 0) {
		chunks.push(s.substring(0,len));
		s = s.substring(len);
	}
	return chunks;
};
thx.core.Strings.trimChars = function(value,charlist) {
	return thx.core.Strings.trimCharsRight(thx.core.Strings.trimCharsLeft(value,charlist),charlist);
};
thx.core.Strings.trimCharsLeft = function(value,charlist) {
	var pos = 0;
	var _g1 = 0;
	var _g = value.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(thx.core.Strings.contains(charlist,value.charAt(i))) pos++; else break;
	}
	return value.substring(pos);
};
thx.core.Strings.trimCharsRight = function(value,charlist) {
	var len = value.length;
	var pos = len;
	var i;
	var _g = 0;
	while(_g < len) {
		var j = _g++;
		i = len - j - 1;
		if(thx.core.Strings.contains(charlist,value.charAt(i))) pos = i; else break;
	}
	return value.substring(0,pos);
};
thx.core.Strings.underscore = function(s) {
	s = new EReg("::","g").replace(s,"/");
	s = new EReg("([A-Z]+)([A-Z][a-z])","g").replace(s,"$1_$2");
	s = new EReg("([a-z\\d])([A-Z])","g").replace(s,"$1_$2");
	s = new EReg("-","g").replace(s,"_");
	return s.toLowerCase();
};
thx.core.Strings.upTo = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return value; else return value.substring(0,pos);
};
thx.core.Strings.wrapColumns = function(s,columns,indent,newline) {
	if(newline == null) newline = "\n";
	if(indent == null) indent = "";
	if(columns == null) columns = 78;
	return thx.core.Strings.SPLIT_LINES.split(s).map(function(part) {
		return thx.core.Strings.wrapLine(StringTools.trim(thx.core.Strings.WSG.replace(part," ")),columns,indent,newline);
	}).join(newline);
};
thx.core.Strings.upperMatch = function(re) {
	return re.matched(0).toUpperCase();
};
thx.core.Strings.wrapLine = function(s,columns,indent,newline) {
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
		while(!StringTools.isSpace(s,pos + columns - i) && i < columns) i++;
		if(i == columns) {
			i = 0;
			while(!StringTools.isSpace(s,pos + columns + i) && pos + columns + i < len) i++;
			parts.push(s.substring(pos,pos + columns + i));
			pos += columns + i + 1;
		} else {
			parts.push(s.substring(pos,pos + columns - i));
			pos += columns - i + 1;
		}
	}
	return indent + parts.join(newline + indent);
};
thx.core._Tuple = {};
thx.core._Tuple.Tuple0_Impl_ = {};
thx.core._Tuple.Tuple0_Impl_.__name__ = true;
thx.core._Tuple.Tuple0_Impl_._new = function() {
	return thx.core.Nil.nil;
};
thx.core._Tuple.Tuple0_Impl_["with"] = function(this1,v) {
	return v;
};
thx.core._Tuple.Tuple0_Impl_.toString = function(this1) {
	return "Tuple0()";
};
thx.core._Tuple.Tuple0_Impl_.toNil = function(this1) {
	return this1;
};
thx.core._Tuple.Tuple0_Impl_.nilToTuple = function(v) {
	return thx.core.Nil.nil;
};
thx.core._Tuple.Tuple1_Impl_ = {};
thx.core._Tuple.Tuple1_Impl_.__name__ = true;
thx.core._Tuple.Tuple1_Impl_._new = function(_0) {
	return _0;
};
thx.core._Tuple.Tuple1_Impl_.get__0 = function(this1) {
	return this1;
};
thx.core._Tuple.Tuple1_Impl_["with"] = function(this1,v) {
	return { _0 : this1, _1 : v};
};
thx.core._Tuple.Tuple1_Impl_.toString = function(this1) {
	return "Tuple1(" + Std.string(this1) + ")";
};
thx.core._Tuple.Tuple2_Impl_ = {};
thx.core._Tuple.Tuple2_Impl_.__name__ = true;
thx.core._Tuple.Tuple2_Impl_._new = function(_0,_1) {
	return { _0 : _0, _1 : _1};
};
thx.core._Tuple.Tuple2_Impl_.get_left = function(this1) {
	return this1._0;
};
thx.core._Tuple.Tuple2_Impl_.get_right = function(this1) {
	return this1._1;
};
thx.core._Tuple.Tuple2_Impl_.flip = function(this1) {
	return { _0 : this1._1, _1 : this1._0};
};
thx.core._Tuple.Tuple2_Impl_.dropLeft = function(this1) {
	return this1._1;
};
thx.core._Tuple.Tuple2_Impl_.dropRight = function(this1) {
	return this1._0;
};
thx.core._Tuple.Tuple2_Impl_["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : v};
};
thx.core._Tuple.Tuple2_Impl_.toString = function(this1) {
	return "Tuple2(" + Std.string(this1._0) + "," + Std.string(this1._1) + ")";
};
thx.core._Tuple.Tuple3_Impl_ = {};
thx.core._Tuple.Tuple3_Impl_.__name__ = true;
thx.core._Tuple.Tuple3_Impl_._new = function(_0,_1,_2) {
	return { _0 : _0, _1 : _1, _2 : _2};
};
thx.core._Tuple.Tuple3_Impl_.flip = function(this1) {
	return { _0 : this1._2, _1 : this1._1, _2 : this1._0};
};
thx.core._Tuple.Tuple3_Impl_.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2};
};
thx.core._Tuple.Tuple3_Impl_.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1};
};
thx.core._Tuple.Tuple3_Impl_["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : v};
};
thx.core._Tuple.Tuple3_Impl_.toString = function(this1) {
	return "Tuple3(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + ")";
};
thx.core._Tuple.Tuple4_Impl_ = {};
thx.core._Tuple.Tuple4_Impl_.__name__ = true;
thx.core._Tuple.Tuple4_Impl_._new = function(_0,_1,_2,_3) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
};
thx.core._Tuple.Tuple4_Impl_.flip = function(this1) {
	return { _0 : this1._3, _1 : this1._2, _2 : this1._1, _3 : this1._0};
};
thx.core._Tuple.Tuple4_Impl_.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3};
};
thx.core._Tuple.Tuple4_Impl_.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2};
};
thx.core._Tuple.Tuple4_Impl_["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : v};
};
thx.core._Tuple.Tuple4_Impl_.toString = function(this1) {
	return "Tuple4(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + ")";
};
thx.core._Tuple.Tuple5_Impl_ = {};
thx.core._Tuple.Tuple5_Impl_.__name__ = true;
thx.core._Tuple.Tuple5_Impl_._new = function(_0,_1,_2,_3,_4) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4};
};
thx.core._Tuple.Tuple5_Impl_.flip = function(this1) {
	return { _0 : this1._4, _1 : this1._3, _2 : this1._2, _3 : this1._1, _4 : this1._0};
};
thx.core._Tuple.Tuple5_Impl_.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3, _3 : this1._4};
};
thx.core._Tuple.Tuple5_Impl_.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3};
};
thx.core._Tuple.Tuple5_Impl_["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : this1._4, _5 : v};
};
thx.core._Tuple.Tuple5_Impl_.toString = function(this1) {
	return "Tuple5(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + "," + Std.string(this1._4) + ")";
};
thx.core._Tuple.Tuple6_Impl_ = {};
thx.core._Tuple.Tuple6_Impl_.__name__ = true;
thx.core._Tuple.Tuple6_Impl_._new = function(_0,_1,_2,_3,_4,_5) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4, _5 : _5};
};
thx.core._Tuple.Tuple6_Impl_.flip = function(this1) {
	return { _0 : this1._5, _1 : this1._4, _2 : this1._3, _3 : this1._2, _4 : this1._1, _5 : this1._0};
};
thx.core._Tuple.Tuple6_Impl_.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3, _3 : this1._4, _4 : this1._5};
};
thx.core._Tuple.Tuple6_Impl_.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : this1._4};
};
thx.core._Tuple.Tuple6_Impl_.toString = function(this1) {
	return "Tuple6(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + "," + Std.string(this1._4) + "," + Std.string(this1._5) + ")";
};
thx.geom = {};
thx.geom.ICloneable = function() { };
thx.geom.ICloneable.__name__ = true;
thx.geom.ITransformable44 = function() { };
thx.geom.ITransformable44.__name__ = true;
thx.geom.ITransformable44.__interfaces__ = [thx.geom.ICloneable];
thx.geom._Matrix44 = {};
thx.geom._Matrix44.Matrix44_Impl_ = {};
thx.geom._Matrix44.Matrix44_Impl_.__name__ = true;
thx.geom._Matrix44.Matrix44_Impl_.fromArray = function(e) {
	thx.core.Arrays.resize(e,16,0.0);
	return [e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]];
};
thx.geom._Matrix44.Matrix44_Impl_.rotationX = function(radians) {
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	return [1,0,0,0,0,cos,sin,0,0,-sin,cos,0,0,0,0,1];
};
thx.geom._Matrix44.Matrix44_Impl_.rotationY = function(radians) {
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	return [cos,0,-sin,0,0,1,0,0,sin,0,cos,0,0,0,0,1];
};
thx.geom._Matrix44.Matrix44_Impl_.rotationZ = function(radians) {
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	return [cos,sin,0,0,-sin,cos,0,0,0,0,1,0,0,0,0,1];
};
thx.geom._Matrix44.Matrix44_Impl_.rotation = function(rotationCenter,rotationAxis,radians) {
	var rotationPlane = thx.geom.d3.Plane.fromNormalAndPoint(rotationAxis,rotationCenter);
	var orthobasis = new thx.geom.d3.OrthoNormalBasis(rotationPlane,thx.geom.d3._Point.Point_Impl_.randomNonParallelVector(rotationPlane.normal));
	var negation;
	negation = (function($this) {
		var $r;
		var x = -rotationCenter.get_x();
		var y = -rotationCenter.get_y();
		var z = -rotationCenter.get_z();
		$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		return $r;
	}(this));
	var transformation = thx.geom._Matrix44.Matrix44_Impl_.translation(negation.get_x(),negation.get_y(),negation.get_z());
	transformation = thx.geom._Matrix44.Matrix44_Impl_.multiply(transformation,orthobasis.getProjectionMatrix());
	transformation = thx.geom._Matrix44.Matrix44_Impl_.multiply(transformation,thx.geom._Matrix44.Matrix44_Impl_.rotationZ(radians));
	transformation = thx.geom._Matrix44.Matrix44_Impl_.multiply(transformation,orthobasis.getInverseProjectionMatrix());
	transformation = thx.geom._Matrix44.Matrix44_Impl_.multiply(transformation,thx.geom._Matrix44.Matrix44_Impl_.translation(rotationCenter.get_x(),rotationCenter.get_y(),rotationCenter.get_z()));
	return transformation;
};
thx.geom._Matrix44.Matrix44_Impl_.translation = function(x,y,z) {
	return [1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1];
};
thx.geom._Matrix44.Matrix44_Impl_.mirrorX = function() {
	return thx.geom._Matrix44.Matrix44_Impl_.mirroring(thx.geom.d3.Plane.PX);
};
thx.geom._Matrix44.Matrix44_Impl_.mirrorY = function() {
	return thx.geom._Matrix44.Matrix44_Impl_.mirroring(thx.geom.d3.Plane.PY);
};
thx.geom._Matrix44.Matrix44_Impl_.mirrorZ = function() {
	return thx.geom._Matrix44.Matrix44_Impl_.mirroring(thx.geom.d3.Plane.PZ);
};
thx.geom._Matrix44.Matrix44_Impl_.mirroring = function(plane) {
	var nx = plane.normal.get_x();
	var ny = plane.normal.get_y();
	var nz = plane.normal.get_z();
	var w = plane.w;
	return [1.0 - 2.0 * nx * nx,-2. * ny * nx,-2. * nz * nx,0,-2. * nx * ny,1.0 - 2.0 * ny * ny,-2. * nz * ny,0,-2. * nx * nz,-2. * ny * nz,1.0 - 2.0 * nz * nz,0,-2. * nx * w,-2. * ny * w,-2. * nz * w,1];
};
thx.geom._Matrix44.Matrix44_Impl_.scaling = function(x,y,z) {
	return [x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1];
};
thx.geom._Matrix44.Matrix44_Impl_._new = function(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15) {
	return [e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15];
};
thx.geom._Matrix44.Matrix44_Impl_.toArray = function(this1) {
	return this1.slice();
};
thx.geom._Matrix44.Matrix44_Impl_.add = function(this1,other) {
	return [this1[0] + other[0],this1[1] + other[1],this1[2] + other[2],this1[3] + other[3],this1[4] + other[4],this1[5] + other[5],this1[6] + other[6],this1[7] + other[7],this1[8] + other[8],this1[9] + other[9],this1[10] + other[10],this1[11] + other[11],this1[12] + other[12],this1[13] + other[13],this1[14] + other[14],this1[15] + other[15]];
};
thx.geom._Matrix44.Matrix44_Impl_.subtract = function(this1,other) {
	return [this1[0] - other[0],this1[1] - other[1],this1[2] - other[2],this1[3] - other[3],this1[4] - other[4],this1[5] - other[5],this1[6] - other[6],this1[7] - other[7],this1[8] - other[8],this1[9] - other[9],this1[10] - other[10],this1[11] - other[11],this1[12] - other[12],this1[13] - other[13],this1[14] - other[14],this1[15] - other[15]];
};
thx.geom._Matrix44.Matrix44_Impl_.multiply = function(this1,other) {
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
thx.geom._Matrix44.Matrix44_Impl_.rightMultiplyPoint3D = function(this1,vector) {
	var v0 = vector.get_x();
	var v1 = vector.get_y();
	var v2 = vector.get_z();
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
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom._Matrix44.Matrix44_Impl_.applyLeftMultiplyPoint3D = function(this1,vector) {
	var v0 = vector.get_x();
	var v1 = vector.get_y();
	var v2 = vector.get_z();
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
	return thx.geom.d3._Point.Point_Impl_.set(vector,x,y,z);
};
thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint3D = function(this1,vector) {
	var v0 = vector.get_x();
	var v1 = vector.get_y();
	var v2 = vector.get_z();
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
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom._Matrix44.Matrix44_Impl_.rightMultiplyPoint = function(this1,vector) {
	var v0 = vector.get_x();
	var v1 = vector.get_y();
	var v2 = 0;
	var v3 = 1;
	var x = v0 * this1[0] + v1 * this1[1] + v2 * this1[2] + v3 * this1[3];
	var y = v0 * this1[4] + v1 * this1[5] + v2 * this1[6] + v3 * this1[7];
	var w = v0 * this1[12] + v1 * this1[13] + v2 * this1[14] + v3 * this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
	}
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint = function(this1,vector) {
	var v0 = vector.get_x();
	var v1 = vector.get_y();
	var v2 = 0;
	var v3 = 1;
	var x = v0 * this1[0] + v1 * this1[4] + v2 * this1[8] + v3 * this1[12];
	var y = v0 * this1[1] + v1 * this1[5] + v2 * this1[9] + v3 * this1[13];
	var w = v0 * this1[3] + v1 * this1[7] + v2 * this1[11] + v3 * this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
	}
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom._Matrix44.Matrix44_Impl_.applyLeftMultiplyPoint = function(this1,vector) {
	var v0 = vector.get_x();
	var v1 = vector.get_y();
	var v2 = 0;
	var v3 = 1;
	var x = v0 * this1[0] + v1 * this1[4] + v2 * this1[8] + v3 * this1[12];
	var y = v0 * this1[1] + v1 * this1[5] + v2 * this1[9] + v3 * this1[13];
	var w = v0 * this1[3] + v1 * this1[7] + v2 * this1[11] + v3 * this1[15];
	if(w != 1) {
		var invw = 1.0 / w;
		x *= invw;
		y *= invw;
	}
	thx.geom.d2._Point.Point_Impl_.set(vector,x,y);
	return vector;
};
thx.geom._Matrix44.Matrix44_Impl_.isMirroring = function(this1) {
	var u = new thx.geom.d3.xyz.MutXYZ(this1[0],this1[4],this1[8]);
	var v = new thx.geom.d3.xyz.MutXYZ(this1[1],this1[5],this1[9]);
	var w = new thx.geom.d3.xyz.MutXYZ(this1[2],this1[6],this1[10]);
	var mirrorvalue;
	var this2 = thx.geom.d3._Point.Point_Impl_.cross(u,v);
	mirrorvalue = this2.get_x() * w.get_x() + this2.get_y() * w.get_y() + this2.get_z() * w.get_z();
	var ismirror = mirrorvalue < 0;
	return ismirror;
};
thx.geom._Matrix44.Matrix44_Impl_.inverse = function(this1) {
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
thx.geom._Matrix44.Matrix44_Impl_.at = function(this1,index) {
	return this1[index];
};
thx.geom._Matrix44.Matrix44_Impl_.toString = function(this1) {
	return "matrix(" + this1.join(",") + ")";
};
thx.geom.d2 = {};
thx.geom.d2.xy = {};
thx.geom.d2.xy.XY = function() { };
thx.geom.d2.xy.XY.__name__ = true;
thx.geom.d2.xy.XY.__interfaces__ = [thx.geom.ITransformable44];
thx.geom.d3 = {};
thx.geom.d3.xyz = {};
thx.geom.d3.xyz.XYZ = function() { };
thx.geom.d3.xyz.XYZ.__name__ = true;
thx.geom.d3.xyz.XYZ.__interfaces__ = [thx.geom.ITransformable44,thx.geom.d2.xy.XY];
thx.geom.d3.xyz.ImmutableXYZ = function(x,y,z) {
	this._x = x;
	this._y = y;
	this._z = z;
};
thx.geom.d3.xyz.ImmutableXYZ.__name__ = true;
thx.geom.d3.xyz.ImmutableXYZ.__interfaces__ = [thx.geom.d3.xyz.XYZ];
thx.geom.d3.xyz.ImmutableXYZ.prototype = {
	apply44: function(matrix) {
		thx.geom._Matrix44.Matrix44_Impl_.applyLeftMultiplyPoint3D(matrix,this);
		return this;
	}
	,clone: function() {
		return new thx.geom.d3.xyz.MutXYZ(this._x,this._y,this._z);
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,get_z: function() {
		return this._z;
	}
	,set_x: function(v) {
		throw "this instance of Point cannot be modified";
	}
	,set_y: function(v) {
		throw "this instance of Point cannot be modified";
	}
	,set_z: function(v) {
		throw "this instance of Point cannot be modified";
	}
};
thx.geom.d3.Plane = function(normal,w) {
	this.normal = normal;
	this.w = w;
};
thx.geom.d3.Plane.__name__ = true;
thx.geom.d3.Plane.fromPoints = function(a,b,c) {
	var n;
	var this1 = thx.geom.d3._Point.Point_Impl_.cross((function($this) {
		var $r;
		var p;
		p = (function($this) {
			var $r;
			var x1 = -a.get_x();
			var y1 = -a.get_y();
			var z1 = -a.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
			return $r;
		}($this));
		var x = b.get_x() + p.get_x();
		var y = b.get_y() + p.get_y();
		var z = b.get_z() + p.get_z();
		$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		return $r;
	}(this)),(function($this) {
		var $r;
		var p1;
		p1 = (function($this) {
			var $r;
			var x3 = -a.get_x();
			var y3 = -a.get_y();
			var z3 = -a.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x3,y3,z3);
			return $r;
		}($this));
		var x2 = c.get_x() + p1.get_x();
		var y2 = c.get_y() + p1.get_y();
		var z2 = c.get_z() + p1.get_z();
		$r = new thx.geom.d3.xyz.MutXYZ(x2,y2,z2);
		return $r;
	}(this)));
	var v = Math.sqrt(this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y() + this1.get_z() * this1.get_z());
	var x4 = this1.get_x() / v;
	var y4 = this1.get_y() / v;
	var z4 = this1.get_z() / v;
	n = new thx.geom.d3.xyz.MutXYZ(x4,y4,z4);
	return new thx.geom.d3.Plane(n,n.get_x() * a.get_x() + n.get_y() * a.get_y() + n.get_z() * a.get_z());
};
thx.geom.d3.Plane.anyPlaneFromPoints = function(a,b,c) {
	var v1;
	v1 = (function($this) {
		var $r;
		var p;
		p = (function($this) {
			var $r;
			var x1 = -a.get_x();
			var y1 = -a.get_y();
			var z1 = -a.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
			return $r;
		}($this));
		var x = b.get_x() + p.get_x();
		var y = b.get_y() + p.get_y();
		var z = b.get_z() + p.get_z();
		$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		return $r;
	}(this));
	var v2;
	v2 = (function($this) {
		var $r;
		var p1;
		p1 = (function($this) {
			var $r;
			var x3 = -a.get_x();
			var y3 = -a.get_y();
			var z3 = -a.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x3,y3,z3);
			return $r;
		}($this));
		var x2 = c.get_x() + p1.get_x();
		var y2 = c.get_y() + p1.get_y();
		var z2 = c.get_z() + p1.get_z();
		$r = new thx.geom.d3.xyz.MutXYZ(x2,y2,z2);
		return $r;
	}(this));
	if(Math.sqrt(v1.get_x() * v1.get_x() + v1.get_y() * v1.get_y() + v1.get_z() * v1.get_z()) < 10e-10) v1 = thx.geom.d3._Point.Point_Impl_.randomNonParallelVector(v2);
	if(Math.sqrt(v2.get_x() * v2.get_x() + v2.get_y() * v2.get_y() + v2.get_z() * v2.get_z()) < 10e-10) v2 = thx.geom.d3._Point.Point_Impl_.randomNonParallelVector(v1);
	var normal = thx.geom.d3._Point.Point_Impl_.cross(v1,v2);
	if(Math.sqrt(normal.get_x() * normal.get_x() + normal.get_y() * normal.get_y() + normal.get_z() * normal.get_z()) < 10e-10) {
		v2 = thx.geom.d3._Point.Point_Impl_.randomNonParallelVector(v1);
		normal = thx.geom.d3._Point.Point_Impl_.cross(v1,v2);
	}
	normal = (function($this) {
		var $r;
		var v = Math.sqrt(normal.get_x() * normal.get_x() + normal.get_y() * normal.get_y() + normal.get_z() * normal.get_z());
		var x4 = normal.get_x() / v;
		var y4 = normal.get_y() / v;
		var z4 = normal.get_z() / v;
		$r = new thx.geom.d3.xyz.MutXYZ(x4,y4,z4);
		return $r;
	}(this));
	return new thx.geom.d3.Plane(normal,normal.get_x() * a.get_x() + normal.get_y() * a.get_y() + normal.get_z() * a.get_z());
};
thx.geom.d3.Plane.fromNormalAndPoint = function(normal,point) {
	normal = (function($this) {
		var $r;
		var v = Math.sqrt(normal.get_x() * normal.get_x() + normal.get_y() * normal.get_y() + normal.get_z() * normal.get_z());
		var x = normal.get_x() / v;
		var y = normal.get_y() / v;
		var z = normal.get_z() / v;
		$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		return $r;
	}(this));
	return new thx.geom.d3.Plane(normal,point.get_x() * normal.get_x() + point.get_y() * normal.get_y() + point.get_z() * normal.get_z());
};
thx.geom.d3.Plane.prototype = {
	flip: function() {
		return new thx.geom.d3.Plane((function($this) {
			var $r;
			var this1 = $this.normal;
			var x = -this1.get_x();
			var y = -this1.get_y();
			var z = -this1.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
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
			t1 = (function($this) {
				var $r;
				var this1 = $this.normal;
				var p = vertex.position;
				$r = this1.get_x() * p.get_x() + this1.get_y() * p.get_y() + this1.get_z() * p.get_z();
				return $r;
			}(this)) - this.w;
			if(t1 < -1e-09) type = 2; else if(t1 > 10e-10) type = 1; else type = 0;
			polygonType |= type;
			types.push(type);
		}
		switch(polygonType) {
		case 0:
			((function($this) {
				var $r;
				var this2 = $this.normal;
				var p1 = polygon.get_plane().normal;
				$r = this2.get_x() * p1.get_x() + this2.get_y() * p1.get_y() + this2.get_z() * p1.get_z();
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
					t1 = (this.w - (function($this) {
						var $r;
						var this3 = $this.normal;
						var p2 = vi.position;
						$r = this3.get_x() * p2.get_x() + this3.get_y() * p2.get_y() + this3.get_z() * p2.get_z();
						return $r;
					}(this))) / (function($this) {
						var $r;
						var this4 = $this.normal;
						var p3;
						{
							var this5 = vj.position;
							var p4 = vi.position;
							var p5;
							p5 = (function($this) {
								var $r;
								var x1 = -p4.get_x();
								var y1 = -p4.get_y();
								var z1 = -p4.get_z();
								$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
								return $r;
							}($this));
							var x = this5.get_x() + p5.get_x();
							var y = this5.get_y() + p5.get_y();
							var z = this5.get_z() + p5.get_z();
							p3 = new thx.geom.d3.xyz.MutXYZ(x,y,z);
						}
						$r = this4.get_x() * p3.get_x() + this4.get_y() * p3.get_y() + this4.get_z() * p3.get_z();
						return $r;
					}(this));
					v = new thx.geom.d3.Vertex(thx.geom.d3._Point.Point_Impl_.interpolate(vi.position,vj.position,t1),thx.geom.d3._Point.Point_Impl_.interpolate(vi.normal,vj.normal,t1));
					f.push(v);
					b.push(v);
				}
			}
			if(f.length >= 3) front.push(new thx.geom.d3.Polygon(f));
			if(b.length >= 3) back.push(new thx.geom.d3.Polygon(b));
			break;
		}
	}
	,equals: function(other) {
		return (function($this) {
			var $r;
			var this1 = $this.normal;
			var p = other.normal;
			$r = this1.get_x() == p.get_x() && this1.get_y() == p.get_y() && this1.get_z() == p.get_z();
			return $r;
		}(this)) && this.w == other.w;
	}
	,transform: function(matrix) {
		var ismirror = thx.geom._Matrix44.Matrix44_Impl_.isMirroring(matrix);
		var r = thx.geom.d3._Point.Point_Impl_.randomNonParallelVector(this.normal);
		var u = thx.geom.d3._Point.Point_Impl_.cross(this.normal,r);
		var v = thx.geom.d3._Point.Point_Impl_.cross(this.normal,u);
		var point1;
		var this1 = this.normal;
		var v1 = this.w;
		var x = this1.get_x() * v1;
		var y = this1.get_y() * v1;
		var z = this1.get_z() * v1;
		point1 = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		var point2;
		point2 = (function($this) {
			var $r;
			var x1 = point1.get_x() + u.get_x();
			var y1 = point1.get_y() + u.get_y();
			var z1 = point1.get_z() + u.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
			return $r;
		}(this));
		var point3;
		point3 = (function($this) {
			var $r;
			var x2 = point1.get_x() + v.get_x();
			var y2 = point1.get_y() + v.get_y();
			var z2 = point1.get_z() + v.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x2,y2,z2);
			return $r;
		}(this));
		point1 = thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint3D(matrix,point1);
		point2 = thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint3D(matrix,point2);
		point3 = thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint3D(matrix,point3);
		var newplane = thx.geom.d3.Plane.fromPoints(point1,point2,point3);
		if(ismirror) newplane = newplane.flip();
		return newplane;
	}
	,splitLineBetweenPoints: function(p1,p2) {
		var direction;
		direction = (function($this) {
			var $r;
			var p;
			p = (function($this) {
				var $r;
				var x1 = -p1.get_x();
				var y1 = -p1.get_y();
				var z1 = -p1.get_z();
				$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
				return $r;
			}($this));
			var x = p2.get_x() + p.get_x();
			var y = p2.get_y() + p.get_y();
			var z = p2.get_z() + p.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
			return $r;
		}(this));
		var lambda;
		lambda = (this.w - (function($this) {
			var $r;
			var this1 = $this.normal;
			$r = this1.get_x() * p1.get_x() + this1.get_y() * p1.get_y() + this1.get_z() * p1.get_z();
			return $r;
		}(this))) / (function($this) {
			var $r;
			var this2 = $this.normal;
			$r = this2.get_x() * direction.get_x() + this2.get_y() * direction.get_y() + this2.get_z() * direction.get_z();
			return $r;
		}(this));
		if(isNaN(lambda)) lambda = 0; else if(lambda > 1) lambda = 1; else if(lambda < 0) lambda = 0;
		var p3;
		p3 = (function($this) {
			var $r;
			var x3 = direction.get_x() * lambda;
			var y3 = direction.get_y() * lambda;
			var z3 = direction.get_z() * lambda;
			$r = new thx.geom.d3.xyz.MutXYZ(x3,y3,z3);
			return $r;
		}(this));
		var x2 = p1.get_x() + p3.get_x();
		var y2 = p1.get_y() + p3.get_y();
		var z2 = p1.get_z() + p3.get_z();
		return new thx.geom.d3.xyz.MutXYZ(x2,y2,z2);
	}
	,intersectWithLine: function(line) {
		return line.intersectWithPlane(this);
	}
	,intersectWithPlane: function(plane) {
		return thx.geom.d3.Line.fromPlanes(this,plane);
	}
	,signedDistanceToPoint: function(point) {
		return (function($this) {
			var $r;
			var this1 = $this.normal;
			$r = this1.get_x() * point.get_x() + this1.get_y() * point.get_y() + this1.get_z() * point.get_z();
			return $r;
		}(this)) - this.w;
	}
	,toString: function() {
		return "Plane [normal: " + (function($this) {
			var $r;
			var this1 = $this.normal;
			$r = "Point(" + this1.get_x() + "," + this1.get_y() + "," + this1.get_z() + ")";
			return $r;
		}(this)) + ", w: " + this.w + "]";
	}
	,mirrorPoint: function(point3d) {
		var distance = this.signedDistanceToPoint(point3d);
		var mirrored;
		var p;
		var this1 = this.normal;
		var v = distance * 2.0;
		var x1 = this1.get_x() * v;
		var y1 = this1.get_y() * v;
		var z1 = this1.get_z() * v;
		p = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
		var p1;
		p1 = (function($this) {
			var $r;
			var x2 = -p.get_x();
			var y2 = -p.get_y();
			var z2 = -p.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x2,y2,z2);
			return $r;
		}(this));
		var x = point3d.get_x() + p1.get_x();
		var y = point3d.get_y() + p1.get_y();
		var z = point3d.get_z() + p1.get_z();
		mirrored = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		return mirrored;
	}
};
thx.geom.Transformables44 = function() { };
thx.geom.Transformables44.__name__ = true;
thx.geom.Transformables44.applyMirror = function(o,plane) {
	return o.apply44(thx.geom._Matrix44.Matrix44_Impl_.mirroring(plane));
};
thx.geom.Transformables44.applyMirrorX = function(o) {
	return o.apply44(thx.geom.Transformables44.MX);
};
thx.geom.Transformables44.applyMirrorY = function(o) {
	return o.apply44(thx.geom.Transformables44.MY);
};
thx.geom.Transformables44.applyMirrorZ = function(o) {
	return o.apply44(thx.geom.Transformables44.MZ);
};
thx.geom.Transformables44.applyRotateX = function(o,angle) {
	return o.apply44(thx.geom._Matrix44.Matrix44_Impl_.rotationX(angle));
};
thx.geom.Transformables44.applyRotateY = function(o,angle) {
	return o.apply44(thx.geom._Matrix44.Matrix44_Impl_.rotationY(angle));
};
thx.geom.Transformables44.applyRotateZ = function(o,angle) {
	return o.apply44(thx.geom._Matrix44.Matrix44_Impl_.rotationZ(angle));
};
thx.geom.Transformables44.applyRotateOnAxis = function(o,center,axis,angle) {
	return o.apply44(thx.geom._Matrix44.Matrix44_Impl_.rotation(center,axis,angle));
};
thx.geom.Transformables44.applyScale = function(o,x,y,z) {
	return o.apply44(thx.geom._Matrix44.Matrix44_Impl_.scaling(x,y,z));
};
thx.geom.Transformables44.applyScaleX = function(o,x) {
	return o.apply44(thx.geom._Matrix44.Matrix44_Impl_.scaling(x,0,0));
};
thx.geom.Transformables44.applyScaleY = function(o,y) {
	return o.apply44(thx.geom._Matrix44.Matrix44_Impl_.scaling(0,y,0));
};
thx.geom.Transformables44.applyScaleZ = function(o,z) {
	return o.apply44(thx.geom._Matrix44.Matrix44_Impl_.scaling(0,0,z));
};
thx.geom.Transformables44.applyTranslation = function(o,x,y,z) {
	return o.apply44(thx.geom._Matrix44.Matrix44_Impl_.translation(x,y,z));
};
thx.geom.Transformables44.applyTranslationX = function(o,x) {
	return thx.geom.Transformables44.applyTranslation(o,x,0,0);
};
thx.geom.Transformables44.applyTranslationY = function(o,y) {
	return thx.geom.Transformables44.applyTranslation(o,0,y,0);
};
thx.geom.Transformables44.applyTranslationZ = function(o,z) {
	return thx.geom.Transformables44.applyTranslation(o,0,0,z);
};
thx.geom.Transformables44.mirror = function(o,plane) {
	return thx.geom.Transformables44.applyMirror(o.clone(),plane);
};
thx.geom.Transformables44.mirrorX = function(o) {
	return thx.geom.Transformables44.applyMirrorX(o.clone());
};
thx.geom.Transformables44.mirrorY = function(o) {
	return thx.geom.Transformables44.applyMirrorY(o.clone());
};
thx.geom.Transformables44.mirrorZ = function(o) {
	return thx.geom.Transformables44.applyMirrorZ(o.clone());
};
thx.geom.Transformables44.rotateX = function(o,angle) {
	return thx.geom.Transformables44.applyRotateX(o.clone(),angle);
};
thx.geom.Transformables44.rotateY = function(o,angle) {
	return thx.geom.Transformables44.applyRotateY(o.clone(),angle);
};
thx.geom.Transformables44.rotateZ = function(o,angle) {
	return thx.geom.Transformables44.applyRotateZ(o.clone(),angle);
};
thx.geom.Transformables44.rotateOnAxis = function(o,center,axis,angle) {
	return thx.geom.Transformables44.applyRotateOnAxis(o.clone(),center,axis,angle);
};
thx.geom.Transformables44.scale = function(o,x,y,z) {
	return o.apply44(thx.geom._Matrix44.Matrix44_Impl_.scaling(x,y,z));
};
thx.geom.Transformables44.scaleX = function(o,x) {
	return thx.geom.Transformables44.applyScaleX(o.clone(),x);
};
thx.geom.Transformables44.scaleY = function(o,y) {
	return thx.geom.Transformables44.applyScaleY(o.clone(),y);
};
thx.geom.Transformables44.scaleZ = function(o,z) {
	return thx.geom.Transformables44.applyScaleZ(o.clone(),z);
};
thx.geom.Transformables44.translate = function(o,x,y,z) {
	return thx.geom.Transformables44.applyTranslation(o.clone(),x,y,z);
};
thx.geom.Transformables44.translateX = function(o,x) {
	return thx.geom.Transformables44.translate(o,x,0,0);
};
thx.geom.Transformables44.translateY = function(o,y) {
	return thx.geom.Transformables44.translate(o,0,y,0);
};
thx.geom.Transformables44.translateZ = function(o,z) {
	return thx.geom.Transformables44.translate(o,0,0,z);
};
thx.geom.d2.Line = function(normal,w) {
	var l = Math.sqrt(normal.get_x() * normal.get_x() + normal.get_y() * normal.get_y());
	this.w = w * l;
	this.normal = (function($this) {
		var $r;
		var x = normal.get_x() / l;
		var y = normal.get_y() / l;
		$r = new thx.geom.d2.xy.MutXY(x,y);
		return $r;
	}(this));
};
thx.geom.d2.Line.__name__ = true;
thx.geom.d2.Line.fromPoints = function(p1,p2) {
	var direction;
	direction = (function($this) {
		var $r;
		var p;
		p = (function($this) {
			var $r;
			var x1 = -p1.get_x();
			var y1 = -p1.get_y();
			$r = new thx.geom.d2.xy.MutXY(x1,y1);
			return $r;
		}($this));
		var x = p2.get_x() + p.get_x();
		var y = p2.get_y() + p.get_y();
		$r = new thx.geom.d2.xy.MutXY(x,y);
		return $r;
	}(this));
	var normal;
	var this1;
	var this2;
	this2 = (function($this) {
		var $r;
		var x4 = direction.get_y();
		var y4 = -direction.get_x();
		$r = new thx.geom.d2.xy.MutXY(x4,y4);
		return $r;
	}(this));
	var x3 = -this2.get_x();
	var y3 = -this2.get_y();
	this1 = new thx.geom.d2.xy.MutXY(x3,y3);
	var v = Math.sqrt(this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y());
	var x2 = this1.get_x() / v;
	var y2 = this1.get_y() / v;
	normal = new thx.geom.d2.xy.MutXY(x2,y2);
	var w = p1.get_x() * normal.get_x() + p1.get_y() * normal.get_y();
	return new thx.geom.d2.Line(normal,w);
};
thx.geom.d2.Line.prototype = {
	offset: function(value) {
		return new thx.geom.d2.Line(this.normal,this.w + value);
	}
	,reverse: function() {
		return new thx.geom.d2.Line((function($this) {
			var $r;
			var this1 = $this.normal;
			var x = -this1.get_x();
			var y = -this1.get_y();
			$r = new thx.geom.d2.xy.MutXY(x,y);
			return $r;
		}(this)),-this.w);
	}
	,equals: function(other) {
		return (function($this) {
			var $r;
			var this1 = $this.normal;
			var p = other.normal;
			$r = this1.get_x() == p.get_x() && this1.get_y() == p.get_y();
			return $r;
		}(this)) && this.w == other.w;
	}
	,origin: function() {
		var this1 = this.normal;
		var v = this.w;
		var x = this1.get_x() * v;
		var y = this1.get_y() * v;
		return new thx.geom.d2.xy.MutXY(x,y);
	}
	,direction: function() {
		var this1 = this.normal;
		var x = this1.get_y();
		var y = -this1.get_x();
		return new thx.geom.d2.xy.MutXY(x,y);
	}
	,xAtY: function(y) {
		return (this.w - this.normal.get_y() * y) / this.normal.get_x();
	}
	,absDistanceToPoint: function(point) {
		return Math.abs((function($this) {
			var $r;
			var p = $this.normal;
			$r = point.get_x() * p.get_x() + point.get_y() * p.get_y();
			return $r;
		}(this)) - this.w);
	}
	,intersectionLine: function(line) {
		return thx.geom.d2._Point.Point_Impl_.solve2Linear(this.normal.get_x(),this.normal.get_y(),line.normal.get_x(),line.normal.get_y(),this.w,line.w);
	}
	,transform: function(matrix) {
		var origin = new thx.geom.d2.xy.MutXY(0,0);
		var pointOnPlane;
		var this1 = this.normal;
		var v = this.w;
		var x = this1.get_x() * v;
		var y = this1.get_y() * v;
		pointOnPlane = new thx.geom.d2.xy.MutXY(x,y);
		var neworigin = thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint(matrix,origin);
		var neworiginPlusNormal = thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint(matrix,this.normal);
		var newnormal;
		newnormal = (function($this) {
			var $r;
			var p;
			p = (function($this) {
				var $r;
				var x2 = -neworigin.get_x();
				var y2 = -neworigin.get_y();
				$r = new thx.geom.d2.xy.MutXY(x2,y2);
				return $r;
			}($this));
			var x1 = neworiginPlusNormal.get_x() + p.get_x();
			var y1 = neworiginPlusNormal.get_y() + p.get_y();
			$r = new thx.geom.d2.xy.MutXY(x1,y1);
			return $r;
		}(this));
		var newpointOnPlane = thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint(matrix,pointOnPlane);
		var neww = newnormal.get_x() * newpointOnPlane.get_x() + newnormal.get_y() * newpointOnPlane.get_y();
		return new thx.geom.d2.Line(newnormal,neww);
	}
	,get_isHorizontal: function() {
		return this.normal.get_x() == 0;
	}
	,get_isVertical: function() {
		return this.normal.get_y() == 0;
	}
	,toString: function() {
		return "Line(" + this.normal.get_x() + "," + this.normal.get_y() + ",w:" + this.w + ")";
	}
};
thx.geom.d2.xy.ImmutableXY = function(x,y) {
	this._x = x;
	this._y = y;
};
thx.geom.d2.xy.ImmutableXY.__name__ = true;
thx.geom.d2.xy.ImmutableXY.__interfaces__ = [thx.geom.d2.xy.XY];
thx.geom.d2.xy.ImmutableXY.prototype = {
	apply44: function(matrix) {
		thx.geom._Matrix44.Matrix44_Impl_.applyLeftMultiplyPoint(matrix,this);
		return this;
	}
	,clone: function() {
		return new thx.geom.d2.xy.MutXY(this._x,this._y);
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,set_x: function(v) {
		throw "this instance of Point cannot be modified";
	}
	,set_y: function(v) {
		throw "this instance of Point cannot be modified";
	}
};
thx.geom.d2._Point = {};
thx.geom.d2._Point.Point_Impl_ = {};
thx.geom.d2._Point.Point_Impl_.__name__ = true;
thx.geom.d2._Point.Point_Impl_.fromFloats = function(arr) {
	thx.core.ArrayFloats.resize(arr,2,0);
	return new thx.geom.d2.xy.MutXY(arr[0],arr[1]);
};
thx.geom.d2._Point.Point_Impl_.fromObject = function(o) {
	return thx.geom.d2._Point.Point_Impl_.create(o.x,o.y);
};
thx.geom.d2._Point.Point_Impl_.fromAngle = function(angle) {
	return thx.geom.d2._Point.Point_Impl_.create(Math.cos(angle),Math.sin(angle));
};
thx.geom.d2._Point.Point_Impl_.create = function(x,y) {
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.linked = function(getX,getY,setX,setY) {
	return new thx.geom.d2.xy.LinkedXY(getX,getY,setX,setY);
};
thx.geom.d2._Point.Point_Impl_.immutable = function(x,y) {
	return new thx.geom.d2.xy.ImmutableXY(x,y);
};
thx.geom.d2._Point.Point_Impl_._new = function(xy) {
	return xy;
};
thx.geom.d2._Point.Point_Impl_.addPointAssign = function(this1,p) {
	return thx.geom.d2._Point.Point_Impl_.set(this1,this1.get_x() + p.get_x(),this1.get_y() + p.get_y());
};
thx.geom.d2._Point.Point_Impl_.addPoint = function(this1,p) {
	var x = this1.get_x() + p.get_x();
	var y = this1.get_y() + p.get_y();
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.addAssign = function(this1,v) {
	return thx.geom.d2._Point.Point_Impl_.set(this1,this1.get_x() + v,this1.get_y() + v);
};
thx.geom.d2._Point.Point_Impl_.add = function(this1,v) {
	var x = this1.get_x() + v;
	var y = this1.get_y() + v;
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.negate = function(this1) {
	var x = -this1.get_x();
	var y = -this1.get_y();
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.subtractPointAssign = function(this1,p) {
	return thx.geom.d2._Point.Point_Impl_.set(this1,this1.get_x() - p.get_x(),this1.get_y() - p.get_y());
};
thx.geom.d2._Point.Point_Impl_.subtractPoint = function(this1,p) {
	var p1;
	p1 = (function($this) {
		var $r;
		var x1 = -p.get_x();
		var y1 = -p.get_y();
		$r = new thx.geom.d2.xy.MutXY(x1,y1);
		return $r;
	}(this));
	var x = this1.get_x() + p1.get_x();
	var y = this1.get_y() + p1.get_y();
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.subtractAssign = function(this1,v) {
	return thx.geom.d2._Point.Point_Impl_.set(this1,this1.get_x() - v,this1.get_y() - v);
};
thx.geom.d2._Point.Point_Impl_.subtract = function(this1,v) {
	var v1 = -v;
	var x = this1.get_x() + v1;
	var y = this1.get_y() + v1;
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.multiplyPointAssign = function(this1,p) {
	return thx.geom.d2._Point.Point_Impl_.set(this1,this1.get_x() * p.get_x(),this1.get_y() * p.get_y());
};
thx.geom.d2._Point.Point_Impl_.multiplyPoint = function(this1,p) {
	var x = this1.get_x() * p.get_x();
	var y = this1.get_y() * p.get_y();
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.multiplyAssign = function(this1,v) {
	return thx.geom.d2._Point.Point_Impl_.set(this1,this1.get_x() * v,this1.get_y() * v);
};
thx.geom.d2._Point.Point_Impl_.multiply = function(this1,v) {
	var x = this1.get_x() * v;
	var y = this1.get_y() * v;
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.dividePointAssign = function(this1,p) {
	return thx.geom.d2._Point.Point_Impl_.set(this1,this1.get_x() / p.get_x(),this1.get_y() / p.get_y());
};
thx.geom.d2._Point.Point_Impl_.dividePoint = function(this1,p) {
	var x = this1.get_x() / p.get_x();
	var y = this1.get_y() / p.get_y();
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.divideAssign = function(this1,v) {
	return thx.geom.d2._Point.Point_Impl_.set(this1,this1.get_x() / v,this1.get_y() / v);
};
thx.geom.d2._Point.Point_Impl_.divide = function(this1,v) {
	var x = this1.get_x() / v;
	var y = this1.get_y() / v;
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.equals = function(this1,p) {
	return this1.get_x() == p.get_x() && this1.get_y() == p.get_y();
};
thx.geom.d2._Point.Point_Impl_.notEquals = function(this1,p) {
	return !(this1.get_x() == p.get_x() && this1.get_y() == p.get_y());
};
thx.geom.d2._Point.Point_Impl_.abs = function(this1) {
	var x = Math.abs(this1.get_x());
	var y = Math.abs(this1.get_y());
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.copyTo = function(this1,other) {
	return thx.geom.d2._Point.Point_Impl_.set(other,this1.get_x(),this1.get_y());
};
thx.geom.d2._Point.Point_Impl_.nearEquals = function(this1,p) {
	return Math.abs(this1.get_x() - p.get_x()) <= 10e-10 && Math.abs(this1.get_y() - p.get_y()) <= 10e-10;
};
thx.geom.d2._Point.Point_Impl_.notNearEquals = function(this1,p) {
	return !thx.geom.d2._Point.Point_Impl_.nearEquals(this1,p);
};
thx.geom.d2._Point.Point_Impl_.interpolate = function(this1,p,f) {
	var p1;
	var this2;
	this2 = (function($this) {
		var $r;
		var p2;
		p2 = (function($this) {
			var $r;
			var x3 = -this1.get_x();
			var y3 = -this1.get_y();
			$r = new thx.geom.d2.xy.MutXY(x3,y3);
			return $r;
		}($this));
		var x2 = p.get_x() + p2.get_x();
		var y2 = p.get_y() + p2.get_y();
		$r = new thx.geom.d2.xy.MutXY(x2,y2);
		return $r;
	}(this));
	var x1 = this2.get_x() * f;
	var y1 = this2.get_y() * f;
	p1 = new thx.geom.d2.xy.MutXY(x1,y1);
	var x = this1.get_x() + p1.get_x();
	var y = this1.get_y() + p1.get_y();
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.isZero = function(this1) {
	var p = thx.geom.d2._Point.Point_Impl_.zero;
	return this1.get_x() == p.get_x() && this1.get_y() == p.get_y();
};
thx.geom.d2._Point.Point_Impl_.isNearZero = function(this1) {
	return thx.geom.d2._Point.Point_Impl_.nearEquals(this1,thx.geom.d2._Point.Point_Impl_.zero);
};
thx.geom.d2._Point.Point_Impl_.clone = function(this1) {
	return this1.clone();
};
thx.geom.d2._Point.Point_Impl_.apply44 = function(this1,matrix) {
	return this1.apply44(matrix);
};
thx.geom.d2._Point.Point_Impl_.dot = function(this1,p) {
	return this1.get_x() * p.get_x() + this1.get_y() * p.get_y();
};
thx.geom.d2._Point.Point_Impl_.normal = function(this1) {
	var x = this1.get_y();
	var y = -this1.get_x();
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.normalize = function(this1) {
	var v = Math.sqrt(this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y());
	var x = this1.get_x() / v;
	var y = this1.get_y() / v;
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.distanceTo = function(this1,p) {
	return Math.abs((function($this) {
		var $r;
		var this2;
		this2 = (function($this) {
			var $r;
			var p1;
			p1 = (function($this) {
				var $r;
				var x1 = -p.get_x();
				var y1 = -p.get_y();
				$r = new thx.geom.d2.xy.MutXY(x1,y1);
				return $r;
			}($this));
			var x = this1.get_x() + p1.get_x();
			var y = this1.get_y() + p1.get_y();
			$r = new thx.geom.d2.xy.MutXY(x,y);
			return $r;
		}($this));
		$r = Math.sqrt(this2.get_x() * this2.get_x() + this2.get_y() * this2.get_y());
		return $r;
	}(this)));
};
thx.geom.d2._Point.Point_Impl_.distanceToSquared = function(this1,p) {
	var this2;
	this2 = (function($this) {
		var $r;
		var p1;
		p1 = (function($this) {
			var $r;
			var x1 = -p.get_x();
			var y1 = -p.get_y();
			$r = new thx.geom.d2.xy.MutXY(x1,y1);
			return $r;
		}($this));
		var x = this1.get_x() + p1.get_x();
		var y = this1.get_y() + p1.get_y();
		$r = new thx.geom.d2.xy.MutXY(x,y);
		return $r;
	}(this));
	return this2.get_x() * this2.get_x() + this2.get_y() * this2.get_y();
};
thx.geom.d2._Point.Point_Impl_.transform = function(this1,matrix) {
	return thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint(matrix,this1);
};
thx.geom.d2._Point.Point_Impl_.cross = function(this1,p) {
	return this1.get_x() * p.get_y() - this1.get_y() * p.get_x();
};
thx.geom.d2._Point.Point_Impl_.min = function(this1,p) {
	var x = Math.min(this1.get_x(),p.get_x());
	var y = Math.min(this1.get_y(),p.get_y());
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.minX = function(this1,p) {
	var x = Math.min(this1.get_x(),p.get_x());
	var y = this1.get_y();
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.minY = function(this1,p) {
	var x = this1.get_x();
	var y = Math.min(this1.get_y(),p.get_y());
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.max = function(this1,p) {
	var x = Math.max(this1.get_x(),p.get_x());
	var y = Math.max(this1.get_y(),p.get_y());
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.maxX = function(this1,p) {
	var x = Math.max(this1.get_x(),p.get_x());
	var y = this1.get_y();
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.maxY = function(this1,p) {
	var x = this1.get_x();
	var y = Math.max(this1.get_y(),p.get_y());
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.pointAt = function(this1,angle,distance) {
	var this2 = this1;
	var p;
	var this3 = thx.geom.d2._Point.Point_Impl_.create(Math.cos(angle),Math.sin(angle));
	var x1 = this3.get_x() * distance;
	var y1 = this3.get_y() * distance;
	p = new thx.geom.d2.xy.MutXY(x1,y1);
	var x = this2.get_x() + p.get_x();
	var y = this2.get_y() + p.get_y();
	return new thx.geom.d2.xy.MutXY(x,y);
};
thx.geom.d2._Point.Point_Impl_.isOnLine = function(this1,line) {
	if(line.get_isHorizontal()) return thx.core.Floats.nearEquals(this1.get_y(),line.w);
	return thx.core.Floats.nearEquals(line.xAtY(this1.get_y()),this1.get_x());
};
thx.geom.d2._Point.Point_Impl_.set = function(this1,nx,ny) {
	this1.set_x(nx);
	this1.set_y(ny);
	return this1;
};
thx.geom.d2._Point.Point_Impl_.toAngle = function(this1) {
	return Math.atan2(this1.get_y(),this1.get_x());
};
thx.geom.d2._Point.Point_Impl_.toArray = function(this1) {
	return [this1.get_x(),this1.get_y()];
};
thx.geom.d2._Point.Point_Impl_.toObject = function(this1) {
	return { x : this1.get_x(), y : this1.get_y()};
};
thx.geom.d2._Point.Point_Impl_.toString = function(this1) {
	return "Point(" + this1.get_x() + "," + this1.get_y() + ")";
};
thx.geom.d2._Point.Point_Impl_.solve2Linear = function(a,b,c,d,u,v) {
	var det = a * d - b * c;
	if(det == 0) return null;
	var invdet = 1.0 / det;
	var x = u * d - b * v;
	var y = -u * c + a * v;
	return new thx.geom.d2.xy.MutXY(x * invdet,y * invdet);
};
thx.geom.d2._Point.Point_Impl_.interpolateBetween2DPointsForY = function(p1,p2,y) {
	var f1 = y - p1.get_y();
	var f2 = p2.get_y() - p1.get_y();
	var t;
	if(f2 < 0) {
		f1 = -f1;
		f2 = -f2;
	}
	if(f1 <= 0) t = 0.0; else if(f1 >= f2) t = 1.0; else if(f2 < 1e-10) t = 0.5; else t = f1 / f2;
	return p1.get_x() + t * (p2.get_x() - p1.get_x());
};
thx.geom.d2._Point.Point_Impl_.get_x = function(this1) {
	return this1.get_x();
};
thx.geom.d2._Point.Point_Impl_.get_y = function(this1) {
	return this1.get_y();
};
thx.geom.d2._Point.Point_Impl_.set_x = function(this1,v) {
	return this1.set_x(v);
};
thx.geom.d2._Point.Point_Impl_.set_y = function(this1,v) {
	return this1.set_y(v);
};
thx.geom.d2._Point.Point_Impl_.get_length = function(this1) {
	return Math.sqrt(this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y());
};
thx.geom.d2._Point.Point_Impl_.get_lengthSquared = function(this1) {
	return this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y();
};
thx.geom.d2.xy.LinkedXY = function(getX,getY,setX,setY) {
	this.getX = getX;
	this.getY = getY;
	this.setX = setX;
	this.setY = setY;
};
thx.geom.d2.xy.LinkedXY.__name__ = true;
thx.geom.d2.xy.LinkedXY.__interfaces__ = [thx.geom.d2.xy.XY];
thx.geom.d2.xy.LinkedXY.prototype = {
	apply44: function(matrix) {
		thx.geom._Matrix44.Matrix44_Impl_.applyLeftMultiplyPoint(matrix,this);
		return this;
	}
	,clone: function() {
		return new thx.geom.d2.xy.MutXY(this.getX(),this.getY());
	}
	,get_x: function() {
		return this.getX();
	}
	,get_y: function() {
		return this.getY();
	}
	,set_x: function(v) {
		return this.setX(v);
	}
	,set_y: function(v) {
		return this.setY(v);
	}
};
thx.geom.d2.xy.MutXY = function(x,y) {
	this._x = x;
	this._y = y;
};
thx.geom.d2.xy.MutXY.__name__ = true;
thx.geom.d2.xy.MutXY.__interfaces__ = [thx.geom.d2.xy.XY];
thx.geom.d2.xy.MutXY.prototype = {
	apply44: function(matrix) {
		thx.geom._Matrix44.Matrix44_Impl_.applyLeftMultiplyPoint(matrix,this);
		return this;
	}
	,clone: function() {
		return new thx.geom.d2.xy.MutXY(this._x,this._y);
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,set_x: function(v) {
		return this._x = v;
	}
	,set_y: function(v) {
		return this._y = v;
	}
};
thx.geom.d3.Line = function(point,direction) {
	this.point = point;
	this.direction = (function($this) {
		var $r;
		var v = Math.sqrt(direction.get_x() * direction.get_x() + direction.get_y() * direction.get_y() + direction.get_z() * direction.get_z());
		var x = direction.get_x() / v;
		var y = direction.get_y() / v;
		var z = direction.get_z() / v;
		$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		return $r;
	}(this));
};
thx.geom.d3.Line.__name__ = true;
thx.geom.d3.Line.fromPoints = function(p1,p2) {
	return new thx.geom.d3.Line(p1,(function($this) {
		var $r;
		var this1;
		this1 = (function($this) {
			var $r;
			var p;
			p = (function($this) {
				var $r;
				var x2 = -p1.get_x();
				var y2 = -p1.get_y();
				var z2 = -p1.get_z();
				$r = new thx.geom.d3.xyz.MutXYZ(x2,y2,z2);
				return $r;
			}($this));
			var x1 = p2.get_x() + p.get_x();
			var y1 = p2.get_y() + p.get_y();
			var z1 = p2.get_z() + p.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
			return $r;
		}($this));
		var v = Math.sqrt(this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y() + this1.get_z() * this1.get_z());
		var x = this1.get_x() / v;
		var y = this1.get_y() / v;
		var z = this1.get_z() / v;
		$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		return $r;
	}(this)));
};
thx.geom.d3.Line.fromPlanes = function(p1,p2) {
	var direction = thx.geom.d3._Point.Point_Impl_.cross(p1.normal,p2.normal);
	var l = Math.sqrt(direction.get_x() * direction.get_x() + direction.get_y() * direction.get_y() + direction.get_z() * direction.get_z());
	if(l < 1e-10) throw "Parallel planes";
	var v = 1.0 / l;
	var x = direction.get_x() * v;
	var y = direction.get_y() * v;
	var z = direction.get_z() * v;
	direction = new thx.geom.d3.xyz.MutXYZ(x,y,z);
	var mabsx = Math.abs(direction.get_x());
	var mabsy = Math.abs(direction.get_y());
	var mabsz = Math.abs(direction.get_z());
	var origin;
	if(mabsx >= mabsy && mabsx >= mabsz) {
		var r = thx.geom.d2._Point.Point_Impl_.solve2Linear(p1.normal.get_y(),p1.normal.get_z(),p2.normal.get_y(),p2.normal.get_z(),p1.w,p2.w);
		var y1 = r.get_x();
		var z1 = r.get_y();
		origin = new thx.geom.d3.xyz.MutXYZ(0,y1,z1);
	} else if(mabsy >= mabsx && mabsy >= mabsz) {
		var r1 = thx.geom.d2._Point.Point_Impl_.solve2Linear(p1.normal.get_x(),p1.normal.get_z(),p2.normal.get_x(),p2.normal.get_z(),p1.w,p2.w);
		var x1 = r1.get_x();
		var z2 = r1.get_y();
		origin = new thx.geom.d3.xyz.MutXYZ(x1,0,z2);
	} else {
		var r2 = thx.geom.d2._Point.Point_Impl_.solve2Linear(p1.normal.get_x(),p1.normal.get_y(),p2.normal.get_x(),p2.normal.get_y(),p1.w,p2.w);
		var x2 = r2.get_x();
		var y2 = r2.get_y();
		origin = new thx.geom.d3.xyz.MutXYZ(x2,y2,0);
	}
	return new thx.geom.d3.Line(origin,direction);
};
thx.geom.d3.Line.prototype = {
	intersectWithPlane: function(plane) {
		var lambda;
		lambda = (plane.w - (function($this) {
			var $r;
			var this1 = plane.normal;
			var p = $this.point;
			$r = this1.get_x() * p.get_x() + this1.get_y() * p.get_y() + this1.get_z() * p.get_z();
			return $r;
		}(this))) / (function($this) {
			var $r;
			var this2 = plane.normal;
			var p1 = $this.direction;
			$r = this2.get_x() * p1.get_x() + this2.get_y() * p1.get_y() + this2.get_z() * p1.get_z();
			return $r;
		}(this));
		var this3 = this.point;
		var p2;
		var this4 = this.direction;
		var x1 = this4.get_x() * lambda;
		var y1 = this4.get_y() * lambda;
		var z1 = this4.get_z() * lambda;
		p2 = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
		var x = this3.get_x() + p2.get_x();
		var y = this3.get_y() + p2.get_y();
		var z = this3.get_z() + p2.get_z();
		return new thx.geom.d3.xyz.MutXYZ(x,y,z);
	}
	,reverse: function() {
		return new thx.geom.d3.Line(this.point,(function($this) {
			var $r;
			var this1 = $this.direction;
			var x = -this1.get_x();
			var y = -this1.get_y();
			var z = -this1.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
			return $r;
		}(this)));
	}
	,transform: function(matrix44) {
		var newpoint = thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint3D(matrix44,this.point);
		var pointaddDirection;
		var this1 = this.point;
		var p = this.direction;
		var x = this1.get_x() + p.get_x();
		var y = this1.get_y() + p.get_y();
		var z = this1.get_z() + p.get_z();
		pointaddDirection = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		var newPointaddDirection = thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint3D(matrix44,pointaddDirection);
		var newdirection;
		newdirection = (function($this) {
			var $r;
			var p1;
			p1 = (function($this) {
				var $r;
				var x2 = -newpoint.get_x();
				var y2 = -newpoint.get_y();
				var z2 = -newpoint.get_z();
				$r = new thx.geom.d3.xyz.MutXYZ(x2,y2,z2);
				return $r;
			}($this));
			var x1 = newPointaddDirection.get_x() + p1.get_x();
			var y1 = newPointaddDirection.get_y() + p1.get_y();
			var z1 = newPointaddDirection.get_z() + p1.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
			return $r;
		}(this));
		return new thx.geom.d3.Line(newpoint,newdirection);
	}
	,closestPointOnLine: function(point) {
		var t;
		t = (function($this) {
			var $r;
			var this1;
			this1 = (function($this) {
				var $r;
				var p1;
				p1 = (function($this) {
					var $r;
					var x1 = -point.get_x();
					var y1 = -point.get_y();
					var z1 = -point.get_z();
					$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
					return $r;
				}($this));
				var x = point.get_x() + p1.get_x();
				var y = point.get_y() + p1.get_y();
				var z = point.get_z() + p1.get_z();
				$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
				return $r;
			}($this));
			var p = $this.direction;
			$r = this1.get_x() * p.get_x() + this1.get_y() * p.get_y() + this1.get_z() * p.get_z();
			return $r;
		}(this)) / (function($this) {
			var $r;
			var this2 = $this.direction;
			var p2 = $this.direction;
			$r = this2.get_x() * p2.get_x() + this2.get_y() * p2.get_y() + this2.get_z() * p2.get_z();
			return $r;
		}(this));
		var p3;
		var this3 = this.direction;
		var x3 = this3.get_x() * t;
		var y3 = this3.get_y() * t;
		var z3 = this3.get_z() * t;
		p3 = new thx.geom.d3.xyz.MutXYZ(x3,y3,z3);
		var x2 = point.get_x() + p3.get_x();
		var y2 = point.get_y() + p3.get_y();
		var z2 = point.get_z() + p3.get_z();
		return new thx.geom.d3.xyz.MutXYZ(x2,y2,z2);
	}
	,distanceToPoint: function(point) {
		var closestpoint = this.closestPointOnLine(point);
		var distancevector;
		distancevector = (function($this) {
			var $r;
			var p;
			p = (function($this) {
				var $r;
				var x1 = -closestpoint.get_x();
				var y1 = -closestpoint.get_y();
				var z1 = -closestpoint.get_z();
				$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
				return $r;
			}($this));
			var x = point.get_x() + p.get_x();
			var y = point.get_y() + p.get_y();
			var z = point.get_z() + p.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
			return $r;
		}(this));
		return Math.sqrt(distancevector.get_x() * distancevector.get_x() + distancevector.get_y() * distancevector.get_y() + distancevector.get_z() * distancevector.get_z());
	}
	,equals: function(line) {
		if(!(function($this) {
			var $r;
			var this1 = $this.direction;
			var p = line.direction;
			$r = this1.get_x() == p.get_x() && this1.get_y() == p.get_y() && this1.get_z() == p.get_z();
			return $r;
		}(this))) return false;
		return thx.core.Floats.nearZero(this.distanceToPoint(line.point));
	}
};
thx.geom.d3.xyz.MutXYZ = function(x,y,z) {
	this._x = x;
	this._y = y;
	this._z = z;
};
thx.geom.d3.xyz.MutXYZ.__name__ = true;
thx.geom.d3.xyz.MutXYZ.__interfaces__ = [thx.geom.d3.xyz.XYZ];
thx.geom.d3.xyz.MutXYZ.prototype = {
	apply44: function(matrix) {
		thx.geom._Matrix44.Matrix44_Impl_.applyLeftMultiplyPoint3D(matrix,this);
		return this;
	}
	,clone: function() {
		return new thx.geom.d3.xyz.MutXYZ(this._x,this._y,this._z);
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,get_z: function() {
		return this._z;
	}
	,set_x: function(v) {
		return this._x = v;
	}
	,set_y: function(v) {
		return this._y = v;
	}
	,set_z: function(v) {
		return this._z = v;
	}
};
thx.geom.d3._Point = {};
thx.geom.d3._Point.Point_Impl_ = {};
thx.geom.d3._Point.Point_Impl_.__name__ = true;
thx.geom.d3._Point.Point_Impl_.fromFloats = function(arr) {
	thx.core.ArrayFloats.resize(arr,3,0);
	return new thx.geom.d3.xyz.MutXYZ(arr[0],arr[1],arr[2]);
};
thx.geom.d3._Point.Point_Impl_.fromObject = function(o) {
	return thx.geom.d3._Point.Point_Impl_.create(o.x,o.y,o.z);
};
thx.geom.d3._Point.Point_Impl_.create = function(x,y,z) {
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.linked = function(getX,getY,getZ,setX,setY,setZ) {
	return new thx.geom.d3.xyz.LinkedXYZ(getX,getY,getZ,setX,setY,setZ);
};
thx.geom.d3._Point.Point_Impl_.immutable = function(x,y,z) {
	return new thx.geom.d3.xyz.ImmutableXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_._new = function(xyz) {
	return xyz;
};
thx.geom.d3._Point.Point_Impl_.addPointAssign = function(this1,p) {
	return thx.geom.d3._Point.Point_Impl_.set(this1,this1.get_x() + p.get_x(),this1.get_y() + p.get_y(),this1.get_z() + p.get_z());
};
thx.geom.d3._Point.Point_Impl_.addPoint = function(this1,p) {
	var x = this1.get_x() + p.get_x();
	var y = this1.get_y() + p.get_y();
	var z = this1.get_z() + p.get_z();
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.addAssign = function(this1,v) {
	return thx.geom.d3._Point.Point_Impl_.set(this1,this1.get_x() + v,this1.get_y() + v,this1.get_z() + v);
};
thx.geom.d3._Point.Point_Impl_.add = function(this1,v) {
	var x = this1.get_x() + v;
	var y = this1.get_y() + v;
	var z = this1.get_z() + v;
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.negate = function(this1) {
	var x = -this1.get_x();
	var y = -this1.get_y();
	var z = -this1.get_z();
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.subtractPointAssign = function(this1,p) {
	return thx.geom.d3._Point.Point_Impl_.set(this1,this1.get_x() - p.get_x(),this1.get_y() - p.get_y(),this1.get_z() - p.get_z());
};
thx.geom.d3._Point.Point_Impl_.subtractPoint = function(this1,p) {
	var p1;
	p1 = (function($this) {
		var $r;
		var x1 = -p.get_x();
		var y1 = -p.get_y();
		var z1 = -p.get_z();
		$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
		return $r;
	}(this));
	var x = this1.get_x() + p1.get_x();
	var y = this1.get_y() + p1.get_y();
	var z = this1.get_z() + p1.get_z();
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.subtractAssign = function(this1,v) {
	return thx.geom.d3._Point.Point_Impl_.set(this1,this1.get_x() - v,this1.get_y() - v,this1.get_z() - v);
};
thx.geom.d3._Point.Point_Impl_.subtract = function(this1,v) {
	var v1 = -v;
	var x = this1.get_x() + v1;
	var y = this1.get_y() + v1;
	var z = this1.get_z() + v1;
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.multiplyPointAssign = function(this1,p) {
	return thx.geom.d3._Point.Point_Impl_.set(this1,this1.get_x() * p.get_x(),this1.get_y() * p.get_y(),this1.get_z() * p.get_z());
};
thx.geom.d3._Point.Point_Impl_.multiplyPoint = function(this1,p) {
	var x = this1.get_x() * p.get_x();
	var y = this1.get_y() * p.get_y();
	var z = this1.get_z() * p.get_z();
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.multiplyAssign = function(this1,v) {
	return thx.geom.d3._Point.Point_Impl_.set(this1,this1.get_x() * v,this1.get_y() * v,this1.get_z() * v);
};
thx.geom.d3._Point.Point_Impl_.multiply = function(this1,v) {
	var x = this1.get_x() * v;
	var y = this1.get_y() * v;
	var z = this1.get_z() * v;
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.dividePointAssign = function(this1,p) {
	return thx.geom.d3._Point.Point_Impl_.set(this1,this1.get_x() / p.get_x(),this1.get_y() / p.get_y(),this1.get_z() / p.get_z());
};
thx.geom.d3._Point.Point_Impl_.dividePoint = function(this1,p) {
	var x = this1.get_x() / p.get_x();
	var y = this1.get_y() / p.get_y();
	var z = this1.get_z() / p.get_z();
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.divideAssign = function(this1,v) {
	return thx.geom.d3._Point.Point_Impl_.set(this1,this1.get_x() / v,this1.get_y() / v,this1.get_z() / v);
};
thx.geom.d3._Point.Point_Impl_.divide = function(this1,v) {
	var x = this1.get_x() / v;
	var y = this1.get_y() / v;
	var z = this1.get_z() / v;
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.equals = function(this1,p) {
	return this1.get_x() == p.get_x() && this1.get_y() == p.get_y() && this1.get_z() == p.get_z();
};
thx.geom.d3._Point.Point_Impl_.notEquals = function(this1,p) {
	return !(this1.get_x() == p.get_x() && this1.get_y() == p.get_y() && this1.get_z() == p.get_z());
};
thx.geom.d3._Point.Point_Impl_.abs = function(this1) {
	var x = Math.abs(this1.get_x());
	var y = Math.abs(this1.get_y());
	var z = Math.abs(this1.get_z());
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.clone = function(this1) {
	return this1.clone();
};
thx.geom.d3._Point.Point_Impl_.copyTo = function(this1,other) {
	return thx.geom.d3._Point.Point_Impl_.set(other,this1.get_x(),this1.get_y(),this1.get_z());
};
thx.geom.d3._Point.Point_Impl_.apply44 = function(this1,matrix) {
	return this1.apply44(matrix);
};
thx.geom.d3._Point.Point_Impl_.nearEquals = function(this1,p) {
	return Math.abs(this1.get_x() - p.get_x()) <= 10e-10 && Math.abs(this1.get_y() - p.get_y()) <= 10e-10 && Math.abs(this1.get_z() - p.get_z()) <= 10e-10;
};
thx.geom.d3._Point.Point_Impl_.notNearEquals = function(this1,p) {
	return !thx.geom.d3._Point.Point_Impl_.nearEquals(this1,p);
};
thx.geom.d3._Point.Point_Impl_.interpolate = function(this1,p,f) {
	var p1;
	var this2;
	this2 = (function($this) {
		var $r;
		var p2;
		p2 = (function($this) {
			var $r;
			var x3 = -this1.get_x();
			var y3 = -this1.get_y();
			var z3 = -this1.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x3,y3,z3);
			return $r;
		}($this));
		var x2 = p.get_x() + p2.get_x();
		var y2 = p.get_y() + p2.get_y();
		var z2 = p.get_z() + p2.get_z();
		$r = new thx.geom.d3.xyz.MutXYZ(x2,y2,z2);
		return $r;
	}(this));
	var x1 = this2.get_x() * f;
	var y1 = this2.get_y() * f;
	var z1 = this2.get_z() * f;
	p1 = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
	var x = this1.get_x() + p1.get_x();
	var y = this1.get_y() + p1.get_y();
	var z = this1.get_z() + p1.get_z();
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.isZero = function(this1) {
	var p = thx.geom.d3._Point.Point_Impl_.zero;
	return this1.get_x() == p.get_x() && this1.get_y() == p.get_y() && this1.get_z() == p.get_z();
};
thx.geom.d3._Point.Point_Impl_.isNearZero = function(this1) {
	return thx.geom.d3._Point.Point_Impl_.nearEquals(this1,thx.geom.d3._Point.Point_Impl_.zero);
};
thx.geom.d3._Point.Point_Impl_.dot = function(this1,p) {
	return this1.get_x() * p.get_x() + this1.get_y() * p.get_y() + this1.get_z() * p.get_z();
};
thx.geom.d3._Point.Point_Impl_.normalize = function(this1) {
	var v = Math.sqrt(this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y() + this1.get_z() * this1.get_z());
	var x = this1.get_x() / v;
	var y = this1.get_y() / v;
	var z = this1.get_z() / v;
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.distanceTo = function(this1,p) {
	return Math.abs((function($this) {
		var $r;
		var this2;
		this2 = (function($this) {
			var $r;
			var p1;
			p1 = (function($this) {
				var $r;
				var x1 = -p.get_x();
				var y1 = -p.get_y();
				var z1 = -p.get_z();
				$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
				return $r;
			}($this));
			var x = this1.get_x() + p1.get_x();
			var y = this1.get_y() + p1.get_y();
			var z = this1.get_z() + p1.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
			return $r;
		}($this));
		$r = Math.sqrt(this2.get_x() * this2.get_x() + this2.get_y() * this2.get_y() + this2.get_z() * this2.get_z());
		return $r;
	}(this)));
};
thx.geom.d3._Point.Point_Impl_.distanceToSquared = function(this1,p) {
	var this2;
	this2 = (function($this) {
		var $r;
		var p1;
		p1 = (function($this) {
			var $r;
			var x1 = -p.get_x();
			var y1 = -p.get_y();
			var z1 = -p.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
			return $r;
		}($this));
		var x = this1.get_x() + p1.get_x();
		var y = this1.get_y() + p1.get_y();
		var z = this1.get_z() + p1.get_z();
		$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		return $r;
	}(this));
	return this2.get_x() * this2.get_x() + this2.get_y() * this2.get_y() + this2.get_z() * this2.get_z();
};
thx.geom.d3._Point.Point_Impl_.transform = function(this1,matrix) {
	return thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint3D(matrix,this1);
};
thx.geom.d3._Point.Point_Impl_.randomNonParallelVector = function(this1) {
	var a;
	a = (function($this) {
		var $r;
		var x = Math.abs(this1.get_x());
		var y = Math.abs(this1.get_y());
		var z = Math.abs(this1.get_z());
		$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		return $r;
	}(this));
	if(a.get_x() <= a.get_y() && a.get_x() <= a.get_z()) return new thx.geom.d3.xyz.MutXYZ(1,0,0); else if(a.get_y() <= a.get_x() && a.get_y() <= a.get_z()) return new thx.geom.d3.xyz.MutXYZ(0,1,0); else return new thx.geom.d3.xyz.MutXYZ(0,0,1);
};
thx.geom.d3._Point.Point_Impl_.cross = function(this1,p) {
	var x = this1.get_y() * p.get_z() - this1.get_z() * p.get_y();
	var y = this1.get_z() * p.get_x() - this1.get_x() * p.get_z();
	var z = this1.get_x() * p.get_y() - this1.get_y() * p.get_x();
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.min = function(this1,p) {
	var x = Math.min(this1.get_x(),p.get_x());
	var y = Math.min(this1.get_y(),p.get_y());
	var z = Math.min(this1.get_z(),p.get_z());
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.max = function(this1,p) {
	var x = Math.max(this1.get_x(),p.get_x());
	var y = Math.max(this1.get_y(),p.get_y());
	var z = Math.max(this1.get_z(),p.get_z());
	return new thx.geom.d3.xyz.MutXYZ(x,y,z);
};
thx.geom.d3._Point.Point_Impl_.set = function(this1,nx,ny,nz) {
	this1.set_x(nx);
	this1.set_y(ny);
	this1.set_z(nz);
	return this1;
};
thx.geom.d3._Point.Point_Impl_.toPoint = function(this1) {
	return this1;
};
thx.geom.d3._Point.Point_Impl_.toArray = function(this1) {
	return [this1.get_x(),this1.get_y(),this1.get_z()];
};
thx.geom.d3._Point.Point_Impl_.toObject = function(this1) {
	return { x : this1.get_x(), y : this1.get_y(), z : this1.get_z()};
};
thx.geom.d3._Point.Point_Impl_.toString = function(this1) {
	return "Point(" + this1.get_x() + "," + this1.get_y() + "," + this1.get_z() + ")";
};
thx.geom.d3._Point.Point_Impl_.get_x = function(this1) {
	return this1.get_x();
};
thx.geom.d3._Point.Point_Impl_.get_y = function(this1) {
	return this1.get_y();
};
thx.geom.d3._Point.Point_Impl_.get_z = function(this1) {
	return this1.get_z();
};
thx.geom.d3._Point.Point_Impl_.set_x = function(this1,v) {
	return this1.set_x(v);
};
thx.geom.d3._Point.Point_Impl_.set_y = function(this1,v) {
	return this1.set_y(v);
};
thx.geom.d3._Point.Point_Impl_.set_z = function(this1,v) {
	return this1.set_z(v);
};
thx.geom.d3._Point.Point_Impl_.get_length = function(this1) {
	return Math.sqrt(this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y() + this1.get_z() * this1.get_z());
};
thx.geom.d3._Point.Point_Impl_.get_lengthSquared = function(this1) {
	return this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y() + this1.get_z() * this1.get_z();
};
thx.geom.d3.OrthoNormalBasis = function(plane,rightvector) {
	var this1 = thx.geom.d3._Point.Point_Impl_.cross(plane.normal,rightvector);
	var v = Math.sqrt(this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y() + this1.get_z() * this1.get_z());
	var x = this1.get_x() / v;
	var y = this1.get_y() / v;
	var z = this1.get_z() / v;
	this.v = new thx.geom.d3.xyz.MutXYZ(x,y,z);
	this.u = thx.geom.d3._Point.Point_Impl_.cross(this.v,plane.normal);
	this.plane = plane;
	var this2 = plane.normal;
	var v1 = plane.w;
	var x1 = this2.get_x() * v1;
	var y1 = this2.get_y() * v1;
	var z1 = this2.get_z() * v1;
	this.planeOrigin = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
};
thx.geom.d3.OrthoNormalBasis.__name__ = true;
thx.geom.d3.OrthoNormalBasis.fromPlane = function(plane) {
	return new thx.geom.d3.OrthoNormalBasis(plane,thx.geom.d3._Point.Point_Impl_.randomNonParallelVector(plane.normal));
};
thx.geom.d3.OrthoNormalBasis.prototype = {
	getProjectionMatrix: function() {
		var e0 = this.u.get_x();
		var e1 = this.v.get_x();
		var e2 = this.plane.normal.get_x();
		var e4 = this.u.get_y();
		var e5 = this.v.get_y();
		var e6 = this.plane.normal.get_y();
		var e8 = this.u.get_z();
		var e9 = this.v.get_z();
		var e10 = this.plane.normal.get_z();
		return [e0,e1,e2,0,e4,e5,e6,0,e8,e9,e10,0,0,0,-this.plane.w,1];
	}
	,getInverseProjectionMatrix: function() {
		var p;
		var this1 = this.plane.normal;
		var v = this.plane.w;
		var x = this1.get_x() * v;
		var y = this1.get_y() * v;
		var z = this1.get_z() * v;
		p = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		var e0 = this.u.get_x();
		var e1 = this.u.get_y();
		var e2 = this.u.get_z();
		var e4 = this.v.get_x();
		var e5 = this.v.get_y();
		var e6 = this.v.get_z();
		var e8 = this.plane.normal.get_x();
		var e9 = this.plane.normal.get_y();
		var e10 = this.plane.normal.get_z();
		var e12 = p.get_x();
		var e13 = p.get_y();
		var e14 = p.get_z();
		return [e0,e1,e2,0,e4,e5,e6,0,e8,e9,e10,0,e12,e13,e14,1];
	}
	,to2D: function(vec3) {
		var x;
		var p = this.u;
		x = vec3.get_x() * p.get_x() + vec3.get_y() * p.get_y() + vec3.get_z() * p.get_z();
		var y;
		var p1 = this.v;
		y = vec3.get_x() * p1.get_x() + vec3.get_y() * p1.get_y() + vec3.get_z() * p1.get_z();
		return new thx.geom.d2.xy.MutXY(x,y);
	}
	,to3D: function(vec2) {
		var this1;
		var this2 = this.planeOrigin;
		var p1;
		var this3 = this.u;
		var v = vec2.get_x();
		var x2 = this3.get_x() * v;
		var y2 = this3.get_y() * v;
		var z2 = this3.get_z() * v;
		p1 = new thx.geom.d3.xyz.MutXYZ(x2,y2,z2);
		var x1 = this2.get_x() + p1.get_x();
		var y1 = this2.get_y() + p1.get_y();
		var z1 = this2.get_z() + p1.get_z();
		this1 = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
		var p;
		var this4 = this.v;
		var v1 = vec2.get_y();
		var x3 = this4.get_x() * v1;
		var y3 = this4.get_y() * v1;
		var z3 = this4.get_z() * v1;
		p = new thx.geom.d3.xyz.MutXYZ(x3,y3,z3);
		var x = this1.get_x() + p.get_x();
		var y = this1.get_y() + p.get_y();
		var z = this1.get_z() + p.get_z();
		return new thx.geom.d3.xyz.MutXYZ(x,y,z);
	}
	,line3Dto2D: function(line) {
		return thx.geom.d2.Line.fromPoints(this.to2D(line.point),this.to2D((function($this) {
			var $r;
			var this1 = line.direction;
			var p = line.point;
			var x = this1.get_x() + p.get_x();
			var y = this1.get_y() + p.get_y();
			var z = this1.get_z() + p.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
			return $r;
		}(this))));
	}
	,line2Dto3D: function(line) {
		var a = line.origin();
		var b;
		var this1 = line.direction();
		var x = this1.get_x() + a.get_x();
		var y = this1.get_y() + a.get_y();
		b = new thx.geom.d2.xy.MutXY(x,y);
		return thx.geom.d3.Line.fromPoints(this.to3D(a),this.to3D(b));
	}
	,transform: function(matrix) {
		var newplane = this.plane.transform(matrix);
		var rightpoint_transformed = thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint3D(matrix,this.u);
		var origin_transformed;
		var this1 = new thx.geom.d3.xyz.MutXYZ(0,0,0);
		origin_transformed = thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint3D(matrix,this1);
		var newrighthandvector;
		newrighthandvector = (function($this) {
			var $r;
			var p;
			p = (function($this) {
				var $r;
				var x1 = -origin_transformed.get_x();
				var y1 = -origin_transformed.get_y();
				var z1 = -origin_transformed.get_z();
				$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
				return $r;
			}($this));
			var x = rightpoint_transformed.get_x() + p.get_x();
			var y = rightpoint_transformed.get_y() + p.get_y();
			var z = rightpoint_transformed.get_z() + p.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
			return $r;
		}(this));
		return new thx.geom.d3.OrthoNormalBasis(newplane,newrighthandvector);
	}
};
thx.geom.d3.Polygon = function(vertices) {
	this.vertices = vertices;
};
thx.geom.d3.Polygon.__name__ = true;
thx.geom.d3.Polygon.fromVertices = function(vertices) {
	if((vertices instanceof Array) && vertices.__enum__ == null) return new thx.geom.d3.Polygon(vertices.copy()); else return new thx.geom.d3.Polygon((function($this) {
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
thx.geom.d3.Polygon.prototype = {
	flip: function() {
		var reverse = this.vertices.slice();
		reverse.reverse();
		return new thx.geom.d3.Polygon(reverse.map(function(v) {
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
		return thx.geom.d3.Plane.fromPoints(this.vertices[0].position,this.vertices[1].position,this.vertices[2].position);
	}
};
thx.geom.d3.Vertex = function(position,normal) {
	this.position = position;
	this.normal = normal;
};
thx.geom.d3.Vertex.__name__ = true;
thx.geom.d3.Vertex.prototype = {
	flip: function() {
		return new thx.geom.d3.Vertex(this.position,(function($this) {
			var $r;
			var this1 = $this.normal;
			var x = -this1.get_x();
			var y = -this1.get_y();
			var z = -this1.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
			return $r;
		}(this)));
	}
	,interpolate: function(other,t) {
		return new thx.geom.d3.Vertex(thx.geom.d3._Point.Point_Impl_.interpolate(this.position,other.position,t),thx.geom.d3._Point.Point_Impl_.interpolate(this.normal,other.normal,t));
	}
	,transform: function(matrix) {
		return new thx.geom.d3.Vertex(thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint3D(matrix,this.position),thx.geom._Matrix44.Matrix44_Impl_.leftMultiplyPoint3D(matrix,this.normal));
	}
	,toString: function() {
		return "Vertex " + (function($this) {
			var $r;
			var this1 = $this.position;
			$r = "Point(" + this1.get_x() + "," + this1.get_y() + "," + this1.get_z() + ")";
			return $r;
		}(this)) + ", " + (function($this) {
			var $r;
			var this2 = $this.normal;
			$r = "Point(" + this2.get_x() + "," + this2.get_y() + "," + this2.get_z() + ")";
			return $r;
		}(this));
	}
};
thx.geom.d3.csg = {};
thx.geom.d3.csg.Node = function(polygons) {
	this.plane = null;
	this.front = null;
	this.back = null;
	this.polygons = [];
	if(null != polygons) this.build(polygons);
};
thx.geom.d3.csg.Node.__name__ = true;
thx.geom.d3.csg.Node.prototype = {
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
				if(null == this.front) this.front = new thx.geom.d3.csg.Node();
				this.front.build(front);
			}
			if(back.length > 0) {
				if(null == this.back) this.back = new thx.geom.d3.csg.Node();
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
thx.geom.d3.csg._Solid = {};
thx.geom.d3.csg._Solid.Solid_Impl_ = {};
thx.geom.d3.csg._Solid.Solid_Impl_.__name__ = true;
thx.geom.d3.csg._Solid.Solid_Impl_._new = function(polygons) {
	return polygons;
};
thx.geom.d3.csg._Solid.Solid_Impl_.fromPolygons = function(polygons) {
	return thx.geom.d3.csg._Solid.Solid_Impl_._new(polygons);
};
thx.geom.d3.csg._Solid.Solid_Impl_.union = function(this1,other) {
	var a = new thx.geom.d3.csg.Node(this1.slice());
	var b = new thx.geom.d3.csg.Node(other.slice());
	a.clipTo(b);
	b.clipTo(a);
	b.invert();
	b.clipTo(a);
	b.invert();
	a.build(b.polygons.concat(null == b.front?[]:b.front.all()).concat(null == b.back?[]:b.back.all()));
	return thx.geom.d3.csg._Solid.Solid_Impl_.fromPolygons(a.polygons.concat(null == a.front?[]:a.front.all()).concat(null == a.back?[]:a.back.all()));
};
thx.geom.d3.csg._Solid.Solid_Impl_.subtract = function(this1,other) {
	var a = new thx.geom.d3.csg.Node(this1.slice());
	var b = new thx.geom.d3.csg.Node(other.slice());
	a.invert();
	a.clipTo(b);
	b.clipTo(a);
	b.invert();
	b.clipTo(a);
	b.invert();
	a.build(b.polygons.concat(null == b.front?[]:b.front.all()).concat(null == b.back?[]:b.back.all()));
	a.invert();
	return thx.geom.d3.csg._Solid.Solid_Impl_.fromPolygons(a.polygons.concat(null == a.front?[]:a.front.all()).concat(null == a.back?[]:a.back.all()));
};
thx.geom.d3.csg._Solid.Solid_Impl_.intersect = function(this1,other) {
	var a = new thx.geom.d3.csg.Node(this1.slice());
	var b = new thx.geom.d3.csg.Node(other.slice());
	a.invert();
	b.clipTo(a);
	b.invert();
	a.clipTo(b);
	b.clipTo(a);
	a.build(b.polygons.concat(null == b.front?[]:b.front.all()).concat(null == b.back?[]:b.back.all()));
	a.invert();
	return thx.geom.d3.csg._Solid.Solid_Impl_.fromPolygons(a.polygons.concat(null == a.front?[]:a.front.all()).concat(null == a.back?[]:a.back.all()));
};
thx.geom.d3.csg._Solid.Solid_Impl_.toArray = function(this1) {
	return this1.slice();
};
thx.geom.d3.csg._Solid.Solid_Impl_.iterator = function(this1) {
	return HxOverrides.iter(this1);
};
thx.geom.d3.csg._Solid.Solid_Impl_.toString = function(this1) {
	return "Solid(" + this1.length + ")";
};
thx.geom.d3.csg.Solids = function() { };
thx.geom.d3.csg.Solids.__name__ = true;
thx.geom.d3.csg.Solids.box = function(position,size) {
	if(null == position) position = thx.geom.d3._Point.Point_Impl_.zero;
	return thx.geom.d3.csg._Solid.Solid_Impl_.fromPolygons(thx.geom.d3.csg.Solids.baseCube.map(function(info) {
		return new thx.geom.d3.Polygon(info.p.map(function(i) {
			var pos;
			var x;
			x = position.get_x() + size.get_x() * ((i & 1) != 0?1:0);
			var y;
			y = position.get_y() + size.get_y() * ((i & 2) != 0?1:0);
			var z;
			z = position.get_z() + size.get_z() * ((i & 4) != 0?1:0);
			pos = new thx.geom.d3.xyz.MutXYZ(x,y,z);
			return new thx.geom.d3.Vertex(pos,thx.geom.d3._Point.Point_Impl_.fromFloats(info.n));
		}));
	}));
};
thx.geom.d3.csg.Solids.cylinder = function(start,end,radius,resolution) {
	if(radius == null) radius = 1.0;
	if(null == resolution) resolution = thx.geom.d3.csg.Solids.getResolution;
	var slices = resolution(radius);
	var ray;
	ray = (function($this) {
		var $r;
		var p4;
		p4 = (function($this) {
			var $r;
			var x13 = -start.get_x();
			var y13 = -start.get_y();
			var z13 = -start.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x13,y13,z13);
			return $r;
		}($this));
		var x12 = end.get_x() + p4.get_x();
		var y12 = end.get_y() + p4.get_y();
		var z12 = end.get_z() + p4.get_z();
		$r = new thx.geom.d3.xyz.MutXYZ(x12,y12,z12);
		return $r;
	}(this));
	var axisZ;
	axisZ = (function($this) {
		var $r;
		var v4 = Math.sqrt(ray.get_x() * ray.get_x() + ray.get_y() * ray.get_y() + ray.get_z() * ray.get_z());
		var x14 = ray.get_x() / v4;
		var y14 = ray.get_y() / v4;
		var z14 = ray.get_z() / v4;
		$r = new thx.geom.d3.xyz.MutXYZ(x14,y14,z14);
		return $r;
	}(this));
	var isY = Math.abs(axisZ.get_y()) > 0.5;
	var axisX;
	var this4 = thx.geom.d3._Point.Point_Impl_.cross(new thx.geom.d3.xyz.MutXYZ(isY?1:0,isY?0:1,0),axisZ);
	var v5 = Math.sqrt(this4.get_x() * this4.get_x() + this4.get_y() * this4.get_y() + this4.get_z() * this4.get_z());
	var x15 = this4.get_x() / v5;
	var y15 = this4.get_y() / v5;
	var z15 = this4.get_z() / v5;
	axisX = new thx.geom.d3.xyz.MutXYZ(x15,y15,z15);
	var axisY;
	var this5 = thx.geom.d3._Point.Point_Impl_.cross(axisX,axisZ);
	var v6 = Math.sqrt(this5.get_x() * this5.get_x() + this5.get_y() * this5.get_y() + this5.get_z() * this5.get_z());
	var x16 = this5.get_x() / v6;
	var y16 = this5.get_y() / v6;
	var z16 = this5.get_z() / v6;
	axisY = new thx.geom.d3.xyz.MutXYZ(x16,y16,z16);
	var s = new thx.geom.d3.Vertex(start,(function($this) {
		var $r;
		var x = -axisZ.get_x();
		var y = -axisZ.get_y();
		var z = -axisZ.get_z();
		$r = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		return $r;
	}(this)));
	var e = new thx.geom.d3.Vertex(end,(function($this) {
		var $r;
		var v = Math.sqrt(axisZ.get_x() * axisZ.get_x() + axisZ.get_y() * axisZ.get_y() + axisZ.get_z() * axisZ.get_z());
		var x1 = axisZ.get_x() / v;
		var y1 = axisZ.get_y() / v;
		var z1 = axisZ.get_z() / v;
		$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
		return $r;
	}(this)));
	var polygons = [];
	var t0;
	var t1;
	var point = function(stack,slice,normalBlend) {
		var angle = slice * Math.PI * 2;
		var out;
		var this1;
		var v1 = Math.cos(angle);
		var x3 = axisX.get_x() * v1;
		var y3 = axisX.get_y() * v1;
		var z3 = axisX.get_z() * v1;
		this1 = new thx.geom.d3.xyz.MutXYZ(x3,y3,z3);
		var p;
		var v2 = Math.sin(angle);
		var x4 = axisY.get_x() * v2;
		var y4 = axisY.get_y() * v2;
		var z4 = axisY.get_z() * v2;
		p = new thx.geom.d3.xyz.MutXYZ(x4,y4,z4);
		var x2 = this1.get_x() + p.get_x();
		var y2 = this1.get_y() + p.get_y();
		var z2 = this1.get_z() + p.get_z();
		out = new thx.geom.d3.xyz.MutXYZ(x2,y2,z2);
		var pos;
		var this2;
		var p2;
		p2 = (function($this) {
			var $r;
			var x7 = ray.get_x() * stack;
			var y7 = ray.get_y() * stack;
			var z7 = ray.get_z() * stack;
			$r = new thx.geom.d3.xyz.MutXYZ(x7,y7,z7);
			return $r;
		}(this));
		var x6 = start.get_x() + p2.get_x();
		var y6 = start.get_y() + p2.get_y();
		var z6 = start.get_z() + p2.get_z();
		this2 = new thx.geom.d3.xyz.MutXYZ(x6,y6,z6);
		var p1;
		p1 = (function($this) {
			var $r;
			var x8 = out.get_x() * radius;
			var y8 = out.get_y() * radius;
			var z8 = out.get_z() * radius;
			$r = new thx.geom.d3.xyz.MutXYZ(x8,y8,z8);
			return $r;
		}(this));
		var x5 = this2.get_x() + p1.get_x();
		var y5 = this2.get_y() + p1.get_y();
		var z5 = this2.get_z() + p1.get_z();
		pos = new thx.geom.d3.xyz.MutXYZ(x5,y5,z5);
		var normal;
		var this3;
		var v3 = 1 - Math.abs(normalBlend);
		var x10 = out.get_x() * v3;
		var y10 = out.get_y() * v3;
		var z10 = out.get_z() * v3;
		this3 = new thx.geom.d3.xyz.MutXYZ(x10,y10,z10);
		var p3;
		p3 = (function($this) {
			var $r;
			var x11 = axisZ.get_x() * normalBlend;
			var y11 = axisZ.get_y() * normalBlend;
			var z11 = axisZ.get_z() * normalBlend;
			$r = new thx.geom.d3.xyz.MutXYZ(x11,y11,z11);
			return $r;
		}(this));
		var x9 = this3.get_x() + p3.get_x();
		var y9 = this3.get_y() + p3.get_y();
		var z9 = this3.get_z() + p3.get_z();
		normal = new thx.geom.d3.xyz.MutXYZ(x9,y9,z9);
		return new thx.geom.d3.Vertex(pos,normal);
	};
	var _g = 0;
	while(_g < slices) {
		var i = _g++;
		t0 = i / slices;
		t1 = (i + 1) / slices;
		polygons.push(new thx.geom.d3.Polygon([s,point(0,t0,-1),point(0,t1,-1)]));
		polygons.push(new thx.geom.d3.Polygon([point(0,t1,0),point(0,t0,0),point(1,t0,0),point(1,t1,0)]));
		polygons.push(new thx.geom.d3.Polygon([e,point(1,t1,1),point(1,t0,1)]));
	}
	return thx.geom.d3.csg._Solid.Solid_Impl_.fromPolygons(polygons);
};
thx.geom.d3.csg.Solids.getResolution = function(r) {
	return 36;
};
thx.geom.d3.csg.Solids.sphere = function(position,radius,resolution) {
	if(radius == null) radius = 1.0;
	if(null == resolution) resolution = thx.geom.d3.csg.Solids.getResolution;
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
		dir = new thx.geom.d3.xyz.MutXYZ(x,y,z);
		vertices.push(new thx.geom.d3.Vertex((function($this) {
			var $r;
			var p;
			p = (function($this) {
				var $r;
				var x2 = dir.get_x() * radius;
				var y2 = dir.get_y() * radius;
				var z2 = dir.get_z() * radius;
				$r = new thx.geom.d3.xyz.MutXYZ(x2,y2,z2);
				return $r;
			}($this));
			var x1 = position.get_x() + p.get_x();
			var y1 = position.get_y() + p.get_y();
			var z1 = position.get_z() + p.get_z();
			$r = new thx.geom.d3.xyz.MutXYZ(x1,y1,z1);
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
			polygons.push(new thx.geom.d3.Polygon(vertices));
		}
	}
	return thx.geom.d3.csg._Solid.Solid_Impl_.fromPolygons(polygons);
};
thx.geom.d3.xyz.LinkedXYZ = function(getX,getY,getZ,setX,setY,setZ) {
	this.getX = getX;
	this.getY = getY;
	this.getZ = getZ;
	this.setX = setX;
	this.setY = setY;
	this.setZ = setZ;
};
thx.geom.d3.xyz.LinkedXYZ.__name__ = true;
thx.geom.d3.xyz.LinkedXYZ.__interfaces__ = [thx.geom.d3.xyz.XYZ];
thx.geom.d3.xyz.LinkedXYZ.prototype = {
	apply44: function(matrix) {
		thx.geom._Matrix44.Matrix44_Impl_.applyLeftMultiplyPoint3D(matrix,this);
		return this;
	}
	,clone: function() {
		return new thx.geom.d3.xyz.MutXYZ(this.getX(),this.getY(),this.getZ());
	}
	,get_x: function() {
		return this.getX();
	}
	,get_y: function() {
		return this.getY();
	}
	,get_z: function() {
		return this.getZ();
	}
	,set_x: function(v) {
		return this.setX(v);
	}
	,set_y: function(v) {
		return this.setY(v);
	}
	,set_z: function(v) {
		return this.setZ(v);
	}
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
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
thx.core.Floats.TOLERANCE = 10e-5;
thx.core.Floats.EPSILON = 10e-10;
thx.core.Floats.pattern_parse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
thx.core.Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
thx.core.Ints.BASE = "0123456789abcdefghijklmnopqrstuvwxyz";
thx.core.Strings.UCWORDS = new EReg("[^a-zA-Z]([a-z])","g");
thx.core.Strings.UCWORDSWS = new EReg("\\s[a-z]","g");
thx.core.Strings.ALPHANUM = new EReg("^[a-z0-9]+$","i");
thx.core.Strings.DIGITS = new EReg("^[0-9]+$","");
thx.core.Strings.STRIPTAGS = new EReg("</?[a-z]+[^>]*?/?>","gi");
thx.core.Strings.WSG = new EReg("\\s+","g");
thx.core.Strings.SPLIT_LINES = new EReg("\r\n|\n\r|\n|\r","g");
thx.geom._Matrix44.Matrix44_Impl_.identity = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
thx.geom.d3.Plane.PX = new thx.geom.d3.Plane(new thx.geom.d3.xyz.ImmutableXYZ(1,0,0),0);
thx.geom.d3.Plane.PY = new thx.geom.d3.Plane(new thx.geom.d3.xyz.ImmutableXYZ(0,1,0),0);
thx.geom.d3.Plane.PZ = new thx.geom.d3.Plane(new thx.geom.d3.xyz.ImmutableXYZ(0,0,1),0);
thx.geom.d3.Plane.COPLANAR = 0;
thx.geom.d3.Plane.FRONT = 1;
thx.geom.d3.Plane.BACK = 2;
thx.geom.d3.Plane.SPANNING = 3;
thx.geom.Transformables44.MX = thx.geom._Matrix44.Matrix44_Impl_.mirroring(thx.geom.d3.Plane.PX);
thx.geom.Transformables44.MY = thx.geom._Matrix44.Matrix44_Impl_.mirroring(thx.geom.d3.Plane.PY);
thx.geom.Transformables44.MZ = thx.geom._Matrix44.Matrix44_Impl_.mirroring(thx.geom.d3.Plane.PZ);
thx.geom.d2._Point.Point_Impl_.zero = new thx.geom.d2.xy.ImmutableXY(0,0);
thx.geom.d3._Point.Point_Impl_.zero = new thx.geom.d3.xyz.ImmutableXYZ(0,0,0);
thx.geom.d3.OrthoNormalBasis.z0Plane = new thx.geom.d3.OrthoNormalBasis(new thx.geom.d3.Plane(new thx.geom.d3.xyz.MutXYZ(0,0,1),0),new thx.geom.d3.xyz.MutXYZ(1,0,0));
thx.geom.d3.csg.Solids.baseCube = [{ p : [0,4,6,2], n : [-1.0,0.0,0.0]},{ p : [1,3,7,5], n : [1.0,0.0,0.0]},{ p : [0,1,5,4], n : [0.0,-1.0,0.0]},{ p : [2,6,7,3], n : [0.0,1.0,0.0]},{ p : [0,2,3,1], n : [0.0,0.0,-1.0]},{ p : [4,5,7,6], n : [0.0,0.0,1.0]}];
Main.main();
})();
