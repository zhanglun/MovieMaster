var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');

// 定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var SRC_PATH = path.resolve(APP_PATH, 'client');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var RENDERER_PATH = path.resolve(BUILD_PATH, 'client');


module.exports = {
  entry: {
    'app': SRC_PATH + '/index.js',
  },
  output: {
    path: RENDERER_PATH,
    filename: './[name].bundle.js'
  },

  resolve: {
    alias: {
      sweetalert: 'node_modules/sweetalert/lib/sweetalert.js',
      sweetalertcss: 'node_modules/sweetalert/dist/sweetalert.css',
    },
    extensions: ['.ts', '.js', '.jsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        loader: "babel-loader",
        query: {
          presets: ['env', 'react'],
          plugins: ['transform-runtime'],
        },
        include: [APP_PATH],
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
        include: [SRC_PATH],
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },  {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]',
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=10000&&hash=sha512&digest=hex&name=images/[hash].[ext]'
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
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
  optimization: {
    splitChunks: {
      chunks: 'async',
      minChunks: Infinity,
      name: 'react',

    },
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    // new ExtractTextPlugin('style.bundle.css'),
    new HtmlWebpackPlugin({
      template: SRC_PATH + '/index.html',
      filename: RENDERER_PATH + '/index.html',
    }),
    // new CopyWebpackPlugin([{
    //   from: SRC_PATH + '/vendor',
    //   to: BUILD_PATH + '/vendor',
    // }]),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })],
};
