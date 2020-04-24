import React, { Component } from 'react';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import {UIView} from "@uirouter/react";


class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <UIView/>
                <Footer/>
            </div>
        );
    }
}

export default Home;