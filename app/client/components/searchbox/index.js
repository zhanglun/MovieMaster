import './index.less';
import * as IPCTYPE from '../../constant/ipcType'
import electron from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSearchMovie } from '../../actions';

const remote = electron.remote;
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
      console.log('keyword: ', keyword);
      dispatch(requestSearchMovie(keyword));
      // ipcRenderer.send('opensubwindow', { type: 'search' });
      global.searchWindow ? global.searchWindow.close() : null;
      const { BrowserWindow } = require('electron').remote;
      let searchWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // frame: false,
        parent: global.TopWindow,
        modal: true,
        show: false
      });
      searchWindow.loadURL('https://github.com');
      searchWindow.show();
      searchWindow.on('closed', (e)=> {
        global.searchWindow = null;
      });
      global.searchWindow = searchWindow;
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