import './index.less';
import React, { Component } from 'react';

import SearchBoxComponent from '../searchbox';

class MainTop extends Component {
  constructor(props) {
    super(props);
  }
  historyGoBack() {
    window.history.back();
  }
  render() {
    return (
      <div className="main-topbar">
        <span onClick={this.historyGoBack.bind(this)}>返回</span>
        <SearchBoxComponent />
      </div>
    )
  }
}

export default MainTop;