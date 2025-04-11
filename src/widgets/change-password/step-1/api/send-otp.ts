import { sendMailOtp } from "@/shared/api/endpoints/send-mail-otp";
import type { APISendOtpProps } from "../configs/types";

export const apiSendOtp = async (props: APISendOtpProps) => {
	const res = await sendMailOtp(props);

	return res;
};
