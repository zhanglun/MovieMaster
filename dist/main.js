'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

var _electronConnect = require('electron-connect');

var _menu = require('./backend/menu');

var _events = require('events');

require('./backend/analyseFiles.worker');

var _eventbus = require('./backend/eventbus.worker');

var _ipcType = require('./backend/constant/ipcType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = _electron2.default.Menu;
var app = _electron2.default.app;
var BrowserWindow = _electron2.default.BrowserWindow;

global.eventBus = new _events.EventEmitter();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = void 0;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800
  });

  Menu.setApplicationMenu(_menu.menu);
  // 不显示菜单栏
  // mainWindow.setMenu(null);
  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/client/index.html');
  // for gulp reload
  _electronConnect.client.create(mainWindow);
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  mainWindow.on('‘ready-to-show', function () {
    // mainWindow.webContents.send(INIT_APP, {
    //   data: 123123123
    // })
  });
  global.TopWindow = mainWindow;
  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  createWindow();
  (0, _eventbus.initEventBus)(mainWindow);
});

app.on('browser-window-created', function () {});
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.