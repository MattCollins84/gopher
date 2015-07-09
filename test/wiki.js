var should = require('should');
var wiki = require('./lib/wiki.js');

it('should take a query that returns a single page', function(done) {

  var action = "wiki Patrick Bamford";

  wiki.get(action, function(err, data) {

    data.should.be.a.String;
    data.match(/^\n>Patrick James Bamford/).should.be.an.Array;

    return done();

  });

});

it('should take a query that returns a single page, that is a reference to the actual page', function(done) {

  var action = "wiki middlesbrough fc";

  wiki.get(action, function(err, data) {

    data.should.be.a.String;
    data.match(/^\n>Middlesbrough Football Club/).should.be.an.Array;

    return done();

  });

});

it('should take a query that returns a multiple pages, and return some options', function(done) {

  var action = "wiki George Bush";

  wiki.get(action, function(err, data) {

    data.should.be.a.String;
    data.match(/^Quite a few options, try one of these:/).should.be.an.Array;

    return done();

  });

});

it('should handle the same query in lowercase', function(done) {

  var action = "wiki george bush";

  wiki.get(action, function(err, data) {

    data.should.be.a.String;
    data.match(/^Quite a few options, try one of these:/).should.be.an.Array;

    return done();

  });

});

it('should take some nonesense and return a suitable error', function(done) {

  var action = "wiki jkahdfksdf";

  wiki.get(action, function(err, data) {

    err.should.be.a.String;
    err.should.be.equal("This is too confusing, I give up :|")

    return done();

  });

});