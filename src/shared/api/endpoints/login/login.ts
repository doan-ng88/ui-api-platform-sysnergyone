import { type CommonResponse, PATH_SETUP_LOGIN } from "@/shared/config";
import { publicHttp } from "../../http/public-http";
import type { LoginBodyRequest, LoginDataResponse, LoginProps } from "./types";

// Verify user
export const login = async (props: LoginProps) => {
	const body = extractBodyRequest(props);

	const data = await apiLogin(body);

	return data;
};

const extractBodyRequest = (props: LoginProps): LoginBodyRequest => {
	return {
		password: props.password,
		email: props.email,
	};
};

const apiLogin = async (
	props: LoginBodyRequest,
): Promise<CommonResponse<LoginDataResponse>> => {
	const path = `${PATH_SETUP_LOGIN}/login`;

	const res = await publicHttp.post(path, props);

	return res.data;
};
