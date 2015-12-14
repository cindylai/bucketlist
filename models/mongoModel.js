/*
 * This model uses the Node.js MongoDB Driver.
 * To install:  npm install mongodb --save
 */
var mongoClient = require('mongodb').MongoClient;

/*
 * This connection_string is for mongodb running locally.
 * Change nameOfMyDb to reflect the name you want for your database
 */
var connection_string = 'localhost:27017/bucketlist';
/*
 * If OPENSHIFT env variables have values, then this app must be running on 
 * OPENSHIFT.  Therefore use the connection info in the OPENSHIFT environment
 * variables to replace the connection_string.
 */
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
// Global variable of the connected database
var mongoDB; 

// Use connect method to connect to the MongoDB server
mongoClient.connect('mongodb://'+connection_string, function(err, db) {
  if (err) doError(err);
  console.log("Connected to MongoDB server at: "+connection_string);
  mongoDB = db; // Make reference to db globally available.
});

/*
 * In the methods below, notice the use of a callback argument,
 * how that callback function is called, and the argument it is given.
 * Why do we need to be passed a callback function? Why can't the create, 
 * retrieve, and update functinons just return the data directly?
 * (This is what we discussed in class.)
 */

/********** CRUD Create -> Mongo insert ****************************************/
exports.create = function(collection, data, callback) {
  mongoDB.collection(collection).insertOne(
    data,                     // the object to be inserted
    function(err, status) {   // callback upon completion
      if (err) doError(err);
      console.log("5. Done with mongo insert operation in mongoModel");
      var success = (status.result.n == 1 ? true : false);
      callback(success);
      console.log("6. Done with insert operation callback in mongoModel");
    });
  console.log("7. Done with insert function in mongoModel");
}

/********** CRUD Retrieve -> Mongo find ***************************************/
exports.retrieve = function(collection, query, callback) {
  mongoDB.collection(collection).find(query).toArray(function(err, docs) {
    if (err) doError(err);
    callback(docs);
  });
}

/********** CRUD Update -> Mongo updateMany ***********************************/
// exports.update = function(collection, filter, update, callback) {
//   mongoDB
//     .collection(collection)     // The collection to update
//     .updateMany(                // Use updateOne to only update 1 document
//       filter,                   // Filter selects which documents to update
//       update,                   // The update operation
//       {upsert:true},            // If document not found, insert one with this update
//                                 // Set upsert false (default) to not do insert
//       function(err, status) {   // Callback upon error or success
//         if (err) doError(err);
//         callback('Modified '+ status.modifiedCount 
//                  +' and added '+ status.upsertedCount+" documents");
//         });
// }

exports.update = function(collection, query, callback){
  mongoDB.collection(collection).update(
    JSON.parse(query.find), JSON.parse(query.update),
    function(err,docs){
      if (err) doError(err);
        callback('Updated!');
    });
  }
 

/********** CRUD Delete -> Mongo deleteOne ***********************/

exports.remove = function(collection, query, callback) {
  mongoDB.collection(collection).deleteOne(query, function(err, docs) {
    if (err) doError(err);
      callback(docs);
  });
 }



var doError = function(e) {
        console.error("ERROR: " + e);
        throw new Error(e);
    }
