//include model
var mongoModel = require("../models/mongoModel.js")

/********** CRUD Create *******************************************************
 * Take the object defined in the request body and do the Create
 * operation in mongoModel.
 */ 
exports.doCreate = function(req, res){
  if (Object.keys(req.body).length == 0) {
    res.render('message', {title: 'Mongo Demo', obj: "No create message body found"});
    return;
  }
  mongoModel.create ( req.params.collection, 
	                    req.body,
		                  function(result) {
		                    // result equal to true means create was successful
  		                  var success = (result ? "Create successful" : "Create unsuccessful");
	  	                  res.render('message', {title: 'Mongo Demo', obj: success});
     		                console.log("2. Done with callback in dbRoutes create");
		                  });
  console.log("3. Done with doCreate in dbRoutes");
}

/********** CRUD Retrieve (or Read) *******************************************
 * Take the object defined in the query string and do the Retrieve
 * operation in mongoModel.*/ 

exports.doRetrieve = function(req, res){

  mongoModel.retrieve(
    req.params.collection, 
    req.query,
		function(modelData) {
      console.log("modelData=",modelData);
		  if (modelData.length) {
        res.render('results',{title: 'Map', obj: modelData});
      } else {
        var message = "Please add some venues";
        res.render('message', {title: 'Map', obj: message});
        console.log("in here now");
      }
		});
}

/********** CRUD Update ********************************************************/ 
exports.doUpdate = function(req, res){
  // if there is no filter to select documents to update, select all documents
  var filter = req.body.find ? JSON.parse(req.body.find) : {};
  // if there no update operation defined, render an error page.
  if (!req.body.update) {
    res.render('message', {title: 'Mongo', obj: "No update operation defined"});
    return;
  }
  var update = JSON.parse(req.body.update);
  mongoModel.update(  req.params.collection, filter, update,
		                  function(status) {
              				  res.render('message',{title: 'Mongo Demo', obj: status});
		                  });
}

/********** CRUD Delete ********************************************************/ 
exports.doDelete = function(req,res){
    mongoModel.remove(
    req.params.collection, 
    req.query,
    function(modelData) {
      if (modelData.length) {
        res.render('results',{title: 'Mongo', obj: modelData});
      } else {
        var message = "Deleted!";
        res.render('message', {title: 'Mongo', obj: message});
      }
    });
}