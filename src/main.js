import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import enUS from './locale/enUS';
import zhCN from './locale/zhCN';
import querystring from 'querystring';
// 引入所有组件的方式
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";
// 按需加载，使用 babel-plugin-import 插件提供的功能，帮我们自动去加载我们用到的组件和样式文件
import {
  Layout,
  Button,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker
} from 'ant-design-vue';
import Authorized from './components/Authorized';
import Auth from './directives/auth';

Vue.config.productionTip = false;

Vue.use(Layout);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.component('Authorized', Authorized); // 注册全局组件
Vue.use(Auth); // 注册指令
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: querystring.parse(location.search).local || 'zhCN',
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});

const IconFont_404 = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1237505_mgy8g9ozvt.js'
});

Vue.component('IconFont_404', IconFont_404);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
