import React, { Component } from 'react';
import SidebarContainer from '../containers/sidebar.container';
import MovieContainer from '../containers/movie.container';
import { connect } from 'react-redux';

import { fetchMoviesInfo } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props);
    // dispatch(fetchMoviesInfo());
  }

  render() {
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
    movies: state.movies
  }
};

export default connect(
  mapStateToProps
)(App);