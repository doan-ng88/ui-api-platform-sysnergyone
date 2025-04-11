<script setup lang="ts">
import { FormControl } from '@/shared/ui/form-control'
import { Input } from '@/shared/ui/input'
import { InputToggle } from '@/shared/ui/input-toggle'
import { SelectMultiple } from '@/shared/ui/select-multiple'
import { Textarea } from '@/shared/ui/textarea'
import * as m from '@i18n/messages'
import { useFilterOptionsStore } from '@/shared/api/models/filters'
import { onMounted, ref } from 'vue'
import { Select } from '@/shared/ui/select'
import LucideX from '~icons/lucide/x'
import { PATH_IMAGE } from '@/shared/config'
import { Button } from '@/shared/ui/button'

const props = defineProps<{
  avatarUrl?: string
  isLoading?: boolean
}>()

const name = defineModel<string>('name')
const phone = defineModel<string>('phone')
const notes = defineModel<string>('notes')
const collaborationStatus = defineModel<boolean>('collaborationStatus')
const address = defineModel<string>('address')
const influencerCategories = defineModel<string[]>('influencerCategories')
const influencerType = defineModel<string>('influencerType')
const filterOptionsStore = useFilterOptionsStore()
const avatarFile = defineModel<File>('avatarFile')

const newAvatarUrl = ref<string>()

const onSelectAvatar = (files: FileList | null) => {
  if (files !== null) {
    avatarFile.value = files[0]
    newAvatarUrl.value = URL.createObjectURL(files[0])
  }
}

const onRemoveAvatar = () => {
  avatarFile.value = undefined
  newAvatarUrl.value = undefined
}

onMounted(() => {
  filterOptionsStore.fetchFilters(['categories', 'typeInfluencers'])
})
</script>

<template>
  <div class="grid grid-cols-3 gap-x-4">
    <FormControl
      :label="m.legal_whole_butterfly_promise({ name: m.polite_heavy_crocodile_mend() })"
      required
    >
      <Input
        v-model="name"
        required
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.legal_whole_butterfly_promise({ name: m.polite_heavy_crocodile_mend() }),
          })
        "
        autocomplete="name"
        :disabled="props.isLoading"
      />
    </FormControl>
    <FormControl :label="m.quaint_civil_hyena_attend()" required>
      <Input
        v-model="phone"
        required
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.quaint_civil_hyena_attend(),
          })
        "
        autocomplete="tel"
        :disabled="props.isLoading"
      />
    </FormControl>
    <FormControl :label="m.grand_proof_trout_advise()" required>
      <Select
        :options="filterOptionsStore.filters.typeInfluencers"
        v-model="influencerType"
        :placeholder="
          m.salty_bad_antelope_ascend({
            name: m.grand_proof_trout_advise(),
          })
        "
        required
        :disabled="props.isLoading"
      />
    </FormControl>
  </div>

  <FormControl :label="m.long_orange_trout_slide()">
    <Input
      v-model="address"
      :placeholder="
        m.deft_suave_jellyfish_pop({
          name: m.long_orange_trout_slide(),
        })
      "
      autocomplete="street-address"
      :disabled="props.isLoading"
    />
  </FormControl>
  <div class="grid grid-cols-3 gap-x-4 py-3">
    <InputToggle
      :label="m.formal_zany_wren_peek()"
      v-model="collaborationStatus"
      :disabled="props.isLoading"
    />
  </div>

  <FormControl :label="m.close_arable_kangaroo_kick()" as-div>
    <SelectMultiple
      :options="filterOptionsStore.filters.categories"
      v-model="influencerCategories"
      :placeholder="
        m.salty_bad_antelope_ascend({
          name: m.close_arable_kangaroo_kick(),
        })
      "
      :disabled="props.isLoading"
    />
  </FormControl>

  <div class="space-y-2">
    <FormControl :label="m.calm_left_cobra_cuddle()">
      <Input
        :disabled="props.isLoading"
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.calm_left_cobra_cuddle(),
          })
        "
        type="file"
        @file-change="onSelectAvatar"
        accept="image/*"
      />
    </FormControl>
    <div class="relative h-56" v-if="newAvatarUrl || props.avatarUrl">
      <img :src="newAvatarUrl ?? `${PATH_IMAGE}${props.avatarUrl}`" class="h-full object-contain" />
      <Button
        icon-only
        :icon="LucideX"
        class="absolute top-2 right-2"
        @click="onRemoveAvatar"
        :disabled="props.isLoading"
      />
    </div>
  </div>
  <FormControl :label="m.neat_safe_cobra_bask()">
    <Textarea
      v-model="notes"
      :placeholder="
        m.deft_suave_jellyfish_pop({
          name: m.neat_safe_cobra_bask(),
        })
      "
      :disabled="props.isLoading"
    />
  </FormControl>
</template>
