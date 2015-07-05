/**************
  Event handler for our bot
**************/
var _ = require('underscore');

var actions = {

  // pick something random from comma separated list e.g.
  // @gopher: random john,dave,steve
  random: {
    private: false,
    direct: true,
    regex: ["<@U[a-zA-Z0-9]+>: random .*"],
    action: {
      lib: "./random.js",
      callback: "randomList"
    }
  }

}
var eventHandler = function() {

  return {

    // message events
    message: function(message) {

      // try and determine if this is something we need to react to
      for (var a in actions) {

        // for each action
        var action = actions[a];

        // direct?
        if (action.direct === true && message.isDirect !== true) {
          console.log('direct fial');
          continue;
        }

        // private?
        if (action.private === true && message.isPrivate !== true) {
          console.log('private fail');
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
          func(message, function actionCallback(err, data) {

            if (err) {
              message.channel.send("<@"+message.user.id+">: I'm sorry, something went wrong!");
              console.log(err);
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