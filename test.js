const _hdkey = require('ethereumjs-wallet/hdkey');
const HDKey = require('hdkey')
const wallet = require('ethereumjs-wallet')
const ethUtil = require('ethereumjs-util');
const Web3 = require('web3')
var _bitcoreMnemonic = require('bitcore-mnemonic');

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
	'pub':seed.publicKey.toString('hex')
};

console.log("\n", master, "\n");

for (var i = 0; i < 5; i++) {
	deriveChild(i);
}

function deriveChild (nonce) {

	var ETH_PATH = 'm/44\'/60\'/0\'/0/' + nonce
	var node = seed.derive(ETH_PATH)
	var privateKey = node._privateKey.toString('hex')
	var pubKey = ethUtil.privateToPublic(node._privateKey)
	var address = ethUtil.publicToAddress(pubKey).toString('hex')

	console.log("New Wallet Generated", "\nAt path: " + ETH_PATH, "\nPriv: " + privateKey, "\nAddr: " + address, "\n", "\n" )

}
