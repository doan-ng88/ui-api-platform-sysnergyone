import { getToken } from "@/shared/api/endpoints/get-token";
import type { ApiGetAccessTokenProps } from "./types";

export const apiGetAccessToken = async (props: ApiGetAccessTokenProps) => {
	const res = await getToken({
		userId: props.userId,
		ip: props.ip,
		permission: props.permission,
		device: props.device,
	});

	return res;
};
