import path from 'path';
import fs from 'fs';
import {app,  ipcMain } from 'electron';
import * as IPCTYPE from '../constant/ipcType'

const getMovieInfoFromLocal = () => {
  let rootPath = path.resolve(app.datapath);
  let getFileNameList = function(rootPath){
    return new Promise((resolve, reject) => {
      fs.readdir(rootPath, (err, filenames) =>{
        if(!err) {
          resolve(filenames);
        }else {
          reject(err);
        }
      });
    });
  };
  return getFileNameList (rootPath)
    .then(function(filenames){
      let pathPromises = filenames.map((filename)=> {
        return new Promise(function(resolve, reject) {
          fs.readFile(path.resolve(rootPath, filename), function(err, buffer) {
            if(err) {
              reject(null);
            }else {
              let result = JSON.parse(buffer.toString('utf-8'));
              resolve(result);
            }
          })
        });
      });
      return Promise.all(pathPromises);
    })
    .catch((err)=> {
      console.log(err);
    });
};


function initEventBus(mainwindow) {
  let mainWindow = mainwindow;
  eventBus.on('loadLocalFiles', function (data) {
    mainWindow.webContents.send(IPCTYPE.SEND_FILE_METADATA, data);
  });

  ipcMain.on(IPCTYPE.INIT_APP, (event) => {
    getMovieInfoFromLocal()
      .then(function(data) {
        event.sender.send('INIT_DATA', {data:data})
      });
  });

  ipcMain.on('opensubwindow', (event, data) => {
    const { BrowserWindow } = require('electron');
    let win = new BrowserWindow({ width: 800, height: 600, frame: false });
    win.show()
  })

}

export { initEventBus };