<script setup lang="ts">
import { PrivateLayout } from '@/shared/ui/layout/private'
</script>

<!-- <route lang="json">
{
  "meta": {
    "requiresAuth": true
  }
}
</route> -->

<template>
  <PrivateLayout>
    <RouterView />
  </PrivateLayout>
</template>
