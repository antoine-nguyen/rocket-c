<template>
  <div :class="'e2e-' + data1.label">
    <span class="title">{{ title }}</span>
    <div
      :data-attr="data1.value + data2.value"
      class="e2e-data-result"/>
    <div class="chart">
      <chart-pie
        :data="[data1, data2]"
        :config="chartConfig"/>
    </div>
  </div>
</template>

<script>
import { ChartPie } from 'vue-d2b'
export default {
  components: {
    ChartPie
  },
  props: {
    title: {
      type: String,
      required: true
    },
    data1: {
      type: Object,
      required: true
    },
    data2: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      chartConfig (chart) {
        chart.donutRatio(0.5)
      }
    }
  }
}
</script>

<style scoped>
.chart {
  height: 300px;
}
</style>
