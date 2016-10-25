import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSearchMovieInDouban } from '../actions';
import Dialog from '../components/ui/Dialog';

class MovieDetail extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    let { dispatch, location } = this.props;
    let keywords = location.query.keywords;
    dispatch(requestSearchMovieInDouban(keywords));
  }


  render () {
    return (
      <div className="detail-container">
        <Dialog></Dialog>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    detail: state.movies.detail
  }
}

export default connect(mapStateToProps)(MovieDetail);

