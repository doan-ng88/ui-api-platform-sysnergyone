<script setup lang="ts">
import { Error404Page } from '@/pages/error404'
import * as m from '@i18n/messages'
import { onMounted } from 'vue'

onMounted(() => {
  document.title = m.deft_many_meerkat_fulfill({ name: m.bright_great_okapi_dig() })
})
</script>

<template>
  <Error404Page />
</template>
