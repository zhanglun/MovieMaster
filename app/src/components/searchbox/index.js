import './index.less';

import React, { Component } from 'react';

class SearchBox extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="searchbox">
        <input type="text" placeholder="电影名称搜索" className="searchbox-input"/>
      </div>
    )
  }
}

export default SearchBox;