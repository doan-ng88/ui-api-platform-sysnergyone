<script setup lang="ts">
import { cn } from '@/shared/lib/classname'
import { computed, ref, type InputTypeHTMLAttribute } from 'vue'
import LucideEye from '~icons/lucide/eye'
import LucideEyeOff from '~icons/lucide/eye-off'

interface Props {
  placeholder: string
  class?: string
  disabled?: boolean
  id?: string
}

const props = defineProps<Props>()

const model = defineModel()

const isVisible = ref(false)

const inputType = computed((): InputTypeHTMLAttribute => (isVisible.value ? 'text' : 'password'))

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

const inputClasses = computed(() => cn('input input-bordered flex items-center gap-2', props.class))
</script>

<template>
  <div :class="inputClasses">
    <input
      :id="props.id"
      :type="inputType"
      required
      class="grow"
      v-model="model"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      autocomplete="current-password"
    />
    <button type="button" class="btn btn-square btn-ghost btn-sm" @click="toggleVisibility">
      <LucideEye v-if="isVisible" />
      <LucideEyeOff v-else />
    </button>
  </div>
</template>
