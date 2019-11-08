# Burst Account Activator

This is a web application (and service) to activate new Burst accounts.

A Burst account is considered active only, if it owns a public key. Usually, the public key is only generated once the 
account has executed at least one transaction on the blockchain. To execute a transaction one needs  
a sufficient balance to pay the transaction fee. To do this, an user who just created an account must ask someone to 
transfer some BURST to that account (or using a faucet). In that first step, the account will be registered in the blockchain (as receiver) and
though exists publicly. To turn from an _passive_ into an _active_ account the user has to create any kind of transaction.

This service sends the user a welcome message and by passing the user accounts public key the account gets activated.
Doing so, the user does not need to create a transaction and the sending step can be omitted.    



## Running the app locally

However you get the code, you can install dependencies and run the project in development mode with:

```bash
npm install # or yarn
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

## Building app

To build the application (build that static files) run

```bash
npm run build
```

The static files are stored under `__sapper__/build` 

## Deployment

Once built, the application can be deployed on any static file server

### Deploying on Now 

_Now_ is a "serverless" deployment service from [zeit.co](https://zeit.co).
This project is configured to be hosted on _Now_

#### Prerequisites
1. Create an account on zeit.co
2. Install `now.cli` globally on your machine 
3. Having a Burst account, which will serve as activator account (the one that sends the welcome messages)
4. Register the secret passphrase for the activator account using 
   - testnet: `now secrets add activator-account-testnet "<passphrase>"`
   - mainnet: `now secrets add activator-account-mainnet "<passphrase>"`

#### Deploy
 
 - Deploy a testnet (staging) version: `npm run deploy:staging`
 - Deploy a mainnet (production) version: `npm run deploy:production`
