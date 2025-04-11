<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, computed, onUnmounted } from 'vue'
import QRCode from 'qrcode.vue' // Để hiển thị QR code
import LucideAlarmClockCheck from '~icons/lucide/alarm-clock-check'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { toast } from '@/shared/ui/toast'
import { apiCompleteRegistration } from '../api/complete-registration'
import type { AxiosError } from 'axios'

const route = useRoute()
const router = useRouter()

// State cho ứng dụng
const authCode = ref('')
const isLoading = ref(false)

// Lấy QR code từ query param hoặc localStorage (backup)
const otpAuthUrl = computed(() => {
  // Thử lấy từ query param trước
  const qrCodeParam = route.query.qrCode as string
  if (qrCodeParam) {
    return decodeURIComponent(qrCodeParam)
  }

  // Không có trong query param, thử lấy từ localStorage
  const storedQRCode = localStorage.getItem('temp_qrcode')
  return storedQRCode || ''
})

interface RegistrationData {
  user_id: number
  email: string
  verification_deadline: string
}

// Lấy thông tin từ localStorage
const registrationData = computed<RegistrationData | null>(() => {
  const data = localStorage.getItem('registration_data')
  return data ? JSON.parse(data) : null
})

const registrationToken = computed(() => {
  return localStorage.getItem('registration_token') || ''
})

// Kiểm tra thời hạn
const timeRemaining = ref('')
const checkDeadline = () => {
  if (!registrationData.value?.verification_deadline) return false

  const deadline = new Date(registrationData.value.verification_deadline)
  const now = new Date()

  if (now > deadline) {
    toast.error('Registration time expired. Please register again.')
    setTimeout(
      () =>
        router.push({
          name: '/auth/register',
        }),
      2000,
    )
    return false
  }

  // Tính thời gian còn lại
  const diffMs = deadline.getTime() - now.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffSecs = Math.floor((diffMs % 60000) / 1000)

  timeRemaining.value = `${diffMins}m ${diffSecs}s`
  return true
}

// Cập nhật countdown
let timer: number | null = null
onMounted(() => {
  // Kiểm tra dữ liệu
  if (!registrationData.value) {
    toast.error('Missing registration data')
    router.push({
      name: '/auth/register',
    })
    return
  }

  // Kiểm tra QR code
  if (!otpAuthUrl.value) {
    toast.warning('QR code not found in URL parameters, checking localStorage...')
    // Đã kiểm tra localStorage trong computed property ở trên

    if (!otpAuthUrl.value) {
      toast.error('QR code not available. Please register again.')
      setTimeout(
        () =>
          router.push({
            name: '/auth/register',
          }),
        2000,
      )
      return
    }
  }

  checkDeadline()
  timer = window.setInterval(() => {
    if (!checkDeadline()) {
      if (timer !== null) {
        clearInterval(timer)
        timer = null
      }
    }
  }, 1000)
})

// Clean up
onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
})

// Xử lý submit code
const submitCode = async () => {
  if (!authCode.value || authCode.value.length !== 6) {
    toast.error('Please enter a valid 6-digit code')
    return
  }

  if (!registrationData.value?.user_id || !registrationToken.value) {
    toast.error('Missing registration information')
    return
  }

  isLoading.value = true

  try {
    const result = await apiCompleteRegistration({
      user_id: registrationData.value.user_id,
      code: authCode.value,
      token: registrationToken.value,
    })

    if (result && result.status === 'success') {
      toast.success('Two-factor authentication setup complete!')

      // Xóa dữ liệu registration và temp data trong localStorage
      localStorage.removeItem('registration_data')
      localStorage.removeItem('registration_token')
      localStorage.removeItem('temp_qrcode')
      localStorage.removeItem('temp_secret')

      // Chuyển về trang login
      setTimeout(
        () =>
          router.push({
            name: '/auth/sign-in',
          }),
        1000,
      )
    } else {
      toast.error(result?.message || 'Failed to verify code')
    }
  } catch (error) {
    // Thay console.error bằng toast
    toast.error('Error verifying code')
    const axiosError = error as AxiosError
    if (axiosError.response?.data) {
      const errorData = axiosError.response.data as Record<string, string>
      toast.error(errorData.message || 'Failed to verify code')
    } else {
      toast.error('Failed to verify code: Network error')
    }
  } finally {
    isLoading.value = false
  }
}

// Hàm quay lại trang đăng ký
const goBackToRegister = () => {
  // Xác nhận với người dùng trước khi rời đi
  const shouldLeave = confirm(
    'Are you sure you want to go back to registration? Your current progress will be lost.',
  )
  if (shouldLeave) {
    // Xóa dữ liệu tạm
    localStorage.removeItem('temp_qrcode')
    localStorage.removeItem('temp_secret')

    // Quay lại trang đăng ký
    router.push({ name: '/auth/register' })
  }
}

// Thêm hàm này vào phần script
const refreshPage = () => {
  // Sử dụng globalThis thay vì window để tránh lỗi linter
  globalThis.location.reload()
}
</script>

<template>
  <div class="bg-background flex min-h-screen flex-col items-center justify-center p-4">
    <div class="bg-card w-full max-w-md space-y-8 rounded-lg p-8 shadow-md">
      <div class="text-center">
        <h1 class="text-foreground text-2xl font-bold tracking-tight">
          Setup Two-Factor Authentication
        </h1>
        <p class="text-muted-foreground mt-2 text-sm">
          Scan the QR code with your authenticator app to set up two-factor authentication
        </p>
        <div class="mt-2 flex items-center justify-center text-amber-500">
          <LucideAlarmClockCheck />
          <span class="text-sm">Time remaining: {{ timeRemaining }}</span>
        </div>
      </div>

      <div class="mt-8 space-y-6">
        <!-- QR Code Display -->
        <div class="flex justify-center">
          <div v-if="otpAuthUrl" class="border-muted max-w-[270px] rounded-lg border-2 p-2">
            <QRCode :value="otpAuthUrl" :size="250" level="M" class="h-auto w-full" />
          </div>
          <div
            v-else
            class="border-muted flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8"
          >
            <div
              class="text-muted-foreground flex h-12 w-12 items-center justify-center border-2 border-dashed"
            >
              QR
            </div>
            <p class="text-muted-foreground mt-2 text-sm">QR Code not available</p>
          </div>
        </div>

        <!-- Code Input -->
        <div class="mt-8">
          <label for="authCode" class="text-foreground mb-1 block text-sm font-medium">
            Enter the 6-digit code from your authenticator app
          </label>
          <Input
            id="authCode"
            v-model="authCode"
            type="text"
            inputmode="numeric"
            maxlength="6"
            placeholder="000000"
            class="block w-full"
            :disabled="isLoading"
          />
        </div>

        <!-- Submit Button -->
        <Button
          type="button"
          class="w-full"
          :disabled="isLoading || authCode.length !== 6"
          :loading="isLoading"
          @click="submitCode"
        >
          Verify Code
        </Button>

        <!-- Back & Refresh Buttons -->
        <div class="mt-4 flex justify-between">
          <Button variant="outline" @click="goBackToRegister"> Back to Register </Button>
          <Button variant="ghost" @click="refreshPage"> Refresh Page </Button>
        </div>
      </div>
    </div>
  </div>
</template>
