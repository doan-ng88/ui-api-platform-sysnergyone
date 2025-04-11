<script setup lang="ts">
import { FileUpload, useFileUpload } from '@ark-ui/vue/file-upload'
import * as m from '@i18n/messages'
import type { FileMimeType } from './types'
import LucideCloudUpload from '~icons/lucide/cloud-upload'

interface Props {
  maxFiles?: number
  accept?: FileMimeType[]
  acceptType?: string[]
}

interface Emits {
  (e: 'upload', details: File[]): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

const fileUpload = useFileUpload({
  maxFiles: props.maxFiles,
  accept: props.accept,
  onFileAccept(details) {
    emits('upload', details.files)
  },
})
</script>

<template>
  <FileUpload.RootProvider :value="fileUpload">
    <FileUpload.Dropzone class="card card-bordered border-base-content border-4 border-dashed">
      <div class="flex flex-col items-center gap-y-2 p-8 text-center">
        <LucideCloudUpload class="size-10" />
        <FileUpload.Label>{{ m.flat_mad_jay_earn() }}</FileUpload.Label>
        <p
          v-if="props.acceptType && props.acceptType.length > 0"
          class="text-base-content/50 text-sm"
        >
          {{ props.acceptType.join(', ') }}
        </p>
        <FileUpload.Trigger class="btn btn-primary">
          {{ m.actual_free_hawk_fulfill() }}
        </FileUpload.Trigger>
      </div>
    </FileUpload.Dropzone>

    <FileUpload.HiddenInput />
  </FileUpload.RootProvider>
</template>
