import type { CommonResponse } from "@/shared/config";

export interface VerifyUserResponse extends CommonResponse<boolean> {
	userID: number;
	code: string;
}

export interface VerifyUserProps {
	email: string;
	password: string;
}

export interface VerifyPasswordBodyRequest {
	email: string;
	password: string;
}

interface User {
	user_id: number;
	full_name: string;
	email: string;
	phone: string;
	department_id: number;
	department_name: string;
	position_id: number;
	position_name: string;
	status: "ACTIVE" | "INACTIVE" | "PENDING" | string;
	two_factor_enabled: boolean;
}

export interface SignInResponse {
	status: string;
	message?: string;
	token?: string;
	user: User;
	expires_at?: string;
	refresh_token?: string;
}
