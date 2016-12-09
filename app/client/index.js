import './public/less/style.less';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './containers/App';
import MovieContainer from './containers/Movies';
import Detail from './containers/Detail';

import { monitorIpc } from './helper/monitoripc';

import configureStore from './store/configureStore'


const store = configureStore();

// 监听来自主进程的事件通知
monitorIpc(store);

let rootElement = document.getElementById('app');
render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={MovieContainer}/>
        <Route path="movie" component={MovieContainer}/>
        <Route path="detail/:id" component={Detail}/>
      </Route>
    </Router>
  </Provider>,
  rootElement);

