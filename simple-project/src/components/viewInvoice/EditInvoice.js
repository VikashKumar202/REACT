import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import IssuerChannelService from '../../services/IssuerChannelService';
import '../showMandate/ShowMandate.css'
import * as actionType from '../../store/action/action';


class EditInvoice extends Component {
   constructor(props) {
      super(props);
      this.state = {
         invoice_notification: '',
         merchant: '',
         sihub_id: '',
         description: '',
         invoice_ref: '',
         amount: '',
         debit_date: '',
      }

   }

   saveInvoice = () => {
      this.props.updateLoader(true);
      IssuerChannelService.save_invoice(this.state.invoice_ref).then(() => {
         this.props.updateLoader(false);
         this.setState({
            invoice_notification: 'Thank You ! You have approved transaction successfuly',
         });
         setTimeout(() => this.setState({ invoice_notification: '' }), 4000)
      }).catch(error => {
         this.props.updateLoader(false);
         console.log(error);
      })
   };

   componentDidMount() {
      let invoice_data = this.props.invoice_data
      if (invoice_data !== '') {
         this.setState({
            merchant: invoice_data.mecode,
            sihub_id: invoice_data.sihubid,
            description: invoice_data.description,
            invoice_ref: invoice_data.invoiceid,
            amount: invoice_data.amount,
            debit_date: invoice_data.debit_date
         })
      }
   }
   render() {
      let card = this.props.card_details;
      let last_4_digits = card.substring(card.length - 4);
      return (
         <div className="table-responsive">
            <p className="mandate_notification">{this.state.invoice_notification}</p>
            <table className="table e-table">
               <thead>
                  <tr>
                     <th>Merchant</th>
                     <th>Sihub ID</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>Merchant</td>
                     <td className="row_bold">{this.state.merchant}</td>
                  </tr>
                  <tr>
                     <td>SiHubID</td>
                     <td className="row_bold">{this.state.sihub_id}</td>
                  </tr>
                  <tr>
                     <td>Description</td>
                     <td className="row_bold">{this.state.description}</td>
                  </tr>
                  <tr>
                     <td>Invoice ref</td>
                     <td className="row_bold">{this.state.invoice_ref}</td>
                  </tr>
                  <tr>
                     <td>Amount</td>
                     <td className="row_bold">{this.state.amount}</td>
                  </tr>
                  <tr>
                     <td>Debit date</td>
                     <td className="row_bold">{this.state.debit_date}</td>
                  </tr>
                  <tr>
                     <td>Card ending</td>
                     <td className="row_bold">{last_4_digits}</td>
                  </tr>
               </tbody>
            </table>
            <div className="common-btn">
               <Button className="btn back-btn" >Cancel</Button>
               <Button className="btn confirm-btn" onClick={this.saveInvoice}>Approve</Button>
            </div>
         </div>

      );
   }
}

const mapStateToProps = (state) => {
   return {
      invoice_data: state.invoice,
      card_details: state.card_details

   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      updateLoader: (isLoading) => dispatch(actionType.updateLoader(isLoading))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInvoice);