// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs');
const path = require('path');

const GUI = require('./helper/gui');
const tool = require('./helper/tool');

const mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi'];

document.querySelector('#go').addEventListener('click', () => {
  GUI.openDirDialog({ title: '打开文件夹~~~' }, (dir) => {
    tool.readDirRecur(dir, (file) => {
      // console.warn(file);
    }).then((data)=> {
      console.log(data);
    });
    // fs.readdir(dir, (err, files) => {
    //   console.log(files);
    //   files = files.filter(function (filename) {
    //     return mediaFilterExt.includes(filename.split('.').pop());
    //   }).map((filename) => {
    //     return path.join(dir, filename);
    //   });
    //   console.log(files);
    // })
  });
}, false);