const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    _webgl: './src/webgl/_webgl.js',
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public'),
  },
  performance : {
    hints : false
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 1116,
    hot: true,
    server: 'http',
  },
}
