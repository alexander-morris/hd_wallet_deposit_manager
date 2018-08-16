// initalize.js
//
// Run this script on an isolated machine to produce a new mnemonic, private key, and extended public key for your HD wallet.

// Dependancies
var rp = require('request-promise');
var mongoose = require('mongoose');
var _hdkey = require('ethereumjs-wallet/hdkey');
var HDKey = require('hdkey')
var wallet = require('ethereumjs-wallet')
var ethUtil = require('ethereumjs-util');
var Web3 = require('web3')
var base58 = require('base-58');
var bs58check = require('bs58check')
var ethHdWalletUtil = require('eth-hd-wallet')
var _bitcoreMnemonic = require('bitcore-mnemonic');
var _bitcoreMnemonic2 = _interopRequireDefault(_bitcoreMnemonic);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// Runtime
var master_seed_set = generateSeed();
console.log(master_seed_set)

function generateSeed () {

	var seed_phrase = ethHdWalletUtil.generateMnemonic();
	console.log(seed_phrase)
	var master_priv_key = new _bitcoreMnemonic2.default(seed_phrase).toHDPrivateKey().toString()
	console.log(master_priv_key)
	var master_seed = HDKey.fromMasterSeed(new Buffer.from("zeta", 'hex'))
	console.log(master_seed)

	var master = {
		'priv':master_seed.privateKey.toString('hex'),
		'pub':master_seed.publicKey.toString('hex'),
		'pubx':master_seed.publicExtendedKey
	};
	
	return master;

}
