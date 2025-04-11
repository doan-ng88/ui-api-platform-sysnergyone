<script setup lang="ts">
import LucideMenu from '~icons/lucide/menu'
import { ThemeControllers } from '@/entities/theme'
import LucideChevronDown from '~icons/lucide/chevron-down'
import LucideArrowRightFromLine from '~icons/lucide/arrow-right-from-line'
import LucideUser from '~icons/lucide/user'
import QuickActionDialog from './quick-action-dialog/quick-action-dialog.vue'
import * as m from '@i18n/messages'
import { LanguageControllers } from '@/entities/language'
import { useUserDetailsStore } from '@/shared/api'
import { useNavigationStore } from '../models/navigation'
import { Popover } from '@/shared/ui/popover'
import { Button } from '@/shared/ui/button'

const { onSignOut } = useNavigationStore()
const userDetailsStore = useUserDetailsStore()

const emit = defineEmits(['sidebarToggle'])
</script>

<template>
  <div
    role="navigation"
    aria-label="navbar"
    class="navbar border-base-200 bg-base-100 sticky top-0 z-10 border-b border-l px-3"
  >
    <div class="navbar-start gap-3">
      <label
        aria-label="Open menu"
        for="drawer"
        class="btn btn-square btn-ghost drawer-button btn-sm xl:hidden"
      >
        <LucideMenu />
      </label>
      <button
        aria-label="Open menu"
        class="btn btn-square btn-ghost drawer-button btn-sm hidden xl:flex"
        @click="emit('sidebarToggle')"
      >
        <LucideMenu />
      </button>
      <QuickActionDialog />
    </div>
    <div class="navbar-end"></div>
    <div class="navbar-end gap-x-1">
      <LanguageControllers />
      <ThemeControllers />
      <Popover align="end">
        <template #trigger>
          <Button>
            <span class="hidden lowercase md:inline-block">{{ userDetailsStore.email }}</span>
            <LucideUser class="inline-block md:hidden" />
            <LucideChevronDown class="hidden md:inline-block" />
          </Button>
        </template>
        <ul class="card bg-base-100 w-40 space-y-1 p-2 shadow-sm">
          <Button
            @click="onSignOut"
            class="w-full justify-start"
            :icon="LucideArrowRightFromLine"
            color="error"
            outline
          >
            {{ m.neat_gross_deer_dare() }}
          </Button>
        </ul>
      </Popover>
    </div>
  </div>
</template>
