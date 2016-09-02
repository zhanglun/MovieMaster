import * as CONSTTYPE from 'constant/ipc';
import tool from 'common/tool';
const remote = require('electron').remote;
const icpRenderer = remote.icpRenderer;
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
  icpRenderer.on(CONSTTYPE.OPEN_DIRECTORY, () => {
    openDir({ title: '打开文件夹~~~' }, (dir) => {
      tool.readDirRecur({
        root: dir,
        extfilters: mediaFilterExt,
      }, (file) => {
        debugger;
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

icpRenderer.on('files', (data)=> {
  console.log(data);
});