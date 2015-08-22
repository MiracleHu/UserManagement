// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://localhost:27017/HRusers');     // connect to mongoDB database and set the database name to HRusers

app.use(express.static(__dirname + '/public'));                 // set the static files location under /public, eg: the js file for front end
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define model =================
var Schema = mongoose.Schema;
var UsersSchema = new Schema({ fName : String, lName : String, sex : String, age: Number, passw1: String, passw2 : String });
var myUser = mongoose.model('myUser', UsersSchema);

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all users
app.get('/api/users', function(req, res) {

  // use mongoose to get all users in the database
  myUser.find(function(err, users) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)

      res.json(users); // return all users in JSON format
    });
});

// create user and send back all users after creation
app.post('/api/users', function(req, res) {

  // create a user, information comes from AJAX request from Angular
  myUser.create({
    fName  : req.body.fName,
    lName  : req.body.lName,
    sex    : req.body.sex,
    age    : req.body.age,
    passw1 : req.body.passw1,
    passw2 : req.body.passw2,
    done : false
  }, function(err) {
	    if (err)
	      res.send(err);

	      //else get and return all the users after you create another
	      myUser.find(function(err, users) {
	        if (err)
	          res.send(err)
	        res.json(users);
	      });
	    });

});

// get one user
app.get('/api/users/:user_id', function(req, res) {

  myUser.findById(req.params.user_id,function(err, user) {
    if(err)
      res.send(err);
    else
      res.json(user);
  });

});

// delete a user
app.delete('/api/users/:user_id', function(req, res) {
  myUser.remove({
    _id : req.params.user_id
  }, function(err) {
	    if (err)
	      res.send(err);

      // else get and return all the users after you create another
      myUser.find(function(err, users) {
        if (err)
          res.send(err)
        res.json(users);
      });
    });
});

// update a user
app.put('/api/users/:user_id', function(req, res) {

  myUser.findById(req.params.user_id,function(err, user) {
    user.update({
        age  : req.body.age,
    	passw1 : req.body.passw1,
    	passw2 : req.body.passw2 
    },function(err){
      if (err)
        res.send(err);

      //else get and return all the users after you update one
      myUser.find(function(err, users) {
        if (err)
          res.send(err)
        res.json(users);
      });
    });
  });
    
});


// application -------------------------------------------------------------
app.get('', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

