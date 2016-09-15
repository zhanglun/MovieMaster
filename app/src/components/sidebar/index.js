import './index.less';
import React, { Component } from 'react';

class SideBar extends Component {
  constructor (props) {
    super(props);
  }


  render () {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-setting__item" onClick={this.showFolders}>
            <span className="material-icons">folder</span>
            添加
          </div>
          <div className="sidebar-setting__item">
            <span className="material-icons">settings</span>
            设置
          </div>
        </div>
        <div className="sidebar-body">
          <div className="side-menu__title">
            分类
          </div>
          <div className="side-menu">
            <div className="side-menu__item">
              <span className="material-icons">movie</span>
              全部
            </div>
            <div className="side-menu__item">
              <span className="material-icons">movie</span>
              电影
            </div>
            <div className="side-menu__item">
              <span className="material-icons">movie</span>
              剧集
            </div>
          </div>
        </div>
        <div className="sidebar-footer">

        </div>
      </div>
    );
  }
}

export default SideBar;