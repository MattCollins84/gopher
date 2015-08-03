var _ = require('underscore');
var request = require('request');
var utils = require('./utils.js');

var get = function(str, callback) {

  // remove the wiki
  str = str.replace(/^wiki /i, '');

  // create the URL to request
  var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|links&exintro=&explaintext=&titles=";
  url += encodeURI(str);

  // make the request
  request(url, function requestWiki(e, r, b) {

    // catch an error
    if (e) {
      return callback("Hmmm. Something went wrong, please try again.", null);
    }

    // parse our response
    try {
      var data = JSON.parse(b);
    } catch (e) {
      var data = {};
    }

    // do we have some pages?
    if (!_.isUndefined(data.query) && !_.isUndefined(data.query.pages)) {

      var pages = Object.keys(data.query.pages);

      // just the one?
      if (pages.length === 1) {
        
        var page = data.query.pages[pages[0]];

        // does it have some data
        if (!_.isUndefined(page.extract) && page.extract !== "" && !page.extract.match(/may refer to:$/) && !page.extract.match(/^This is a redirect from a title with another method of capitalisation/)) {

          // format our response
          var res = "\n>"+page.extract.split("\n").join("\n>");

          // return our data
          return callback(null, res);

        }

        // no data, any links? Just the 1?
        else if ( (!page.extract || page.extract == "") && !_.isUndefined(page.links) && page.links.length === 1) {

          // if it's just the one, we should try again!
          get(page.links[0].title, function requestWikiRecursive(err, data) {
            return callback(err, data);
          })

        }

        // is this some wiki capitalisation bollocks?
        else if (!_.isUndefined(page.extract) && page.extract.match(/^This is a redirect from a title with another method of capitalisation/) && page.links.length > 0) {

          // have a stab at the first guy in the list of suggestions
          get(page.links[0].title, function requestWikiRecursive(err, data) {
            return callback(err, data);
          })

        }

        // Lots of links!
        else if (!_.isUndefined(page.extract) && page.extract !== "" && page.extract.match(/may refer to:$/) && page.links.length > 1) {

          // collect all our options
          var titles = [];
          for (var l in page.links) {

            if (!_.isUndefined(page.links[l].title) && page.links[l].title) {
              titles.push(page.links[l].title)
            }
            
          }

          return callback(null, "Quite a few options, try one of these:\n>"+titles.join("\n>"));

        }

        // lets try changing this to proper case
        else if ( (!page.extract || page.extract == "") && _.isUndefined(page.links)) {

          // use the original suggestion
          get(utils.toTitleCase(str), function requestWikiRecursive(err, data) {
            return callback(err, data);
          })

        }

        // give up!
        else {
          return callback("This is too confusing, I give up :|", null);
        }

      }

      // multiple pages, not sure how to handle this yet
      else {
        return callback("Hmmm, lots of possibilities here. Can you be more specific?", null);
      }

    }

    // no page, lets error
    else {
      return callback("Sorry, I couldn't find anything :(", null);
    }

  });

}

module.exports = {
  get: get
}