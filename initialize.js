// initalize.js
//
// Run this script on an isolated machine to produce a new mnemonic, private key, and extended public key for your HD wallet.

// Dependancies
var rp = require('request-promise');
var mongoose = require('mongoose');
var _hdkey = require('ethereumjs-wallet/hdkey');
var HDKey = require('hdkey')
var wallet = require('ethereumjs-wallet')
var ethUtil = require('ethereumjs-util');
var Web3 = require('web3')
var base58 = require('base-58');
var bs58check = require('bs58check')
const private_helper = require('./helpers/private_helper')
var ethHdWalletUtil = require('eth-hd-wallet')
var _bitcoreMnemonic = require('bitcore-mnemonic');
var _bitcoreMnemonic2 = _interopRequireDefault(_bitcoreMnemonic);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Runtime
var master_seed_set = private_helper.generateSeed();
console.log(master_seed_set)
