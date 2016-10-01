import './index.less';
import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { requestSearchMovie } from '../../actions';

class SearchBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 'hello!'
    };
  }

  search (event) {
    let { dispatch } = this.props;
    if (event.keyCode == 13) {
      let keyword = event.target.value;
      console.log('keyword: ', keyword);
      browserHistory.push('/aaa');
      dispatch(requestSearchMovie(keyword));
    }
  }

  render () {
    let { props } = this.props;
    return (
      <div className="searchbox">
        <input type="text" placeholder="电影名称搜索" className="searchbox-input"
               onKeyUp={this.search.bind(this)}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies
  }
}

export default connect(mapStateToProps)(SearchBox);