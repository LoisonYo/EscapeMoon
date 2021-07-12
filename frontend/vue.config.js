// Specify root path: https://stackoverflow.com/questions/41955331/specify-a-root-path-for-imports
var path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src')
      }
    },
  }
}