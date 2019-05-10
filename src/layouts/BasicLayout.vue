<template>
  <div>
    <a-layout id="layout" style="min-height: 100vh">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="display: flex; background: #fff; padding: 0;">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
          >
            <router-view></router-view>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- 主题设置 - 抽屉 -->
    <SettingDrawer />
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "../components/SettingDrawer";

export default {
  name: "BasicLayout",
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  },
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style lang="less" scoped>
#layout {
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }
}
</style>
