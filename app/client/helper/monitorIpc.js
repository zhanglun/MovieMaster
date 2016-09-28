import * as IPCTYPE from '../constant/ipcType';
import { cleanTitle } from './cleanTitle';
import { formatDuration, formatFileSize } from './metadataHandler';
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
  ipcRenderer.on(IPCTYPE.SEND_FILE_METADATA, (e, data)=> {
    let metadata = data.metadata;
    let files = metadata.map((item) => {
      var filename = item.filename.replace(/\\/ig, '/').split("/").pop();
      var duration = formatDuration(item.duration || 0);
      var size = formatFileSize(item.size || 0);
      return Object.assign({}, { path: item.filename, duration: duration, size: size }, cleanTitle(filename));
    });
    console.log('-----------<>', files);
    store.dispatch(receiveMoviesInfo(files));
  });
};

export const monitorIpc = (store)=> {
  monitorFiles(store);
};
