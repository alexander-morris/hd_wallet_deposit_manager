// test-generation.js
// 
// This can be used to test the address and private key derivation match for a range of currency

// Dependancies
const rp = require('request-promise');
const _hdkey = require('ethereumjs-wallet/hdkey');
const HDKey = require('hdkey')
const wallet = require('ethereumjs-wallet')
const ethUtil = require('ethereumjs-util');
const Web3 = require('web3')
const base58 = require('base-58');
const _bitcoreMnemonic = require('bitcore-mnemonic');
const bs58check = require('bs58check')
const config = require('./config.json')
const helper = require('./helpers/helper')
const private_helper = require('./helpers/private_helper')

const public_seed = HDKey.fromExtendedKey(config.master_pubx)
const private_seed = HDKey.fromMasterSeed(new Buffer.from(config.master_priv_key))


for ( var nonce = 0; nonce < 1; nonce++ ) {
	console.log( helper.generateNewAddress(nonce, "BTC", public_seed) )

	console.log( private_helper.derivePKeyForNonce(nonce, "BTC", private_seed) )
}



















