// Dependancies
const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet')


// Basic HD Wallet Controls

// Configuration
const seed_phrase = "round violin orange unit inherit reduce spray dinner allow island you sting"


// Testing
// 1. Generate Keys
const extended_public_key = EthHdWallet.pKeyFromMnemonic(seed_phrase)

// 2. Generate Wallets
const wallet = EthHdWallet.walletFromPKey(extended_public_key)

console.log( wallet instanceof EthHdWallet ); /* true */

var index = 7;

var set = 10;

wallet.generateAddresses( set, index )

console.log( wallet.getAddresses() )

