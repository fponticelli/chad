(function (console) { "use strict";
var Main = function() { };
Main.main = function() {
	console.log("hello");
};
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
