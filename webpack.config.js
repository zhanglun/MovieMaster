var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

// 定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var SRC_PATH = path.resolve(APP_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var RENDERER_PATH = path.resolve(BUILD_PATH, 'renderer');

module.exports = {
  entry: {
    'app': SRC_PATH + '/index.js',
  },
  output: {
    path: RENDERER_PATH,
    filename: './[name].bundle.js'
  },

  resolve: {
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-runtime'],
        },
        include: [SRC_PATH, path.resolve(APP_PATH, 'constant')],
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  // externals: [
  //   (function () {
  //     var IGNORES = [
  //       'electron', 'fs', 'child_process', 'bufferutil'
  //     ];
  //     return function (context, request, callback) {
  //       if (IGNORES.indexOf(request) >= 0) {
  //         return callback(null, "require('" + request + "')");
  //       }
  //       return callback();
  //     };
  //   })()
  // ],
  externals: {
    'electron': 'require("electron")',
    'net': 'require("net")',
    'remote': 'require("remote")',
    'shell': 'require("shell")',
    'app': 'require("app")',
    'ipc': 'require("ipc")',
    'fs': 'require("fs")',
    'buffer': 'require("buffer")',
    'system': '{}',
    'file': '{}'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      }
    }),
    new ExtractTextPlugin('style.bundle.css'),
    new HtmlWebpackPlugin({
      template: SRC_PATH + '/index.html',
      filename: RENDERER_PATH + '/index.html',
    }),
    // new CopyWebpackPlugin([{
    //   from: SRC_PATH + '/vendor',
    //   to: BUILD_PATH + '/vendor',
    // }]),
    new CommonsChunkPlugin({
      name: ['react'],
      // filename: 'react.bundle.js',
      minChunks: Infinity
    }),
  ],
};