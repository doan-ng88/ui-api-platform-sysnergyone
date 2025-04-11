<script setup lang="ts">
import { SignInPage } from '@/pages/sign-in'
import * as m from '@i18n/messages'
import { onMounted } from 'vue'

onMounted(() => {
  document.title = m.deft_many_meerkat_fulfill({ name: m.maroon_careful_puffin_trip() })
})
</script>
<template>
  <SignInPage />
</template>
