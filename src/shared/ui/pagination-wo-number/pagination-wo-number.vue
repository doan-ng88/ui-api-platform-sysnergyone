<script setup lang="ts">
import LucideChevronLeft from '~icons/lucide/chevron-left'
import LucideChevronRight from '~icons/lucide/chevron-right'
import type { PaginationEmits, PaginationProps } from './types'
import { usePaginationWONumberStore } from './store'
import { Button } from '../button'

type Props = PaginationProps

type Emits = PaginationEmits

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const page = defineModel<number | string>()

const { onChangePage } = usePaginationWONumberStore({
  props,
  emits,
  models: {
    page,
  },
})
</script>

<template>
  <div class="join">
    <Button
      :disabled="!props.havePreviousPage"
      @click="onChangePage('previous')"
      :icon="LucideChevronLeft"
      icon-only
      class="join-item"
    />
    <Button
      :disabled="!props.haveNextPage"
      @click="onChangePage('next')"
      :icon="LucideChevronRight"
      icon-only
      class="join-item"
    />
  </div>
</template>
