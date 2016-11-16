import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
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
  button: {
    margin: 12,
  }
};

class MovieDetail extends Component {
  constructor(props) {
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

  componentWillMount() {
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
    }
  }

  componentWillUpdate() {
    console.log('willUpdate');
  }

  componentWillUnmount() {
    console.log('willUnmount');
  }

  showLoading() {
    if (this.state.isLoading) {
      return (
        <div style={styles.processBar}>
          <LinearProgress mode="indeterminate" color=""/>
        </div>
      );
    }
  }

  showSearchResult() {
    let { location } = this.props;
    let keywords = location.query.keywords;
    if (this.state.openDialog) {
      return (
        <SearchResultDialog
          open={this.state.openDialog}
          movieId={this.props.params.id}
          keywords={keywords}
        />
      );
    }
  }

  showDialog() {
    this.setState({ openDialog: true });
  }

  render() {
    let { detail } = this.props;
    console.log(detail);
    let countries = [].concat(detail.countries).join('/');
    let genres = [].concat(detail.genres).join('/');
    let metadata = Object.assign({}, detail.metadata);
    console.log('aaaa', metadata.duration);
    return (
      <div className="detail-container">
        {this.showSearchResult()}
        {this.showLoading()}
        <div className="detail-header">
          <img src={detail.images.large} alt="" className="detail-poster"/>
          <h2>{detail.title} {detail.original_title}</h2>
          <div>{metadata.duration}</div>
          <div>{detail.year} {countries}</div>
          <div>{genres}</div>
          <div>{detail.summary}</div>
        </div>
        <div className="detail-body">
          <h3>The Casts</h3>
          <div className="detail-cast-list">
            {detail.casts.map((cast, i) => {
              return (<div key={i} className="detail-cast-item">
                <img src={cast.avatars.medium} alt="" className="detail-cast-avatar"/>
                <span>{cast.name}</span>
              </div>)
            })}
          </div>
        </div>
        <RaisedButton label="搜索" style={styles.button}
                      onClick={this.showDialog.bind(this)}/>
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

