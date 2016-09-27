// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {
      '/app': {
        target: 'http://dev.sayogi.cn/app',
        ignorePath: true,
        secure: false,
        changeOrigin: true,
        headers: {
          'userId' : '1'
          //14672926401733101 老王手机18268256860 
          //170--->145017402946300201   
          //14657989018603101 账号15269257204  
          //14695023791373101  权哥手机15158928697
        }
      },
      '/qrCode': {
        target: 'http://dev.sayogi.cn/qrCode',
        secure: false,
        changeOrigin: true
      },
      '/native_cross': {
        target: 'http://dev.sayogi.cn/native_cross',
        ignorePath: true,
        secure: false,
        changeOrigin: true
      }         
    }
  }
}
