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
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
var chad_Chad = function(svg) {
	this.svg = svg;
	this.layers = [];
	this.world = new edge_World(15);
	this.addSystems();
	var layer = this.addLayer("my layer");
	var p1 = new thx_geom_core_MutableXY(60,60);
	var p2 = new thx_geom_core_MutableXY(90,80);
	this.world.engine.create([thx_geom_d2_Circle.fromPoints(p1,p2),chad_components_LineStyle.constructionLine,layer]);
	var incr = 1;
	thx_Timer.repeat(function() {
		var v = p1.get_x() + incr;
		p1.set_x(v);
		var v1 = p2.get_y() + incr;
		p2.set_y(v1);
		if(p1.get_x() > 300) incr = -1; else if(p1.get_x() < 40) incr = 1;
	},10);
	this.world.start();
};
chad_Chad.__name__ = ["chad","Chad"];
chad_Chad.prototype = {
	addLayer: function(name) {
		if(null != this.getLayer(name)) throw new js__$Boot_HaxeError("layer \"" + name + "\" already exists");
		var layer = new chad_components_Layer();
		this.layers.push({ _0 : name, _1 : layer});
		return layer;
	}
	,getLayer: function(name) {
		return thx_Arrays.find(this.layers,function(t) {
			return t._0 == name;
		});
	}
	,addSystems: function() {
		this.world.render.add(new chad_systems_LayerGroupProvider(this.svg));
		this.world.render.add(new chad_systems_RenderCircle());
	}
	,__class__: chad_Chad
};
var edge_IComponent = function() { };
edge_IComponent.__name__ = ["edge","IComponent"];
var chad_components_Layer = function() {
	this.group = null;
};
chad_components_Layer.__name__ = ["chad","components","Layer"];
chad_components_Layer.__interfaces__ = [edge_IComponent];
chad_components_Layer.prototype = {
	toString: function(group) {
		return "Layer(group=$group)";
	}
	,__class__: chad_components_Layer
};
var chad_components_Style = { __ename__ : true, __constructs__ : ["ConstructionLine"] };
chad_components_Style.ConstructionLine = ["ConstructionLine",0];
chad_components_Style.ConstructionLine.toString = $estr;
chad_components_Style.ConstructionLine.__enum__ = chad_components_Style;
var chad_components_LineStyle = function(value) {
	this.value = value;
};
chad_components_LineStyle.__name__ = ["chad","components","LineStyle"];
chad_components_LineStyle.__interfaces__ = [edge_IComponent];
chad_components_LineStyle.applyTo = function(style,node) {
	var _g = style.value;
	node.setAttribute("fill","none");
	node.setAttribute("stroke-width","1");
	node.setAttribute("stroke","#666666");
	node.setAttribute("stroke-dasharray","5, 3");
};
chad_components_LineStyle.prototype = {
	toString: function() {
		return "LineStyle()";
	}
	,__class__: chad_components_LineStyle
};
var edge_ISystem = function() { };
edge_ISystem.__name__ = ["edge","ISystem"];
edge_ISystem.prototype = {
	__class__: edge_ISystem
};
var chad_systems_LayerGroupProvider = function(svg) {
	this.svg = svg;
	this.__process__ = new chad_systems_LayerGroupProvider_$SystemProcess(this);
};
chad_systems_LayerGroupProvider.__name__ = ["chad","systems","LayerGroupProvider"];
chad_systems_LayerGroupProvider.__interfaces__ = [edge_ISystem];
chad_systems_LayerGroupProvider.prototype = {
	updateAdded: function(entity,data) {
		var g = this.svg.ownerDocument.createElementNS("http://www.w3.org/2000/svg","g");
		data.layer.group = g;
		this.svg.appendChild(g);
	}
	,updateRemoved: function(entity,data) {
		this.svg.removeChild(data.layer.group);
		data.layer.group = null;
	}
	,update: function(layer) {
		return true;
	}
	,toString: function() {
		return "chad.systems.LayerGroupProvider";
	}
	,__class__: chad_systems_LayerGroupProvider
};
var edge_core_ISystemProcess = function() { };
edge_core_ISystemProcess.__name__ = ["edge","core","ISystemProcess"];
edge_core_ISystemProcess.prototype = {
	__class__: edge_core_ISystemProcess
};
var chad_systems_LayerGroupProvider_$SystemProcess = function(system) {
	this.system = system;
	this.updateItems = new edge_View();
};
chad_systems_LayerGroupProvider_$SystemProcess.__name__ = ["chad","systems","LayerGroupProvider_SystemProcess"];
chad_systems_LayerGroupProvider_$SystemProcess.__interfaces__ = [edge_core_ISystemProcess];
chad_systems_LayerGroupProvider_$SystemProcess.prototype = {
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
			result = this.system.update(data.layer);
			if(!result) break;
		}
		return result;
	}
	,updateMatchRequirements: function(entity) {
		var removed = this.updateItems.tryRemove(entity);
		var count = 1;
		var o = { layer : null};
		var $it0 = entity.map.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			if(js_Boot.__instanceof(component,chad_components_Layer)) {
				o.layer = component;
				if(--count == 0) break; else continue;
			}
		}
		var added = count == 0 && this.updateItems.tryAdd(entity,o);
		if(null != removed && !added) this.system.updateRemoved(entity,removed);
		if(added && null == removed) this.system.updateAdded(entity,o);
	}
	,__class__: chad_systems_LayerGroupProvider_$SystemProcess
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
		chad_components_LineStyle.applyTo(data.style,circle);
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
		var type = Type.getClassName(component == null?null:js_Boot.getClass(component));
		if(this.map.exists(type)) this.remove(this.map.get(type));
		this.map.set(type,component);
	}
	,_remove: function(component) {
		var type = Type.getClassName(component == null?null:js_Boot.getClass(component));
		this._removeTypeName(type);
	}
	,_removeTypeName: function(type) {
		this.map.remove(type);
	}
	,key: function(component) {
		return Type.getClassName(component == null?null:js_Boot.getClass(component));
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
var thx_geom_d2_Circle = function(center,radius) {
	this.center = center;
	this.radius = radius;
};
thx_geom_d2_Circle.__name__ = ["thx","geom","d2","Circle"];
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
	,__class__: thx_geom_d2_Circle
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
	return new thx_geom_core_MutableXY(arr[0],arr[1]);
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
var thx_math_Const = function() { };
thx_math_Const.__name__ = ["thx","math","Const"];
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
chad_components_LineStyle.constructionLine = new chad_components_LineStyle(chad_components_Style.ConstructionLine);
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
