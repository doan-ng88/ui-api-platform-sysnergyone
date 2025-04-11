<script setup lang="ts">
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { useForgotPasswordStep1Store } from '../model/forgot-password'
import * as m from '@/shared/lib/i18n/messages'
import LucideArrowRight from '~icons/lucide/arrow-right'
import { FormControl } from '@/shared/ui/form-control'

const { email, isLoading, onSubmit } = useForgotPasswordStep1Store()
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">{{ m.teary_great_rook_hope() }}</h1>
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <!-- Username -->
      <FormControl :label="m.tough_orange_bullock_peek()">
        <input
          type="email"
          :placeholder="m.loud_small_kitten_relish()"
          required
          class="input input-bordered"
          v-model="email"
          :disabled="isLoading"
        />
      </FormControl>

      <div class="card-actions justify-end">
        <button type="submit" class="btn btn-primary w-40" :disabled="isLoading">
          <LoadingSpinner v-if="isLoading" class="size-5" />
          {{ m.spare_front_ocelot_kiss() }}
          <LucideArrowRight />
        </button>
      </div>
    </form>
  </div>
</template>
