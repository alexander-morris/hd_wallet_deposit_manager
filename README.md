
The Blockchain Institute - HD Wallet Kit
=================

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

## Create the wallet 

Now that you have everything set up, you can initialize your wallets by running initialize.js

```node initialize.js```

This will print out a master private key and master public key. Save the master private key securely and copy the master public key and update the value in controllers/deposit.js

Nodes will be generated on the fly in production, but you can test that the private and public keys match by running test-generation.js with any pair of extended private and public keys. 


