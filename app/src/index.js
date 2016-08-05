import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app.container';
import AppReducers from './reducers';

let store = createStore(AppReducers);

let rootElement = document.getElementById('example');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement);


// 备用代码。打开文件夹的简单逻辑


import electron from 'electron';
import GUI from './helper/gui';
import * as CONSTTYPE from '../constant/ipc';
import tool from './helper/tool';

const ipcRenderer = electron.ipcRenderer;
const mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi'];

ipcRenderer.on(CONSTTYPE.OPEN_DIRECTORY, () => {
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
