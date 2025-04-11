import { PATH_API_PLATFORM } from "@/shared/config";
import queryString from "query-string";
import { publicHttp } from "../../http/public-http";
import type { ApiListQueryParams, ApiListResponse } from "./types";

export const getPlatformApis = async (params: ApiListQueryParams) => {
	const queryParamsString = queryString.stringify(params);
	const data = await apiGetPlatformApis(queryParamsString);

	return data.data;
};

const apiGetPlatformApis = async (
	queryParamsString: string,
): Promise<ApiListResponse> => {
	const path = `${PATH_API_PLATFORM}?${queryParamsString}`;

	const res = await publicHttp.get(path);

	return res.data;
};
