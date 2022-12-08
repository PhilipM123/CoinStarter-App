import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from '../ethereum/factory';
import Layout from "../components/Layout";
import Campaign from '../ethereum/campaign';
import {Link} from '../routes';


class CampaignIndex extends Component {

    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        const requests = campaigns.map(async address => {
            const campaign = Campaign(address);
            return await campaign.methods.getSummary().call(); 
        })
        const summaries = await Promise.all(requests);
        let data = [];
        campaigns.forEach((address, index) => {
            data.push({
                address,
                summary: summaries[index]
            })
        })

        return {campaigns: data};
    }

    renderCampaigns (){
        const items  =  this.props.campaigns.map(data => {
            return {
                header: data.summary[5],
                description: <Link route={`/campaigns/${data.address}`}><a>View Campaign</a></Link>,
                meta: data.summary[6],
                fluid: true,
            };
        });

        return <Card.Group items={items}/>;
    }

    render(){
        return (
            <Layout>
                <div> 
                    <h3>Open Campaigns</h3>
                    <Link route="/campaigns/new"><a><Button floated="right" className="ui primary button" primary >Create Campaign<i aria-hidden="true" className="right add circle icon"></i></Button></a></Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );   
    }
};

export default CampaignIndex;