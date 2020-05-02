var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var webpackConfig = {
  resolve: {
    alias: {
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: []
  }
}

module.exports = webpackConfig
