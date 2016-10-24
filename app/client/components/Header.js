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
  constructor(props) {
    super(props);
    this.state = {
      openLeftDrawer: false,
      value: 3,
    };
  }

  historyBack() {
    console.log(hashHistory);
    hashHistory.goBack();
  }

  historyForward() {
    console.log(hashHistory);
    hashHistory.goForward();
  }

  renderHistoryToolbar() {
    console.log(this);
  }

  toggleLeftDrawer() {
    console.log('---->');
    this.setState({ openLeftDrawer: !this.state.openLeftDrawer });
  }

  handleClose() {
    this.setState({ openLeftDrawer: false });
  }

  render() {
    const muiTheme = getMuiTheme({
      palette: {
        accent1Color: deepOrange500,
      },
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="main-topbar">
          <AppBar title="appbar" onLeftIconButtonTouchTap={this.toggleLeftDrawer.bind(this)}>
            {this.renderHistoryToolbar()}
          </AppBar>
          {/*<Toolbar>*/}
          {/*<ToolbarGroup firstChild={true}>*/}
          {/*<DropDownMenu value={this.state.value} onChange={this.handleChange}>*/}
          {/*<MenuItem value={1} primaryText="All Broadcasts"/>*/}
          {/*<MenuItem value={2} primaryText="All Voice"/>*/}
          {/*<MenuItem value={3} primaryText="All Text"/>*/}
          {/*<MenuItem value={4} primaryText="Complete Voice"/>*/}
          {/*<MenuItem value={5} primaryText="Complete Text"/>*/}
          {/*<MenuItem value={6} primaryText="Active Voice"/>*/}
          {/*<MenuItem value={7} primaryText="Active Text"/>*/}
          {/*</DropDownMenu>*/}
          {/*</ToolbarGroup>*/}
          {/*<ToolbarGroup>*/}
          {/*<div className="history-toolbar">*/}
          {/*<div className="history-toolbar__item" onClick={this.historyBack.bind(this)}>*/}
          {/*<FontIcon className="material-icons">chevron_left</FontIcon>*/}
          {/*</div>*/}
          {/*<div className="history-toolbar__item" onClick={this.historyForward.bind(this)}>*/}
          {/*<FontIcon className="material-icons">chevron_right</FontIcon>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*<ToolbarSeparator />*/}
          {/*</ToolbarGroup>*/}
          {/*</Toolbar>*/}
          <Drawer open={this.state.openLeftDrawer} docked={false} onRequestChange={this.handleClose.bind(this)}>
            <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item</MenuItem>
            <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item 2</MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default MainTop;