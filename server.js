var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./models');
var User = require('./models/user.js');
var TripBudget = require('./models/tripBudget.js');
var Item = require('./models/tripItem.js');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Allows me to use static files from these folders
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));


////////////////////////////
//// USER ROUTES //////////
//////////////////////////
app.get('/users', function(req, res){
  User.find({}).exec(function(err, users){
    if (err) {
      res.send(err);
    } else {
      res.send({data:users}, 200);
    }
  });
});

app.get('/users/:username', function(req, res){
  User.findOne({username: req.params.username}, function (err, user){
    if (err) {
      res.send(err);
    } else {
      res.send({data:user}, 200);
    };
  });
});

app.post('/users', function(req, res){
  var newUser = new User({
    email: req.body.email,
    username: req.body.username,
    trip: req.body.userBudget
  });
  console.log (newUser);

  newUser.save(function(err, user){
    if (err) {
      console.log('2 ' + newUser);
      res.send(err);
      console.log ('in the save error');
    } else {
      res.send(user);
      console.log ('in the save');
    };
  });
});

app.put('/users/:username', function(req, res){
  User.findOne({username: req.params.username}, function (err, user){
    if (err) {
      res.send(err);
    } else {
      var data = {
        email: req.body.email,
        username: req.body.username
      };
      User.update(user, data, function(err, updatedUser){
        if (err) {
          res.send(err);
        } else {
          res.send(updatedUser, 200);
        };
      });
    };
  });
});

app.delete('/users/:username', function(req, res){
  User.remove({username: req.params.username}, function(err, user){
    if (err) {
      res.send(err);
    } else {
      res.send({message: 'User w/ username: ' + req.params.username + ' has been deleted'}, 200);
    };
  });
});

////////////////////////////
////  BUDGET ROUTES ///////
//////////////////////////
app.get('/tripbudgets', function(req, res){
  TripBudget.find({}).exec(function(err, tripBudgets){
    if (err) {
      res.send(err);
    } else {
      res.send({data:tripBudgets}, 200);
    }
  });
});

app.get('/tripbudgets/:tripTitle', function(req, res){
  TripBudget.findOne({tripTitle: req.params.tripTitle}, function (err, tripBudget){
    if (err) {
      res.send(err);
    } else {
      res.send({data:tripBudget}, 200);
    };
  });
});

app.get('/users/:username/tripbudgets', function (req,res){
  User.findOne({username: req.params.username}, function(err, foundUser){
    if (err) {
      res.send(err);
    } else {
      res.send(foundUser.userBudget);
    };
  });
});

app.post('/users/:username/tripbudgets', function(req, res){
  User.findOne({username: req.params.username}, function (err, foundUser) {
    if (err) {
      res.send(err);
    } else {
      var newTripBudget = new TripBudget({
        tripTitle: req.body.tripTitle,
        tripItem: req.body.tripItem
      });
      foundUser.userBudget.push(newTripBudget);
      foundUser.save(function (err, savedUser){
        res.send(newTripBudget);
      });
    };
  });
});

app.put('/users/:username/tripbudgets', function(req, res){
  User.findOne({username: req.params.username}, function(err, foundUser){
    if (err) {
      res.send(err);
    } else {
      var data = {
        tripTitle: req.body.tripTitle,
        tripItem: req.body.tripItem
      };
      foundUser.TripBudget.update(user, data, function(err, updatedTripBudget){
        if (err) {
          res.send(err);
        } else {
          res.send(updatedTripBudget);
        };
      });
    };
  });
  // TripBudget.findOne({tripTitle: req.params.tripTitle}, {username: req.params.username}, function (err, tripBudget){
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     var data = {
  //       tripTitle: req.body.tripTitle,
  //       tripItem: req.body.tripItem
  //     };
  //     TripBudget.update(tripBudget, data, function(err, updatedTripBudget){
  //       if (err) {
  //         res.send(err);
  //       } else {
  //         res.send(updatedTripBudget, 200);
  //       };
  //     });
  //   };
  // });
});

app.delete('/tripbudgets/:tripTitle', function(req, res){
  TripBudget.remove({tripTitle: req.params.tripTitle}, function(err, tripBudget){
    if (err) {
      res.send(err);
    } else {
      res.send({message: 'Trip Budget w/ tripTitle: ' + req.params.tripTitle + ' has been deleted'}, 200);
    };
  });
});

////////////////////////////
////  ITEM ROUTES /////////
//////////////////////////
app.get('/tripbudgets/:tripTitle/items', function(req, res){
  TripBudget.findOne({tripTitle: req.params.tripTitle}, function (err, items){
    if (err) {
      res.send(err);
    } else {
      res.send({data:items}, 200);
    };
  });
});

app.post('/tripbudgets/:tripTitle/items', function(req, res){
  TripBudget.findOne({tripTitle: req.params.tripTitle}, function(err, selectedTripBudget){
    console.log('1 ' + req.params.tripTitle);
    /// talking with bill and we both agreed i need to make a model for item and then require it
    /// in the model for trip budget
    var newItem = new Item({
      title: req.body.title,
      cost: req.body.cost,
      description: req.body.description
    });
    selectedTripBudget.tripItem.push(newItem);
    console.log('2 ' + newItem);
    newItem.save(function(err, item){
      if (err) {
        res.send(err);
      } else {
        console.log('3 ' + newItem);
        res.send(newItem);
      };
    });
  });
});

app.put('/tripbudgets/:tripTitle', function(req, res){
  TripBudget.findOne({tripTitle: req.params.tripTitle}, function (err, tripBudget){
    if (err) {
      res.send(err);
    } else {
      var data = {
        tripTitle: req.body.tripTitle,
        tripItem: req.body.tripItem
      };
      TripBudget.update(tripBudget, data, function(err, updatedTripBudget){
        if (err) {
          res.send(err);
        } else {
          res.send(updatedTripBudget, 200);
        };
      });
    };
  });
});

app.delete('/tripbudgets/:tripTitle', function(req, res){
  TripBudget.remove({tripTitle: req.params.tripTitle}, function(err, tripBudget){
    if (err) {
      res.send(err);
    } else {
      res.send({message: 'Trip Budget w/ tripTitle: ' + req.params.tripTitle + ' has been deleted'}, 200);
    };
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
