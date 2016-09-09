import './public/less/base.less';
import  'sweetalertcss';
// import swal from 'sweetalert';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/app.container';
import configureStore from './store/configureStore'


import {monitorIpc} from './helper/monitoripc';

const store = configureStore();

let rootElement = document.getElementById('app');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement);

monitorIpc();


