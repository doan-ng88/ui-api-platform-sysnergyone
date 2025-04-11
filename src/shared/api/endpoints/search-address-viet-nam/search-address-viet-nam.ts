import {
	type CommonResponse,
	DISTRICT_CODE,
	PATH_ORDER_MANAGEMENT,
	PROVINCE_CODE,
} from "@/shared/config";
import { createPrivateHttp } from "../../http/private-http";
import {
	type CreateParamsRequest_Get,
	createParamsRequest,
} from "../../libs/create-params-request";
import { responsePostProcess } from "../../libs/response-post-process";
import type { SearchAddressVietNamBodyRequest } from "./types";

// Get user details
export const getSearchAddressVietNam = async (
	props: SearchAddressVietNamBodyRequest,
) => {
	const body = extractBodyRequest(props);

	const res = await apiSearchAddressVietNam(body);

	const dataProcced = responsePostProcess(res);

	return dataProcced;
};

const extractBodyRequest = (props: SearchAddressVietNamBodyRequest) => {
	const params = createParamsRequest(
		"get",
		[
			{
				Key: PROVINCE_CODE,
				Value: props.provinceCode,
			},
			{
				Key: DISTRICT_CODE,
				Value: props.districtCode,
			},
		],
		{
			pageSize: props.pageSize,
		},
	);

	return params;
};

// Get user details
export const apiSearchAddressVietNam = async (
	body: CreateParamsRequest_Get,
): Promise<CommonResponse<Location[]>> => {
	const path = `${PATH_ORDER_MANAGEMENT}/search-address-viet-nam`;

	const http = await createPrivateHttp({ permission: "GET" });

	const res = await http.post(path, body);

	return res.data;
};
