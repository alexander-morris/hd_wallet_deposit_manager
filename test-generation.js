
var HDKey = require('hdkey')

for ( var i = 0; i < 10; i++ ) {

	var nonce = Math.floor(Math.random() * 1000000); 

	var str = "str" + i + nonce;
	console.log(str)
	var master_seed = HDKey.fromMasterSeed(new Buffer.from(str, 'utf8'))
	console.log(master_seed._privateKey.toString('hex'))	

}