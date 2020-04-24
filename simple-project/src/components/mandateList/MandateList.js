import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MandateList.css';
import * as actionType from '../../store/action/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IssuerChannelService from '../../services/IssuerChannelService';

class MandateList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      merchant_list: []
    };
  }

  edit_individual_merchant=(value)=>{
    this.props.save_enrolment(value);
    let { transition } = this.props;
    transition.router.stateService.go('ShowMandate');
  };

  componentDidMount = () => {
    this.props.updateLoader(true);
    IssuerChannelService.get_merchant_details().then((response)=>{
      this.props.updateLoader(false);
      this.setState({
        merchant_list: response.enrolments
      })
    }).catch(error => {
      this.props.updateLoader(false);
      console.log(error);
    })
  };


  render() {
    let card=this.props.card_details;
    let last_4_digits=card.substring(card.length - 4);

    return (
      <div className="content_mandate">
        <div className="content-wrap">
          <div className="main_panel">
            <div className="card_panel">
              <p>E- Mandate for card ending {last_4_digits}</p>
            </div>
            <div className="table-responsive">
              <table className="table e-table">
                <thead>
                <tr>
                  <th>Merchant</th>
                  <th>Sihub ID</th>
                  <th></th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {
                  this.state.merchant_list.map((_item, key)=>{
                    return (
                      <tr key={key}>
                        <td>{_item.mecode}</td>
                        <td>{_item.sihubid}</td>
                        <td>{_item.approval_status === 'pending' ? <FontAwesomeIcon icon="bell" className="bellicon_color"/> : ''}</td>
                        <td><a className="editicon" onClick={()=>this.edit_individual_merchant(_item)}><FontAwesomeIcon icon="edit" className="eciticon_color"/></a></td>
                      </tr>
                    );
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    card_details: state.card_details
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save_enrolment : (data) => dispatch(actionType.save_enrolment(data)),
    updateLoader: (isLoading) => dispatch(actionType.updateLoader(isLoading))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MandateList);
