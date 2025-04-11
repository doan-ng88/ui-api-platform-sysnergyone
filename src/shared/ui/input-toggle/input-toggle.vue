<script setup lang="ts">
import { computed } from 'vue'
import { inputToggleClassNameHandler } from './styles'
import type { EmitsProps, InputToggleProps } from './types'
import { cn } from '@/shared/lib/classname'

const props = defineProps<InputToggleProps>()

const emit = defineEmits<EmitsProps>()

const inputToggleClass = computed(() => {
  return cn(
    inputToggleClassNameHandler({
      size: props.size,
      color: props.color,
    }),
    {
      'toggle-error': props.error,
    },
    props.class,
  )
})

const model = defineModel<boolean>()

const onChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).checked
  emit('change', value)
}
</script>

<template>
  <div class="form-control">
    <label class="flex cursor-pointer items-center gap-x-2">
      <input
        type="checkbox"
        v-model="model"
        :class="inputToggleClass"
        :required="props.required"
        :disabled="props.disabled"
        @input="onChange"
      />
      <span
        class="label-text capitalize-first"
        :class="{ 'text-error': props.error }"
        v-if="props.label"
      >
        {{ props.label }}
        <span v-if="props.required" class="text-error">*</span>
      </span>
    </label>
  </div>
</template>
