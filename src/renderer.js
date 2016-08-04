// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

const GUI = require('./helper/gui');
const IPC_CONST = require('./constant/ipc');
const tool = require('./helper/tool');

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
