<script setup lang="ts">
import { FormControl } from '@/shared/ui/form-control'
import { Input } from '@/shared/ui/input'
import { InputDatetimePicker } from '@/shared/ui/input-datetime-picker'
import { Select } from '@/shared/ui/select'
import { Textarea } from '@/shared/ui/textarea'
import * as m from '@i18n/messages'
import { useConfigsStore } from '../models/configs'
import { SelectMultiple } from '@/shared/ui/select-multiple'
import { useFilterOptionsStore } from '@/shared/api/models/filters'
import { onMounted, ref } from 'vue'
import { Button } from '@/shared/ui/button'
import LucideX from '~icons/lucide/x'
import { PATH_IMAGE } from '@/shared/config'

const props = defineProps<{
  isLoading?: boolean
  urlThumbnail?: string
}>()

const name = defineModel<string>('name')
const thumbnailImage = defineModel<File>('thumbnailImage')
const urlSocialMediaContent = defineModel<string>('urlSocialMediaContent')
const releaseDate = defineModel<string>('releaseDate')
const platform = defineModel<string>('platform')
const categoryIds = defineModel<string[]>('categoryIds')
const influencerIds = defineModel<string[]>('influencerIds')
const totaLike = defineModel<number>('totalLike')
const totalLove = defineModel<number>('totalLove')
const totalShare = defineModel<number>('totalShare')
const totalComment = defineModel<number>('totalComment')
const note = defineModel<string>('note')

const newThumbnailUrl = ref<string>()

const { influencerOptions, isFetchingInfluencerOptions, onSearchInfluencer } = useConfigsStore()

const filterOptionsStore = useFilterOptionsStore()

onMounted(() => {
  filterOptionsStore.fetchFilters(['categories', 'platforms'])
})

const onSelectThumbnail = (files: FileList | null) => {
  if (files !== null) {
    thumbnailImage.value = files[0]
    newThumbnailUrl.value = URL.createObjectURL(files[0])
  }
}

const onRemoveThumbnail = () => {
  thumbnailImage.value = undefined
  newThumbnailUrl.value = undefined
}
</script>

<template>
  <FormControl
    :label="m.legal_whole_butterfly_promise({ name: m.minor_mild_guppy_hurl() })"
    required
  >
    <Input
      v-model="name"
      required
      :disabled="props.isLoading"
      :placeholder="
        m.deft_suave_jellyfish_pop({
          name: m.legal_whole_butterfly_promise({ name: m.minor_mild_guppy_hurl() }),
        })
      "
    />
  </FormControl>
  <div class="space-y-2">
    <FormControl :label="m.witty_short_wren_dig()">
      <Input
        :disabled="props.isLoading"
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.witty_short_wren_dig(),
          })
        "
        type="file"
        @file-change="onSelectThumbnail"
        accept="image/*"
      />
    </FormControl>
    <div class="relative h-56" v-if="newThumbnailUrl || props.urlThumbnail">
      <img
        :src="newThumbnailUrl ?? `${PATH_IMAGE}${props.urlThumbnail}`"
        class="h-full object-contain"
      />
      <Button icon-only :icon="LucideX" class="absolute top-2 right-2" @click="onRemoveThumbnail" />
    </div>
  </div>
  <FormControl :label="m.awful_white_mink_clasp()">
    <Input
      v-model="urlSocialMediaContent"
      :disabled="props.isLoading"
      :placeholder="
        m.deft_suave_jellyfish_pop({
          name: m.awful_white_mink_clasp(),
        })
      "
      pattern="https://.*"
      type="url"
    />
  </FormControl>
  <FormControl :label="m.neat_safe_cobra_bask()">
    <Textarea
      v-model="note"
      :disabled="props.isLoading"
      :placeholder="
        m.deft_suave_jellyfish_pop({
          name: m.neat_safe_cobra_bask(),
        })
      "
    />
  </FormControl>
  <FormControl :label="m.close_arable_kangaroo_kick()" as-div>
    <SelectMultiple
      v-model="categoryIds"
      :options="filterOptionsStore.filters.categories"
      :disabled="props.isLoading"
      :placeholder="
        m.salty_bad_antelope_ascend({
          name: m.close_arable_kangaroo_kick(),
        })
      "
    />
  </FormControl>

  <FormControl :label="m.tame_whole_crow_peel()" as-div>
    <SelectMultiple
      v-model="influencerIds"
      :options="influencerOptions"
      :disabled="props.isLoading"
      :placeholder="
        m.salty_bad_antelope_ascend({
          name: m.tame_whole_crow_peel(),
        })
      "
      @input="onSearchInfluencer"
      :loading="isFetchingInfluencerOptions"
    />
  </FormControl>
  <div class="grid grid-cols-3 gap-2">
    <FormControl :label="m.bold_inner_hornet_bask()">
      <InputDatetimePicker
        v-model="releaseDate"
        :disabled="props.isLoading"
        :placeholder="
          m.salty_bad_antelope_ascend({
            name: m.bold_inner_hornet_bask(),
          })
        "
      />
    </FormControl>

    <FormControl :label="m.aqua_away_deer_pout()">
      <Select
        v-model="platform"
        :options="filterOptionsStore.filters.platforms"
        :disabled="props.isLoading"
        :placeholder="
          m.salty_bad_antelope_ascend({
            name: m.aqua_away_deer_pout(),
          })
        "
      />
    </FormControl>
    <FormControl :label="m.icy_stout_ray_arise({ name: m.key_ago_jannes_zoom() })">
      <Input
        v-model="totaLike"
        :disabled="props.isLoading"
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.icy_stout_ray_arise({ name: m.key_ago_jannes_zoom() }),
          })
        "
        type="number"
      />
    </FormControl>
    <FormControl :label="m.icy_stout_ray_arise({ name: m.elegant_awful_alpaca_amaze() })">
      <Input
        v-model="totalLove"
        :disabled="props.isLoading"
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.icy_stout_ray_arise({ name: m.elegant_awful_alpaca_amaze() }),
          })
        "
        type="number"
      />
    </FormControl>
    <FormControl :label="m.icy_stout_ray_arise({ name: m.raw_real_flamingo_pave() })">
      <Input
        v-model="totalComment"
        :disabled="props.isLoading"
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.icy_stout_ray_arise({ name: m.raw_real_flamingo_pave() }),
          })
        "
        type="number"
      />
    </FormControl>
    <FormControl :label="m.icy_stout_ray_arise({ name: m.sour_wacky_crow_cry() })">
      <Input
        v-model="totalShare"
        :disabled="props.isLoading"
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.icy_stout_ray_arise({ name: m.sour_wacky_crow_cry() }),
          })
        "
        type="number"
      />
    </FormControl>
  </div>
</template>
