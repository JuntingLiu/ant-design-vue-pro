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
        // 定制主题（全局生效）
        modifyVars: {
          'primary-color': '#1DA57A', // 主题颜色
          'link-color': '#1DA57A', // 链接颜色
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  // 新增一个 svg loader
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader, 将 svg 文件引入转为组件的方式使用
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
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
            console.log(name);
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
