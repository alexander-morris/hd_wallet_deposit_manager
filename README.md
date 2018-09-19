
The Blockchain Institute - HD Wallet Kit
=================

## Using the wallet 

This quickstart kit makes it easy to set up an HD wallet running as a node.js server to accept BTC and ETH deposits. When you initialize the wallet, you'll receive the seed phrase and private key, but only the extended public key will be used to accept deposits, meaning this can be run on an unsecured server without any risk of the funds being compromised. Upcoming additions will provide further support for withdrawal transaction signing and monitoring deposit values. 

### Initialization

Once node.js is properly configured, you can initialize your wallets by running initialize.js

```node Utilities/initialize.js```

This will print out a master private key and master public key. Save the master private key securely and copy the master public key and update the value in config.js.

### Use

To run the app, open the project directory in a command line and run ```node server.js``` to start the server on the port defined in config.json.

### Funds Retrieval

To retrieve funds, you'll need to generate private keys for each wallet. In practice, the easiest way to do so is to import your seed phrase into a hardware wallet such as Trezor. Alternatively, you can also index through the nonces which have been used for past deposits and generate the private keys for each of them using prepareTransactions.js in the utilities folder, but this should only be done offline as it is a high security risk otherwise. 

### Testing

Nodes will be generated on the fly in production, but you can test that the private and public keys match by running test-generation.js with any pair of extended private and public keys. This will produce an ETH and BTC address for a random nonce, and check that the derived public key matches the derived private key. 

## Setup (one-time)

### Linux/Debian/Ubuntu
Ensure you have an updated version of nodejs and npm installed. Ubuntu repos often contain an old version, so it's recommend to use a more [up-to-date repo](https://launchpad.net/~chris-lea/+archive/node.js/).

If you already had nodejs installed and need it updated, make sure to `sudo apt-get update && sudo apt-get upgrade`. Otherwise a `sudo apt-get install nodejs npm` should be sufficient.

*On Ubuntu / Debian engines, there are minor issues with more recent versions of Gulp. To be safe, use package-old.json on these OS.*

`sudo mv package-old.json package.json`

### Mac
`brew install node`

### Windows
Install node from [nodejs.org](http://nodejs.org/download/) and open the node command prompt.

## Installation

Assuming nodejs/npm is correctly installed, the next step is to install gulp with and then all the project dependencies, along with yarn.

```
sudo npm -g install gulp yarn
```

Finally, install all dependencies with yarn:

```
yarn
```




