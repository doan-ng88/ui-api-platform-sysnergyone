<script setup lang="ts">
import { ToastDescription, ToastRoot, ToastTitle } from 'reka-ui'
import type { ToastEmits, ToastProps } from './types'
import { toastClassNameHandler } from './styles'
import { computed } from 'vue'

type Props = ToastProps
type Emits = ToastEmits
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const toastClasses = computed(() => {
  return toastClassNameHandler({
    type: props.type,
  })
})

const onClose = () => {
  emit('close')
}
</script>

<template>
  <ToastRoot :class="toastClasses" @update:open="onClose">
    <ToastTitle v-if="props.title" class="text-sm font-bold">{{ props.title }}</ToastTitle>
    <ToastDescription>{{ props.description }}</ToastDescription>
  </ToastRoot>
</template>
