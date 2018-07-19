import * as IPCTYPE from '../constant/ipc-type';
import { loadLocalData, loadMovieInfoFromLocal } from '../actions';

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

  ipcRenderer.send(IPCTYPE.INIT_APP, { data: 'test' });

  ipcRenderer.on('INIT_DATA', (e, data)=> {
    let files = data.data;
    store.dispatch(loadLocalData(files));
  });

  ipcRenderer.on(IPCTYPE.SEND_FILE_METADATA, (e, data)=> {
    let files = data.metadata;
    store.dispatch(loadLocalData(files));
  });
  ipcRenderer.on('fetch_movie_data_success', (e, data) => {
    // store.dispatch(loadMovieInfoFromLocal());
    store.dispatch(loadMovieInfoFromLocal(data.result));
  });


};

export const monitorIpc = (store)=> {
  monitorFiles(store);
};

