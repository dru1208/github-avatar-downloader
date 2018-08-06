var dotenv = require('dotenv').config()
var request = require("request");
var secrets = require("./secrets.js");
var fs = require("fs");
// top set of variables call the modules that are required

console.log("Welcome to the Github Avatar Downloader!");
// intro to confirm the program is running

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url:
      "https://api.github.com/repos/" +
      repoOwner +
      "/" +
      repoName +
      "/contributors",
    // using variables for repoOwner and repoName allow for modular code
    headers: {
      "User-Agent": "request",
      Authorization: process.env.GITHUB_TOKEN // GITHUB_TOKEN format in secrets.js is "token token_number"
    }
  };
  request(options, function(err, res, body) {
    cb(JSON.parse(err), JSON.parse(body));
    //parsing the JSON here presents the err and body as an object for the callback function
    //callback function will download the image with a given url
  });
}

var downloadImageByURL = function(url, filePath) {
  // ...
  request
    .get(url)
    .on("error", function(err) {
      console.log("Error: ", err);
    })
    .on("response", function(chunk) {
      console.log("Saving images now!");
      //confirms that file save is starting
    })
    .pipe(
      fs.createWriteStream(filePath).on("finish", function() {
        console.log("Your images are saved!");
        //after the emitter stream (write) finishes for each file, a message will be displayed to confirm the save
      })
    );
};

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  //process.argv[2] and process.argv[3] are the inputted repoOwner and repoName
  if (!process.argv[2] || !process.argv[3]) {
    console.log("give me some values bruh");
    //error result if either field is left blank
  } else {
    console.log("Errors:", err);
    for (var contributor of result) {
      var filePath = `./avatars/${contributor.login}.jpg`;
      //file path is generated with login info from the requested JSON
      downloadImageByURL(contributor.avatar_url, filePath);
    }
  }
});
