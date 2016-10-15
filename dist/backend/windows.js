'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEditWindow = undefined;

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowserWindow = _electron2.default.BrowserWindow;

var createEditWindow = exports.createEditWindow = function createEditWindow(data) {
  if (!data.movie) {
    return false;
  }

  var editWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  editWindow.loadUrl('https://portal.qiniu.com/bucket/zhanglun/resource');
};