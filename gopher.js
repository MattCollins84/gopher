// config
var config = require('./lib/config.json');

// bot lib and event handler
var Bot = require('./lib/bot.js');
var EventHandler = require('./lib/event_handler.js')();

// my bots
var bots = {
  gopher: {
    bot: new Bot(config.gopher, EventHandler)
  }
}