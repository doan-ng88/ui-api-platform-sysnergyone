<script setup lang="ts" generic="T extends object, F extends string">
import type { TableProps } from '../configs'
import Empty from './empty.vue'
import Loading from './loading.vue'

type Props = TableProps<T, F>

const props = defineProps<Props>()

type Slots = {
  [key in F]: ((_: { data: T; idx: number }) => unknown) | undefined
} & Record<`header-${F}`, void> & { 'empty-message': void }

const slots = defineSlots<Slots>()
</script>

<template>
  <div>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th
              v-for="field in props.fields"
              :key="field"
              :class="props.colOptions?.[field]?.thClassName"
              class="capitalize-first"
            >
              <span v-if="!slots[`header-${field}`]">{{ props.headers?.[field] ?? field }}</span>
              <slot :name="`header-${field}`" />
            </th>
          </tr>
        </thead>
        <tbody v-if="!props.loading && props.data?.length">
          <tr
            v-for="(val, idx) in props.data"
            :key="idx || props.dataKey?.(val)"
            class="hover:bg-base-200"
          >
            <td
              v-for="field in props.fields"
              :key="field"
              :class="props.colOptions?.[field]?.tdClassName"
            >
              {{ props.cells?.(val)[field] }}
              <slot :name="field" :data="val" :idx="idx" />
            </td>
          </tr>
        </tbody>
        <Empty v-if="!props.loading && !props.data?.length" :fields="props.fields">
          <slot name="empty-message" />
        </Empty>
      </table>
    </div>
    <Loading v-if="props.loading">
      <span v-if="props.loadingMessage">{{ props.loadingMessage }}</span>
    </Loading>
  </div>
</template>
