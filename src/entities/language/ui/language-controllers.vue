<script setup lang="ts">
import { useLanguageStore } from '../model'
import LanguageButton from './language-button.vue'
import * as m from '@i18n/messages'
import FlagUs4x3 from '~icons/flag/us-4x3'
import FlagVn4x3 from '~icons/flag/vn-4x3'
import FlagKr4x3 from '~icons/flag/kr-4x3'
import { Popover } from '@/shared/ui/popover'
import { Button } from '@/shared/ui/button'
import { useLanguageControllersStore } from '../model/language-controllers'

const languageStore = useLanguageStore()

const { activeIcon } = useLanguageControllersStore()
</script>

<template>
  <Popover align="end">
    <template #trigger>
      <Button :icon="activeIcon" icon-only />
    </template>
    <ul class="card bg-base-100 w-40 space-y-1 p-2 shadow-sm">
      <LanguageButton
        :icon="FlagVn4x3"
        :active="languageStore.language === 'vi'"
        @click="languageStore.toggleLanguage('vi')"
      >
        {{ m.lime_inclusive_ostrich_pop() }}
      </LanguageButton>
      <LanguageButton
        :icon="FlagUs4x3"
        :active="languageStore.language === 'en'"
        @click="languageStore.toggleLanguage('en')"
      >
        {{ m.fresh_dizzy_kudu_persist() }}
      </LanguageButton>
      <LanguageButton
        :icon="FlagKr4x3"
        :active="languageStore.language === 'ko'"
        @click="languageStore.toggleLanguage('ko')"
      >
        {{ m.careful_seemly_camel_climb() }}
      </LanguageButton>
    </ul>
  </Popover>
</template>
