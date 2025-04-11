<script setup lang="ts">
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { useForgotPasswordStep2Store } from '../model/forgot-password'
import * as m from '@/shared/lib/i18n/messages'
import { PasswordInput } from '@/shared/ui/password-input'
import { FormControl } from '@/shared/ui/form-control'

const { confirmPassword, isConfirmPasswordMatch, isLoading, onSubmit, otp, password } =
  useForgotPasswordStep2Store()
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">{{ m.flaky_drab_cat_zap() }}</h1>
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <!-- Password -->
      <FormControl :label="`${m.game_icy_toucan_delight()} ${m.tame_keen_donkey_praise()}`">
        <PasswordInput
          v-model="password"
          :placeholder="m.odd_next_termite_grasp()"
          :disabled="isLoading"
        />
      </FormControl>

      <FormControl
        :label="`${m.alive_teary_pig_coax()} ${m.tame_keen_donkey_praise()}`"
        :error="m.free_white_butterfly_approve()"
        :hide-error="isConfirmPasswordMatch"
      >
        <PasswordInput
          v-model="confirmPassword"
          :placeholder="m.glad_just_racoon_renew()"
          :disabled="isLoading"
        />
      </FormControl>

      <FormControl label="OTP" :notice="m.weird_proof_herring_bask()">
        <input
          type="password"
          v-model="otp"
          :placeholder="m.awful_vivid_shad_play()"
          required
          class="input input-bordered"
          :disabled="isLoading"
        />
      </FormControl>

      <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
        <LoadingSpinner v-if="isLoading" class="size-5" />
        {{ m.spare_front_ocelot_kiss() }}
      </button>
    </form>
  </div>
</template>
