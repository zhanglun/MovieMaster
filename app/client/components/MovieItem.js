import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';

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
      <MuiThemeProvider>
        <Card className="movie-card">
          {/*<CardHeader*/}
            {/*title="URL Avatar"*/}
            {/*subtitle="Subtitle"*/}
            {/*avatar="images/jsa-128.jpg"*/}
          {/*/>*/}
          <CardMedia>
          </CardMedia>
          <CardTitle title={movie.title} subtitle="Card subtitle" />
          <CardText>
          </CardText>
          <CardActions>
            <div className="movie-card__info">
              <div className="movie-card__title">
                <Link to={{pathname: '/detail/' + movie.title+ movie.year}} className="movie-card__title-link" >
                  {movie.title}
                </Link>
              </div>
            </div>
          </CardActions>
        </Card>
        </MuiThemeProvider>
    )
  }
}

export default MovieItem;