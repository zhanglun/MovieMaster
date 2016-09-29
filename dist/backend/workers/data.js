'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electron = require('electron');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _write = function _write(filefullpath, object) {
  return new Promise(function (resolve, reject) {
    _fs2.default.writeFile(filefullpath, JSON.stringify(object), function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var _read = function _read(filefullpath) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(filefullpath, function (err, buffer) {
      if (err) {
        reject(null);
      } else {
        var result = JSON.parse(buffer.toString('utf-8'));
        resolve(result);
      }
    });
  });
};

/**
 * 添加
 * @param filename
 * @param object
 */
var put = function put(filename, object) {
  if (!_fs2.default.existsSync(_electron.app.datapath)) {
    _fs2.default.mkdirSync(_electron.app.datapath);
  }
  var fileFullPath = _path2.default.resolve(_electron.app.datapath, filename) + '.json';
  if (_fs2.default.existsSync(fileFullPath)) {
    return update(filename);
  } else {
    return _write(fileFullPath, object);
  }
};

/**
 * 获取
 * @param filename
 */
var get = function get(filename) {
  var fileFullPath = _path2.default.resolve(_electron.app.datapath, filename) + '.json';
  return new Promise(function (resolve) {
    if (_fs2.default.existsSync(fileFullPath)) {
      resolve(_read(fileFullPath));
    } else {
      resolve(null);
    }
  });
};

/**
 * 更新
 * @param filename
 * @param object
 * @returns {Promise}
 */
var update = function update(filename, object) {
  var fileFullPath = _path2.default.resolve(_electron.app.datapath, filename) + '.json';
  return get(filename).then(function (data) {
    for (var key in object) {
      data[key] = object[key];
    }
    return data;
  }).then(function (data) {
    return _write(fileFullPath, data);
  });
};

exports.default = { put: put, get: get, update: update };