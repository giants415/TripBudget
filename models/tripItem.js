var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var itemSchema = new Schema ({
  title: String,
  cost: Number,
  description: String
});

var Item = mongoose.model('Item', itemSchema);
module.exports = Item;
