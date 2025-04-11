import { type CommonResponse, PATH_SETUP_LOGIN } from "@/shared/config";
import { publicHttp } from "../../http/public-http";
import type {
	SignInResponse,
	VerifyPasswordBodyRequest,
	VerifyUserProps,
} from "./types";

// Verify user
export const signIn = async (props: VerifyUserProps) => {
	const body = extractBodyRequest(props);

	const data = await apiSetSignIn(body);

	if (!data.data) {
		return;
	}

	return {
		data: data.data,
	};
};

const extractBodyRequest = (
	props: VerifyUserProps,
): VerifyPasswordBodyRequest => {
	return {
		password: props.password,
		email: props.email,
	};
};

const apiSetSignIn = async (
	payload: VerifyPasswordBodyRequest,
): Promise<CommonResponse<SignInResponse>> => {
	const path = `${PATH_SETUP_LOGIN}/login`;

	const res = await publicHttp.post(path, payload);

	return res.data;
};
