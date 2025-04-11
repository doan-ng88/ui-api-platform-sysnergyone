<script setup lang="ts" generic="F extends string">
import * as m from '@i18n/messages'
import type { EmptyProps } from '../configs'

type Props = EmptyProps<F>

const props = defineProps<Props>()
</script>

<template>
  <tbody>
    <tr>
      <td :colspan="props.fields.length">
        <slot>{{ m.quick_busy_mallard_blink() }}</slot>
      </td>
    </tr>
  </tbody>
</template>
