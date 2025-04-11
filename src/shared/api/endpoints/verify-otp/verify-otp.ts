import { PATH_SECURITY_TWO_STEP_SYNERGY_ONE } from "@/shared/config";
import { HttpStatusCode } from "axios";
import { publicHttp } from "../../http/public-http";
import type { GetVerifyOtpProps } from "./types";

// Call this to verify OTP
const apiGetVerifyOtp = async (props: GetVerifyOtpProps) => {
	const path = `${PATH_SECURITY_TWO_STEP_SYNERGY_ONE}/verify-otp?otp=${props.otp}&code=${props.code}`;

	const res = await publicHttp.get(path);

	return res;
};

export const getVerifyOtp = async (props: GetVerifyOtpProps) => {
	const res = await apiGetVerifyOtp(props);

	if (res.status === HttpStatusCode.Ok) {
		return true;
	}

	return false;
};
