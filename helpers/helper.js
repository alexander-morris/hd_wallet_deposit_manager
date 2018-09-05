// Dependancies
const rp = require('request-promise');
const mongoose = require('mongoose');
const _hdkey = require('ethereumjs-wallet/hdkey');
const HDKey = require('hdkey')
const wallet = require('ethereumjs-wallet')
const ethUtil = require('ethereumjs-util');
const Web3 = require('web3')
const base58 = require('base-58');
const bitcoin = require('bitcoinjs-lib')
const _bitcoreMnemonic = require('bitcore-mnemonic');
const bs58check = require('bs58check')
const config = require('../config')

var self =  module.exports = {
	generateNewAddress : function generateNewAddress (nonce, currency, public_seed) {

		// console.log('entered generateNewAddress')
		// console.log("nonce is " + nonce)

		var generated_address = generateAddressFromNonce(public_seed, nonce, currency)

		return generated_address

	},
	getCurrencyCode : function getCurrencyCode(currency) {
		// Add switch for currency codes here
		if ('ETH' === currency ) {
			return "60";		
		} else if ( 'BTC' === currency ) {
			return "1"
		} else {
			return "60"
		}

	}
}

function generateAddressFromNonce (public_seed, nonce, currency) {

		// console.log('\nentering generateAddressFromNonce', "\nnonce: " + nonce, "\ncurrency: " + currency)

		var currency_path_code = self.getCurrencyCode(currency)

		var PATH = 'm/44/' + currency_path_code + '/0/0/' + nonce
		var node = public_seed.derive(PATH)

		if ( "ETH" === currency ) {

			var pubKey = ethUtil.importPublic(node._publicKey)

			var address = ethUtil.pubToAddress(pubKey).toString('hex')

			var chaddress = ethUtil.toChecksumAddress(address)
			
		} else if ( "BTC" === currency ) {

			var keyPair = bitcoin.ECPair.fromPublicKey(node._publicKey)

		    var chaddress = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address

		}
		// console.log("New Wallet Generated", "\nAt path: " + PATH, "\nFull Node: ", node, "\nPub: " + pubKey, "\nAddr: " + address,  "\nchAddr: " + chaddress, "\n", "\n" )
		

		// console.log(node)
		return chaddress
}

function getIntegerFromString (string) {

		// console.log(string, string.length)

		var integer = ""

		for ( i = 0; i < string.length; i++ ) {
			integer += string[i].charCodeAt(0)
			// console.log(integer)
		}

		return integer;
}	