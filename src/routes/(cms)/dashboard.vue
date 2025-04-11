<script setup lang="ts">
import { DashboardPage } from '@/pages/dashboard'
import * as m from '@i18n/messages'
import { onMounted } from 'vue'

onMounted(() => {
  document.title = m.deft_many_meerkat_fulfill({ name: m.red_bald_tortoise_burn() })
})
</script>

<template>
  <DashboardPage />
</template>
