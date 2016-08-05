import *  as CONST_IPC from '../constant/ipc';
import electron from 'electron';
const Menu = electron.Menu;
const remote = electron.remote;
console.log(electron.app);

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open File',
        accelerator: process.platform === 'darwin' ? 'Alt+O' : 'Ctrl+O',
      }, {
        label: 'Open Directory',
        accelerator: process.platform === 'darwin' ? 'Alt+Shift+O' : 'Ctrl+Shift+O',
        click(menuItem, browserWindow) {
          browserWindow.webContents.send(CONST_IPC.OPEN_DIRECTORY, 'a', 2, 'zhanglun');
        }
      }, {
        type: 'separator'
      }, {
        label: 'Exit',
        click(item, browserWindow) {
          if (browserWindow) {
            browserWindow.close();
          }
        }
      }]
  },
  {
    label: 'View',
    submenu: [{
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click(item, focusedWindow) {
        if (focusedWindow) focusedWindow.reload();
      }
    }, {
      label: 'Toggle Developer Tools',
      accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
      click(item, focusedWindow) {
        if (focusedWindow) focusedWindow.webContents.toggleDevTools();
      }
    }, {
      type: 'separator'
    }, {
      role: 'togglefullscreen'
    }]
  }, {
    role: 'window',
    submenu: [{
      role: 'minimize'
    }, {
      role: 'close'
    }]
  }, {
    role: 'help',
    submenu: [{
      label: 'Learn More',
      click() {
        require('electron').shell.openExternal('http://electron.atom.io');
      }
    }]
  }];

if (process.platform === 'darwin') {
  const name = electron.app.getName();
  template.unshift({
    label: name,
    submenu: [{
      role: 'about'
    }, {
      type: 'separator'
    }, {
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      role: 'hide'
    }, {
      role: 'hideothers'
    }, {
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      role: 'quit'
    }]
  });
  // Window menu.
  template[3].submenu = [{
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Zoom',
    role: 'zoom'
  }, {
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    role: 'front'
  }];
}

const menu = Menu.buildFromTemplate(template);
export {menu};