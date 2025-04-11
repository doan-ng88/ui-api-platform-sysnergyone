<script lang="ts" setup>
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { InputCurrency } from '@/shared/ui/input-currency'
import { Table } from '@/shared/ui/table'
import * as m from '@i18n/messages'
import LucidePlus from '~icons/lucide/plus'
import LucideTrash2 from '~icons/lucide/trash-2'
import type { Product } from '../configs/types'

const props = defineProps<{
  isLoading?: boolean
}>()

const products = defineModel<Product[]>('products')

const emit = defineEmits<{
  (e: 'addProduct'): void
  (e: 'removeProduct', idx: number): void
}>()

const onAddProduct = () => {
  emit('addProduct')
}

const onRemoveProduct = (idx: number) => {
  emit('removeProduct', idx)
}
</script>

<template>
  <h2 class="capitalize-first text-sm font-semibold">
    {{ m.nice_ago_squirrel_amuse() }}
  </h2>
  <Table
    :data="products"
    :fields="['sku', 'price', 'quantity', 'actions']"
    :headers="{
      sku: m.bright_male_meerkat_renew(),
      price: m.smart_pretty_ant_persist(),
      quantity: m.brave_inner_macaw_enrich(),
      actions: '',
    }"
  >
    <template #sku="{ data }">
      <Input
        required
        v-model="data.sku"
        class="w-full"
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.bright_male_meerkat_renew(),
          })
        "
        :disabled="props.isLoading"
      >
        <template #prefix> # </template>
      </Input>
    </template>

    <template #quantity="{ data }">
      <Input
        v-model="data.quantity"
        class="w-full"
        required
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.brave_inner_macaw_enrich(),
          })
        "
        :disabled="props.isLoading"
        type="number"
      />
    </template>

    <template #price="{ data }">
      <InputCurrency
        v-model="data.price"
        class="w-full"
        required
        :placeholder="
          m.deft_suave_jellyfish_pop({
            name: m.smart_pretty_ant_persist(),
          })
        "
        :disabled="props.isLoading"
      />
    </template>

    <template #actions="{ idx }">
      <div class="flex justify-end gap-x-1">
        <Button
          color="error"
          :icon="LucideTrash2"
          icon-only
          :disabled="props.isLoading"
          @click="() => onRemoveProduct(idx)"
        />
      </div>
    </template>
  </Table>

  <Button
    color="primary"
    :icon="LucidePlus"
    type="button"
    :tooltip="m.left_tiny_cowfish_slurp({ name: m.nice_ago_squirrel_amuse() })"
    :disabled="props.isLoading"
    @click="onAddProduct"
  >
    {{ m.nice_ago_squirrel_amuse() }}
  </Button>
</template>
