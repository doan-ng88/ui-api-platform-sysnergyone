import {
	type CommonResponse,
	PATH_INFLUENCER_MANAGEMENT,
} from "@/shared/config";

import { createPrivateHttp } from "@/shared/api/http/private-http";
import { responsePostProcess } from "../../libs/response-post-process";
import { useUserDetailsStore } from "../../models/user-details";
import type { UploadImageProps } from "./types";

// Get user details
export const uploadImage = async (props: UploadImageProps) => {
	const useUserDetails = useUserDetailsStore();
	if (!useUserDetails.code) {
		return;
	}

	const form = new FormData();
	form.append("image", props.image);
	form.append("userCode", useUserDetails.code);

	const data = await apiUploadImage(form);

	const dataProcced = responsePostProcess(data);

	return dataProcced;
};

const apiUploadImage = async (
	body: FormData,
): Promise<CommonResponse<string>> => {
	const path = `${PATH_INFLUENCER_MANAGEMENT}/upload-image`;

	const http = await createPrivateHttp({ permission: "SET" });

	const res = await http.post(path, body, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return res.data;
};
