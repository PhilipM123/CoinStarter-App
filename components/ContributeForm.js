import React, {Component} from 'react';
import {Button, Checkbox, Form, Input, Message} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class ContributeForm extends Component{
    state = {
        value:'',
        errorMessage: '',
        loading: false,
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const address = this.props.address;
        const campaign = Campaign(address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({from:accounts[0], value:web3.utils.toWei(this.state.value, 'ether')});
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch  (err) {
            this.setState({errorMessage:err.message});
        }
        this.setState({loading:false});
    };

    render() {
        return(
            <>
                <h3>Contribute to this campaign!</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label style={{color:'white'}}>Contribution Amount</label>
                        <Input value={this.state.value} onChange={event => this.setState({value:event.target.value})} label="ether" labelPosition="right"></Input>
                    </Form.Field>
                    <Message error header="Error" content={this.state.errorMessage}></Message>
                    <Button loading={this.state.loading} primary >Contribute!</Button>
                </Form>
            </>
        );
    };
}

export default ContributeForm;