<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { ButtonProps } from './types'
import { buttonClassNameHandler } from './styles'
import { cn } from '@/shared/lib/classname'
import { Tooltip } from '../tooltip'

const props = defineProps<ButtonProps>()

const slots = useSlots()

const buttonClasses = computed(() => {
  if (props.unstyled) {
    return cn(props.class)
  }

  const buttonClasses = buttonClassNameHandler({
    color: props.color,
    outline: props.outline,
    icon: props.iconOnly,
    disabled: props.disabled || props.loading,
    active: props.active,
    joinable: props.joinable,
  })

  return cn(buttonClasses, props.class)
})
</script>

<template>
  <button :disabled="props.disabled || props.loading" v-if="props.tooltip">
    <Tooltip :title="props.tooltip" v-if="props.tooltip">
      <div :class="buttonClasses">
        <span class="loading loading-spinner loading-xs" v-if="props.loading"></span>
        <component :is="props.icon" v-else />
        <span v-if="slots.default"><slot /></span>
        <component :is="props.altIcon" />
        <slot name="suffix" />
      </div>
    </Tooltip>
  </button>

  <button :class="buttonClasses" :disabled="props.disabled || props.loading" v-else>
    <span class="loading loading-spinner loading-xs" v-if="props.loading"></span>
    <component :is="props.icon" v-else />
    <span v-if="slots.default"><slot /></span>
    <component :is="props.altIcon" />
    <slot name="suffix" />
  </button>
</template>
