<script setup lang="ts">
import Image from './image.vue'
</script>

<template>
  <div class="bg-base-100 fixed inset-0 flex flex-col items-center justify-center gap-2">
    <div class="flex h-5/6 w-5/6 flex-col items-center lg:h-3/4 lg:w-3/4 lg:flex-row">
      <div class="w-full sm:w-1/2">
        <Image />
      </div>
      <div class="w-full space-y-6 sm:w-1/2">
        <h1 class="text-6xl font-semibold lg:text-9xl">404</h1>
        <h2 class="text-2xl font-semibold lg:text-4xl">UH OH! You're lost.</h2>
        <p>
          The page you are looking for does not exist. How you got here is a mystery. Please contact
          your administrator.
        </p>
      </div>
    </div>
  </div>
</template>
