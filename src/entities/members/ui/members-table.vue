<script setup lang="ts">
import { Table } from '@/shared/ui/table'
import { useMembersStore } from '../model'
import * as m from '@i18n/messages'

interface Props {
  isLoading: boolean
}

const props = defineProps<Props>()

const membersStore = useMembersStore()
</script>

<template>
  <Table
    :loading="props.isLoading"
    :data="membersStore.members"
    :fields="[
      'fullName',
      'email',
      'phoneNumber',
      'departmentName',
      'roleName',
      'allowCreateEdit',
      'isActive',
      'actionButton',
    ]"
    :cells="
      (member) => ({
        fullName: member.fullName,
        email: member.email,
        phoneNumber: member.phoneNumber,
        departmentName: member.departmentName,
        roleName: member.userAppAccess?.[0]?.userAppRole?.[0]?.roleName,
      })
    "
    :headers="{
      fullName: m.small_equal_turtle_reside(),
      email: m.tough_orange_bullock_peek(),
      phoneNumber: m.quaint_civil_hyena_attend(),
      departmentName: m.dirty_round_skunk_agree(),
      roleName: m.tough_tidy_sawfish_pinch(),
      allowCreateEdit: m.close_chunky_scallop_affirm(),
      isActive: m.weird_royal_tern_belong(),
      actionButton: '',
    }"
  >
    <template #allowCreateEdit="slotProps">
      <slot name="allow-create-edit" :data="slotProps.data" />
    </template>
    <template #isActive="slotProps">
      <slot name="is-active" :data="slotProps.data" />
    </template>
    <template #actionButton="slotProps">
      <slot name="action-button" :data="slotProps.data" />
    </template>
  </Table>
</template>
