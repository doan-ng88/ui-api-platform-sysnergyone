import type { GetAccessTokenPermission } from "@/shared/api/http/private-http/types";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import {
	ACCESS_TOKEN_KEY,
	TOKENS_STORE_NAME,
	type TokensStoreState,
} from "../configs";
import { decodeToken } from "../libs";

export const useTokensStore = defineStore(TOKENS_STORE_NAME, {
	state: (): TokensStoreState => ({
		accessTokenGet: Cookies.get(ACCESS_TOKEN_KEY),
		accessTokenSet: undefined,
	}),
	actions: {
		/**
		 * Set access token
		 * @param props - access token and permission
		 */
		setTokens(accessToken: string, permission: GetAccessTokenPermission) {
			if (permission === "GET") {
				this.accessTokenGet = accessToken;
				Cookies.set(ACCESS_TOKEN_KEY, accessToken);
			}
			if (permission === "SET") {
				this.accessTokenSet = accessToken;
			}
		},
		getToken(type: GetAccessTokenPermission) {
			// Get "set" token
			if (type === "SET") {
				// If "set" token is not set, return undefined
				if (!this.accessTokenSet) {
					return undefined;
				}
				// Validate "set" token
				const validatedToken = this.validateToken(this.accessTokenSet);
				// If "set" token is expired, return undefined
				if (!validatedToken) {
					return undefined;
				}
				return this.accessTokenSet;
			}

			// Get "get" token
			if (!this.accessTokenGet) {
				return undefined;
			}
			// Validate "get" token
			const validatedToken = this.validateToken(this.accessTokenGet);
			// If "get" token is expired, return undefined
			if (!validatedToken) {
				return undefined;
			}
			return this.accessTokenGet;
		},
		validateToken(token: string) {
			// Decode token
			const decodedToken = decodeToken(token);
			// If token is expired, return undefined
			if (decodedToken.isExpired) {
				return undefined;
			}
			// Return decoded token
			return decodedToken;
		},
		reset() {
			Cookies.remove(ACCESS_TOKEN_KEY);
			this.$reset();
		},
	},
});
