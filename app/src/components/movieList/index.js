import './index.less';

import React, { Component } from 'react';
import MovieItem from '../movieItem';

class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { movies } = this.props;
    console.log(movies);
    return (
      <div className="movie-list">
        {movies.items.map((movie) => {
          return <MovieItem key={movie._id} movie={movie}></MovieItem>
        })}
      </div>
    )
  }
}

export default MovieList;