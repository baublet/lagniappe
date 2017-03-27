/* eslint-disable max-len */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

import webpack from 'webpack'
import validate from 'webpack-validator'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import { existsSync } from 'fs'
import { join, resolve } from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const port = process.env.PORT || 3000;


const packageJsonPath = './package.json'
const packageObject = existsSync(packageJsonPath) ? require(packageJsonPath) : {}

let theme = {}
if (packageObject.theme && typeof(packageObject.theme) === 'string') {
  let cfgPath = packageObject.theme
  // relative path
  if (cfgPath.charAt(0) === '.') {
    cfgPath = resolve(cfgPath)
  }
  const getThemeConfig = require(cfgPath)
  theme = getThemeConfig()
} else if (packageObject.theme && typeof(packageObject.theme) === 'object') {
  theme = packageObject.theme
}

export default validate(merge(baseConfig, {
  debug: true,

  devtool: 'inline-source-map',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    'babel-polyfill',
    './app/index'
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  module: {
    loaders: [

      // Ant Design loader -- we don't want to use importLoaders for these files
      {
          test: /^.*\.css$/,
          loaders: [
            'style-loader',
            'css-loader?sourceMap'
          ]
      },

      {
        test(filePath) {
          return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
        },
        loaders: [
          'style-loader',
          'css-loader?sourceMap&importLoaders=0',
          'postcss-loader',
          `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
        ],
      },



      {
        test: /\.global\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&importLoaders=1',
          'postcss-loader',
          'sass-loader?sourceMap'
        ]
      },

      {
        test: /^((?!\.global).)*\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
          'sass-loader?sourceMap'
        ]
      },

      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },

      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    new webpack.HotModuleReplacementPlugin(),

    /**
     * If you are using the CLI, the webpack process will not exit with an error
     * code by enabling this plugin.
     * https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
     */
    new webpack.NoErrorsPlugin(),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  /**
   * https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
   */
  target: 'electron-renderer'
}));
