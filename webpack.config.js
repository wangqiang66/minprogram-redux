/**
 * function: webpack.config
 * author  : wq
 * update  : 2019/11/13 17:24
 */
const path = require('path')

module.exports = {
  context: path.resolve(__dirname),
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}
