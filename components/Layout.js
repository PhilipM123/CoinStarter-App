import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

const Layout = (props) => {
    return (
        <Container style={{width:'100%'}}  >
            <Head><link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"/></Head>
            <Header></Header>
            <Container >
                {props.children}
            </Container>
        </Container>
    );
};
export default Layout;