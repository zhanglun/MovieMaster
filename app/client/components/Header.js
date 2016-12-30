import React, { Component } from 'react';
import { Link } from 'react-router';

class MainTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLeftDrawer: false,
      value: 3,
    };
  }

  historyBack() {
    window.history.back();
  }

  renderHeaderNavBar() {
    return (
      <nav className="navbar navbar-default navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="btn-toolbar" role="toolbar">
              <div className="btn-group" role="group">
                <span type="button" className="btn btn-sm btn-primary navbar-btn material-icons"
                      onClick={this.historyBack.bind(this)}>
                  chevron_left</span>
                <span type="button" className="btn btn-sm btn-primary navbar-btn material-icons">
                  chevron_right
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  renderCustomNavBar() {
    return (
      <div className="main-topbar">
        <div className="appbar">
          <div className="appbar-drawerbtn">
          </div>
          <div className="search-box">
            <input type="text" className="search-box__input" placeholder="Search"/>
          </div>
        </div>
        <div className="action-bar">
          <div className="action-bar__item">
            <span className="action-bar__link">Genres
              {/*<span className='material-icons'>expand_more</span>*/}
            </span>
          </div>
          <div className="action-bar__spacer"></div>
          <div className="action-bar__item">
            <Link className="action-bar__link" activeClassName="action-bar__link--active"
                  to={'/'}>Home</Link>
          </div>
          <div className="action-bar__item">
            <Link className="action-bar__link">Recent</Link>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      // this.renderHeaderNavBar()
      this.renderCustomNavBar()
    )
  }
}

export default MainTop;