export interface CreateNewPasswordBodyRequest {
	email: string;
	password: string;
	companyCode: string;
	otpVerify: string;
	keyRequest: string;
}

export interface CreateNewPasswordProps {
	email: string;
	password: string;
	companyCode: string;
	otpVerify: string;
}
