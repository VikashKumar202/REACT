import React, { Component } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './ShowMandate.css';
import Mandate from './Mandate';
import { connect } from 'react-redux';
import ShowInvoiceTab from './ShowInvoiceTab';

class ShowMandate extends Component {

  constructor(props) {
    super(props);
    this.state={
      tabIndex: 0
    }
  }

  goto = () => {
    let { transition } = this.props;
    transition.router.stateService.go('MandateList');
  };

  tabChange=(tabIndex)=>{
    this.setState({tabIndex: tabIndex});
    let { transition } = this.props;
    if(tabIndex === 0){
      transition.router.stateService.go('ShowMandate');
    }else if(tabIndex == 1){
      transition.router.stateService.go('ViewInvoice');
    }
  };

  render() {
    let card = this.props.card_details;
    let last_4_digits = card.substring(card.length - 4);
    return (
      <div className="content_mandate">
        <div className="content-wrap">
          <div className="main_panel">
            <div className="card_panel">
              <a>
                <button className="btn btn-link linkbtn" onClick={this.goto}>Back</button>
              </a>
              <p>E- Mandate for card ending {last_4_digits}</p>
            </div>
            <div className="mi_btns">
              <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.tabChange(tabIndex)}>
                <TabList className=" btn-group btn-group-toggle group-bittons">
                  <Tab className="btn mandate_btn">Mandate</Tab>
                  <Tab className="btn invoice_btn">Invoices</Tab>
                </TabList>
                <TabPanel>
                  <Mandate />
                </TabPanel>
                <TabPanel>
                  <ShowInvoiceTab/>
                </TabPanel>
              </Tabs>
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

export default connect(mapStateToProps, null)(ShowMandate);
