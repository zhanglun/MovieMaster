'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initEventBus = undefined;

var _electron = require('electron');

var _ipc = require('../constant/ipc');

function initEventBus(mainwindow) {
  var mainWindow = mainwindow;
  eventBus.on('loadLocalFiles', function (data) {
    mainWindow.webContents.send(_ipc.SEND_FILE_METADATA, data);
  });
}

exports.initEventBus = initEventBus;