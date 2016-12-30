import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScrollArea from 'react-scrollbar';
import HeadComponent from '../components/Header';


class App extends Component {
  constructor(props) {
    super(props);
    this.initData = this.initData.bind(this);
  }

  initData() {
    // 备用代码。打开文件夹的简单逻辑
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.initData();
    // dispatch(fetchMoviesInfo());
  }

  componentWillReceiveProps(nextprops) {
  }


  render() {
    return (
      <div className="app container-full">
        <div className="main">
          <HeadComponent />
          <ScrollArea
            speed={0.8}
            className=""
            contentClassName="content"
            horizontal={false}
          >
            <div className="main-body">
              <div className="container">
                <div className="row">
                  <div className="col-md-2">
                    <div className="sidebar">
                      <div className="sidebar-menu">
                        <div className="sidebar-menu-item">
                          <span className="material-icons">query_builder</span>
                          最近添加
                        </div>
                        <div className="sidebar-menu-item">
                          <span className="material-icons">movie</span>
                          影片
                        </div>
                        <div className="sidebar-menu-item">
                          <span className="material-icons">subscriptions</span>
                          剧集
                        </div>
                        <div className="sidebar-menu-item">
                          <span className="material-icons">web_asset</span>
                          未分类
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10">
                    {this.props.children}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {}
};

export default connect(
  mapStateToProps
)(App);