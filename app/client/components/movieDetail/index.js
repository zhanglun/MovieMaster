//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import { requestSearchMovieInDouban } from '../../actions';

class MovieDetail extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    let { location } = this.props;
    let keyword = this.props.params.id;
    console.log(this.props);
    // dispatch(requestSearchMovieInDouban(keyword));
  }

  render () {
    return (
      <div><h1>这里是movie detail </h1></div>
    )
  }
}

export default MovieDetail;