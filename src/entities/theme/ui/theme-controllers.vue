<script setup lang="ts">
import LucideSun from '~icons/lucide/sun'
import { useThemeStore } from '../model/theme'
import LucideMoon from '~icons/lucide/moon'
import ThemeButton from './theme-button.vue'
import LucideTvMinimal from '~icons/lucide/tv-minimal'
import * as m from '@i18n/messages'
import { Popover } from '@/shared/ui/popover'

const themeStore = useThemeStore()
</script>

<template>
  <Popover align="end">
    <template #trigger>
      <button class="btn btn-sm btn-square">
        <LucideSun class="block dark:hidden" />
        <LucideMoon class="hidden dark:block" />
      </button>
    </template>
    <ul class="card bg-base-100 w-40 space-y-1 p-2 shadow-sm">
      <ThemeButton
        :icon="LucideSun"
        :active="themeStore.theme === 'light'"
        @click="() => themeStore.themeToggle('light')"
      >
        {{ m.bright_slimy_marmot_jolt() }}
      </ThemeButton>
      <ThemeButton
        :icon="LucideMoon"
        :active="themeStore.theme === 'dark'"
        @click="() => themeStore.themeToggle('dark')"
      >
        {{ m.mean_dizzy_chipmunk_express() }}
      </ThemeButton>

      <ThemeButton
        :icon="LucideTvMinimal"
        :active="themeStore.theme === undefined"
        @click="() => themeStore.themeToggle()"
      >
        {{ m.cute_sleek_albatross_ascend() }}
      </ThemeButton>
    </ul>
  </Popover>
</template>
