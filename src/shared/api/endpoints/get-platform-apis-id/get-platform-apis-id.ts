import { PATH_API_PLATFORM } from "@/shared/config";
import { publicHttp } from "../../http/public-http";
import type { ApiDetailResponse } from "./types";

export const getPlatformApisId = async (id: string | number) => {
	const data = await apiGetPlatformApisId(id);

	return data;
};

const apiGetPlatformApisId = async (
	id: string | number,
): Promise<ApiDetailResponse> => {
	const path = `${PATH_API_PLATFORM}/${id}`;

	const res = await publicHttp.get(path);

	return res.data;
};
