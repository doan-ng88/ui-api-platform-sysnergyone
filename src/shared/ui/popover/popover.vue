<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import type { PopoverEmits, PopoverProps } from './types'

const props = defineProps<PopoverProps>()

const open = defineModel<boolean>('open')

const emits = defineEmits<PopoverEmits>()

const onOpenChange = () => {
  emits('change')
}
</script>

<template>
  <PopoverRoot @update:open="onOpenChange" v-model:open="open">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        class="z-20 min-w-(--reka-popover-trigger-width)"
        :side="props.side"
        :align="props.align"
        :avoidCollisions="true"
      >
        <slot />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
