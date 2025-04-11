<script setup lang="ts">
import { cn } from '@/shared/lib/classname'
import { textareaClassNameHandler } from './styles'
import type { TextareaProps } from './types'
import { computed, useAttrs } from 'vue'

const props = defineProps<TextareaProps>()

const attrs = useAttrs()

const model = defineModel<string>()

const textareaClassName = computed(() => {
  return cn(
    textareaClassNameHandler({
      size: props.size,
      error: props.error,
      bordered: props.bordered,
    }),
    props.class,
  )
})

const placeholderContent = computed(() => {
  const firstChar = props.placeholder?.charAt(0)
  if (!firstChar) {
    return
  }
  return firstChar.toUpperCase() + props.placeholder?.slice(1)
})
</script>

<template>
  <textarea
    :class="textareaClassName"
    v-bind="attrs"
    v-model="model"
    :placeholder="placeholderContent"
  />
</template>
