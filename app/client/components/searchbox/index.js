import './index.less';
import electron from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'
import { requestSearchMovie } from '../../actions';

const ipcRenderer = electron.ipcRenderer;

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
      dispatch(requestSearchMovie(keyword));
      hashHistory.push('/search?q=' + keyword);
      // ipcRenderer.send('opensubwindow', { type: 'search', data: {keywords: keyword} });
    }else if(event.target.value == ''){
      hashHistory.push('/movie');
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

function mapStateToProps (state) {
  return {
    movies: state.movies
  }
}

export default connect(mapStateToProps)(SearchBox);