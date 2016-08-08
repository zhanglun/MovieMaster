import './index.less';

import React, { Component } from 'react';
import MovieItem from '../movieItem';

class MovieList extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { movies } = this.props;
    return (
      <div className="movie-list">
        {movies.map((movie) => {
          return <MovieItem key={movie.name} movie={movie}></MovieItem>
        })}
      </div>
    )
  }
}

export default MovieList;