import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/sidebar';

class SidebarContainer extends Component {
  constructor (props) {
    super(props);
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

export default connect(mapStateToProps, null, null, {
  pure: false
})(SidebarContainer);