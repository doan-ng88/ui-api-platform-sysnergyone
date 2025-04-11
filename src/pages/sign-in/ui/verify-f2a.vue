<script setup lang="ts">
import * as m from '@/shared/lib/i18n/messages'
import { InputPin } from '@/shared/ui/input-pin'
import { useVerifyF2AStore } from '../model/verify-f2a'

const props = defineProps<{
  email: string
  sessionId: number
}>()

const emits = defineEmits<{
  (e: 'resignIn'): void
}>()

const { otp, isLoading, onValidateOtp } = useVerifyF2AStore({
  props,
})

const onResignIn = () => {
  emits('resignIn')
}
</script>

<template>
  <div class="space-y-12">
    <div class="space-y-4">
      <h1 class="text-center text-2xl font-bold">{{ m.mean_dull_deer_stop() }}</h1>
      <p class="text-center">{{ m.weird_proof_herring_bask() }}</p>
    </div>
    <div>
      <div class="flex justify-center">
        <InputPin v-model="otp" @complete="onValidateOtp" :length="6" :disabled="isLoading" />
      </div>
      <div class="divider"></div>
      <div class="space-y-4">
        <div>
          <div
            class="flex flex-col items-center justify-start gap-x-1 sm:flex-row sm:items-start sm:justify-center"
          >
            <span>{{ m.busy_stout_seahorse_intend() }}</span>
            <button class="link link-primary" @click="onResignIn">
              {{ m.simple_that_worm_pat() }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
