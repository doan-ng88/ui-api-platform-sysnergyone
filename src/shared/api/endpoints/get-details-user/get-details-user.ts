import {
	type CommonResponse,
	PATH_ORDER_USER_MANAGEMENT,
	USER_CODE_KEY,
	USER_ID_KEY,
} from "@/shared/config";
import { createPrivateHttp } from "../../http/private-http";
import {
	type CreateParamsRequest_Get,
	createParamsRequest,
} from "../../libs/create-params-request";
import { responsePostProcess } from "../../libs/response-post-process";
import type { GetUserDetailsProps, UserData } from "./types";

// Get user details
export const getUserDetails = async (props: GetUserDetailsProps) => {
	const body = extractBodyRequest(props);

	const data = await apiGetDetailUser(body);

	const dataProcced = responsePostProcess(data);

	return dataProcced;
};

const extractBodyRequest = (props: GetUserDetailsProps) => {
	const body = createParamsRequest("get", [
		{
			Key: USER_CODE_KEY,
			Value: props.code,
		},
		{
			Key: USER_ID_KEY,
			Value: props.userId,
		},
	]);

	return body;
};

// Get user details
const apiGetDetailUser = async (
	body: CreateParamsRequest_Get,
): Promise<CommonResponse<UserData[]>> => {
	const path = `${PATH_ORDER_USER_MANAGEMENT}/get-user-information-detail`;

	const http = await createPrivateHttp({ permission: "GET" });

	const res = await http.post(path, body);

	return res.data;
};
