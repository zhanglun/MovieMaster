'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initEventBus = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _electron = require('electron');

var _ipcType = require('../constant/ipcType');

var IPCTYPE = _interopRequireWildcard(_ipcType);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMovieInfoFromLocal = function getMovieInfoFromLocal() {
  var rootPath = _path2.default.resolve(_electron.app.datapath);
  var getFileNameList = function getFileNameList(rootPath) {
    return new Promise(function (resolve, reject) {
      _fs2.default.readdir(rootPath, function (err, filenames) {
        if (!err) {
          resolve(filenames);
        } else {
          reject(err);
        }
      });
    });
  };
  return getFileNameList(rootPath).then(function (filenames) {
    var pathPromises = filenames.map(function (filename) {
      return new Promise(function (resolve, reject) {
        _fs2.default.readFile(_path2.default.resolve(rootPath, filename), function (err, buffer) {
          if (err) {
            reject(null);
          } else {
            var result = JSON.parse(buffer.toString('utf-8'));
            resolve(result);
          }
        });
      });
    });
    return Promise.all(pathPromises);
  }).catch(function (err) {
    console.log(err);
  });
};

function initEventBus(mainwindow) {
  var mainWindow = mainwindow;
  eventBus.on('loadLocalFiles', function (data) {
    mainWindow.webContents.send(IPCTYPE.SEND_FILE_METADATA, data);
  });

  _electron.ipcMain.on(IPCTYPE.INIT_APP, function (event) {
    getMovieInfoFromLocal().then(function (data) {
      event.sender.send('INIT_DATA', { data: data });
    });
  });

  _electron.ipcMain.on('opensubwindow', function (event, data) {
    // switch(data.type) {
    //   case 'search':
    //     searchWindow.init(data);
    //     break;
    //   default:
    //     break;
    // }
  });
}

exports.initEventBus = initEventBus;