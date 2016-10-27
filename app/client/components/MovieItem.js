import React, { Component } from 'react';
import { Link } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


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
  };

  createPost() {
    let { movie } = this.props;
    if (movie.synced) {
      return (
        <Card>
          <div className="movie-card__poster">
            <img src={movie.images.large} alt="" className="movie-card__poster-images"/>
          </div>
          <div className="movie-card__info">
            <div className="movie-card__title">{movie.title}</div>
          </div>
        </Card>
      )
    } else {
      return (
        <Card>
          <div className="movie-card__poster">
            <img src="http://fpoimg.com/160x225?text=No Images" alt="" className="movie-card__poster-images"/>
          </div>
          <div className="movie-card__info">
            <div className="movie-card__title">{movie.metadata.title}</div>
          </div>
        </Card>
      )
    }
  }


  render() {
    const { movie } = this.props;
    return (
      <div className="movie-card">
        <Link to={{
          pathname: `/detail/${movie._id}`,
          query: { 'keywords': movie.metadata.title, 'synced': movie.synced }
        }}
              activeClassName="active">
          {this.createPost()}
        </Link>
      </div>
    )
  }
}

export default MovieItem;