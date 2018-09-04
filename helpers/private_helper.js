
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

const config = require('../config')
const helper = require('./helper')

var self =  module.exports = {
	derivePKeyForNonce : function derivePKeyForNonce (nonce, currency, private_seed) {


		var currency_path_code = helper.getCurrencyCode(currency)

		var PATH = 'm/44/' + currency_path_code + '/0/0/' + nonce
		var node = private_seed.derive(PATH)
		// console.log(node)

		var pubKeyx = node._publicKey

		// console.log("\n pubkey is \n " + pubKeyx, pubKeyx.toString('hex').length)

		var privateKey = node._privateKey.toString('hex')
		var pubKey = ethUtil.privateToPublic(node._privateKey)
		var address = ethUtil.publicToAddress(pubKey).toString('hex')
		var chaddress = ethUtil.toChecksumAddress(address)
		// console.log("\nNew Wallet Key Generated", "\nFor path: " + PATH, "\nFull Node: ", node, "\nPub: " + pubKeyx.toString('hex'), "\nPriv: " + privateKey, "\nAddr: " + address,  "\nchAddr: " + chaddress, "\n", "\n" )

		// console.log(node)
		return privateKey
	},
	generateSeed : function generateSeed () {
		// Basic HD Wallet Controls
		// Configuration
		var seed_phrase = ethHdWalletUtil.generateMnemonic()
		// console.log(seed_phrase)

		// 1. Generate Keys
		var master_priv_key = new _bitcoreMnemonic2.default(seed_phrase).toHDPrivateKey().toString();

		var seed = HDKey.fromMasterSeed(new Buffer.from(master_priv_key))

		var master = {
			'master_priv_key':master_priv_key,
			'priv':seed.privateKey.toString('hex'),
			'pub':seed.publicKey.toString('hex'),
			'pubx':seed.publicExtendedKey
		};
		return master;
	}
}