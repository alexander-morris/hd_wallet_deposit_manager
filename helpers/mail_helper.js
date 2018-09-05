var mc_api_key = "596f8c03d72dd2f8558b6fbddffe3368-us18";

var MailChimpApi = require('mailchimp-api-v3');
var mailChimp = new MailChimpApi(mc_api_key);

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