// basics

var tt = "bananasplit"

var nonce = getIntegerFromString(tt)
console.log(nonce)


function getIntegerFromString (string) {

	var integer = ""

	for ( i = 0; i < string.length; i++ ) {
		integer += string[i].charCodeAt(0)
	}

	return integer;
}