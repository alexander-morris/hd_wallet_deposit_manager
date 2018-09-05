// deposit.js - this file handles the deposit creation process including address generation
//
// Import config and helpers
var config = require('../config.json')
var helper = require('../helpers/helper.js')
// ** Run Initialize.js to get the extended public and private key for your wallet, and then update config.json to include your extended public key.

// Include Dependancies
var rp = require('request-promise');
var mongoose = require('mongoose');
var deposit = mongoose.model('deposits');
const _hdkey = require('ethereumjs-wallet/hdkey');
const HDKey = require('hdkey')
const wallet = require('ethereumjs-wallet')
const ethUtil = require('ethereumjs-util');
const Web3 = require('web3')
const base58 = require('base-58');
const _bitcoreMnemonic = require('bitcore-mnemonic');
const bs58check = require('bs58check')
const master_pubx = "xpub661MyMwAqRbcFg4yGV4vGLJCtXrFU72Zu3reG1hsCHpn4Pt5Gnhj9Dw89vQXAhfYgkuMfQRENQxEGBHv3kWhmow4PJgfEVtFxi3gF4sesPt"

// Generate the public seed which will be used to generate addresses
const public_seed = HDKey.fromExtendedKey(config.master_pubx)


// Function Declarations
module.exports = {
	helloWorld : function helloWorld (req, res) {
		return res.status(200).send("Hi!")
	},
	healthCheck : function healthCheck (req, res) {
		return res.status(200);
	},
	checkCaptcha : function checkCaptcha (req, res) {
	    var response = req.body.response
	    console.log(req.body);
	    console.log("recaptcha response", response)

		    rp({
		        uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
		        method: 'POST',
		        formData: {
		            secret: '1234567890',
		            response: response
		        },
		        json: true
		    }).then(result => {
		    	// return { error : NOT_AUTHENTICATED };
		        console.log("recaptcha result", result)
		        if (result.success) {
		        	console.log('success: true')
		            getRandomAddress(req, res);	        	


		        } else {
		        	console.log('success: false')
		            return res.status(200).send("Recaptcha verification failed. Are you a robot?")
		        }

		    }).catch(reason => {
		        console.log("Recaptcha request failure", reason)
		        return ("Recaptcha request failed.")
		    })
	},
	generateNewAddress : function generateNewAddress (req, res) {

		console.log('entered generateNewAddress')
		var nonce = Math.floor(Math.random() * 100); 
		console.log("nonce is " + nonce)

		var address = helper.generateNewAddress(nonce, req.params.currency, public_seed)

		var newDeposit = {
			"name":"john",
			"email":"email",
			"currencyCode":req.params.currency,
			"timestamp": new Date,
			"nonce":nonce,
			"address":address
		}

		deposit.create(newDeposit, function(err, record) {
			if (err) {
			  if(res) return res.status(500).send('Record init failed ' + err); 

			}else{
			  console.log('new record created');
			  console.log(record);

			  if(res) return res.status(200).send("New Address: " + address);

			}
		});
	},
	generateNewSeed : function generateNewSeed (req, res) {
		return res.status(200).send(generateSeed());
	}
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

function updateRecordWithId (id, record) {

  deposit.updateOne({ id: id }, record, function(err, res) {
    if (err) throw err;
    return (true)
  });
}
