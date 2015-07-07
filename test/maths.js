var should = require('should');
var maths = require('./lib/maths.js');

it('should take a list of numbers and return an average that is a integer', function(done) {

  var action = "average 5, 20, 5";

  maths.average(action, function(err, data) {

    data.should.be.a.Number;
    data.should.be.equal(10);

    return done();

  });

});

it('should take a list of numbers and return an average that is a decimal', function(done) {

  var action = "average 5, 10, 5, 1";

  maths.average(action, function(err, data) {

    data.should.be.a.Number;
    data.should.be.equal(5.25);

    return done();

  });

});