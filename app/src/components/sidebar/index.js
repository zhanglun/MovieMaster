import './index.less';
import React, { Component } from 'react';

class SideBar extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-setting__item" onClick={this.showFolders}>
            <span className="material-icons">folder</span>
            添加文件夹
          </div>
          <div className="sidebar-setting__item">
            <span className="material-icons">settings</span>
            设置
          </div>
        </div>
        <div className="sidebar-body">

        </div>
        <div className="sidebar-footer">

        </div>
      </div>
    );
  }
}

export default SideBar;