function object(o) {
  if(!(this instanceof object)) return new object(o)
  o && this.extend(o)
  this.initialize && this.initialize(o)
}

object.prototype.extend = function (o) {
  for(var key in o)
    this[key] = o[key]
  return this
}

object.prototype.toJSON = function() {
  var ret = {}
    , keys = Object.keys(this)
    , i = keys.length;
  
  while (i--) {
    ret[keys[i]] = this[keys[i]];
  }
  return ret
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

// export if we're in node
if(typeof module != 'undefined') module.exports = object;