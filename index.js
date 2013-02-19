function object(o) {
  if(!(this instanceof object)) return new object(o)
  o && this.extend(o)
  this.initialize && this.initialize()
}

object.prototype.each = function(fn) {

  for(var key in this) {
    if(this.hasOwnProperty(key)) 
      fn( key, this[key] )  
  }
}

object.prototype.extend = function (o) {
  for(var key in o)
    this[key] = o[key]
}


object.extend = function(proto) {
  var parent = this
  var child = function(o) {
    if(this instanceof child)
      parent.call(this, o)
    else
      return new child(o)
  }

  function ctor() {}
  ctor.prototype = parent.prototype
  child.prototype = new ctor()
  child.prototype.constructor = child;

  for(var i in proto) {
    child.prototype[i] = proto[i]
  }

  child.extend = parent.extend
  return child
}


module.exports = object