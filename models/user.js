var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TripBudget = require('./tripBudget.js');

var userSchema = new Schema({
  email: {type: String, required: true},
  username: {type: String, required: true},
  userBudget: [ TripBudget.schema ]
});

var User = mongoose.model('User', userSchema);
module.exports = User;
