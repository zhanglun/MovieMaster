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
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

class MainTop extends Component {
  constructor (props) {
    super(props);
    this.state = {
      openLeftDrawer: false,
      value: 3,
    };
  }

/*  historyBack () {
    console.log(hashHistory);
    hashHistory.goBack();
  }

  historyForward () {
    console.log(hashHistory);
    hashHistory.goForward();
  }*/

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
        </div>
      </MuiThemeProvider>
    )
  }
}

export default MainTop;