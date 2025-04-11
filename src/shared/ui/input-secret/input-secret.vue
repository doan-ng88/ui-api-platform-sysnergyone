<script setup lang="ts">
import LucideEye from '~icons/lucide/eye'
import LucideEyeOff from '~icons/lucide/eye-off'
import { useInputSecretStore } from './store'
import type { InputSecretEmits, InputSecretProps } from './types'

type Props = InputSecretProps
type Emits = InputSecretEmits

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const model = defineModel<string>()

const { inputClasses, inputType, isVisible, placeholder, toggleVisibility } = useInputSecretStore({
  props,
  models: { model },
  emits: emit,
})
</script>

<template>
  <div :class="inputClasses">
    <slot name="prefix" />
    <input
      :id="props.id"
      :type="inputType"
      required
      class="grow"
      v-model="model"
      :placeholder="placeholder"
      :disabled="props.disabled"
      :autocomplete="props.autocomplete"
      v-bind="$attrs"
    />
    <div class="cursor-pointer" @click="toggleVisibility">
      <LucideEye v-if="isVisible" />
      <LucideEyeOff v-else />
    </div>
  </div>
</template>
