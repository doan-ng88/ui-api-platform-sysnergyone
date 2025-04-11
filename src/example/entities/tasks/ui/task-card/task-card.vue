<script lang="ts" setup>
import type { Task } from '../../model'

const { task } = defineProps<{
  task: Task
}>()
</script>

<template>
  <div>
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
  </div>
</template>
