<script setup lang="ts">
import { computed } from 'vue'
import { containerClassNameHandler } from './styles'
import type { ContainerProps } from './types'
import { cn } from '@/shared/lib/classname'

type Props = ContainerProps

const props = defineProps<Props>()

const containerClasses = computed(() => {
  return cn(
    containerClassNameHandler({
      padding: props.padding,
    }),
    props.class,
  )
})
</script>

<template>
  <section :class="containerClasses">
    <slot />
  </section>
</template>
