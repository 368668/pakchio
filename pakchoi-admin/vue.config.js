console.log(process.env.NODE_ENV != 'production')
module.exports = {

  assetsDir: 'static',
  productionSourceMap: false,

  configureWebpack: {

  },
  chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader')
  },

  // lintOnSave: process.env.NODE_ENV != 'production',

  devServer: {
    port: 3001,
    compress: true, // 压缩代码
    open: true,
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    proxy: {
      "/pakchoi": {
        target: "http://192.168.1.3:3000",
        changeOrigin: true,
      }
    }

  },



};
