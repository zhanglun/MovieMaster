import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  componentDidMount() {
    let { location } = this.props;
    let synced = location.query.synced;
    this.state.isLoading = true;
    if (synced == 'true') {
      // 从本地拿数据
      ipcRenderer.send('fetch_movie_data', { _id: this.props.params.id });
      ipcRenderer.once('fetch_movie_data_success', (event, data) => {
        this.setState({
          isLoading: false,
          detail: data.result,
        });
      });
    } else if (synced == 'false') {
      // 没有数据
    }
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(newprops) {
    this.setState({
      isLoading: false,
      detail: newprops.detail
    });
  }

  showLoading() {
    if (this.state.isLoading) {
      return (
        <div style={styles.processBar}>
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped active"
              style={{ width: '100%' }}>
              <span className="sr-only">45% Complete</span>
            </div>
          </div>
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
    if (this.state.isLoading) {
      return this.showLoading();
    }
    let countries = [].concat(detail.countries).join('/');
    let genres = [].concat(detail.genres).join('/');
    let metadata = Object.assign({}, detail.metadata);
    return (
      <div className="detail-container">
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
            <span className="material-icons"
                  onClick={this.showDialog.bind(this)}>settings</span>
          </div>
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
        <span style={styles.button}
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

