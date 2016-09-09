import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieList from '../components/movieList';

class MovieContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const props = this.props;
    console.log(props.movies);
    return (
      <MovieList movies={props.movies}></MovieList>
    )
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies
  }
}

export default connect(mapStateToProps)(MovieContainer);