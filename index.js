function object(o) {
  if(!(this instanceof object)) return new object(o)
  o && this.extend(o)
  this.initialize && this.initialize()
}

object.prototype.each = function(fn) {
  var keys = object.keys(this)
  for(var i=0; i<keys.length; i++) {
    var key = keys[i]
    fn( key, this[key] )
  }
}

object.prototype.extend = function (o) {
  for(var key in o)
    this[key] = o[key]
}

object.extend = function(proto) {
  var parent = this

  // copy of object constructor
  function child(o) {
    if(!(this instanceof child)) return new child(o)
    o && this.extend(o)
    this.initialize && this.initialize()
  }

  function ctor() {}
  ctor.prototype = parent.prototype
  child.prototype = new ctor()
  child.prototype.constructor = child;

  if(proto)
    for(var i in proto) {
      child.prototype[i] = proto[i]
    }
  
  child.extend = parent.extend
  return child
}

object.keys = Object.keys

object.toJSON = function(o) {
  var ret = {}
  o.each(function(key, val) {
    ret[key] = val
  })
  return ret
}

// export if we're in node
if(typeof module != 'undefined') module.exports = object;
