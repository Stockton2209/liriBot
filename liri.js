// Initialize packages
require('dotenv').config()
const Spotify = require('node-spotify-api');
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require('moment');
let cmd = process.argv[2];
let arg = process.argv.slice(3).join(" ");

// Switch based on command
switch(cmd) {

  case "concert-this":
  console.log("ARTIST: " + arg);
  // Call Axios
    axios.get("https://rest.bandsintown.com/artists/" + arg + "/events?app_id=codingbootcamp").then(
      function(res) {
        let events = res.data;
        // For each event, print out info
        events.forEach(function(event) {
          // Set date format
          let date = moment(event.datetime).format("MM/DD/YYYY");
          console.log(
    `
    Venue: ${event.venue.name}
    City: ${event.venue.city}, ${event.venue.country}
    Date: ${date}
    `
          )
        });
      }
    );
    break;

  case "spotify-this-song":
    console.log("spotify me");
    break;

  case "movie-this":
  // Call Axios for movie info
  if (arg === undefined) {
    arg = "Mr.Nobody"
  }
    axios.get("http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=trilogy").then(
      function(res) {
        let movie = res.data;
        console.log(
`
Title: ${movie.Title}
Year: ${movie.Year}
IMDB Rating: ${movie.Ratings[0].Value}
Rotten Tomatoes: ${movie.Ratings[1].Value}
Country: ${movie.Country}
Language: ${movie.Language}
Plot: ${movie.Plot}
Actors: ${movie.Actors}
`
        )
      }
    ).catch(function(error) {
      console.log(error);
    })
    break;

  case "do-what-it-says":
    console.log("do me");
    break;
}
