<script setup lang="ts">
import type { PaginationEmits, PaginationProps } from './types'
import { usePaginationStore } from './store'
import {
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from 'reka-ui'
import { Button } from '../button'
import LucideChevronLeft from '~icons/lucide/chevron-left'
import LucideChevronRight from '~icons/lucide/chevron-right'
import LucideChevronsLeft from '~icons/lucide/chevrons-left'
import LucideChevronsRight from '~icons/lucide/chevrons-right'

const props = defineProps<PaginationProps>()
const emits = defineEmits<PaginationEmits>()

const model = defineModel<number | string>()

const { itemsPerPage, currentPage, total, onChange } = usePaginationStore({
  props,
  emits,
  page: model,
})
</script>

<template>
  <PaginationRoot
    :items-per-page="itemsPerPage"
    :total="total"
    :page="currentPage"
    @update:page="onChange"
  >
    <PaginationList v-slot="{ items }" class="join">
      <PaginationFirst as-child>
        <Button :icon="LucideChevronsLeft" icon-only class="join-item" />
      </PaginationFirst>
      <PaginationPrev as-child>
        <Button :icon="LucideChevronLeft" icon-only class="join-item" />
      </PaginationPrev>
      <template v-for="(page, index) in items">
        <PaginationListItem v-if="page.type === 'page'" :key="index" :value="page.value" as-child>
          <Button
            :value="page.value"
            class="join-item data-[selected]:btn-disabled data-selected:bg-primary! data-selected:text-primary-content!"
          >
            {{ page.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="page.type" :index="index"> &#8230; </PaginationEllipsis>
      </template>
      <PaginationNext as-child>
        <Button :icon="LucideChevronRight" icon-only class="join-item" />
      </PaginationNext>
      <PaginationLast as-child>
        <Button :icon="LucideChevronsRight" icon-only class="join-item" />
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
