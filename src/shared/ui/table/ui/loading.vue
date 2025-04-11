<script setup lang="ts">
import * as m from '@i18n/messages'
</script>

<template>
  <div className="flex justify-center items-center gap-4 w-full py-4">
    <span class="loading loading-xs size-5"></span>
    <slot>
      <span class="capitalize-first">{{ m.home_round_oryx_yell() }}</span>
    </slot>
  </div>
</template>
