var webpack = require('webpack');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var reactNativeExternal = {
  root: 'ReactNative',
  commonjs2: 'react-native',
  commonjs: 'react-native',
  amd: 'react-native'
};

var mobxExternal = {
  root: 'mobx',
  commonjs2: 'mobx',
  commonjs: 'mobx',
  amd: 'mobx'
};

var mobxReactExternal = {
  root: 'mobxReact',
  commonjs2: 'mobx-react',
  commonjs: 'mobx-react',
  amd: 'mobx-react'
};

var mobxReactNativeExternal = {
  root: 'mobxReactNative',
  commonjs2: 'mobx-react/native',
  commonjs: 'mobx-react/native',
  amd: 'mobx-react/native'
};

var proptypesExternal = {
  root: 'PropTypes',
  commonjs2: 'prop-types',
  commonjs: 'prop-types',
  amd: 'prop-types'
};

var webpackConfig = {
  output: {
    library: 'fauxfluxReact',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            ['transform-decorators-legacy']
          ]
        }
      }
    ]
  },
  externals: {
    "react": reactExternal,
    "react-native": reactNativeExternal,
    "mobx": mobxExternal,
    "mobx-react": mobxReactExternal,
    "mobx-react/native": mobxReactNativeExternal,
    "prop-types": proptypesExternal
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: []
};

if('native' === process.env.TYPE) {
  webpackConfig.externals = {
    "react": reactExternal,
    "mobx": mobxExternal,
    "mobx-react": mobxReactNativeExternal,
    "prop-types": proptypesExternal
  }
}

if('production' === process.env.NODE_ENV){
  // replace 'NODE_ENV' variable in the code with 'production'.
  // This will be use for dead code elimination in the minification step below.
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  );
  // Uglify - minify and remove comments for production
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      mangle: true,
    })
  );
}

module.exports = webpackConfig;