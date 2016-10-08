import './index.less';
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

  getDirectorList (list) {
    let result = list.map((i) => {
      return i.name;
    });
    return result.join(',');
  }

  render () {
    const { movie } = this.props;
    return (
      <div className="movie-item--list">
        {/*<div className="movie-card__poster">*/}
        {/*<img className="movie-card__poster-img" src={movie.images.large}/>*/}
        {/*</div>*/}
        <div className="movie-card__info">
          <div className="movie-card__title">
            <Link to={'/detail/' + movie.title} className="movie-card__title-link">
              {movie.title}
            </Link>
            {/*<a className="movie-card__title-link" href={movie.alt}>{movie.title}</a>*/}
          </div>
          {/*          <div className="movie-card__info-item">
           <span className="movie-card__info-head">
           导演:
           </span>
           <span className="movie-card__info-content">
           {this.getDirectorList(movie.directors || [])}
           </span>
           </div>
           <div className="movie-card__info-item">
           <span className="movie-card__info-head">
           类型:
           </span>
           <span className="movie-card__info-content">
           {movie.genres.join(', ')}
           </span>
           </div>
           {this.maybeRenderAlias()}
           <div className="movie-card__info-item">
           <span className="movie-card__info-head">
           简介:
           </span>
           <span className="movie-card__info-content">
           /!*{movie.synopsis.slice(0, 56) + '...'}*!/
           </span>
           </div>*/}
        </div>
      </div>
    )
  }
}

export default MovieItem;