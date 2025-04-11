import {
	type CommonPaginationResponse,
	type CommonResponse,
	PATH_ORDER_MANAGEMENT,
	SEARCH_VALUE_KEY,
	SYSTEM_LOG_ID_KEY,
} from "@/shared/config";
import { createPrivateHttp } from "../../http/private-http";
import {
	type CreateParamsRequest_Get,
	createParamsRequest,
} from "../../libs/create-params-request";
import { responsePostProcess } from "../../libs/response-post-process";
import type { GetLogBodyRequest, GetLogResponse } from "./types";

// Get user details
export const getLog = async (props: GetLogBodyRequest) => {
	const body = extractBodyRequest(props);

	const data = await apiGetLog(body);

	const dataProcced = responsePostProcess(data);

	return dataProcced;
};

const extractBodyRequest = (props: GetLogBodyRequest) => {
	const body = createParamsRequest(
		"get",
		[
			{
				Key: SEARCH_VALUE_KEY,
				Value: props.searchValue,
			},
			{
				Key: SYSTEM_LOG_ID_KEY,
				Value: props.systemLogId,
			},
		],
		{
			pageIndex: props.pageIndex,
			pageSize: props.pageSize,
			startTime: props.startTime,
			endTime: props.endTime,
		},
	);
	return body;
};

// Get user details
const apiGetLog = async (
	body: CreateParamsRequest_Get,
): Promise<CommonResponse<GetLogResponse[]> & CommonPaginationResponse> => {
	const path = `${PATH_ORDER_MANAGEMENT}/get-log`;

	const http = await createPrivateHttp({ permission: "GET" });

	const res = await http.post(path, body);

	return res.data;
};
