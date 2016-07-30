const {dialog} = require('electron').remote;

module.exports.openDirDialog = (options, callback) => {
  options = Object.assign({
    properties: ['openDirectory'],
  }, options);
  dialog.showOpenDialog(options, (path) => {
    callback(path[0]);
  });
};