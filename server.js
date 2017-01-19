var express = require('express'),
  app = express();

var users = require('./scripts/routes/users');
var tripBudgets = require('./scripts/routes/tripBudgets.js');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));


var db = require('./models');

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
