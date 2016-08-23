import './index.less';
import React, { Component } from 'react';

class MovieItem extends Component {
  constructor(props) {
    super(props)
  }

  maybeRenderAlias() {
    let movie = this.props.movie;
    if (movie.alias) {
      return (
        <div className="movie-card__info-item">
          <span className="movie-card__info-head">
          别名:
          </span>
          <span className="movie-card__info-content">
            {movie.alias}
          </span>
        </div>
      );
    }
  }

  render() {
    const { movie } = this.props;
    return (
      <div className="movie-card">
        <div className="movie-card__poster">
          <img className="movie-card__poster-img" src={movie.poster}/>
        </div>
        <div className="movie-card__info">
          <div className="movie-card__title">{movie.name} ({movie.region})</div>
          <div className="movie-card__info-item">
            <span className="movie-card__info-head">
              导演:
            </span>
            <span className="movie-card__info-content">
              {movie.director}
            </span>
          </div>
          <div className="movie-card__info-item">
            <span className="movie-card__info-head">
            类型:
            </span>
            <span className="movie-card__info-content">
              {movie.type}
            </span>
          </div>
          {this.maybeRenderAlias()}
          <div className="movie-card__info-item">
            <span className="movie-card__info-head">
            简介:
            </span>
            <span className="movie-card__info-content">
            {movie.synopsis.slice(0, 56) + '...'}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieItem;