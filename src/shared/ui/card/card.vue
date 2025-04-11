<script setup lang="ts">
import { computed } from 'vue'
import type { CardProps } from './types'
import { cardClassNameHandler } from './styles'
import { cn } from '@/shared/lib/classname'

type Props = CardProps

const props = defineProps<Props>()

const cardClasses = computed(() => {
  return cn(cardClassNameHandler({ color: props.color }), props.class)
})
</script>

<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>
