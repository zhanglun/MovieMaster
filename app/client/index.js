import './public/less/base.less';
import  'sweetalertcss';
// import swal from 'sweetalert';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/app.container';
import MovieContainer from './containers/movie.container';
import MovieDetail from './components/movieDetail';
import SearchResultContainer from './containers/searchResult.container';

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
        <Route path="episode" component={MovieContainer}/>
        <Route path="detail/:id" component={MovieDetail}/>
        <Route path="search" component={SearchResultContainer}/>
      </Route>
    </Router>
  </Provider>,
  rootElement);

