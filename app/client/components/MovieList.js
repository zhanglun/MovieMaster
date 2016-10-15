import React, { Component } from 'react';
import MovieItem from './MovieItem';

class MovieList extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { movies } = this.props;
    return (
      <div className="movies--list">
        {movies.map((movie) => {
          return <MovieItem key={movie.path} movie={movie}></MovieItem>
        })}
      </div>
    )
  }
}

export default MovieList;