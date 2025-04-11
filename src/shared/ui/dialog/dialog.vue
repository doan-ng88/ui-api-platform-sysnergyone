<script setup lang="ts">
import LucideX from '~icons/lucide/x'
import type { DialogEmits, DialogProps } from './types'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import { Button } from '../button'

type Props = DialogProps

type Emits = DialogEmits

const props = defineProps<Props>()

const open = defineModel<boolean>('open')

const emit = defineEmits<Emits>()

const onOpenUpdate = (open: boolean) => {
  if (open === false) {
    emit('close', open)
  }
  emit('change', open)
}
</script>

<template>
  <DialogRoot @update:open="onOpenUpdate" v-model:open="open">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-base-300/80 fixed inset-0 z-999" />
      <DialogContent class="fixed inset-0 z-999 overflow-auto">
        <div
          class="m-auto px-2"
          :class="{
            'max-w-xs': props.size === 1,
            'max-w-sm': props.size === 2,
            'max-w-md': props.size === 3,
            'max-w-lg': props.size === 4,
            'max-w-xl': props.size === 5,
            'max-w-2xl': props.size === 6,
            'max-w-3xl': props.size === 7,
            'max-w-4xl': props.size === 8,
            'max-w-5xl': props.size === 9,
            'max-w-6xl': props.size === 10,
            'max-w-7xl': props.size === 11,
            'max-w-(--breakpoint-xl)': props.size === 12 || props.size === undefined,
            'max-w-(--breakpoint-2xl)': props.size === 13,
            '': props.size === 0,
          }"
        >
          <div
            class="card animate-fade-up bg-base-100 animate-duration-200 animate-ease-out mt-8 mb-4 shadow-lg md:min-w-0"
          >
            <div class="flex min-h-0 flex-col p-6">
              <div class="flex min-h-0 justify-between gap-x-6">
                <div class="grow">
                  <DialogTitle class="card-title capitalize-first inline-block w-full">
                    {{ props.title }}
                    <slot name="title" />
                  </DialogTitle>
                  <DialogDescription class="text-base-content/90" v-if="props.description">
                    {{ props.description }}
                  </DialogDescription>
                </div>
                <DialogClose as-child>
                  <Button icon-only :icon="LucideX" color="ghost" />
                </DialogClose>
              </div>

              <hr class="border-base-content/20 mt-2" />
              <div class="mt-6">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
