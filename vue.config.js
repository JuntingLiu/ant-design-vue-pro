module.exports = {
  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: {
    loaderOptions: {
      // 给 less-loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  }
};
