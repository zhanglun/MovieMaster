import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import SearchResultDialog from '../components/SearchResultDialog';

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

const styles = {
  processBar: {
    height: '100%',
    background: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
};

class MovieDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      openDialog: false,
      isLoading: true,
      info: {
        detail: { title: '' },
        metadata: {}
      }
    };
  }

  componentWillMount () {
    console.log('willMount');
    let { location } = this.props;
    let synced = location.query.synced;
    this.state.isLoading = true;
    if (synced == 'true') {
      this.setState({ openDialog: false });
      // 从本地拿数据
      ipcRenderer.send('fetch_movie_data', { _id: this.props.params.id });
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 100);
    } else if (synced == 'false') {
      // 请求douban API 详情
      this.setState({ openDialog: true });
      // https://api.douban.com/v2/movie/subject/
      // TODO: 根据豆瓣 id 获取详情
    }
  }

  componentWillUpdate () {
    console.log('willUpdate');
  }

  componentWillUnmount () {
    console.log('willUnmount');
  }

  showLoading () {
    if (this.state.isLoading) {
      return (
        <div style={styles.processBar}>
          <LinearProgress mode="indeterminate" color=""/>
        </div>
      );
    }
  }

  showSearchResult () {
    let { location } = this.props;
    let keywords = location.query.keywords;
    if (this.state.openDialog) {
      return (
        <SearchResultDialog
          open={this.state.openDialog}
          movieid={this.props.params.id}
          keywords={keywords}
        />
      );
    }
  }

  showDetail () {
    let { detail } = this.props;
    return (
      <div>
        {/*<h2>{detail.title}</h2>*/}
        {/*<img src={detail.images.small} alt=""/>*/}
        {/*<div>{detail.title}</div>*/}
        {/*<div>{detail.original_title}</div>*/}
        {/*<div>{detail.year}</div>*/}
        {JSON.stringify(detail)}
      </div>
    )
  }

  render () {
    return (
      <div className="detail-container">
        {this.showSearchResult()}
        {this.showLoading()}
        {this.showDetail()}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    detail: state.movies.detail,
    isFetching: state.movies.isFetching,
    searchResult: state.movies.searchResult,
  }
}

export default connect(mapStateToProps)(MovieDetail);

