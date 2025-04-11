<script setup lang="ts">
import { Container, ContainerInner } from '@/shared/ui/container'
import { PageHeader } from '@/shared/ui/page-header'

import * as m from '@i18n/messages'
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/config'
import { onMounted, ref } from 'vue'
import { toast } from '@/shared/ui/toast'
import { apiGetApiList } from '../api/get-api-list'
import { Table } from '@/shared/ui/table'
import { Card } from '@/shared/ui/card'
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/shared/ui/table'
// import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Pagination } from '@/shared/ui/pagination'
// import { SelectBoxes } from '@/shared/ui/select-boxes'
// import { Search } from '@/shared/ui/search'
import { Badge } from '@/shared/ui/badge'
import { useRouter } from 'vue-router'
import type { ApiListProps } from '../api/get-api-list'
import type { Api } from '../configs/types'

const accessToken = ref(localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY) || '')
const loading = ref(false)
const apis = ref<Api[]>([])
const totalApis = ref(0)
const router = useRouter()

// Pagination and filters
const pagination = ref({
  limit: 10,
  offset: 0,
})

const filters = ref<Omit<ApiListProps, 'limit' | 'offset'>>({
  sort_by: 'created_at',
  sort_order: 'desc',
  platform_id: 1, // Default to Shopee platform
})

const searchTerm = ref('')

// Method options for filter
const methodOptions = [
  { label: 'All', value: '' },
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'DELETE', value: 'DELETE' },
]

// Sort options
const sortOptions = [
  { label: 'Newest', value: 'desc' },
  { label: 'Oldest', value: 'asc' },
]

const fetchApis = async () => {
  try {
    loading.value = true

    const params: ApiListProps = {
      ...pagination.value,
      ...filters.value,
    }

    // Add search term if provided
    if (searchTerm.value) {
      params.search = searchTerm.value
    }

    const data = await apiGetApiList(params)
    console.log(data)
    apis.value = data.apis
    totalApis.value = data.total
  } catch (error) {
    toast.error('Failed to fetch API list')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  pagination.value.offset = (page - 1) * pagination.value.limit
  fetchApis()
}

const handleSearch = () => {
  pagination.value.offset = 0 // Reset to first page on new search
  fetchApis()
}

const handleMethodChange = (method: string) => {
  filters.value.method = method
  pagination.value.offset = 0 // Reset to first page on filter change
  fetchApis()
}

const handleSortChange = (order: string) => {
  filters.value.sort_order = order as 'asc' | 'desc'
  fetchApis()
}

const navigateToApiDetail = (api: Api) => {
  router.push({
    name: '/(cms)/platform/[id]',
    params: { id: api.id.toString() },
  })
}

const getMethodColor = (method: string) => {
  switch (method) {
    case 'GET':
      return 'bg-blue-100 text-blue-800'
    case 'POST':
      return 'bg-green-100 text-green-800'
    case 'PUT':
      return 'bg-yellow-100 text-yellow-800'
    case 'DELETE':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

onMounted(() => {
  accessToken.value = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY) || ''
  fetchApis()
})
</script>

<template>
  <Container>
    <ContainerInner>
      <PageHeader :title="m.just_vivid_rat_explore()" />
    </ContainerInner>

    <!-- API List Section -->
    <ContainerInner :size="12" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API List</CardTitle>
        </CardHeader>
        <CardContent>
          <!-- Filters and Search -->
          <div class="mb-6 flex flex-col justify-between gap-4 md:flex-row">
            <div class="flex flex-wrap gap-4">
              <SelectBoxes
                :options="methodOptions"
                :selected="filters.method"
                @change="handleMethodChange"
                label="Method"
              />
              <SelectBoxes
                :options="sortOptions"
                :selected="filters.sort_order"
                @change="handleSortChange"
                label="Sort"
              />
            </div>
            <Search
              v-model="searchTerm"
              placeholder="Search APIs..."
              @search="handleSearch"
              class="max-w-xs"
            />
          </div>

          <!-- API Table -->
          <div class="rounded-md border">
            <Table :data="apis" :fields="['Name', 'Endpoint', 'Method', 'Version', 'Description']">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="api in apis"
                  :key="api.id"
                  class="cursor-pointer hover:bg-gray-50"
                  @click="navigateToApiDetail(api)"
                >
                  <TableCell class="font-medium">{{ api.name }}</TableCell>
                  <TableCell>{{ api.endpoint }}</TableCell>
                  <TableCell>
                    <Badge :class="getMethodColor(api.method)">
                      {{ api.method }}
                    </Badge>
                  </TableCell>
                  <TableCell>{{ api.version }}</TableCell>
                  <TableCell class="max-w-xs truncate text-sm">{{ api.description }}</TableCell>
                </TableRow>
                <TableRow v-if="apis.length === 0">
                  <TableCell colspan="5" class="h-32 text-center">
                    <div v-if="loading">Loading APIs...</div>
                    <div v-else>No APIs found</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Pagination -->
          <div class="mt-6 flex justify-center">
            <Pagination
              :total="totalApis"
              :current-page="Math.floor(pagination.offset / pagination.limit) + 1"
              :per-page="pagination.limit"
              @page-change="handlePageChange"
            />
          </div>
        </CardContent>
      </Card>
    </ContainerInner>
  </Container>
</template>
