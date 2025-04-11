<script setup lang="ts">
import { useSignIn } from '../model/sign-in'
import * as m from '@i18n/messages'
import { PasswordInput } from '@/shared/ui/password-input'
import { FormControl } from '@/shared/ui/form-control'
import { globalEnv } from '@/shared/lib/env'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import VerifyF2a from './verify-f2a.vue'

const { email, password, isVerifyUserLoading, sessionId, onSignIn } = useSignIn()
</script>

<template>
  <div>
    <VerifyF2a v-if="sessionId" :email="email" :session-id="sessionId" />

    <div class="space-y-6" v-else>
      <h1 class="text-2xl font-bold">{{ m.careful_house_earthworm_push() }}</h1>
      <form @submit.prevent="onSignIn" class="flex flex-col gap-4">
        <!-- Username -->
        <FormControl :label="m.tough_orange_bullock_peek()">
          <Input
            size="md"
            type="text"
            v-model="email"
            :placeholder="m.early_mild_giraffe_stab()"
            required
            autocomplete="email"
            :disabled="isVerifyUserLoading"
          />
        </FormControl>

        <!-- Password -->
        <FormControl :label="m.tame_keen_donkey_praise()" id="password">
          <PasswordInput
            id="password"
            v-model="password"
            :placeholder="m.odd_next_termite_grasp()"
            :disabled="isVerifyUserLoading"
          />
        </FormControl>

        <div class="card-actions flex-row justify-between">
          <div class="flex items-center">
            <span class="text-sm">Don't have an account?</span>
            <RouterLink
              class="link link-primary ml-1 text-sm"
              :to="{
                name: '/auth/register',
                query: { company: globalEnv.COMPANY_ID },
              }"
            >
              Register
            </RouterLink>
          </div>
          <Button
            type="submit"
            unstyled
            class="btn btn-primary w-40"
            :loading="isVerifyUserLoading"
          >
            {{ m.careful_house_earthworm_push() }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
