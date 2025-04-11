<script setup lang="ts">
import { defineProps } from 'vue'
import * as m from '@i18n/messages'
import LucideGauge from '~icons/lucide/gauge'
import LinkItem from './link-item.vue'

interface Props {
  action: string
}

const props = defineProps<Props>()
</script>

<template>
  <LinkItem
    :name="m.red_bald_tortoise_burn()"
    :action="props.action"
    :to="{ name: '/(cms)/dashboard' }"
    :icon="LucideGauge"
  />
</template>
