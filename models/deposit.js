// Import Dependancies
var mongoose = require('mongoose');
Schema = mongoose.Schema;

// Mongoose Schema - add any additional data points here
var depositSchema = new Schema ({
  email: String, 
  currencyCode: String,
  taxReceipt: String,
  nonce: String,
  timeStamp: Date,
  address: String
});

module.exports = mongoose.model('deposits', depositSchema);