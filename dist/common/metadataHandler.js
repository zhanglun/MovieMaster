"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatFileList = exports.formatFileSize = exports.formatDuration = undefined;

var _cleanTitle = require("./cleanTitle");

/**
 * 格式化文件时间
 * @param duration
 * @returns {string}
 */
var formatDuration = exports.formatDuration = function formatDuration(duration) {
  var h = Math.floor(duration / 3600);
  var m = Math.floor(duration / 60) % 60;
  var s = Math.floor(duration % 60);

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  return h + ':' + m + ':' + s;
};

/**
 * 格式化文件大小
 * @param bytes
 * @returns {string}
 */
var formatFileSize = exports.formatFileSize = function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + " Bytes";
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(3) + " KB";
  } else if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(3) + " MB";
  } else {
    return (bytes / 1073741824).toFixed(3) + " GB";
  }
};

/**
 * 格式化文件格式 完整方法
 * @param data
 * @returns {*}
 */
var formatFileList = exports.formatFileList = function formatFileList(data) {
  console.log(data);
  return data.map(function (item) {
    var filename = item.path.replace(/\\/ig, '/').split("/").pop();
    var duration = formatDuration(item.duration || 0);
    var size = formatFileSize(item.size || 0);
    return Object.assign(item, { filename: item.filename, duration: duration, size: size }, (0, _cleanTitle.cleanTitle)(filename));
  });
};