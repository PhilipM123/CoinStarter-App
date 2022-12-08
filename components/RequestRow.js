import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router} from "../routes";

class RequestRow extends Component {

    onApprove = async (event) => {
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(this.props.address);
            await campaign.methods.approveRequest(this.props.id).send({from:accounts[0]});
        } catch (err) {
            
        }

        Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    }

    onFinalise = async (event) => {
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(this.props.address);
        await campaign.methods.finalizeRequest(this.props.id).send({from:accounts[0]});

        Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    }

    render(){
        const {Row, Cell} = Table;
        const request = this.props.request;
        const readyToFinalise = request.approvalCount > this.props.approvers / 2;
        return (
            <Row disabled={request.complete} positive={readyToFinalise && !request.complete}>
                <Cell>{this.props.id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether') }</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{`${request.approvalCount}/${this.props.approvers}`}</Cell>
                <Cell>{request.complete ? null: (<Button color='green' basic onClick={this.onApprove}>Approve</Button>)}</Cell>
                <Cell>{request.complete ? null: (<Button color='teal' basic onClick={this.onFinalise}>Finalise</Button>)}</Cell>
            </Row>
        );
    }
}

export default RequestRow;