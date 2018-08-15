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

console.log(master_priv_key)


var seed = HDKey.fromMasterSeed(new Buffer.from(master_priv_key, 'hex'))

var master = {
	'priv':seed.privateKey.toString('hex'),
	'pub':seed.publicKey.toString('hex')
};

console.log(master);

for (var i = 0; i < 2; i++) {
	deriveChild(i);
}

function deriveChild (nonce) {
	console.log(nonce)
	var ETH_PATH = 'm/44\'/60\'/0\'/0/' + nonce
	console.log('path is ' + ETH_PATH)
	// derive addresses
	var node = seed.derive(ETH_PATH)

	var privateKey = node._privateKey.toString('hex')

	console.log("priv " + privateKey)

	var pubKey = ethUtil.privateToPublic(node._privateKey)

	// console.log("pubKey " + pubKey)

	var address = ethUtil.publicToAddress(pubKey).toString('hex')

	console.log("address " + address)

	
}


// const web3 = new Web3(
//    new Web3.providers.HttpProvider('http://localhost:8545')
// );
//Verify connection is successful
// web3.eth.net.isListening()
//    .then(() => console.log('is connected'))
//    .catch(e => console.log('Wow. Something went wrong'));


// Web3.eth.sendSignedTransaction(
//    `0x${serializedTx.toString('hex')}`, 
//    (error, result) => { 
//       if (error) { console.log(`Error: ${error}`); }  
//       else { console.log(`Result: ${result}`); } 
//    } 
// );

