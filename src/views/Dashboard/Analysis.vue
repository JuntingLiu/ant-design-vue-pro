<template>
  <div>
    <a-date-picker />
    <Chart :option="chartOption" style="height: 400px;" />
  </div>
</template>

<script>
// import random from "lodash/random";
import request from '@/utils/request';
import Chart from '@/components/Chart.vue';

export default {
  components: {
    Chart
  },
  data() {
    return {
      chartOption: {}
    };
  },
  mounted() {
    this.getChartData();
    this.intervalTimer = setInterval(() => {
      // DESC: 模拟接口，不需要使用轮询的方式修改数据
      // this.chartOption.series[0].data = this.chartOption.series[0].data.map(
      //   () => random(100)
      // );
      // this.chartOption = { ...this.chartOption }; // 变更新值，就不需要深度监听了
      this.getChartData();
    }, 3000);
  },
  methods: {
    getChartData() {
      request({
        url: '/api/dashboard/chart',
        method: 'get',
        params: { id: 1 }
      }).then(response => {
        this.chartOption = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: response.data
            }
          ]
        };
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalTimer);
  }
};
</script>

<style></style>
