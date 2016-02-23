var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: './index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
              test: /\.js?$/,
              exclude: /(node_modules)/,
              loader: 'babel',
              query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['transform-decorators-legacy']
              }
            },
            {
              test: /\.css?$/,
              loaders: [ 'style', 'raw' ],
              include: __dirname
            }
        ]
    }
};
