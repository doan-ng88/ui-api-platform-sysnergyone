<script setup lang="ts">
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
  TagsInputRoot,
} from 'reka-ui'
import LucideX from '~icons/lucide/x'
import LucideChevronDown from '~icons/lucide/chevron-down'
import { Card } from '../card'
import type { SelectMultipleProps } from './types'
import { useStore } from './store'
import { cn } from '@/shared/lib/classname'
import { computed } from 'vue'
import { LoadingSpinner } from '../loading-spinner'
import * as m from '@i18n/messages'
import { Button } from '../button'

const props = defineProps<SelectMultipleProps>()

const emits = defineEmits<{
  (e: 'input', value: string): void
}>()

const selectedItems = defineModel<string[]>({
  default: [],
})

const { filteredOptions, query, selectedOptions, onRemoveTag } = useStore({
  props,
  models: {
    selectedItems,
  },
  emits,
})

const inputWrapperClasses = computed(() => {
  return cn(
    'input input-sm input-bordered inline-flex h-auto min-h-8 w-full items-center justify-between gap-2 py-0.5 leading-none outline-hidden',
    { 'cursor-not-allowed border-base-200 text-base-content/40 bg-base-200': props.disabled },
  )
})

const placeholderContent = computed(() => {
  const firstChar = props.placeholder?.charAt(0)
  if (!firstChar) {
    return
  }
  return firstChar.toUpperCase() + props.placeholder?.slice(1)
})
</script>

<template>
  <ComboboxRoot
    highlightOnHover
    v-model="selectedItems"
    multiple
    ignore-filter
    class="relative"
    :required="props.required"
    :disabled="props.disabled"
  >
    <ComboboxAnchor :class="inputWrapperClasses">
      <TagsInputRoot
        :model-value="selectedOptions"
        class="flex w-full flex-wrap items-center gap-2"
        :required="props.required"
        :disabled="props.disabled"
      >
        <TagsInputItem
          v-for="item in selectedOptions"
          :key="item.value"
          :value="item.label"
          class="rounded-btn bg-base-300 flex items-center justify-center gap-2 px-2 py-1"
        >
          <TagsInputItemText />
          <TagsInputItemDelete
            class="cursor-pointer data-[disabled]:hidden"
            @click="() => onRemoveTag(item.value)"
          >
            <LucideX />
          </TagsInputItemDelete>
        </TagsInputItem>

        <ComboboxInput v-model="query" as-child>
          <TagsInputInput
            :placeholder="placeholderContent"
            class="flex-1 grow bg-transparent px-1 focus:outline-hidden data-[disabled]:cursor-not-allowed"
            @keydown.enter.prevent
          />
        </ComboboxInput>
      </TagsInputRoot>

      <ComboboxTrigger>
        <LucideChevronDown />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent as-child>
      <Card
        class="rounded-btn bg-base-100 absolute z-9999999 max-h-96 w-full overflow-y-auto shadow-lg"
      >
        <ComboboxViewport class="flex flex-col p-2">
          <div class="flex items-center justify-center gap-x-2" v-if="props.loading">
            <LoadingSpinner /> {{ m.home_round_oryx_yell() }}
          </div>
          <ComboboxItem
            v-for="(option, index) in filteredOptions"
            :key="index"
            :value="option.value"
            as-child
            v-else
          >
            <Button
              class="data-[disabled]:btn-disabled justify-start select-none"
              type="button"
              color="ghost"
            >
              {{ option.label }}
            </Button>
          </ComboboxItem>
        </ComboboxViewport>
      </Card>
    </ComboboxContent>
  </ComboboxRoot>
</template>
