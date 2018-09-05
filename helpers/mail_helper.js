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


var MailChimpApi = require('mailchimp-api-v3');
var mailChimp = new MailChimpApi(config.mc_api_key);

var self =  module.exports = {
	callMailChimp : function callMailChimp (call, callback) {
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
	},
	sendMail : function sendMail (payload, res) {
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
}