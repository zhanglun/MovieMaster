import * as IPCTYPE from '../constant/ipcType';
import { cleanTitle } from '../../common/cleanTitle';
import { formatDuration, formatFileSize, formatFileList } from '../../common/metadataHandler';
import { fetchMoviesInfo, receiveMoviesInfo } from '../actions';
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
    let files = formatFileList(data.data);
    store.dispatch(receiveMoviesInfo(files));
  });

  ipcRenderer.on(IPCTYPE.SEND_FILE_METADATA, (e, data)=> {
    let metadata = data.metadata;
    let files = formatFileList(metadata);
    store.dispatch(receiveMoviesInfo(files));
  });


};

export const monitorIpc = (store)=> {
  monitorFiles(store);
};

export const createWindow = (data) => {
  ipcRenderer.send('opensubwindow', data);
};