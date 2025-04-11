import { defineStore } from "pinia";
import { apiGetUserDetails } from "../api";
import { USER_ACCESS_STORE_NAME } from "../configs";

type UserAccessStoreState = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	access: Record<any, any>[];
};

export const useUserAccessStore = defineStore(USER_ACCESS_STORE_NAME, {
	state: (): UserAccessStoreState => ({
		access: [],
	}),
	actions: {
		/**
		 * This is a private action
		 *
		 * Get user access from API
		 * @returns User access
		 */
		async getUserAccess(code: string, id: string) {
			if (!(code && id)) {
				return;
			}

			try {
				const res = await apiGetUserDetails({
					code,
					id,
				});
				if (res) {
					this.access = res;

					return res;
				}

				return undefined;
				// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
			} catch (_e) {}
		},
	},
});
