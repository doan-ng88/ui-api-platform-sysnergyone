<script setup lang="ts">
import { Chart as ChartJS, type ChartOptions, type ChartData, type ChartType } from 'chart.js'
import { onMounted, shallowRef, toRaw, useTemplateRef, watch } from 'vue'

interface Props {
  data: ChartData
  options: ChartOptions
  type: ChartType
}

const props = defineProps<Props>()

const chartCanvas = useTemplateRef('chart')

const chartRef = shallowRef<ChartJS>()

onMounted(() => {
  const canvas = chartCanvas.value

  if (!canvas) {
    return
  }

  chartRef.value = new ChartJS(canvas, {
    type: props.type,
    data: toRaw(props.data), // To avoid errors, remove Vue Proxy data using `ToRaw`
    options: toRaw(props.options),
  })
})

watch([() => props.data, () => props.options], ([newData, newOptions]) => {
  const chart = toRaw(chartRef.value)
  if (chart) {
    chart.data = toRaw(newData) // To avoid errors, remove Vue Proxy data using `ToRaw`
    chart.options = toRaw(newOptions)
    chart.update()
  }
})
</script>

<template>
  <canvas ref="chart"></canvas>
</template>
