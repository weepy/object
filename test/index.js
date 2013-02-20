var assert = require('assert')
  , object = require('..');

describe('object()', function(){
  describe('with an argument', function(){
    var o = object({a:1, b:2})

    it('should create a new object with properties', function(){
      assert(o instanceof object)
      assert(o.a==1)
    })

    it('should extend with new properties', function(){
      o.extend({c:2, b:4})
      assert(o instanceof object)
      assert(o.a==1)
      assert(o.c==2)
      assert(o.b==4)
    })

    it('iterate over properties', function(){
      var expect = { a:1, c:2, b:4}
        , calls = 0
      o.each(function(key, val) {
        assert( expect[key] == val)
        calls++
      })
      assert(calls == 3)
    })

    it('calls initialize if present', function(){
      var ok = false
      var o = object({initialize: function() {
        ok = true
      }})
      assert(ok)
    })

  })

  describe('with no argument', function(){
    it('should create a new object no properties', function(){
      var o = object()
      assert( object.keys(o).length == 0 )
    })
  })

})

describe('object', function(){
  describe('keys', function(){
    it('equals the list of keys', function(){
      var o = object({a:1, b:2})
      assert( object.keys(o).join(' ') == 'a b')
    })
  })

  describe('toJSON', function(){
    it('creates a bare object with properties', function(){
      var o = object({a:1, b:2})
      var x = object.toJSON(o)      
      assert(x instanceof Object)
      assert(!(x instanceof object))
      assert(x.a == 1)
      assert(x.b == 2)
    })
  })

  describe('extend', function(){
    var sub = object.extend({ a:1, b: function() { } })
    var s = sub({x:2})

    it('creates a sub class with prototypical props', function(){
      assert(s.a == 1)
      assert(s.x == 2)
      assert(typeof s.b == 'function')
    })

    it('creates proper inheritance', function(){
      assert(s instanceof Object)
      assert(s instanceof object)
      assert(s instanceof sub)
    })

    it('calls initialize', function(){
      var ok = false
      var sub = object.extend({ a:1, initialize: function() { 
        ok = true
      }})

      var s = sub()
      assert(ok)

    })
    
    describe('sub sub class ', function(){
      var subsub = sub.extend({ d:4, b: 5 })
      var s = subsub({ y:2})
      assert(s instanceof Object)
      assert(s instanceof object)
      assert(s instanceof sub)
      assert(s instanceof subsub)
      assert( s.d == 4)
      assert( s.b == 5)
      assert( s.y == 2)
      assert( s.a == 1)
    })


  })  

  



})

