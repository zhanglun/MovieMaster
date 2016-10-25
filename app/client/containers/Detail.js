//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { requestSearchMovieInDouban } from '../actions';

class MovieDetail extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    let { dispatch, params, location } = this.props;
    let keyword = params.id;
    dispatch(requestSearchMovieInDouban(keyword));
  }


  render () {
    const style = {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    return (
      <div className="detail-container">
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

