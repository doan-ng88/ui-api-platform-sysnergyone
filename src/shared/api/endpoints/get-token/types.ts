import type { GetAccessTokenPermission } from "../../http/private-http/types";

export interface GetTokenProps
	extends Pick<GetTokenBodyRequest, "ip" | "permission" | "device"> {
	userId: string;
}

export interface GetTokenBodyRequest {
	user_id: string;
	key: string;
	permission: GetAccessTokenPermission;
	device: string;
	ip: string;
}
