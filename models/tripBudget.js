var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Item = require('./tripItem.js');

var tripBudgetSchema = new Schema({
  tripTitle: String,
  tripItem: [ Item.schema ]
});

var TripBudget = mongoose.model('TripBudget', tripBudgetSchema);

module.exports = TripBudget;
