'use strict';

var _require = require('electron');

var dialog = _require.dialog;


module.exports.openDirDialog = function (options, callback) {
  options = Object.assign({
    properties: ['openDirectory']
  }, options);
  dialog.showOpenDialog(options, function (path) {
    if (path) {
      callback(path[0]);
    }
  });
};