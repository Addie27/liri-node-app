require("dotenv").config();
var keys = require("./keys.js"); 
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);


if (process.argv[2] === "my-tweets") {

var params = {screen_name: 'addiesgjohnson', count: 20};
twitter.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi", params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
  
}; //if my-tweets end 


