<template>
  <div class="header">
    <a-dropdown>
      <a-icon type="global" />
      <a-menu
        slot="overlay"
        @click="localeChange"
        :selectedKeys="[$route.query.locale || 'zhCN']"
      >
        <a-menu-item key="zhCN">中文</a-menu-item>
        <a-menu-item key="enUS">English</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    // 切换语言
    localeChange({ key }) {
      this.$router.push({
        query: { ...this.$router.query, locale: key }
      });
      this.$i18n.locale = key;
    }
  }
};
</script>

<style scoped>
.header {
  margin-left: auto;
  margin-right: 30px;
}
</style>
