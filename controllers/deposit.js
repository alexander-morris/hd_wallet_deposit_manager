
var sgMail = require('@sendgrid/mail');
var rp = require('request-promise');
var mongoose = require('mongoose');
var deposit = mongoose.model('deposit');

var mc_api_key = "596f8c03d72dd2f8558b6fbddffe3368-us18";

var MailChimpApi = require('mailchimp-api-v3');
var mailChimp = new MailChimpApi(mc_api_key);

const _hdkey = require('ethereumjs-wallet/hdkey');
const HDKey = require('hdkey')
const wallet = require('ethereumjs-wallet')
const ethUtil = require('ethereumjs-util');
const Web3 = require('web3')
const base58 = require('base-58');
const _bitcoreMnemonic = require('bitcore-mnemonic');
const bs58check = require('bs58check')
const master_pubx = "xpub661MyMwAqRbcH2Z5RtM6ydu98YudxiUDTaBESx9VgXpURBCDdWGezitJ8ormADG6CsJPs23fLmaeLp8RJgNvFo6YJkGhpXnHusCkRhGZdqr"
const seed = HDKey.fromExtendedKey(master_pubx)

var _bitcoreMnemonic2 = _interopRequireDefault(_bitcoreMnemonic);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


exports.helloWorld = function (req, res) {
	return res.status(200).send("Hi!")
}

exports.healthCheck = function (req, res) {
	return res.status(200);
}

exports.checkCaptcha = function (req, res) {
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

}

exports.subscribe = function (req, res) {
	console.log(req.body.email);
	if ("undefined" != typeof(req.body.email)){
		var body_data = {
		    "email_address": req.body.email,
		    "status": "subscribed",
		};

		var call = {
			"method":"post",
			"path":"/lists/d50da5888a/members/",
			"path_params":"",
			"body":body_data,
			"query":""
		};

		callMailChimp(call, function(result){

			console.log(result);
			if ( null === result ) {
				// mailchimp signup success
				return res.status(200).send('signup success');
			} else {
				// mailchimp signup success
				return res.status(200).send('error');
			}
		});

	} else {
		return res.status(200).send('body.email is undefined');
	}


}

exports.generateNewAddress = function (req, res) {

	console.log('entered generateNewAddress')

	var newDeposit = {
		"name":"john",
		"email":"email",
		"currencyCode":req.params.currency,
		"timestamp": new Date
	}

	deposit.create(newDeposit, function(err, record) {
		if (err) {
		  if(res) return res.status(500).send('Record init failed ' + err); 

		}else{
		  console.log('new record created');
		  console.log(record);

		  var nonce = parseInt(record._id, 10)
		  console.log(nonce)
		  var address = generateAddressFromNonce(nonce)
		
		  record.address = address
		  record.nonce = nonce

		  updateRecordWithId (nonce, record);

		  if(res) return res.status(200).send("New Address: " + address);

		}
	});
}

exports.generateNewSeed = function (req, res) {
	return res.status(200).send(generateSeed());
}

function updateRecordWithId (id, record) {

  deposit.updateOne({ id: id }, record, function(err, res) {
    if (err) throw err;
    return (true)
  });

}

function generateAddressFromNonce (nonce, currency) {

	console.log('\nentering generateAddressFromNonce', "\nnonce: " + nonce, "\ncurrency: " + currency)

	var currency_path_code = getCurrencyCode(currency)

	var PATH = 'm/44/' + currency_path_code + '/0/0/' + nonce
	var node = seed.derive(PATH)

	var pubKey = node._publicKey

	var address = ethUtil.pubToAddress(ethUtil.importPublic(pubKey)).toString('hex')

	var chaddress = ethUtil.toChecksumAddress(address)
	console.log("New Wallet Generated", "\nAt path: " + PATH, "\nPub: " + pubKey, "\nAddr: " + address,  "\nchAddr: " + chaddress, "\n", "\n" )

	return chaddress;




}

function derivePKeyForNonce (nonce) {

	var ETH_PATH = 'm/44/60/0/0/' + nonce
	var node = seed.derive(ETH_PATH)
	// console.log(node)

	var pubKeyx = node._publicKey

	// console.log("\n pubkey is \n " + pubKeyx, pubKeyx.toString('hex').length)

	var privateKey = node._privateKey.toString('hex')
	var pubKey = ethUtil.privateToPublic(node._privateKey)
	var address = ethUtil.publicToAddress(pubKey).toString('hex')
	var chaddress = ethUtil.toChecksumAddress(address)
	// console.log("\nNew Wallet Key Generated", "\nFor path: " + ETH_PATH, "\nPub: " + pubKeyx.toString('hex'), "\nPriv: " + privateKey, "\nAddr: " + address,  "\nchAddr: " + chaddress, "\n", "\n" )

	return privateKey;
}


function getCurrencyCode(currency) {
	// Add switch for currency codes here
	return "60";
}

function generateSeed () {
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

	return master;
}

function callMailChimp (call, callback) {
	// mailchimp.request({
	//   method : 'get|post|put|patch|delete',
	//   path : 'path for the call, see mailchimp documentation for possible calls',
	//   path_params : {
	//     //path parameters, see mailchimp documentation for each call
	//   },
	//   body : {
	//     //body parameters, see mailchimp documentation for each call
	//   },
	//   query : {
	//     //query string parameters, see mailchimp documentation for each call
	//   }
	// }, callback)
	mailChimp.request({
	  method : call.method,
	  path : call.path,
	  path_params : call.path_params,
	  body : call.body,
	  query : call.query
	}, callback)
}

function sendMail (payload, res) {
	console.log('sending payload', payload);

	sgMail.setApiKey('SG.1234567890');

	var message = payload.name + "(" + payload.email + ")" + " sent you a new message: " + payload.comment;

	var subject = "New Message From " + payload.name + "(" + payload.email + ")";

	const msg = {
		  to: 'info@theblockchaininstitute.org',
		  from: 'info@theblockchaininstitute.org',
		  subject: subject,
		  text: message
	};

	sgMail.send(msg);
	
	return res.status(200).send("You're good to go, human.")
}
