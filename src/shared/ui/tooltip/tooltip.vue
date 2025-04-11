<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'
import { Card } from '@/shared/ui/card'
import { TOOLTIP_DELAY_DURATION } from './constants'
import type { Props, Slots } from './types'

const props = defineProps<Props>()

const slots = defineSlots<Slots>()
</script>

<template>
  <TooltipProvider :delay-duration="TOOLTIP_DELAY_DURATION">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="z-999999999999">
          <Card class="bg-base-300 px-2 py-1 shadow">
            <slot v-if="slots.content" name="content" />
            <div v-else class="capitalize-first text-sm">
              {{ props.title }}
            </div>
          </Card>
          <TooltipArrow class="fill-base-300" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
