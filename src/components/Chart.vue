<template>
  <div ref="chartDom"></div>
</template>

<script>
import echarts from 'echarts';
import debounce from 'lodash/debounce'; // 防抖
import { addListener, removeListener } from 'resize-detector'; // 监听 DOM 元素, resize 监听

export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    }
    // option: { // 深度监听引用类型属性值的变化,相当耗性能；变更新值，就不需要深度监听了
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300); // 防抖处理
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize); // 移除监听
    this.chart.dispose(); // 销毁实例
    this.chart = null; // 手动释放 this.chart
  },
  methods: {
    resize() {
      console.log('resize');
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      // 绘制图表
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style></style>
