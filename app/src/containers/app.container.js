import React, { Component } from 'react';
// import Counter from '../components/counter.component';
import DirectoryContainer from '../containers/directory.container';
import MovieContainer from '../containers/movie.container';
import { connect } from 'react-redux';

class App extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="app">
        <DirectoryContainer />
        <MovieContainer />
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