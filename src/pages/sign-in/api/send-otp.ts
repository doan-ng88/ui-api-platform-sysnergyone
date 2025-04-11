import { sendMailOtp } from "@/shared/api/endpoints/send-mail-otp";

export interface APISendOtpProps {
	email: string;
	code: string;
}

export const apiSendOtp = async (props: APISendOtpProps) => {
	const res = await sendMailOtp(props);

	return res;
};
