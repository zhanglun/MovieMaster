'use strict';

var fs = require('fs');
var path = require('path');
var readdir = promisify(fs.readdir);
var stat = promisify(fs.stat);

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
  };
}

var readDirRecur = function readDirRecur(conf, callback) {
  var result = [];
  return readdir(conf.root).then(function (files) {
    files = files.map(function (filename) {
      return stat(path.join(conf.root, filename)).then(function (stats) {
        if (stats.isDirectory()) {
          return readDirRecur({
            root: path.join(conf.root, filename),
            extfilters: conf.extfilters
          }, callback);
        }
        if (stats.isFile() && conf.extfilters.indexOf(filename.split('.').pop()) >= 0) {
          return path.join(conf.root, filename);
        }
      });
    });
    return Promise.all(files);
  });
};

// 优化参考 这个 https://cnodejs.org/topic/567650c3c096b56a0c1b4352