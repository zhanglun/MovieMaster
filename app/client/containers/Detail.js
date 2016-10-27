import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchMovieInDoubanAsync } from '../actions';
import SearchResultDialog from '../components/SearchResultDialog';

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      info: {
        detail: { title: '' },
        metadata: {}
      }
    };
  }

  componentWillMount() {
    let { dispatch, location } = this.props;
    let keywords = location.query.keywords;
    let synced = location.query.synced;
    if (synced == 'true') {
      this.setState({ openDialog: false });
      // 从本地拿数据
      ipcRenderer.send('fetch_movie_data', { _id: this.props.params.id });
    } else if (synced == 'false') {
      // 请求douban API 显示弹窗
      this.setState({ openDialog: true });
      dispatch(searchMovieInDoubanAsync(keywords));
    }
  }

  render() {
    let state = this.state;
    let props = this.props;
    let detail = props.detail;
    return (
      <div className="detail-container">
        <SearchResultDialog open={state.openDialog} data={props.searchResult} movieid={this.props.params.id}/>
        <h2>{detail.title}</h2>
        <img src={detail.images.large} alt=""/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    detail: state.movies.detail,
    isFetching: state.movies.isFetching,
    searchResult: state.movies.searchResult,
  }
}

export default connect(mapStateToProps)(MovieDetail);

