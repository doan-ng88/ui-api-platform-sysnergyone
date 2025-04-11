<script setup lang="ts">
import './styles.css'

import type { DatePickerProps } from './types'
import { useDatePickerStore } from './store'
import { computed } from 'vue'

const props = defineProps<DatePickerProps>()
const dateModel = defineModel<Date | string>()

const { inputRef } = useDatePickerStore({
  models: {
    value: dateModel,
  },
  props,
})

const placeholder = computed(() => {
  const firstChar = props.placeholder?.charAt(0)
  if (!firstChar) {
    return
  }
  return firstChar.toUpperCase() + props.placeholder?.slice(1)
})
</script>

<template>
  <input
    ref="inputRef"
    class="input input-sm"
    :placeholder="placeholder"
    :required="props.required"
    v-bind="$attrs"
    :disabled="props.disabled"
  />
</template>
