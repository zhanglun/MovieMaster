import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchMovieInDoubanAsync } from '../actions';
import Dialog from '../components/ui/Dialog';

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
    };
  }

  componentWillMount() {
    let { dispatch, location } = this.props;
    let keywords = location.query.keywords;
    let synced = location.query.synced;
    if (synced) {
      this.setState({ openDialog: false });
      // 从本地拿数据
    } else {
      // 请求douban API 显示弹窗
      this.setState({ openDialog: true });
      dispatch(searchMovieInDoubanAsync(keywords));
    }
  }


  render() {
    let state = this.state;
    return (
      <div className="detail-container">
        <Dialog open={state.openDialog}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    detail: state.movies.detail
  }
}

export default connect(mapStateToProps)(MovieDetail);

