var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {type: String, required: true},
  username: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;
