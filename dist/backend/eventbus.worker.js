'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initEventBus = undefined;

var _electron = require('electron');

var _ipcType = require('./constant/ipcType');

var IPCTYPE = _interopRequireWildcard(_ipcType);

var _windows = require('./windows');

var _db = require('../common/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function initEventBus(mainwindow) {
  var mainWindow = mainwindow;
  eventBus.on('loadLocalFiles', function (data) {
    mainWindow.webContents.send(IPCTYPE.SEND_FILE_METADATA, data);
  });

  /**
   * app 初始化时加载数据
   */
  _electron.ipcMain.on(IPCTYPE.INIT_APP, function (event) {
    _db2.default.find({}, function (err, result) {
      event.sender.send('INIT_DATA', { data: result });
    });
  });

  _electron.ipcMain.on('opensubwindow', function (event, data) {
    switch (data.type) {
      case 'edit':
        (0, _windows.createEditWindow)(data);
        break;
      default:
        break;
    }
  });
}

exports.initEventBus = initEventBus;