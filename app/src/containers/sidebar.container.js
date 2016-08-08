import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/sidebar';

class SidebarContainer extends Component {
  constructor (props) {
    super(props);
  }

  openFileDialog () {
    // TODO: 打开文件系统
    alert(11111);
  }

  render () {
    const props = this.props;
    return (
      <Sidebar></Sidebar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    directoryList: state.directoryList || [{ id: '1', name: 'test1' }, { id: '2', name: 'test2' }],
  }
};

export default connect(mapStateToProps)(SidebarContainer);