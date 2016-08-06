'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menu = undefined;

var _ipc = require('../constant/ipc');

var CONST_IPC = _interopRequireWildcard(_ipc);

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Menu = _electron2.default.Menu;
var remote = _electron2.default.remote;

var template = [{
  label: 'File',
  submenu: [{
    label: 'Open File',
    accelerator: process.platform === 'darwin' ? 'Alt+O' : 'Ctrl+O'
  }, {
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
  var name = _electron2.default.app.getName();
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
exports.menu = menu;