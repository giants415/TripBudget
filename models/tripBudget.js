var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var itemSchema = Schema ({
  title: String,
  cost: Number,
  description: String
});

var tripBudgetSchema = new Schema({
  tripTitle: String,
  tripItem: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

var Item = mongoose.model('Item', itemSchema);
var TripBudget = mongoose.model('TripBudget', tripBudgetSchema);

module.exports = Item;
module.exports = TripBudget;
