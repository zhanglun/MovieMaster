'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initEventBus = undefined;

var _electron = require('electron');

function initEventBus(mainwindow) {
  var mainWindow = mainwindow;
  eventBus.on('loadLocalFiles', function (data) {
    mainWindow.webContents.send('files', data);
  });
}

exports.initEventBus = initEventBus;