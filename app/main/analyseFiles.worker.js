import GUI from './gui.worker';
import tool from '../common/tool';

const mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi', 'mp3'];

export function analyse () {
  GUI.openDirDialog({ title: '打开文件夹~~~' }, (dir) => {
    tool.readDirRecur({
      root: dir,
      extfilters: mediaFilterExt,
    }, (file) => {
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
      files.map((file) => {
        console.log(file);
      });
    });
  });
}
