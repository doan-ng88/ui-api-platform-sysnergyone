import { PATH_SECURITY_TWO_STEP_SYNERGY_ONE } from "@/shared/config";
import { publicHttp } from "../../http/public-http";
import type { GetSendMailOtpProps } from "./types";

export const sendMailOtp = async (props: GetSendMailOtpProps) => {
	const res = await apiGetSendMailOtp(props);

	return res;
};
// Send OTP
const apiGetSendMailOtp = async (props: GetSendMailOtpProps) => {
	const path = `${PATH_SECURITY_TWO_STEP_SYNERGY_ONE}/sent-mail-otp?_email=${props.email}&_code=${props.code}`;

	const res = await publicHttp.get(path);

	return res;
};
