<script setup lang="ts">
import { RegisterPage } from '@/pages/register'
import * as m from '@i18n/messages'
import { onMounted } from 'vue'

onMounted(() => {
  document.title = m.deft_many_meerkat_fulfill({ name: 'Register' })
})
</script>
<template>
  <RegisterPage />
</template>
