// config
var config = require('./lib/config.json');

// bot lib
var Bot = require('./lib/bot.js');

var bots = {
  gopher: {
    bot: new Bot(config.gopher)
  }
}