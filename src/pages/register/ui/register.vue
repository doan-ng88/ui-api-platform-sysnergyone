<script setup lang="ts">
import { useRegister } from '../model/register'
import * as m from '@i18n/messages'
import { PasswordInput } from '@/shared/ui/password-input'
import { FormControl } from '@/shared/ui/form-control'
import { globalEnv } from '@/shared/lib/env'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

const { email, password, full_name, phone, isRegisterLoading, onRegister } = useRegister()

// Danh sách phòng ban và vị trí mô phỏng (thực tế cần lấy từ API)
// const departmentOptions = ref([
//   { label: 'HR Department', value: '1' },
//   { label: 'IT Department', value: '2' },
//   { label: 'Marketing', value: '3' },
//   { label: 'Finance', value: '4' },
// ])

// const positionOptions = ref([
//   { label: 'Manager', value: '1' },
//   { label: 'Staff', value: '2' },
//   { label: 'Intern', value: '3' },
//   { label: 'Director', value: '4' },
// ])

// // Cập nhật giá trị department_id mỗi khi người dùng chọn một phòng ban
// const handleDepartmentChange = (value) => {
//   department_id.value = parseInt(value)
// }

// // Cập nhật giá trị position_id mỗi khi người dùng chọn một vị trí
// const handlePositionChange = (value) => {
//   position_id.value = parseInt(value)
// }
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">{{ m.smug_best_gopher_hack() }}</h1>
    <p class="text-sm text-gray-500">
      Please fill out the form below to create your account. All fields marked with * are required.
    </p>

    <form @submit.prevent="onRegister" class="flex flex-col gap-4">
      <!-- Full Name -->
      <FormControl label="Full Name" required>
        <Input
          size="md"
          type="text"
          v-model="full_name"
          placeholder="Enter your full name"
          required
          autocomplete="name"
          :disabled="isRegisterLoading"
        />
      </FormControl>

      <!-- Email -->
      <FormControl :label="m.tough_orange_bullock_peek()" required>
        <Input
          size="md"
          type="text"
          v-model="email"
          :placeholder="m.early_mild_giraffe_stab()"
          required
          autocomplete="email"
          :disabled="isRegisterLoading"
        />
        <div class="mt-1 text-xs text-gray-500">
          We'll send a verification code to this email address
        </div>
      </FormControl>

      <!-- Phone -->
      <FormControl label="Phone Number" required>
        <Input
          size="md"
          type="text"
          v-model="phone"
          placeholder="Enter your phone number"
          required
          autocomplete="tel"
          :disabled="isRegisterLoading"
        />
      </FormControl>

      <!-- Password -->
      <FormControl :label="m.tame_keen_donkey_praise()" id="password" required>
        <PasswordInput
          id="password"
          v-model="password"
          :placeholder="m.odd_next_termite_grasp()"
          :disabled="isRegisterLoading"
        />
        <div class="mt-1 text-xs text-gray-500">Password must be at least 6 characters long</div>
      </FormControl>

      <!-- System info -->
      <!-- <div class="rounded-md bg-blue-50 p-4">
        <div class="flex">
          <div class="ml-3">
            <h3 class="text-sm font-medium text-blue-800">System Information</h3>
            <div class="mt-2 text-sm text-blue-700">
              <p>Department ID: 12 (Hardcoded)</p>
              <p>Position ID: 1 (Hardcoded)</p>
            </div>
          </div>
        </div>
      </div> -->

      <div class="card-actions mt-4 flex-row justify-between">
        <div class="flex items-center">
          <span class="text-sm">Already have an account?</span>
          <RouterLink
            class="link link-primary ml-1 text-sm"
            :to="{
              path: '/auth/sign-in',
              query: { company: globalEnv.COMPANY_ID },
            }"
          >
            Sign In
          </RouterLink>
        </div>
        <Button type="submit" unstyled class="btn btn-primary w-40" :loading="isRegisterLoading">
          Register
        </Button>
      </div>
    </form>
  </div>
</template>
