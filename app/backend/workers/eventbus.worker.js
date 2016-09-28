import { ipcMain } from 'electron';

function initEventBus(mainwindow) {
  let mainWindow = mainwindow;
  eventBus.on('loadLocalFiles', function (data) {
    mainWindow.webContents.send('files', data);
  });
}

export { initEventBus };