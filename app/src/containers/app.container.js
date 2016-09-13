import React, { Component } from 'react';
import SidebarContainer from '../containers/sidebar.container';
import MovieContainer from '../containers/movie.container';
import MainTopComponent from '../components/maintop';
import { connect } from 'react-redux';

import { fetchMoviesInfo } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.initData = this.initData.bind(this);
  }

  initData() {
    // 备用代码。打开文件夹的简单逻辑
  }

  componentWillMount() {
    console.log('componentWillMount()');
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.initData();
    const { dispatch } = this.props;
    dispatch(fetchMoviesInfo());
  }

  componentWillReceiveProps(nextprops) {
    console.log(nextprops);
  }


  render() {
    return (
      <div className="app">
        <SidebarContainer />
        <div className="main">
          <MainTopComponent />
          <MovieContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {}
};

export default connect(
  mapStateToProps
)(App);