<script setup lang="ts">
import { Select } from '@ark-ui/vue'
import LucideChevronDown from '~icons/lucide/chevron-down'
import type { RowPerPageEmits, RowPerPageProps } from './types'
import { useRowPerPageStore } from './store'
import * as m from '@i18n/messages'

const props = defineProps<RowPerPageProps>()
const emits = defineEmits<RowPerPageEmits>()

const model = defineModel<number | string>()

const { select, collection } = useRowPerPageStore({ props, emits, model })
</script>

<template>
  <div class="flex items-center gap-x-2 text-sm">
    <span class="text-base-content/80 capitalize-first">
      {{ props.placeholder ?? m.big_full_ocelot_snip() }}
    </span>
    <Select.RootProvider :value="select">
      <Select.Control>
        <Select.Trigger
          class="input input-sm input-bordered flex w-full cursor-pointer items-center justify-between gap-x-2"
          :disabled="props.disabled"
        >
          <Select.ValueText
            :placeholder="props.placeholder ?? m.big_full_ocelot_snip()"
            class="capitalize-first"
          />
          <div class="flex items-center gap-x-2">
            <Select.Indicator>
              <LucideChevronDown />
            </Select.Indicator>
          </div>
        </Select.Trigger>
      </Select.Control>
      <Teleport to="body">
        <Select.Positioner>
          <Select.Content>
            <div class="card bg-base-100 min-w-[var(--reference-width)] shadow-lg">
              <Select.ItemGroup class="flex flex-col gap-y-2 p-2">
                <Select.Item
                  v-for="item in collection.items"
                  :key="item"
                  :item="item"
                  class="btn btn-ghost btn-sm btn-block data-[state=checked]:btn-disabled data-[state=checked]:bg-base-200 justify-start"
                >
                  <Select.ItemText>{{ item }}</Select.ItemText>
                </Select.Item>
              </Select.ItemGroup>
            </div>
          </Select.Content>
        </Select.Positioner>
      </Teleport>
      <Select.HiddenSelect />
    </Select.RootProvider>
  </div>
</template>
