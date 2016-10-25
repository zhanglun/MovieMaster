import { app, ipcMain } from 'electron';
import * as IPCTYPE from './constant/ipcType';
import {createEditWindow} from './windows';
import db from '../common/db';

function initEventBus (mainwindow) {
  let mainWindow = mainwindow;
  eventBus.on('loadLocalFiles', function (data) {
    mainWindow.webContents.send(IPCTYPE.SEND_FILE_METADATA, data);
  });

  /**
   * app 初始化时加载数据
   */
  ipcMain.on(IPCTYPE.INIT_APP, (event) => {
    db.find({}, function (err, result) {
      event.sender.send('INIT_DATA', { data: result })
    });

  });

  ipcMain.on('opensubwindow', (event, data) => {
    switch(data.type) {
      case 'edit':
        createEditWindow(data);
        break;
      default:
        break;
    }
  });

}

export { initEventBus };