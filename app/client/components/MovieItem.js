import React, { Component } from 'react';
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

  editThis () {
    alert('edit this ');
  }

  render () {
    const { movie } = this.props;
    return (
      <div className="movie-card">
        <Card>
          <div className="movie-card__poster">
            <img className="movie-card__poster-images"
                 src="http://fpoimg.com/160x245?text=No Images"/>
          </div>
          <div className="movie-card__info">
            <div className="movie-card__title">{movie.title}</div>
          </div>
        </Card>
      </div>
    )
  }
}

export default MovieItem;