import React from 'react';
import ReactDOM from 'react-dom';
import {router} from "./routes/router-config";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {UIRouter, UIView} from "@uirouter/react";
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import reducer from './store/reducer/reducer';

const store=createStore(reducer);

ReactDOM.render( <Provider store={store}>
      <UIRouter router={router}>
        <div>
            <UIView/>
        </div>
      </UIRouter>
      </Provider>,
  document.getElementById('root')
);
