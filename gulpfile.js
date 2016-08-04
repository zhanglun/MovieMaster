var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('default', function () {
  electron.start();
  gulp.watch(['./main.js', './main/**/*.js'], electron.restart);
  gulp.watch(['./src/**/*.{html,js,css}'], electron.reload);
});