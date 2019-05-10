<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="300px"
    >
      <!-- 展示控制按钮 -->
      <template v-slot:handle>
        <div class="handle" @click="() => (visible = !visible)">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <!-- 主题内容设置 -->
      <template>
        <div>
          <div>
            <h3>整体风格定制</h3>
            <a-radio-group v-model="navTheme">
              <a-radio value="dark">黑色</a-radio>
              <a-radio value="light">白色</a-radio>
            </a-radio-group>
            <h3>导航模式</h3>
            <a-radio-group v-model="navLayout">
              <a-radio value="left">左边菜单</a-radio>
              <a-radio value="top">顶部菜单</a-radio>
            </a-radio-group>
          </div>
        </div>
      </template>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      navTheme: "dark",
      navLayout: "left"
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  background: #1890ff;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  pointer-events: auto;
}
</style>
