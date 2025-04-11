import { checkInformationUser } from "@/shared/api/endpoints/check-information-user";
import type { APICheckUserInfoProps } from "../configs";

export const apiCheckUserInfo = async (props: APICheckUserInfoProps) => {
	const res = await checkInformationUser({ userId: props.userId });

	return res;
};
