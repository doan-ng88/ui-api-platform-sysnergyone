import { getUserDetails } from "@/shared/api/endpoints/get-details-user";
import type { APIGetUserDetailsProps } from "../configs";

export const apiGetUserDetails = async (props: APIGetUserDetailsProps) => {
	const res = await getUserDetails({
		code: props.code,
		userId: props.id,
	});

	return res;
};
