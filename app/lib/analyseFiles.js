import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { dialog } from 'electron';

import db from '../common/db';
import * as Constants from './constants';
import { formatFileList, getFileName } from '../common/metadataHandler';

const mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi', 'mp3'];

let readdirAsync = promisify(fs.readdir);
let statAsync = promisify(fs.stat);

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
 * 优化参考 这个 https://cnodejs.org/topic/567650c3c096b56a0c1b4352
 */
const readDirRecur = (conf, callback) => {
  return readdirAsync(conf.root)
    .then(function (files) {
      files = files.map(function (filename) {
        return statAsync(path.join(conf.root, filename))
          .then(function (stats) {
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

const saveMetadata = (path) => {
  return new Promise(function (reslove, reject) {
    db.find({
      'metadata.path': path
    }, function (err, result) {
      // result 是一个数组
      if (result.length) {
        // eventBus.emit(Constants.LOAD_LOCAL_FILES, { metadata: result });
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
            formatedMeta.filename = getFileName(formatedMeta.path);
            formatedMeta = formatFileList([formatedMeta]);

            let obj = { metadata: formatedMeta[0] };
            obj.synced = false;
            db.insert(obj, function (err, result) {
              reslove(result);
              eventBus.emit(Constants.LOAD_LOCAL_FILES, { metadata: [result] });
            });
          } else {
            reject(err)
          }
        });
      }
    });
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
      data = data.filter((path) => {
        if (!path) {
          return false;
        }
        // 过滤无用视频文件
        let filename = getFileName(path);
        return filename.indexOf('RARBG.com.avi') <= -1;
      });
      let metadataPromiseList = data.map((path) => {
        if (path) {
          saveMetadata(path);
        }
      });
      return Promise.race(metadataPromiseList);
    }).then((metadata) => {
      return metadata;
    }).catch((err) => {
      console.log(err);
    });
  });
}


