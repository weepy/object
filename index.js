function object(o) {
  if(!(this instanceof object)) return new object(o)
  o && this.extend(o)
  this.initialize && this.initialize(o)
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

object.extend = function(methods) {
  methods = methods || {}
  var parent = this

  // copy of object constructor
  function object(o) {
    if(!(this instanceof object)) return new object(o)
    o && this.extend(o)
    this.initialize && this.initialize(o)
  }

  function ctor() {}
  ctor.prototype = parent.prototype
  object.prototype = new ctor()
  object.prototype.constructor = object;

    
  for(var i in methods) {
    object.prototype[i] = methods[i]
  }
  
  object.extend = parent.extend
  return object
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