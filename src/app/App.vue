<script setup lang="ts">
import { Toaster } from '@/shared/ui/toast'
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
  <Teleport to="body">
    <Toaster position="top-right" richColors class="z-9999999999" />
  </Teleport>
</template>

<style>
@import 'index.css';
</style>
