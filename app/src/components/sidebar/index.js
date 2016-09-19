import './index.less';
import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';

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
            <Link to='/movie' className="side-menu__item" activeClassName="side-menu__item--active">
              <span className="material-icons">movie</span>
              电影
            </Link>
            <Link to='/episode' className="side-menu__item" activeClassName="side-menu__item--active">
              <span className="material-icons">movie</span>剧集
            </Link>
          </div>
        </div>
        <div className="sidebar-footer">

        </div>
      </div>
    );
  }
}

export default SideBar;