<script setup lang="ts">
import { PinInputRoot, PinInputInput } from 'reka-ui'
import type { InputPinEmits, InputPinProps } from './types'
import { computed, toRaw } from 'vue'
import { cn } from '@/shared/lib/classname'

type Emits = InputPinEmits
type Props = InputPinProps

const emits = defineEmits<Emits>()
const props = defineProps<Props>()

const model = defineModel<string[]>({
  default: [],
})

const onComplete = () => {
  // Get the raw value of the model to prevent reactivity issues
  const value = toRaw(model.value)
  const valueAsString = value.join('')

  emits('complete', { value, valueAsString })
  model.value = []
}

const pinInputClass = computed(() => {
  return cn('flex gap-x-2', props.class)
})
</script>

<template>
  <PinInputRoot
    v-model="model"
    @complete="onComplete"
    :disabled="props.disabled"
    placeholder="○"
    :class="pinInputClass"
  >
    <PinInputInput
      v-for="(id, index) in props.length ?? 4"
      :key="id"
      :index="index"
      class="input input-bordered w-10 uppercase"
    />
  </PinInputRoot>
</template>
