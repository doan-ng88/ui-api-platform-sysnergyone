<script setup lang="ts">
import { useInputCurrencyStore } from './store'
import type { InputCurrencyEmits, InputCurrencyProps } from './types'

const props = defineProps<InputCurrencyProps>()

const emits = defineEmits<InputCurrencyEmits>()

const model = defineModel<number | string>()

const { onInput, value, inputClass, placeholderContent } = useInputCurrencyStore({
  props,
  emits,
  model,
})
</script>

<template>
  <label :class="inputClass">
    <slot name="prefix" />
    <input
      type="text"
      class="w-full grow"
      :placeholder="placeholderContent"
      v-model="value"
      :autocomplete="props.autocomplete"
      :disabled="props.disabled"
      @input="onInput"
      min="0"
      :required="props.required"
    />
    <span class="lowercase">đ</span>
  </label>
</template>
