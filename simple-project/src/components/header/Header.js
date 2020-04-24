import React, { Component } from 'react';
import logo from '../assets/img/logo.png'
import './Header.css';

class Header extends Component {
    render() {
        return (
            
            <div className="topbar">
            <div className="header_topbar">
               <div className="logo_img">
                  <img src={logo}  height="65px" className="responsive center" alt="Logo"/>
               </div>
            </div>
            <div className="header-border"></div>
         </div>
        );
    }
}

export default Header;