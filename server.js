var express = require('express')
var app = express();
var url = process.env.MONGOLAB_URI;
var firstName = "Corey";
var lastName = "Dunn";
var mongo = require('mongodb').MongoClient

app.get('/', function (req, res) {

  var doc = {
    firstName: firstName,
    lastName: lastName
  }

  mongo.connect(url, function(err, db) {
    var collection = db.collection('docs');
    collection.insert(doc, function(err, data) {
      console.log(JSON.stringify(doc));
      db.close();
    });

  });

});

var port = process.env.PORT || 3000;
app.listen(port);
