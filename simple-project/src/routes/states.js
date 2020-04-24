import App from '../components/App';
import Home from '../components/home/Home';
import LandingPage from '../components/landing/LandingPage';
import MandateList from '../components/mandateList/MandateList';
import ShowMandate from '../components/showMandate/ShowMandate';
import ViewInvoice from '../components/viewInvoice/ViewInvoice';
import EditInvoice from '../components/viewInvoice/EditInvoice';
import ShowInvoiceTab from '../components/showMandate/ShowInvoiceTab';
import Invoice from '../components/showMandate/Invoice';


const app = {
  name: 'app',
  redirectTo: 'home',
  component: App
};

const home = {
  parent: 'app',
  name: 'home',
  redirectTo: 'landing',
  url: '/home',
  component: Home
};

const landing = {
  parent: 'home',
  name: 'landing',
  url: '/landing',
  component: LandingPage
};

const mandate_list = {
  parent: 'home',
  name: 'MandateList',
  url: '/mandate-list',
  component: MandateList
};

const show_mandate = {
  parent: 'home',
  name: 'ShowMandate',
  url: '/view-mandate',
  component: ShowMandate
};

const show_invoice = {
  parent: 'ShowMandate',
  name: 'ShowInvoice',
  redirectTo: 'ViewInvoice',
  component: ShowInvoiceTab
};

const view_invoice = {
  parent: 'ShowInvoice',
  name: 'ViewInvoice',
  url: '/view-invoice',
  component: Invoice
};

const edit_invoice = {
  parent: 'ShowInvoice',
  name: 'EditInvoice',
  url: '/edit-invoice',
  component: EditInvoice
};
export default [app, home, landing, mandate_list, show_mandate, show_invoice, view_invoice, edit_invoice];
