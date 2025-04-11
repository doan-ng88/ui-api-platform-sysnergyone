<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeProps } from './types'
import { badgeClassNameHandler } from './styles'
import { cn } from '@/shared/lib/classname'
import { Tooltip } from '../tooltip'

const props = defineProps<BadgeProps>()

const badgeClass = computed(() => {
  const badgeClasses = badgeClassNameHandler({ color: props.color, size: props.size })

  return cn(badgeClasses, props.class)
})
</script>

<template>
  <Tooltip :title="props.tooltip" v-if="props.tooltip">
    <span :class="badgeClass"><slot /></span>
  </Tooltip>
  <span v-else :class="badgeClass"><slot /></span>
</template>
