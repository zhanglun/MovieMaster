import fs from 'fs';
import path from 'path';
import electron from 'electron';
import { client as devClient } from 'electron-connect';
import { menu as customMenu } from './backend/menu';
import { EventEmitter }from 'events';
import './backend/analyseFiles.worker';
import { initEventBus } from './backend/eventbus.worker';
import { INIT_APP } from './backend/constant/ipcType'

const Menu = electron.Menu;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

global.eventBus = new EventEmitter();

// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    // frame: false,
  });
  console.log(path.resolve(__dirname, 'react-dev-tool'));
  BrowserWindow.addDevToolsExtension(path.resolve(__dirname, 'react-dev-tool'));
  Menu.setApplicationMenu(customMenu);
  // 不显示菜单栏
  // mainWindow.setMenu(null);
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${ __dirname }/client/index.html`);
  // for gulp reload
  devClient.create(mainWindow);
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  mainWindow.on('‘ready-to-show', () => {
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
app.on('ready', ()=> {
  let mainWindow = createWindow();
  initEventBus(mainWindow);

});

app.on('browser-window-created', function () {
});
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
    app.quit();
  // }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

