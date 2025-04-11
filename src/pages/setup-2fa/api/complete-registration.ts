import { toast } from "@/shared/ui/toast";
import axios from "axios";
export interface APICompleteRegistrationProps {
	user_id: number;
	code: string;
	token: string;
}

export interface CompleteRegistrationResponse {
	status: string;
	message: string;
	data?: {
		user_id: number;
		email: string;
	};
}

export const apiCompleteRegistration = async (
	props: APICompleteRegistrationProps,
) => {
	try {
		const res = await axios.post<CompleteRegistrationResponse>(
			`/api/central-login/auth/complete-registration?token=${props.token}`,
			{
				user_id: props.user_id,
				code: props.code,
			},
			{
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
		toast.error(`Complete registration error: ${error}`);
		throw error;
	}
};
