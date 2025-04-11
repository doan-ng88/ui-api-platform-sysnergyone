export interface VerifyF2AProps {
	code: string;
	email: string;
	session_id: number;
}

export interface VerifyF2AResponse {
	access_token: string; // Access token for authentication
	refresh_token: string; // Refresh token for renewing the session
}
