import './index.less';
import React, { Component } from 'react';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.showFolders = this.showFolders.bind(this);
  }

  showFolders() {
    swal({
      title: "Sweet!", text: "Here's a custom image.",
    });
  }

  render() {
    return (
      <div className="sidebar sidebar__folding">
        {/*{props.directoryList.map((data) => {*/}
        {/*return <DirectoryItem key={data.id} data={data}/>*/}
        {/*})}*/}
        <div>
          <div className="sidebar-setting__item" onClick={this.showFolders}>
            <span className="material-icons">folder</span>
          </div>
        </div>
        <div>

          <div className="sidebar-setting__item">
            <span className="material-icons">settings</span>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;