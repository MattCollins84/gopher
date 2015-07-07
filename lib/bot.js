/**************
  Library to create a new Slack bot
**************/

// official slack client lib
var SlackClient = require('slack-client');

var _ = require('underscore');

// my bot 'class'
var bot = function(token, eventHandler) {

  // sensible defaults for our event handler
  if (_.isUndefined(eventHandler.message)) {
    eventHandler.message = console.log;
  }

  // bot connection
  this.slack = new SlackClient(token, true, true);

  // my channels and groups
  this.channels = [];
  this.groups   = [];

  // my unread messages
  this.unread = this.slack.getUnreadCount();

  // capture 'this' for use below
  var parent = this;
  
  // when we connect to slack, gather the necessary info
  this.slack.on('open', function slackOpen() {

    // get all my channels
    for (var c in this.channels) {
      var channel = this.channels[c];
      if (channel.is_member) {
        parent.channels.push(channel.name);
      }
    }
    
    // get all my groups
    for (var g in this.groups) {
      var group = this.groups[g];
      if (group.is_open) {
        parent.groups.push(group.name);
      }
    }
    
    parent.username = this.self.name;
    parent.id = this.self.id;
    parent.teamname = this.team.name;
    
    console.log("Welcome to Slack. You are @" + parent.username + " of " + parent.teamname);
    console.log('You are in: ' + parent.channels.join(', '));
    console.log('As well as: ' + parent.groups.join(', '));
    console.log('You have '+parent.unread+' unread messages');

    return true;

  });

  this.slack.on('message', function slackMessage(message) {

    // create our message object
    var msg = {
      channel: this.getChannelGroupOrDMByID(message.channel),
      user: this.getUserByID(message.user),
      type: message.type,
      ts: message.ts,
      text: message.text
    }
    
    // some meta stuff
    msg.userName    = (msg.user != null ? msg.user.name : null ) != null ? "@" + msg.user.name : "UNKNOWN_USER",
    msg.channelName = (msg.channel != null ? msg.channel.is_channel : null) ? '#' : ''
    msg.channelName = msg.channelName + (msg.channel ? msg.channel.name : 'UNKNOWN_CHANNEL');

    // direct?
    var pat = "^<@"+this.self.id+">";
    msg.isDirect = msg.text.match(new RegExp(pat, 'ig')) ? true : false;
    
    // private?
    msg.isPrivate = ("@"+msg.channelName === msg.userName) ? true : false;

    // what is the 'action of this msg'
    msg.action = "";
    if (msg.isDirect || msg.isPrivate) {
      msg.action = msg.text.replace(/^<@U[a-zA-Z0-9]+>:? /i, '');
    }
    console.log(msg.action);
    // pass it on to our message handler
    eventHandler.message(msg)

  });

  this.slack.login();

}

module.exports = bot;