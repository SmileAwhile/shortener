var express = require('express')
var app = express();
var url = process.env.MONGOLAB_URI;
var firstName = "Corey";
var lastName = "Dunn";
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var col = 'shortened'
var validUrl = require('valid-url');

app.get('/:short', function (req, res) {
  var shorter = req.params.short;

  mongo.connect(url, function(err, db) {
    var collection = db.collection(col);
    collection.findOne({
      _id: ObjectID(shorter)
    }, function(err, rv) {
      res.redirect(rv.original);
    }); // end findone()
  }) // end mongo.connect()
}); // end app.get(/:short)

app.get("/new/:link(*)", function(req, res) {
  var arg = req.param('link');

  if (validUrl.isUri(arg)){

      var entry = {
        _id: id,
        original: arg,
        shorter: "https://shorterer.herokuapp.com/" + id
      }

      mongo.connect(url, function(err, db) {
        var collection = db.collection(col);
        collection.insert(entry, function(err, data) {
          console.log(JSON.stringify(entry));
          db.close();
        }); // end insert()
      }); // end mongo.connect()


  } else {
      var entry = { error: arg + " is not a Valid URL! Please try again..."}
  }

  var id = new ObjectID();


  res.end(JSON.stringify(entry, null, '  '));
})  // end app.get(/new/:link)

app.use(express.static('public'));

var port = process.env.PORT || 3000;
app.listen(port);
