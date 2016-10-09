//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSearchMovieInDouban } from '../actions';

class MovieDetail extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    let { dispatch, params, location} = this.props;
    let keyword = params.id;
    console.log(this.props);
    dispatch(requestSearchMovieInDouban(keyword));
  }

  render() {
    return (
      <div><h1>这里是movie detail </h1></div>
    )
  }
}

function mapStateToProps(state) {
  return {
    detail: state.movies.detail
  }
}

export default connect(mapStateToProps)(MovieDetail);

