// config
var config = require('./lib/config.json');

// bot lib
var Bot = require('./lib/bot.js');

// my bots
var bots = {
  gopher: {
    bot: new Bot(config.gopher)
  },
  ant: {
    bot: new Bot(config.ant)
  }
}