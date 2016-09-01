import './public/less/base.less';
import  'sweetalertcss';
import swal from 'sweetalert';
console.log(swal);
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/app.container';
import configureStore from './store/configureStore'

const store = configureStore();

let rootElement = document.getElementById('app');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement);


// 备用代码。打开文件夹的简单逻辑
// ipcRenderer.on(CONSTTYPE.OPEN_DIRECTORY, () => {
//   GUI.openDirDialog({ title: '打开文件夹~~~' }, (dir) => {
//     tool.readDirRecur({
//       root: dir,
//       extfilters: mediaFilterExt,
//     }, (file) => {
//       console.warn(file);
//     }).then((data)=> {
//       while (data.length !== [].concat.apply([], data).length) {
//         data = [].concat.apply([], data);
//       }
//       data = data.filter((item) => {
//         return item;
//       });
//       return data;
//     }).then((files) => {
//       document.body.innerHTML += files.join('\</br\>');
//       ffmpeg.ffprobe(files, function (err, metadata) {
//         console.dir(metadata.format);
//       });
//     });
//   });
// });
