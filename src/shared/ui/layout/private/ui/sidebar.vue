<script setup lang="ts">
import * as m from '@i18n/messages'
import LucideGauge from '~icons/lucide/gauge'
import LucideGift from '~icons/lucide/gift'
import LucideApi from '~icons/lucide/webhook'
import LucideShoppingBag from '~icons/lucide/shopping-bag'
import LucidePackage from '~icons/lucide/package'
import LucideUser from '~icons/lucide/user'
import LucideTag from '~icons/lucide/tag'
import LucideSettings from '~icons/lucide/settings'
import LucideGetIcon from '~icons/lucide/arrow-down-right-square'
import LucidePostIcon from '~icons/lucide/arrow-up-right-square'
import LucideChevronDown from '~icons/lucide/chevron-down'
import LucideDeleteIcon from '~icons/lucide/trash'
import ActsOneLogo from '@/assets/logo.png'
import { onMounted, ref } from 'vue'
import { getPlatformApis } from '@/shared/api/endpoints/get-platform-apis/get-platform-apis'
import type { Api } from '@/shared/api/endpoints/get-platform-apis/types'
import { toast } from '@/shared/ui/toast'

const apis = ref<Api[]>([])
const loading = ref(false)

// Interface để nhóm API theo platform
interface PlatformGroup {
  id: number
  name: string
  apis: Record<string, Api[]> // APIs nhóm theo category
}

const platforms = ref<PlatformGroup[]>([])

// Tạm thời phân loại APIs bằng cách dựa vào URL path hoặc tên
// Sau này có thể thay thế bằng category từ backend
const categorizeApis = (api: Api) => {
  const endpoint = api.Endpoint.toLowerCase()
  const name = api.Name.toLowerCase()

  if (endpoint.includes('order') || name.includes('order')) {
    return 'order'
  } else if (
    endpoint.includes('product') ||
    name.includes('product') ||
    endpoint.includes('item')
  ) {
    return 'product'
  } else if (endpoint.includes('user') || name.includes('user') || endpoint.includes('account')) {
    return 'user'
  } else if (
    endpoint.includes('payment') ||
    name.includes('payment') ||
    endpoint.includes('transaction')
  ) {
    return 'payment'
  } else if (endpoint.includes('category') || name.includes('category')) {
    return 'category'
  } else {
    return 'other'
  }
}

// Nhóm APIs theo platform và category
const groupApisByPlatform = (apiList: Api[]) => {
  const platformMap = new Map<number, PlatformGroup>()

  apiList.forEach((api) => {
    const platformId = api.PlatformID
    const platformName = api.PlatformName
    const category = categorizeApis(api)

    // Nếu platform chưa có trong Map, thêm mới
    if (!platformMap.has(platformId)) {
      platformMap.set(platformId, {
        id: platformId,
        name: platformName,
        apis: {
          order: [],
          product: [],
          user: [],
          payment: [],
          category: [],
          other: [],
        },
      })
    }

    // Thêm API vào category tương ứng trong platform
    platformMap.get(platformId)?.apis[category].push(api)
  })

  // Chuyển đổi Map thành mảng platforms
  return Array.from(platformMap.values())
}

// Lấy icon cho từng category
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'order':
      return LucideShoppingBag
    case 'product':
      return LucidePackage
    case 'user':
      return LucideUser
    case 'payment':
      return LucideTag
    case 'category':
      return LucideSettings
    default:
      return LucideApi
  }
}

// Lấy icon cho HTTP method
const getMethodIcon = (method: string) => {
  switch (method) {
    case 'GET':
      return LucideGetIcon
    case 'POST':
      return LucidePostIcon
    case 'PUT':
      return LucidePostIcon
    case 'DELETE':
      return LucideDeleteIcon
    default:
      return LucideApi
  }
}

// Lấy màu cho HTTP method
const getMethodColor = (method: string) => {
  switch (method) {
    case 'GET':
      return 'text-blue-500'
    case 'POST':
      return 'text-green-500'
    case 'PUT':
      return 'text-yellow-500'
    case 'DELETE':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

// Lấy badge class cho HTTP method
const getMethodBadge = (method: string) => {
  switch (method) {
    case 'GET':
      return 'badge-info'
    case 'POST':
      return 'badge-success'
    case 'PUT':
      return 'badge-warning'
    case 'DELETE':
      return 'badge-error'
    default:
      return 'badge-neutral'
  }
}

const fetchApis = async () => {
  try {
    loading.value = true
    const params = {
      limit: 100, // Get a reasonable number of APIs
    }
    const data = await getPlatformApis(params)
    apis.value = data.APIs || []

    // Nhóm APIs theo platform và category
    platforms.value = groupApisByPlatform(apis.value)
  } catch (error) {
    console.error('Failed to fetch APIs for sidebar:', error)
    toast.error('Failed to load API list')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchApis()
})
</script>

<template>
  <div class="drawer-side z-40" style="scroll-behavior: smooth; scroll-padding-top: 5rem">
    <label for="drawer" class="drawer-overlay" aria-label="close menu"></label>
    <aside
      class="bg-base-100 min-h-screen w-4/5 overflow-y-auto supports-[min-height:100dvh]:min-h-[100dvh] sm:w-80"
    >
      <div
        class="bg-base-100 bg-opacity-90 font-company sticky top-0 z-20 gap-x-2 px-4 py-4 backdrop-blur-sm"
      >
        <div class="flex items-start gap-x-2">
          <img :src="ActsOneLogo" class="h-8" />
          <div>
            <p class="text-2xl">ActsOne</p>
            <p class="text-base-content/50 text-xs">API-Platform</p>
          </div>
        </div>
      </div>

      <ul class="menu bg-base-100 text-base-content w-full gap-y-1 p-4 text-[16px]">
        <li>
          <RouterLink :to="{ name: '/(cms)/dashboard' }" activeClass="menu-active" class="py-3">
            <LucideGauge /><span class="capitalize-first">{{ m.red_bald_tortoise_burn() }}</span>
          </RouterLink>
        </li>
        <li>
          <details open class="space-y-1">
            <summary class="py-3">
              <LucideGift /><span class="capitalize-first">{{ m.bald_icy_otter_bask() }}</span>
            </summary>
            <ul class="space-y-1">
              <!-- Platform Groups -->
              <li v-for="platform in platforms" :key="platform.id" class="mb-2">
                <details open class="space-y-1">
                  <summary class="py-3">
                    <LucideApi /><span class="capitalize-first">{{ platform.name }}</span>
                  </summary>
                  <ul v-if="loading" class="mt-2">
                    <li class="text-sm text-gray-500">Loading APIs...</li>
                  </ul>

                  <!-- Order APIs -->
                  <details open class="ml-2" v-if="platform.apis.order.length">
                    <summary class="btn btn-ghost w-full justify-between">
                      <!-- <component :is="getCategoryIcon('order')" class="mr-2 h-4 w-4" /> -->
                      <span>Order APIs</span><LucideChevronDown />
                    </summary>
                    <ul class="space-y-1 pl-2">
                      <li v-for="api in platform.apis.order" :key="api.ID">
                        <RouterLink
                          :to="{
                            name: '/(cms)/platform/[id]',
                            params: { id: api.ID.toString() },
                          }"
                          activeClass="menu-active"
                          class="truncate py-2 text-sm hover:bg-gray-200"
                          :title="api.Description || api.Name"
                        >
                          <span class="badge badge-sm mr-2" :class="getMethodBadge(api.Method)">
                            {{ api.Method }}
                          </span>
                          <span>{{ api.Name || api.Endpoint }}</span>
                        </RouterLink>
                      </li>
                    </ul>
                  </details>

                  <!-- Product APIs -->
                  <details open class="ml-2" v-if="platform.apis.product.length">
                    <summary class="flex items-center py-2 text-sm font-medium">
                      <component :is="getCategoryIcon('product')" class="mr-2 h-4 w-4" />
                      <span>Product APIs</span>
                    </summary>
                    <ul class="space-y-1 pl-2">
                      <li v-for="api in platform.apis.product" :key="api.ID">
                        <RouterLink
                          :to="{
                            name: '/(cms)/platform/[id]',
                            params: { id: api.ID.toString() },
                          }"
                          activeClass="menu-active"
                          class="truncate py-2 text-sm hover:bg-gray-200"
                          :title="api.Description || api.Name"
                        >
                          <span class="badge badge-sm mr-2" :class="getMethodBadge(api.Method)">
                            {{ api.Method }}
                          </span>
                          <span>{{ api.Name || api.Endpoint }}</span>
                        </RouterLink>
                      </li>
                    </ul>
                  </details>

                  <!-- User APIs -->
                  <details open class="ml-2" v-if="platform.apis.user.length">
                    <summary class="flex items-center py-2 text-sm font-medium">
                      <component :is="getCategoryIcon('user')" class="mr-2 h-4 w-4" />
                      <span>User APIs</span>
                    </summary>
                    <ul class="space-y-1 pl-2">
                      <li v-for="api in platform.apis.user" :key="api.ID">
                        <RouterLink
                          :to="{
                            name: '/(cms)/platform/[id]',
                            params: { id: api.ID.toString() },
                          }"
                          activeClass="menu-active"
                          class="truncate py-2 text-sm hover:bg-gray-200"
                          :title="api.Description || api.Name"
                        >
                          <span class="badge badge-sm mr-2" :class="getMethodBadge(api.Method)">
                            {{ api.Method }}
                          </span>
                          <span>{{ api.Name || api.Endpoint }}</span>
                        </RouterLink>
                      </li>
                    </ul>
                  </details>

                  <!-- Payment APIs -->
                  <details open class="ml-2" v-if="platform.apis.payment.length">
                    <summary class="flex items-center py-2 text-sm font-medium">
                      <component :is="getCategoryIcon('payment')" class="mr-2 h-4 w-4" />
                      <span>Payment APIs</span>
                    </summary>
                    <ul class="space-y-1 pl-2">
                      <li v-for="api in platform.apis.payment" :key="api.ID">
                        <RouterLink
                          :to="{
                            name: '/(cms)/platform/[id]',
                            params: { id: api.ID.toString() },
                          }"
                          activeClass="menu-active"
                          class="truncate py-2 text-sm hover:bg-gray-200"
                          :title="api.Description || api.Name"
                        >
                          <span class="badge badge-sm mr-2" :class="getMethodBadge(api.Method)">
                            {{ api.Method }}
                          </span>
                          <span>{{ api.Name || api.Endpoint }}</span>
                        </RouterLink>
                      </li>
                    </ul>
                  </details>

                  <!-- Category APIs -->
                  <details open class="ml-2" v-if="platform.apis.category.length">
                    <summary class="flex items-center py-2 text-sm font-medium">
                      <component :is="getCategoryIcon('category')" class="mr-2 h-4 w-4" />
                      <span>Category APIs</span>
                    </summary>
                    <ul class="space-y-1 pl-2">
                      <li v-for="api in platform.apis.category" :key="api.ID">
                        <RouterLink
                          :to="{
                            name: '/(cms)/platform/[id]',
                            params: { id: api.ID.toString() },
                          }"
                          activeClass="menu-active"
                          class="truncate py-2 text-sm hover:bg-gray-200"
                          :title="api.Description || api.Name"
                        >
                          <span class="badge badge-sm mr-2" :class="getMethodBadge(api.Method)">
                            {{ api.Method }}
                          </span>
                          <span>{{ api.Name || api.Endpoint }}</span>
                        </RouterLink>
                      </li>
                    </ul>
                  </details>

                  <!-- Other APIs -->
                  <details open class="ml-2" v-if="platform.apis.other.length">
                    <summary class="flex items-center py-2 text-sm font-medium">
                      <!-- <component :is="getCategoryIcon('other')" class="mr-2 h-4 w-4" /> -->
                      <span class="ml-4">Other APIs</span>
                    </summary>
                    <ul class="space-y-1 pl-2">
                      <li v-for="api in platform.apis.other" :key="api.ID">
                        <RouterLink
                          :to="{
                            name: '/(cms)/platform/[id]',
                            params: { id: api.ID.toString() },
                          }"
                          activeClass="menu-active"
                          class="truncate py-2 text-sm hover:bg-gray-200"
                          :title="api.Description || api.Name"
                        >
                          <span class="badge badge-sm mr-2" :class="getMethodBadge(api.Method)">
                            {{ api.Method }}
                          </span>
                          <span>{{ api.Name || api.Endpoint }}</span>
                        </RouterLink>
                      </li>
                    </ul>
                  </details>
                </details>
              </li>

              <!-- Add new API link -->
              <!-- <li>
                <RouterLink
                  :to="{
                    name: '/(cms)/platform/[id]',
                    params: { id: 'add-api' },
                  }"
                  activeClass="menu-active"
                  class="text-primary ml-2 flex items-center py-2 text-sm font-medium hover:bg-gray-200"
                >
                  <LucideFilePlus class="mr-2 h-4 w-4" />
                  <span>Add New API</span>
                </RouterLink>
              </li> -->

              <!-- Keeping existing menu items -->
              <!-- <li>
                <details class="space-y-1">
                  <summary class="py-3">
                    <LucideGift /><span class="capitalize-first">{{
                      m.inclusive_plane_buzzard_play()
                    }}</span>
                  </summary>
                  <ul class="space-y-1">
                    <li>
                      <RouterLink
                        :to="{
                          name: '/(cms)/platform/[id]',
                          params: { id: 'get_category' },
                        }"
                        activeClass="menu-active"
                        class="py-3"
                      >
                        <span class="capitalize-first">{{ m.plain_livid_weasel_foster() }}</span>
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        :to="{ name: '/(cms)/api-platform/' }"
                        activeClass="menu-active"
                        class="py-3"
                      >
                        <span class="capitalize-first">{{ m.drab_lower_lizard_tap() }}</span>
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        :to="{ name: '/(cms)/api-platform/' }"
                        activeClass="menu-active"
                        class="py-3"
                      >
                        <span class="capitalize-first">{{ m.major_lost_porpoise_grin() }}</span>
                      </RouterLink>
                    </li>
                  </ul>
                </details>
              </li> -->
            </ul>
          </details>
        </li>
      </ul>
    </aside>
  </div>
</template>
