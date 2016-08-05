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
      <div className="sidebar">
        <h4>Directory</h4>
        <button>添加</button>
        {props.directoryList.map((data) => {
          return <DirectoryItem key={data.id} data={data}/>
        })}
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