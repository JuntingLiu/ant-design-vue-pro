<template>
  <div style="width: 256px">
    <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['2']"
      mode="inline"
      :theme="theme"
      :inlineCollapsed="collapsed"
    >
      <template v-for="item in list">
        <a-menu-item v-if="!item.children" :key="item.key">
          <a-icon type="pie-chart" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.key" />
      </template>
    </a-menu>
  </div>
</template>

<script>
/**
 * 函数式： recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * 普通： SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 */
import SubMenu from "./SubMenu";
export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  data() {
    // const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      list: []
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes) {
      const menuData = [];
      routes.forEach(route => {
        // 拥有 name 和 hideInMenu 为 false 的路由展示
        if (route.name && !route.hideInMenu) {
          const newRoute = { ...route };
          delete newRoute.children;

          if (route.children && !route.hideChildrenInMenu) {
            newRoute.children = this.getMenuData(route.children);
          }
          menuData.push(newRoute);
        } else if (
          !route.hideInMenu &&
          !route.hideChildrenInMenu &&
          route.children
        ) {
          menuData.push(...this.getMenuData(route.children));
        }
      });
    }
  }
};
</script>
