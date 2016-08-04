import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './containers/app';
import AppReducers from './reducers';

let store = createStore(AppReducers);
let rootElement = document.getElementById('example');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement);

import electron from 'electron';
import GUI from './helper/gui';
import IPC_CONST from '../constant/ipc';
import tool from './helper/tool';

const ipcRenderer = electron.ipcRenderer;
const mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi'];

ipcRenderer.on(IPC_CONST.OPEN_DIRECTORY, () => {
  GUI.openDirDialog({ title: '打开文件夹~~~' }, (dir) => {
    tool.readDirRecur({
      root: dir,
      extfilters: mediaFilterExt,
    }, (file) => {
      console.warn(file);
    }).then((data)=> {
      while (data.length !== [].concat.apply([], data).length) {
        data = [].concat.apply([], data);
      }
      data = data.filter((item) => {
        return item;
      });
      return data;
    }).then((files) => {
      document.body.innerHTML += files.join('\</br\>');
    });
  });
});
