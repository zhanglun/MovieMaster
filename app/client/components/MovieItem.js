import React, { Component } from 'react';
import { Link } from 'react-router';

class MovieItem extends Component {
  constructor(props) {
    super(props)
  }

  createPost() {
    let { movie } = this.props;
    if (movie.synced) {
      return (
        <div>
          <div className="movie-card__poster">
            <img src={movie.images.large} alt="" className="movie-card__poster-images"/>
          </div>
          <div className="movie-card__info">
            <div className="movie-card__title">{movie.title}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="movie-card__poster">
            <img src="http://fpoimg.com/160x225?text=No Images" alt="" className="movie-card__poster-images"/>
          </div>
          <div className="movie-card__info">
            <div className="movie-card__title">{movie.metadata.title}</div>
          </div>
        </div>
      )
    }
  }


  render() {
    const { movie } = this.props;
    return (
      <div className="movie-card">
        <Link to={{
          pathname: `/movies/${movie._id}`,
          query: { 'keywords': movie.metadata.title, 'synced': movie.synced }
        }}
              activeClassName="active"
        >
          {this.createPost()}
        </Link>
      </div>
    )
  }
}

export default MovieItem;