import React, { Component } from 'react';
import { Link } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


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

  render () {
    const { movie } = this.props;
    return (
      <div className="movie-card">
        <Link to={{ pathname: `/detail/${movie._id}`, query: { 'keywords': movie.metadata.title, 'synced': movie.metadata.synced } }}
              activeClassName="active">
          <Card>
            <div className="movie-card__poster">
              <img className="movie-card__poster-images"
                   src="http://fpoimg.com/180x245?text=No Images"/>
            </div>
            <div className="movie-card__info">
              <div className="movie-card__title">{movie.metadata.title}</div>
            </div>
          </Card>
        </Link>
      </div>
    )
  }
}

export default MovieItem;