/**
 * To have launchd start mongodb now and restart at login:
    brew services start mongodb
    Or, if you don't want/need a background service you can just run:
    mongod --config /usr/local/etc/mongod.conf
 */


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';
const client = new MongoClient(url);
var count = 0;
// Use connect method to connect to the server
client.connect(function(err) {
	  assert.equal(null, err);
	  console.log("Connected successfully to server");

	  const db = client.db(dbName);
	var loop = setInterval(function () {

	  // insertDocuments(db, function() {
	    findDocuments(db, function() {
	          // client.close();
	        });
	  // });
		count += 1;
		if(count > 5){ client.close();clearInterval(loop)};
	},3000)
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}