'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyse = analyse;

var _electron = require('electron');

var _tool = require('../../common/tool');

var _tool2 = _interopRequireDefault(_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    }, function (file) {
      console.warn(file);
    }).then(function (data) {
      while (data.length !== [].concat.apply([], data).length) {
        data = [].concat.apply([], data);
      }
      data = data.filter(function (item) {
        return item;
      });
      return data;
    }).then(function (files) {
      // TODO: 通知到
      eventBus.emit('test', { files: files });
      console.log('analyseF');
      console.log(files);
      return files;
    });
  });
}