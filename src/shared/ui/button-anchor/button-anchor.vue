<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonAnchorProps } from './types'
import { buttonAnchorClassNameHandler } from './styles'
import { cn } from '@/shared/lib/classname'
import { RouterLink } from 'vue-router'
import { Tooltip } from '../tooltip'

const props = defineProps<ButtonAnchorProps>()

const buttonAnchorClasses = computed(() => {
  const buttonAnchorClasses = buttonAnchorClassNameHandler({
    color: props.color,
    outline: props.outline,
    icon: props.iconOnly,
    disabled: props.disabled,
  })

  return cn(buttonAnchorClasses, props.class)
})
</script>

<template>
  <template v-if="props.tooltip">
    <Tooltip :title="props.tooltip">
      <RouterLink :class="buttonAnchorClasses" :to="props.to">
        <component :is="props.icon" />
        <span><slot /></span>
        <slot name="suffix" />
      </RouterLink>
    </Tooltip>
  </template>
  <template v-else>
    <RouterLink :class="buttonAnchorClasses" :to="props.to">
      <component :is="props.icon" />
      <span><slot /></span>
      <slot name="suffix" />
    </RouterLink>
  </template>
</template>
