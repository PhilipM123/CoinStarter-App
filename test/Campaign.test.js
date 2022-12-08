const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi).deploy({ data: compiledFactory.evm.bytecode.object }).send({ from: accounts[0], gas: '4712388'});
    await factory.methods.createCampaign('100').send({ from: accounts[0], gas: '4712388'});
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () =>{
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });
    it('contract creator is the manager', async () =>{
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });
    it('contract contributer is an approver', async () =>{
        const contributer = await campaign.methods.contribute().send({ from: accounts[1], gas: '4712388', value: 200});
        const approver = await campaign.methods.approvers(accounts[1]).call();
        assert(approver);
    });
    it('campagin minimum contribution', async () =>{
        try {
            await campaign.methods.contribute().send({ from: accounts[1], gas: '4712388', value: 50});
            assert(false);
        } catch (err) { assert(err)}
    });
    it('manager can create payment request', async () =>{
        const manager = await campaign.methods.manager().call();
        await campaign.methods.createRequest("description", 1000, accounts[2]).send({ from: manager, gas: '4712388', value: 200});
        const request = await campaign.methods.requests(0).call();
        assert.equal('description', request.description);
    });
    it('end to end: contribute to campaign. Contribute to, approve and finalize a request', async () =>{
        await campaign.methods.contribute().send({ from: accounts[0], gas: '4712388', value: web3.utils.toWei('10', 'ether')});
        await campaign.methods.createRequest("description", web3.utils.toWei('5', 'ether'), accounts[1]).send({ from: accounts[0], gas: '4712388'});
        await campaign.methods.approveRequest(0).send({ from: accounts[0], gas: '4712388'});
        await campaign.methods.finalizeRequest(0).send({ from: accounts[0], gas: '4712388'});
        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance > 104);
    });
});