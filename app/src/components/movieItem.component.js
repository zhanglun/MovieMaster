import React, { Component } from 'react';

class MovieItem extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {movie} = this.props;
    return (
      <div>
        <p>{movie.name}</p>
        <img src={movie.poster} />
      </div>
    )
  }
}

export default MovieItem;