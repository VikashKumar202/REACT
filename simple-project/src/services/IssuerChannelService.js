import JsonData from './FakeApi.json';
import InvoiceJsonData from './InvoiceApi.json'

class IssuerChannelService {

  get_card_details(card_no) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(card_no);
      }, 2000);
    });
  }

  get_merchant_details() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(JsonData);
      }, 1000);
    });
  }

  save_mandate(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
      }, 1000);
    });
  }

  get_invoices_details() {
    console.log(InvoiceJsonData);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(InvoiceJsonData);
      }, 1000);
    });
  }

  save_invoice(invoice_id){
    console.log('Service Called',invoice_id)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(invoice_id);
      }, 1000);
    });
  }
  
}


export default new IssuerChannelService();
