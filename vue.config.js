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
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        bypass: function(req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          } else if (process.env.MOCK !== 'none') {
            // 使用代理转发，通过 url 进行分发
            const name = req.path
              .split('/api/')[1]
              .split('/')
              .join('_');
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            // 每次请求，改动了 mock 数据，然是不会生效，因为该请求已被缓存下来，请求的时候会直接请求缓存，所以这里每次请求完都删除此缓存
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
