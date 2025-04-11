import {
	type CommonResponse,
	PATH_SECURITY_TWO_STEP_SYNERGY_ONE,
} from "@/shared/config";
import { publicHttp } from "../../http/public-http";
import { responsePostProcess } from "../../libs/response-post-process";
import { KEY_REQUEST } from "./constants";
import type {
	CreateNewPasswordBodyRequest,
	CreateNewPasswordProps,
} from "./types";

export const createNewPassword = async (props: CreateNewPasswordProps) => {
	const bodyRequest = extractBodyRequest(props);

	const data = await apiCreateNewPassword(bodyRequest);

	const dataProcced = responsePostProcess(data);

	return dataProcced;
};

const extractBodyRequest = (props: CreateNewPasswordProps) => {
	const body: CreateNewPasswordBodyRequest = {
		companyCode: props.companyCode,
		email: props.email,
		keyRequest: KEY_REQUEST,
		password: props.password,
		otpVerify: props.otpVerify,
	};

	return body;
};

const apiCreateNewPassword = async (
	body: CreateNewPasswordBodyRequest,
): Promise<CommonResponse<boolean>> => {
	const path = `${PATH_SECURITY_TWO_STEP_SYNERGY_ONE}/create-new-password`;

	const res = await publicHttp.post(path, body);

	return res.data;
};
