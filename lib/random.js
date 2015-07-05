/*************
  Handle our random event
*************/
var _ = require('underscore');

// handle a random list
var randomList = function(message, callback) {

  // get the message text
  var str = message.text;

  // remove 'random '
  str = str.replace('/^<@U[a-zA-Z0-9]+>: random /i', '');

  // split the list
  str = str.split(",");

  // tidy it up
  for (var s in str) {
    str[s] = str[s].trim();
  }

  // pick something at random and return!
  setImmediate(function() {
    return callback(null, _.shuffle(str)[0]);
  })

}

module.exports = {
  randomList: randomList
}