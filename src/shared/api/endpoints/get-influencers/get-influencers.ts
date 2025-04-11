import {
	COLLABORATION_STATUS_KEY,
	CONTENT_CATEGORY_ID_KEY,
	type CommonPaginationResponse,
	type CommonResponse,
	ENABLED_KEY,
	FULL_NAME_KEY,
	INFLUENCER_ID_KEY,
	PATH_INFLUENCER_MANAGEMENT,
	PHONE_KEY,
} from "@/shared/config";
import { createPrivateHttp } from "../../http/private-http";
import {
	type CreateParamsRequest_Get,
	createParamsRequest,
} from "../../libs/create-params-request";
import { responsePostProcess } from "../../libs/response-post-process";
import type { GetInfluencersBodyRequest, Influencer } from "./types";

export const getInfluencers = async (props?: GetInfluencersBodyRequest) => {
	const params = extractParams(props);

	const data = await apiGetInfluencers(params);

	const dataProcced = responsePostProcess(data);

	return {
		data: dataProcced,
		totalCount: data.total_count,
	};
};

const extractParams = (props?: GetInfluencersBodyRequest) => {
	const params = createParamsRequest(
		"get",
		[
			{
				Key: INFLUENCER_ID_KEY,
				Value: props?.influencerId,
			},
			{
				Key: FULL_NAME_KEY,
				Value: props?.fullName,
			},
			{
				Key: PHONE_KEY,
				Value: props?.phone,
			},
			{
				Key: CONTENT_CATEGORY_ID_KEY,
				Value: props?.contentCategoryId,
			},
			{
				Key: COLLABORATION_STATUS_KEY,
				Value: props?.collaborationStatus,
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
const apiGetInfluencers = async (
	body: CreateParamsRequest_Get,
): Promise<CommonResponse<Influencer[]> & CommonPaginationResponse> => {
	const path = `${PATH_INFLUENCER_MANAGEMENT}/get-influencers`;

	const http = await createPrivateHttp({ permission: "GET" });

	const res = await http.post(path, body);

	return res.data;
};
