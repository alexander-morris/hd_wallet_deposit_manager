// prepareTransactions.js
// 
// This script should be configured manually and can be run against the mongodb to create a full list of all transactions and derived private keys


// Dependancies
const rp = require('request-promise');
const mongoose = require('mongoose');
const _hdkey = require('ethereumjs-wallet/hdkey');
const HDKey = require('hdkey')
const wallet = require('ethereumjs-wallet')
const ethUtil = require('ethereumjs-util');
const Web3 = require('web3')
const base58 = require('base-58');
const _bitcoreMnemonic = require('bitcore-mnemonic');
const bs58check = require('bs58check')

// Set up the db
var mongoUri = 'mongodb://localhost/node';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

// Include models
require('./models/deposit.js');
var deposit = mongoose.model('deposits');
var _bitcoreMnemonic2 = _interopRequireDefault(_bitcoreMnemonic);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var seed_phrase = "august voice drastic imitate stereo harvest permit inch jungle return step alone";
const master_priv_key = new _bitcoreMnemonic2.default(seed_phrase).toHDPrivateKey().toString()
var master_seed = HDKey.fromMasterSeed(new Buffer.from(master_priv_key, 'hex'))
var wallets = getWallets('ETH', function(err, result) {
	for ( var i = 0; i < result.length; i++ ) {
		console.log(result[i].address)
		console.log(derivePKeyForNonce(result[i].nonce))
	}
})

function getWallets (currency, cb) {
	// returns a list of wallets controlled by this deposit manager
	console.log('entered getWallets')
	deposit.find({'currencyCode':currency}, function(err, result){
		if ( err ) {

			console.log(err);
			return {'err':err};

		} else {
			// console.log(result)
			cb(null, formatWalletList(result))

		}
	});
}

function formatWalletList (set) {

	var tt = [];

	for ( var i = 0; i < set.length; i++ ) {
		if ( "undefined" != typeof(set[i].nonce) ) {
			var z = {
				"address":set[i].address,
				"nonce":set[i].nonce
			}
			tt.push(z)
			// console.log(set[i].nonce)
		}
	}
	// console.log(tt)
	return tt;

}


