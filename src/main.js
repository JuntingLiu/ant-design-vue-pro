import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入所有组件的方式
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";
// 按需加载，使用 babel-plugin-import 插件提供的功能，帮我们自动去加载我们用到的组件和样式文件
import { Button } from "ant-design-vue";

Vue.config.productionTip = false;

Vue.use(Button);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
