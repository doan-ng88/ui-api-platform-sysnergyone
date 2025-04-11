import { globalEnv } from "@/shared/lib/env";
import { toast } from "@/shared/ui/toast";
import axios from "axios";
export interface APIRegisterProps {
	email: string;
	password: string;
	full_name: string;
	phone: string;
	department_id?: number;
	position_id?: number;
}

export interface RegisterResponse {
	status: string;
	message: string;
	data: {
		user_id: number;
		email: string;
		two_factor: {
			secret: string;
			qr_code: string;
		};
		verification_deadline: string;
		confirmation_endpoint: string;
	};
}

export const apiRegister = async (props: APIRegisterProps) => {
	try {
		const res = await axios.post<RegisterResponse>(
			`${globalEnv.API_URL}/api/central-login/auth/register`,
			{
				email: props.email,
				password: props.password,
				full_name: props.full_name,
				phone: props.phone,
				department_id: 12, // Hardcode department_id là 12
				position_id: 1, // Hardcode position_id là 1
			},
			{
				baseURL: globalEnv.API_URL,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		if (res.status === 200 && res.data) {
			return res.data;
		}

		return null;
	} catch (error) {
		toast.error(`Registration error: ${error}`);
		throw error;
	}
};
