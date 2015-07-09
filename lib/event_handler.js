/**************
  Event handler for our bot
**************/
var _ = require('underscore');

var actions = {

  // pick random number from a range of numbers
  // @gopher: random 5-20
  randomList: {
    private: false,
    direct: true,
    regex: ["random [0-9]+\s?-\s?[0-9]+"],
    action: {
      lib: "./random.js",
      callback: "randomRange"
    }
  },

  // pick something random from comma separated list e.g.
  // @gopher: random john,dave,steve
  random: {
    private: false,
    direct: true,
    regex: ["random .*"],
    action: {
      lib: "./random.js",
      callback: "randomList"
    }
  },

  // pick something random from comma separated list e.g.
  // @gopher: random john,dave,steve
  average: {
    private: false,
    direct: true,
    regex: ["average [0-9,\s]+"],
    action: {
      lib: "./maths.js",
      callback: "average"
    }
  },

  // get a brief description from Wikipedia
  // @gopher: wiki Middlesbrough FC
  average: {
    private: false,
    direct: true,
    regex: ["wiki .*"],
    action: {
      lib: "./wiki.js",
      callback: "get"
    }
  }

}
var eventHandler = function() {

  return {

    // message events
    message: function messageHandler(message) {

      // try and determine if this is something we need to react to
      for (var a in actions) {

        // if we have a match already, lets break out
        if (match) break;

        // for each action
        var action = actions[a];

        // direct?
        if (action.direct === true && message.isDirect !== true) {
          continue;
        }

        // private?
        if (action.private === true && message.isPrivate !== true) {
          continue;
        }

        // check each pattern
        var match = false;
        for (var r in action.regex) {

          // if we have a match, make a note
          var regex = message.text.match(new RegExp(action.regex, 'gi'));
          if (!_.isNull(regex)) {
            match = true;
            break;
          }

        }

        // and perform the action we want
        if (match) {

          // load library
          var lib = require('./'+action.action.lib);
          var func = lib[action.action.callback];

          // run it and send a message
          func(message.action, function actionCallback(err, data) {

            if (err) {
              message.channel.send("<@"+message.user.id+">: "+err);
            }

            else {
              message.channel.send("<@"+message.user.id+">: "+data)
            }

          })

        }

      }


    }

  }

}

module.exports = eventHandler