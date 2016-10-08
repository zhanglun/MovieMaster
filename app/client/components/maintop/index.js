import './index.less';
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import SearchBoxComponent from '../searchbox';

class MainTop extends Component {
  constructor(props) {
    super(props);
  }
  historyBack() {
    hashHistory.goBack();
  }
  historyForward() {
    hashHistory.goForward();
  }
  render() {
    console.log(hashHistory);
    return (
      <div className="main-topbar">
        <div className="history-toolbar">
          <div className="history-toolbar__item" onClick={this.historyBack.bind(this)}><span className="material-icons">chevron_left</span></div>
          <div className="history-toolbar__item" onClick={this.historyForward.bind(this)}><span className="material-icons">chevron_right</span></div>
        </div>
        <SearchBoxComponent />
      </div>
    )
  }
}

export default MainTop;