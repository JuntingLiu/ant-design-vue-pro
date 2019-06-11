<template>
  <a-input-group compact>
    <a-select v-model="type" @change="handleTypeChange" style="width: 130px;">
      <a-select-option value="alipay">支付宝</a-select-option>
      <a-select-option value="bank">银行账户</a-select-option>
    </a-select>
    <a-input
      style="width: calc(100% - 130px)"
      v-model="number"
      @change="handleNumberChange"
    />
  </a-input-group>
</template>

<script>
// 封装一个接收账户的组件
export default {
  props: {
    value: {
      type: Object
    }
  },
  watch: {
    // value 改变的时候同步当前组件的数据
    value(val) {
      Object.assign(this, val);
    }
  },
  data() {
    const { type, number } = this.value || '';
    return {
      type: type || 'alipay',
      number: number || ''
    };
  },
  methods: {
    handleTypeChange(val) {
      this.$emit('change', { ...this.value, type: val });
    },
    handleNumberChange(e) {
      this.$emit('change', { ...this.value, number: e.target.value });
    }
  }
};
</script>

<style></style>
