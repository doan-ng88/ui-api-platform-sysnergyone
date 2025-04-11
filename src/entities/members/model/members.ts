import type { UserData } from "@/shared/api/endpoints/get-details-user/types";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { MEMBERS_STORE_NAME } from "../configs";

export const useMembersStore = defineStore(MEMBERS_STORE_NAME, {
	state: () => ({
		members: reactive<UserData[]>([]),
	}),
});
