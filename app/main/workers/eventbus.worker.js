import { icpMain } from 'electron';
import { EventEmitter }from 'events';
global.eventBus = new EventEmitter();


eventBus.on('test', (files)=> {
  console.log(files);
  // to renderer process
  icpMain.send('files', {
    files: files,
  });
});
