// Import Dependancies
var mongoose = require('mongoose');
Schema = mongoose.Schema;

// Define Schema (any attributes not explicitly defined will be ignored on write to Mongoose)
var depositSchema = new Schema ({
  name: String, 
  email: String, 
  walletIndex: String,
  currencyCode: String,
  timeStamp: Date
});

module.exports = mongoose.model('deposit', depositSchema);