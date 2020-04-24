import React, { Component } from 'react';
import './LandingPage.css';
import CardLogo from '../assets/img/card.png';
import { connect } from 'react-redux';
import * as actionType from '../../store/action/action';
import { FormText } from 'reactstrap';
import { validate, validateForm } from '../../validation/validations';


class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      card_number: '',
      errors: {
        card_number: ''
      }
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    let errors = validate(event, this.state.errors);
    this.setState({
      errors, [name]: value,
      [event.target.name]: event.target.value
    }, () => {
    });
  };

  onSubmitHandlerEvent = (event) => {
    event.preventDefault();
    if (this.state.card_number.length !== 0) {
      if (validateForm(this.state.errors)) {
        this.props.get_card_details(this.state.card_number);
        let { transition } = this.props;
        transition.router.stateService.go('MandateList');
      }
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="content">
          <div className="login-wrap">
            <div className="main_panel">
              <div className="sun_panel">
                <p>Merchant Standing Instructions</p>
                <center>
                  <input type="Number" className="form-control form-inputbox" placeholder="Enter Card Number"
                         name="card_number" onChange={this.onChangeHandler} value={this.state.card_number}/>
                  {errors.card_number.length > 0 &&
                  <h6 className="label_validation">{errors.card_number}</h6>}
                </center>
              </div>
              <center>
                <button type="button" className="btn login_btn" onClick={this.onSubmitHandlerEvent}>LOGIN</button>
              </center>
              <center>
                <h5 className="auth_info">We will redirect you to your Bank site for authentication - <u>your card will
                  not be debited</u></h5>
              </center>
              <div className="card_img">
                <img src={CardLogo} alt="Nature" className="responsive center" height="50px"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get_card_details: (card_no) => dispatch(actionType.get_card_details(card_no))
  };
};

export default connect(null, mapDispatchToProps)(LandingPage);
