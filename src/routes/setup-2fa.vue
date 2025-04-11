<script setup lang="ts">
import { ref } from 'vue'
import { Setup2FaPage } from '@/pages/setup-2fa'

const title = ref('Set up Two-Factor Authentication')
</script>

<template>
  <div class="bg-background h-screen w-screen">
    <header class="flex justify-between">
      <title>{{ title }}</title>
    </header>

    <Setup2FaPage />
  </div>
</template>
