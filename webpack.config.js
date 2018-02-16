const path = require('path');

const config = {
  entry: './public/build/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist')
  },
  devtool: 'source-map'
};

module.exports = config;
