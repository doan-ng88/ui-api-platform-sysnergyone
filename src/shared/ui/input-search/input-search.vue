<script setup lang="ts">
import LucideSearch from '~icons/lucide/search'
import type { SearchInputEmits, SearchInputProps } from './types'
import { useSearchInputStore } from './store'

type Props = SearchInputProps

type Emits = SearchInputEmits

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

const model = defineModel<string>()

const { inputClass, search, placeholder } = useSearchInputStore({ props, emits, model })
</script>

<template>
  <label :class="inputClass">
    <LucideSearch class="inline-block" />
    <input
      type="text"
      class="w-full grow"
      :placeholder="placeholder"
      v-model="search"
      :autocomplete="props.autocomplete"
      :disabled="props.disabled"
    />
  </label>
</template>
