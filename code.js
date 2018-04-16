require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require('request');


var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);



var LiriSearch = function () {
  this.twitter = function () {
    var params = { screen_name: 'addiesgjohnson', count: 20 };
    twitter.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi", params, function (error, tweets, response) {
      if (!error) {
        tweets = (JSON.parse(response.body)); 
        console.log(tweets[1].text);

        for (var i = 0; i < tweets.length; i++) {
          console.log(
          "\nTweet: " + tweets[i].text +
          "\nTweet Date: " + tweets[i].created_at
        )
        }

        // console.log(
        //   "\nTweet: " + response.text +
        //   "\nTweet Date: " + response.created_at
        // )
      }
    })
  }
  //twitter function ends

  this.spotify = function () {
    fs.readFile("random.txt", "utf8", function (error, song) {
      if (error) {
        return console.log(error);
      }
      var songData = song.slice(17);

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

  this.aceOfBase = function () {

    spotify
      .request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
      .then(function (data) {
        // console.log(JSON.stringify(data, null, 2))
        var info = data.album

        console.log(
          "\nArtist: " + info.artists[0].name +
          "\nSong title: " + data.name +
          "\nAlbum name: " + info.name +
          "\nURL Preview: " + data.preview_url)
      })
      .catch(function (err) {
        console.error('Error occurred: ' + err);
      });
  }//aceOfBase ends

  this.movie = function () {
    fs.readFile("random.txt", "utf8", function (error, movie) {
      if (error) {
        return console.log(error);
      }

      var movieData = movie.slice(11);

      request("https://www.omdbapi.com/?t=" + movieData + "&y=&plot=short&apikey=trilogy", function (error, response) {
        // console.log(JSON.stringify(response, null, 2));
        var stuff = JSON.parse(response.body);

        array = stuff.Ratings;

        function search(nameKey, myArray) {
          for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].Source === nameKey) {
              return myArray[i];
            }
          }
        }
        var resultObject = search("Rotten Tomatoes", array);

        console.log(
          "\nMovie Title: " + stuff.Title +
          "\nRelease Year: " + stuff.Year +
          "\nIMDB Rating: " + stuff.imdbRating +
          "\nRotten Tomatoes: " + resultObject.Value +
          "\nCountry produced: " + stuff.Country +
          "\nLanguage: " + stuff.Language +
          "\nPlot: " + stuff.Plot +
          "\nActors: " + stuff.Actors)

      });

    });
  } //this.movie end

}; //lirisearch ends

module.exports = LiriSearch;

