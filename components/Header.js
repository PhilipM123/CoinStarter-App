import React, { Component } from 'react';
import { Button, Container, Menu, Segment } from 'semantic-ui-react';
import {Link} from '../routes';


const Header = (props) => {

    return(
        <Segment style={{width:'100%'}} inverted >
            <Menu style={{marginTop: '10px'}} inverted>
                <Link route='/'>
                    <Button inverted>
                        CoinStarter
                    </Button>
                </Link>

                <Menu.Menu position='right'>
                    <Link route='/'>
                        <Button inverted>
                            Campaigns
                        </Button>
                    </Link>
                    <Link route='/campaigns/new'>
                        <Button inverted>
                            +
                        </Button>
                    </Link>
                </Menu.Menu>
            </Menu>
        </Segment>

    );
};
export default Header;
