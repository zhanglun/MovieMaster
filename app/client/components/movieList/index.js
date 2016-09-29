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
        <table className="table--striped">
          <thead>
          <tr>
            <th>片名</th>
            <th>类型</th>
            <th>大小</th>
            <th>时长</th>
            <th>路径</th>
          </tr>
          </thead>
          <tbody>
          {movies.items.map((movie) => {
            return (
              <tr key={movie.path}>
                <td><div className="movieinfo-item__title">{movie.title}</div></td>
                <td>{movie.suffix}</td>
                <td><div className="movieinfo-item__size">{movie.size}</div></td>
                <td>{movie.duration}</td>
                <td><div className="movieinfo-item__path">{movie.path}</div></td>
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