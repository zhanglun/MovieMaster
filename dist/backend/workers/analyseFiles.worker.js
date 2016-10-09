'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyse = analyse;

var _electron = require('electron');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fluentFfmpeg = require('fluent-ffmpeg');

var _fluentFfmpeg2 = _interopRequireDefault(_fluentFfmpeg);

var _nedb = require('nedb');

var _nedb2 = _interopRequireDefault(_nedb);

var _metadataHandler = require('../../common/metadataHandler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = new _nedb2.default({ filename: '.../../data.json', autoload: true });
var mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi', 'mp3'];

var readdir = promisify(_fs2.default.readdir);
var stat = promisify(_fs2.default.stat);

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
  };
}

/**
 * 遍历文件夹
 * @param conf
 * @param callback
 * @returns {Promise.<TResult>}
 * 优化参考 这个 https://cnodejs.org/topic/567650c3c096b56a0c1b4352
 */
var readDirRecur = function readDirRecur(conf, callback) {
  return readdir(conf.root).then(function (files) {
    files = files.map(function (filename) {
      return stat(_path2.default.join(conf.root, filename)).then(function (stats) {
        if (stats.isDirectory()) {
          return readDirRecur({
            root: _path2.default.join(conf.root, filename),
            extfilters: conf.extfilters
          }, callback);
        }
        if (stats.isFile() && conf.extfilters.indexOf(filename.split('.').pop()) >= 0) {
          return _path2.default.join(conf.root, filename);
        }
      });
    });
    return Promise.all(files);
  });
};

var openDirDialog = function openDirDialog(options, callback) {
  options = Object.assign({
    properties: ['openDirectory']
  }, options);
  _electron.dialog.showOpenDialog(options, function (path) {
    if (path) {
      callback(path[0]);
    }
  });
};

function analyse() {
  openDirDialog({ title: '打开文件夹' }, function (dir) {
    readDirRecur({
      root: dir,
      extfilters: mediaFilterExt
    }).then(function (data) {
      while (data.length !== [].concat.apply([], data).length) {
        data = [].concat.apply([], data);
      }
      var metadataPromiseList = data.map(function (path) {
        if (path) {
          return new Promise(function (reslove, reject) {
            console.log(path);
            db.find({
              path: path
            }, function (err, result) {
              // result 是一个数组
              if (result.length) {
                eventBus.emit('loadLocalFiles', { metadata: result });
                reslove(result);
              } else {
                _fluentFfmpeg2.default.ffprobe(path, function (err, metadata) {
                  if (!err) {
                    (function () {
                      var formatedMeta = metadata.format;

                      delete formatedMeta.nb_streams;
                      delete formatedMeta.nb_programs;
                      delete formatedMeta.probe_score;
                      delete formatedMeta.format_name;
                      delete formatedMeta.format_long_name;

                      formatedMeta.path = formatedMeta.filename;
                      formatedMeta.filename = formatedMeta.path.replace(/\\/ig, '/').split("/").pop();
                      formatedMeta = (0, _metadataHandler.formatFileList)([formatedMeta]);
                      db.insert(formatedMeta, function (err, result) {
                        reslove(result[0]);
                        eventBus.emit('loadLocalFiles', { metadata: [formatedMeta] });
                      });
                    })();
                  } else {
                    reject(err);
                  }
                  // if (!err) {
                  // FileDB.put(path.replace(/\\/ig, '/').split("/").pop(), metadata.format).then(function () {             eventBus.emit('loadLocalFiles', { metadata: [metadata.format] });
                  //         });
                  //         reslove(metadata.format);
                  //       } else {
                  //         reject(err);
                  //       }
                });
              }
            });
          });
        }
      });
      return Promise.race(metadataPromiseList);
    }).then(function (metadata) {
      return metadata;
    });
  });
}