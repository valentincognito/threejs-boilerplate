const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    _webgl: './src/webgl/_webgl.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public'),
  },
  performance : {
    hints : false
  },
}
