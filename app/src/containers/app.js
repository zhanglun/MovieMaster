import React, { Component } from 'react';
import Counter from '../components/counter.component';
import { connect } from 'react-redux';

export default class App extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    const { dispatch } = this.props;
    console.log(this.props);
    return (
      <div>
        <Counter value={this.props.counter}
                 onIncrement={() => dispatch({ type: 'INCREMENT' })}
                 onDecrement={() => dispatch({ type: 'DECREMENT' })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    counter: state.counter
  }
};

export default connect(
  mapStateToProps
)(App);