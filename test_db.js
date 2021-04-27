const credentials = require('./credentials.json');

function getMongoDBUrl(credentials) {
  const {url, username, password, collection} = credentials.MongoDB;
  // keywords to replace
  var replaceMap = {
    "<username>": username,
    "<password>": password,
    "<collection>": collection
  }
  // join the keywords in a regular expression
  var regex = new RegExp(Object.keys(replaceMap).join("|"), "g");
  // replace the keywords in the url
  return url.replace(regex, (matched) => replaceMap[matched]);
}

const mongoDBUrl = getMongoDBUrl(credentials);
console.log(mongoDBUrl);

// var mongoose = require('mongoose')
// mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true});
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error: '))

// exports.getMongoDBUrl = getMongoDBUrl;