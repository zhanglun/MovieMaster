import fs from 'fs';
import path from 'path';
import { app } from 'electron';


const _write = function (filefullpath, object) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(filefullpath, JSON.stringify(object), function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  });
};

const _read = function (filefullpath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filefullpath, function (err, buffer) {
      if (err) {
        reject(null);
      } else {
        let result = JSON.parse(buffer.toString('utf-8'));
        resolve(result);
      }
    })
  });
};

/**
 * 添加
 * @param filename
 * @param object
 */
const put = (filename, object) => {
  if (!fs.existsSync(app.datapath)) {
    fs.mkdirSync(app.datapath);
  }
  let fileFullPath = path.resolve(app.datapath, filename) + '.json';
  if (fs.existsSync(fileFullPath)) {
    return update(filename);
  } else {
    return _write(fileFullPath, object);
  }
};

/**
 * 获取
 * @param filename
 */
const get = (filename) => {
  let fileFullPath = path.resolve(app.datapath, filename) + '.json';
  return new Promise(function (resolve) {
    if (fs.existsSync(fileFullPath)) {
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
const update = (filename, object) => {
  let fileFullPath = path.resolve(app.datapath, filename) + '.json';
  return get(filename)
    .then(function (data) {
      for (var key in object) {
        data[key] = object[key];
      }
      return data;
    })
    .then(function (data) {
      return _write(fileFullPath, data)
    });
};

export default { put, get, update }