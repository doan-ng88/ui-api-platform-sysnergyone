<script setup lang="ts">
import { Container, ContainerInner } from '@/shared/ui/container'
import { PageHeader } from '@/shared/ui/page-header'

import * as m from '@i18n/messages'
import { Input } from '@/shared/ui/input'
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/config'
import { onMounted, ref } from 'vue'
import { Button } from '@/shared/ui/button'
import { toast } from '@/shared/ui/toast'

const accessToken = ref(localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY) || '')

onMounted(() => {
  accessToken.value = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY) || ''
})

const handleCopy = () => {
  navigator.clipboard.writeText(accessToken.value)
  toast.success('Copy access token success')
}
</script>

<template>
  <Container>
    <ContainerInner>
      <PageHeader :title="m.red_bald_tortoise_burn()" />
    </ContainerInner>
  </Container>

  <Container>
    <ContainerInner :size="6" class="space-y-6">
      <div class="flex flex-col items-center justify-center space-y-2">
        <p class="text-lg font-bold">Access Token</p>
        <p class="text-sm">You can copy the access token to the clipboard to use it in the API.</p>
      </div>
      <div class="join w-full">
        <Input v-model="accessToken" class="join-item w-full" />
        <Button @click="handleCopy" class="join-item">Copy</Button>
      </div>
    </ContainerInner>
  </Container>
</template>
