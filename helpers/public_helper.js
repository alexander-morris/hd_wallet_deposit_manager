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
const config = require('./config')

function generateNewAddress (nonce) {

	console.log('entered generateNewAddress')
	console.log("nonce is " + nonce)

	var generated_address = generateAddressFromNonce(nonce)

	var generated_privatekey = derivePKeyForNonce(nonce)

	console.log(generated_address, generated_privatekey)

}


function getIntegerFromString (string) {

	console.log(string, string.length)

	var integer = ""

	for ( i = 0; i < string.length; i++ ) {
		integer += string[i].charCodeAt(0)
		console.log(integer)
	}

	return integer;
}


function generateAddressFromNonce (public_seed, nonce, currency) {

	console.log('\nentering generateAddressFromNonce', "\nnonce: " + nonce, "\ncurrency: " + currency)

	var currency_path_code = getCurrencyCode(currency)

	var PATH = 'm/44/' + currency_path_code + '/0/0/' + nonce
	var node = public_seed.derive(PATH)

	var pubKey = node._publicKey

	var address = ethUtil.pubToAddress(ethUtil.importPublic(pubKey)).toString('hex')

	var chaddress = ethUtil.toChecksumAddress(address)
	console.log("New Wallet Generated", "\nAt path: " + PATH, "\nPub: " + pubKey, "\nAddr: " + address,  "\nchAddr: " + chaddress, "\n", "\n" )

	return chaddress;
}

function getCurrencyCode(currency) {
	// Add switch for currency codes here
	if ('ETH' === currency ) {
		return "60";		
	} else if ( 'BTC' === currency ) {
		return "1"
	} else {
		return "60"
	}

}
