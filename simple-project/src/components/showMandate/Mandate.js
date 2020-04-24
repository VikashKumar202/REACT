import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import './ShowMandate.css';
import IssuerChannelService from '../../services/IssuerChannelService';
import * as actionType from '../../store/action/action';
import { UISref } from '@uirouter/react';


class Mandate  extends Component{

  constructor(props) {
    super(props);
    this.state = {
      merchant: '',
      sihubID: '',
      card_number:'',
      start_date: '',
      end_date:'',
      max_amount:'',
      amount_type:'',
      frequency:'',
      created_on:'',
      status:'',
      mandate_notification: '',
      edit_max_amount: false,
      edit_end_date: false,
      hide_edit: false
    }
  }

  goto = () => {
    this.stateService.go('MandateList');
  };

  edit_mandate = (editType) => {
    if (editType === 'maxAmount') {
      this.setState({
        edit_max_amount: true,
        hide_edit: true,
        max_amount: ''
      });
    } else if (editType === 'endDate') {
      this.setState({
        edit_end_date: true,
        hide_edit: true,
        end_date: ''
      });
    }
  };

  formatDate = (date) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  };

  saveMandate=()=>{
      this.props.updateLoader(true);
      IssuerChannelService.save_mandate().then(()=>{
        this.props.updateLoader(false);
        let card = this.props.card_details;
        let last_4_digits = card.substring(card.length - 4);
        this.setState({
          mandate_notification: 'Your e-mandate '+this.state.sihubID+' ending '+last_4_digits+' is successfully modified',
          end_date: this.formatDate(this.state.end_date),
          edit_max_amount: false,
          edit_end_date: false,
          hide_edit: false
        });
        setTimeout(()=> this.setState({mandate_notification: ''}), 4000)
      }).catch(error => {
        this.props.updateLoader(false);
        console.log(error);
      })
  };

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
       [name]: value,
      [event.target.name]: event.target.value
    }, () => {
    });
  };

  onChangeDate = (date) => {
    this.setState({ end_date: date });
  };

  componentDidMount() {
    const mandate_info = this.props.enrolment;
    if(mandate_info !== ""){
      this.setState({
        merchant: mandate_info.mecode,
        sihubID: mandate_info.sihubid,
        card_number: mandate_info.card.masked_value,
        start_date: this.formatDate(mandate_info.start_date),
        end_date: this.formatDate(mandate_info.end_date),
        max_amount: mandate_info.amount,
        amount_type: mandate_info.amount_type,
        frequency: mandate_info.frequency,
        created_on: this.formatDate(mandate_info.createdon),
        status: mandate_info.status
      });
    }
  }

  render() {
     return(
       <div className="table-responsive">
         <p className="mandate_notification">{this.state.mandate_notification}</p>
         <table className="table e-table">
           <thead>
           <tr>
             <th>Merchant</th>
            <th>Sihub ID</th>
             <th></th>
           </tr>
           </thead>
           <tbody>
           <tr>
             <td>Merchant</td>
             <td className="row_bold">{this.state.merchant}</td>
             <td></td>
           </tr>
           <tr>
             <td>SiHubID</td>
             <td className="row_bold">{this.state.sihubID}</td>
             <td></td>
           </tr>
           <tr>
             <td>Card Number</td>
             <td className="row_bold">{this.state.card_number}</td>
             <td></td>
           </tr>
           <tr>
             <td>Start Date</td>
             <td className="row_bold">{this.state.start_date}</td>
             <td></td>
           </tr>
           <tr>
             <td>End Date</td>
             <td className="row_bold">{this.state.edit_end_date === true ?
               <DatePicker className="datepicker_border"
                           selected={this.state.end_date} onChange={this.onChangeDate}/>
                           : this.state.end_date }</td>
             <td>{this.state.hide_edit === true ? '' : <FontAwesomeIcon icon="edit" className="eciticon_color" onClick={()=>{this.edit_mandate('endDate')}}/>}
             </td>
           </tr>
           <tr>
             <td>Max Amount</td>
             <td className="row_bold">{this.state.edit_max_amount === true ?
               <Input type="number" className="mandate_input_box" name="max_amount" value={this.state.max_amount} onChange={this.onChangeHandler}/>
               : this.state.max_amount}</td>
             <td>{this.state.hide_edit === true ? '' : <FontAwesomeIcon icon="edit" className="eciticon_color" onClick={()=>{this.edit_mandate('maxAmount')}}/>}
             </td>
           </tr>
           <tr>
             <td>Amount Type</td>
             <td className="row_bold">{this.state.amount_type}</td>
             <td></td>
           </tr>
           <tr>
             <td>Frequency</td>
             <td className="row_bold">{this.state.frequency}</td>
             <td></td>
           </tr>
           <tr>
             <td>Created on</td>
             <td className="row_bold">{this.state.created_on}</td>
             <td></td>
           </tr>
           <tr className="table-bottom-border">
             <td>Status</td>
             <td className="row_bold">{this.state.status}</td>
             <td></td>
           </tr>
           </tbody>
         </table>
         <div className="common-btn">
           <UISref to="MandateList"><Button className="btn back-btn">Back</Button></UISref>
           <Button className="btn confirm-btn" disabled={!this.state.hide_edit} onClick={this.saveMandate}>Confirm</Button>
         </div>
       </div>
     );
   }
}

const mapStateToProps = (state) => {
  return {
    enrolment: state.enrolment,
    card_details: state.card_details
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoader: (isLoading) => dispatch(actionType.updateLoader(isLoading))
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (Mandate);
