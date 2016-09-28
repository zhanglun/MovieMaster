import { ipcMain } from 'electron';
import { SEND_FILE_METADATA } from '../constant/ipc'

function initEventBus(mainwindow) {
  let mainWindow = mainwindow;
  eventBus.on('loadLocalFiles', function (data) {
    mainWindow.webContents.send(SEND_FILE_METADATA, data);
  });
}

export { initEventBus };