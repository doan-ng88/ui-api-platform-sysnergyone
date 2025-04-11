<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Select } from '@/shared/ui/select'
import { Table } from '@/shared/ui/table'
import * as m from '@i18n/messages'
import LucidePlus from '~icons/lucide/plus'
import LucideTrash2 from '~icons/lucide/trash-2'
import type { SocialMedia } from '../configs/types'
import { useFilterOptionsStore } from '@/shared/api/models/filters'
import { onMounted } from 'vue'

const props = defineProps<{
  isLoading?: boolean
}>()

const emits = defineEmits<{
  (e: 'remove', value: number): void
  (e: 'add'): void
  (e: 'toggle-primary', value: number): void
}>()

const onRemove = (index: number) => {
  emits('remove', index)
}

const onAdd = () => {
  emits('add')
}

const onTogglePrimary = (active: boolean, index: number) => {
  // ! Because this function is called before state is updated,
  // so if this toggle is called, that means the state still old value,
  // so we need to check the old state, not new state
  if (active) {
    return
  }
  emits('toggle-primary', index)
}

const socialMedia = defineModel<SocialMedia[]>('socialMedia')

const filterOptionsStore = useFilterOptionsStore()

onMounted(() => {
  filterOptionsStore.fetchFilters(['platforms'])
})
</script>

<template>
  <h2 class="capitalize-first text-sm font-semibold">
    {{ m.patient_real_gazelle_shine() }}
  </h2>
  <Table
    :data="socialMedia"
    :fields="['socialMedia', 'username', 'followers', 'url', 'primary', 'actions']"
    :headers="{
      socialMedia: m.legal_whole_butterfly_promise({
        name: m.patient_real_gazelle_shine(),
      }),
      username: m.icy_proof_dove_mend(),
      followers: m.neat_heroic_fox_type(),
      primary: m.fit_fresh_pony_hack(),
      url: m.sad_raw_wallaby_ask({ name: m.patient_real_gazelle_shine() }),
      actions: '',
    }"
  >
    <template #socialMedia="{ data }">
      <Select
        :options="filterOptionsStore.filters.platforms"
        v-model="data.socialMedia"
        required
        :placeholder="
          m.salty_bad_antelope_ascend({
            name: m.legal_whole_butterfly_promise({
              name: m.patient_real_gazelle_shine(),
            }),
          })
        "
        :disabled="props.isLoading"
      />
    </template>
    <template #primary="{ data, idx }">
      <Input
        type="checkbox"
        class="checked:checkbox-primary"
        v-model="data.primary"
        @change="() => onTogglePrimary(data.primary, idx)"
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.icy_proof_dove_mend(),
          })
        "
        :disabled="props.isLoading"
      />
    </template>
    <template #username="{ data }">
      <Input
        v-model="data.username"
        class="w-full"
        required
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.icy_proof_dove_mend(),
          })
        "
        :disabled="props.isLoading"
      />
    </template>
    <template #followers="{ data }">
      <Input
        v-model="data.followers"
        class="w-full"
        required
        type="number"
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.neat_heroic_fox_type(),
          })
        "
        :disabled="props.isLoading"
      />
    </template>
    <template #url="{ data }">
      <Input
        v-model="data.url"
        class="w-full"
        pattern="https://.*"
        type="url"
        required
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.sad_raw_wallaby_ask({ name: m.patient_real_gazelle_shine() }),
          })
        "
        :disabled="props.isLoading"
      />
    </template>
    <template #actions="{ idx }">
      <Button
        :icon="LucideTrash2"
        color="error"
        type="button"
        icon-only
        @click="() => onRemove(idx)"
        :tooltip="m.funny_active_puma_cry({ name: m.patient_real_gazelle_shine() })"
        :disabled="props.isLoading"
      />
    </template>
  </Table>
  <Button
    color="primary"
    type="button"
    :icon="LucidePlus"
    @click="onAdd"
    :disabled="props.isLoading"
  >
    {{ m.left_tiny_cowfish_slurp({ name: m.patient_real_gazelle_shine() }) }}
  </Button>
</template>
