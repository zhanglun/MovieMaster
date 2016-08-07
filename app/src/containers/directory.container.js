import React, { Component } from 'react';
import { connect } from 'react-redux';
import DirectoryItem from '../components/directoryItem.component';

class Directory extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const props = this.props;
    return (
      <div className="sidebar sidebar__folding">
        {props.directoryList.map((data) => {
          return <DirectoryItem key={data.id} data={data}/>
        })}
        <div>添加</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    directoryList: state.directoryList || [{ id: '1', name: 'test1' }, { id: '2', name: 'test2' }],
  }
};

export default connect(mapStateToProps)(Directory);