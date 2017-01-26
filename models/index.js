var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost");

module.exports.User = require("./user.js");
module.exports.TripBudget = require("./tripBudget.js");
module.exports.Item = require("./tripItem.js");
