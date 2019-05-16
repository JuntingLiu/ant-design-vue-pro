<template>
  <div style="width: 256px">
    <a-menu
      mode="inline"
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
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
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    console.log("routes", menuData);
    return {
      collapsed: false,
      list: [],
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path], // 当前选中的菜单项 key 数组
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path] // 当前展开的 SubMenu 菜单项 key 数组
    };
  },
  created() {
    console.log(
      "selectedKeys",
      this.$route.path,
      this.selectedKeysMap[this.$route.path]
    );
    console.log(
      "openKeys",
      this.$route.path,
      this.openKeysMap[this.$route.path]
    );
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      routes.forEach(route => {
        // 拥有 name 和 hideInMenu 为 false 的路由展示
        if (route.name && !route.hideInMenu) {
          // 当前展开的 SubMenu 菜单项 key 数组
          this.openKeysMap[route.path] = parentKeys;
          // 当前选中的菜单项 key 数组
          this.selectedKeysMap[route.path] = [selectedKey || route.path];

          const newRoute = { ...route };
          delete newRoute.children; // 清空对象里的 children

          if (route.children && !route.hideChildrenInMenu) {
            newRoute.children = this.getMenuData(route.children, [
              ...parentKeys,
              route.path
            ]);
          } else {
            this.getMenuData(
              route.children,
              selectedKey ? parentKeys : [...parentKeys, route.path],
              selectedKey || route.path
            );
          }
          menuData.push(newRoute);
        } else if (
          !route.hideInMenu &&
          !route.hideChildrenInMenu &&
          route.children
        ) {
          menuData.push(
            ...this.getMenuData(route.children, [...parentKeys, route.path])
          );
        }
      });
      // console.log('openKeysMap', this.openKeysMap);
      // console.log('selectedKeysMap', this.selectedKeysMap);
      return menuData;
    }
  }
};
</script>
