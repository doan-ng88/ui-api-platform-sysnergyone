<script setup lang="ts">
import { toast } from './toast'
import { ToastPortal, ToastProvider, ToastViewport } from 'reka-ui'
import Toast from './toast.vue'
</script>

<template>
  <ToastProvider swipeDirection="right">
    <Toast
      v-for="[id, { title, description, type }] in toast.toasts"
      :key="id"
      :title="title"
      :description="description"
      :type="type"
      @close="toast._removeToastById(id)"
    />
    <ToastPortal>
      <ToastViewport class="toast" :hotkey="['altKey', 'KeyT']" />
    </ToastPortal>
  </ToastProvider>
</template>
