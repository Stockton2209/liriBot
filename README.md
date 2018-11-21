# liriBot

## Overview
LIRI (Language Interpretation Recognition Interface) is a command line node app that takes in parameters and gives back data within the terminal.

## Instructions
LIRI takes in 4 different commands
```
concert-this '<artist name here>'
spotify-this-song '<song name here>'
movie-this '<movie title here>'
do-what-it-says
```

## Set up
First clone repository and then inside the folder, run
```
npm install
touch .env
```
Inside your .env file, add your API keys from spotify in this format
```
SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```
To run any of the commands, run
```
node liri.js '<command here>'
```

## Demo
Click on the image for a video preview
[![Liri preview](https://user-images.githubusercontent.com/38300070/48872612-80c11f80-edaf-11e8-9ad5-8f6d92f3d420.png)](https://drive.google.com/file/d/11FX8dQYUDJ6ZC9bGY67mG9F_UsKVjMjy/view "LIRI preview")

## Packages & APIs

 * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
 * [OMDB API](http://www.omdbapi.com)
 * [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
 * [Axios](https://www.npmjs.com/package/axios)
 * [Moment](https://www.npmjs.com/package/moment)
 * [DotEnv](https://www.npmjs.com/package/dotenv)
