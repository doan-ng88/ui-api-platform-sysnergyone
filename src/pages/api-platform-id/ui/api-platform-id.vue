<script setup lang="ts">
import { Container, ContainerInner } from '@/shared/ui/container'
import { PageHeader } from '@/shared/ui/page-header'
import { onMounted, ref } from 'vue'
import { toast } from '@/shared/ui/toast'
import { Card, CardInner } from '@/shared/ui/card'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import type { ApiGetApiId } from '../configs/types'
import { apiGetApiId, type ApiGetApiProps } from '../api/get-api-id'
import { Badge } from '@/shared/ui/badge'
import { Table } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Dialog } from '@/shared/ui/dialog'

const route = useRoute('/(cms)/platform/[id]')
const loading = ref(false)
const api = ref<ApiGetApiId | null>(null)

const fetchApiById = async () => {
  try {
    loading.value = true

    const params: ApiGetApiProps = {
      id: route.params.id,
    }

    const data = await apiGetApiId(params)
    api.value = data
  } catch (error) {
    toast.error('Failed to fetch API details')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const getMethodColor = (method: string) => {
  switch (method.toUpperCase()) {
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

const onSendRequest = (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement)

  for (const param of api.value?.parameters || []) {
    console.log(formData.get(param.name))
  }
}

onMounted(() => {
  fetchApiById()
})

onBeforeRouteUpdate(() => {
  fetchApiById()
})
</script>

<template>
  <Container>
    <ContainerInner>
      <PageHeader :title="api?.name || 'API Details'" :description="api?.description">
        <template #title-suffix>
          <Badge :class="getMethodColor(api?.method || '')">{{ api?.method }}</Badge>
        </template>
      </PageHeader>
    </ContainerInner>
  </Container>
  <Container>
    <ContainerInner :size="12" class="space-y-6">
      <!-- API Details Section -->
      <Card v-if="!loading && api">
        <CardInner class="space-y-6">
          <div class="flex justify-between gap-x-12">
            <div>
              <div class="mt-2 space-y-2">
                <div><span class="font-semibold">Endpoint:</span> {{ api.endpoint }}</div>
                <div><span class="font-semibold">Version:</span> {{ api.version }}</div>
                <div><span class="font-semibold">Platform:</span> {{ api.platform_name }}</div>
                <div>
                  <span class="font-semibold">Created:</span>
                  {{ new Date(api.created_at).toLocaleString() }}
                </div>
                <div>
                  <span class="font-semibold">Last Updated:</span>
                  {{ new Date(api.updated_at).toLocaleString() }}
                </div>
              </div>
            </div>
            <div>
              <Dialog>
                <template #trigger>
                  <Button color="primary">Send request</Button>
                </template>
                <form @submit.prevent="onSendRequest">
                  <Table
                    :data="api.parameters"
                    :fields="['key', 'value']"
                    :cells="
                      (param) => ({
                        key: param.name,
                      })
                    "
                  >
                    <template #value="{ data }">
                      <input :type="data.type" :name="data.name" :required="data.required" />
                    </template>
                  </Table>
                  <Button type="submit">Send</Button>
                </form>
              </Dialog>
            </div>
          </div>
          <!-- Parameters Table -->
          <div v-if="api.parameters && api.parameters.length > 0">
            <h3 class="text-lg font-semibold">Parameters</h3>
            <Table
              :data="api.parameters"
              :fields="['name', 'type', 'required', 'description', 'action']"
              :cells="
                (param) => ({
                  name: param.name,
                  type: param.type,
                  required: param.required,
                  description: param.description,
                  example: param.example,
                })
              "
            >
              <!-- <template #action="{ data }">
              <Button @click="() => {}">{{ data.name }}</Button>
            </template> -->
            </Table>
          </div>
        </CardInner>
      </Card>

      <!-- Loading State -->
      <!-- <Card v-if="loading">
        <CardHeader>
          <Skeleton class="h-8 w-[200px]" />
          <div class="space-y-3">
            <Skeleton class="h-4 w-[300px]" />
            <Skeleton class="h-4 w-[250px]" />
            <Skeleton class="h-4 w-[200px]" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
          </div>
        </CardContent>
      </Card> -->
    </ContainerInner>
  </Container>
</template>
