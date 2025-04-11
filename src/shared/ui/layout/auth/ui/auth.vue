<script setup lang="ts">
import LogoImg from '@/assets/logo.png'
</script>

<template>
  <div class="flex h-[100dvh] w-[100dvw]">
    <div class="hidden grow items-center justify-center md:flex">
      <p class="font-company text-base sm:text-4xl lg:text-6xl xl:text-8xl">Synergy-One</p>
    </div>
    <div class="bg-base-100 flex h-full w-full flex-col overflow-y-auto px-2 md:w-[30rem]">
      <div class="card">
        <div class="card-body">
          <div class="mb-8 size-24">
            <img :src="LogoImg" />
          </div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
