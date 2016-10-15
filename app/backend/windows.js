import electrom from 'electron';

const BrowserWindow = electrom.BrowserWindow;

export const createEditWindow = (data) => {
  if(!data.movie) {
    return false;
  }

  let editWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  editWindow.loadUrl('https://portal.qiniu.com/bucket/zhanglun/resource');

};