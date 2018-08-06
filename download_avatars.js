var request = require('request');
var secrets = require('./secrets.js')

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





getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (var contributor of result) {
    console.log("Results: " + contributor.avatar_url)
  }
});

