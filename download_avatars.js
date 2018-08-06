var request = require('request');
var secrets = require('./secrets.js')
var fs = require('fs');

console.log("Welcome to the Github Avatar Downloader!")


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(JSON.parse(err), JSON.parse(body));
  });
}



function downloadImageByURL(url, filePath) {
  // ...
  request.get(url)
         .on("error", function(err) {
          console.log("Error: ", err)
         })
         .on("response", function(chunk) {
          console.log("Saving images now!")
         })
         .pipe(fs.createWriteStream(filePath))
}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (var contributor of result) {
    var filePath = `./avatars/${contributor.login}.jpg`
    downloadImageByURL(contributor.avatar_url, filePath)
  }
});
