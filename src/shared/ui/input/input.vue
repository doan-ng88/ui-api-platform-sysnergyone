<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { InputProps } from './types'
import { cn } from '@/shared/lib/classname'
import { inputClassNameHandler } from './styles'

const model = defineModel<string | number | boolean | Date>({ default: '' })

const emits = defineEmits<{
  (e: 'change', value: string | number | boolean | Date): void
  (e: 'file-change', value: FileList | null): void
}>()

const props = defineProps<InputProps>()

const slots = useSlots()

const inputClasses = computed(() => {
  if (props.type === 'checkbox') {
    return cn(
      inputClassNameHandler({
        size: 'none',
        bordered: false,
        error: props.error,
        type: props.type,
      }),
      {
        'flex items-center gap-2': slots.prefix || slots.suffix,
      },
      props.class,
    )
  }
  return cn(
    inputClassNameHandler({
      size: props.size,
      bordered: props.bordered,
      error: props.error,
      type: props.type,
    }),
    {
      'flex items-center gap-2': slots.prefix || slots.suffix,
    },
    props.class,
  )
})

const placeholderContent = computed(() => {
  const firstChar = props.placeholder?.charAt(0)
  if (!firstChar) {
    return
  }
  return firstChar.toUpperCase() + props.placeholder?.slice(1)
})

const onInputChange = (event: Event) => {
  emits('change', (event.target as HTMLInputElement).value)
  emits('file-change', (event.target as HTMLInputElement).files)
}
</script>

<template>
  <div :class="inputClasses" v-if="slots.prefix || slots.suffix">
    <slot name="prefix" />
    <input
      class="placeholder:capitalize-first inline-block w-full"
      v-model="model"
      v-bind="$attrs"
      :disabled="props.disabled"
      :type="props.type"
      :placeholder="placeholderContent"
      @input="onInputChange"
    />
    <slot name="suffix" />
  </div>
  <input
    :class="inputClasses"
    v-model="model"
    v-bind="$attrs"
    :disabled="props.disabled"
    :type="props.type"
    :placeholder="placeholderContent"
    @input="onInputChange"
    v-else
  />
</template>
