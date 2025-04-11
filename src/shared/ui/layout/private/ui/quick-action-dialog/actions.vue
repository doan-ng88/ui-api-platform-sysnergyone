<script setup lang="ts">
import { defineProps } from 'vue'
import * as m from '@i18n/messages'
import LucidePlus from '~icons/lucide/plus'
import LinkItem from './link-item.vue'

interface Props {
  action: string
}

const props = defineProps<Props>()
</script>

<template>
  <LinkItem
    :name="m.male_every_bumblebee_fulfill({ name: m.any_close_anteater_burn() })"
    :action="props.action"
    :to="{ name: '/(cms)/dashboard' }"
    :icon="LucidePlus"
  />
</template>
