<script setup lang="ts">
import LucidePlus from '~icons/lucide/plus'
import { useModal } from '../model/modal'
import * as m from '@i18n/messages'
import { Dialog } from '@/shared/ui/dialog'

const modal = useModal()
</script>

<template>
  <button class="btn btn-primary btn-sm" @click="modal.showModal">
    {{ m.neat_awful_eagle_create() }} <LucidePlus />
  </button>
  <Dialog
    v-model:open="modal.visible"
    :title="m.loose_crazy_fireant_engage()"
    :description="m.hour_fuzzy_kestrel_wave()"
  >
    <div class="card-actions justify-end">
      <Dialog.CloseTrigger class="btn btn-primary btn-sm">
        {{ m.loud_aware_shark_peel() }}
      </Dialog.CloseTrigger>
    </div>
  </Dialog>
</template>
