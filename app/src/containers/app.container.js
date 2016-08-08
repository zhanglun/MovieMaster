import React, { Component } from 'react';
import SidebarContainer from '../containers/sidebar.container';
import MovieContainer from '../containers/movie.container';
import { connect } from 'react-redux';

class App extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="app">
        <SidebarContainer />
        <div className="main">
          <MovieContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
};

export default connect(
  mapStateToProps
)(App);