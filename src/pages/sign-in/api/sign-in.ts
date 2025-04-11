import { login } from "@/shared/api/endpoints/login";

export interface APISignInProps {
	email: string;
	password: string;
}

export const apiSignIn = async (props: APISignInProps) => {
	const res = await login({
		password: props.password,
		email: props.email,
	});

	return res;
};
