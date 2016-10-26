import { app, ipcMain } from 'electron';
import * as Constants from './constants';
import db from '../common/db';

function initEventBus(mainwindow) {
  let mainWindow = mainwindow;
  eventBus.on(Constants.LOAD_LOCAL_FILES, function (data) {
    mainWindow.webContents.send(Constants.SEND_FILE_METADATA, data);
  });

  /**
   * app 初始化时加载数据
   */
  ipcMain.on(Constants.INIT_APP, (event) => {
    db.find({}, function (err, result) {
      event.sender.send('INIT_DATA', { data: result })
    });
  });

  ipcMain.on('update_movie_data', (event, movies) => {
    db.update({ _id: movies._id }, { $set: { detail: movies.detail } }, {}, function () {
      console.log(arguments);
    });
  });

}

export { initEventBus };