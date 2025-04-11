<script setup lang="ts">
import { useSlots } from 'vue'

interface Props {
  title: string
}

const props = defineProps<Props>()
const slots = useSlots()
</script>

<template>
  <div class="flex flex-col pl-1">
    <div class="breadcrumbs capitalize-first text-sm" v-if="slots.breadcrumbs">
      <ul>
        <slot name="breadcrumbs" />
      </ul>
    </div>
    <div class="mb-2 flex w-full items-center justify-between">
      <div class="flex items-end gap-x-2">
        <h1 class="capitalize-first text-xl font-semibold">
          {{ props.title }}
        </h1>
        <slot name="title-suffix" />
      </div>
      <slot name="title-actions" />
    </div>
  </div>
</template>
