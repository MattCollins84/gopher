/*************
  Handle our random event
*************/
var _ = require('underscore');

// handle a random list
var randomList = function(str, callback) {

  // remove the random
  str = str.replace(/^random /i, '');

  // split the list
  str = str.split(",");

  // tidy it up
  for (var s in str) {
    str[s] = str[s].trim();
  }

  // pick something at random and return!
  return setImmediate(function() {
    return callback(null, _.shuffle(str)[0]);
  });

}

// pick a random number between from and to
var randomRange = function(str, callback) {

  // remove the random
  str = str.replace(/^random /i, '');

  var numbers = str.split("-");
  for (var n in numbers) {
    numbers[n] = parseInt(numbers[n]);
  }
  var from = numbers[0];
  var to = numbers[1];

  // is from lower than to?
  if (from >= to) {
    return setImmediate(function() {
      return callback("Oops! Correct syntax is random <from>-<to>, where <from> is lower than <to>", null);
    })
  }

  return callback(null, Math.floor(Math.random()*(to-from+1)+from));

}

module.exports = {
  randomList: randomList,
  randomRange: randomRange
}