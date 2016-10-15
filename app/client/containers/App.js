import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeadComponent from '../components/Header';


class App extends Component {
  constructor (props) {
    super(props);
    this.initData = this.initData.bind(this);
  }

  initData () {
    // 备用代码。打开文件夹的简单逻辑
  }

  componentWillMount () {
  }

  componentDidMount () {
    this.initData();
    // dispatch(fetchMoviesInfo());
  }

  componentWillReceiveProps (nextprops) {
  }


  render () {
    return (
      <div className="app">
        <div className="main">
          <HeadComponent />
          <div className="main-body">
            {this.props.children}
          </div>
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