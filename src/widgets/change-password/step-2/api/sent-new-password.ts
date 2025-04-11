import { createNewPassword } from "@/shared/api/endpoints/create-new-password";
import type { ApiSendNewPasswordProps } from "../configs/types";

export const apiSendNewPassword = async (props: ApiSendNewPasswordProps) => {
	const res = await createNewPassword({
		email: props.email,
		password: props.password,
		companyCode: props.companyCode,
		otpVerify: props.otpVerify,
	});

	return res;
};
