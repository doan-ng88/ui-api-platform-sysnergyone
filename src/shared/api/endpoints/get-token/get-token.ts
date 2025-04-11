import type { CommonResponse } from "@/shared/config";
import { publicHttp } from "../../http/public-http";
import { responsePostProcess } from "../../libs/response-post-process";
import { GET_TOKEN_VALUE } from "./constants";
import type { GetTokenBodyRequest, GetTokenProps } from "./types";

// Get user details
export const getToken = async (props: GetTokenProps) => {
	const body = extractBodyRequest(props);

	const data = await apiGetToken(body);

	const dataProcced = responsePostProcess(data);

	return dataProcced;
};

const extractBodyRequest = (props: GetTokenProps): GetTokenBodyRequest => {
	return {
		key: GET_TOKEN_VALUE,
		permission: props.permission,
		user_id: props.userId,
		device: props.device,
		ip: props.ip,
	};
};

// Get user details
const apiGetToken = async (
	body: GetTokenBodyRequest,
): Promise<CommonResponse<string>> => {
	const path = "auth/get-token";

	const res = await publicHttp.post(path, body);

	return res.data;
};
