import React, { Component } from "react";
import { Button, Form, Input, Message, Segment } from 'semantic-ui-react';
import {Link, Router} from "../../../routes";
import Layout from '../../../components/Layout';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';

class RequestNew extends Component {

    state ={
        description:'',
        value:'',
        recipient:'',
        loading: false,
        errorMessage:''
    }

    static async getInitialProps(props) {
        const {address} = props.query;
        return {address};
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading:true, errorMessage:''});
        const {description, value, recipient} = this.state;
        const campaign = Campaign(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({from:accounts[0]});
            Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            this.setState({errorMessage:err});
        }

        this.setState({loading:false});
    }

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}><a>Back</a></Link>
                <Segment style={{marginTop:'100px'}}>
                    <h3 style={{marginBottom:'40px'}}>Create a Request</h3>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label >Description</label>
                            <input value={this.state.description} onChange={(event) => this.setState({ description: event.target.value })}></input>
                        </Form.Field>
                        <Form.Field>
                            <label >Amount in Ether</label>
                            <Input label='Ether' labelPosition='right' value={this.state.value} onChange={event => {this.setState({value:event.target.value})}}></Input>
                        </Form.Field>
                        <Form.Field>
                            <label >Recipient</label>
                            <input value={this.state.recipient} onChange={event => {this.setState({recipient:event.target.value})}}></input>
                        </Form.Field>
                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <Button loading={this.state.loading} primary>Create!</Button>
                    </Form>
                </Segment>
                

            </Layout>
        ) 
    }
}

export default RequestNew;