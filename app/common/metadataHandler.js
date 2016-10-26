import { cleanTitle } from './cleanTitle';

/**
 * 格式化文件时间
 * @param duration
 * @returns {string}
 */
export const formatDuration = (duration) => {
  let h = Math.floor(duration / 3600);
  let m = Math.floor(duration / 60) % 60;
  let s = Math.floor(duration % 60);

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
export const formatFileSize = (bytes) => {
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
export const formatFileList = (data) => {
  return data.map((item) => {
    let filename = item.path.replace(/\\/ig, '/').split("/").pop();
    let duration = formatDuration(item.duration || 0);
    let size = formatFileSize(item.size || 0);
    return Object.assign(item, { filename: item.filename, duration: duration, size: size }, cleanTitle(filename));
  });
};

/**
 * 截取文件名
 * @param path
 * @returns {T}
 */
export const getFileName = (path) => {
 return path.replace(/\\/ig, '/').split("/").pop();
};