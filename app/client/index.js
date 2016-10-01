import './public/less/base.less';
import  'sweetalertcss';
// import swal from 'sweetalert';
import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/app.container';
import MovieContainer from './containers/movie.container';
import SearchResultContainer from './containers/searchResult.container';

import { monitorIpc } from './helper/monitoripc';

import configureStore from './store/configureStore'


const store = configureStore();

// 监听来自主进程的事件通知
monitorIpc(store);

let rootElement = document.getElementById('app');
render(
  <Provider store={store}>
    {/*<App />*/}
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="movie" component={MovieContainer}/>
        <Route path="episode" component={MovieContainer}/>
        <Route path="search" component={SearchResultContainer}/>
        {/*<Route path="detail" component={detdail}>*/}
        {/*<Route path="/:id" component={Message}/>*/}
        {/*</Route>*/}
      </Route>
    </Router>
  </Provider>,
  rootElement);




