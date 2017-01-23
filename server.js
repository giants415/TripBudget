var express = require('express');
var app = express();
// var path = require('path');
// var routes = require('./scripts/routes');
var bodyParser = require('body-parser');
var db = require('./models');


// var users = require('/scripts/routes/user.js');
// var tripBudgets = require('scripts/routes/tripBudgets.js');


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.use('/', routes);

//Allows me to use static files from these folders?
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/public/views/index.html');
// });

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
