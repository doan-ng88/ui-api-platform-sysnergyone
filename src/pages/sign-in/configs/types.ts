export interface OnSignInSuccessProps {
	code: string;
	email: string;
	session_id: string;
}

export interface VerifyF2AStoreProps {
	props: {
		email: string;
		sessionId: number;
	};
}
