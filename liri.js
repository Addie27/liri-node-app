require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var LiriSearch = function () {
  this.twitter = function () {
    var params = { screen_name: 'addiesgjohnson', count: 20 };
    twitter.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi", params, function (error, tweets, response) {
      if (!error) {
        console.log(tweets);
      }
    })
  }
  //twitter function ends

  this.spotify = function () {
    fs.readFile("random.txt", "utf8", function (error, song) {
      if (error) {
        return console.log(error);
      }
      var songData = song;

      spotify.search({ type: 'track', query: songData, limit: 1 }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var info = data.tracks.items
        console.log(
          "\nArtist: " + info[0].artists[0].name +
          "\nSong title: " + info[0].name +
          "\nAlbum name: " + info[0].album.name +
          "\nURL Preview: " + info[0].preview_url)
        
      })
    })
  }//spotify ends

}; //lirisearch ends

module.exports = LiriSearch;

