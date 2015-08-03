/**************
  Event handler for our bot
**************/
var _ = require('underscore');

var eventHandler = function(default_actions) {

  var a = default_actions;

  return {

    actions: a,

    addAction: function addAction(name, action) {

      this.actions[name] = action;

    },

    // message events
    message: function messageHandler(message) {

      // try and determine if this is something we need to react to
      for (var a in this.actions) {

        // if we have a match already, lets break out
        if (match) break;

        // for each action
        var action = this.actions[a];

        // direct?
        if (message.isDirect !== true) {
          continue;
        }

        // check each pattern
        var match = false;
        for (var r in action.regex) {

          // if we have a match, make a note
          var regex = message.action.match(new RegExp(action.regex, 'gi'));
          if (!_.isNull(regex)) {
            match = true;
            break;
          }

        }

        // and perform the action we want
        if (match) {

          // load library
          var func = action.action;

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