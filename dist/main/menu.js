'use strict';

var CONST_IPC = require('../constant/ipc');

var _require = require('electron');

var Menu = _require.Menu;

var electron = require('electron');
var template = [{
  label: 'File',
  submenu: [{
    label: 'Open Directory',
    accelerator: process.platform === 'darwin' ? 'Alt+Shift+O' : 'Ctrl+Shift+O',
    click: function click(menuItem, browserWindow) {
      browserWindow.webContents.send(CONST_IPC.OPEN_DIRECTORY, 'a', 2, 'zhanglun');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Exit',
    click: function click(item, browserWindow) {
      if (browserWindow) {
        browserWindow.close();
      }
    }
  }]
}, {
  label: 'Edit',
  submenu: [{
    role: 'undo'
  }, {
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    role: 'cut'
  }, {
    role: 'copy'
  }, {
    role: 'paste'
  }, {
    role: 'pasteandmatchstyle'
  }, {
    role: 'delete'
  }, {
    role: 'selectall'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: function click(item, focusedWindow) {
      if (focusedWindow) focusedWindow.reload();
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
    click: function click(item, focusedWindow) {
      if (focusedWindow) focusedWindow.webContents.toggleDevTools();
    }
  }, {
    type: 'separator'
  }, {
    role: 'togglefullscreen'
  }]
}, {
  role: 'window',
  submenu: [{
    role: 'minimize'
  }, {
    role: 'close'
  }]
}, {
  role: 'help',
  submenu: [{
    label: 'Learn More',
    click: function click() {
      require('electron').shell.openExternal('http://electron.atom.io');
    }
  }]
}];

if (process.platform === 'darwin') {
  var name = require('electron').remote.app.getName();
  template.unshift({
    label: name,
    submenu: [{
      role: 'about'
    }, {
      type: 'separator'
    }, {
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      role: 'hide'
    }, {
      role: 'hideothers'
    }, {
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      role: 'quit'
    }]
  });
  // Window menu.
  template[3].submenu = [{
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Zoom',
    role: 'zoom'
  }, {
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    role: 'front'
  }];
}

var menu = Menu.buildFromTemplate(template);
module.exports = menu;