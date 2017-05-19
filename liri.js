// 6. At the top of the `liri.js` file, write the code you need to grab the data from keys.js. Then store the keys in a variable.
var fs = require("fs");
var request = require("request");
var prompt = require("prompt");
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var stringify = require('json-stringify');
//vars for functions
var client = new twitter(keys.twitterKeys);
var yourWishIsMyCommand = process.argv[2];
var userInput = process.argv[3];

// if (yourWishIsMyCommand === "my-tweets") {
//     console.log("Me tweets");
//     myTweets();
// }

//using switch for different commands
switch (yourWishIsMyCommand) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong(userInput);
        break;
    case "movie-this":
        movieThis(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays("do-what-it-says");
        break;
}

//1. `node liri.js my-tweets`
function myTweets() {

    //Call to Twitter API to get the user's timeline
    client.get('statuses/user_timeline', { screen_name: 'haveringcoder' }, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i <= 5; i++) {
                console.log("Me Tweets: " + JSON.stringify(tweets[i].text, null, 2));
                console.log(tweets[i].created_at);
                console.log("Yay! Success!");
            }
        } else {
            //error message if there is a error
            console.error("Oh, no! Kill me now, an error.  This is a error message.");
            console.log("Error Status Code = " + response.statusCode);
        }
    });
};

//2. `node liri.js spotify-this-song '<song name here>'`

function spotifyThisSong(userInput) {
    //if the user does not input a song, LIRI will select The Sign by Ace of Base - Excellent choice!
    if (userInput === undefined) {
        userInput = "The Sign Ace of Base";
        console.log("Did you mean The Sign by Ace of Base?  " + userInput);
    }
    spotify.search({ type: "track", query: userInput }, function(err, data) {
        // console.log(data.tracks.items[0]);
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("------------------------");
    });
};
//
//3. `node liri.js movie-this '<movie name here>'`
//   * This will output the following information to your terminal/bash window:
//       * Title of the movie.
//       * Year the movie came out.
//       * IMDB Rating of the movie.
//       * Country where the movie was produced.
//       * Language of the movie.
//       * Plot of the movie.
//       * Actors in the movie.
//       * Rotten Tomatoes URL.
//   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
//     * It's on Netflix!
function movieThis(userInput) {
    if (userInput === undefined) {
        userInput = "Mr. Nobody";
        console.log("If you haven't watched Mr. Nobody, then you should");
    }
    request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&r=json", function(err, response, body) {
        body = JSON.parse(body);
        console.log("Movie Title: " + body.Title);
        console.log("Year: " + body.Year);
        console.log("IMDB Rating: " + body.imdbRating);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);

        //TODO rotten tomatoes
    });


};

//4. `node liri.js do-what-it-says`
//   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//     * Feel free to change the text in that document to test out the feature for other commands.

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
        spotifyThisSong("do-what-it-says");
    })
};