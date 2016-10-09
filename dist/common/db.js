'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nedb = require('nedb');

var _nedb2 = _interopRequireDefault(_nedb);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_config2.default);
var db = new _nedb2.default({ filename: _config2.default.dataPath, autoload: true });
exports.default = db;