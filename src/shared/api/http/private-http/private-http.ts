import { useTokensStore } from "../../models/tokens/model/tokens";
import { useUserDetailsStore } from "../../models/user-details";
import { apiGetAccessToken } from "./get-access-token";
import { http } from "./http";
import type { CreatePrivateHttpProps, GetAccessTokenPermission } from "./types";

export const createPrivateHttp = async (props: CreatePrivateHttpProps) => {
	if (!props) {
		return http;
	}

	// Get access token on every request to server
	const accessToken = await getAccessToken(props.permission);

	// Set access token to axios header
	if (accessToken) {
		http.defaults.headers.Authorization = `Bearer ${accessToken}`;
	} else {
		http.defaults.headers.Authorization = "";
	}

	return http;
};

const getAccessToken = async (permission: GetAccessTokenPermission) => {
	const userDetailsStore = useUserDetailsStore();

	const tokensStore = useTokensStore();

	const device = userDetailsStore.device;
	const ip = userDetailsStore.ip;
	const userId = userDetailsStore.id;

	if (!(device && ip && userId)) {
		return undefined;
	}

	const currentToken = tokensStore.getToken(permission);

	if (currentToken) {
		return currentToken;
	}

	const newAccessToken = await apiGetAccessToken({
		permission,
		userId,
		ip,
		device,
	});

	if (!newAccessToken) {
		return undefined;
	}

	tokensStore.setTokens(newAccessToken, permission);

	return newAccessToken;
};
