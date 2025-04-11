import { verifyF2A } from "@/shared/api/endpoints/verify-2fa";

export interface APIVerifyF2AProps {
	code: string;
	email: string;
	sessionId: number;
}

export const apiVerifyF2A = async (props: APIVerifyF2AProps) => {
	const res = await verifyF2A({
		code: props.code,
		email: props.email,
		session_id: props.sessionId,
	});

	return res;
};
