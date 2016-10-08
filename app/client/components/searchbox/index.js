import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'
import { requestSearchMovie } from '../../actions';

class SearchBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 'hello!'
    };
  }
  componentDidMount() {
    var value = this.refs.input.value;
    if(value == ''){
      hashHistory.push('/movie');
    }
  }
  search (event) {
    let { dispatch } = this.props;
    if (event.keyCode == 13) {
      let keyword = encodeURIComponent(event.target.value);
      dispatch(requestSearchMovie(keyword));
      hashHistory.push('/search?q=' + keyword);
    }else if(event.target.value == ''){
      hashHistory.push('/movie');
    }
  }

  render () {
    return (
      <div className="searchbox">
        <input ref='input' type="text" placeholder="电影名称搜索" className="searchbox-input"
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