import {
	type CommonResponse,
	PATH_INFLUENCER_MANAGEMENT,
} from "@/shared/config";

import { createPrivateHttp } from "@/shared/api/http/private-http";
import { responsePostProcess } from "../../libs/response-post-process";
import { useUserDetailsStore } from "../../models/user-details";
import type { SetUpdateContentUpdateProps } from "./types";

// Get user details
export const setUpdateContent = async (props: SetUpdateContentUpdateProps) => {
	const data = await apiSetUpdateContent(props);

	const dataProcced = responsePostProcess(data);

	return dataProcced;
};

const apiSetUpdateContent = async (
	body: SetUpdateContentUpdateProps,
): Promise<CommonResponse<number>> => {
	const path = `${PATH_INFLUENCER_MANAGEMENT}/set-update-content`;

	const http = await createPrivateHttp({ permission: "SET" });

	const useUserDetails = useUserDetailsStore();

	const extraBody = {
		...body,
		userCode: useUserDetails.code,
	};

	const res = await http.post(path, extraBody);

	return res.data;
};
