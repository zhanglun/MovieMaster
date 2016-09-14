import './index.less';
import React, { Component } from 'react';

import SearchBoxComponent from '../searchbox';

class MainTop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-topbar">
        <SearchBoxComponent />
      </div>
    )
  }
}

export default MainTop;