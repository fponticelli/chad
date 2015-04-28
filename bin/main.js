(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedPos: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
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
Main.__name__ = ["Main"];
Main.main = function() {
	var editor = new chad_Chad(window.document.getElementById("svg"));
};
Math.__name__ = ["Math"];
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
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
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
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
var Type = function() { };
Type.__name__ = ["Type"];
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
var chad_Chad = function(svg) {
	this.svg = svg;
	this.layers = [];
	this.selectedLayer = chad_components_Layer.createFromSvg(svg);
	this.world = new edge_World(20);
	this.addSystems();
	var layer = this.addLayer("my layer");
	var p1 = new thx_geom_core_MutableXY(60,60);
	var p2 = new thx_geom_core_MutableXY(180,80);
	this.world.engine.create([thx_geom_d2_Circle.fromPoints(p1,p2),chad_components_LineStyle.constructionLine,layer,chad_components_Selected.instance]);
	this.world.engine.create([thx_geom_d2_Path.fromSVGPath("M 80 80 A 45 45 0 0 0 125 125 L 125 80 Z M230 80 A 45 45, 0, 1, 0, 275 125 L 275 80 Z M80 230 A 45 45, 0, 0, 1, 125 275 L 125 230 Z M230 230 A 45 45, 0, 1, 1, 275 275 L 275 230 Z"),chad_components_LineStyle.solidStroke(thx_color_Color.darkblue,2),layer,chad_components_Selected.instance]);
	this.world.start();
};
chad_Chad.__name__ = ["chad","Chad"];
chad_Chad.prototype = {
	addLayer: function(name) {
		if(null != this.getLayer(name)) throw new js__$Boot_HaxeError("layer \"" + name + "\" already exists");
		var layer = chad_components_Layer.createFromSvg(this.svg);
		this.svg.appendChild(this.selectedLayer.group);
		this.layers.push({ _0 : name, _1 : layer});
		return layer;
	}
	,getLayer: function(name) {
		var t1 = thx_Arrays.find(this.layers,function(t) {
			return t._0 == name;
		});
		if(null == t1) return null; else return t1._1;
	}
	,addSystems: function() {
		this.world.render.add(new chad_systems_RenderCircle());
		this.world.render.add(new chad_systems_RenderPath());
		this.world.render.add(new chad_systems_RenderSelected(this.selectedLayer));
	}
	,__class__: chad_Chad
};
var edge_IComponent = function() { };
edge_IComponent.__name__ = ["edge","IComponent"];
var chad_components_Layer = function(group) {
	this.group = group;
};
chad_components_Layer.__name__ = ["chad","components","Layer"];
chad_components_Layer.__interfaces__ = [edge_IComponent];
chad_components_Layer.createFromSvg = function(svg) {
	var g = svg.ownerDocument.createElementNS("http://www.w3.org/2000/svg","g");
	svg.appendChild(g);
	return new chad_components_Layer(g);
};
chad_components_Layer.prototype = {
	toString: function(group) {
		return "Layer(group=$group)";
	}
	,__class__: chad_components_Layer
};
var chad_components_Style = { __ename__ : true, __constructs__ : ["ConstructionLine","SolidStroke","Selected"] };
chad_components_Style.ConstructionLine = ["ConstructionLine",0];
chad_components_Style.ConstructionLine.toString = $estr;
chad_components_Style.ConstructionLine.__enum__ = chad_components_Style;
chad_components_Style.SolidStroke = function(color,width,alpha) { var $x = ["SolidStroke",1,color,width,alpha]; $x.__enum__ = chad_components_Style; $x.toString = $estr; return $x; };
chad_components_Style.Selected = ["Selected",2];
chad_components_Style.Selected.toString = $estr;
chad_components_Style.Selected.__enum__ = chad_components_Style;
var chad_components_LineStyle = function(value) {
	this.value = value;
};
chad_components_LineStyle.__name__ = ["chad","components","LineStyle"];
chad_components_LineStyle.__interfaces__ = [edge_IComponent];
chad_components_LineStyle.solidStroke = function(color,width,alpha) {
	return new chad_components_LineStyle(chad_components_Style.SolidStroke(color,width,alpha));
};
chad_components_LineStyle.apply = function(style,node) {
	switch(style[1]) {
	case 0:
		node.setAttribute("fill","none");
		node.setAttribute("stroke-width","1");
		node.setAttribute("stroke","#666666");
		node.setAttribute("stroke-dasharray","5, 3");
		break;
	case 1:
		var alpha = style[4];
		var width = style[3];
		var color = style[2];
		node.setAttribute("fill","none");
		node.setAttribute("stroke",thx_color__$RGB_RGB_$Impl_$.toHex(color));
		if(null != width) node.setAttribute("stroke-width","" + width);
		if(null != alpha) node.setAttribute("stroke-opacity","" + alpha);
		break;
	case 2:
		node.setAttribute("fill","none");
		node.setAttribute("stroke-width","2");
		node.setAttribute("stroke","#3366CC");
		break;
	}
};
chad_components_LineStyle.prototype = {
	applyTo: function(node) {
		chad_components_LineStyle.apply(this.value,node);
	}
	,toString: function() {
		return "LineStyle()";
	}
	,__class__: chad_components_LineStyle
};
var chad_components_Selected = function() {
};
chad_components_Selected.__name__ = ["chad","components","Selected"];
chad_components_Selected.__interfaces__ = [edge_IComponent];
chad_components_Selected.prototype = {
	toString: function() {
		return "Selected()";
	}
	,__class__: chad_components_Selected
};
var edge_ISystem = function() { };
edge_ISystem.__name__ = ["edge","ISystem"];
edge_ISystem.prototype = {
	__class__: edge_ISystem
};
var chad_systems_RenderCircle = function() {
	this.map = new haxe_ds_ObjectMap();
	this.__process__ = new chad_systems_RenderCircle_$SystemProcess(this);
};
chad_systems_RenderCircle.__name__ = ["chad","systems","RenderCircle"];
chad_systems_RenderCircle.__interfaces__ = [edge_ISystem];
chad_systems_RenderCircle.prototype = {
	updateAdded: function(entity,data) {
		var circle = data.layer.group.ownerDocument.createElementNS("http://www.w3.org/2000/svg","circle");
		data.style.applyTo(circle);
		this.map.set(data.circle,circle);
		data.layer.group.appendChild(circle);
	}
	,updateRemoved: function(entity,data) {
		var circle = this.map.h[data.circle.__id__];
		data.layer.group.removeChild(circle);
		this.map.remove(data.circle);
	}
	,update: function(circle,style,layer) {
		var c = this.map.h[circle.__id__];
		c.setAttribute("cx","" + circle.center.get_x());
		c.setAttribute("cy","" + circle.center.get_y());
		c.setAttribute("r","" + circle.radius.get_coord());
		return true;
	}
	,toString: function() {
		return "chad.systems.RenderCircle";
	}
	,__class__: chad_systems_RenderCircle
};
var edge_core_ISystemProcess = function() { };
edge_core_ISystemProcess.__name__ = ["edge","core","ISystemProcess"];
edge_core_ISystemProcess.prototype = {
	__class__: edge_core_ISystemProcess
};
var chad_systems_RenderCircle_$SystemProcess = function(system) {
	this.system = system;
	this.updateItems = new edge_View();
};
chad_systems_RenderCircle_$SystemProcess.__name__ = ["chad","systems","RenderCircle_SystemProcess"];
chad_systems_RenderCircle_$SystemProcess.__interfaces__ = [edge_core_ISystemProcess];
chad_systems_RenderCircle_$SystemProcess.prototype = {
	removeEntity: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		if(removed != null) this.system.updateRemoved(entity,removed);
	}
	,addEntity: function(entity) {
		this.updateMatchRequirements(entity);
	}
	,update: function(engine,delta) {
		var result = true;
		var data;
		var $it0 = this.updateItems.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			data = item.data;
			result = this.system.update(data.circle,data.style,data.layer);
			if(!result) break;
		}
		return result;
	}
	,updateMatchRequirements: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		var count = 3;
		var o = { circle : null, style : null, layer : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js_Boot.__instanceof(component,thx_geom_d2_Circle)) {
				o.circle = component;
				if(--count == 0) break; else continue;
			}
			if(js_Boot.__instanceof(component,chad_components_LineStyle)) {
				o.style = component;
				if(--count == 0) break; else continue;
			}
			if(js_Boot.__instanceof(component,chad_components_Layer)) {
				o.layer = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.updateItems.tryAdd(entity,o);
		if(null != removed && !added) this.system.updateRemoved(entity,removed);
		if(added && null == removed) this.system.updateAdded(entity,o);
	}
	,__class__: chad_systems_RenderCircle_$SystemProcess
};
var chad_systems_RenderPath = function() {
	this.map = new haxe_ds_ObjectMap();
	this.__process__ = new chad_systems_RenderPath_$SystemProcess(this);
};
chad_systems_RenderPath.__name__ = ["chad","systems","RenderPath"];
chad_systems_RenderPath.__interfaces__ = [edge_ISystem];
chad_systems_RenderPath.prototype = {
	updateAdded: function(entity,data) {
		var path = data.layer.group.ownerDocument.createElementNS("http://www.w3.org/2000/svg","path");
		data.style.applyTo(path);
		this.map.set(data.path,path);
		data.layer.group.appendChild(path);
	}
	,updateRemoved: function(entity,data) {
		var path = this.map.h[data.path.__id__];
		data.layer.group.removeChild(path);
		this.map.remove(data.path);
	}
	,update: function(path,style,layer) {
		var c = this.map.h[path.__id__];
		c.setAttribute("d","" + path.toSVGPath());
		return true;
	}
	,toString: function() {
		return "chad.systems.RenderPath";
	}
	,__class__: chad_systems_RenderPath
};
var chad_systems_RenderPath_$SystemProcess = function(system) {
	this.system = system;
	this.updateItems = new edge_View();
};
chad_systems_RenderPath_$SystemProcess.__name__ = ["chad","systems","RenderPath_SystemProcess"];
chad_systems_RenderPath_$SystemProcess.__interfaces__ = [edge_core_ISystemProcess];
chad_systems_RenderPath_$SystemProcess.prototype = {
	removeEntity: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		if(removed != null) this.system.updateRemoved(entity,removed);
	}
	,addEntity: function(entity) {
		this.updateMatchRequirements(entity);
	}
	,update: function(engine,delta) {
		var result = true;
		var data;
		var $it0 = this.updateItems.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			data = item.data;
			result = this.system.update(data.path,data.style,data.layer);
			if(!result) break;
		}
		return result;
	}
	,updateMatchRequirements: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		var count = 3;
		var o = { path : null, style : null, layer : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js_Boot.__instanceof(component,thx_geom_d2_Path)) {
				o.path = component;
				if(--count == 0) break; else continue;
			}
			if(js_Boot.__instanceof(component,chad_components_LineStyle)) {
				o.style = component;
				if(--count == 0) break; else continue;
			}
			if(js_Boot.__instanceof(component,chad_components_Layer)) {
				o.layer = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.updateItems.tryAdd(entity,o);
		if(null != removed && !added) this.system.updateRemoved(entity,removed);
		if(added && null == removed) this.system.updateAdded(entity,o);
	}
	,__class__: chad_systems_RenderPath_$SystemProcess
};
var chad_systems_RenderSelected = function(layer) {
	this.map = new haxe_ds_ObjectMap();
	this.layer = layer;
	this.__process__ = new chad_systems_RenderSelected_$SystemProcess(this);
};
chad_systems_RenderSelected.__name__ = ["chad","systems","RenderSelected"];
chad_systems_RenderSelected.__interfaces__ = [edge_ISystem];
chad_systems_RenderSelected.prototype = {
	updateAdded: function(entity,data) {
		var _g = this;
		var points = data.shape.get_anchors();
		var rects = points.map(function(point) {
			var rect = _g.layer.group.ownerDocument.createElementNS("http://www.w3.org/2000/svg","rect");
			rect.setAttribute("width","" + chad_systems_RenderSelected.size);
			rect.setAttribute("height","" + chad_systems_RenderSelected.size);
			chad_components_LineStyle.apply(chad_components_Style.Selected,rect);
			_g.layer.group.appendChild(rect);
			return rect;
		});
		this.map.set(data.shape,rects);
	}
	,updateRemoved: function(entity,data) {
		var rects = this.map.h[data.shape.__id__];
		rects.map(($_=this.layer.group,$bind($_,$_.removeChild)));
		this.map.remove(data.shape);
	}
	,update: function(shape) {
		var rs = this.map.h[shape.__id__];
		thx_Arrays.zip(rs,shape.get_anchors()).map(function(t) {
			t._0.setAttribute("x","" + (t._1.get_x() - chad_systems_RenderSelected.size / 2));
			t._0.setAttribute("y","" + (t._1.get_y() - chad_systems_RenderSelected.size / 2));
		});
		return true;
	}
	,toString: function() {
		return "chad.systems.RenderSelected";
	}
	,__class__: chad_systems_RenderSelected
};
var chad_systems_RenderSelected_$SystemProcess = function(system) {
	this.system = system;
	this.updateItems = new edge_View();
};
chad_systems_RenderSelected_$SystemProcess.__name__ = ["chad","systems","RenderSelected_SystemProcess"];
chad_systems_RenderSelected_$SystemProcess.__interfaces__ = [edge_core_ISystemProcess];
chad_systems_RenderSelected_$SystemProcess.prototype = {
	removeEntity: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		if(removed != null) this.system.updateRemoved(entity,removed);
	}
	,addEntity: function(entity) {
		this.updateMatchRequirements(entity);
	}
	,update: function(engine,delta) {
		var result = true;
		var data;
		var $it0 = this.updateItems.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			data = item.data;
			result = this.system.update(data.shape);
			if(!result) break;
		}
		return result;
	}
	,updateMatchRequirements: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		var count = 1;
		var o = { shape : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js_Boot.__instanceof(component,thx_geom_d2_IShape)) {
				o.shape = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.updateItems.tryAdd(entity,o);
		if(null != removed && !added) this.system.updateRemoved(entity,removed);
		if(added && null == removed) this.system.updateAdded(entity,o);
	}
	,__class__: chad_systems_RenderSelected_$SystemProcess
};
var edge_Engine = function() {
	this.mapEntities = new haxe_ds_ObjectMap();
	this.listPhases = [];
};
edge_Engine.__name__ = ["edge","Engine"];
edge_Engine.prototype = {
	create: function(components) {
		var entity = new edge_Entity(this,components);
		this.mapEntities.set(entity,true);
		this.matchSystems(entity);
		return entity;
	}
	,clear: function() {
		var $it0 = this.mapEntities.keys();
		while( $it0.hasNext() ) {
			var entity = $it0.next();
			this.remove(entity);
		}
	}
	,remove: function(entity) {
		this.eachSystem(function(system) {
			system.__process__.removeEntity(entity);
		});
		this.mapEntities.remove(entity);
		entity.engine = null;
	}
	,entities: function() {
		return this.mapEntities.keys();
	}
	,createPhase: function() {
		var phase = new edge_Phase(this);
		this.listPhases.push(phase);
		return phase;
	}
	,phases: function() {
		return HxOverrides.iter(this.listPhases);
	}
	,eachSystem: function(f) {
		var _g = 0;
		var _g1 = this.listPhases;
		while(_g < _g1.length) {
			var phase = _g1[_g];
			++_g;
			var $it0 = phase.systems();
			while( $it0.hasNext() ) {
				var system = $it0.next();
				f(system);
			}
		}
	}
	,addSystem: function(system) {
		this.eachSystem(function(s) {
			if(s == system) throw new js__$Boot_HaxeError("System \"" + Std.string(system) + "\" already exists in Engine");
		});
		var $it0 = this.mapEntities.keys();
		while( $it0.hasNext() ) {
			var entity = $it0.next();
			system.__process__.addEntity(entity);
		}
	}
	,removeSystem: function(system) {
		var $it0 = this.mapEntities.keys();
		while( $it0.hasNext() ) {
			var entity = $it0.next();
			system.__process__.removeEntity(entity);
		}
	}
	,updateSystem: function(system,t) {
		return system.__process__.update(this,t);
	}
	,matchSystems: function(entity) {
		var _g = this;
		this.eachSystem(function(system) {
			system.__process__.addEntity(entity);
		});
	}
	,match: function(entity,system) {
		system.__process__.addEntity(entity);
	}
	,__class__: edge_Engine
};
var edge_Entity = function(engine,components) {
	this.engine = engine;
	this.map = new haxe_ds_StringMap();
	if(null != components) this.addMany(components);
};
edge_Entity.__name__ = ["edge","Entity"];
edge_Entity.prototype = {
	add: function(component) {
		if(null == this.engine) return;
		this._add(component);
		this.engine.matchSystems(this);
	}
	,addMany: function(components) {
		var _g = this;
		if(null == this.engine) return;
		components.map(function(_) {
			_g._add(_);
			return;
		});
		this.engine.matchSystems(this);
	}
	,destroy: function() {
		if(null == this.engine) return;
		this.engine.remove(this);
		this.map = new haxe_ds_StringMap();
	}
	,exists: function(component) {
		return this.existsType(component == null?null:js_Boot.getClass(component));
	}
	,existsType: function(type) {
		var key = Type.getClassName(type);
		return this.map.exists(key);
	}
	,remove: function(component) {
		this._remove(component);
		this.engine.matchSystems(this);
	}
	,removeMany: function(components) {
		var _g = this;
		components.map(function(_) {
			_g._remove(_);
			return;
		});
		this.engine.matchSystems(this);
	}
	,removeType: function(type) {
		this._removeTypeName(Type.getClassName(type));
		this.engine.matchSystems(this);
	}
	,removeTypes: function(types) {
		var _g = this;
		types.map(function(_) {
			_g._removeTypeName(Type.getClassName(_));
			return;
		});
		this.engine.matchSystems(this);
	}
	,components: function() {
		return this.map.iterator();
	}
	,_add: function(component) {
		var type = this.key(component);
		if(this.map.exists(type)) this.remove(this.map.get(type));
		this.map.set(type,component);
	}
	,_remove: function(component) {
		var type = this.key(component);
		this._removeTypeName(type);
	}
	,_removeTypeName: function(type) {
		this.map.remove(type);
	}
	,key: function(component) {
		var t;
		if(component == null) t = null; else t = js_Boot.getClass(component);
		var s = Type.getSuperClass(t);
		while(s != null && s != edge_IComponent) {
			t = s;
			s = Type.getSuperClass(t);
		}
		return Type.getClassName(t);
	}
	,__class__: edge_Entity
};
var edge_Phase = function(engine) {
	this.engine = engine;
	this.mapSystem = new haxe_ds_ObjectMap();
	this.mapType = new haxe_ds_StringMap();
	this.phases = [];
	this.enabled = true;
};
edge_Phase.__name__ = ["edge","Phase"];
edge_Phase.prototype = {
	add: function(system) {
		this.remove(system);
		var node = this.createNode(system);
		if(null == this.first) {
			this.first = node;
			this.last = node;
		} else {
			node.prev = this.last;
			this.last.next = node;
			this.last = node;
		}
	}
	,createPhase: function() {
		var phase = this.engine.createPhase();
		this.phases.push(phase);
		return phase;
	}
	,clearSystems: function() {
		var $it0 = this.systems();
		while( $it0.hasNext() ) {
			var system = $it0.next();
			this.remove(system);
		}
	}
	,insertBefore: function(ref,system) {
		var noderef = this.mapSystem.h[ref.__id__];
		if(null == noderef) throw new js__$Boot_HaxeError("Phase.insertBefore: unable to find " + Std.string(ref) + " system");
		var node = this.createNode(system);
		if(noderef == this.first) {
			node.next = noderef;
			noderef.prev = node;
			this.first = node;
		} else {
			var prev = noderef.prev;
			prev.next = node;
			node.prev = prev;
			node.next = noderef;
			noderef.prev = node;
		}
	}
	,insertAfter: function(ref,system) {
		var noderef = this.mapSystem.h[ref.__id__];
		if(null == noderef) throw new js__$Boot_HaxeError("Phase.insertAfter: unable to find " + Std.string(ref) + " system");
		var node = this.createNode(system);
		if(noderef == this.last) {
			node.prev = noderef;
			noderef.next = node;
			this.last = node;
		} else {
			var next = noderef.next;
			next.prev = node;
			node.next = next;
			node.prev = noderef;
			noderef.next = node;
		}
	}
	,remove: function(system) {
		var node = this.mapSystem.h[system.__id__];
		var key = this.key(system);
		this.mapType.remove(key);
		if(null == node) return;
		this.engine.removeSystem(system);
		this.mapSystem.remove(system);
		if(node == this.first && node == this.last) this.first = this.last = null; else if(node == this.first) {
			this.first = node.next;
			node.next.prev = null;
		} else if(node == this.last) {
			this.first = node.prev;
			node.prev.next = null;
		} else {
			node.prev.next = node.next;
			node.next.prev = node.prev;
		}
	}
	,removeType: function(cls) {
		var system;
		var key = Type.getClassName(cls);
		system = this.mapType.get(key);
		if(null == system) throw new js__$Boot_HaxeError("type system " + Type.getClassName(cls) + " is not included in this Phase");
		this.remove(system);
		return;
	}
	,systems: function() {
		return new edge_core_NodeSystemIterator(this.first);
	}
	,update: function(t) {
		if(!this.enabled) return;
		var result;
		var $it0 = this.systems();
		while( $it0.hasNext() ) {
			var system = $it0.next();
			result = this.engine.updateSystem(system,t);
			if(!result) return;
		}
		var _g = 0;
		var _g1 = this.phases;
		while(_g < _g1.length) {
			var phase = _g1[_g];
			++_g;
			phase.update(t);
		}
	}
	,createNode: function(system) {
		var node = new edge_core_NodeSystem(system);
		this.mapSystem.set(system,node);
		var key = this.key(system);
		this.mapType.set(key,system);
		this.engine.addSystem(system);
		return node;
	}
	,key: function(system) {
		return Type.getClassName(system == null?null:js_Boot.getClass(system));
	}
	,__class__: edge_Phase
};
var edge_View = function() {
	this.map = new haxe_ds_ObjectMap();
	this.count = 0;
};
edge_View.__name__ = ["edge","View"];
edge_View.prototype = {
	iterator: function() {
		var _g = this;
		var keys = this.map.keys();
		var holder = { entity : null, data : null};
		return { hasNext : function() {
			return keys.hasNext();
		}, next : function() {
			var key = keys.next();
			holder.entity = key;
			holder.data = _g.map.h[key.__id__];
			return holder;
		}};
	}
	,tryAdd: function(entity,data) {
		if(this.map.h.__keys__[entity.__id__] != null) return false;
		this.map.set(entity,data);
		this.count++;
		return true;
	}
	,tryRemove: function(entity) {
		var o = this.map.h[entity.__id__];
		if(null == o) return null;
		this.map.remove(entity);
		this.count--;
		return o;
	}
	,__class__: edge_View
};
var edge_World = function(delta,schedule) {
	if(delta == null) delta = 16;
	this.engine = new edge_Engine();
	this.frame = this.engine.createPhase();
	this.physics = this.engine.createPhase();
	this.render = this.engine.createPhase();
	this.remainder = 0;
	this.running = false;
	this.delta = delta;
	if(null != schedule) this.schedule = schedule; else this.schedule = thx_Timer.frame;
};
edge_World.__name__ = ["edge","World"];
edge_World.prototype = {
	start: function() {
		if(this.running) return;
		this.running = true;
		this.cancel = this.schedule($bind(this,this.run));
	}
	,run: function(t) {
		this.frame.update(t);
		var dt = t + this.remainder;
		while(dt > this.delta) {
			dt -= this.delta;
			this.physics.update(this.delta);
		}
		this.remainder = dt;
		this.render.update(t);
	}
	,stop: function() {
		if(!this.running) return;
		this.running = false;
		this.cancel();
	}
	,__class__: edge_World
};
var edge_core_NodeSystem = function(system) {
	this.system = system;
};
edge_core_NodeSystem.__name__ = ["edge","core","NodeSystem"];
edge_core_NodeSystem.prototype = {
	__class__: edge_core_NodeSystem
};
var edge_core_NodeSystemIterator = function(node) {
	this.node = node;
};
edge_core_NodeSystemIterator.__name__ = ["edge","core","NodeSystemIterator"];
edge_core_NodeSystemIterator.prototype = {
	hasNext: function() {
		return null != this.node;
	}
	,next: function() {
		var system = this.node.system;
		this.node = this.node.next;
		return system;
	}
	,__class__: edge_core_NodeSystemIterator
};
var haxe_StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.toString = $estr;
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
var haxe_CallStack = function() { };
haxe_CallStack.__name__ = ["haxe","CallStack"];
haxe_CallStack.getStack = function(e) {
	if(e == null) return [];
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			if(haxe_CallStack.wrapCallSite != null) site = haxe_CallStack.wrapCallSite(site);
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
	var a = haxe_CallStack.makeStack(e.stack);
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.callStack = function() {
	try {
		throw new Error();
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		var a = haxe_CallStack.getStack(e);
		a.shift();
		return a;
	}
};
haxe_CallStack.exceptionStack = function() {
	return haxe_CallStack.getStack(haxe_CallStack.lastException);
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
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe_CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe_CallStack.makeStack = function(s) {
	if(s == null) return []; else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") stack.shift();
		var m = [];
		var rie10 = new EReg("^   at ([A-Za-z0-9_. ]+) \\(([^)]+):([0-9]+):([0-9]+)\\)$","");
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			if(rie10.match(line)) {
				var path = rie10.matched(1).split(".");
				var meth = path.pop();
				var file = rie10.matched(2);
				var line1 = Std.parseInt(rie10.matched(3));
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function"?haxe_StackItem.LocalFunction():meth == "Global code"?null:haxe_StackItem.Method(path.join("."),meth),file,line1));
			} else m.push(haxe_StackItem.Module(StringTools.trim(line)));
		}
		return m;
	} else return s;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
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
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
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
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
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
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
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
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var thx_Arrays = function() { };
thx_Arrays.__name__ = ["thx","Arrays"];
thx_Arrays.after = function(array,element) {
	return array.slice(HxOverrides.indexOf(array,element,0) + 1);
};
thx_Arrays.all = function(arr,predicate) {
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(!predicate(item)) return false;
	}
	return true;
};
thx_Arrays.any = function(arr,predicate) {
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(predicate(item)) return true;
	}
	return false;
};
thx_Arrays.at = function(arr,indexes) {
	return indexes.map(function(i) {
		return arr[i];
	});
};
thx_Arrays.before = function(array,element) {
	return array.slice(0,HxOverrides.indexOf(array,element,0));
};
thx_Arrays.compact = function(arr) {
	return arr.filter(function(v) {
		return null != v;
	});
};
thx_Arrays.contains = function(array,element,eq) {
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
thx_Arrays.cross = function(a,b) {
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
thx_Arrays.crossMulti = function(array) {
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
thx_Arrays.distinct = function(array,predicate) {
	var result = [];
	if(array.length <= 1) return array;
	if(null == predicate) predicate = thx_Functions.equality;
	var _g = 0;
	while(_g < array.length) {
		var v = [array[_g]];
		++_g;
		var keep = !thx_Arrays.any(result,(function(v) {
			return function(r) {
				return predicate(r,v[0]);
			};
		})(v));
		if(keep) result.push(v[0]);
	}
	return result;
};
thx_Arrays.eachPair = function(array,callback) {
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
thx_Arrays.equals = function(a,b,equality) {
	if(a == null || b == null || a.length != b.length) return false;
	if(null == equality) equality = thx_Functions.equality;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(!equality(a[i],b[i])) return false;
	}
	return true;
};
thx_Arrays.extract = function(a,predicate) {
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(predicate(a[i])) return a.splice(i,1)[0];
	}
	return null;
};
thx_Arrays.find = function(array,predicate) {
	var _g = 0;
	while(_g < array.length) {
		var item = array[_g];
		++_g;
		if(predicate(item)) return item;
	}
	return null;
};
thx_Arrays.findLast = function(array,predicate) {
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
thx_Arrays.first = function(array) {
	return array[0];
};
thx_Arrays.flatMap = function(array,callback) {
	return thx_Arrays.flatten(array.map(callback));
};
thx_Arrays.flatten = function(array) {
	return Array.prototype.concat.apply([],array);
};
thx_Arrays.from = function(array,element) {
	return array.slice(HxOverrides.indexOf(array,element,0));
};
thx_Arrays.groupByAppend = function(arr,resolver,map) {
	arr.map(function(v) {
		var key = resolver(v);
		var arr1 = map.get(key);
		if(null == arr1) {
			arr1 = [v];
			map.set(key,arr1);
		} else arr1.push(v);
	});
	return map;
};
thx_Arrays.head = function(array) {
	return array[0];
};
thx_Arrays.ifEmpty = function(value,alt) {
	if(null != value && 0 != value.length) return value; else return alt;
};
thx_Arrays.initial = function(array) {
	return array.slice(0,array.length - 1);
};
thx_Arrays.isEmpty = function(array) {
	return array.length == 0;
};
thx_Arrays.last = function(array) {
	return array[array.length - 1];
};
thx_Arrays.mapi = function(array,callback) {
	var r = [];
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		r.push(callback(array[i],i));
	}
	return r;
};
thx_Arrays.mapRight = function(array,callback) {
	var i = array.length;
	var result = [];
	while(--i >= 0) result.push(callback(array[i]));
	return result;
};
thx_Arrays.order = function(array,sort) {
	var n = array.slice();
	n.sort(sort);
	return n;
};
thx_Arrays.pull = function(array,toRemove,equality) {
	var _g = 0;
	while(_g < toRemove.length) {
		var item = toRemove[_g];
		++_g;
		thx_Arrays.removeAll(array,item,equality);
	}
};
thx_Arrays.pushIf = function(array,condition,value) {
	if(condition) array.push(value);
	return array;
};
thx_Arrays.reduce = function(array,callback,initial) {
	return array.reduce(callback,initial);
};
thx_Arrays.resize = function(array,length,fill) {
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx_Arrays.reducei = function(array,callback,initial) {
	return array.reduce(callback,initial);
};
thx_Arrays.reduceRight = function(array,callback,initial) {
	var i = array.length;
	while(--i >= 0) initial = callback(initial,array[i]);
	return initial;
};
thx_Arrays.removeAll = function(array,element,equality) {
	if(null == equality) equality = thx_Functions.equality;
	var i = array.length;
	while(--i >= 0) if(equality(array[i],element)) array.splice(i,1);
};
thx_Arrays.rest = function(array) {
	return array.slice(1);
};
thx_Arrays.sample = function(array,n) {
	n = thx_Ints.min(n,array.length);
	var copy = array.slice();
	var result = [];
	var _g = 0;
	while(_g < n) {
		var i = _g++;
		result.push(copy.splice(Std.random(copy.length),1)[0]);
	}
	return result;
};
thx_Arrays.sampleOne = function(array) {
	return array[Std.random(array.length)];
};
thx_Arrays.shuffle = function(a) {
	var t = thx_Ints.range(a.length);
	var array = [];
	while(t.length > 0) {
		var pos = Std.random(t.length);
		var index = t[pos];
		t.splice(pos,1);
		array.push(a[index]);
	}
	return array;
};
thx_Arrays.split = function(array,parts) {
	var len = Math.ceil(array.length / parts);
	return thx_Arrays.splitBy(array,len);
};
thx_Arrays.splitBy = function(array,len) {
	var res = [];
	len = thx_Ints.min(len,array.length);
	var _g1 = 0;
	var _g = Math.ceil(array.length / len);
	while(_g1 < _g) {
		var p = _g1++;
		res.push(array.slice(p * len,(p + 1) * len));
	}
	return res;
};
thx_Arrays.take = function(arr,n) {
	return arr.slice(0,n);
};
thx_Arrays.takeLast = function(arr,n) {
	return arr.slice(arr.length - n);
};
thx_Arrays.rotate = function(arr) {
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
thx_Arrays.zip = function(array1,array2) {
	var length = thx_Ints.min(array1.length,array2.length);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i]});
	}
	return array;
};
thx_Arrays.zip3 = function(array1,array2,array3) {
	var length = thx_ArrayInts.min([array1.length,array2.length,array3.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i]});
	}
	return array;
};
thx_Arrays.zip4 = function(array1,array2,array3,array4) {
	var length = thx_ArrayInts.min([array1.length,array2.length,array3.length,array4.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i], _3 : array4[i]});
	}
	return array;
};
thx_Arrays.zip5 = function(array1,array2,array3,array4,array5) {
	var length = thx_ArrayInts.min([array1.length,array2.length,array3.length,array4.length,array5.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i], _3 : array4[i], _4 : array5[i]});
	}
	return array;
};
thx_Arrays.unzip = function(array) {
	var a1 = [];
	var a2 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
	});
	return { _0 : a1, _1 : a2};
};
thx_Arrays.unzip3 = function(array) {
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
thx_Arrays.unzip4 = function(array) {
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
thx_Arrays.unzip5 = function(array) {
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
var thx_ArrayFloats = function() { };
thx_ArrayFloats.__name__ = ["thx","ArrayFloats"];
thx_ArrayFloats.average = function(arr) {
	return thx_ArrayFloats.sum(arr) / arr.length;
};
thx_ArrayFloats.compact = function(arr) {
	return arr.filter(function(v) {
		return null != v && isFinite(v);
	});
};
thx_ArrayFloats.max = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(max,v) {
		if(v > max) return v; else return max;
	},arr[0]);
};
thx_ArrayFloats.min = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(min,v) {
		if(v < min) return v; else return min;
	},arr[0]);
};
thx_ArrayFloats.resize = function(array,length,fill) {
	if(fill == null) fill = 0.0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx_ArrayFloats.sum = function(arr) {
	return arr.reduce(function(tot,v) {
		return tot + v;
	},0.0);
};
var thx_ArrayInts = function() { };
thx_ArrayInts.__name__ = ["thx","ArrayInts"];
thx_ArrayInts.average = function(arr) {
	return thx_ArrayInts.sum(arr) / arr.length;
};
thx_ArrayInts.max = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(max,v) {
		if(v > max) return v; else return max;
	},arr[0]);
};
thx_ArrayInts.min = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(min,v) {
		if(v < min) return v; else return min;
	},arr[0]);
};
thx_ArrayInts.resize = function(array,length,fill) {
	if(fill == null) fill = 0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx_ArrayInts.sum = function(arr) {
	return arr.reduce(function(tot,v) {
		return tot + v;
	},0);
};
var thx_ArrayStrings = function() { };
thx_ArrayStrings.__name__ = ["thx","ArrayStrings"];
thx_ArrayStrings.compact = function(arr) {
	return arr.filter(function(v) {
		return !thx_Strings.isEmpty(v);
	});
};
thx_ArrayStrings.max = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(max,v) {
		if(v > max) return v; else return max;
	},arr[0]);
};
thx_ArrayStrings.min = function(arr) {
	if(arr.length == 0) return null; else return arr.reduce(function(min,v) {
		if(v < min) return v; else return min;
	},arr[0]);
};
var thx_Error = function(message,stack,pos) {
	Error.call(this,message);
	this.message = message;
	if(null == stack) {
		try {
			stack = haxe_CallStack.exceptionStack();
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			stack = [];
		}
		if(stack.length == 0) try {
			stack = haxe_CallStack.callStack();
		} catch( e1 ) {
			haxe_CallStack.lastException = e1;
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			stack = [];
		}
	}
	this.stackItems = stack;
	this.pos = pos;
};
thx_Error.__name__ = ["thx","Error"];
thx_Error.fromDynamic = function(err,pos) {
	if(js_Boot.__instanceof(err,thx_Error)) return err;
	return new thx_error_ErrorWrapper("" + Std.string(err),err,null,pos);
};
thx_Error.__super__ = Error;
thx_Error.prototype = $extend(Error.prototype,{
	toString: function() {
		return this.message + "\nfrom: " + this.pos.className + "." + this.pos.methodName + "() at " + this.pos.lineNumber + "\n\n" + haxe_CallStack.toString(this.stackItems);
	}
	,__class__: thx_Error
});
var thx_Floats = function() { };
thx_Floats.__name__ = ["thx","Floats"];
thx_Floats.angleDifference = function(a,b,turn) {
	if(turn == null) turn = 360;
	var r = (b - a) % turn;
	if(r < 0) r += turn;
	if(r > turn / 2) r -= turn;
	return r;
};
thx_Floats.ceilTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.ceil(f * p) / p;
};
thx_Floats.canParse = function(s) {
	return thx_Floats.pattern_parse.match(s);
};
thx_Floats.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
};
thx_Floats.clampSym = function(v,max) {
	return thx_Floats.clamp(v,-max,max);
};
thx_Floats.compare = function(a,b) {
	if(a < b) return -1; else if(a > b) return 1; else return 0;
};
thx_Floats.floorTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.floor(f * p) / p;
};
thx_Floats.interpolate = function(f,a,b) {
	return (b - a) * f + a;
};
thx_Floats.interpolateAngle = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	return thx_Floats.wrapCircular(thx_Floats.interpolate(f,a,a + thx_Floats.angleDifference(a,b,turn)),turn);
};
thx_Floats.interpolateAngleWidest = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	return thx_Floats.wrapCircular(thx_Floats.interpolateAngle(f,a,b,turn) - turn / 2,turn);
};
thx_Floats.interpolateAngleCW = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	a = thx_Floats.wrapCircular(a,turn);
	b = thx_Floats.wrapCircular(b,turn);
	if(b < a) b += turn;
	return thx_Floats.wrapCircular(thx_Floats.interpolate(f,a,b),turn);
};
thx_Floats.interpolateAngleCCW = function(f,a,b,turn) {
	if(turn == null) turn = 360;
	a = thx_Floats.wrapCircular(a,turn);
	b = thx_Floats.wrapCircular(b,turn);
	if(b > a) b -= turn;
	return thx_Floats.wrapCircular(thx_Floats.interpolate(f,a,b),turn);
};
thx_Floats.nearEquals = function(a,b) {
	return Math.abs(a - b) <= 10e-10;
};
thx_Floats.nearZero = function(n) {
	return Math.abs(n) <= 10e-10;
};
thx_Floats.normalize = function(v) {
	if(v < 0) return 0; else if(v > 1) return 1; else return v;
};
thx_Floats.parse = function(s) {
	if(s.substring(0,1) == "+") s = s.substring(1);
	return parseFloat(s);
};
thx_Floats.root = function(base,index) {
	return Math.pow(base,1 / index);
};
thx_Floats.roundTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.round(f * p) / p;
};
thx_Floats.sign = function(value) {
	if(value < 0) return -1; else return 1;
};
thx_Floats.wrap = function(v,min,max) {
	var range = max - min + 1;
	if(v < min) v += range * ((min - v) / range + 1);
	return min + (v - min) % range;
};
thx_Floats.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
};
var thx_Functions0 = function() { };
thx_Functions0.__name__ = ["thx","Functions0"];
thx_Functions0.after = function(callback,n) {
	return function() {
		if(--n == 0) callback();
	};
};
thx_Functions0.join = function(fa,fb) {
	return function() {
		fa();
		fb();
	};
};
thx_Functions0.once = function(f) {
	return function() {
		var t = f;
		f = thx_Functions.noop;
		t();
	};
};
thx_Functions0.negate = function(callback) {
	return function() {
		return !callback();
	};
};
thx_Functions0.times = function(n,callback) {
	return function() {
		return thx_Ints.range(n).map(function(_) {
			return callback();
		});
	};
};
thx_Functions0.timesi = function(n,callback) {
	return function() {
		return thx_Ints.range(n).map(function(i) {
			return callback(i);
		});
	};
};
var thx_Functions1 = function() { };
thx_Functions1.__name__ = ["thx","Functions1"];
thx_Functions1.compose = function(fa,fb) {
	return function(v) {
		return fa(fb(v));
	};
};
thx_Functions1.join = function(fa,fb) {
	return function(v) {
		fa(v);
		fb(v);
	};
};
thx_Functions1.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v) {
		return "" + Std.string(v);
	};
	var map = new haxe_ds_StringMap();
	return function(v1) {
		var key = resolver(v1);
		if(__map_reserved[key] != null?map.existsReserved(key):map.h.hasOwnProperty(key)) return __map_reserved[key] != null?map.getReserved(key):map.h[key];
		var result = callback(v1);
		if(__map_reserved[key] != null) map.setReserved(key,result); else map.h[key] = result;
		return result;
	};
};
thx_Functions1.negate = function(callback) {
	return function(v) {
		return !callback(v);
	};
};
thx_Functions1.noop = function(_) {
};
thx_Functions1.times = function(n,callback) {
	return function(value) {
		return thx_Ints.range(n).map(function(_) {
			return callback(value);
		});
	};
};
thx_Functions1.timesi = function(n,callback) {
	return function(value) {
		return thx_Ints.range(n).map(function(i) {
			return callback(value,i);
		});
	};
};
thx_Functions1.swapArguments = function(callback) {
	return function(a2,a1) {
		return callback(a1,a2);
	};
};
var thx_Functions2 = function() { };
thx_Functions2.__name__ = ["thx","Functions2"];
thx_Functions2.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v1,v2) {
		return "" + Std.string(v1) + ":" + Std.string(v2);
	};
	var map = new haxe_ds_StringMap();
	return function(v11,v21) {
		var key = resolver(v11,v21);
		if(__map_reserved[key] != null?map.existsReserved(key):map.h.hasOwnProperty(key)) return __map_reserved[key] != null?map.getReserved(key):map.h[key];
		var result = callback(v11,v21);
		if(__map_reserved[key] != null) map.setReserved(key,result); else map.h[key] = result;
		return result;
	};
};
thx_Functions2.negate = function(callback) {
	return function(v1,v2) {
		return !callback(v1,v2);
	};
};
var thx_Functions3 = function() { };
thx_Functions3.__name__ = ["thx","Functions3"];
thx_Functions3.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v1,v2,v3) {
		return "" + Std.string(v1) + ":" + Std.string(v2) + ":" + Std.string(v3);
	};
	var map = new haxe_ds_StringMap();
	return function(v11,v21,v31) {
		var key = resolver(v11,v21,v31);
		if(__map_reserved[key] != null?map.existsReserved(key):map.h.hasOwnProperty(key)) return __map_reserved[key] != null?map.getReserved(key):map.h[key];
		var result = callback(v11,v21,v31);
		if(__map_reserved[key] != null) map.setReserved(key,result); else map.h[key] = result;
		return result;
	};
};
thx_Functions3.negate = function(callback) {
	return function(v1,v2,v3) {
		return !callback(v1,v2,v3);
	};
};
var thx_Functions = function() { };
thx_Functions.__name__ = ["thx","Functions"];
thx_Functions.constant = function(v) {
	return function() {
		return v;
	};
};
thx_Functions.equality = function(a,b) {
	return a == b;
};
thx_Functions.identity = function(value) {
	return value;
};
thx_Functions.noop = function() {
};
var thx_Ints = function() { };
thx_Ints.__name__ = ["thx","Ints"];
thx_Ints.abs = function(v) {
	if(v < 0) return -v; else return v;
};
thx_Ints.canParse = function(s) {
	return thx_Ints.pattern_parse.match(s);
};
thx_Ints.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
};
thx_Ints.clampSym = function(v,max) {
	return thx_Ints.clamp(v,-max,max);
};
thx_Ints.compare = function(a,b) {
	return a - b;
};
thx_Ints.interpolate = function(f,a,b) {
	return Math.round(a + (b - a) * f);
};
thx_Ints.isEven = function(v) {
	return v % 2 == 0;
};
thx_Ints.isOdd = function(v) {
	return v % 2 != 0;
};
thx_Ints.max = function(a,b) {
	if(a > b) return a; else return b;
};
thx_Ints.min = function(a,b) {
	if(a < b) return a; else return b;
};
thx_Ints.parse = function(s,base) {
	var v = parseInt(s,base);
	if(isNaN(v)) return null; else return v;
};
thx_Ints.random = function(min,max) {
	if(min == null) min = 0;
	return Std.random(max + 1) + min;
};
thx_Ints.range = function(start,stop,step) {
	if(step == null) step = 1;
	if(null == stop) {
		stop = start;
		start = 0;
	}
	if((stop - start) / step == Infinity) throw new js__$Boot_HaxeError("infinite range");
	var range = [];
	var i = -1;
	var j;
	if(step < 0) while((j = start + step * ++i) > stop) range.push(j); else while((j = start + step * ++i) < stop) range.push(j);
	return range;
};
thx_Ints.toString = function(value,base) {
	return value.toString(base);
};
thx_Ints.toBool = function(v) {
	return v != 0;
};
thx_Ints.sign = function(value) {
	if(value < 0) return -1; else return 1;
};
thx_Ints.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
};
var thx_Nil = { __ename__ : true, __constructs__ : ["nil"] };
thx_Nil.nil = ["nil",0];
thx_Nil.nil.toString = $estr;
thx_Nil.nil.__enum__ = thx_Nil;
var thx_Strings = function() { };
thx_Strings.__name__ = ["thx","Strings"];
thx_Strings.after = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return ""; else return value.substring(pos + searchFor.length);
};
thx_Strings.capitalize = function(s) {
	return s.substring(0,1).toUpperCase() + s.substring(1);
};
thx_Strings.capitalizeWords = function(value,whiteSpaceOnly) {
	if(whiteSpaceOnly == null) whiteSpaceOnly = false;
	if(whiteSpaceOnly) return thx_Strings.UCWORDSWS.map(value.substring(0,1).toUpperCase() + value.substring(1),thx_Strings.upperMatch); else return thx_Strings.UCWORDS.map(value.substring(0,1).toUpperCase() + value.substring(1),thx_Strings.upperMatch);
};
thx_Strings.collapse = function(value) {
	return thx_Strings.WSG.replace(StringTools.trim(value)," ");
};
thx_Strings.compare = function(a,b) {
	if(a < b) return -1; else if(a > b) return 1; else return 0;
};
thx_Strings.contains = function(s,test) {
	return s.indexOf(test) >= 0;
};
thx_Strings.dasherize = function(s) {
	return StringTools.replace(s,"_","-");
};
thx_Strings.ellipsis = function(s,maxlen,symbol) {
	if(symbol == null) symbol = "...";
	if(maxlen == null) maxlen = 20;
	if(s.length > maxlen) return s.substring(0,symbol.length > maxlen - symbol.length?symbol.length:maxlen - symbol.length) + symbol; else return s;
};
thx_Strings.filter = function(s,predicate) {
	return s.split("").filter(predicate).join("");
};
thx_Strings.filterCharcode = function(s,predicate) {
	return thx_Strings.toCharcodeArray(s).filter(predicate).map(function(i) {
		return String.fromCharCode(i);
	}).join("");
};
thx_Strings.from = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return ""; else return value.substring(pos);
};
thx_Strings.humanize = function(s) {
	return StringTools.replace(thx_Strings.underscore(s),"_"," ");
};
thx_Strings.isAlphaNum = function(value) {
	return thx_Strings.ALPHANUM.match(value);
};
thx_Strings.isLowerCase = function(value) {
	return value.toLowerCase() == value;
};
thx_Strings.isUpperCase = function(value) {
	return value.toUpperCase() == value;
};
thx_Strings.ifEmpty = function(value,alt) {
	if(null != value && "" != value) return value; else return alt;
};
thx_Strings.isDigitsOnly = function(value) {
	return thx_Strings.DIGITS.match(value);
};
thx_Strings.isEmpty = function(value) {
	return value == null || value == "";
};
thx_Strings.random = function(value,length) {
	if(length == null) length = 1;
	var pos = Math.floor((value.length - length + 1) * Math.random());
	return HxOverrides.substr(value,pos,length);
};
thx_Strings.iterator = function(s) {
	var _this = s.split("");
	return HxOverrides.iter(_this);
};
thx_Strings.map = function(value,callback) {
	return value.split("").map(callback);
};
thx_Strings.remove = function(value,toremove) {
	return StringTools.replace(value,toremove,"");
};
thx_Strings.removeAfter = function(value,toremove) {
	if(StringTools.endsWith(value,toremove)) return value.substring(0,value.length - toremove.length); else return value;
};
thx_Strings.removeBefore = function(value,toremove) {
	if(StringTools.startsWith(value,toremove)) return value.substring(toremove.length); else return value;
};
thx_Strings.repeat = function(s,times) {
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
thx_Strings.reverse = function(s) {
	var arr = s.split("");
	arr.reverse();
	return arr.join("");
};
thx_Strings.stripTags = function(s) {
	return thx_Strings.STRIPTAGS.replace(s,"");
};
thx_Strings.surround = function(s,left,right) {
	return "" + left + s + (null == right?left:right);
};
thx_Strings.toArray = function(s) {
	return s.split("");
};
thx_Strings.toCharcodeArray = function(s) {
	return thx_Strings.map(s,function(s1) {
		return HxOverrides.cca(s1,0);
	});
};
thx_Strings.toChunks = function(s,len) {
	var chunks = [];
	while(s.length > 0) {
		chunks.push(s.substring(0,len));
		s = s.substring(len);
	}
	return chunks;
};
thx_Strings.trimChars = function(value,charlist) {
	return thx_Strings.trimCharsRight(thx_Strings.trimCharsLeft(value,charlist),charlist);
};
thx_Strings.trimCharsLeft = function(value,charlist) {
	var pos = 0;
	var _g1 = 0;
	var _g = value.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(thx_Strings.contains(charlist,value.charAt(i))) pos++; else break;
	}
	return value.substring(pos);
};
thx_Strings.trimCharsRight = function(value,charlist) {
	var len = value.length;
	var pos = len;
	var i;
	var _g = 0;
	while(_g < len) {
		var j = _g++;
		i = len - j - 1;
		if(thx_Strings.contains(charlist,value.charAt(i))) pos = i; else break;
	}
	return value.substring(0,pos);
};
thx_Strings.underscore = function(s) {
	s = new EReg("::","g").replace(s,"/");
	s = new EReg("([A-Z]+)([A-Z][a-z])","g").replace(s,"$1_$2");
	s = new EReg("([a-z\\d])([A-Z])","g").replace(s,"$1_$2");
	s = new EReg("-","g").replace(s,"_");
	return s.toLowerCase();
};
thx_Strings.upTo = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return value; else return value.substring(0,pos);
};
thx_Strings.wrapColumns = function(s,columns,indent,newline) {
	if(newline == null) newline = "\n";
	if(indent == null) indent = "";
	if(columns == null) columns = 78;
	return thx_Strings.SPLIT_LINES.split(s).map(function(part) {
		return thx_Strings.wrapLine(StringTools.trim(thx_Strings.WSG.replace(part," ")),columns,indent,newline);
	}).join(newline);
};
thx_Strings.upperMatch = function(re) {
	return re.matched(0).toUpperCase();
};
thx_Strings.wrapLine = function(s,columns,indent,newline) {
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
var thx_Timer = function() { };
thx_Timer.__name__ = ["thx","Timer"];
thx_Timer.debounce = function(callback,delayms,leading) {
	if(leading == null) leading = false;
	var cancel = thx_Functions.noop;
	var poll = function() {
		cancel();
		cancel = thx_Timer.delay(callback,delayms);
	};
	return function() {
		if(leading) {
			leading = false;
			callback();
		}
		poll();
	};
};
thx_Timer.throttle = function(callback,delayms,leading) {
	if(leading == null) leading = false;
	var waiting = false;
	var poll = function() {
		waiting = true;
		thx_Timer.delay(callback,delayms);
	};
	return function() {
		if(leading) {
			leading = false;
			callback();
			return;
		}
		if(waiting) return;
		poll();
	};
};
thx_Timer.repeat = function(callback,delayms) {
	return (function(f,id) {
		return function() {
			f(id);
		};
	})(thx_Timer.clear,setInterval(callback,delayms));
};
thx_Timer.delay = function(callback,delayms) {
	return (function(f,id) {
		return function() {
			f(id);
		};
	})(thx_Timer.clear,setTimeout(callback,delayms));
};
thx_Timer.frame = function(callback) {
	var cancelled = false;
	var f = thx_Functions.noop;
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
		cancelled = true;
	};
};
thx_Timer.nextFrame = function(callback) {
	var id = requestAnimationFrame(callback);
	return function() {
		cancelAnimationFrame(id);
	};
};
thx_Timer.immediate = function(callback) {
	return (function(f,id) {
		return function() {
			f(id);
		};
	})(thx_Timer.clear,setImmediate(callback));
};
thx_Timer.clear = function(id) {
	clearTimeout(id);
	return;
};
thx_Timer.time = function() {
	return performance.now();
};
var thx__$Tuple_Tuple0_$Impl_$ = {};
thx__$Tuple_Tuple0_$Impl_$.__name__ = ["thx","_Tuple","Tuple0_Impl_"];
thx__$Tuple_Tuple0_$Impl_$._new = function() {
	return thx_Nil.nil;
};
thx__$Tuple_Tuple0_$Impl_$["with"] = function(this1,v) {
	return v;
};
thx__$Tuple_Tuple0_$Impl_$.toString = function(this1) {
	return "Tuple0()";
};
thx__$Tuple_Tuple0_$Impl_$.toNil = function(this1) {
	return this1;
};
thx__$Tuple_Tuple0_$Impl_$.nilToTuple = function(v) {
	return thx_Nil.nil;
};
var thx__$Tuple_Tuple1_$Impl_$ = {};
thx__$Tuple_Tuple1_$Impl_$.__name__ = ["thx","_Tuple","Tuple1_Impl_"];
thx__$Tuple_Tuple1_$Impl_$._new = function(_0) {
	return _0;
};
thx__$Tuple_Tuple1_$Impl_$.get__0 = function(this1) {
	return this1;
};
thx__$Tuple_Tuple1_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1, _1 : v};
};
thx__$Tuple_Tuple1_$Impl_$.toString = function(this1) {
	return "Tuple1(" + Std.string(this1) + ")";
};
thx__$Tuple_Tuple1_$Impl_$.arrayToTuple = function(v) {
	return v[0];
};
var thx__$Tuple_Tuple2_$Impl_$ = {};
thx__$Tuple_Tuple2_$Impl_$.__name__ = ["thx","_Tuple","Tuple2_Impl_"];
thx__$Tuple_Tuple2_$Impl_$._new = function(_0,_1) {
	return { _0 : _0, _1 : _1};
};
thx__$Tuple_Tuple2_$Impl_$.get_left = function(this1) {
	return this1._0;
};
thx__$Tuple_Tuple2_$Impl_$.get_right = function(this1) {
	return this1._1;
};
thx__$Tuple_Tuple2_$Impl_$.flip = function(this1) {
	return { _0 : this1._1, _1 : this1._0};
};
thx__$Tuple_Tuple2_$Impl_$.dropLeft = function(this1) {
	return this1._1;
};
thx__$Tuple_Tuple2_$Impl_$.dropRight = function(this1) {
	return this1._0;
};
thx__$Tuple_Tuple2_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : v};
};
thx__$Tuple_Tuple2_$Impl_$.toString = function(this1) {
	return "Tuple2(" + Std.string(this1._0) + "," + Std.string(this1._1) + ")";
};
thx__$Tuple_Tuple2_$Impl_$.arrayToTuple2 = function(v) {
	return { _0 : v[0], _1 : v[1]};
};
var thx__$Tuple_Tuple3_$Impl_$ = {};
thx__$Tuple_Tuple3_$Impl_$.__name__ = ["thx","_Tuple","Tuple3_Impl_"];
thx__$Tuple_Tuple3_$Impl_$._new = function(_0,_1,_2) {
	return { _0 : _0, _1 : _1, _2 : _2};
};
thx__$Tuple_Tuple3_$Impl_$.flip = function(this1) {
	return { _0 : this1._2, _1 : this1._1, _2 : this1._0};
};
thx__$Tuple_Tuple3_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2};
};
thx__$Tuple_Tuple3_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1};
};
thx__$Tuple_Tuple3_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : v};
};
thx__$Tuple_Tuple3_$Impl_$.toString = function(this1) {
	return "Tuple3(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + ")";
};
thx__$Tuple_Tuple3_$Impl_$.arrayToTuple3 = function(v) {
	return { _0 : v[0], _1 : v[1], _2 : v[2]};
};
var thx__$Tuple_Tuple4_$Impl_$ = {};
thx__$Tuple_Tuple4_$Impl_$.__name__ = ["thx","_Tuple","Tuple4_Impl_"];
thx__$Tuple_Tuple4_$Impl_$._new = function(_0,_1,_2,_3) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
};
thx__$Tuple_Tuple4_$Impl_$.flip = function(this1) {
	return { _0 : this1._3, _1 : this1._2, _2 : this1._1, _3 : this1._0};
};
thx__$Tuple_Tuple4_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3};
};
thx__$Tuple_Tuple4_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2};
};
thx__$Tuple_Tuple4_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : v};
};
thx__$Tuple_Tuple4_$Impl_$.toString = function(this1) {
	return "Tuple4(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + ")";
};
thx__$Tuple_Tuple4_$Impl_$.arrayToTuple4 = function(v) {
	return { _0 : v[0], _1 : v[1], _2 : v[2], _3 : v[3]};
};
var thx__$Tuple_Tuple5_$Impl_$ = {};
thx__$Tuple_Tuple5_$Impl_$.__name__ = ["thx","_Tuple","Tuple5_Impl_"];
thx__$Tuple_Tuple5_$Impl_$._new = function(_0,_1,_2,_3,_4) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4};
};
thx__$Tuple_Tuple5_$Impl_$.flip = function(this1) {
	return { _0 : this1._4, _1 : this1._3, _2 : this1._2, _3 : this1._1, _4 : this1._0};
};
thx__$Tuple_Tuple5_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3, _3 : this1._4};
};
thx__$Tuple_Tuple5_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3};
};
thx__$Tuple_Tuple5_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : this1._4, _5 : v};
};
thx__$Tuple_Tuple5_$Impl_$.toString = function(this1) {
	return "Tuple5(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + "," + Std.string(this1._4) + ")";
};
thx__$Tuple_Tuple5_$Impl_$.arrayToTuple5 = function(v) {
	return { _0 : v[0], _1 : v[1], _2 : v[2], _3 : v[3], _4 : v[4]};
};
var thx__$Tuple_Tuple6_$Impl_$ = {};
thx__$Tuple_Tuple6_$Impl_$.__name__ = ["thx","_Tuple","Tuple6_Impl_"];
thx__$Tuple_Tuple6_$Impl_$._new = function(_0,_1,_2,_3,_4,_5) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4, _5 : _5};
};
thx__$Tuple_Tuple6_$Impl_$.flip = function(this1) {
	return { _0 : this1._5, _1 : this1._4, _2 : this1._3, _3 : this1._2, _4 : this1._1, _5 : this1._0};
};
thx__$Tuple_Tuple6_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3, _3 : this1._4, _4 : this1._5};
};
thx__$Tuple_Tuple6_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : this1._4};
};
thx__$Tuple_Tuple6_$Impl_$.toString = function(this1) {
	return "Tuple6(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + "," + Std.string(this1._4) + "," + Std.string(this1._5) + ")";
};
thx__$Tuple_Tuple6_$Impl_$.arrayToTuple6 = function(v) {
	return { _0 : v[0], _1 : v[1], _2 : v[2], _3 : v[3], _4 : v[4], _5 : v[5]};
};
var thx_color__$CIELCh_CIELCh_$Impl_$ = {};
thx_color__$CIELCh_CIELCh_$Impl_$.__name__ = ["thx","color","_CIELCh","CIELCh_Impl_"];
thx_color__$CIELCh_CIELCh_$Impl_$.create = function(lightness,chroma,hue) {
	var channels = [lightness,chroma,thx_Floats.wrapCircular(hue,360)];
	return channels;
};
thx_color__$CIELCh_CIELCh_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,3);
	return thx_color__$CIELCh_CIELCh_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$CIELCh_CIELCh_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "cielch":
			return thx_color__$CIELCh_CIELCh_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3,false));
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$CIELCh_CIELCh_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$CIELCh_CIELCh_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var _0 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx_color__$CIELCh_CIELCh_$Impl_$.complement = function(this1) {
	return thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,180);
};
thx_color__$CIELCh_CIELCh_$Impl_$.interpolate = function(this1,other,t) {
	var channels = [thx_Floats.interpolate(t,this1[0],other[0]),thx_Floats.interpolate(t,this1[1],other[1]),thx_Floats.interpolateAngle(t,this1[2],other[2],360)];
	return channels;
};
thx_color__$CIELCh_CIELCh_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$CIELCh_CIELCh_$Impl_$.withHue(this1,this1[2] + angle);
};
thx_color__$CIELCh_CIELCh_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 144.0;
	var _0 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx_color__$CIELCh_CIELCh_$Impl_$.square = function(this1) {
	return thx_color__$CIELCh_CIELCh_$Impl_$.tetrad(this1,90);
};
thx_color__$CIELCh_CIELCh_$Impl_$.tetrad = function(this1,angle) {
	var _0 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,0);
	var _1 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,angle);
	var _2 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,180);
	var _3 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,180 + angle);
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
};
thx_color__$CIELCh_CIELCh_$Impl_$.triad = function(this1) {
	var _0 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,-120);
	var _1 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,0);
	var _2 = thx_color__$CIELCh_CIELCh_$Impl_$.rotate(this1,120);
	return { _0 : _0, _1 : _1, _2 : _2};
};
thx_color__$CIELCh_CIELCh_$Impl_$.withLightness = function(this1,newlightness) {
	return [newlightness,this1[1],this1[2]];
};
thx_color__$CIELCh_CIELCh_$Impl_$.withChroma = function(this1,newchroma) {
	return [this1[0],newchroma,this1[2]];
};
thx_color__$CIELCh_CIELCh_$Impl_$.withHue = function(this1,newhue) {
	var channels = [this1[0],this1[1],thx_Floats.wrapCircular(newhue,360)];
	return channels;
};
thx_color__$CIELCh_CIELCh_$Impl_$.equals = function(this1,other) {
	return Math.abs(this1[0] - other[0]) <= 10e-10 && Math.abs(this1[1] - other[1]) <= 10e-10 && Math.abs(this1[2] - other[2]) <= 10e-10;
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
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBXA(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toRGBX(thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$CIELCh_CIELCh_$Impl_$.toRGBX(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toXYZ = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toXYZ(thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1));
};
thx_color__$CIELCh_CIELCh_$Impl_$.toYxy = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toYxy(thx_color__$CIELCh_CIELCh_$Impl_$.toCIELab(this1));
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
	thx_ArrayFloats.resize(arr,3);
	return thx_color__$CIELab_CIELab_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$CIELab_CIELab_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "cielab":
			return thx_color__$CIELab_CIELab_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3,false));
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$CIELab_CIELab_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$CIELab_CIELab_$Impl_$.distance = function(this1,other) {
	return (this1[0] - other[0]) * (this1[0] - other[0]) + (this1[1] - other[1]) * (this1[1] - other[1]) + (this1[2] - other[2]) * (this1[2] - other[2]);
};
thx_color__$CIELab_CIELab_$Impl_$.interpolate = function(this1,other,t) {
	var channels = [thx_Floats.interpolate(t,this1[0],other[0]),thx_Floats.interpolate(t,this1[1],other[1]),thx_Floats.interpolate(t,this1[2],other[2])];
	return channels;
};
thx_color__$CIELab_CIELab_$Impl_$.darker = function(this1,t) {
	var channels = [thx_Floats.interpolate(t,this1[0],0),this1[1],this1[2]];
	return channels;
};
thx_color__$CIELab_CIELab_$Impl_$.lighter = function(this1,t) {
	var channels = [thx_Floats.interpolate(t,this1[0],100),this1[1],this1[2]];
	return channels;
};
thx_color__$CIELab_CIELab_$Impl_$.match = function(this1,palette) {
	var it = palette;
	if(null == it) throw new thx_error_NullArgument("Iterable argument \"this\" cannot be null",{ fileName : "NullArgument.hx", lineNumber : 73, className : "thx.color._CIELab.CIELab_Impl_", methodName : "match"}); else if(!$iterator(it)().hasNext()) throw new thx_error_NullArgument("Iterable argument \"this\" cannot be empty",{ fileName : "NullArgument.hx", lineNumber : 75, className : "thx.color._CIELab.CIELab_Impl_", methodName : "match"});
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
	return Math.abs(this1[0] - other[0]) <= 10e-10 && Math.abs(this1[1] - other[1]) <= 10e-10 && Math.abs(this1[2] - other[2]) <= 10e-10;
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
	var h = thx_Floats.wrapCircular(Math.atan2(this1[2],this1[1]) * 180 / Math.PI,360);
	var c = Math.sqrt(this1[1] * this1[1] + this1[2] * this1[2]);
	return [this1[0],c,h];
};
thx_color__$CIELab_CIELab_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$CIELab_CIELab_$Impl_$.toRGBXA(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toRGBX = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$CIELab_CIELab_$Impl_$.toXYZ(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$CIELab_CIELab_$Impl_$.toRGBX(this1));
};
thx_color__$CIELab_CIELab_$Impl_$.toXYZ = function(this1) {
	var y = (this1[0] + 16) / 116;
	var x = this1[1] / 500 + y;
	var z = y - this1[2] / 200;
	var p;
	p = Math.pow(y,3);
	if(p > 0.008856) y = p; else y = (y - 0.137931034482758619) / 7.787;
	p = Math.pow(x,3);
	if(p > 0.008856) x = p; else x = (x - 0.137931034482758619) / 7.787;
	p = Math.pow(z,3);
	if(p > 0.008856) z = p; else z = (z - 0.137931034482758619) / 7.787;
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
	return [cyan < 0?0:cyan > 1?1:cyan,magenta < 0?0:magenta > 1?1:magenta,yellow < 0?0:yellow > 1?1:yellow];
};
thx_color__$CMY_CMY_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,3);
	return thx_color__$CMY_CMY_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$CMY_CMY_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "cmy":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			return channels;
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$CMY_CMY_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$CMY_CMY_$Impl_$.interpolate = function(this1,other,t) {
	var channels = [thx_Floats.interpolate(t,this1[0],other[0]),thx_Floats.interpolate(t,this1[1],other[1]),thx_Floats.interpolate(t,this1[2],other[2])];
	return channels;
};
thx_color__$CMY_CMY_$Impl_$.withCyan = function(this1,newcyan) {
	return [newcyan < 0?0:newcyan > 1?1:newcyan,this1[1],this1[2]];
};
thx_color__$CMY_CMY_$Impl_$.withMagenta = function(this1,newmagenta) {
	return [this1[0],newmagenta < 0?0:newmagenta > 1?1:newmagenta,this1[2]];
};
thx_color__$CMY_CMY_$Impl_$.withYellow = function(this1,newyellow) {
	return [this1[0],this1[1],newyellow < 0?0:newyellow > 1?1:newyellow];
};
thx_color__$CMY_CMY_$Impl_$.toString = function(this1) {
	return "cmy(" + this1[0] + "," + this1[1] + "," + this1[2] + ")";
};
thx_color__$CMY_CMY_$Impl_$.equals = function(this1,other) {
	return Math.abs(this1[0] - other[0]) <= 10e-10 && Math.abs(this1[1] - other[1]) <= 10e-10 && Math.abs(this1[2] - other[2]) <= 10e-10;
};
thx_color__$CMY_CMY_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toCMYK = function(this1) {
	var k = Math.min(Math.min(this1[0],this1[1]),this1[2]);
	if(k == 1) return [0,0,0,1]; else return [(this1[0] - k) / (1 - k),(this1[1] - k) / (1 - k),(this1[2] - k) / (1 - k),k];
};
thx_color__$CMY_CMY_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$CMY_CMY_$Impl_$.toRGBXA(this1));
};
thx_color__$CMY_CMY_$Impl_$.toRGBX = function(this1) {
	return [1 - this1[0],1 - this1[1],1 - this1[2]];
};
thx_color__$CMY_CMY_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
};
thx_color__$CMY_CMY_$Impl_$.toYxy = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toYxy(thx_color__$CMY_CMY_$Impl_$.toRGBX(this1));
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
	return [cyan < 0?0:cyan > 1?1:cyan,magenta < 0?0:magenta > 1?1:magenta,yellow < 0?0:yellow > 1?1:yellow,black < 0?0:black > 1?1:black];
};
thx_color__$CMYK_CMYK_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,4);
	return thx_color__$CMYK_CMYK_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$CMYK_CMYK_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "cmyk":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,4);
			return channels;
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$CMYK_CMYK_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$CMYK_CMYK_$Impl_$.darker = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx_Floats.interpolate(t,this1[3],1)];
	return channels;
};
thx_color__$CMYK_CMYK_$Impl_$.lighter = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx_Floats.interpolate(t,this1[3],0)];
	return channels;
};
thx_color__$CMYK_CMYK_$Impl_$.interpolate = function(this1,other,t) {
	var channels = [thx_Floats.interpolate(t,this1[0],other[0]),thx_Floats.interpolate(t,this1[1],other[1]),thx_Floats.interpolate(t,this1[2],other[2]),thx_Floats.interpolate(t,this1[3],other[3])];
	return channels;
};
thx_color__$CMYK_CMYK_$Impl_$.withCyan = function(this1,newcyan) {
	return [newcyan < 0?0:newcyan > 1?1:newcyan,this1[1],this1[2],this1[3]];
};
thx_color__$CMYK_CMYK_$Impl_$.withMagenta = function(this1,newmagenta) {
	return [this1[0],newmagenta < 0?0:newmagenta > 1?1:newmagenta,this1[2],this1[3]];
};
thx_color__$CMYK_CMYK_$Impl_$.withYellow = function(this1,newyellow) {
	return [this1[0],this1[1],newyellow < 0?0:newyellow > 1?1:newyellow,this1[3]];
};
thx_color__$CMYK_CMYK_$Impl_$.withBlack = function(this1,newblack) {
	return [this1[0],this1[1],this1[2],newblack < 0?0:newblack > 1?1:newblack];
};
thx_color__$CMYK_CMYK_$Impl_$.toString = function(this1) {
	return "cmyk(" + this1[0] + "," + this1[1] + "," + this1[2] + "," + this1[3] + ")";
};
thx_color__$CMYK_CMYK_$Impl_$.equals = function(this1,other) {
	return Math.abs(this1[0] - other[0]) <= 10e-10 && Math.abs(this1[1] - other[1]) <= 10e-10 && Math.abs(this1[2] - other[2]) <= 10e-10 && Math.abs(this1[3] - other[3]) <= 10e-10;
};
thx_color__$CMYK_CMYK_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toCMY = function(this1) {
	return [this1[3] + (1 - this1[3]) * this1[0],this1[3] + (1 - this1[3]) * this1[1],this1[3] + (1 - this1[3]) * this1[2]];
};
thx_color__$CMYK_CMYK_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$CMYK_CMYK_$Impl_$.toRGBXA(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toRGBX = function(this1) {
	return [(1 - this1[3]) * (1 - this1[0]),(1 - this1[3]) * (1 - this1[1]),(1 - this1[3]) * (1 - this1[2])];
};
thx_color__$CMYK_CMYK_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
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
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
thx_color__$CMYK_CMYK_$Impl_$.toYxy = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toYxy(thx_color__$CMYK_CMYK_$Impl_$.toRGBX(this1));
};
var thx_color_Color = function() { };
thx_color_Color.__name__ = ["thx","color","Color"];
thx_color_Color.parse = function(color) {
	if(thx_color_Color.names.exists(color)) return thx_color__$RGB_RGB_$Impl_$.toRGBXA(thx_color_Color.names.get(color));
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "cielab":
			return thx_color__$CIELab_CIELab_$Impl_$.toRGBXA(thx_color__$CIELab_CIELab_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3,false)));
			break;
		case "cielch":
			return thx_color__$CIELCh_CIELCh_$Impl_$.toRGBXA(thx_color__$CIELCh_CIELCh_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3,false)));
			break;
		case "cmy":
			return thx_color__$CMY_CMY_$Impl_$.toRGBXA(thx_color__$CMY_CMY_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3)));
			break;
		case "cmyk":
			return thx_color__$CMYK_CMYK_$Impl_$.toRGBXA(thx_color__$CMYK_CMYK_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,4)));
			break;
		case "grey":case "gray":
			return thx_color__$Grey_Grey_$Impl_$.toRGBXA(thx_color__$Grey_Grey_$Impl_$.create(thx_color_parse_ColorParser.getFloatChannels(info.channels,1)[0]));
			break;
		case "hsl":
			return thx_color__$HSL_HSL_$Impl_$.toRGBXA(thx_color__$HSL_HSL_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3)));
			break;
		case "hsla":
			return thx_color__$HSLA_HSLA_$Impl_$.toRGBXA(thx_color__$HSLA_HSLA_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,4)));
			break;
		case "hsv":
			return thx_color__$HSV_HSV_$Impl_$.toRGBXA(thx_color__$HSV_HSV_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3)));
			break;
		case "hsva":
			return thx_color__$HSVA_HSVA_$Impl_$.toRGBXA(thx_color__$HSVA_HSVA_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,4)));
			break;
		case "rgb":
			return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$RGBX_RGBX_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3)));
			break;
		case "rgba":
			return thx_color__$RGBXA_RGBXA_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,4));
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
var thx_color__$Grey_Grey_$Impl_$ = {};
thx_color__$Grey_Grey_$Impl_$.__name__ = ["thx","color","_Grey","Grey_Impl_"];
thx_color__$Grey_Grey_$Impl_$.create = function(v) {
	return v < 0?0:v > 1?1:v;
};
thx_color__$Grey_Grey_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "grey":case "gray":
			var grey = thx_color_parse_ColorParser.getFloatChannels(info.channels,1)[0];
			return grey;
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$Grey_Grey_$Impl_$._new = function(grey) {
	return grey;
};
thx_color__$Grey_Grey_$Impl_$.contrast = function(this1) {
	if(this1 > 0.5) return thx_color__$Grey_Grey_$Impl_$.black; else return thx_color__$Grey_Grey_$Impl_$.white;
};
thx_color__$Grey_Grey_$Impl_$.darker = function(this1,t) {
	var grey = thx_Floats.interpolate(t,this1,0);
	return grey;
};
thx_color__$Grey_Grey_$Impl_$.lighter = function(this1,t) {
	var grey = thx_Floats.interpolate(t,this1,1);
	return grey;
};
thx_color__$Grey_Grey_$Impl_$.interpolate = function(this1,other,t) {
	var grey = thx_Floats.interpolate(t,this1,other);
	return grey;
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
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$Grey_Grey_$Impl_$.toRGBXA(this1));
};
thx_color__$Grey_Grey_$Impl_$.toRGBX = function(this1) {
	return [this1,this1,this1];
};
thx_color__$Grey_Grey_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
thx_color__$Grey_Grey_$Impl_$.toYxy = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toYxy(thx_color__$Grey_Grey_$Impl_$.toRGBX(this1));
};
var thx_color__$HSL_HSL_$Impl_$ = {};
thx_color__$HSL_HSL_$Impl_$.__name__ = ["thx","color","_HSL","HSL_Impl_"];
thx_color__$HSL_HSL_$Impl_$.create = function(hue,saturation,lightness) {
	var channels = [thx_Floats.wrapCircular(hue,360),saturation < 0?0:saturation > 1?1:saturation,lightness < 0?0:lightness > 1?1:lightness];
	return channels;
};
thx_color__$HSL_HSL_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,3);
	return thx_color__$HSL_HSL_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$HSL_HSL_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsl":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			return channels;
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$HSL_HSL_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$HSL_HSL_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var _0 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx_color__$HSL_HSL_$Impl_$.complement = function(this1) {
	return thx_color__$HSL_HSL_$Impl_$.rotate(this1,180);
};
thx_color__$HSL_HSL_$Impl_$.darker = function(this1,t) {
	var channels = [this1[0],this1[1],thx_Floats.interpolate(t,this1[2],0)];
	return channels;
};
thx_color__$HSL_HSL_$Impl_$.lighter = function(this1,t) {
	var channels = [this1[0],this1[1],thx_Floats.interpolate(t,this1[2],1)];
	return channels;
};
thx_color__$HSL_HSL_$Impl_$.interpolate = function(this1,other,t) {
	var channels = [thx_Floats.interpolateAngle(t,this1[0],other[0],360),thx_Floats.interpolate(t,this1[1],other[1]),thx_Floats.interpolate(t,this1[2],other[2])];
	return channels;
};
thx_color__$HSL_HSL_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$HSL_HSL_$Impl_$.withHue(this1,this1[0] + angle);
};
thx_color__$HSL_HSL_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 144.0;
	var _0 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx_color__$HSL_HSL_$Impl_$.square = function(this1) {
	return thx_color__$HSL_HSL_$Impl_$.tetrad(this1,90);
};
thx_color__$HSL_HSL_$Impl_$.tetrad = function(this1,angle) {
	var _0 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,0);
	var _1 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,angle);
	var _2 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,180);
	var _3 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,180 + angle);
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
};
thx_color__$HSL_HSL_$Impl_$.triad = function(this1) {
	var _0 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,-120);
	var _1 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,0);
	var _2 = thx_color__$HSL_HSL_$Impl_$.rotate(this1,120);
	return { _0 : _0, _1 : _1, _2 : _2};
};
thx_color__$HSL_HSL_$Impl_$.withAlpha = function(this1,alpha) {
	var channels = this1.concat([alpha < 0?0:alpha > 1?1:alpha]);
	return channels;
};
thx_color__$HSL_HSL_$Impl_$.withHue = function(this1,newhue) {
	var channels = [thx_Floats.wrapCircular(newhue,360),this1[1],this1[2]];
	return channels;
};
thx_color__$HSL_HSL_$Impl_$.withLightness = function(this1,newlightness) {
	return [this1[0],this1[1],newlightness < 0?0:newlightness > 1?1:newlightness];
};
thx_color__$HSL_HSL_$Impl_$.withSaturation = function(this1,newsaturation) {
	return [this1[0],newsaturation < 0?0:newsaturation > 1?1:newsaturation,this1[2]];
};
thx_color__$HSL_HSL_$Impl_$.toCSS3 = function(this1) {
	return thx_color__$HSL_HSL_$Impl_$.toString(this1);
};
thx_color__$HSL_HSL_$Impl_$.toString = function(this1) {
	return "hsl(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx_color__$HSL_HSL_$Impl_$.equals = function(this1,other) {
	return Math.abs(this1[0] - other[0]) <= 10e-10 && Math.abs(this1[1] - other[1]) <= 10e-10 && Math.abs(this1[2] - other[2]) <= 10e-10;
};
thx_color__$HSL_HSL_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$HSL_HSL_$Impl_$.toRGBXA(this1));
};
thx_color__$HSL_HSL_$Impl_$.toRGBX = function(this1) {
	var channels = [thx_color__$HSL_HSL_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSL_HSL_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	return channels;
};
thx_color__$HSL_HSL_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toHSLA = function(this1) {
	return thx_color__$HSL_HSL_$Impl_$.withAlpha(this1,1.0);
};
thx_color__$HSL_HSL_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.toYxy = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toYxy(thx_color__$HSL_HSL_$Impl_$.toRGBX(this1));
};
thx_color__$HSL_HSL_$Impl_$.get_hue = function(this1) {
	return this1[0];
};
thx_color__$HSL_HSL_$Impl_$.get_saturation = function(this1) {
	return this1[1];
};
thx_color__$HSL_HSL_$Impl_$.get_lightness = function(this1) {
	return this1[2];
};
thx_color__$HSL_HSL_$Impl_$._c = function(d,s,l) {
	var m2;
	if(l <= 0.5) m2 = l * (1 + s); else m2 = l + s - l * s;
	var m1 = 2 * l - m2;
	d = thx_Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
};
var thx_color__$HSLA_HSLA_$Impl_$ = {};
thx_color__$HSLA_HSLA_$Impl_$.__name__ = ["thx","color","_HSLA","HSLA_Impl_"];
thx_color__$HSLA_HSLA_$Impl_$.create = function(hue,saturation,lightness,alpha) {
	var channels = [thx_Floats.wrapCircular(hue,360),saturation < 0?0:saturation > 1?1:saturation,lightness < 0?0:lightness > 1?1:lightness,alpha < 0?0:alpha > 1?1:alpha];
	return channels;
};
thx_color__$HSLA_HSLA_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,4);
	return thx_color__$HSLA_HSLA_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$HSLA_HSLA_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsl":
			return thx_color__$HSL_HSL_$Impl_$.toHSLA((function($this) {
				var $r;
				var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
				$r = channels;
				return $r;
			}(this)));
		case "hsla":
			var channels1 = thx_color_parse_ColorParser.getFloatChannels(info.channels,4);
			return channels1;
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$HSLA_HSLA_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$HSLA_HSLA_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var _0 = thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx_color__$HSLA_HSLA_$Impl_$.complement = function(this1) {
	return thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,180);
};
thx_color__$HSLA_HSLA_$Impl_$.darker = function(this1,t) {
	var channels = [this1[0],this1[1],thx_Floats.interpolate(t,this1[2],0),this1[3]];
	return channels;
};
thx_color__$HSLA_HSLA_$Impl_$.lighter = function(this1,t) {
	var channels = [this1[0],this1[1],thx_Floats.interpolate(t,this1[2],1),this1[3]];
	return channels;
};
thx_color__$HSLA_HSLA_$Impl_$.transparent = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx_Floats.interpolate(t,this1[3],0)];
	return channels;
};
thx_color__$HSLA_HSLA_$Impl_$.opaque = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx_Floats.interpolate(t,this1[3],1)];
	return channels;
};
thx_color__$HSLA_HSLA_$Impl_$.interpolate = function(this1,other,t) {
	var channels = [thx_Floats.interpolateAngle(t,this1[0],other[0]),thx_Floats.interpolate(t,this1[1],other[1]),thx_Floats.interpolate(t,this1[2],other[2]),thx_Floats.interpolate(t,this1[3],other[3])];
	return channels;
};
thx_color__$HSLA_HSLA_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$HSLA_HSLA_$Impl_$.create(this1[0] + angle,this1[1],this1[2],this1[3]);
};
thx_color__$HSLA_HSLA_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 150.0;
	var _0 = thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSLA_HSLA_$Impl_$.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx_color__$HSLA_HSLA_$Impl_$.withAlpha = function(this1,newalpha) {
	return [this1[0],this1[1],this1[2],newalpha < 0?0:newalpha > 1?1:newalpha];
};
thx_color__$HSLA_HSLA_$Impl_$.withHue = function(this1,newhue) {
	var channels = [thx_Floats.wrapCircular(newhue,360),this1[1],this1[2],this1[3]];
	return channels;
};
thx_color__$HSLA_HSLA_$Impl_$.withLightness = function(this1,newlightness) {
	return [this1[0],this1[1],newlightness < 0?0:newlightness > 1?1:newlightness,this1[3]];
};
thx_color__$HSLA_HSLA_$Impl_$.withSaturation = function(this1,newsaturation) {
	return [this1[0],newsaturation < 0?0:newsaturation > 1?1:newsaturation,this1[2],this1[3]];
};
thx_color__$HSLA_HSLA_$Impl_$.toCSS3 = function(this1) {
	return thx_color__$HSLA_HSLA_$Impl_$.toString(this1);
};
thx_color__$HSLA_HSLA_$Impl_$.toString = function(this1) {
	return "hsla(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx_color__$HSLA_HSLA_$Impl_$.equals = function(this1,other) {
	return Math.abs(this1[0] - other[0]) <= 10e-10 && Math.abs(this1[1] - other[1]) <= 10e-10 && Math.abs(this1[2] - other[2]) <= 10e-10 && Math.abs(this1[3] - other[3]) <= 10e-10;
};
thx_color__$HSLA_HSLA_$Impl_$.toHSL = function(this1) {
	var channels = this1.slice(0,3);
	return channels;
};
thx_color__$HSLA_HSLA_$Impl_$.toHSVA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toHSVA(thx_color__$HSLA_HSLA_$Impl_$.toRGBXA(this1));
};
thx_color__$HSLA_HSLA_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGB(thx_color__$HSLA_HSLA_$Impl_$.toRGBXA(this1));
};
thx_color__$HSLA_HSLA_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$HSLA_HSLA_$Impl_$.toRGBXA(this1));
};
thx_color__$HSLA_HSLA_$Impl_$.toRGBXA = function(this1) {
	var channels = [thx_color__$HSLA_HSLA_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$HSLA_HSLA_$Impl_$._c(this1[0] - 120,this1[1],this1[2]),this1[3]];
	return channels;
};
thx_color__$HSLA_HSLA_$Impl_$.get_hue = function(this1) {
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
	var m2;
	if(l <= 0.5) m2 = l * (1 + s); else m2 = l + s - l * s;
	var m1 = 2 * l - m2;
	d = thx_Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
};
var thx_color__$HSV_HSV_$Impl_$ = {};
thx_color__$HSV_HSV_$Impl_$.__name__ = ["thx","color","_HSV","HSV_Impl_"];
thx_color__$HSV_HSV_$Impl_$.create = function(hue,saturation,lightness) {
	var channels = [thx_Floats.wrapCircular(hue,360),saturation < 0?0:saturation > 1?1:saturation,lightness < 0?0:lightness > 1?1:lightness];
	return channels;
};
thx_color__$HSV_HSV_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,3);
	return thx_color__$HSV_HSV_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$HSV_HSV_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsv":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			return channels;
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$HSV_HSV_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$HSV_HSV_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var _0 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx_color__$HSV_HSV_$Impl_$.complement = function(this1) {
	return thx_color__$HSV_HSV_$Impl_$.rotate(this1,180);
};
thx_color__$HSV_HSV_$Impl_$.interpolate = function(this1,other,t) {
	var channels = [thx_Floats.interpolateAngle(t,this1[0],other[0]),thx_Floats.interpolate(t,this1[1],other[1]),thx_Floats.interpolate(t,this1[2],other[2])];
	return channels;
};
thx_color__$HSV_HSV_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$HSV_HSV_$Impl_$.withHue(this1,this1[0] + angle);
};
thx_color__$HSV_HSV_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 144.0;
	var _0 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx_color__$HSV_HSV_$Impl_$.square = function(this1) {
	return thx_color__$HSV_HSV_$Impl_$.tetrad(this1,90);
};
thx_color__$HSV_HSV_$Impl_$.tetrad = function(this1,angle) {
	var _0 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,0);
	var _1 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,angle);
	var _2 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,180);
	var _3 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,180 + angle);
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
};
thx_color__$HSV_HSV_$Impl_$.triad = function(this1) {
	var _0 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,-120);
	var _1 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,0);
	var _2 = thx_color__$HSV_HSV_$Impl_$.rotate(this1,120);
	return { _0 : _0, _1 : _1, _2 : _2};
};
thx_color__$HSV_HSV_$Impl_$.withAlpha = function(this1,alpha) {
	var channels = this1.concat([alpha < 0?0:alpha > 1?1:alpha]);
	return channels;
};
thx_color__$HSV_HSV_$Impl_$.withHue = function(this1,newhue) {
	var channels = [thx_Floats.wrapCircular(newhue,360),this1[1],this1[2]];
	return channels;
};
thx_color__$HSV_HSV_$Impl_$.withValue = function(this1,newvalue) {
	return [this1[0],this1[1],newvalue < 0?0:newvalue > 1?1:newvalue];
};
thx_color__$HSV_HSV_$Impl_$.withSaturation = function(this1,newsaturation) {
	return [this1[0],newsaturation < 0?0:newsaturation > 1?1:newsaturation,this1[2]];
};
thx_color__$HSV_HSV_$Impl_$.toString = function(this1) {
	return "hsv(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx_color__$HSV_HSV_$Impl_$.equals = function(this1,other) {
	return Math.abs(this1[0] - other[0]) <= 10e-10 && Math.abs(this1[1] - other[1]) <= 10e-10 && Math.abs(this1[2] - other[2]) <= 10e-10;
};
thx_color__$HSV_HSV_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toHSVA = function(this1) {
	return thx_color__$HSV_HSV_$Impl_$.withAlpha(this1,1.0);
};
thx_color__$HSV_HSV_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$HSV_HSV_$Impl_$.toRGBXA(this1));
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
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.toYxy = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toYxy(thx_color__$HSV_HSV_$Impl_$.toRGBX(this1));
};
thx_color__$HSV_HSV_$Impl_$.get_hue = function(this1) {
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
	var channels = [thx_Floats.wrapCircular(hue,360),saturation < 0?0:saturation > 1?1:saturation,value < 0?0:value > 1?1:value,alpha < 0?0:alpha > 1?1:alpha];
	return channels;
};
thx_color__$HSVA_HSVA_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,4);
	return thx_color__$HSVA_HSVA_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$HSVA_HSVA_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "hsv":
			return thx_color__$HSV_HSV_$Impl_$.toHSVA((function($this) {
				var $r;
				var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
				$r = channels;
				return $r;
			}(this)));
		case "hsva":
			var channels1 = thx_color_parse_ColorParser.getFloatChannels(info.channels,4);
			return channels1;
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$HSVA_HSVA_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$HSVA_HSVA_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var _0 = thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx_color__$HSVA_HSVA_$Impl_$.complement = function(this1) {
	return thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,180);
};
thx_color__$HSVA_HSVA_$Impl_$.transparent = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx_Floats.interpolate(t,this1[3],0)];
	return channels;
};
thx_color__$HSVA_HSVA_$Impl_$.opaque = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx_Floats.interpolate(t,this1[3],1)];
	return channels;
};
thx_color__$HSVA_HSVA_$Impl_$.interpolate = function(this1,other,t) {
	var channels = [thx_Floats.interpolateAngle(t,this1[0],other[0]),thx_Floats.interpolate(t,this1[1],other[1]),thx_Floats.interpolate(t,this1[2],other[2]),thx_Floats.interpolate(t,this1[3],other[3])];
	return channels;
};
thx_color__$HSVA_HSVA_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$HSVA_HSVA_$Impl_$.create(this1[0] + angle,this1[1],this1[2],this1[3]);
};
thx_color__$HSVA_HSVA_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 150.0;
	var _0 = thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$HSVA_HSVA_$Impl_$.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx_color__$HSVA_HSVA_$Impl_$.withAlpha = function(this1,newalpha) {
	return [this1[0],this1[1],this1[2],newalpha < 0?0:newalpha > 1?1:newalpha];
};
thx_color__$HSVA_HSVA_$Impl_$.withHue = function(this1,newhue) {
	var channels = [thx_Floats.wrapCircular(newhue,360),this1[1],this1[2],this1[3]];
	return channels;
};
thx_color__$HSVA_HSVA_$Impl_$.withLightness = function(this1,newvalue) {
	return [this1[0],this1[1],newvalue < 0?0:newvalue > 1?1:newvalue,this1[3]];
};
thx_color__$HSVA_HSVA_$Impl_$.withSaturation = function(this1,newsaturation) {
	return [this1[0],newsaturation < 0?0:newsaturation > 1?1:newsaturation,this1[2],this1[3]];
};
thx_color__$HSVA_HSVA_$Impl_$.toString = function(this1) {
	return "hsva(" + this1[0] + "," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx_color__$HSVA_HSVA_$Impl_$.equals = function(this1,other) {
	return Math.abs(this1[0] - other[0]) <= 10e-10 && Math.abs(this1[1] - other[1]) <= 10e-10 && Math.abs(this1[2] - other[2]) <= 10e-10 && Math.abs(this1[3] - other[3]) <= 10e-10;
};
thx_color__$HSVA_HSVA_$Impl_$.toHSV = function(this1) {
	var channels = this1.slice(0,3);
	return channels;
};
thx_color__$HSVA_HSVA_$Impl_$.toHSLA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toHSLA(thx_color__$HSVA_HSVA_$Impl_$.toRGBXA(this1));
};
thx_color__$HSVA_HSVA_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGB(thx_color__$HSVA_HSVA_$Impl_$.toRGBXA(this1));
};
thx_color__$HSVA_HSVA_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$HSVA_HSVA_$Impl_$.toRGBXA(this1));
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
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			return thx_color__$RGB_RGB_$Impl_$.fromInts(thx_color_parse_ColorParser.getInt8Channels(info.channels,3));
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$RGB_RGB_$Impl_$.fromInts = function(arr) {
	thx_ArrayInts.resize(arr,3);
	return thx_color__$RGB_RGB_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$RGB_RGB_$Impl_$._new = function(rgb) {
	return rgb;
};
thx_color__$RGB_RGB_$Impl_$.darker = function(this1,t) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$RGBX_RGBX_$Impl_$.darker(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1),t));
};
thx_color__$RGB_RGB_$Impl_$.lighter = function(this1,t) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$RGBX_RGBX_$Impl_$.lighter(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1),t));
};
thx_color__$RGB_RGB_$Impl_$.interpolate = function(this1,other,t) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$RGBX_RGBX_$Impl_$.interpolate(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1),thx_color__$RGB_RGB_$Impl_$.toRGBX(other),t));
};
thx_color__$RGB_RGB_$Impl_$.withAlpha = function(this1,alpha) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([thx_color__$RGB_RGB_$Impl_$.get_red(this1),thx_color__$RGB_RGB_$Impl_$.get_green(this1),thx_color__$RGB_RGB_$Impl_$.get_blue(this1),alpha]);
};
thx_color__$RGB_RGB_$Impl_$.withRed = function(this1,newred) {
	return thx_color__$RGB_RGB_$Impl_$.fromInts([newred,thx_color__$RGB_RGB_$Impl_$.get_green(this1),thx_color__$RGB_RGB_$Impl_$.get_blue(this1)]);
};
thx_color__$RGB_RGB_$Impl_$.withGreen = function(this1,newgreen) {
	return thx_color__$RGB_RGB_$Impl_$.fromInts([thx_color__$RGB_RGB_$Impl_$.get_red(this1),newgreen,thx_color__$RGB_RGB_$Impl_$.get_blue(this1)]);
};
thx_color__$RGB_RGB_$Impl_$.withBlue = function(this1,newblue) {
	return thx_color__$RGB_RGB_$Impl_$.fromInts([thx_color__$RGB_RGB_$Impl_$.get_red(this1),thx_color__$RGB_RGB_$Impl_$.get_green(this1),newblue]);
};
thx_color__$RGB_RGB_$Impl_$.toCSS3 = function(this1) {
	return "rgb(" + thx_color__$RGB_RGB_$Impl_$.get_red(this1) + "," + thx_color__$RGB_RGB_$Impl_$.get_green(this1) + "," + thx_color__$RGB_RGB_$Impl_$.get_blue(this1) + ")";
};
thx_color__$RGB_RGB_$Impl_$.toString = function(this1) {
	return thx_color__$RGB_RGB_$Impl_$.toHex(this1);
};
thx_color__$RGB_RGB_$Impl_$.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(thx_color__$RGB_RGB_$Impl_$.get_red(this1),2) + StringTools.hex(thx_color__$RGB_RGB_$Impl_$.get_green(this1),2) + StringTools.hex(thx_color__$RGB_RGB_$Impl_$.get_blue(this1),2);
};
thx_color__$RGB_RGB_$Impl_$.equals = function(this1,other) {
	return thx_color__$RGB_RGB_$Impl_$.get_red(this1) == thx_color__$RGB_RGB_$Impl_$.get_red(other) && thx_color__$RGB_RGB_$Impl_$.get_green(this1) == thx_color__$RGB_RGB_$Impl_$.get_green(other) && thx_color__$RGB_RGB_$Impl_$.get_blue(this1) == thx_color__$RGB_RGB_$Impl_$.get_blue(other);
};
thx_color__$RGB_RGB_$Impl_$.toCIELab = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELab(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCIELCh(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toRGBX = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.fromInts([thx_color__$RGB_RGB_$Impl_$.get_red(this1),thx_color__$RGB_RGB_$Impl_$.get_green(this1),thx_color__$RGB_RGB_$Impl_$.get_blue(this1)]);
};
thx_color__$RGB_RGB_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGB_RGB_$Impl_$.withAlpha(this1,255);
};
thx_color__$RGB_RGB_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(thx_color__$RGB_RGB_$Impl_$.toRGBA(this1));
};
thx_color__$RGB_RGB_$Impl_$.toYxy = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toYxy(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
};
thx_color__$RGB_RGB_$Impl_$.toXYZ = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toXYZ(thx_color__$RGB_RGB_$Impl_$.toRGBX(this1));
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
	return (red & 255) << 24 | (green & 255) << 16 | (blue & 255) << 8 | alpha & 255;
};
thx_color__$RGBA_RGBA_$Impl_$.fromFloats = function(arr) {
	var ints = thx_ArrayFloats.resize(arr,4).map(function(_) {
		return Math.round(_ * 255);
	});
	return thx_color__$RGBA_RGBA_$Impl_$.create(ints[0],ints[1],ints[2],ints[3]);
};
thx_color__$RGBA_RGBA_$Impl_$.fromInt = function(rgba) {
	return rgba;
};
thx_color__$RGBA_RGBA_$Impl_$.fromInts = function(arr) {
	thx_ArrayInts.resize(arr,4);
	return thx_color__$RGBA_RGBA_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$RGBA_RGBA_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			return thx_color__$RGB_RGB_$Impl_$.toRGBA(thx_color__$RGB_RGB_$Impl_$.fromInts(thx_color_parse_ColorParser.getInt8Channels(info.channels,3)));
		case "rgba":
			return thx_color__$RGBA_RGBA_$Impl_$.create(thx_color_parse_ColorParser.getInt8Channel(info.channels[0]),thx_color_parse_ColorParser.getInt8Channel(info.channels[1]),thx_color_parse_ColorParser.getInt8Channel(info.channels[2]),Math.round(thx_color_parse_ColorParser.getFloatChannel(info.channels[3]) * 255));
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$RGBA_RGBA_$Impl_$._new = function(rgba) {
	return rgba;
};
thx_color__$RGBA_RGBA_$Impl_$.darker = function(this1,t) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$RGBXA_RGBXA_$Impl_$.darker(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),t));
};
thx_color__$RGBA_RGBA_$Impl_$.lighter = function(this1,t) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$RGBXA_RGBXA_$Impl_$.lighter(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),t));
};
thx_color__$RGBA_RGBA_$Impl_$.transparent = function(this1,t) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$RGBXA_RGBXA_$Impl_$.transparent(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),t));
};
thx_color__$RGBA_RGBA_$Impl_$.opaque = function(this1,t) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$RGBXA_RGBXA_$Impl_$.opaque(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),t));
};
thx_color__$RGBA_RGBA_$Impl_$.interpolate = function(this1,other,t) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$RGBXA_RGBXA_$Impl_$.interpolate(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1),thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(other),t));
};
thx_color__$RGBA_RGBA_$Impl_$.withAlpha = function(this1,newalpha) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 24 & 255,this1 >> 16 & 255,this1 >> 8 & 255,newalpha]);
};
thx_color__$RGBA_RGBA_$Impl_$.withRed = function(this1,newred) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([newred,this1 >> 16 & 255,this1 >> 8 & 255]);
};
thx_color__$RGBA_RGBA_$Impl_$.withGreen = function(this1,newgreen) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 24 & 255,newgreen,this1 >> 8 & 255]);
};
thx_color__$RGBA_RGBA_$Impl_$.withBlue = function(this1,newblue) {
	return thx_color__$RGBA_RGBA_$Impl_$.fromInts([this1 >> 24 & 255,this1 >> 16 & 255,newblue]);
};
thx_color__$RGBA_RGBA_$Impl_$.toHSLA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toHSLA(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1));
};
thx_color__$RGBA_RGBA_$Impl_$.toHSVA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toHSVA(thx_color__$RGBA_RGBA_$Impl_$.toRGBXA(this1));
};
thx_color__$RGBA_RGBA_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGB_RGB_$Impl_$.create(this1 >> 24 & 255,this1 >> 16 & 255,this1 >> 8 & 255);
};
thx_color__$RGBA_RGBA_$Impl_$.toRGBX = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.fromInts([this1 >> 24 & 255,this1 >> 16 & 255,this1 >> 8 & 255]);
};
thx_color__$RGBA_RGBA_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.fromInts([this1 >> 24 & 255,this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]);
};
thx_color__$RGBA_RGBA_$Impl_$.toCSS3 = function(this1) {
	return thx_color__$RGBA_RGBA_$Impl_$.toString(this1);
};
thx_color__$RGBA_RGBA_$Impl_$.toString = function(this1) {
	return "rgba(" + (this1 >> 24 & 255) + "," + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) / 255 + ")";
};
thx_color__$RGBA_RGBA_$Impl_$.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(this1 & 255,2) + StringTools.hex(this1 >> 24 & 255,2) + StringTools.hex(this1 >> 16 & 255,2) + StringTools.hex(this1 >> 8 & 255,2);
};
thx_color__$RGBA_RGBA_$Impl_$.equals = function(this1,other) {
	return (this1 >> 24 & 255) == (other >> 24 & 255) && (this1 & 255) == (other & 255) && (this1 >> 16 & 255) == (other >> 16 & 255) && (this1 >> 8 & 255) == (other >> 8 & 255);
};
thx_color__$RGBA_RGBA_$Impl_$.get_alpha = function(this1) {
	return this1 & 255;
};
thx_color__$RGBA_RGBA_$Impl_$.get_red = function(this1) {
	return this1 >> 24 & 255;
};
thx_color__$RGBA_RGBA_$Impl_$.get_green = function(this1) {
	return this1 >> 16 & 255;
};
thx_color__$RGBA_RGBA_$Impl_$.get_blue = function(this1) {
	return this1 >> 8 & 255;
};
var thx_color__$RGBX_RGBX_$Impl_$ = {};
thx_color__$RGBX_RGBX_$Impl_$.__name__ = ["thx","color","_RGBX","RGBX_Impl_"];
thx_color__$RGBX_RGBX_$Impl_$.create = function(red,green,blue) {
	return [red < 0?0:red > 1?1:red,green < 0?0:green > 1?1:green,blue < 0?0:blue > 1?1:blue];
};
thx_color__$RGBX_RGBX_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,3);
	return thx_color__$RGBX_RGBX_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$RGBX_RGBX_$Impl_$.fromInts = function(arr) {
	thx_ArrayInts.resize(arr,3);
	return thx_color__$RGBX_RGBX_$Impl_$.create(arr[0] / 255,arr[1] / 255,arr[2] / 255);
};
thx_color__$RGBX_RGBX_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			return thx_color__$RGBX_RGBX_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3));
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$RGBX_RGBX_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$RGBX_RGBX_$Impl_$.darker = function(this1,t) {
	var channels = [thx_Floats.interpolate(t,this1[0],0),thx_Floats.interpolate(t,this1[1],0),thx_Floats.interpolate(t,this1[2],0)];
	return channels;
};
thx_color__$RGBX_RGBX_$Impl_$.lighter = function(this1,t) {
	var channels = [thx_Floats.interpolate(t,this1[0],1),thx_Floats.interpolate(t,this1[1],1),thx_Floats.interpolate(t,this1[2],1)];
	return channels;
};
thx_color__$RGBX_RGBX_$Impl_$.interpolate = function(this1,other,t) {
	var channels = [thx_Floats.interpolate(t,this1[0],other[0]),thx_Floats.interpolate(t,this1[1],other[1]),thx_Floats.interpolate(t,this1[2],other[2])];
	return channels;
};
thx_color__$RGBX_RGBX_$Impl_$.toCSS3 = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toString(this1);
};
thx_color__$RGBX_RGBX_$Impl_$.toString = function(this1) {
	return "rgb(" + this1[0] * 100 + "%," + this1[1] * 100 + "%," + this1[2] * 100 + "%)";
};
thx_color__$RGBX_RGBX_$Impl_$.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(thx_color__$RGBX_RGBX_$Impl_$.get_red(this1),2) + StringTools.hex(thx_color__$RGBX_RGBX_$Impl_$.get_green(this1),2) + StringTools.hex(thx_color__$RGBX_RGBX_$Impl_$.get_blue(this1),2);
};
thx_color__$RGBX_RGBX_$Impl_$.equals = function(this1,other) {
	return Math.abs(this1[0] - other[0]) <= 10e-10 && Math.abs(this1[1] - other[1]) <= 10e-10 && Math.abs(this1[2] - other[2]) <= 10e-10;
};
thx_color__$RGBX_RGBX_$Impl_$.withAlpha = function(this1,alpha) {
	var channels = this1.concat([alpha < 0?0:alpha > 1?1:alpha]);
	return channels;
};
thx_color__$RGBX_RGBX_$Impl_$.withRed = function(this1,newred) {
	var channels = [newred < 0?0:newred > 1?1:newred,thx_color__$RGBX_RGBX_$Impl_$.get_green(this1),thx_color__$RGBX_RGBX_$Impl_$.get_blue(this1)];
	return channels;
};
thx_color__$RGBX_RGBX_$Impl_$.withGreen = function(this1,newgreen) {
	var channels = [thx_color__$RGBX_RGBX_$Impl_$.get_red(this1),newgreen < 0?0:newgreen > 1?1:newgreen,thx_color__$RGBX_RGBX_$Impl_$.get_blue(this1)];
	return channels;
};
thx_color__$RGBX_RGBX_$Impl_$.withBlue = function(this1,newblue) {
	var channels = [thx_color__$RGBX_RGBX_$Impl_$.get_red(this1),thx_color__$RGBX_RGBX_$Impl_$.get_green(this1),newblue < 0?0:newblue > 1?1:newblue];
	return channels;
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
	var grey = Math.pow(this1[0],2) * .241 + Math.pow(this1[1],2) * .691 + Math.pow(this1[2],2) * .068;
	return grey;
};
thx_color__$RGBX_RGBX_$Impl_$.toHSL = function(this1) {
	var min = Math.min(Math.min(this1[0],this1[1]),this1[2]);
	var max = Math.max(Math.max(this1[0],this1[1]),this1[2]);
	var delta = max - min;
	var h;
	var s;
	var l = (max + min) / 2;
	if(delta == 0.0) s = h = 0.0; else {
		if(l < 0.5) s = delta / (max + min); else s = delta / (2 - max - min);
		if(this1[0] == max) h = (this1[1] - this1[2]) / delta + (this1[1] < thx_color__$RGBX_RGBX_$Impl_$.get_blue(this1)?6:0); else if(this1[1] == max) h = (this1[2] - this1[0]) / delta + 2; else h = (this1[0] - this1[1]) / delta + 4;
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
		return [h,s,v];
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
	return thx_color__$RGBX_RGBX_$Impl_$.withAlpha(this1,1.0);
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
	return [red < 0?0:red > 1?1:red,green < 0?0:green > 1?1:green,blue < 0?0:blue > 1?1:blue,alpha < 0?0:alpha > 1?1:alpha];
};
thx_color__$RGBXA_RGBXA_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,4);
	return thx_color__$RGBXA_RGBXA_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$RGBXA_RGBXA_$Impl_$.fromInts = function(arr) {
	thx_ArrayInts.resize(arr,4);
	return thx_color__$RGBXA_RGBXA_$Impl_$.create(arr[0] / 255,arr[1] / 255,arr[2] / 255,arr[3] / 255);
};
thx_color__$RGBXA_RGBXA_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$RGBX_RGBX_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3)));
		case "rgba":
			return thx_color__$RGBXA_RGBXA_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,4));
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$RGBXA_RGBXA_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$RGBXA_RGBXA_$Impl_$.darker = function(this1,t) {
	return thx_color__$RGBX_RGBX_$Impl_$.withAlpha(thx_color__$RGBX_RGBX_$Impl_$.darker(thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX(this1),t),thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1));
};
thx_color__$RGBXA_RGBXA_$Impl_$.lighter = function(this1,t) {
	return thx_color__$RGBX_RGBX_$Impl_$.withAlpha(thx_color__$RGBX_RGBX_$Impl_$.lighter(thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX(this1),t),thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1));
};
thx_color__$RGBXA_RGBXA_$Impl_$.transparent = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx_Ints.interpolate(t,this1[3],0)];
	return channels;
};
thx_color__$RGBXA_RGBXA_$Impl_$.opaque = function(this1,t) {
	var channels = [this1[0],this1[1],this1[2],thx_Ints.interpolate(t,this1[3],1)];
	return channels;
};
thx_color__$RGBXA_RGBXA_$Impl_$.interpolate = function(this1,other,t) {
	var channels = [thx_Ints.interpolate(t,this1[0],other[0]),thx_Ints.interpolate(t,this1[1],other[1]),thx_Ints.interpolate(t,this1[2],other[2]),thx_Ints.interpolate(t,this1[3],other[3])];
	return channels;
};
thx_color__$RGBXA_RGBXA_$Impl_$.withAlpha = function(this1,newalpha) {
	var channels = [thx_color__$RGBXA_RGBXA_$Impl_$.get_red(this1),thx_color__$RGBXA_RGBXA_$Impl_$.get_green(this1),thx_color__$RGBXA_RGBXA_$Impl_$.get_blue(this1),newalpha < 0?0:newalpha > 1?1:newalpha];
	return channels;
};
thx_color__$RGBXA_RGBXA_$Impl_$.withRed = function(this1,newred) {
	var channels = [newred < 0?0:newred > 1?1:newred,thx_color__$RGBXA_RGBXA_$Impl_$.get_green(this1),thx_color__$RGBXA_RGBXA_$Impl_$.get_blue(this1),thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1)];
	return channels;
};
thx_color__$RGBXA_RGBXA_$Impl_$.withGreen = function(this1,newgreen) {
	var channels = [thx_color__$RGBXA_RGBXA_$Impl_$.get_red(this1),newgreen < 0?0:newgreen > 1?1:newgreen,thx_color__$RGBXA_RGBXA_$Impl_$.get_blue(this1),thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1)];
	return channels;
};
thx_color__$RGBXA_RGBXA_$Impl_$.withBlue = function(this1,newblue) {
	var channels = [thx_color__$RGBXA_RGBXA_$Impl_$.get_red(this1),thx_color__$RGBXA_RGBXA_$Impl_$.get_green(this1),newblue < 0?0:newblue > 1?1:newblue,thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1)];
	return channels;
};
thx_color__$RGBXA_RGBXA_$Impl_$.toCSS3 = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toString(this1);
};
thx_color__$RGBXA_RGBXA_$Impl_$.toString = function(this1) {
	return "rgba(" + this1[0] * 100 + "%," + this1[1] * 100 + "%," + this1[2] * 100 + "%," + this1[3] + ")";
};
thx_color__$RGBXA_RGBXA_$Impl_$.toHex = function(this1,prefix) {
	if(prefix == null) prefix = "#";
	return "" + prefix + StringTools.hex(thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1),2) + StringTools.hex(thx_color__$RGBXA_RGBXA_$Impl_$.get_red(this1),2) + StringTools.hex(thx_color__$RGBXA_RGBXA_$Impl_$.get_green(this1),2) + StringTools.hex(thx_color__$RGBXA_RGBXA_$Impl_$.get_blue(this1),2);
};
thx_color__$RGBXA_RGBXA_$Impl_$.equals = function(this1,other) {
	return Math.abs(this1[0] - other[0]) <= 10e-10 && Math.abs(this1[1] - other[1]) <= 10e-10 && Math.abs(this1[2] - other[2]) <= 10e-10 && Math.abs(this1[3] - other[3]) <= 10e-10;
};
thx_color__$RGBXA_RGBXA_$Impl_$.toHSLA = function(this1) {
	return thx_color__$HSL_HSL_$Impl_$.withAlpha(thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX(this1)),thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1));
};
thx_color__$RGBXA_RGBXA_$Impl_$.toHSVA = function(this1) {
	return thx_color__$HSV_HSV_$Impl_$.withAlpha(thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX(this1)),thx_color__$RGBXA_RGBXA_$Impl_$.get_alpha(this1));
};
thx_color__$RGBXA_RGBXA_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX(this1));
};
thx_color__$RGBXA_RGBXA_$Impl_$.toRGBX = function(this1) {
	var channels = this1.slice(0,3);
	return channels;
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
	thx_ArrayFloats.resize(arr,3);
	return thx_color__$XYZ_XYZ_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$XYZ_XYZ_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "ciexyz":case "xyz":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			return channels;
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$XYZ_XYZ_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$XYZ_XYZ_$Impl_$.interpolate = function(this1,other,t) {
	var channels = [thx_Floats.interpolate(t,this1[0],other[0]),thx_Floats.interpolate(t,this1[1],other[1]),thx_Floats.interpolate(t,this1[2],other[2])];
	return channels;
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
	return Math.abs(this1[0] - other[0]) <= 10e-10 && Math.abs(this1[1] - other[1]) <= 10e-10 && Math.abs(this1[2] - other[2]) <= 10e-10;
};
thx_color__$XYZ_XYZ_$Impl_$.toCIELab = function(this1) {
	var x = this1[0] * 0.0105211106;
	var y = this1[1] * 0.01;
	var z = this1[2] * 0.00918417016;
	var p;
	if(x > 0.008856) x = Math.pow(x,0.333333333333333315); else x = 7.787 * x + 0.137931034482758619;
	if(y > 0.008856) y = Math.pow(y,0.333333333333333315); else y = 7.787 * y + 0.137931034482758619;
	if(z > 0.008856) z = Math.pow(z,0.333333333333333315); else z = 7.787 * z + 0.137931034482758619;
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
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$XYZ_XYZ_$Impl_$.toRGBXA(this1));
};
thx_color__$XYZ_XYZ_$Impl_$.toRGBX = function(this1) {
	var x = this1[0] / 100;
	var y = this1[1] / 100;
	var z = this1[2] / 100;
	var r = x * 3.2406 + y * -1.5372 + z * -0.4986;
	var g = x * -0.9689 + y * 1.8758 + z * 0.0415;
	var b = x * 0.0557 + y * -0.204 + z * 1.0570;
	if(r > 0.0031308) r = 1.055 * Math.pow(r,0.416666666666666685) - 0.055; else r = 12.92 * r;
	if(g > 0.0031308) g = 1.055 * Math.pow(g,0.416666666666666685) - 0.055; else g = 12.92 * g;
	if(b > 0.0031308) b = 1.055 * Math.pow(b,0.416666666666666685) - 0.055; else b = 12.92 * b;
	return [r,g,b];
};
thx_color__$XYZ_XYZ_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$XYZ_XYZ_$Impl_$.toRGBX(this1));
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
	thx_ArrayFloats.resize(arr,3);
	return thx_color__$Yxy_Yxy_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$Yxy_Yxy_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "yxy":
			var channels = thx_color_parse_ColorParser.getFloatChannels(info.channels,3);
			return channels;
		default:
			return null;
		}
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$Yxy_Yxy_$Impl_$._new = function(channels) {
	return channels;
};
thx_color__$Yxy_Yxy_$Impl_$.interpolate = function(this1,other,t) {
	var channels = [thx_Floats.interpolate(t,this1[0],other[0]),thx_Floats.interpolate(t,this1[1],other[1]),thx_Floats.interpolate(t,this1[2],other[2])];
	return channels;
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
	return Math.abs(this1[0] - other[0]) <= 10e-10 && Math.abs(this1[1] - other[1]) <= 10e-10 && Math.abs(this1[2] - other[2]) <= 10e-10;
};
thx_color__$Yxy_Yxy_$Impl_$.toCIELab = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toCIELab(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toCIELCh = function(this1) {
	return thx_color__$CIELab_CIELab_$Impl_$.toCIELCh(thx_color__$Yxy_Yxy_$Impl_$.toCIELab(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toCMY = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMY(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toCMYK = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toCMYK(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toGrey = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toGrey(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toHSL = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSL(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toHSV = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toHSV(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toRGB = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGB(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toRGBA = function(this1) {
	return thx_color__$RGBXA_RGBXA_$Impl_$.toRGBA(thx_color__$Yxy_Yxy_$Impl_$.toRGBXA(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toRGBX = function(this1) {
	return thx_color__$XYZ_XYZ_$Impl_$.toRGBX(thx_color__$Yxy_Yxy_$Impl_$.toXYZ(this1));
};
thx_color__$Yxy_Yxy_$Impl_$.toRGBXA = function(this1) {
	return thx_color__$RGBX_RGBX_$Impl_$.toRGBXA(thx_color__$Yxy_Yxy_$Impl_$.toRGBX(this1));
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
	if(length != channels.length) throw new js__$Boot_HaxeError("invalid number of channels, expected " + length + " but it is " + channels.length);
	return channels.map((function(f,a2) {
		return function(a1) {
			return f(a1,a2);
		};
	})(thx_color_parse_ColorParser.getFloatChannel,useInt8));
};
thx_color_parse_ColorParser.getInt8Channels = function(channels,length) {
	if(length != channels.length) throw new js__$Boot_HaxeError("invalid number of channels, expected " + length + " but it is " + channels.length);
	return channels.map(thx_color_parse_ColorParser.getInt8Channel);
};
thx_color_parse_ColorParser.getFloatChannel = function(channel,useInt8) {
	if(useInt8 == null) useInt8 = true;
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
		if(useInt8) return v4 / 255; else {
			var v5 = channel[2];
			return v5;
		}
		break;
	case 0:
		var v6 = channel[2];
		return v6 / 100;
	}
};
thx_color_parse_ColorParser.getInt8Channel = function(channel) {
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
		throw new js__$Boot_HaxeError("unable to extract a valid int8 value");
	}
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
		return new thx_color_parse_ColorInfo(name,channels);
	}
	,processChannel: function(s) {
		if(!this.pattern_channel.match(s)) return null;
		var value = this.pattern_channel.matched(1);
		var unit = this.pattern_channel.matched(2);
		if(unit == null) unit = "";
		try {
			switch(unit) {
			case "%":
				if(thx_Floats.canParse(value)) return thx_color_parse_ChannelInfo.CIPercent(thx_Floats.parse(value)); else return null;
				break;
			case "deg":
				if(thx_Floats.canParse(value)) return thx_color_parse_ChannelInfo.CIDegree(thx_Floats.parse(value)); else return null;
				break;
			case "DEG":
				if(thx_Floats.canParse(value)) return thx_color_parse_ChannelInfo.CIDegree(thx_Floats.parse(value)); else return null;
				break;
			case "rad":
				if(thx_Floats.canParse(value)) return thx_color_parse_ChannelInfo.CIDegree(thx_Floats.parse(value) * 180 / Math.PI); else return null;
				break;
			case "RAD":
				if(thx_Floats.canParse(value)) return thx_color_parse_ChannelInfo.CIDegree(thx_Floats.parse(value) * 180 / Math.PI); else return null;
				break;
			case "":
				if(thx_Ints.canParse(value)) {
					var i = thx_Ints.parse(value);
					if(i == 0) return thx_color_parse_ChannelInfo.CIBool(false); else if(i == 1) return thx_color_parse_ChannelInfo.CIBool(true); else if(i < 256) return thx_color_parse_ChannelInfo.CIInt8(i); else return thx_color_parse_ChannelInfo.CIInt(i);
				} else if(thx_Floats.canParse(value)) return thx_color_parse_ChannelInfo.CIFloat(thx_Floats.parse(value)); else return null;
				break;
			default:
				return null;
			}
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return null;
		}
	}
	,__class__: thx_color_parse_ColorParser
};
var thx_color_parse_ColorInfo = function(name,channels) {
	this.name = name;
	this.channels = channels;
};
thx_color_parse_ColorInfo.__name__ = ["thx","color","parse","ColorInfo"];
thx_color_parse_ColorInfo.prototype = {
	toString: function() {
		return "" + this.name + ", channels: " + Std.string(this.channels);
	}
	,__class__: thx_color_parse_ColorInfo
};
var thx_color_parse_ChannelInfo = { __ename__ : true, __constructs__ : ["CIPercent","CIFloat","CIDegree","CIInt8","CIInt","CIBool"] };
thx_color_parse_ChannelInfo.CIPercent = function(value) { var $x = ["CIPercent",0,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIFloat = function(value) { var $x = ["CIFloat",1,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIDegree = function(value) { var $x = ["CIDegree",2,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIInt8 = function(value) { var $x = ["CIInt8",3,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIInt = function(value) { var $x = ["CIInt",4,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIBool = function(value) { var $x = ["CIBool",5,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
var thx_error_ErrorWrapper = function(message,innerError,stack,pos) {
	thx_Error.call(this,message,stack,pos);
	this.innerError = innerError;
};
thx_error_ErrorWrapper.__name__ = ["thx","error","ErrorWrapper"];
thx_error_ErrorWrapper.__super__ = thx_Error;
thx_error_ErrorWrapper.prototype = $extend(thx_Error.prototype,{
	__class__: thx_error_ErrorWrapper
});
var thx_error_NullArgument = function(message,posInfo) {
	thx_Error.call(this,message,null,posInfo);
};
thx_error_NullArgument.__name__ = ["thx","error","NullArgument"];
thx_error_NullArgument.__super__ = thx_Error;
thx_error_NullArgument.prototype = $extend(thx_Error.prototype,{
	__class__: thx_error_NullArgument
});
var thx_geom_core_M23 = function() { };
thx_geom_core_M23.__name__ = ["thx","geom","core","M23"];
thx_geom_core_M23.prototype = {
	__class__: thx_geom_core_M23
};
var thx_geom_core_ImmutableM23 = function(a,b,c,d,e,f) {
	this._a = a;
	this._b = b;
	this._c = c;
	this._d = d;
	this._e = e;
	this._f = f;
};
thx_geom_core_ImmutableM23.__name__ = ["thx","geom","core","ImmutableM23"];
thx_geom_core_ImmutableM23.__interfaces__ = [thx_geom_core_M23];
thx_geom_core_ImmutableM23.prototype = {
	get_a: function() {
		return this._a;
	}
	,get_b: function() {
		return this._b;
	}
	,get_c: function() {
		return this._c;
	}
	,get_d: function() {
		return this._d;
	}
	,get_e: function() {
		return this._e;
	}
	,get_f: function() {
		return this._f;
	}
	,set_a: function(v) {
		throw new js__$Boot_HaxeError("this instance of M23 cannot be modified");
	}
	,set_b: function(v) {
		throw new js__$Boot_HaxeError("this instance of M23 cannot be modified");
	}
	,set_c: function(v) {
		throw new js__$Boot_HaxeError("this instance of M23 cannot be modified");
	}
	,set_d: function(v) {
		throw new js__$Boot_HaxeError("this instance of M23 cannot be modified");
	}
	,set_e: function(v) {
		throw new js__$Boot_HaxeError("this instance of M23 cannot be modified");
	}
	,set_f: function(v) {
		throw new js__$Boot_HaxeError("this instance of M23 cannot be modified");
	}
	,__class__: thx_geom_core_ImmutableM23
};
var thx_geom__$Matrix23_Matrix23_$Impl_$ = {};
thx_geom__$Matrix23_Matrix23_$Impl_$.__name__ = ["thx","geom","_Matrix23","Matrix23_Impl_"];
thx_geom__$Matrix23_Matrix23_$Impl_$.create = function(a,b,c,d,e,f) {
	return new thx_geom_core_MutableM23(a,b,c,d,e,f);
};
thx_geom__$Matrix23_Matrix23_$Impl_$._new = function(m) {
	return m;
};
thx_geom__$Matrix23_Matrix23_$Impl_$.flipX = function(this1) {
	return thx_geom__$Matrix23_Matrix23_$Impl_$.mul(this1,-1,0,0,1,0,0);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.flipY = function(this1) {
	return thx_geom__$Matrix23_Matrix23_$Impl_$.mul(this1,1,0,0,-1,0,0);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.multiply = function(this1,other) {
	return thx_geom__$Matrix23_Matrix23_$Impl_$.mul(this1,other.get_a(),other.get_b(),other.get_c(),other.get_d(),other.get_e(),other.get_f());
};
thx_geom__$Matrix23_Matrix23_$Impl_$.mul = function(this1,a,b,c,d,e,f) {
	return thx_geom__$Matrix23_Matrix23_$Impl_$.create(this1.get_a() * a + this1.get_c() * b,this1.get_b() * a + this1.get_d() * b,this1.get_a() * c + this1.get_c() * d,this1.get_b() * c + this1.get_d() * d,this1.get_a() * e + this1.get_c() * f + this1.get_e(),this1.get_b() * e + this1.get_d() * f + this1.get_f());
};
thx_geom__$Matrix23_Matrix23_$Impl_$.inverse = function(this1) {
	var det1 = this1.get_a() * this1.get_d() - this1.get_b() * this1.get_c();
	if(det1 == 0.0) throw new js__$Boot_HaxeError("Matrix cannot be inverted");
	var idet = 1.0 / det1;
	var det2 = this1.get_f() * this1.get_c() - this1.get_e() * this1.get_d();
	var det3 = this1.get_e() * this1.get_b() - this1.get_f() * this1.get_a();
	return thx_geom__$Matrix23_Matrix23_$Impl_$.create(this1.get_d() * idet,-this1.get_b() * idet,-this1.get_c() * idet,this1.get_a() * idet,det2 * idet,det3 * idet);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.isIdentity = function(this1) {
	return thx_geom__$Matrix23_Matrix23_$Impl_$.equals(this1,thx_geom__$Matrix23_Matrix23_$Impl_$.identity);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.isInvertible = function(this1) {
	return this1.get_a() * this1.get_d() - this1.get_b() * this1.get_c() != 0.0;
};
thx_geom__$Matrix23_Matrix23_$Impl_$.rotate = function(this1,angle) {
	var c = Math.cos(angle);
	var s = Math.sin(angle);
	return thx_geom__$Matrix23_Matrix23_$Impl_$.mul(this1,c,s,-s,-c,0,0);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.translate = function(this1,x,y) {
	return thx_geom__$Matrix23_Matrix23_$Impl_$.mul(this1,1,0,0,1,x,y);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.scale = function(this1,scaleFactor) {
	return thx_geom__$Matrix23_Matrix23_$Impl_$.mul(this1,scaleFactor,0,0,scaleFactor,0,0);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.getScale = function(this1) {
	var x = Math.sqrt(this1.get_a() * this1.get_a() + this1.get_c() * this1.get_c());
	var y = Math.sqrt(this1.get_b() * this1.get_b() + this1.get_d() * this1.get_d());
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.getDecompositionTRSR = function(this1) {
	var m00 = this1.get_a();
	var m10 = this1.get_b();
	var m01 = this1.get_c();
	var m11 = this1.get_d();
	var E = (m00 + m11) / 2;
	var F = (m00 - m11) / 2;
	var G = (m10 + m01) / 2;
	var H = (m10 - m01) / 2;
	var Q = Math.sqrt(E * E + H * H);
	var R = Math.sqrt(F * F + G * G);
	var sx = Q + R;
	var sy = Q - R;
	var a1 = Math.atan2(G,F);
	var a2 = Math.atan2(H,E);
	var theta = (a2 - a1) / 2;
	var phi = (a2 + a1) / 2;
	return { translation : thx_geom__$Matrix23_Matrix23_$Impl_$.create(1,0,0,1,this1.get_e(),this1.get_f()), rotation : thx_geom__$Matrix23_Matrix23_$Impl_$.rotate(thx_geom__$Matrix23_Matrix23_$Impl_$.identity,phi), scale : thx_geom__$Matrix23_Matrix23_$Impl_$.create(sx,0,0,sy,0,0), rotation0 : thx_geom__$Matrix23_Matrix23_$Impl_$.rotate(thx_geom__$Matrix23_Matrix23_$Impl_$.identity,theta)};
};
thx_geom__$Matrix23_Matrix23_$Impl_$.scaleNonUniform = function(this1,scaleX,scaleY) {
	return thx_geom__$Matrix23_Matrix23_$Impl_$.mul(this1,scaleX,0,0,scaleY,0,0);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.skewX = function(this1,angle) {
	return thx_geom__$Matrix23_Matrix23_$Impl_$.mul(this1,1,0,Math.tan(angle),1,0,0);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.skewY = function(this1,angle) {
	return thx_geom__$Matrix23_Matrix23_$Impl_$.mul(this1,1,Math.tan(angle),0,1,0,0);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.equals = function(this1,other) {
	return this1.get_a() == other.get_a() && this1.get_b() == other.get_b() && this1.get_c() == other.get_c() && this1.get_d() == other.get_d() && this1.get_e() == other.get_e() && this1.get_f() == other.get_f();
};
thx_geom__$Matrix23_Matrix23_$Impl_$.toString = function(this1) {
	return "matrix(" + this1.get_a() + "," + this1.get_b() + "," + this1.get_c() + "," + this1.get_d() + "," + this1.get_e() + "," + this1.get_f() + ")";
};
thx_geom__$Matrix23_Matrix23_$Impl_$.get_a = function(this1) {
	return this1.get_a();
};
thx_geom__$Matrix23_Matrix23_$Impl_$.get_b = function(this1) {
	return this1.get_b();
};
thx_geom__$Matrix23_Matrix23_$Impl_$.get_c = function(this1) {
	return this1.get_c();
};
thx_geom__$Matrix23_Matrix23_$Impl_$.get_d = function(this1) {
	return this1.get_d();
};
thx_geom__$Matrix23_Matrix23_$Impl_$.get_e = function(this1) {
	return this1.get_e();
};
thx_geom__$Matrix23_Matrix23_$Impl_$.get_f = function(this1) {
	return this1.get_f();
};
thx_geom__$Matrix23_Matrix23_$Impl_$.set_a = function(this1,v) {
	return this1.set_a(v);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.set_b = function(this1,v) {
	return this1.set_b(v);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.set_c = function(this1,v) {
	return this1.set_c(v);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.set_d = function(this1,v) {
	return this1.set_d(v);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.set_e = function(this1,v) {
	return this1.set_e(v);
};
thx_geom__$Matrix23_Matrix23_$Impl_$.set_f = function(this1,v) {
	return this1.set_f(v);
};
var thx_geom_core_Dim = function() { };
thx_geom_core_Dim.__name__ = ["thx","geom","core","Dim"];
thx_geom_core_Dim.prototype = {
	__class__: thx_geom_core_Dim
};
var thx_geom_core_ImmutableDim = function(coord) {
	this._coord = coord;
};
thx_geom_core_ImmutableDim.__name__ = ["thx","geom","core","ImmutableDim"];
thx_geom_core_ImmutableDim.__interfaces__ = [thx_geom_core_Dim];
thx_geom_core_ImmutableDim.prototype = {
	clone: function() {
		return new thx_geom_core_MutableDim(this._coord);
	}
	,get_coord: function() {
		return this._coord;
	}
	,set_coord: function(v) {
		throw new js__$Boot_HaxeError("this instance of Dim cannot be modified");
	}
	,__class__: thx_geom_core_ImmutableDim
};
var thx_geom_core_XY = function() { };
thx_geom_core_XY.__name__ = ["thx","geom","core","XY"];
thx_geom_core_XY.prototype = {
	__class__: thx_geom_core_XY
};
var thx_geom_core_ImmutableXY = function(x,y) {
	this._x = x;
	this._y = y;
};
thx_geom_core_ImmutableXY.__name__ = ["thx","geom","core","ImmutableXY"];
thx_geom_core_ImmutableXY.__interfaces__ = [thx_geom_core_XY];
thx_geom_core_ImmutableXY.prototype = {
	clone: function() {
		return new thx_geom_core_MutableXY(this._x,this._y);
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,set_x: function(v) {
		throw new js__$Boot_HaxeError("this instance of XY cannot be modified");
	}
	,set_y: function(v) {
		throw new js__$Boot_HaxeError("this instance of XY cannot be modified");
	}
	,__class__: thx_geom_core_ImmutableXY
};
var thx_geom_core_LinkedDim = function(getCoord,setCoord) {
	this.getCoord = getCoord;
	this.setCoord = setCoord;
};
thx_geom_core_LinkedDim.__name__ = ["thx","geom","core","LinkedDim"];
thx_geom_core_LinkedDim.__interfaces__ = [thx_geom_core_Dim];
thx_geom_core_LinkedDim.prototype = {
	clone: function() {
		return new thx_geom_core_MutableDim(this.getCoord());
	}
	,get_coord: function() {
		return this.getCoord();
	}
	,set_coord: function(v) {
		return this.setCoord(v);
	}
	,__class__: thx_geom_core_LinkedDim
};
var thx_geom_core_LinkedXY = function(getX,getY,setX,setY) {
	this.getX = getX;
	this.getY = getY;
	this.setX = setX;
	this.setY = setY;
};
thx_geom_core_LinkedXY.__name__ = ["thx","geom","core","LinkedXY"];
thx_geom_core_LinkedXY.__interfaces__ = [thx_geom_core_XY];
thx_geom_core_LinkedXY.prototype = {
	clone: function() {
		return new thx_geom_core_MutableXY(this.getX(),this.getY());
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
	,__class__: thx_geom_core_LinkedXY
};
var thx_geom_core_MutableDim = function(coord) {
	this._coord = coord;
};
thx_geom_core_MutableDim.__name__ = ["thx","geom","core","MutableDim"];
thx_geom_core_MutableDim.__interfaces__ = [thx_geom_core_Dim];
thx_geom_core_MutableDim.prototype = {
	clone: function() {
		return new thx_geom_core_MutableDim(this._coord);
	}
	,get_coord: function() {
		return this._coord;
	}
	,set_coord: function(v) {
		return this._coord = v;
	}
	,__class__: thx_geom_core_MutableDim
};
var thx_geom_core_MutableM23 = function(a,b,c,d,e,f) {
	this._a = a;
	this._b = b;
	this._c = c;
	this._d = d;
	this._e = e;
	this._f = f;
};
thx_geom_core_MutableM23.__name__ = ["thx","geom","core","MutableM23"];
thx_geom_core_MutableM23.__interfaces__ = [thx_geom_core_M23];
thx_geom_core_MutableM23.prototype = {
	get_a: function() {
		return this._a;
	}
	,get_b: function() {
		return this._b;
	}
	,get_c: function() {
		return this._c;
	}
	,get_d: function() {
		return this._d;
	}
	,get_e: function() {
		return this._e;
	}
	,get_f: function() {
		return this._f;
	}
	,set_a: function(v) {
		return this._a = v;
	}
	,set_b: function(v) {
		return this._b = v;
	}
	,set_c: function(v) {
		return this._c = v;
	}
	,set_d: function(v) {
		return this._d = v;
	}
	,set_e: function(v) {
		return this._e = v;
	}
	,set_f: function(v) {
		return this._f = v;
	}
	,__class__: thx_geom_core_MutableM23
};
var thx_geom_core_MutableXY = function(x,y) {
	this._x = x;
	this._y = y;
};
thx_geom_core_MutableXY.__name__ = ["thx","geom","core","MutableXY"];
thx_geom_core_MutableXY.__interfaces__ = [thx_geom_core_XY];
thx_geom_core_MutableXY.prototype = {
	clone: function() {
		return new thx_geom_core_MutableXY(this._x,this._y);
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
	,__class__: thx_geom_core_MutableXY
};
var thx_geom_d2_Segment = function(start,end) {
	this.start = start;
	this.end = end;
};
thx_geom_d2_Segment.__name__ = ["thx","geom","d2","Segment"];
thx_geom_d2_Segment.prototype = {
	toVector: function() {
		var _g = this;
		return new thx_geom_core_LinkedXY(function() {
			return _g.end.get_x() - _g.start.get_x();
		},function() {
			return _g.end.get_y() - _g.start.get_y();
		},function(v) {
			var v1 = _g.start.get_x() + v;
			_g.end.set_x(v1);
			return v;
		},function(v2) {
			var v3 = _g.start.get_y() + v2;
			_g.end.set_y(v3);
			return v2;
		});
	}
	,toString: function() {
		return "Segment(" + this.start.get_x() + "," + this.start.get_y() + "," + this.end.get_x() + "," + this.end.get_y() + ")";
	}
	,__class__: thx_geom_d2_Segment
};
var thx_geom_d2_LineSegment = function(start,end) {
	thx_geom_d2_Segment.call(this,start,end);
};
thx_geom_d2_LineSegment.__name__ = ["thx","geom","d2","LineSegment"];
thx_geom_d2_LineSegment.__super__ = thx_geom_d2_Segment;
thx_geom_d2_LineSegment.prototype = $extend(thx_geom_d2_Segment.prototype,{
	toString: function() {
		return "LineSegment(" + this.start.get_x() + "," + this.start.get_y() + "," + this.end.get_x() + "," + this.end.get_y() + ")";
	}
	,__class__: thx_geom_d2_LineSegment
});
var thx_geom_d2_ArcSegment = function(start,radius,largeArcFlag,sweepFlag,xAxisRotate,end) {
	thx_geom_d2_LineSegment.call(this,start,end);
	this.radius = radius;
	this.largeArcFlag = largeArcFlag;
	this.sweepFlag = sweepFlag;
	this.xAxisRotate = xAxisRotate;
};
thx_geom_d2_ArcSegment.__name__ = ["thx","geom","d2","ArcSegment"];
thx_geom_d2_ArcSegment.__super__ = thx_geom_d2_LineSegment;
thx_geom_d2_ArcSegment.prototype = $extend(thx_geom_d2_LineSegment.prototype,{
	toString: function() {
		return "ArcSegment(sx:" + this.start.get_x() + ",sy:" + this.start.get_y() + ",xr:" + this.xAxisRotate.get_coord() + ",laf:" + Std.string(this.largeArcFlag) + ",sf:" + Std.string(this.sweepFlag) + ",ex:" + this.end.get_x() + ",ey:" + this.end.get_y() + ")";
	}
	,__class__: thx_geom_d2_ArcSegment
});
var thx_geom_d2_IShape = function() { };
thx_geom_d2_IShape.__name__ = ["thx","geom","d2","IShape"];
thx_geom_d2_IShape.prototype = {
	__class__: thx_geom_d2_IShape
};
var thx_geom_d2_Circle = function(center,radius) {
	this.center = center;
	this.radius = radius;
};
thx_geom_d2_Circle.__name__ = ["thx","geom","d2","Circle"];
thx_geom_d2_Circle.__interfaces__ = [thx_geom_d2_IShape];
thx_geom_d2_Circle.fromPoints = function(a,b) {
	var c = new thx_geom_core_LinkedXY(function() {
		return (a.get_x() + b.get_x()) / 2;
	},function() {
		return (a.get_y() + b.get_y()) / 2;
	},function(x) {
		var dx = x - (a.get_x() + b.get_x()) / 2;
		var v = a.get_x() + dx;
		a.set_x(v);
		return x;
	},function(y) {
		var dy = y - (a.get_y() + b.get_y()) / 2;
		var v1 = a.get_y() + dy;
		a.set_y(v1);
		return y;
	});
	var r = new thx_geom_core_LinkedDim(function() {
		return thx_geom_d2__$Point_Point_$Impl_$.distanceTo(c,a);
	},function(v2) {
		var d;
		var this1;
		this1 = (function($this) {
			var $r;
			var p;
			p = (function($this) {
				var $r;
				var x2 = -c.get_x();
				var y2 = -c.get_y();
				$r = new thx_geom_core_MutableXY(x2,y2);
				return $r;
			}($this));
			var x1 = b.get_x() + p.get_x();
			var y1 = b.get_y() + p.get_y();
			$r = new thx_geom_core_MutableXY(x1,y1);
			return $r;
		}(this));
		d = this1;
		thx_geom_d2__$Vector_Vector_$Impl_$.set_length(d,v2);
		thx_geom_d2__$Point_Point_$Impl_$.set(b,c.get_x() + d.get_x(),c.get_y() + d.get_y());
		thx_geom_d2__$Point_Point_$Impl_$.set(a,c.get_x() - d.get_x(),c.get_y() - d.get_y());
		return v2;
	});
	return new thx_geom_d2_Circle(c,r);
};
thx_geom_d2_Circle.create = function(x,y,r) {
	return new thx_geom_d2_Circle(new thx_geom_core_MutableXY(x,y),r);
};
thx_geom_d2_Circle.prototype = {
	get_area: function() {
		var this1 = this.radius;
		return this1.get_coord() * this1.get_coord() * 3.141592653589793238;
	}
	,set_area: function(v) {
		return thx_geom_d2__$Radius_Radius_$Impl_$.set_area(this.radius,v);
	}
	,get_circumference: function() {
		return this.radius.get_coord() * 6.283185307179586477;
	}
	,set_circumference: function(v) {
		return thx_geom_d2__$Radius_Radius_$Impl_$.set_circumference(this.radius,v);
	}
	,get_x: function() {
		return this.center.get_x();
	}
	,get_y: function() {
		return this.center.get_y();
	}
	,set_x: function(v) {
		return this.center.set_x(v);
	}
	,set_y: function(v) {
		return this.center.set_y(v);
	}
	,get_left: function() {
		return this.center.get_x() - this.radius.get_coord();
	}
	,get_right: function() {
		return this.center.get_x() + this.radius.get_coord();
	}
	,get_top: function() {
		return this.center.get_y() - this.radius.get_coord();
	}
	,get_bottom: function() {
		return this.center.get_y() + this.radius.get_coord();
	}
	,set_left: function(v) {
		var v1 = v + this.radius.get_coord();
		return this.center.set_x(v1);
	}
	,set_right: function(v) {
		var v1 = v - this.radius.get_coord();
		return this.center.set_x(v1);
	}
	,set_top: function(v) {
		var v1 = v - this.radius.get_coord();
		return this.center.set_y(v1);
	}
	,set_bottom: function(v) {
		var v1 = v + this.radius.get_coord();
		return this.center.set_y(v1);
	}
	,equals: function(other) {
		return (function($this) {
			var $r;
			var this1 = $this.center;
			var p = other.center;
			$r = this1.get_x() == p.get_x() && this1.get_y() == p.get_y();
			return $r;
		}(this)) && this.radius.get_coord() == other.radius.get_coord();
	}
	,toString: function() {
		return "Circle(" + this.center.get_x() + "," + this.center.get_y() + "," + ("Radius(" + this.radius.get_coord() + ")") + ")";
	}
	,get_anchors: function() {
		if(null == this.anchors) this.anchors = [this.center,this.get_centerLeft(),this.get_centerTop(),this.get_centerRight(),this.get_centerBottom()];
		return this.anchors;
	}
	,get_centerLeft: function() {
		var _g = this;
		if(null == this.centerLeft) this.centerLeft = new thx_geom_core_LinkedXY(function() {
			return _g.center.get_x() - _g.radius.get_coord();
		},function() {
			return _g.center.get_y();
		},function(v) {
			return _g.set_left(v);
		},function(v1) {
			return _g.center.set_y(v1);
		});
		return this.centerLeft;
	}
	,get_centerRight: function() {
		var _g = this;
		if(null == this.centerRight) this.centerRight = new thx_geom_core_LinkedXY(function() {
			return _g.center.get_x() + _g.radius.get_coord();
		},function() {
			return _g.center.get_y();
		},function(v) {
			return _g.set_right(v);
		},function(v1) {
			return _g.center.set_y(v1);
		});
		return this.centerRight;
	}
	,get_centerTop: function() {
		var _g = this;
		if(null == this.centerTop) this.centerTop = new thx_geom_core_LinkedXY(function() {
			return _g.center.get_x();
		},function() {
			return _g.center.get_y() - _g.radius.get_coord();
		},function(v) {
			return _g.center.set_x(v);
		},function(v1) {
			return _g.set_top(v1);
		});
		return this.centerTop;
	}
	,get_centerBottom: function() {
		var _g = this;
		if(null == this.centerBottom) this.centerBottom = new thx_geom_core_LinkedXY(function() {
			return _g.center.get_x();
		},function() {
			return _g.center.get_y() + _g.radius.get_coord();
		},function(v) {
			return _g.center.set_x(v);
		},function(v1) {
			return _g.set_bottom(v1);
		});
		return this.centerBottom;
	}
	,__class__: thx_geom_d2_Circle
};
var thx_geom_d2_QuadraticCurveSegment = function(start,c1,end) {
	thx_geom_d2_LineSegment.call(this,start,end);
	this.c1 = c1;
};
thx_geom_d2_QuadraticCurveSegment.__name__ = ["thx","geom","d2","QuadraticCurveSegment"];
thx_geom_d2_QuadraticCurveSegment.__super__ = thx_geom_d2_LineSegment;
thx_geom_d2_QuadraticCurveSegment.prototype = $extend(thx_geom_d2_LineSegment.prototype,{
	toString: function() {
		return "QuadraticCurveSegment(" + this.start.get_x() + "," + this.start.get_y() + "," + this.c1.get_x() + "," + this.c1.get_y() + "," + this.end.get_x() + "," + this.end.get_y() + ")";
	}
	,__class__: thx_geom_d2_QuadraticCurveSegment
});
var thx_geom_d2_CubicCurveSegment = function(start,c1,c2,end) {
	thx_geom_d2_QuadraticCurveSegment.call(this,start,c1,end);
	this.c2 = c2;
};
thx_geom_d2_CubicCurveSegment.__name__ = ["thx","geom","d2","CubicCurveSegment"];
thx_geom_d2_CubicCurveSegment.__super__ = thx_geom_d2_QuadraticCurveSegment;
thx_geom_d2_CubicCurveSegment.prototype = $extend(thx_geom_d2_QuadraticCurveSegment.prototype,{
	toString: function() {
		return "CubicCurveSegment(" + this.start.get_x() + "," + this.start.get_y() + "," + this.c1.get_x() + "," + this.c1.get_y() + "," + this.c2.get_x() + "," + this.c2.get_y() + "," + this.end.get_x() + "," + this.end.get_y() + ")";
	}
	,__class__: thx_geom_d2_CubicCurveSegment
});
var thx_geom_d2_Path = function(list) {
	if(null == list) this.segments = []; else this.segments = list;
};
thx_geom_d2_Path.__name__ = ["thx","geom","d2","Path"];
thx_geom_d2_Path.fromSVGPath = function(d) {
	return new thx_geom_d2_Path(thx_geom_d2_svg_Svg.parsePath(d));
};
thx_geom_d2_Path.prototype = {
	toSVGPath: function() {
		var buf = [];
		var end;
		var x = NaN;
		var y = NaN;
		end = new thx_geom_core_MutableXY(x,y);
		var startingPoint = end;
		var _g = 0;
		var _g1 = this.segments;
		while(_g < _g1.length) {
			var segment = _g1[_g];
			++_g;
			if(!(function($this) {
				var $r;
				var p = segment.start;
				$r = end.get_x() == p.get_x() && end.get_y() == p.get_y();
				return $r;
			}(this))) {
				buf.push("M " + segment.start.get_x() + " " + segment.start.get_y());
				startingPoint = segment.start;
			}
			var _g2;
			if(segment == null) _g2 = null; else _g2 = js_Boot.getClass(segment);
			if(_g2 != null) switch(_g2) {
			case thx_geom_d2_LineSegment:
				buf.push("L " + segment.end.get_x() + " " + segment.end.get_y());
				break;
			case thx_geom_d2_QuadraticCurveSegment:
				var s = segment;
				buf.push("Q " + s.c1.get_x() + " " + s.c1.get_y() + " " + s.end.get_x() + " " + s.end.get_y());
				break;
			case thx_geom_d2_CubicCurveSegment:
				var s1 = segment;
				buf.push("C " + s1.c1.get_x() + " " + s1.c1.get_y() + " " + s1.c2.get_x() + " " + s1.c2.get_y() + " " + s1.end.get_x() + " " + s1.end.get_y());
				break;
			case thx_geom_d2_ArcSegment:
				var s2 = segment;
				buf.push("A " + s2.radius.get_x() + " " + s2.radius.get_y() + " " + s2.xAxisRotate.get_coord() + " " + (s2.largeArcFlag?1:0) + " " + (s2.sweepFlag?1:0) + " " + s2.end.get_x() + " " + s2.end.get_y());
				break;
			}
			if((function($this) {
				var $r;
				var this1 = segment.end;
				$r = this1.get_x() == startingPoint.get_x() && this1.get_y() == startingPoint.get_y();
				return $r;
			}(this))) buf.push("Z");
			end = segment.end;
		}
		return buf.join(" ");
	}
	,toString: function() {
		return "Path(segments=" + this.segments.length + ")";
	}
	,__class__: thx_geom_d2_Path
};
var thx_geom_d2__$Point_Point_$Impl_$ = {};
thx_geom_d2__$Point_Point_$Impl_$.__name__ = ["thx","geom","d2","_Point","Point_Impl_"];
thx_geom_d2__$Point_Point_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,2,0);
	return thx_geom_d2__$Point_Point_$Impl_$.create(arr[0],arr[1]);
};
thx_geom_d2__$Point_Point_$Impl_$.fromObject = function(o) {
	return thx_geom_d2__$Point_Point_$Impl_$.create(o.x,o.y);
};
thx_geom_d2__$Point_Point_$Impl_$.fromAngle = function(angle) {
	return thx_geom_d2__$Point_Point_$Impl_$.create(Math.cos(angle),Math.sin(angle));
};
thx_geom_d2__$Point_Point_$Impl_$.create = function(x,y) {
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.linked = function(getX,getY,setX,setY) {
	return new thx_geom_core_LinkedXY(getX,getY,setX,setY);
};
thx_geom_d2__$Point_Point_$Impl_$.immutable = function(x,y) {
	return new thx_geom_core_ImmutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$._new = function(xy) {
	return xy;
};
thx_geom_d2__$Point_Point_$Impl_$.asVector = function(this1) {
	return this1;
};
thx_geom_d2__$Point_Point_$Impl_$.asSize = function(this1) {
	return this1;
};
thx_geom_d2__$Point_Point_$Impl_$.addPointAssign = function(this1,p) {
	return thx_geom_d2__$Point_Point_$Impl_$.set(this1,this1.get_x() + p.get_x(),this1.get_y() + p.get_y());
};
thx_geom_d2__$Point_Point_$Impl_$.addPoint = function(this1,p) {
	var x = this1.get_x() + p.get_x();
	var y = this1.get_y() + p.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.addAssign = function(this1,v) {
	return thx_geom_d2__$Point_Point_$Impl_$.set(this1,this1.get_x() + v,this1.get_y() + v);
};
thx_geom_d2__$Point_Point_$Impl_$.add = function(this1,v) {
	var x = this1.get_x() + v;
	var y = this1.get_y() + v;
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.negate = function(this1) {
	var x = -this1.get_x();
	var y = -this1.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.subtractPointAssign = function(this1,p) {
	return thx_geom_d2__$Point_Point_$Impl_$.set(this1,this1.get_x() - p.get_x(),this1.get_y() - p.get_y());
};
thx_geom_d2__$Point_Point_$Impl_$.subtractPoint = function(this1,p) {
	var p1;
	p1 = (function($this) {
		var $r;
		var x1 = -p.get_x();
		var y1 = -p.get_y();
		$r = new thx_geom_core_MutableXY(x1,y1);
		return $r;
	}(this));
	var x = this1.get_x() + p1.get_x();
	var y = this1.get_y() + p1.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.subtractAssign = function(this1,v) {
	return thx_geom_d2__$Point_Point_$Impl_$.set(this1,this1.get_x() - v,this1.get_y() - v);
};
thx_geom_d2__$Point_Point_$Impl_$.subtract = function(this1,v) {
	var v1 = -v;
	var x = this1.get_x() + v1;
	var y = this1.get_y() + v1;
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.multiplyPointAssign = function(this1,p) {
	return thx_geom_d2__$Point_Point_$Impl_$.set(this1,this1.get_x() * p.get_x(),this1.get_y() * p.get_y());
};
thx_geom_d2__$Point_Point_$Impl_$.multiplyPoint = function(this1,p) {
	var x = this1.get_x() * p.get_x();
	var y = this1.get_y() * p.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.multiplyAssign = function(this1,v) {
	return thx_geom_d2__$Point_Point_$Impl_$.set(this1,this1.get_x() * v,this1.get_y() * v);
};
thx_geom_d2__$Point_Point_$Impl_$.multiply = function(this1,v) {
	var x = this1.get_x() * v;
	var y = this1.get_y() * v;
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.dividePointAssign = function(this1,p) {
	return thx_geom_d2__$Point_Point_$Impl_$.set(this1,this1.get_x() / p.get_x(),this1.get_y() / p.get_y());
};
thx_geom_d2__$Point_Point_$Impl_$.dividePoint = function(this1,p) {
	var x = this1.get_x() / p.get_x();
	var y = this1.get_y() / p.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.divideAssign = function(this1,v) {
	return thx_geom_d2__$Point_Point_$Impl_$.set(this1,this1.get_x() / v,this1.get_y() / v);
};
thx_geom_d2__$Point_Point_$Impl_$.divide = function(this1,v) {
	var x = this1.get_x() / v;
	var y = this1.get_y() / v;
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.equals = function(this1,p) {
	return this1.get_x() == p.get_x() && this1.get_y() == p.get_y();
};
thx_geom_d2__$Point_Point_$Impl_$.notEquals = function(this1,p) {
	return !(this1.get_x() == p.get_x() && this1.get_y() == p.get_y());
};
thx_geom_d2__$Point_Point_$Impl_$.abs = function(this1) {
	var x = Math.abs(this1.get_x());
	var y = Math.abs(this1.get_y());
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.copyTo = function(this1,other) {
	return thx_geom_d2__$Point_Point_$Impl_$.set(other,this1.get_x(),this1.get_y());
};
thx_geom_d2__$Point_Point_$Impl_$.nearEquals = function(this1,p) {
	return Math.abs(this1.get_x() - p.get_x()) <= 10e-10 && Math.abs(this1.get_y() - p.get_y()) <= 10e-10;
};
thx_geom_d2__$Point_Point_$Impl_$.notNearEquals = function(this1,p) {
	return !thx_geom_d2__$Point_Point_$Impl_$.nearEquals(this1,p);
};
thx_geom_d2__$Point_Point_$Impl_$.lerp = function(this1,p,f) {
	var p1;
	var this2;
	this2 = (function($this) {
		var $r;
		var p2;
		p2 = (function($this) {
			var $r;
			var x3 = -this1.get_x();
			var y3 = -this1.get_y();
			$r = new thx_geom_core_MutableXY(x3,y3);
			return $r;
		}($this));
		var x2 = p.get_x() + p2.get_x();
		var y2 = p.get_y() + p2.get_y();
		$r = new thx_geom_core_MutableXY(x2,y2);
		return $r;
	}(this));
	var x1 = this2.get_x() * f;
	var y1 = this2.get_y() * f;
	p1 = new thx_geom_core_MutableXY(x1,y1);
	var x = this1.get_x() + p1.get_x();
	var y = this1.get_y() + p1.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.isZero = function(this1) {
	var p = thx_geom_d2__$Point_Point_$Impl_$.zero;
	return this1.get_x() == p.get_x() && this1.get_y() == p.get_y();
};
thx_geom_d2__$Point_Point_$Impl_$.isNearZero = function(this1) {
	return thx_geom_d2__$Point_Point_$Impl_$.nearEquals(this1,thx_geom_d2__$Point_Point_$Impl_$.zero);
};
thx_geom_d2__$Point_Point_$Impl_$.clone = function(this1) {
	return this1.clone();
};
thx_geom_d2__$Point_Point_$Impl_$.distanceTo = function(this1,p) {
	return Math.abs((function($this) {
		var $r;
		var this2;
		{
			var this3;
			this3 = (function($this) {
				var $r;
				var p1;
				p1 = (function($this) {
					var $r;
					var x1 = -p.get_x();
					var y1 = -p.get_y();
					$r = new thx_geom_core_MutableXY(x1,y1);
					return $r;
				}($this));
				var x = this1.get_x() + p1.get_x();
				var y = this1.get_y() + p1.get_y();
				$r = new thx_geom_core_MutableXY(x,y);
				return $r;
			}($this));
			this2 = this3;
		}
		$r = Math.sqrt(this2.get_x() * this2.get_x() + this2.get_y() * this2.get_y());
		return $r;
	}(this)));
};
thx_geom_d2__$Point_Point_$Impl_$.magnitudeTo = function(this1,p) {
	var this2;
	var this3;
	this3 = (function($this) {
		var $r;
		var p1;
		p1 = (function($this) {
			var $r;
			var x1 = -p.get_x();
			var y1 = -p.get_y();
			$r = new thx_geom_core_MutableXY(x1,y1);
			return $r;
		}($this));
		var x = this1.get_x() + p1.get_x();
		var y = this1.get_y() + p1.get_y();
		$r = new thx_geom_core_MutableXY(x,y);
		return $r;
	}(this));
	this2 = this3;
	return this2.get_x() * this2.get_x() + this2.get_y() * this2.get_y();
};
thx_geom_d2__$Point_Point_$Impl_$.min = function(this1,p) {
	var x = Math.min(this1.get_x(),p.get_x());
	var y = Math.min(this1.get_y(),p.get_y());
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.minX = function(this1,p) {
	var x = Math.min(this1.get_x(),p.get_x());
	var y = this1.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.minY = function(this1,p) {
	var x = this1.get_x();
	var y = Math.min(this1.get_y(),p.get_y());
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.max = function(this1,p) {
	var x = Math.max(this1.get_x(),p.get_x());
	var y = Math.max(this1.get_y(),p.get_y());
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.maxX = function(this1,p) {
	var x = Math.max(this1.get_x(),p.get_x());
	var y = this1.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.maxY = function(this1,p) {
	var x = this1.get_x();
	var y = Math.max(this1.get_y(),p.get_y());
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.pointAt = function(this1,angle,distance) {
	var this2 = this1;
	var p;
	var this3 = thx_geom_d2__$Point_Point_$Impl_$.create(Math.cos(angle),Math.sin(angle));
	var x1 = this3.get_x() * distance;
	var y1 = this3.get_y() * distance;
	p = new thx_geom_core_MutableXY(x1,y1);
	var x = this2.get_x() + p.get_x();
	var y = this2.get_y() + p.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.reflection = function(this1,p) {
	var p1;
	p1 = (function($this) {
		var $r;
		var p2;
		p2 = (function($this) {
			var $r;
			var x2 = -this1.get_x();
			var y2 = -this1.get_y();
			$r = new thx_geom_core_MutableXY(x2,y2);
			return $r;
		}($this));
		var x1 = p.get_x() + p2.get_x();
		var y1 = p.get_y() + p2.get_y();
		$r = new thx_geom_core_MutableXY(x1,y1);
		return $r;
	}(this));
	var x = p.get_x() + p1.get_x();
	var y = p.get_y() + p1.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.set = function(this1,nx,ny) {
	this1.set_x(nx);
	this1.set_y(ny);
	return this1;
};
thx_geom_d2__$Point_Point_$Impl_$.toArray = function(this1) {
	return [this1.get_x(),this1.get_y()];
};
thx_geom_d2__$Point_Point_$Impl_$.toObject = function(this1) {
	return { x : this1.get_x(), y : this1.get_y()};
};
thx_geom_d2__$Point_Point_$Impl_$.toString = function(this1) {
	return "Point(" + this1.get_x() + "," + this1.get_y() + ")";
};
thx_geom_d2__$Point_Point_$Impl_$.solve2Linear = function(a,b,c,d,u,v) {
	var det = a * d - b * c;
	if(det == 0) return null;
	var invdet = 1.0 / det;
	var x = u * d - b * v;
	var y = -u * c + a * v;
	return new thx_geom_core_MutableXY(x * invdet,y * invdet);
};
thx_geom_d2__$Point_Point_$Impl_$.transform = function(this1,matrix) {
	var x = matrix.get_a() * this1.get_x() + matrix.get_c() * this1.get_y();
	var y = matrix.get_b() * this1.get_x() + matrix.get_d() * this1.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Point_Point_$Impl_$.apply = function(this1,matrix) {
	return thx_geom_d2__$Point_Point_$Impl_$.set(this1,matrix.get_a() * this1.get_x() + matrix.get_c() * this1.get_y(),matrix.get_b() * this1.get_x() + matrix.get_d() * this1.get_y());
};
thx_geom_d2__$Point_Point_$Impl_$.lerpAtY = function(this1,other,y) {
	var f1 = y - this1.get_y();
	var f2 = other.get_y() - this1.get_y();
	var t;
	if(f2 < 0) {
		f1 = -f1;
		f2 = -f2;
	}
	if(f1 <= 0) t = 0.0; else if(f1 >= f2) t = 1.0; else if(f2 < 2.71828182845904523536) t = 0.5; else t = f1 / f2;
	return this1.get_x() + t * (other.get_x() - this1.get_x());
};
thx_geom_d2__$Point_Point_$Impl_$.get_x = function(this1) {
	return this1.get_x();
};
thx_geom_d2__$Point_Point_$Impl_$.get_y = function(this1) {
	return this1.get_y();
};
thx_geom_d2__$Point_Point_$Impl_$.set_x = function(this1,v) {
	return this1.set_x(v);
};
thx_geom_d2__$Point_Point_$Impl_$.set_y = function(this1,v) {
	return this1.set_y(v);
};
var thx_geom_d2__$Radius_Radius_$Impl_$ = {};
thx_geom_d2__$Radius_Radius_$Impl_$.__name__ = ["thx","geom","d2","_Radius","Radius_Impl_"];
thx_geom_d2__$Radius_Radius_$Impl_$.fromFloat = function(r) {
	return new thx_geom_core_MutableDim(Math.abs(r));
};
thx_geom_d2__$Radius_Radius_$Impl_$.create = function(r) {
	return new thx_geom_core_MutableDim(Math.abs(r));
};
thx_geom_d2__$Radius_Radius_$Impl_$.linked = function(getRadius,setRadius) {
	return new thx_geom_core_LinkedDim(getRadius,setRadius);
};
thx_geom_d2__$Radius_Radius_$Impl_$.immutable = function(r) {
	return new thx_geom_core_ImmutableDim(r);
};
thx_geom_d2__$Radius_Radius_$Impl_$._new = function(r) {
	return r;
};
thx_geom_d2__$Radius_Radius_$Impl_$.equals = function(this1,p) {
	return this1.get_coord() == p.get_coord();
};
thx_geom_d2__$Radius_Radius_$Impl_$.notEquals = function(this1,p) {
	return !(this1.get_coord() == p.get_coord());
};
thx_geom_d2__$Radius_Radius_$Impl_$.nearEquals = function(this1,p) {
	return thx_Floats.nearEquals(this1.get_coord(),p.get_coord());
};
thx_geom_d2__$Radius_Radius_$Impl_$.notNearEquals = function(this1,p) {
	return !thx_geom_d2__$Radius_Radius_$Impl_$.nearEquals(this1,p);
};
thx_geom_d2__$Radius_Radius_$Impl_$.isZero = function(this1) {
	return this1.get_coord() == 0;
};
thx_geom_d2__$Radius_Radius_$Impl_$.isNearZero = function(this1) {
	return thx_Floats.nearZero(this1.get_coord());
};
thx_geom_d2__$Radius_Radius_$Impl_$.clone = function(this1) {
	return this1.clone();
};
thx_geom_d2__$Radius_Radius_$Impl_$.toString = function(this1) {
	return "Radius(" + this1.get_coord() + ")";
};
thx_geom_d2__$Radius_Radius_$Impl_$.toFloat = function(this1) {
	return this1.get_coord();
};
thx_geom_d2__$Radius_Radius_$Impl_$.get_coord = function(this1) {
	return this1.get_coord();
};
thx_geom_d2__$Radius_Radius_$Impl_$.set_coord = function(this1,v) {
	return this1.set_coord(v);
};
thx_geom_d2__$Radius_Radius_$Impl_$.get_area = function(this1) {
	return this1.get_coord() * this1.get_coord() * 3.141592653589793238;
};
thx_geom_d2__$Radius_Radius_$Impl_$.set_area = function(this1,v) {
	this1.set_coord(Math.sqrt(v / 3.141592653589793238));
	return v;
};
thx_geom_d2__$Radius_Radius_$Impl_$.get_circumference = function(this1) {
	return this1.get_coord() * 6.283185307179586477;
};
thx_geom_d2__$Radius_Radius_$Impl_$.set_circumference = function(this1,v) {
	this1.set_coord(v / 6.283185307179586477);
	return v;
};
var thx_geom_d2__$Size_Size_$Impl_$ = {};
thx_geom_d2__$Size_Size_$Impl_$.__name__ = ["thx","geom","d2","_Size","Size_Impl_"];
thx_geom_d2__$Size_Size_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,2,0);
	return new thx_geom_core_MutableXY(arr[0],arr[1]);
};
thx_geom_d2__$Size_Size_$Impl_$.fromObject = function(o) {
	return thx_geom_d2__$Size_Size_$Impl_$.create(o.width,o.height);
};
thx_geom_d2__$Size_Size_$Impl_$.create = function(width,height) {
	return new thx_geom_core_MutableXY(width,height);
};
thx_geom_d2__$Size_Size_$Impl_$.linked = function(getWidth,getHeight,setWidth,setHeight) {
	return new thx_geom_core_LinkedXY(getWidth,getHeight,setWidth,setHeight);
};
thx_geom_d2__$Size_Size_$Impl_$.immutable = function(width,height) {
	return new thx_geom_core_ImmutableXY(width,height);
};
thx_geom_d2__$Size_Size_$Impl_$._new = function(xy) {
	return xy;
};
thx_geom_d2__$Size_Size_$Impl_$.asPoint = function(this1) {
	return this1;
};
thx_geom_d2__$Size_Size_$Impl_$.asSize = function(this1) {
	return this1;
};
thx_geom_d2__$Size_Size_$Impl_$.equals = function(this1,p) {
	return this1.get_x() == p.get_x() && this1.get_y() == p.get_y();
};
thx_geom_d2__$Size_Size_$Impl_$.notEquals = function(this1,p) {
	return !(this1.get_x() == p.get_x() && this1.get_y() == p.get_y());
};
thx_geom_d2__$Size_Size_$Impl_$.copyTo = function(this1,other) {
	return thx_geom_d2__$Size_Size_$Impl_$.set(other,this1.get_x(),this1.get_y());
};
thx_geom_d2__$Size_Size_$Impl_$.nearEquals = function(this1,p) {
	return Math.abs(this1.get_x() - p.get_x()) <= 10e-10 && Math.abs(this1.get_y() - p.get_y()) <= 10e-10;
};
thx_geom_d2__$Size_Size_$Impl_$.notNearEquals = function(this1,p) {
	return !thx_geom_d2__$Size_Size_$Impl_$.nearEquals(this1,p);
};
thx_geom_d2__$Size_Size_$Impl_$.clone = function(this1) {
	return this1.clone();
};
thx_geom_d2__$Size_Size_$Impl_$.min = function(this1,p) {
	var width = Math.min(this1.get_x(),p.get_x());
	var height = Math.min(this1.get_y(),p.get_y());
	return new thx_geom_core_MutableXY(width,height);
};
thx_geom_d2__$Size_Size_$Impl_$.minWidth = function(this1,p) {
	var width = Math.min(this1.get_x(),p.get_x());
	var height = this1.get_y();
	return new thx_geom_core_MutableXY(width,height);
};
thx_geom_d2__$Size_Size_$Impl_$.minHeight = function(this1,p) {
	var width = this1.get_x();
	var height = Math.min(this1.get_y(),p.get_y());
	return new thx_geom_core_MutableXY(width,height);
};
thx_geom_d2__$Size_Size_$Impl_$.max = function(this1,p) {
	var width = Math.max(this1.get_x(),p.get_x());
	var height = Math.max(this1.get_y(),p.get_y());
	return new thx_geom_core_MutableXY(width,height);
};
thx_geom_d2__$Size_Size_$Impl_$.maxWidth = function(this1,p) {
	var width = Math.max(this1.get_x(),p.get_x());
	var height = this1.get_y();
	return new thx_geom_core_MutableXY(width,height);
};
thx_geom_d2__$Size_Size_$Impl_$.maxHeight = function(this1,p) {
	var width = this1.get_x();
	var height = Math.max(this1.get_y(),p.get_y());
	return new thx_geom_core_MutableXY(width,height);
};
thx_geom_d2__$Size_Size_$Impl_$.set = function(this1,nwidth,nheight) {
	this1.set_x(nwidth);
	this1.set_y(nheight);
	return this1;
};
thx_geom_d2__$Size_Size_$Impl_$.toArray = function(this1) {
	return [this1.get_x(),this1.get_y()];
};
thx_geom_d2__$Size_Size_$Impl_$.toObject = function(this1) {
	return { width : this1.get_x(), height : this1.get_y()};
};
thx_geom_d2__$Size_Size_$Impl_$.toString = function(this1) {
	return "Size(" + this1.get_x() + "," + this1.get_y() + ")";
};
thx_geom_d2__$Size_Size_$Impl_$.transform = function(this1,matrix) {
	var width = matrix.get_a() * this1.get_x() + matrix.get_c() * this1.get_y();
	var height = matrix.get_b() * this1.get_x() + matrix.get_d() * this1.get_y();
	return new thx_geom_core_MutableXY(width,height);
};
thx_geom_d2__$Size_Size_$Impl_$.apply = function(this1,matrix) {
	return thx_geom_d2__$Size_Size_$Impl_$.set(this1,matrix.get_a() * this1.get_x() + matrix.get_c() * this1.get_y(),matrix.get_b() * this1.get_x() + matrix.get_d() * this1.get_y());
};
thx_geom_d2__$Size_Size_$Impl_$.get_width = function(this1) {
	return this1.get_x();
};
thx_geom_d2__$Size_Size_$Impl_$.get_height = function(this1) {
	return this1.get_y();
};
thx_geom_d2__$Size_Size_$Impl_$.set_width = function(this1,v) {
	return this1.set_x(v);
};
thx_geom_d2__$Size_Size_$Impl_$.set_height = function(this1,v) {
	return this1.set_y(v);
};
thx_geom_d2__$Size_Size_$Impl_$.get_area = function(this1) {
	return Math.abs(this1.get_x() * this1.get_y());
};
thx_geom_d2__$Size_Size_$Impl_$.get_perimeter = function(this1) {
	return (Math.abs(this1.get_x()) + Math.abs(this1.get_y())) * 2;
};
var thx_geom_d2__$Vector_Vector_$Impl_$ = {};
thx_geom_d2__$Vector_Vector_$Impl_$.__name__ = ["thx","geom","d2","_Vector","Vector_Impl_"];
thx_geom_d2__$Vector_Vector_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,2,0);
	return thx_geom_d2__$Vector_Vector_$Impl_$.create(arr[0],arr[1]);
};
thx_geom_d2__$Vector_Vector_$Impl_$.fromObject = function(o) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.create(o.x,o.y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.fromAngle = function(angle) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.create(Math.cos(angle),Math.sin(angle));
};
thx_geom_d2__$Vector_Vector_$Impl_$.create = function(x,y) {
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.linked = function(getX,getY,setX,setY) {
	return new thx_geom_core_LinkedXY(getX,getY,setX,setY);
};
thx_geom_d2__$Vector_Vector_$Impl_$.immutable = function(x,y) {
	return new thx_geom_core_ImmutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$._new = function(xy) {
	return xy;
};
thx_geom_d2__$Vector_Vector_$Impl_$.asPoint = function(this1) {
	return this1;
};
thx_geom_d2__$Vector_Vector_$Impl_$.asSize = function(this1) {
	return this1;
};
thx_geom_d2__$Vector_Vector_$Impl_$.addVectorAssign = function(this1,p) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.set(this1,this1.get_x() + p.get_x(),this1.get_y() + p.get_y());
};
thx_geom_d2__$Vector_Vector_$Impl_$.addVector = function(this1,p) {
	var x = this1.get_x() + p.get_x();
	var y = this1.get_y() + p.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.addAssign = function(this1,v) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.set(this1,this1.get_x() + v,this1.get_y() + v);
};
thx_geom_d2__$Vector_Vector_$Impl_$.add = function(this1,v) {
	var x = this1.get_x() + v;
	var y = this1.get_y() + v;
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.negate = function(this1) {
	var x = -this1.get_x();
	var y = -this1.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.subtractVectorAssign = function(this1,p) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.set(this1,this1.get_x() - p.get_x(),this1.get_y() - p.get_y());
};
thx_geom_d2__$Vector_Vector_$Impl_$.subtractVector = function(this1,p) {
	var p1;
	p1 = (function($this) {
		var $r;
		var x1 = -p.get_x();
		var y1 = -p.get_y();
		$r = new thx_geom_core_MutableXY(x1,y1);
		return $r;
	}(this));
	var x = this1.get_x() + p1.get_x();
	var y = this1.get_y() + p1.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.subtractAssign = function(this1,v) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.set(this1,this1.get_x() - v,this1.get_y() - v);
};
thx_geom_d2__$Vector_Vector_$Impl_$.subtract = function(this1,v) {
	var v1 = -v;
	var x = this1.get_x() + v1;
	var y = this1.get_y() + v1;
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.multiplyVectorAssign = function(this1,p) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.set(this1,this1.get_x() * p.get_x(),this1.get_y() * p.get_y());
};
thx_geom_d2__$Vector_Vector_$Impl_$.multiplyVector = function(this1,p) {
	var x = this1.get_x() * p.get_x();
	var y = this1.get_y() * p.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.multiplyAssign = function(this1,v) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.set(this1,this1.get_x() * v,this1.get_y() * v);
};
thx_geom_d2__$Vector_Vector_$Impl_$.multiply = function(this1,v) {
	var x = this1.get_x() * v;
	var y = this1.get_y() * v;
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.divideVectorAssign = function(this1,p) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.set(this1,this1.get_x() / p.get_x(),this1.get_y() / p.get_y());
};
thx_geom_d2__$Vector_Vector_$Impl_$.divideVector = function(this1,p) {
	var x = this1.get_x() / p.get_x();
	var y = this1.get_y() / p.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.divideAssign = function(this1,v) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.set(this1,this1.get_x() / v,this1.get_y() / v);
};
thx_geom_d2__$Vector_Vector_$Impl_$.divide = function(this1,v) {
	var x = this1.get_x() / v;
	var y = this1.get_y() / v;
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.equals = function(this1,p) {
	return this1.get_x() == p.get_x() && this1.get_y() == p.get_y();
};
thx_geom_d2__$Vector_Vector_$Impl_$.notEquals = function(this1,p) {
	return !(this1.get_x() == p.get_x() && this1.get_y() == p.get_y());
};
thx_geom_d2__$Vector_Vector_$Impl_$.abs = function(this1) {
	var x = Math.abs(this1.get_x());
	var y = Math.abs(this1.get_y());
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.copyTo = function(this1,other) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.set(other,this1.get_x(),this1.get_y());
};
thx_geom_d2__$Vector_Vector_$Impl_$.nearEquals = function(this1,p) {
	return Math.abs(this1.get_x() - p.get_x()) <= 10e-10 && Math.abs(this1.get_y() - p.get_y()) <= 10e-10;
};
thx_geom_d2__$Vector_Vector_$Impl_$.notNearEquals = function(this1,p) {
	return !thx_geom_d2__$Vector_Vector_$Impl_$.nearEquals(this1,p);
};
thx_geom_d2__$Vector_Vector_$Impl_$.isZero = function(this1) {
	var p = thx_geom_d2__$Vector_Vector_$Impl_$.zero;
	return this1.get_x() == p.get_x() && this1.get_y() == p.get_y();
};
thx_geom_d2__$Vector_Vector_$Impl_$.isNearZero = function(this1) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.nearEquals(this1,thx_geom_d2__$Vector_Vector_$Impl_$.zero);
};
thx_geom_d2__$Vector_Vector_$Impl_$.angleTo = function(this1,other) {
	var cos = (this1.get_x() * other.get_x() + this1.get_y() * other.get_y()) / (Math.sqrt(this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y()) / Math.sqrt(other.get_x() * other.get_x() + other.get_y() * other.get_y()));
	if(cos < -1) cos = -1; else if(cos > 1) cos = 1;
	var radians = Math.acos(cos);
	if(this1.get_x() * other.get_y() - this1.get_y() * other.get_x() < 0) return -radians; else return radians;
};
thx_geom_d2__$Vector_Vector_$Impl_$.clone = function(this1) {
	return this1.clone();
};
thx_geom_d2__$Vector_Vector_$Impl_$.dot = function(this1,p) {
	return this1.get_x() * p.get_x() + this1.get_y() * p.get_y();
};
thx_geom_d2__$Vector_Vector_$Impl_$.normal = function(this1) {
	var x = this1.get_y();
	var y = -this1.get_x();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.unit = function(this1) {
	var v = Math.sqrt(this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y());
	var x = this1.get_x() / v;
	var y = this1.get_y() / v;
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.perpendicular = function(this1,other) {
	var v;
	{
		var this2 = thx_geom_d2__$Vector_Vector_$Impl_$.project(this1,other);
		v = Math.atan2(this2.get_y(),this2.get_x());
	}
	var v1 = -v;
	var x = this1.get_x() + v1;
	var y = this1.get_y() + v1;
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.project = function(this1,other) {
	var f = (this1.get_x() * other.get_x() + this1.get_y() * other.get_y()) / (other.get_x() * other.get_x() + other.get_y() * other.get_y());
	return (function($this) {
		var $r;
		var x = this1.get_x() * f;
		var y = this1.get_y() * f;
		$r = new thx_geom_core_MutableXY(x,y);
		return $r;
	}(this));
};
thx_geom_d2__$Vector_Vector_$Impl_$.cross = function(this1,p) {
	return this1.get_x() * p.get_y() - this1.get_y() * p.get_x();
};
thx_geom_d2__$Vector_Vector_$Impl_$.min = function(this1,p) {
	var x = Math.min(this1.get_x(),p.get_x());
	var y = Math.min(this1.get_y(),p.get_y());
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.minX = function(this1,p) {
	var x = Math.min(this1.get_x(),p.get_x());
	var y = this1.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.minY = function(this1,p) {
	var x = this1.get_x();
	var y = Math.min(this1.get_y(),p.get_y());
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.max = function(this1,p) {
	var x = Math.max(this1.get_x(),p.get_x());
	var y = Math.max(this1.get_y(),p.get_y());
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.maxX = function(this1,p) {
	var x = Math.max(this1.get_x(),p.get_x());
	var y = this1.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.maxY = function(this1,p) {
	var x = this1.get_x();
	var y = Math.max(this1.get_y(),p.get_y());
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.vectorAt = function(this1,angle,distance) {
	var this2 = this1;
	var p;
	var this3 = thx_geom_d2__$Vector_Vector_$Impl_$.create(Math.cos(angle),Math.sin(angle));
	var x1 = this3.get_x() * distance;
	var y1 = this3.get_y() * distance;
	p = new thx_geom_core_MutableXY(x1,y1);
	var x = this2.get_x() + p.get_x();
	var y = this2.get_y() + p.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.set = function(this1,nx,ny) {
	this1.set_x(nx);
	this1.set_y(ny);
	return this1;
};
thx_geom_d2__$Vector_Vector_$Impl_$.toAngle = function(this1) {
	return Math.atan2(this1.get_y(),this1.get_x());
};
thx_geom_d2__$Vector_Vector_$Impl_$.toArray = function(this1) {
	return [this1.get_x(),this1.get_y()];
};
thx_geom_d2__$Vector_Vector_$Impl_$.toObject = function(this1) {
	return { x : this1.get_x(), y : this1.get_y()};
};
thx_geom_d2__$Vector_Vector_$Impl_$.toString = function(this1) {
	return "Vector(" + this1.get_x() + "," + this1.get_y() + ")";
};
thx_geom_d2__$Vector_Vector_$Impl_$.transform = function(this1,matrix) {
	var x = matrix.get_a() * this1.get_x() + matrix.get_c() * this1.get_y();
	var y = matrix.get_b() * this1.get_x() + matrix.get_d() * this1.get_y();
	return new thx_geom_core_MutableXY(x,y);
};
thx_geom_d2__$Vector_Vector_$Impl_$.apply = function(this1,matrix) {
	return thx_geom_d2__$Vector_Vector_$Impl_$.set(this1,matrix.get_a() * this1.get_x() + matrix.get_c() * this1.get_y(),matrix.get_b() * this1.get_x() + matrix.get_d() * this1.get_y());
};
thx_geom_d2__$Vector_Vector_$Impl_$.solve2Linear = function(a,b,c,d,u,v) {
	var det = a * d - b * c;
	if(det == 0) return null;
	var invdet = 1.0 / det;
	var x = u * d - b * v;
	var y = -u * c + a * v;
	return new thx_geom_core_MutableXY(x * invdet,y * invdet);
};
thx_geom_d2__$Vector_Vector_$Impl_$.get_x = function(this1) {
	return this1.get_x();
};
thx_geom_d2__$Vector_Vector_$Impl_$.get_y = function(this1) {
	return this1.get_y();
};
thx_geom_d2__$Vector_Vector_$Impl_$.set_x = function(this1,v) {
	return this1.set_x(v);
};
thx_geom_d2__$Vector_Vector_$Impl_$.set_y = function(this1,v) {
	return this1.set_y(v);
};
thx_geom_d2__$Vector_Vector_$Impl_$.get_length = function(this1) {
	return Math.sqrt(this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y());
};
thx_geom_d2__$Vector_Vector_$Impl_$.set_length = function(this1,l) {
	var d = l / Math.sqrt(this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y());
	var _g = this1;
	var v = _g.get_x() * d;
	_g.set_x(v);
	var _g1 = this1;
	var v1 = _g1.get_y() * d;
	_g1.set_y(v1);
	return l;
};
thx_geom_d2__$Vector_Vector_$Impl_$.get_magnitude = function(this1) {
	return this1.get_x() * this1.get_x() + this1.get_y() * this1.get_y();
};
thx_geom_d2__$Vector_Vector_$Impl_$.set_magnitude = function(this1,m) {
	thx_geom_d2__$Vector_Vector_$Impl_$.set_length(this1,Math.sqrt(m));
	return m;
};
var thx_geom_d2_svg_Svg = function() { };
thx_geom_d2_svg_Svg.__name__ = ["thx","geom","d2","svg","Svg"];
thx_geom_d2_svg_Svg.parsePath = function(d) {
	var list = [];
	var capture = function(qt) {
		var arr = [];
		var b = "";
		var c;
		var _g = 0;
		while(_g < qt) {
			var i = _g++;
			while(d.length > 0 && thx_geom_d2_svg_Svg.isFiller(d)) d = d.substring(1);
			while(d.length > 0 && thx_geom_d2_svg_Svg.isNumerical(d)) {
				b += d.substring(0,1);
				d = d.substring(1);
			}
			arr.push(parseFloat(b));
			b = "";
		}
		return arr;
	};
	var captureOne = function() {
		return capture(1)[0];
	};
	var capturePoints = function(qt1) {
		var c1 = capture(qt1 * 2);
		return thx_Arrays.splitBy(c1,2).map(function(_) {
			return new thx_geom_core_MutableXY(_[0],_[1]);
		});
	};
	var capturePoint = function() {
		return capturePoints(1)[0];
	};
	var beginShape = 0;
	var prev = "L";
	var last = new thx_geom_core_MutableXY(0,0);
	var smooth = null;
	while(d.length > 0) {
		while(thx_geom_d2_svg_Svg.isFiller(d)) d = d.substring(1);
		var c2 = d.substring(0,1);
		d = d.substring(1);
		var v = c2;
		var v1 = c2;
		switch(c2) {
		case "M":
			beginShape = list.length;
			prev = "L";
			smooth = null;
			var p = capturePoint();
			if(!(last.get_x() == p.get_x() && last.get_y() == p.get_y())) last = p;
			break;
		case "m":
			beginShape = list.length;
			prev = "l";
			smooth = null;
			var p1 = capturePoint();
			last = (function($this) {
				var $r;
				var x = last.get_x() + p1.get_x();
				var y = last.get_y() + p1.get_y();
				$r = new thx_geom_core_MutableXY(x,y);
				return $r;
			}(this));
			break;
		case "L":
			prev = "L";
			smooth = null;
			var p2 = capturePoint();
			list.push(new thx_geom_d2_LineSegment(last,last = p2));
			break;
		case "l":
			prev = "l";
			smooth = null;
			var p3 = capturePoint();
			list.push(new thx_geom_d2_LineSegment(last,last = (function($this) {
				var $r;
				var x1 = last.get_x() + p3.get_x();
				var y1 = last.get_y() + p3.get_y();
				$r = new thx_geom_core_MutableXY(x1,y1);
				return $r;
			}(this))));
			break;
		case "Q":
			prev = "Q";
			var ps = capturePoints(2);
			list.push(new thx_geom_d2_QuadraticCurveSegment(last,smooth = ps[0],last = ps[1]));
			break;
		case "q":
			prev = "q";
			var ps1 = capturePoints(2);
			list.push(new thx_geom_d2_QuadraticCurveSegment(last,(function($this) {
				var $r;
				var p4 = ps1[0];
				var x2 = last.get_x() + p4.get_x();
				var y2 = last.get_y() + p4.get_y();
				$r = smooth = new thx_geom_core_MutableXY(x2,y2);
				return $r;
			}(this)),(function($this) {
				var $r;
				var p5 = ps1[1];
				var x3 = last.get_x() + p5.get_x();
				var y3 = last.get_y() + p5.get_y();
				$r = last = new thx_geom_core_MutableXY(x3,y3);
				return $r;
			}(this))));
			break;
		case "C":
			prev = "C";
			var ps2 = capturePoints(3);
			list.push(new thx_geom_d2_CubicCurveSegment(last,ps2[0],smooth = ps2[1],last = ps2[2]));
			break;
		case "c":
			prev = "c";
			var ps3 = capturePoints(3);
			list.push(new thx_geom_d2_CubicCurveSegment(last,(function($this) {
				var $r;
				var p6 = ps3[0];
				var x4 = last.get_x() + p6.get_x();
				var y4 = last.get_y() + p6.get_y();
				$r = new thx_geom_core_MutableXY(x4,y4);
				return $r;
			}(this)),(function($this) {
				var $r;
				var p7 = ps3[1];
				var x5 = last.get_x() + p7.get_x();
				var y5 = last.get_y() + p7.get_y();
				$r = smooth = new thx_geom_core_MutableXY(x5,y5);
				return $r;
			}(this)),(function($this) {
				var $r;
				var p8 = ps3[2];
				var x6 = last.get_x() + p8.get_x();
				var y6 = last.get_y() + p8.get_y();
				$r = last = new thx_geom_core_MutableXY(x6,y6);
				return $r;
			}(this))));
			break;
		case "H":
			prev = "H";
			smooth = null;
			var x7 = captureOne();
			var p9 = last.clone();
			p9.set_x(x7);
			list.push(new thx_geom_d2_LineSegment(last,last = p9));
			break;
		case "h":
			prev = "h";
			smooth = null;
			var x8 = captureOne();
			var p10 = last.clone();
			var v2 = p10.get_x() + x8;
			p10.set_x(v2);
			list.push(new thx_geom_d2_LineSegment(last,last = p10));
			break;
		case "V":
			smooth = null;
			prev = "V";
			var y7 = captureOne();
			var p11 = last.clone();
			p11.set_y(y7);
			list.push(new thx_geom_d2_LineSegment(last,last = p11));
			break;
		case "v":
			smooth = null;
			prev = "v";
			var y8 = captureOne();
			var p12 = last.clone();
			var v3 = p12.get_y() + y8;
			p12.set_y(v3);
			list.push(new thx_geom_d2_LineSegment(last,last = p12));
			break;
		case "S":
			prev = "S";
			var ps4 = capturePoints(2);
			if(null != smooth) smooth = thx_geom_d2__$Point_Point_$Impl_$.reflection(smooth,last); else smooth = ps4[0];
			list.push(new thx_geom_d2_CubicCurveSegment(last,smooth,smooth = ps4[0],last = ps4[1]));
			break;
		case "s":
			smooth = null;
			var ps5 = capturePoints(2);
			if(null != smooth) smooth = thx_geom_d2__$Point_Point_$Impl_$.reflection(smooth,last); else {
				var p13 = ps5[0];
				var x9 = last.get_x() + p13.get_x();
				var y9 = last.get_y() + p13.get_y();
				smooth = new thx_geom_core_MutableXY(x9,y9);
			}
			list.push(new thx_geom_d2_CubicCurveSegment(last,smooth,(function($this) {
				var $r;
				var p14 = ps5[0];
				var x10 = last.get_x() + p14.get_x();
				var y10 = last.get_y() + p14.get_y();
				$r = smooth = new thx_geom_core_MutableXY(x10,y10);
				return $r;
			}(this)),(function($this) {
				var $r;
				var p15 = ps5[1];
				var x11 = last.get_x() + p15.get_x();
				var y11 = last.get_y() + p15.get_y();
				$r = last = new thx_geom_core_MutableXY(x11,y11);
				return $r;
			}(this))));
			break;
		case "T":
			smooth = null;
			prev = "T";
			var p16 = capturePoint();
			if(null != smooth) smooth = thx_geom_d2__$Point_Point_$Impl_$.reflection(smooth,last); else smooth = last;
			list.push(new thx_geom_d2_QuadraticCurveSegment(last,smooth,last = p16));
			break;
		case "t":
			smooth = null;
			prev = "t";
			var p17 = capturePoint();
			if(null != smooth) smooth = thx_geom_d2__$Point_Point_$Impl_$.reflection(smooth,last); else smooth = last;
			list.push(new thx_geom_d2_QuadraticCurveSegment(last,smooth,last = (function($this) {
				var $r;
				var x12 = last.get_x() + p17.get_x();
				var y12 = last.get_y() + p17.get_y();
				$r = new thx_geom_core_MutableXY(x12,y12);
				return $r;
			}(this))));
			break;
		case "A":
			smooth = null;
			prev = "A";
			var a = capture(7);
			list.push(new thx_geom_d2_ArcSegment(last,new thx_geom_core_MutableXY(a[0],a[1]),a[3] != 0,a[4] != 0,new thx_geom_core_MutableDim(a[2]),last = new thx_geom_core_MutableXY(a[5],a[6])));
			break;
		case "a":
			smooth = null;
			prev = "a";
			var a1 = capture(7);
			list.push(new thx_geom_d2_ArcSegment(last,new thx_geom_core_MutableXY(a1[0],a1[1]),a1[3] != 0,a1[4] != 0,new thx_geom_core_MutableDim(a1[2]),(function($this) {
				var $r;
				var p18 = new thx_geom_core_MutableXY(a1[5],a1[6]);
				var x13 = last.get_x() + p18.get_x();
				var y13 = last.get_y() + p18.get_y();
				$r = last = new thx_geom_core_MutableXY(x13,y13);
				return $r;
			}(this))));
			break;
		case "z":case "Z":
			smooth = null;
			var first = list[beginShape];
			if(null != first && !(function($this) {
				var $r;
				var this1 = first.start;
				$r = this1.get_x() == last.get_x() && this1.get_y() == last.get_y();
				return $r;
			}(this))) list.push(new thx_geom_d2_LineSegment(last,first.start));
			break;
		case "-":case "0":case "1":case "2":case "3":case "4":case "5":case "6":case "7":case "8":case "9":case "e":
			d = prev + c2 + d;
			break;
		default:
			if(thx_geom_d2_svg_Svg.isFiller(v) || v == "") {
			} else throw new js__$Boot_HaxeError("invalid command \"" + v1 + "\" in " + d);
		}
	}
	return list;
};
thx_geom_d2_svg_Svg.isFiller = function(s) {
	var c = s.substring(0,1);
	return c == " " || c == "\n" || c == "," || c == "\t";
};
thx_geom_d2_svg_Svg.isNumerical = function(s) {
	var c = s.substring(0,1);
	switch(c) {
	case "-":case "0":case "1":case "2":case "3":case "4":case "5":case "6":case "7":case "8":case "9":case "e":case ".":
		return true;
	default:
		return false;
	}
};
var thx_math_Const = function() { };
thx_math_Const.__name__ = ["thx","math","Const"];
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
var __map_reserved = {}

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
	var now = function() {
		return new Date() - nowOffset;
	};
	scope.performance.now = now;
}
thx_color_Color.names = new haxe_ds_StringMap();
var value = thx_color_Color.aliceblue = 15792383;
thx_color_Color.names.set("aliceblue",value);
thx_color_Color.names.set("alice blue",thx_color_Color.aliceblue);
var value1 = thx_color_Color.antiquewhite = 16444375;
thx_color_Color.names.set("antiquewhite",value1);
thx_color_Color.names.set("antique white",thx_color_Color.antiquewhite);
var value2 = thx_color_Color.aqua = 65535;
thx_color_Color.names.set("aqua",value2);
var value3 = thx_color_Color.aquamarine = 8388564;
thx_color_Color.names.set("aquamarine",value3);
var value4 = thx_color_Color.azure = 15794175;
thx_color_Color.names.set("azure",value4);
var value5 = thx_color_Color.beige = 16119260;
thx_color_Color.names.set("beige",value5);
var value6 = thx_color_Color.bisque = 16770244;
thx_color_Color.names.set("bisque",value6);
var value7 = thx_color_Color.black = 0;
thx_color_Color.names.set("black",value7);
var value8 = thx_color_Color.blanchedalmond = 16772045;
thx_color_Color.names.set("blanchedalmond",value8);
thx_color_Color.names.set("blanched almond",thx_color_Color.blanchedalmond);
var value9 = thx_color_Color.blue = 255;
thx_color_Color.names.set("blue",value9);
var value10 = thx_color_Color.blueviolet = 9055202;
thx_color_Color.names.set("blueviolet",value10);
thx_color_Color.names.set("blue violet",thx_color_Color.blueviolet);
var value11 = thx_color_Color.brown = 10824234;
thx_color_Color.names.set("brown",value11);
var value12 = thx_color_Color.burlywood = 14596231;
thx_color_Color.names.set("burlywood",value12);
thx_color_Color.names.set("burly wood",thx_color_Color.burlywood);
var value13 = thx_color_Color.cadetblue = 6266528;
thx_color_Color.names.set("cadetblue",value13);
thx_color_Color.names.set("cadet blue",thx_color_Color.cadetblue);
var value14 = thx_color_Color.chartreuse = 8388352;
thx_color_Color.names.set("chartreuse",value14);
thx_color_Color.names.set("chart reuse",thx_color_Color.chartreuse);
var value15 = thx_color_Color.chocolate = 13789470;
thx_color_Color.names.set("chocolate",value15);
var value16 = thx_color_Color.coral = 16744272;
thx_color_Color.names.set("coral",value16);
var value17 = thx_color_Color.cornflowerblue = 6591981;
thx_color_Color.names.set("cornflowerblue",value17);
thx_color_Color.names.set("corn flower blue",thx_color_Color.cornflowerblue);
var value18 = thx_color_Color.cornsilk = 16775388;
thx_color_Color.names.set("cornsilk",value18);
thx_color_Color.names.set("corn silk",thx_color_Color.cornsilk);
var value19 = thx_color_Color.crimson = 14423100;
thx_color_Color.names.set("crimson",value19);
var value20 = thx_color_Color.cyan = 65535;
thx_color_Color.names.set("cyan",value20);
var value21 = thx_color_Color.darkblue = 139;
thx_color_Color.names.set("darkblue",value21);
thx_color_Color.names.set("dark blue",thx_color_Color.darkblue);
var value22 = thx_color_Color.darkcyan = 35723;
thx_color_Color.names.set("darkcyan",value22);
thx_color_Color.names.set("dark cyan",thx_color_Color.darkcyan);
var value23 = thx_color_Color.darkgoldenrod = 12092939;
thx_color_Color.names.set("darkgoldenrod",value23);
thx_color_Color.names.set("dark golden rod",thx_color_Color.darkgoldenrod);
var value24 = thx_color_Color.darkgray = thx_color_Color.darkgrey = 11119017;
thx_color_Color.names.set("darkgray",value24);
thx_color_Color.names.set("dark gray",thx_color_Color.darkgray);
thx_color_Color.names.set("darkgrey",thx_color_Color.darkgrey);
thx_color_Color.names.set("dark grey",thx_color_Color.darkgrey);
var value25 = thx_color_Color.darkgreen = 25600;
thx_color_Color.names.set("darkgreen",value25);
thx_color_Color.names.set("dark green",thx_color_Color.darkgreen);
var value26 = thx_color_Color.darkkhaki = 12433259;
thx_color_Color.names.set("darkkhaki",value26);
thx_color_Color.names.set("dark khaki",thx_color_Color.darkkhaki);
var value27 = thx_color_Color.darkmagenta = 9109643;
thx_color_Color.names.set("darkmagenta",value27);
thx_color_Color.names.set("dark magenta",thx_color_Color.darkmagenta);
var value28 = thx_color_Color.darkolivegreen = 5597999;
thx_color_Color.names.set("darkolivegreen",value28);
thx_color_Color.names.set("dark olive green",thx_color_Color.darkolivegreen);
var value29 = thx_color_Color.darkorange = 16747520;
thx_color_Color.names.set("darkorange",value29);
thx_color_Color.names.set("dark orange",thx_color_Color.darkorange);
var value30 = thx_color_Color.darkorchid = 10040012;
thx_color_Color.names.set("darkorchid",value30);
thx_color_Color.names.set("dark orchid",thx_color_Color.darkorchid);
var value31 = thx_color_Color.darkred = 9109504;
thx_color_Color.names.set("darkred",value31);
thx_color_Color.names.set("dark red",thx_color_Color.darkred);
var value32 = thx_color_Color.darksalmon = 15308410;
thx_color_Color.names.set("darksalmon",value32);
thx_color_Color.names.set("dark salmon",thx_color_Color.darksalmon);
var value33 = thx_color_Color.darkseagreen = 9419919;
thx_color_Color.names.set("darkseagreen",value33);
thx_color_Color.names.set("dark sea green",thx_color_Color.darkseagreen);
var value34 = thx_color_Color.darkslateblue = 4734347;
thx_color_Color.names.set("darkslateblue",value34);
thx_color_Color.names.set("dark slate blue",thx_color_Color.darkslateblue);
var value35 = thx_color_Color.darkslategray = thx_color_Color.darkslategrey = 3100495;
thx_color_Color.names.set("darkslategray",value35);
thx_color_Color.names.set("dark slate gray",thx_color_Color.darkslategray);
thx_color_Color.names.set("darkslategrey",thx_color_Color.darkslategrey);
thx_color_Color.names.set("dark slate grey",thx_color_Color.darkslategrey);
var value36 = thx_color_Color.darkturquoise = 52945;
thx_color_Color.names.set("darkturquoise",value36);
thx_color_Color.names.set("dark turquoise",thx_color_Color.darkturquoise);
var value37 = thx_color_Color.darkviolet = 9699539;
thx_color_Color.names.set("darkviolet",value37);
thx_color_Color.names.set("dark violet",thx_color_Color.darkviolet);
var value38 = thx_color_Color.deeppink = 16716947;
thx_color_Color.names.set("deeppink",value38);
thx_color_Color.names.set("deep pink",thx_color_Color.deeppink);
var value39 = thx_color_Color.deepskyblue = 49151;
thx_color_Color.names.set("deepskyblue",value39);
thx_color_Color.names.set("deep sky blue",thx_color_Color.deepskyblue);
var value40 = thx_color_Color.dimgray = thx_color_Color.dimgrey = 6908265;
thx_color_Color.names.set("dimgray",value40);
thx_color_Color.names.set("dim gray",thx_color_Color.dimgray);
thx_color_Color.names.set("dimgrey",thx_color_Color.dimgrey);
thx_color_Color.names.set("dim grey",thx_color_Color.dimgrey);
var value41 = thx_color_Color.dodgerblue = 2003199;
thx_color_Color.names.set("dodgerblue",value41);
thx_color_Color.names.set("dodger blue",thx_color_Color.dodgerblue);
var value42 = thx_color_Color.firebrick = 11674146;
thx_color_Color.names.set("firebrick",value42);
thx_color_Color.names.set("fire brick",thx_color_Color.firebrick);
var value43 = thx_color_Color.floralwhite = 16775920;
thx_color_Color.names.set("floralwhite",value43);
thx_color_Color.names.set("floral white",thx_color_Color.floralwhite);
var value44 = thx_color_Color.forestgreen = 2263842;
thx_color_Color.names.set("forestgreen",value44);
thx_color_Color.names.set("forest green",thx_color_Color.forestgreen);
var value45 = thx_color_Color.fuchsia = 16711935;
thx_color_Color.names.set("fuchsia",value45);
var value46 = thx_color_Color.gainsboro = 14474460;
thx_color_Color.names.set("gainsboro",value46);
var value47 = thx_color_Color.ghostwhite = 16316671;
thx_color_Color.names.set("ghostwhite",value47);
thx_color_Color.names.set("ghost white",thx_color_Color.ghostwhite);
var value48 = thx_color_Color.gold = 16766720;
thx_color_Color.names.set("gold",value48);
var value49 = thx_color_Color.goldenrod = 14329120;
thx_color_Color.names.set("goldenrod",value49);
thx_color_Color.names.set("golden rod",thx_color_Color.goldenrod);
var value50 = thx_color_Color.gray = thx_color_Color.grey = 8421504;
thx_color_Color.names.set("gray",value50);
thx_color_Color.names.set("grey",thx_color_Color.grey);
var value51 = thx_color_Color.green = 32768;
thx_color_Color.names.set("green",value51);
var value52 = thx_color_Color.greenyellow = 11403055;
thx_color_Color.names.set("greenyellow",value52);
thx_color_Color.names.set("green yellow",thx_color_Color.greenyellow);
var value53 = thx_color_Color.honeydew = 15794160;
thx_color_Color.names.set("honeydew",value53);
thx_color_Color.names.set("honey dew",thx_color_Color.honeydew);
var value54 = thx_color_Color.hotpink = 16738740;
thx_color_Color.names.set("hotpink",value54);
thx_color_Color.names.set("hot pink",thx_color_Color.hotpink);
var value55 = thx_color_Color.indianred = 13458524;
thx_color_Color.names.set("indianred",value55);
thx_color_Color.names.set("indian red",thx_color_Color.indianred);
var value56 = thx_color_Color.indigo = 4915330;
thx_color_Color.names.set("indigo",value56);
var value57 = thx_color_Color.ivory = 16777200;
thx_color_Color.names.set("ivory",value57);
var value58 = thx_color_Color.khaki = 15787660;
thx_color_Color.names.set("khaki",value58);
var value59 = thx_color_Color.lavender = 15132410;
thx_color_Color.names.set("lavender",value59);
var value60 = thx_color_Color.lavenderblush = 16773365;
thx_color_Color.names.set("lavenderblush",value60);
thx_color_Color.names.set("lavender blush",thx_color_Color.lavenderblush);
var value61 = thx_color_Color.lawngreen = 8190976;
thx_color_Color.names.set("lawngreen",value61);
thx_color_Color.names.set("lawn green",thx_color_Color.lawngreen);
var value62 = thx_color_Color.lemonchiffon = 16775885;
thx_color_Color.names.set("lemonchiffon",value62);
thx_color_Color.names.set("lemon chiffon",thx_color_Color.lemonchiffon);
var value63 = thx_color_Color.lightblue = 11393254;
thx_color_Color.names.set("lightblue",value63);
thx_color_Color.names.set("light blue",thx_color_Color.lightblue);
var value64 = thx_color_Color.lightcoral = 15761536;
thx_color_Color.names.set("lightcoral",value64);
thx_color_Color.names.set("light coral",thx_color_Color.lightcoral);
var value65 = thx_color_Color.lightcyan = 14745599;
thx_color_Color.names.set("lightcyan",value65);
thx_color_Color.names.set("light cyan",thx_color_Color.lightcyan);
var value66 = thx_color_Color.lightgoldenrodyellow = 16448210;
thx_color_Color.names.set("lightgoldenrodyellow",value66);
thx_color_Color.names.set("light golden rod yellow",thx_color_Color.lightgoldenrodyellow);
var value67 = thx_color_Color.lightgray = thx_color_Color.lightgrey = 13882323;
thx_color_Color.names.set("lightgray",value67);
thx_color_Color.names.set("light gray",thx_color_Color.lightgray);
thx_color_Color.names.set("lightgrey",thx_color_Color.lightgrey);
thx_color_Color.names.set("light grey",thx_color_Color.lightgrey);
var value68 = thx_color_Color.lightgreen = 9498256;
thx_color_Color.names.set("lightgreen",value68);
thx_color_Color.names.set("light green",thx_color_Color.lightgreen);
var value69 = thx_color_Color.lightpink = 16758465;
thx_color_Color.names.set("lightpink",value69);
thx_color_Color.names.set("light pink",thx_color_Color.lightpink);
var value70 = thx_color_Color.lightsalmon = 16752762;
thx_color_Color.names.set("lightsalmon",value70);
thx_color_Color.names.set("light salmon",thx_color_Color.lightsalmon);
var value71 = thx_color_Color.lightseagreen = 2142890;
thx_color_Color.names.set("lightseagreen",value71);
thx_color_Color.names.set("light sea green",thx_color_Color.lightseagreen);
var value72 = thx_color_Color.lightskyblue = 8900346;
thx_color_Color.names.set("lightskyblue",value72);
thx_color_Color.names.set("light sky blue",thx_color_Color.lightskyblue);
var value73 = thx_color_Color.lightslategray = thx_color_Color.lightslategrey = 7833753;
thx_color_Color.names.set("lightslategray",value73);
thx_color_Color.names.set("light slate gray",thx_color_Color.lightslategray);
thx_color_Color.names.set("lightslategrey",thx_color_Color.lightslategrey);
thx_color_Color.names.set("light slate grey",thx_color_Color.lightslategrey);
var value74 = thx_color_Color.lightsteelblue = 11584734;
thx_color_Color.names.set("lightsteelblue",value74);
thx_color_Color.names.set("light steel blue",thx_color_Color.lightsteelblue);
var value75 = thx_color_Color.lightyellow = 16777184;
thx_color_Color.names.set("lightyellow",value75);
thx_color_Color.names.set("light yellow",thx_color_Color.lightyellow);
var value76 = thx_color_Color.lime = 65280;
thx_color_Color.names.set("lime",value76);
var value77 = thx_color_Color.limegreen = 3329330;
thx_color_Color.names.set("limegreen",value77);
thx_color_Color.names.set("lime green",thx_color_Color.limegreen);
var value78 = thx_color_Color.linen = 16445670;
thx_color_Color.names.set("linen",value78);
var value79 = thx_color_Color.magenta = 16711935;
thx_color_Color.names.set("magenta",value79);
var value80 = thx_color_Color.maroon = 8388608;
thx_color_Color.names.set("maroon",value80);
var value81 = thx_color_Color.mediumaquamarine = 6737322;
thx_color_Color.names.set("mediumaquamarine",value81);
thx_color_Color.names.set("mediuma quamarine",thx_color_Color.mediumaquamarine);
var value82 = thx_color_Color.mediumblue = 205;
thx_color_Color.names.set("mediumblue",value82);
thx_color_Color.names.set("medium blue",thx_color_Color.mediumblue);
var value83 = thx_color_Color.mediumorchid = 12211667;
thx_color_Color.names.set("mediumorchid",value83);
thx_color_Color.names.set("medium orchid",thx_color_Color.mediumorchid);
var value84 = thx_color_Color.mediumpurple = 9662683;
thx_color_Color.names.set("mediumpurple",value84);
thx_color_Color.names.set("medium purple",thx_color_Color.mediumpurple);
var value85 = thx_color_Color.mediumseagreen = 3978097;
thx_color_Color.names.set("mediumseagreen",value85);
thx_color_Color.names.set("medium sea green",thx_color_Color.mediumseagreen);
var value86 = thx_color_Color.mediumslateblue = 8087790;
thx_color_Color.names.set("mediumslateblue",value86);
thx_color_Color.names.set("medium slate blue",thx_color_Color.mediumslateblue);
var value87 = thx_color_Color.mediumspringgreen = 64154;
thx_color_Color.names.set("mediumspringgreen",value87);
thx_color_Color.names.set("medium spring green",thx_color_Color.mediumspringgreen);
var value88 = thx_color_Color.mediumturquoise = 4772300;
thx_color_Color.names.set("mediumturquoise",value88);
thx_color_Color.names.set("medium turquoise",thx_color_Color.mediumturquoise);
var value89 = thx_color_Color.mediumvioletred = 13047173;
thx_color_Color.names.set("mediumvioletred",value89);
thx_color_Color.names.set("medium violet red",thx_color_Color.mediumvioletred);
var value90 = thx_color_Color.midnightblue = 1644912;
thx_color_Color.names.set("midnightblue",value90);
thx_color_Color.names.set("midnight blue",thx_color_Color.midnightblue);
var value91 = thx_color_Color.mintcream = 16121850;
thx_color_Color.names.set("mintcream",value91);
thx_color_Color.names.set("mint cream",thx_color_Color.mintcream);
var value92 = thx_color_Color.mistyrose = 16770273;
thx_color_Color.names.set("mistyrose",value92);
thx_color_Color.names.set("misty rose",thx_color_Color.mistyrose);
var value93 = thx_color_Color.moccasin = 16770229;
thx_color_Color.names.set("moccasin",value93);
var value94 = thx_color_Color.navajowhite = 16768685;
thx_color_Color.names.set("navajowhite",value94);
thx_color_Color.names.set("navajo white",thx_color_Color.navajowhite);
var value95 = thx_color_Color.navy = 128;
thx_color_Color.names.set("navy",value95);
var value96 = thx_color_Color.oldlace = 16643558;
thx_color_Color.names.set("oldlace",value96);
thx_color_Color.names.set("old lace",thx_color_Color.oldlace);
var value97 = thx_color_Color.olive = 8421376;
thx_color_Color.names.set("olive",value97);
var value98 = thx_color_Color.olivedrab = 7048739;
thx_color_Color.names.set("olivedrab",value98);
thx_color_Color.names.set("olive drab",thx_color_Color.olivedrab);
var value99 = thx_color_Color.orange = 16753920;
thx_color_Color.names.set("orange",value99);
var value100 = thx_color_Color.orangered = 16729344;
thx_color_Color.names.set("orangered",value100);
thx_color_Color.names.set("orange red",thx_color_Color.orangered);
var value101 = thx_color_Color.orchid = 14315734;
thx_color_Color.names.set("orchid",value101);
var value102 = thx_color_Color.palegoldenrod = 15657130;
thx_color_Color.names.set("palegoldenrod",value102);
thx_color_Color.names.set("pale golden rod",thx_color_Color.palegoldenrod);
var value103 = thx_color_Color.palegreen = 10025880;
thx_color_Color.names.set("palegreen",value103);
thx_color_Color.names.set("pale green",thx_color_Color.palegreen);
var value104 = thx_color_Color.paleturquoise = 11529966;
thx_color_Color.names.set("paleturquoise",value104);
thx_color_Color.names.set("pale turquoise",thx_color_Color.paleturquoise);
var value105 = thx_color_Color.palevioletred = 14381203;
thx_color_Color.names.set("palevioletred",value105);
thx_color_Color.names.set("pale violet red",thx_color_Color.palevioletred);
var value106 = thx_color_Color.papayawhip = 16773077;
thx_color_Color.names.set("papayawhip",value106);
thx_color_Color.names.set("papaya whip",thx_color_Color.papayawhip);
var value107 = thx_color_Color.peachpuff = 16767673;
thx_color_Color.names.set("peachpuff",value107);
thx_color_Color.names.set("peach puff",thx_color_Color.peachpuff);
var value108 = thx_color_Color.peru = 13468991;
thx_color_Color.names.set("peru",value108);
var value109 = thx_color_Color.pink = 16761035;
thx_color_Color.names.set("pink",value109);
var value110 = thx_color_Color.plum = 14524637;
thx_color_Color.names.set("plum",value110);
var value111 = thx_color_Color.powderblue = 11591910;
thx_color_Color.names.set("powderblue",value111);
thx_color_Color.names.set("powder blue",thx_color_Color.powderblue);
var value112 = thx_color_Color.purple = 8388736;
thx_color_Color.names.set("purple",value112);
var value113 = thx_color_Color.red = 16711680;
thx_color_Color.names.set("red",value113);
var value114 = thx_color_Color.rosybrown = 12357519;
thx_color_Color.names.set("rosybrown",value114);
thx_color_Color.names.set("rosy brown",thx_color_Color.rosybrown);
var value115 = thx_color_Color.royalblue = 4286945;
thx_color_Color.names.set("royalblue",value115);
thx_color_Color.names.set("royal blue",thx_color_Color.royalblue);
var value116 = thx_color_Color.saddlebrown = 9127187;
thx_color_Color.names.set("saddlebrown",value116);
thx_color_Color.names.set("saddle brown",thx_color_Color.saddlebrown);
var value117 = thx_color_Color.salmon = 16416882;
thx_color_Color.names.set("salmon",value117);
var value118 = thx_color_Color.sandybrown = 16032864;
thx_color_Color.names.set("sandybrown",value118);
thx_color_Color.names.set("sandy brown",thx_color_Color.sandybrown);
var value119 = thx_color_Color.seagreen = 3050327;
thx_color_Color.names.set("seagreen",value119);
thx_color_Color.names.set("sea green",thx_color_Color.seagreen);
var value120 = thx_color_Color.seashell = 16774638;
thx_color_Color.names.set("seashell",value120);
thx_color_Color.names.set("sea shell",thx_color_Color.seashell);
var value121 = thx_color_Color.sienna = 10506797;
thx_color_Color.names.set("sienna",value121);
var value122 = thx_color_Color.silver = 12632256;
thx_color_Color.names.set("silver",value122);
var value123 = thx_color_Color.skyblue = 8900331;
thx_color_Color.names.set("skyblue",value123);
thx_color_Color.names.set("sky blue",thx_color_Color.skyblue);
var value124 = thx_color_Color.slateblue = 6970061;
thx_color_Color.names.set("slateblue",value124);
thx_color_Color.names.set("slate blue",thx_color_Color.slateblue);
var value125 = thx_color_Color.slategray = thx_color_Color.slategrey = 7372944;
thx_color_Color.names.set("slategray",value125);
thx_color_Color.names.set("slate gray",thx_color_Color.slategray);
thx_color_Color.names.set("slategrey",thx_color_Color.slategrey);
thx_color_Color.names.set("slate grey",thx_color_Color.slategrey);
var value126 = thx_color_Color.snow = 16775930;
thx_color_Color.names.set("snow",value126);
var value127 = thx_color_Color.springgreen = 65407;
thx_color_Color.names.set("springgreen",value127);
thx_color_Color.names.set("spring green",thx_color_Color.springgreen);
var value128 = thx_color_Color.steelblue = 4620980;
thx_color_Color.names.set("steelblue",value128);
thx_color_Color.names.set("steel blue",thx_color_Color.steelblue);
var value129 = thx_color_Color.tan = 13808780;
thx_color_Color.names.set("tan",value129);
var value130 = thx_color_Color.teal = 32896;
thx_color_Color.names.set("teal",value130);
var value131 = thx_color_Color.thistle = 14204888;
thx_color_Color.names.set("thistle",value131);
var value132 = thx_color_Color.tomato = 16737095;
thx_color_Color.names.set("tomato",value132);
var value133 = thx_color_Color.turquoise = 4251856;
thx_color_Color.names.set("turquoise",value133);
var value134 = thx_color_Color.violet = 15631086;
thx_color_Color.names.set("violet",value134);
var value135 = thx_color_Color.wheat = 16113331;
thx_color_Color.names.set("wheat",value135);
var value136 = thx_color_Color.white = 16777215;
thx_color_Color.names.set("white",value136);
var value137 = thx_color_Color.whitesmoke = 16119285;
thx_color_Color.names.set("whitesmoke",value137);
thx_color_Color.names.set("white smoke",thx_color_Color.whitesmoke);
var value138 = thx_color_Color.yellow = 16776960;
thx_color_Color.names.set("yellow",value138);
var value139 = thx_color_Color.yellowgreen = 10145074;
thx_color_Color.names.set("yellowgreen",value139);
thx_color_Color.names.set("yellow green",thx_color_Color.yellowgreen);
chad_components_LineStyle.constructionLine = new chad_components_LineStyle(chad_components_Style.ConstructionLine);
chad_components_Selected.instance = new chad_components_Selected();
chad_systems_RenderSelected.size = 8;
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = {}.toString;
thx_Floats.TOLERANCE = 10e-5;
thx_Floats.EPSILON = 10e-10;
thx_Floats.pattern_parse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
thx_Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
thx_Ints.BASE = "0123456789abcdefghijklmnopqrstuvwxyz";
thx_Strings.UCWORDS = new EReg("[^a-zA-Z]([a-z])","g");
thx_Strings.UCWORDSWS = new EReg("\\s[a-z]","g");
thx_Strings.ALPHANUM = new EReg("^[a-z0-9]+$","i");
thx_Strings.DIGITS = new EReg("^[0-9]+$","");
thx_Strings.STRIPTAGS = new EReg("</?[a-z]+[^>]*?/?>","gi");
thx_Strings.WSG = new EReg("\\s+","g");
thx_Strings.SPLIT_LINES = new EReg("\r\n|\n\r|\n|\r","g");
thx_Timer.FRAME_RATE = Math.round(16.6666666666666679);
thx_color__$Grey_Grey_$Impl_$.black = 0;
thx_color__$Grey_Grey_$Impl_$.white = 1;
thx_color_parse_ColorParser.parser = new thx_color_parse_ColorParser();
thx_color_parse_ColorParser.isPureHex = new EReg("^([0-9a-f]{2}){3,4}$","i");
thx_geom__$Matrix23_Matrix23_$Impl_$.identity = (function($this) {
	var $r;
	var m = new thx_geom_core_ImmutableM23(1,0,0,1,0,0);
	$r = m;
	return $r;
}(this));
thx_geom_d2__$Point_Point_$Impl_$.zero = new thx_geom_core_ImmutableXY(0,0);
thx_geom_d2__$Vector_Vector_$Impl_$.zero = new thx_geom_core_ImmutableXY(0,0);
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
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
