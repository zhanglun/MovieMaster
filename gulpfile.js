var path = require('path');
var gulp = require('gulp');
var babel = require("gulp-babel");
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var electron = require('electron-connect').server.create();

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');

// 开发
var webpackConfigDev = Object.create(webpackConfig);
webpackConfigDev.devtool = 'eval-source-map';
webpackConfigDev.debug = true;

var devCompiler = webpack(webpackConfigDev);

// renderer process 的 webpack 编译
gulp.task('webpack:build-dev', function () {
  devCompiler.run(function (err, status) {
    if (err) {
      throw new gutil.PluginError('webpack:build-dev', err);
    }
    gutil.log('[webpack:build-dev]', status.toString({
      colors: true
    }));
  });
});

// main process 的编译
gulp.task('babel:electron-main', function () {
  return gulp.src([APP_PATH + '/main.js', APP_PATH + '/main/**/*.js', APP_PATH + '/constant/*.js'], { base: APP_PATH })
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});


gulp.task('watch', ['babel:electron-main', 'webpack:build-dev'], function () {

  electron.start();

  gulp.watch(['./app/main.js', './app/main/**/*.js'], ['babel:electron-main']);
  gulp.watch([APP_PATH + '/constant/*.js', './app/src/**/*.{html,js,less,css}'], ['webpack:build-dev']);

  gulp.watch(['./dist/main.js', './dist/main/**/*.js'], electron.restart);
  gulp.watch(['./dist/renderer/*.{html,js,less,css}', './dist/renderer/**/*.{html,js,less,css}'], electron.reload);

});


gulp.task('dev', ['watch']);
