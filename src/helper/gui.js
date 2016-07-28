'user strict';
// import electron from 'electron';
const fs = require('fs');
const {dialog} = require('electron').remote;

module.exports.openDirDialog = (options, callback) => {
  options = Object.assign({
    properties: ['openDirectory'],
  }, options);
  dialog.showOpenDialog(options, (path) => {
    callback(path[0]);
  });
}