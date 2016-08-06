import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieItem from '../components/movieItem.component';

class MovieContainer extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const props = this.props;
    return (
      <div>
        {props.movies.map((movie) => {
          return <MovieItem key={movie.name} movie={movie}></MovieItem>
        })}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    movies: state.movie
  }
}

export default connect(mapStateToProps)(MovieContainer);