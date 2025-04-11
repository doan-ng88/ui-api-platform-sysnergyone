<script setup lang="ts">
import { trimAll } from '@/shared/lib/trim-all'
import { computed, type FunctionalComponent } from 'vue'
import type { RouterLinkProps } from 'vue-router'

interface Props {
  action: string
  name: string
  to: RouterLinkProps['to']
  icon?: FunctionalComponent
}

const props = defineProps<Props>()

const mappedAction = computed(() => {
  const cleanAction = trimAll(props.action)

  return cleanAction
})

const compareAction = (action: string) => {
  return trimAll(action).includes(mappedAction.value)
}
</script>

<template>
  <li v-if="compareAction(props.name)">
    <RouterLink :to="to">
      <component :is="props.icon" v-if="props.icon" />
      <span class="capitalize-first">{{ props.name }}</span>
    </RouterLink>
  </li>
</template>
