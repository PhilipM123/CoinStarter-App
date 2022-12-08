import React, {Component} from 'react';
import { Card, Grid, Button, Segment, Menu, Container } from 'semantic-ui-react'
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import ContributeForm from '../../components/ContributeForm';
import web3 from '../../ethereum/web3';
import {Link} from '../../routes';


class CampaignShow extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = Campaign(address);
        const summary = await campaign.methods.getSummary().call();

        return {
            address,
            minimumContribution: summary[0], 
            balance: summary[1], 
            requestsCount: summary[2], 
            approversCount:summary[3], 
            manager:summary[4]
        };
    };

    renderCards(){
        const {minimumContribution, balance, requestsCount, approversCount, manager} = this.props;

        const items = [{
            header: manager,
            description: 'The manager created this campaign',
            meta: 'Address of manager',
            style: {overflowWrap:'break-word'}
        },
        {
            header: web3.utils.fromWei(balance, 'ether') ,
            description: 'Total funds contributed to the campaign',
            meta: 'Campaign Balance'
        },
        {
            header: web3.utils.fromWei(minimumContribution),
            description: 'Minimum contribution to fund this campaign in Ether',
            meta: 'Minimum Contribution'
        },
        {
            header: requestsCount,
            description: 'Number of requests created by campaign manager',
            meta: 'Requests'
        },
        {
            header: approversCount,
            description: 'Number of contributers to this campaign',
            meta: 'Approvers'
        }];

        return <Card.Group items={items}/>;
    };

    render(){
        return  (
            <Layout>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}><a><Button class="ui primary button" primary >View Requests<i aria-hidden="true" class="right add circle icon"></i></Button></a></Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );   
    }
}

export default CampaignShow;