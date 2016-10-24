import React, { Component } from 'react';
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
  }

  editThis() {
    alert('edit this ');
  }

  render() {
    const { movie } = this.props;
    return (
      <div className="movie-card">
        <Card>
          <CardMedia>
            <img src="http://fpoimg.com/300x300?text=暂无图片"/>
          </CardMedia>
          {/*<CardTitle title={movie.title}/>*/}
          <div className="movie-card__title">{movie.title}</div>
          <CardActions>
            <FlatButton label="Action1"/>
            <FlatButton label="Action2"/>
          </CardActions>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      </div>
    )
  }
}

export default MovieItem;