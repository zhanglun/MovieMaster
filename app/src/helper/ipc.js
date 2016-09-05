import * as CONSTTYPE from 'constant/ipc';
import tool from 'common/tool';
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


export const openDialog = () => {
  const mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi', 'mp3'];

  ipcRenderer.on('files', (e, data)=> {
    console.log(data);
  });

  ipcRenderer.on(CONSTTYPE.OPEN_DIRECTORY, () => {
    openDir({ title: '打开文件夹~~~' }, (dir) => {
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
        return files;
      });
    });
  });
};
