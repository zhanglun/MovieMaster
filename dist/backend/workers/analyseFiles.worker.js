'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyse = analyse;

var _electron = require('electron');

var _tool = require('./tool');

var _tool2 = _interopRequireDefault(_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ffmpeg = require('fluent-ffmpeg');


var mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi', 'mp3'];

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
  openDirDialog({ title: '打开文件夹~~~' }, function (dir) {
    _tool2.default.readDirRecur({
      root: dir,
      extfilters: mediaFilterExt
    }).then(function (data) {
      while (data.length !== [].concat.apply([], data).length) {
        data = [].concat.apply([], data);
      }
      data = data.filter(function (item) {
        return item;
      });

      var metadataPromiseList = data.map(function (path) {
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
    }).then(function (metadatas) {
      eventBus.emit('loadLocalFiles', { metadata: metadatas });
      return files;
    });
  });
}