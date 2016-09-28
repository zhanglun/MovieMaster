import './index.less';

import React, { Component } from 'react';
import MovieItem from '../movieItem';

class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { movies } = this.props;
    return (
      <div className="movies--list">
        <table>
          <thead>
          <tr>
            <th>类型</th>
            <th>title</th>
            <th>路径</th>
          </tr>
          </thead>
          <tbody>
          {movies.items.map((movie) => {
            return (
              <tr key={movie.path}>
                <th>{movie.suffix}</th>
                <th>{movie.title}</th>
                <th>{movie.path}</th>
              </tr>
            )
          })}
          </tbody>
        </table>
        {/*{movies.items.map((movie) => {*/}
        {/*return <MovieItem key={movie.id} movie={movie}></MovieItem>*/}
        {/*})}*/}
        {/*{movies.searchResult.map((movie) => {*/}
        {/*return <MovieItem key={movie.id} movie={movie}></MovieItem>*/}
        {/*})}*/}
      </div>
    )
  }
}

export default MovieList;