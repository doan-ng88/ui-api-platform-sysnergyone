<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteLeave, useRouter, type RouteLocationRaw } from 'vue-router'
import type { DialogAlertBeforeNavigateProps } from './types'
import * as m from '@i18n/messages'

import { Dialog } from '../dialog'
import { Button } from '../button'

type Props = DialogAlertBeforeNavigateProps

const props = defineProps<Props>()

const router = useRouter()
const goTo = ref<RouteLocationRaw>()
const isConfirmed = ref(false)

const isOpen = ref(false)

const onConfirm = () => {
  if (goTo.value) {
    isOpen.value = false
    isConfirmed.value = true
    router.push(goTo.value)
  }
}

const onCancel = () => {
  isOpen.value = false
}

onBeforeRouteLeave((to, _, next) => {
  if (isConfirmed.value) {
    next()
    return
  }

  goTo.value = to
  isOpen.value = true
  next(false)
})
</script>

<template>
  <Dialog v-model:open="isOpen" :title="props.title" :size="4">
    <div class="space-y-4">
      <div>
        {{ props.description }}
      </div>
      <div class="flex justify-end gap-x-2">
        <Button color="error" @click="onConfirm">
          {{ m.alive_teary_pig_coax() }}
        </Button>
        <Button color="ghost" @click="onCancel">
          {{ m.orange_mean_sloth_fry() }}
        </Button>
      </div>
    </div>
  </Dialog>
</template>
