<template>
  <div style="height:100%" ref="echartRef">echart</div>
</template>

<script>
import { ref, computed } from 'vue'
import echarts from 'echarts'
export default {
  props: {
    chartData: {
      type: Object,
      default: () => ({
        xData: [],
        series: []
      })
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const echart = ref(null)
    const echartRef = ref(null)

    const axisOption = ref({
      xAxis: [{ type: 'category', data: ['考勤异常', '加班申请', '资产申请'] }],
      yAxis: [{ type: 'value' }],
      series: [{
        data: [1, 2, 3],
        type: 'line'
      }]
    })
    const normalOption = ref({
      series: []
    })

    const options = computed(() => {
      return props.isAxisChart ? axisOption.value : normalOption.value
    })

    function initChart () {
      if (echart.value) {
        echart.value.setOption(options.value)
      } else {
        echart.value = echarts.init(echartRef.value)
        echart.value.setOption(options.value)
      }
    }

    initChart()

    function initChartData () {
      if (props.isAxisChart) {

      } else {

      }
    }

    return {
      echartRef,
      initChart,
      initChartData
    }
  }
}
</script>
