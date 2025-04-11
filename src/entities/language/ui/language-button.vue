<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import type { FunctionalComponent } from 'vue'

interface Props {
  active: boolean
  icon: FunctionalComponent
}

const props = defineProps<Props>()
</script>

<template>
  <li>
    <Button
      :color="props.active ? 'primary' : 'ghost'"
      :disabled="props.active"
      :icon="props.icon"
      class="w-full justify-start"
    >
      <slot />
    </Button>
  </li>
</template>
