import React, {Component, createFactory} from "react";
import { Button, Checkbox, Container, Form, Input, Message, Segment } from 'semantic-ui-react'
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution:'',
        errorMessage: '',
        loading: false,
        title:'',
        description:''
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading:true});

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution,this.state.title, this.state.description).send({from:accounts[0]});
            Router.pushRoute('/');
        } catch  (err) {
            this.setState({errorMessage:err.message});
        }

        this.setState({loading:false});
    };

    render () {
        return (
            <Layout>
                <Segment style={{marginTop:'100px'}}> 
                    <h3 style={{marginBottom:'40px'}}>Create a Campaign</h3>
                    <Form className="formStyle" onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
                        <Form.Field>
                            <label >Minimum Contribution</label>
                            <Input label='Wei' labelPosition='right' value={this.state.minimumContribution} onChange={event => this.setState({minimumContribution:event.target.value})}/>
                        </Form.Field>
                        <Form.Field>
                            <label >Campaign Title</label>
                            <Input value={this.state.title} onChange={event => this.setState({title:event.target.value})}/>
                        </Form.Field>
                        <Form.Field>
                            <label >Campaign Description</label>
                            <Input value={this.state.description} onChange={event => this.setState({description:event.target.value})}/>
                        </Form.Field>
                        <Message error inverted  header="Error" content={this.state.errorMessage}></Message>
                        <Button loading={this.state.loading} primary >Create!</Button>
                    </Form>
                </Segment>
            </Layout>
        ) 
    };
}
export default CampaignNew;