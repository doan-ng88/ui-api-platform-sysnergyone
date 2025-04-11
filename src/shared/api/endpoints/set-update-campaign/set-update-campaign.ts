import {
	type CommonResponse,
	PATH_INFLUENCER_MANAGEMENT,
} from "@/shared/config";

import { createPrivateHttp } from "@/shared/api/http/private-http";
import { responsePostProcess } from "../../libs/response-post-process";
import { useUserDetailsStore } from "../../models/user-details";
import type { SetUpdateCampaignProps } from "./types";

// Get user details
export const setUpdateCampaign = async (props: SetUpdateCampaignProps) => {
	const data = await apiSetUpdateCampaign(props);

	const dataProcced = responsePostProcess(data);

	return dataProcced;
};

const apiSetUpdateCampaign = async (
	body: SetUpdateCampaignProps,
): Promise<CommonResponse<number>> => {
	const path = `${PATH_INFLUENCER_MANAGEMENT}/set-update-campaign`;

	const http = await createPrivateHttp({ permission: "SET" });

	const useUserDetails = useUserDetailsStore();

	const extraBody = {
		...body,
		userCode: useUserDetails.code,
	};

	const res = await http.post(path, extraBody);

	return res.data;
};
