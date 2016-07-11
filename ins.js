var url = process.env.MONGOLAB_URI;
var firstName = "Corey";
var lastName = "Dunn";
var mongo = require('mongodb').MongoClient

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
