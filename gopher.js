// bot lib and event handler
var Bot = require('./lib/bot.js');

module.exports = function(token, opts) {
  
  return new Bot(token, opts)

}