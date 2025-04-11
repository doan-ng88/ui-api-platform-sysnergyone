<script setup lang="ts">
import * as m from '@i18n/messages'
import LucideSearch from '~icons/lucide/search'
import Actions from './actions.vue'
import QuickLinks from './quick-links.vue'
import { Dialog } from '@/shared/ui/dialog'
import { InputSearch } from '@/shared/ui/input-search'
import { useQuickActionDialogStore } from '../../models/quick-action-dialog'

const { isDialogOpen, search, onOpen } = useQuickActionDialogStore()
</script>

<template>
  <button
    class="btn btn-outline btn-sm border-base-content/20 hover:bg-base-content/20 hover:text-base-content hidden h-9 w-48 items-center justify-start gap-3 hover:border-transparent sm:flex"
    @click="onOpen"
  >
    <LucideSearch /> {{ m.tense_bald_gecko_adapt() }}
  </button>
  <Dialog v-model:open="isDialogOpen" :size="4">
    <template #title>
      <InputSearch v-model="search" :placeholder="m.dull_clear_rabbit_climb()" class="w-full" />
    </template>
    <ul
      class="menu text-base-content flex min-h-0 w-full flex-col flex-nowrap overflow-y-auto p-0 [&_a]:py-3 [&_a]:text-[16px]"
    >
      <li class="menu-title capitalize-first inline-block">
        {{ m.still_chunky_clownfish_list() }}
      </li>
      <Actions :action="search" />
      <li class="menu-title capitalize-first inline-block">{{ m.knotty_sour_beetle_express() }}</li>
      <QuickLinks :action="search" />
    </ul>
  </Dialog>
</template>
