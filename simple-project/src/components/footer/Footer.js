import React, { Component } from 'react';
import logo from '../assets/img/footer.png'
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            
            <div className="footer">
              <center><img src={logo} alt="Nature" className="responsive center" height="27px"/></center>
         </div>
        );
    }
}

export default Footer;