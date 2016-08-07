import './index.less';
import React, { Component } from 'react';

class MovieItem extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { movie } = this.props;
    return (
      <div className="movie-card">
        <div className="movie-card__poster">
          <img className="movie-card__poster-img" src={movie.poster}/>
        </div>
        <div className="movie-card__info">
          <div className="movie-card__title">{movie.name}</div>
        </div>
      </div>
    )
  }
}

export default MovieItem;