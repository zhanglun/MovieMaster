'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyse = analyse;

var _gui = require('./gui.worker');

var _gui2 = _interopRequireDefault(_gui);

var _tool = require('../common/tool');

var _tool2 = _interopRequireDefault(_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi', 'mp3'];

function analyse() {
  _gui2.default.openDirDialog({ title: '打开文件夹~~~' }, function (dir) {
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
      files.map(function (file) {
        console.log(file);
      });
    });
  });
}