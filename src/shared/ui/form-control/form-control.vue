<script lang="ts" setup>
import { useSlots } from 'vue'
import type { FormControlProps } from './types'

type Props = FormControlProps

const props = defineProps<Props>()

const slots = useSlots()
</script>

<template>
  <div class="form-control w-full" v-if="slots['label-alt'] || props.asDiv">
    <div class="label">
      <span class="label-text" v-if="props.label">
        <label :for="props.id" class="capitalize-first inline-block font-semibold">{{
          props.label
        }}</label>
        <span class="text-error" v-if="props.required">*</span>
      </span>
      <slot name="label-alt" />
    </div>
    <slot />
    <div class="label" v-if="props.error && !props.hideError">
      <span class="label-text-alt text-error">{{ props.error }}</span>
    </div>
  </div>
  <label class="form-control w-full" v-else>
    <div class="label">
      <span class="label-text" v-if="props.label">
        <span class="capitalize-first inline-block font-semibold">{{ props.label }}</span>
        <span class="text-error" v-if="props.required">*</span>
      </span>
    </div>
    <slot />
    <div class="label" v-if="(props.error && !props.hideError) || props.notice">
      <span class="label-text-alt text-error" v-if="props.error && !props.hideError">
        {{ props.error }}
      </span>
      <span class="label-text-alt" v-if="!(props.error && !props.hideError)">
        {{ props.notice }}
      </span>
    </div>
  </label>
</template>
