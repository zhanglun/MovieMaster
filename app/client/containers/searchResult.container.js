import React, {Component} from 'react';
import {connect} from 'react-redux';
import MovieList from '../components/movieList';


class SearchResultContainer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const props = this.props;
    return (
      <MovieList movies={props.movies}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
  }
}

export default connect(mapStateToProps(SearchResultContainer))