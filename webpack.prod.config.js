var path = require('path');
var webpack = require('webpack');
var banner = require('./webpack.banner');
var TARGET = process.env.TARGET || null;

const externals = {
  'react': {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
  },
  'react-motion': {
    root: 'ReactMotion',
    commonjs2: 'react-motion',
    commonjs: 'react-motion',
    amd: 'react-motion'
  },
  'react-measure': {
    root: 'Measure',
    commonjs2: 'react-measure',
    commonjs: 'react-measure',
    amd: 'react-measure'
  },
};

var config = {
  entry: {
    index: './src/react-fluid-container.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-fluid-container.js',
    sourceMapFilename: 'react-fluid-container.sourcemap.js',
    library: 'ReactFluidContainer',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: externals,
};

if (TARGET === 'minify') {
  config.output.filename = 'react-fluid-container.min.js';
  config.output.sourceMapFilename = 'react-fluid-container.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'ReactDOM', 'ReactFluidContainer', 'ReactMeasure', 'ReactMotion']
    }
  }));
}

module.exports = config;
