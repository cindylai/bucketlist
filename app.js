//Cindy Lai
var express = require("express");
var app = express();
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var dbRoutes = require('./routes/dbRoutes');
//var venueRoutes = require('./routes/venueRoutes');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('tiny'));    

app.use(bodyParser.urlencoded({ extended: true }));

// Load all routes in the routes directory
// fs.readdirSync('./routes').forEach(function (file){
//   // There might be non-js files in the directory that should not be loaded
//   if (path.extname(file) == '.js') {
//     console.log("Adding routes in "+file);
//     require('./routes/'+ file).init(app);
//     }
// });
  
// Catch any routes not already handed with an error message
// app.use(function(req, res) {
//     var message = 'Error, did not understand path '+req.path;
//   res.status(404).render('error', { 'message': message });
// });

//routes
// app.get('/index', function(req,res){
// 	res.render('index');
// })

// Handle static files
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	//res.sendFile(__dirname + '/public/index.html');
	res.render('index');
});


app.get('/map',function(req,res){
	//res.sendFile(__dirname + '/public/map.html');
	res.render('map');
});


//dbRoutes
app.put('/:collection', dbRoutes.doCreate); // CRUD Create
app.get('/:collection', dbRoutes.doRetrieve); // CRUD Retrieve
app.post('/:collection', dbRoutes.doUpdate); // CRUD Update
//app.delete('/:collection', dbRoutes.doDelete); //CRUD Delete


var httpServer = require('http').createServer(app);
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 50000;
httpServer.listen(port, ipaddress, function() {console.log('Listening on '+ipaddress+':'+port);});

