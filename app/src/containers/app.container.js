import React, { Component } from 'react';
// import Counter from '../components/counter.component';
import Directory from '../containers/directory.container';
import { connect } from 'react-redux';

class App extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    const { dispatch } = this.props;
    return (
      <div className="app">
        <Directory />
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