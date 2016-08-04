var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('default', function () {
  electron.start();
  gulp.watch(['./app/src/main.js', './app/src/main/**/*.js'], electron.restart);
  gulp.watch(['./app/src/**/*.{html,js,css}'], electron.reload);
});