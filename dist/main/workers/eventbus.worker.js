'use strict';

var _electron = require('electron');

var _events = require('events');

global.eventBus = new _events.EventEmitter();

eventBus.on('test', function (files) {
  console.log('======>');
  // to renderer process
  _electron.icpMain.send('files', {
    files: files
  });
});