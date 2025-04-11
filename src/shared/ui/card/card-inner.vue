<script setup lang="ts">
import { computed } from 'vue'
import type { CardInnerProps } from './types'
import { cardInnerClassNameHandler } from './styles'
import { cn } from '@/shared/lib/classname'

type Props = CardInnerProps

const props = defineProps<Props>()

const cardClasses = computed(() => {
  return cn(cardInnerClassNameHandler({ padding: props.padding }), props.class)
})
</script>

<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>
