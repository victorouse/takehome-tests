'use strict';

const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractSASS = new ExtractTextPlugin('styles/bundle.css');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
const ReloadPlugin = require('reload-html-webpack-plugin');

module.exports = (options) => {
  let webpackConfig = {
    devtool: options.devtool,
    entry: [
      `webpack-dev-server/client?http://localhost:${options.port}`,
      './src/scripts/index',
      './src/scripts/init'
    ],
    output: {
      path: Path.join(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
        }
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new ReloadPlugin(),
      new Webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        },
        { 
          test: /bootstrap-sass\/assets\/javascripts\//, 
          loader: 'imports-loader?jQuery=jquery' 
        },
        {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader"
        }, {
          test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
          loader: 'file-loader'
        },
      ]
    }
  };

  if (options.isProduction) {
    webpackConfig.entry = [
      bootstrapEntryPoints.prod,
      './src/scripts/index',
      './src/scripts/init'
    ];

    webpackConfig.plugins.push(
      new Webpack.optimize.OccurrenceOrderPlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      ExtractSASS
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/i,
      loader: ExtractSASS.extract(['css-loader', 'sass-loader'])
    });

    webpackConfig.module.loaders.push({
      test: /\.html$/,
      loader: 'html-loader'
    });
  } else {
    webpackConfig.entry.unshift(bootstrapEntryPoints.dev);

    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/i,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    });

    webpackConfig.devServer = {
      contentBase: './dist',
      hot: true,
      port: options.port,
      inline: true
    };
  }

  return webpackConfig;
};