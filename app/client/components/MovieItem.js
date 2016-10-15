import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';


class MovieItem extends Component {
  constructor (props) {
    super(props)
  }

  maybeRenderAlias () {
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

  editThis () {
    alert('edit this ');
  }

  render () {
    const { movie } = this.props;
    return (
      <div className="movie-card__info">
        <div className="movie-card__title" onClick={this.editThis.bind(this)}>{movie.title}
        </div>
      </div>
    )
  }
}

export default MovieItem;