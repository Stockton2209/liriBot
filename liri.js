// Initialize packages and variables
require('dotenv').config()
const Spotify = require('node-spotify-api');
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');

let cmd = process.argv[2];
let arg = process.argv.slice(3).join(' ');

// Logs each query into log.txt with formatting
fs.appendFile('log.txt', cmd + ": " + arg + "\n", (err) => {
  if (err) throw err;
});

// Switch statement for command
function command() {
  switch(cmd) {
    case 'concert-this':
      concertThis();
      break;
    case 'spotify-this-song':
      spotifyThis();
      break;
    case 'movie-this':
      movieThis();
      break;
    case 'do-what-it-says':
      doThis();
      break;
  }
}

// Command concert-this
function concertThis() {
  console.log('ARTIST: ' + arg);
  // Call Axios
    axios.get('https://rest.bandsintown.com/artists/' + arg + '/events?app_id=codingbootcamp').then(
      function(res) {
        // If there are no events available
        if (res.data.length === 0) {
          console.log("No concerts available!");
        }
        let events = res.data;
        // For each event, print out info
        events.forEach(function(event) {
          // Set date format
          let date = moment(event.datetime).format('MM/DD/YYYY');
          console.log(
    `
    Venue: ${event.venue.name}
    City: ${event.venue.city}, ${event.venue.country}
    Date: ${date}
    `
          )
        });
      }
    ).catch(function(error) {
      console.log("Could not find any concerts for: " + arg);
    });
}

// Command spotify-this-song
function spotifyThis() {
  // If no arg, look up the sign
  if (arg === "") {
    arg = "The sign"
  }
  // Search song using spotify api
  spotify.search({
    type: 'track',
    query: arg,
    limit: 3
  }, function(err, data) {
    // Catch error
    if (err) {
      return console.log('Error: ' + err);
    }
    let songs = data.tracks.items;
    // For each song, print out information
    songs.forEach(function(song) {
      // If song preview is not available
      if (song.preview_url === null) {
        song.preview_url = 'no url available'
      }
      console.log(
`
Track: ${song.name}
Artist: ${song.artists[0].name}
Album: ${song.album.name}
Preview url: ${song.preview_url}
`
      )
    })
  });
  console.log('Track: ' + arg);
}

// Command movie-this
function movieThis() {
  // Call Axios for movie info
  if (arg === undefined) {
    arg = 'Mr.Nobody'
  }
    axios.get('http://www.omdbapi.com/?t=' + arg + '&y=&plot=short&apikey=trilogy').then(
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
}

// Command do-what-it-says
function doThis() {
  // Read text from random.txt
  fs.readFile('random.txt', 'utf8', function(err, data) {
    if (err) {
      return console.log(error);
    }
    // Split random file text into arrays
    let dataArr = data.replace(/(\n)/gm, '').split(',');
    // Set randNum equal to a random even number in the range of dataArr.length
    let randNum = Math.floor(Math.random() * dataArr.length);
    randNum -= (randNum % 2 == 0? 0: 1);
    // Set cmd and arg to random array item and run command again
    cmd = dataArr[randNum];
    arg = dataArr[randNum+1];
    command(arg);
  });
}

command(cmd);
