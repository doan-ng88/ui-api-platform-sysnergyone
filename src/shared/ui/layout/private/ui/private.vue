<script setup lang="ts">
import Sidebar from './sidebar.vue'
import Navigation from './navigation.vue'
import { computed, ref } from 'vue'
import { cn } from '@/shared/lib/classname'

const isSidebarOpen = ref(true)

const onSidebarToggle = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const drawerClasses = computed(() => {
  const classes = cn('drawer bg-base-300', {
    'xl:drawer-open': isSidebarOpen.value,
  })

  return classes
})
</script>

<template>
  <div :class="drawerClasses">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content min-h-screen supports-[min-height:100dvh]:min-h-[100dvh]">
      <Navigation @sidebar-toggle="onSidebarToggle" />
      <div class="px-2 pt-4 sm:px-4">
        <RouterView />
      </div>
    </div>
    <Sidebar />
  </div>
</template>
