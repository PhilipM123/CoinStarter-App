import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xF63b39803f9a8b2DBaA8B5987cD7036d57aa84BF'
);

export default instance;
