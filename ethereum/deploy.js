const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('../ethereum/build/CampaignFactory.json');

const factoryAbi = compiledFactory.abi;
const factoryBytecode = compiledFactory.evm.bytecode.object;

const provider = new HDWalletProvider(
    'damp pave forward wasp edge cram upon theory pyramid job glide trick',
    'https://goerli.infura.io/v3/b2ae5cd4895340849e2c0e6a88b2d9ae',
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(factoryAbi).deploy({data:factoryBytecode}).send({ from: accounts[0] });
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();