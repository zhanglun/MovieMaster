import './index.less';

import React, { Component } from 'react';

class SideBar extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="sidebar sidebar__folding">
        {/*{props.directoryList.map((data) => {*/}
        {/*return <DirectoryItem key={data.id} data={data}/>*/}
        {/*})}*/}
        <div>
          <div className="sidebar-setting__item">
            <span className="material-icons">folder</span>
          </div>
        </div>
        <div>

          <div className="sidebar-setting__item" onClick={this.openFileDialog}>
            <span className="material-icons">add</span>
          </div>
          <div className="sidebar-setting__item">
            <span className="material-icons">settings</span>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;