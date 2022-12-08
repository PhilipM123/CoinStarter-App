import React, {Component} from "react";
import {Button, Table} from 'semantic-ui-react';
import {Link} from "../../../routes";
import Layout from '../../../components/Layout';
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const {address} = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const summary = await campaign.methods.getSummary().call();
        const approvers = summary[3];

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        return {address, requests, requestCount, approvers};
    }

    renderRows() {
        return this.props.requests.map((request, index, approvers) => {
            return (<RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approvers = {this.props.approvers}
            />);
        })
    }

    render() {
        const {Header, Row, HeaderCell, Body} = Table;

        return(
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}><a><Button floated="right" style={{marginBottom:10}} primary>Add Request</Button></a></Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalise</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        <Row>

                        </Row>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div style={{marginTop:10}}>{`${this.props.requestCount} Requests Found`}</div>
            </Layout>
            
        );
    }
}

export default RequestIndex;