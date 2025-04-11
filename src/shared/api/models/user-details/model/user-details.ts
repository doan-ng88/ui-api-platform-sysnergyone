import {
	EMAIL_KEY,
	USER_CODE_KEY,
	USER_ID_KEY,
	VERIFY_F2A_LOCAL_STORAGE_KEY,
} from "@/shared/config";
import { toast } from "@/shared/ui/toast";
import * as m from "@i18n/messages";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { apiCheckUserInfo, apiGetIpAndDevice } from "../api";
import {
	USER_DETAILS_STORE_NAME,
	type UserDetailsStoreSaveProps,
	type UserDetailsStoreSetUserDetailsProps,
	type UserDetailsStoreState,
} from "../configs";

export const useUserDetailsStore = defineStore(USER_DETAILS_STORE_NAME, {
	state: (): UserDetailsStoreState => ({
		ip: undefined,
		device: undefined,
		email: localStorage.getItem(EMAIL_KEY) || undefined,
		id: Cookies.get(USER_ID_KEY),
		code: Cookies.get(USER_CODE_KEY),
	}),
	getters: {
		/**
		 * Check if user details are available
		 * @returns User details availability
		 */
		isUserDetailsAvailable: (state) => {
			if (state.ip !== undefined && state.device !== undefined) {
				return true;
			}
			return false;
		},
		/**
		 * Get current user details
		 * @returns User details
		 */
		currentUserDetails: (state) => {
			if (state.email && state.id && state.code) {
				return {
					email: state.email,
					id: state.id,
					code: state.code,
				};
			}
			return undefined;
		},
		/**
		 * Get current user details
		 * @returns User details
		 */
		currentUserIPAndDevice: (state) => {
			if (state.ip !== undefined && state.device !== undefined) {
				return {
					ip: state.ip,
					device: state.device,
				};
			}
			return undefined;
		},
	},
	actions: {
		reset() {
			Cookies.remove(USER_ID_KEY);
			Cookies.remove(USER_CODE_KEY);
			localStorage.removeItem(EMAIL_KEY);
			localStorage.removeItem(VERIFY_F2A_LOCAL_STORAGE_KEY);
			this.$reset();
		},

		setUserDetails(props: UserDetailsStoreSetUserDetailsProps) {
			this.email = props.email;
			this.id = props.userId;
			this.code = props.userCode;
			Cookies.set(USER_ID_KEY, props.userId);
			Cookies.set(USER_CODE_KEY, props.userCode);
			localStorage.setItem(EMAIL_KEY, props.email);
		},

		/**
		 * Get user token details
		 * @returns User ID and user code
		 */
		getUserTokenDetails(strict?: boolean) {
			if (this.id && this.code) {
				return {
					id: this.id,
					code: this.code,
				};
			}

			if (strict) {
				toast.error(m.just_caring_husky_flow());

				this.reset();

				const router = useRouter();

				router.push({ name: "/auth/sign-in" });
			}

			return undefined;
		},

		/**
		 * Get latest user details, IP and device
		 * @returns User details, IP and device
		 */
		async getLatestUserDetails() {
			if (!this.currentUserDetails) {
				return;
			}

			// If user details are already available, return them
			if (this.currentUserIPAndDevice) {
				return {
					...this.currentUserDetails,
					...this.currentUserIPAndDevice,
				};
			}

			// Check if user is available and get user details
			const [isUserAvailable, userDetails] = await Promise.all([
				this._checkUserInfo(),
				this._getLatestIpAndDevice(),
			]);

			// If user is not available, return
			if (!(userDetails && isUserAvailable)) {
				return;
			}

			// Assign user details to store
			this._saveIpAndDevice({
				device: userDetails.device,
				ip: userDetails.ip,
			});

			return {
				...this.currentUserDetails,
				...userDetails,
			};
		},

		/**
		 * Save user details to store
		 * @param props User details
		 */
		_saveIpAndDevice(props: UserDetailsStoreSaveProps) {
			this.device = props.device;
			this.ip = props.ip;
		},

		/**
		 * This is a private action
		 *
		 * Get IP and device from API
		 * @returns IP and device
		 */
		async _getIpAndDevice() {
			try {
				const res = await apiGetIpAndDevice();
				return res;
				// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
			} catch (_e) {}
		},

		/**
		 * This is a private action
		 *
		 * Check if user is available
		 * @returns User availability
		 */
		async _checkUserInfo() {
			if (!this.id) {
				return false;
			}

			try {
				const res = await apiCheckUserInfo({ userId: this.id });
				return !!res;
			} catch (_e) {
				return false;
			}
		},

		/**
		 * This is a private action
		 *
		 * Get IP and device
		 * @returns IP and device
		 */
		async _getLatestIpAndDevice() {
			const ipAndDevice = await this._getIpAndDevice();

			const ip = ipAndDevice?.ip;

			if (!(ipAndDevice && ip)) {
				return;
			}

			return { ...ipAndDevice, ip };
		},
	},
});
