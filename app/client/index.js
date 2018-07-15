import './public/less/style.less';
import 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './containers/App';

import { monitorIpc } from './helper/monitoripc';

import configureStore from './store/configureStore'


const store = configureStore();

// 监听来自主进程的事件通知
monitorIpc(store);

let rootElement = document.getElementById('app');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement);
