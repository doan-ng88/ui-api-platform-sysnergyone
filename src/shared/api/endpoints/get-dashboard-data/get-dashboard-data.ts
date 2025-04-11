import {
	type CommonResponse,
	OPTION_KEY,
	PATH_ORDER_MANAGEMENT,
} from "@/shared/config";
import { createPrivateHttp } from "../../http/private-http";
import {
	type CreateParamsRequest_Get,
	createParamsRequest,
} from "../../libs/create-params-request";
import { responsePostProcess } from "../../libs/response-post-process";
import type {
	GetDashboardDataBodyRequest,
	GetDashboardDataResponse,
} from "./types";

// Get user details
export const getDashboardData = async (props: GetDashboardDataBodyRequest) => {
	const body = extractBodyRequest(props);

	const data = await apiGetDashboardData(body);

	const dataProcced = responsePostProcess(data);

	return dataProcced;
};

const extractBodyRequest = (
	props: GetDashboardDataBodyRequest,
): CreateParamsRequest_Get => {
	const body = createParamsRequest(
		"get",
		[
			{
				Key: OPTION_KEY,
				Value: props.dashboard?.option ?? props.orderManagement?.option,
			},
		],
		{
			listOpiton: [
				...(props.dashboard?.listOption ?? []),
				...(props.orderManagement?.listOption ?? []),
			],
		},
	);

	return body;
};

// Get user details
const apiGetDashboardData = async (
	body: CreateParamsRequest_Get,
): Promise<CommonResponse<GetDashboardDataResponse[]>> => {
	const path = `${PATH_ORDER_MANAGEMENT}/get-dashboard-data`;

	const http = await createPrivateHttp({ permission: "GET" });

	const res = await http.post(path, body);

	return res.data;
};
