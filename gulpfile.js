var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var electron = require('electron-connect').server.create();

// 开发
var webpackConfigDev = Object.create(webpackConfig);
webpackConfigDev.devtool = 'eval-source-map';
webpackConfigDev.debug = true;
// create a single instance of the compiler to allow caching
var devCompiler = webpack(webpackConfigDev);

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

gulp.task('watch:electron', function () {
  electron.start();
  console.log('---->electron starting');
  gulp.watch(['./app/src/main.js', './app/src/main/**/*.js'], electron.restart);
  gulp.watch(['./app/dist/**/*.{html,js,css}'], electron.reload);
});

gulp.task('watch:webpack-dev', function () {
  console.log('---->react building');
  gulp.watch(['./app/src/**/*.{html,js,css}'], ['webpack:build-dev']);
});

gulp.task('watch', ['watch:webpack-dev', 'watch:electron']);
gulp.task('dev', ['webpack:build-dev', 'watch']);
gulp.task('default', ['dev']);