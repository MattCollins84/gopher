/**************
  Library to create a new Slack bot
**************/

// official slack client lib
var SlackClient = require('slack-client');

var bot = function(token) {

  // bot connection
  this.slack = new SlackClient(token, true, true);

  // my channels and groups
  this.channels = [];
  this.groups   = [];

  // my unread messages
  this.unread = this.slack.getUnreadCount();

  // myself
  var parent = this;
  
  this.slack.on('open', function() {

    // get all my channels
    parent.channels = (function(self) {
      
      var _ref, _results;
      _ref = self.channels;

      _results = [];
      for (id in _ref) {
        var channel = _ref[id];
        if (channel.is_member) {
          _results.push("#" + channel.name);
        }
      }

      return _results;

    })(this);
    
    // get all my groups
    parent.groups = (function(self) {
      
      var _ref, _results;
      _ref = self.groups;

      _results = [];
      for (id in _ref) {
        var group = _ref[id];
        if (group.is_open && !group.is_archived) {
          _results.push(group.name);
        }
      }

      return _results;

    })(this);
    
    parent.username = this.self.name;
    parent.id = this.self.id;
    parent.teamname = this.team.name;
    
    console.log("Welcome to Slack. You are @" + parent.username + " of " + parent.teamname);
    console.log('You are in: ' + parent.channels.join(', '));
    console.log('As well as: ' + parent.groups.join(', '));
    console.log('You have '+parent.unread+' unread messages');

    return true;

  });

  this.slack.on('message', function(message) {

    // create our message object
    var msg = {
      channel: this.getChannelGroupOrDMByID(message.channel),
      user: this.getUserByID(message.user),
      type: message.type,
      ts: message.ts,
      text: message.text
    }
    
    // some meta stuff
    msg.userName    = (msg.user != null ? msg.user.name : void 0) != null ? "@" + msg.user.name : "UNKNOWN_USER",
    msg.channelName = (msg.channel != null ? msg.channel.is_channel : void 0) ? '#' : ''
    msg.channelName = msg.channelName + (msg.channel ? msg.channel.name : 'UNKNOWN_CHANNEL');

    // direct?
    var pat = "^<@"+this.self.id+">";
    msg.isDirect = msg.text.match(new RegExp(pat, 'ig')) ? true : false;
    
    // private?
    msg.isPrivate = ("@"+msg.channelName === msg.userName) ? true : false;

    // pass it on to our message handler
    messageHandler(msg)

  });

  this.slack.login();

}

// our message handler
var messageHandler = function(message) {

  // private message
  if (message.isPrivate) {
    message.channel.send("Private msg")
  }

  // direct (but public) message
  else if (message.isDirect) {
    message.channel.send("Direct msg")
  }

  else {
    message.channel.send("Normal msg")
  }

}

module.exports = bot;