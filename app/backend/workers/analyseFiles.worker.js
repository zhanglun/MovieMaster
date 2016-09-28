import { dialog } from 'electron';
const ffmpeg = require('fluent-ffmpeg');
import tool from './tool';

const mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi', 'mp3'];

const openDirDialog = (options, callback) => {
  options = Object.assign({
    properties: ['openDirectory'],
  }, options);
  dialog.showOpenDialog(options, (path) => {
    if (path) {
      callback(path[0]);
    }
  });
};

export function analyse() {
  openDirDialog({ title: '打开文件夹~~~' }, (dir) => {
    tool.readDirRecur({
      root: dir,
      extfilters: mediaFilterExt,
    }).then((data)=> {
      while (data.length !== [].concat.apply([], data).length) {
        data = [].concat.apply([], data);
      }
      data = data.filter((item) => {
        return item;
      });

      var metadataPromiseList = data.map((path) => {
        return new Promise(function (reslove, reject) {
          ffmpeg.ffprobe(path, function (err, metadata) {
            if (!err) {
              reslove(metadata.format);
            } else {
              reject(err);
            }
          });
        });
      });
      return Promise.all(metadataPromiseList);
    }).then((metadatas) => {
      eventBus.emit('loadLocalFiles', { metadata: metadatas });
      return files;
    });
  });
}

