module.exports = {
  devServer: {
    proxy: {
      '^/API': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },

  publicPath: '/editor/',
  outputDir: '../../dist/server/editor',

  transpileDependencies: [
    'vuetify'
  ]
}
