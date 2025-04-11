<script setup lang="ts">
import LucideChevronDown from '~icons/lucide/chevron-down'
import LucideCheck from '~icons/lucide/check'
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  SelectIcon,
  SelectItemText,
  type AcceptableValue,
} from 'reka-ui'
import type { SelectOptionProps } from './types'
import * as m from '@i18n/messages'
import LucideX from '~icons/lucide/x'
import { Button } from '../button'
import { ref, watch } from 'vue'

interface Props {
  placeholder?: string
  options: SelectOptionProps[]
  disabled?: boolean
  error?: boolean
  required?: boolean
}

interface Emits {
  (e: 'change', value: AcceptableValue | undefined): void
}

const props = defineProps<Props>()

const model = defineModel<string>()

const unmountSelect = ref(false)

const emit = defineEmits<Emits>()

const open = ref(false)

const onValueChange = (value: AcceptableValue) => {
  emit('change', value)
}

const onRemove = () => {
  model.value = undefined
  open.value = false
  unmountSelect.value = true
  emit('change', model.value)

  setTimeout(() => {
    unmountSelect.value = false
  }, 1)
}

watch(model, (value) => {
  if (value === undefined) {
    unmountSelect.value = true

    setTimeout(() => {
      unmountSelect.value = false
    }, 1)
  }
})
</script>

<template>
  <div>
    <SelectRoot
      :disabled="props.disabled"
      v-model="model"
      :required="props.required"
      v-if="props.options.length > 0 && !unmountSelect"
      @update:model-value="onValueChange"
      v-model:open="open"
    >
      <SelectTrigger
        class="input input-sm input-bordered flex w-full cursor-pointer items-center justify-between gap-x-2"
        :class="{ 'input-error text-error': props.error }"
      >
        <SelectValue
          :placeholder="props.placeholder"
          class="capitalize-first data-[placeholder]:text-base-content/50"
        />
        <SelectIcon as-child>
          <LucideChevronDown />
        </SelectIcon>
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          position="popper"
          :avoidCollisions="true"
          :bodyLock="true"
          class="card bg-base-100 z-9999 max-h-64 min-w-[var(--reka-popper-anchor-width)] shadow-lg"
        >
          <SelectViewport class="flex flex-col gap-y-2 p-2 ![scrollbar-width:auto]">
            <Button color="error" outline :icon="LucideX" class="justify-start" @click="onRemove">
              {{ m.topical_weird_jaguar_tickle() }}
            </Button>
            <SelectItem
              v-for="option in props.options"
              :key="option.value"
              :value="option.value"
              class="btn btn-ghost btn-sm data-[state=checked]:btn-disabled data-[state=checked]:bg-base-200 justify-start"
            >
              <SelectItemText class="capitalize-first">{{ option.label }}</SelectItemText>
              <SelectItemIndicator>
                <LucideCheck />
              </SelectItemIndicator>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>
