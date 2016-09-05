import './index.less';

import React, { Component } from 'react';
import MovieItem from '../movieItem';

class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { movies } = this.props;
    return (
      <div className="movie-list">
        {movies.items.map((movie) => {
          return <MovieItem key={movie.id} movie={movie}></MovieItem>
        })}
      </div>
    )
  }
}

export default MovieList;