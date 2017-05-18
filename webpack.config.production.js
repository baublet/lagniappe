/**
 * Build config for electron 'Renderer Process' file
 */

import path, {join, resolve} from 'path'
import webpack from 'webpack'
import validate from 'webpack-validator'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import merge from 'webpack-merge'
import { existsSync } from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import BabiliPlugin from 'babili-webpack-plugin'
import baseConfig from './webpack.config.base'

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
  devtool: 'cheap-module-source-map',

  entry: ['babel-polyfill', './app/index'],

  output: {
    path: path.join(__dirname, 'app/dist'),
    publicPath: '../dist/'
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

      // Fonts
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },

      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    /**
     * Assign the module and chunk ids by occurrence count
     * Reduces total file size and is recommended
     */
    new webpack.optimize.OccurrenceOrderPlugin(),

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
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    /**
     * Babli is an ES6+ aware minifier based on the Babel toolchain (beta)
     */
    new BabiliPlugin({
      // Disable deadcode until https://github.com/babel/babili/issues/385 fixed
      deadcode: false,
    }),

    /**
     * Dynamically generate index.html page
     */
    new HtmlWebpackPlugin({
      filename: '../app.html',
      template: 'app/app.html',
      inject: false
    })
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
}))
