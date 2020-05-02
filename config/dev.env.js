/* eslint-disable */
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // ROOT_API: '"http://gedosinboiler"', 157.230.106.47:9596
  ROOT_API: '"http://157.230.106.47:9596"',
  // OAUTH_CLIENT_SECRET: '"bZ0WXETAENnQSh4fRdJ7IqJ8c0mIcgD50c0RpSnv"' // Used in Login.vue for backend oauth auth LOCAL
  OAUTH_CLIENT_SECRET: '"1p7SGIhUYV8eATSC4HXaJsmmLhHCSUeAvXQmLetQ"'
})

