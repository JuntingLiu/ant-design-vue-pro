import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入所有组件的方式
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";
// 按需加载，使用 babel-plugin-import 插件提供的功能，帮我们自动去加载我们用到的组件和样式文件
import { Layout, Button, Icon, Drawer, Radio, Menu } from "ant-design-vue";
import Authorized from "./components/Authorized";

Vue.config.productionTip = false;

Vue.use(Layout);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.component("Authorized", Authorized); // 注册全局组件

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
