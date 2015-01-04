package chad.render;

@:enum
abstract Join(String) to String {
  var miter = "miter";
  var round = "round";
  var bevel = "bevel";
}