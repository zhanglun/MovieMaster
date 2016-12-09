import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';

class MainTop extends Component {
  constructor (props) {
    super(props);
    this.state = {
      openLeftDrawer: false,
      value: 3,
    };
  }

  toggleLeftDrawer () {
    this.setState({ openLeftDrawer: !this.state.openLeftDrawer });
  }

  handleClose () {
    this.setState({ openLeftDrawer: false });
  }

  render () {
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
    )
  }
}

export default MainTop;