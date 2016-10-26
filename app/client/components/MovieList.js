import React, { Component } from 'react';
import MovieItem from './MovieItem';

class MovieList extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { movies } = this.props;
    return (
      <div className="movie-list">
        {movies.map((movie) => {
          let metadata = movie.metadata;
          return <MovieItem key={metadata.path} movie={movie}></MovieItem>
        })}
      </div>
    )
  }
}

export default MovieList;