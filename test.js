const _hdkey = require('ethereumjs-wallet/hdkey');
const HDKey = require('hdkey')
const wallet = require('ethereumjs-wallet')
const ethUtil = require('ethereumjs-util');
const Web3 = require('web3')
const base58 = require('base-58');
const _bitcoreMnemonic = require('bitcore-mnemonic');
const bs58check = require('bs58check')

var _bitcoreMnemonic2 = _interopRequireDefault(_bitcoreMnemonic);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


// Basic HD Wallet Controls
// Configuration
const seed_phrase = "round violin orange unit inherit reduce spray dinner allow island you sting"

// 1. Generate Keys
const master_priv_key = new _bitcoreMnemonic2.default(seed_phrase).toHDPrivateKey().toString();

var seed = HDKey.fromMasterSeed(new Buffer.from(master_priv_key, 'hex'))


var master = {
	'priv':seed.privateKey.toString('hex'),
	'pub':seed.publicKey.toString('hex'),
	'pubx':seed.publicExtendedKey
};

console.log(seed.publicExtendedKey)

// var exPubKey = bs58check.encode(seed.publicKey)

// console.log(seed.publicKey.toString('hex'))
// console.log(exPubKey)
// console.log(bs58check.decode(exPubKey, 'hex'))

var seed2 = HDKey.fromExtendedKey(master.pubx)

console.log("\n", master, "\n");

for (var i = 0; i < 1; i++) {
	deriveChildPrivate(i);
	deriveChildPublic(i);
}

function deriveChildPrivate (nonce) {

	var ETH_PATH = 'm/44\'/60\'/0\'/0/' + nonce
	var node = seed.derive(ETH_PATH)
	var privateKey = node._privateKey.toString('hex')
	var pubKey = ethUtil.privateToPublic(node._privateKey)
	var address = ethUtil.publicToAddress(pubKey).toString('hex')
	var chaddress = ethUtil.toChecksumAddress(address);
	console.log("New Wallet Generated", "\nAt path: " + ETH_PATH, "\nPriv: " + privateKey, "\nAddr: " + address,  "\nchAddr: " + chaddress, "\n", "\n" )

}

function deriveChildPublic (nonce) {

	var ETH_PATH = 'm/44/60/0/0/' + nonce
	var node = seed.derive(ETH_PATH)
	var privateKey = node._privateKey.toString('hex')
	var pubKey = ethUtil.privateToPublic(node._privateKey)
	var address = ethUtil.publicToAddress(pubKey).toString('hex')
	var chaddress = ethUtil.toChecksumAddress(address);
	console.log("New Wallet Generated", "\nAt path: " + ETH_PATH, "\nPriv: " + privateKey, "\nAddr: " + address,  "\nchAddr: " + chaddress, "\n", "\n" )

}
