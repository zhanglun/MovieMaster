import * as CONSTTYPE from '../constant/ipc';
import { cleanTitle } from './cleanTitle';
import { fetchMoviesInfo } from '../actions';
const electron = require('electron')
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
  ipcRenderer.on('files', (e, data)=> {
    let files = data.paths.map((path) => {
      var filename = path.replace(/\\/ig, '/').split("/").pop();
      return Object.assign({}, {path: path}, cleanTitle(filename));
    });
    console.log('-->', files);
    store.dispatch(fetchMoviesInfo(files));
  });
};

export const monitorIpc = (store)=> {
  monitorFiles(store);
};
