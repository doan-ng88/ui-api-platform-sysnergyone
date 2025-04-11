import {
	type CommonResponse,
	OPTION_KEY,
	PATH_INFLUENCER_MANAGEMENT,
} from "@/shared/config";
import { createPrivateHttp } from "../../http/private-http";
import {
	type CreateParamsRequest_Get,
	createParamsRequest,
} from "../../libs/create-params-request";
import { responsePostProcess } from "../../libs/response-post-process";
import type {
	GetFilterOptionsBodyRequest,
	GetFilterOptionsResponse,
} from "./types";

export const getFilterOptions = async (props: GetFilterOptionsBodyRequest) => {
	const params = extractParams(props);

	const data = await apiGetFilterOption(params);

	const dataProcced = responsePostProcess(data);

	if (!dataProcced) {
		return;
	}

	// Filters at index 0
	return dataProcced[0];
};

const extractParams = (props: GetFilterOptionsBodyRequest) => {
	const params = createParamsRequest(
		"get",
		[
			{
				Key: OPTION_KEY,
				Value: props.option,
			},
		],
		{
			listOpiton: props.listOption,
		},
	);

	return params;
};

// Get user details
const apiGetFilterOption = async (
	body: CreateParamsRequest_Get,
): Promise<CommonResponse<GetFilterOptionsResponse[]>> => {
	const path = `${PATH_INFLUENCER_MANAGEMENT}/get-filter-option`;

	const http = await createPrivateHttp({ permission: "GET" });

	const res = await http.post(path, body);

	return res.data;
};
