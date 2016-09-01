const remote = require('electron').remote;
const icpRenderer = remote.icpRenderer;
import { OPEN_DIRECTORY } from 'constant/ipc';

export const openDialog = () => {

  ipcRenderer.on(CONSTTYPE.OPEN_DIRECTORY, () => {
    GUI.openDirDialog({ title: '打开文件夹~~~' }, (dir) => {
      tool.readDirRecur({
        root: dir,
        extfilters: mediaFilterExt,
      }, (file) => {
        debugger;
        console.warn(file);
      }).then((data)=> {
        while (data.length !== [].concat.apply([], data).length) {
          data = [].concat.apply([], data);
        }
        data = data.filter((item) => {
          return item;
        });
        return data;
      }).then((files) => {
        document.body.innerHTML += files.join('\</br\>');
        ffmpeg.ffprobe(files, function (err, metadata) {
          console.dir(metadata.format);
        });
      });
    });
  });
}