import {
	CONTENT_ID_KEY,
	CONTENT_NAME_KEY,
	type CommonPaginationResponse,
	type CommonResponse,
	ENABLED_KEY,
	PATH_INFLUENCER_MANAGEMENT,
} from "@/shared/config";
import { createPrivateHttp } from "../../http/private-http";
import {
	type CreateParamsRequest_Get,
	createParamsRequest,
} from "../../libs/create-params-request";
import { responsePostProcess } from "../../libs/response-post-process";
import type { Content, GetContentBodyRequest } from "./types";

export const getContent = async (props?: GetContentBodyRequest) => {
	const params = extractParams(props);

	const data = await apiGetContent(params);

	const dataProcced = responsePostProcess(data);
	// const dataProcced = await getMockContent();

	return {
		data: dataProcced,
		totalCount: data.total_count,
	};
};

const extractParams = (props?: GetContentBodyRequest) => {
	const params = createParamsRequest(
		"get",
		[
			{
				Key: CONTENT_ID_KEY,
				Value: props?.contentID,
			},
			{
				Key: CONTENT_NAME_KEY,
				Value: props?.contentName,
			},

			{
				Key: ENABLED_KEY,
				Value: props?.enabled,
			},
		],
		{
			pageIndex: props?.pageIndex,
			pageSize: props?.pageSize,
		},
	);

	return params;
};

// Get user details
const apiGetContent = async (
	body: CreateParamsRequest_Get,
): Promise<CommonResponse<Content[]> & CommonPaginationResponse> => {
	const path = `${PATH_INFLUENCER_MANAGEMENT}/get-content`;

	const http = await createPrivateHttp({ permission: "GET" });

	const res = await http.post(path, body);

	return res.data;
};
