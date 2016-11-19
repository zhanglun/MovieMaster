import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';
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
      detail: {},
    };
  }

  componentWillMount() {
    let { location } = this.props;
    let synced = location.query.synced;
    this.state.isLoading = true;
    this.state.detail = this.props.detail;
    console.log(this.props.detail);
    if (synced == 'true') {
      this.setState({ openDialog: false });
      // 从本地拿数据
      ipcRenderer.send('fetch_movie_data', { _id: this.props.params.id });
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 5000);
    } else if (synced == 'false') {
      // 没有数据
    }
  }

  componentWillUpdate() {
  }

  componentWillUnmount() {
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

  onSelectData(data) {
    let metadata = this.state.detail.metadata;
    this.setState({ detail: Object.assign({}, metadata, data) });
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
          onSelectData={this.onSelectData.bind(this)}
        />
      );
    }
  }

  showDialog() {
    this.setState({ openDialog: true });
  }

  render() {
    let style = {
      fontSize: 22,
      fontStyle: 'italic',
      color: '#FFAC2D',
    };
    let { detail } = this.state;
    console.log(detail);
    let countries = [].concat(detail.countries).join('/');
    let genres = [].concat(detail.genres).join('/');
    let metadata = Object.assign({}, detail.metadata);
    return (
      <div className="detail-container">
        {this.showSearchResult()}
        {this.showLoading()}
        <div className="detail-header">
          <img src={detail.images.large} alt="" className="detail-poster"/>
          <h2
            className="detail-header-title">{detail.title} {detail.original_title} {detail.year}</h2>
          <div className="detail-metadata">
            <span className="detail-metadata-item">豆瓣评分: <b
              style={style}> {detail.rating.average}</b></span>
            <span className="detail-metadata-item">{countries}</span>
            |<span className="detail-metadata-item">{genres}</span>
            |<span className="detail-metadata-item">{metadata.duration}</span>
          </div>
          <div className="detail-summary">{detail.summary}</div>
          <div className="detail-toolbar">
            <IconButton iconClassName="material-icons"
                        onClick={this.showDialog.bind(this)}>settings</IconButton>
          </div>
        </div>
        <div className="detail-body">
          <h3>The Casts</h3>
          <div className="detail-cast-list">
            {/*{detail.casts.map((cast, i) => {*/}
            {/*return (<div key={i} className="detail-cast-item">*/}
            {/*<img src={cast.avatars.medium} alt="" className="detail-cast-avatar"/>*/}
            {/*<span>{cast.name}</span>*/}
            {/*</div>)*/}
            {/*})}*/}
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

