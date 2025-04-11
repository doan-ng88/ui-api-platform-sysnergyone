import {
	CAMPAIGN_ID_KEY,
	CAMPAIGN_NAME_KEY,
	type CommonPaginationResponse,
	type CommonResponse,
	ENABLED_KEY,
	END_DATE_KEY,
	PATH_INFLUENCER_MANAGEMENT,
	START_DATE_KEY,
} from "@/shared/config";
import { createPrivateHttp } from "../../http/private-http";
import {
	type CreateParamsRequest_Get,
	createParamsRequest,
} from "../../libs/create-params-request";
import { responsePostProcess } from "../../libs/response-post-process";
import type { GetCampaignsBodyRequest } from "./types";
import type { Campaign } from "./types";

export const getCampaigns = async (props?: GetCampaignsBodyRequest) => {
	const params = extractParams(props);

	const data = await apiGetCampaigns(params);

	const dataProcced = responsePostProcess(data);
	// const dataProcced = await getMockCampaigns();

	return {
		data: dataProcced,
		totalCount: data.total_count,
	};
};

const extractParams = (props?: GetCampaignsBodyRequest) => {
	const params = createParamsRequest(
		"get",
		[
			{
				Key: CAMPAIGN_ID_KEY,
				Value: props?.campaignId,
			},
			{
				Key: CAMPAIGN_NAME_KEY,
				Value: props?.campaignName,
			},
			{
				Key: START_DATE_KEY,
				Value: props?.startDate,
			},
			{
				Key: END_DATE_KEY,
				Value: props?.endDate,
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

const apiGetCampaigns = async (
	body: CreateParamsRequest_Get,
): Promise<CommonResponse<Campaign[]> & CommonPaginationResponse> => {
	const path = `${PATH_INFLUENCER_MANAGEMENT}/get-campains`;

	const http = await createPrivateHttp({ permission: "GET" });

	const res = await http.post(path, body);

	return res.data;
};
