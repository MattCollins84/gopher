var should = require('should');
var random = require('./lib/random.js');

it('should take a random list action and pick a random option', function(done) {

  var names = ["matt", "john", "steve"]
  var action = "random matt, john, steve";

  random.randomList(action, function(err, data) {

    data.should.be.a.String;
    names.should.include(data);

    return done();

  });

});

it('should take a random number range and pick a number between 1 and 10', function(done) {

  var action = "random 1-10";

  random.randomRange(action, function(err, data) {

    data.should.be.a.Number;

    (data >= 1 && data <= 10).should.be.true;

    return done();

  });

});

it('should take a random number range and pick a number between 1 and 10, with spaces around the dash', function(done) {

  var action = "random 20 - 40";

  random.randomRange(action, function(err, data) {

    data.should.be.a.Number;

    (data >= 20 && data <= 40).should.be.true;

    return done();

  });

});

it('should take a random number range but fail because the first number is higher', function(done) {

  var action = "random 20 - 10";

  random.randomRange(action, function(err, data) {

    (typeof err === "string").should.be.true;

    (data === null).should.be.true;

    return done();

  });

});