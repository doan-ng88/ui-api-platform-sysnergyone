export interface LoginProps {
	email: string;
	password: string;
}

export interface LoginBodyRequest {
	email: string;
	password: string;
}

interface LoginDataResponse_User {
	user_id: number; // Unique identifier for the user
	full_name: string; // Full name of the user
	email: string; // Email address of the user
	phone: string; // Phone number of the user
	department_id: number; // Identifier for the department
	department_name: string; // Name of the department
	position_id: number; // Identifier for the position
	position_name: string; // Name of the position
	status: "ACTIVE" | "INACTIVE"; // Status of the user, assuming only these two states
	two_factor_enabled: boolean; // Indicates if two-factor authentication is enabled
}

export interface LoginDataResponse {
	user: LoginDataResponse_User; // User information
	access_token: string; // Access token for authentication
	refresh_token: string; // Refresh token for renewing the session
	session_id: number; // Unique identifier for the session
	two_factor_required: boolean; // Indicates if two-factor authentication is required
	is_trusted_device: boolean; // Indicates if the device is trusted
}
