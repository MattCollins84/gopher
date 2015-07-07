/*************
  Handle our random event
*************/
var _ = require('underscore');

// average a list of numbers
var average = function(str, callback) {

  // remove the random
  str = str.replace(/^average /i, '');

  // split the list
  str = str.split(",");

  // tidy it up
  var sum = 0;
  for (var s in str) {
    if (!str[s] && str[s] !== "0") continue; // ignore any false (empty strings etc..)
    console.log('n', str[s])
    str[s] = parseFloat(str[s]);
    console.log('p', str[s])
    sum += str[s];
    console.log('+', sum);
  }



  // get the average
  var avg = (sum/str.length);

  console.log(avg);
  console.log(typeof avg);

  // pick something at random and return!
  return setImmediate(function() {
    return callback(null, avg);
  });

}

module.exports = {
  average: average
}