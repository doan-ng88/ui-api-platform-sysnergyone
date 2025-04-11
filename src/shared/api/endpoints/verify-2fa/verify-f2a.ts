import { type CommonResponse, PATH_SETUP_LOGIN } from "@/shared/config";
import { publicHttp } from "../../http/public-http";
import type { VerifyF2AProps, VerifyF2AResponse } from "./types";

export const verifyF2A = async (props: VerifyF2AProps) => {
	const data = await apiVerifyF2A(props);

	return data;
};

const apiVerifyF2A = async (
	props: VerifyF2AProps,
): Promise<CommonResponse<VerifyF2AResponse>> => {
	const path = `${PATH_SETUP_LOGIN}/verify-2fa`;

	const res = await publicHttp.post(path, props);

	return res.data;
};
