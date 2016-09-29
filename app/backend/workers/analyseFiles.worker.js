import { dialog } from 'electron';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

import FileDB from './data';

const mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi', 'mp3'];

let readdir = promisify(fs.readdir);
let stat = promisify(fs.stat);

/**
 * 简单实现一个promisify
 */
function promisify(fn) {
  return function () {
    var args = arguments;
    return new Promise(function (resolve, reject) {
      [].push.call(args, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
      fn.apply(null, args);
    });
  }
}

/**
 * 遍历文件夹
 * @param conf
 * @param callback
 * @returns {Promise.<TResult>}
 * 优化参考 这个 https://cnodejs.org/topic/567650c3c096b56a0c1b4352
 */
const readDirRecur = (conf, callback) => {
  return readdir(conf.root).then(function (files) {
    files = files.map(function (filename) {
      return stat(path.join(conf.root, filename)).then(function (stats) {
        if (stats.isDirectory()) {
          return readDirRecur({
            root: path.join(conf.root, filename),
            extfilters: conf.extfilters,
          }, callback);
        }
        if (stats.isFile() && conf.extfilters.indexOf(filename.split('.').pop()) >= 0) {
          return path.join(conf.root, filename);
        }
      })

    });
    return Promise.all(files);
  });
};


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
  openDirDialog({ title: '打开文件夹' }, (dir) => {
    readDirRecur({
      root: dir,
      extfilters: mediaFilterExt,
    }).then((data)=> {
      while (data.length !== [].concat.apply([], data).length) {
        data = [].concat.apply([], data);
      }
      let metadataPromiseList = data.map((path) => {
        return new Promise(function (reslove, reject) {
          let filename = path.replace(/\\/ig, '/').split("/").pop();
          FileDB.get(filename)
            .then(function (infodata) {
              if (infodata) {
                eventBus.emit('loadLocalFiles', { metadata: [infodata] });
                reslove(infodata);
              } else {
                ffmpeg.ffprobe(path, function (err, metadata) {
                  if (!err) {
                    FileDB.put(path.replace(/\\/ig, '/').split("/").pop(), metadata.format).then(function () {
                      eventBus.emit('loadLocalFiles', { metadata: [metadata.format] });
                    });
                    reslove(metadata.format);
                  } else {
                    reject(err);
                  }
                });
              }
            });
        });
      });
      return Promise.race(metadataPromiseList);
    }).then((metadata) => {
      return metadata;
    });
  });
}


