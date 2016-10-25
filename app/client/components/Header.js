import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

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
      <MuiThemeProvider>
        <div className="main-topbar">
          <div className="appbar">
            <div className="appbar-drawerbtn">
              <IconButton iconClassName="material-icons" onClick={this.toggleLeftDrawer.bind(this)}>menu</IconButton>
            </div>
            <div className="search-box">
              <input type="text" className="search-box__input" placeholder="Search"/>
            </div>
          </div>
          <Drawer open={this.state.openLeftDrawer} docked={false}
                  onRequestChange={this.handleClose.bind(this)}>
            <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item</MenuItem>
            <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item 2</MenuItem>
          </Drawer>
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
      </MuiThemeProvider>
    )
  }
}

export default MainTop;