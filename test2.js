const _hdkey = require('ethereumjs-wallet/hdkey');
const HDKey = require('hdkey')
const wallet = require('ethereumjs-wallet')
const ethUtil = require('ethereumjs-util');
const Web3 = require('web3')
const base58 = require('base-58');
const _bitcoreMnemonic = require('bitcore-mnemonic');
const bs58check = require('bs58check')

var _bitcoreMnemonic2 = _interopRequireDefault(_bitcoreMnemonic);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pubkey = '023fca6ee27b81a6954e453cd7d0a8bf511c2c0b78303c39d2b49cb3f54d50dc2c'

console.log(pubkey.length)

var testval = ethUtil.publicToAddress('023fca6ee27b81a6954e453cd7d0a8bf511c2c0b78303c39d2b49cb3f54d50dc2c')

console.log(testval)