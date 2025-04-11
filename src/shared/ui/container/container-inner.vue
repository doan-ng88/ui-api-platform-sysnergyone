<script setup lang="ts">
import { cn } from '@/shared/lib/classname'
import { containerInnerClassNameHandler } from './styles'
import type { ContainerInnerProps } from './types'
import { computed } from 'vue'

type Props = ContainerInnerProps

const props = defineProps<Props>()

const containerInnerClasses = computed(() => {
  return cn(
    containerInnerClassNameHandler({
      size: props.size,
      padding: props.padding,
    }),
    props.class,
  )
})
</script>

<template>
  <div :class="containerInnerClasses">
    <slot />
  </div>
</template>
