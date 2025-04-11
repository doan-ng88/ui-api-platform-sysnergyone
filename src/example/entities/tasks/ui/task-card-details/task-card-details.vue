<script lang="ts" setup>
import type { Task } from '../../model'

const { task } = defineProps<{ task: Task }>()
</script>

<template>
  <div>
    <!-- Begin: AI Code Generation 2024.11.08 -->
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <p>{{ task.status }}</p>
    <p>{{ task.createdAt }}</p>
    <p>{{ task.updatedAt }}</p>
    <!-- End: AI Code Generation 2024.11.08 -->
  </div>
</template>
