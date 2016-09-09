import * as CONSTTYPE from 'constant/ipc';
import { cleanTitle } from './cleanTitle';
const remote = require('electron').remote;
import { ipcRenderer } from 'electron';
const dialog = remote.dialog;

const openDir = (options, callback) => {
  options = Object.assign({
    properties: ['openDirectory'],
  }, options);
  dialog.showOpenDialog(options, (path) => {
    if (path) {
      callback(path[0]);
    }
  });
};


let monitorFiles = () => {
  ipcRenderer.on('files', (e, data)=> {
    let files = data.files.map((file) => {
      file = file.replace(/\\/ig, '/').split("/").pop();
      return cleanTitle(file);
    });

    console.log(files);
  });
};

export const monitorIpc = ()=> {
  monitorFiles();
};
