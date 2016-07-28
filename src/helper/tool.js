var fs = require('fs');
var path = require('path');
var readdir = promisify(fs.readdir);
var stat = promisify(fs.stat);
var readFile = promisify(fs.readFile);

// 简单实现一个promisify
function promisify(fn) {
  return function () {
    var args = arguments;
    return new Promise(function (resolve, reject) {
      [].push.call(args, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
      fn.apply(null, args);
    });
  }
}

const readDirRecur = (root, callback) => {
  return readdir(root).then(function (files) {
    var secondartPath = '';
    files = files.map(function (filename) {
      return stat(path.join(root, filename)).then(function (stats) {
        if (stats.isDirectory()) {
          return readDirRecur(path.join(root, filename), callback);
        }

        if (stats.isFile()) {
          return path.join(root, filename);
        }
      })

    })
    return Promise.all(files);
  });
};

// 优化参考 这个 https://cnodejs.org/topic/567650c3c096b56a0c1b4352

module.exports = {
  readDirRecur: readDirRecur,
  promisify: promisify,
};