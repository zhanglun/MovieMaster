import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { dialog } from 'electron';

import db from './db';
import { formatFileList } from '../../common/metadataHandler';
const mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi', 'mp3'];

let readdir = promisify(fs.readdir);
let stat = promisify(fs.stat);

/**
 * 简单实现一个promisify
 */
function promisify (fn) {
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

export function analyse () {
  openDirDialog({ title: '打开文件夹' }, (dir) => {
    readDirRecur({
      root: dir,
      extfilters: mediaFilterExt,
    }).then((data)=> {
      while (data.length !== [].concat.apply([], data).length) {
        data = [].concat.apply([], data);
      }
      let metadataPromiseList = data.map((path) => {
        if (path) {
          return new Promise(function (reslove, reject) {
            db.find({
              path: path
            }, function (err, result) {
              // result 是一个数组
              if (result.length) {
                eventBus.emit('loadLocalFiles', { metadata: result });
                reslove(result);
              } else {
                ffmpeg.ffprobe(path, function (err, metadata) {
                  if (!err) {
                    let formatedMeta = metadata.format;

                    delete formatedMeta.nb_streams;
                    delete formatedMeta.nb_programs;
                    delete formatedMeta.probe_score;
                    delete formatedMeta.format_name;
                    delete formatedMeta.format_long_name;

                    formatedMeta.path = formatedMeta.filename;
                    formatedMeta.filename = formatedMeta.path.replace(/\\/ig, '/').split("/").pop();
                    formatedMeta = formatFileList([formatedMeta]);
                    db.insert(formatedMeta, function (err, result) {
                      reslove(result[0]);
                      eventBus.emit('loadLocalFiles', { metadata: formatedMeta });
                    });
                  } else {
                    reject(err)
                  }
                });
              }
            });
          });
        }
      });
      return Promise.race(metadataPromiseList);
    }).then((metadata) => {
      return metadata;
    });
  });
}


