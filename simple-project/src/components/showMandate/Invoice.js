import React, { Component } from 'react';
import IssuerChannelService from '../../services/IssuerChannelService'
import {connect} from 'react-redux'
import * as actionType from '../../store/action/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UISref } from '@uirouter/react';


class Invoice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      invoice_list:[]
    }
  }

  edit_individual_invoice=(value)=>{
    console.log('called this method',value);
    this.props.edit_inoice(value);
  };

  componentDidMount = () => {
    this.props.updateLoader(true);
    IssuerChannelService.get_invoices_details().then((response) => {
      this.props.updateLoader(false);
      this.setState({
        invoice_list: response
      }, () => console.log(this.state.invoice_list))
    }).catch(error => {
      this.props.updateLoader(false);
      console.log(error);
    })
  };

  render() {
    return (
      <div className="table-responsive">
        <table className="table e-table">
          <thead>
            <tr>
              <th>Merchant</th>
              <th>Debit date</th>
              <th>Amount (Rs)</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.invoice_list.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.mecode}</td>
                  <td>{item.debit_date}</td>
                  <td>{item.amount}</td>
                  <td>{item.approve_status === 'approved' ? <FontAwesomeIcon icon="bell" className="bellicon_color"/> : ''}</td>
                  <td><UISref to="EditInvoice"><a className="editicon" onClick={()=>this.edit_individual_invoice(item)}><FontAwesomeIcon icon="edit" className="eciticon_color"/></a></UISref></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoader: (isLoading) => dispatch(actionType.updateLoader(isLoading)),
    edit_inoice:(value)=>dispatch(actionType.edit_invoice(value))
  };
};

export default connect(null,mapDispatchToProps)(Invoice);
