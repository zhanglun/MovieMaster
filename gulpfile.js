const path = require('path');
const gulp = require('gulp');
const babel = require("gulp-babel");
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const electron = require('electron-connect').server.create();

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const LIB_PATH = path.resolve(APP_PATH, 'lib');
const CLIENT_PATH = path.resolve(APP_PATH, 'client');

// 开发


// renderer process 的 webpack 编译
gulp.task('webpack:build-dev', function () {
  webpackConfig.mode = 'development';

  const devCompiler = webpack(webpackConfig);

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
  let src = [APP_PATH + '/main.{ts,js}', APP_PATH + '/config.{ts,js}', LIB_PATH + '/**/*.{json,ts,js}', APP_PATH + '/common/**/*.{ts,js}'];

  return gulp.src(src, {
      base: APP_PATH
    })
    .pipe(babel({
      presets: ['env'],
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('watch', ['babel:electron-main', 'webpack:build-dev'], function () {

  electron.start();
  gulp.watch(['./dist/main.js'], electron.restart);
  gulp.watch(['./dist/client/*.{html,js,css}', './dist/client/**/*.{html,js,css}'], electron.reload);
});

gulp.task('watch:build', function () {
  gulp.watch([CLIENT_PATH + '/**/*.{html,ts,js,less,css}'], ['webpack:build-dev']);
  gulp.watch([APP_PATH + '/main.{ts,js}', LIB_PATH + '/**/*.{ts,js}'], ['babel:electron-main']);
});


gulp.task('dev', ['watch:build', 'watch']);
