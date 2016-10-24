import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { deepOrange500 } from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';

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
    const muiTheme = getMuiTheme({
      palette: {
        accent1Color: deepOrange500,
      },
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
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
          <div className="action-bar-box">
            <div className="action-bar-box__item">
              <span>Genres</span>
            </div>
            <div className="action-bar-spacer"></div>
            <div className="action-bar-box__item">
              <span>Home</span>
            </div>
            <div className="action-bar-box__item">
              <span>Recent</span>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default MainTop;