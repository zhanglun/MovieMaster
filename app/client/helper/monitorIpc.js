import * as IPCTYPE from '../constant/ipcType';
import { loadLocalData } from '../actions';
const electron = require('electron');
const remote = electron.remote;
const dialog = remote.dialog;
const ipcRenderer = electron.ipcRenderer;


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


let monitorFiles = (store) => {

  // init

  ipcRenderer.send(IPCTYPE.INIT_APP, { data: 'test' });

  ipcRenderer.on('INIT_DATA', (e, data)=> {
    let files = data.data;
    store.dispatch(loadLocalData(files));
  });

  ipcRenderer.on(IPCTYPE.SEND_FILE_METADATA, (e, data)=> {
    let metadata = data.metadata;
    // let files = formatFileList(metadata);
    let files = metadata;
    store.dispatch(loadLocalData(files));
  });


};

export const monitorIpc = (store)=> {
  monitorFiles(store);
};

export const createWindow = (data) => {
  ipcRenderer.send('opensubwindow', data);
};