import {
	type CommonResponse,
	PATH_SECURITY_TWO_STEP_SYNERGY_ONE,
} from "@/shared/config";
import { publicHttp } from "../../http/public-http";
import type { CheckInformationUserProps } from "./types";

export const checkInformationUser = async (
	props: CheckInformationUserProps,
) => {
	const data = await apiGetCheckInformationUser(props.userId);

	return data.data;
};

const apiGetCheckInformationUser = async (
	userId: string | number,
): Promise<CommonResponse<boolean>> => {
	const path = `${PATH_SECURITY_TWO_STEP_SYNERGY_ONE}/check-information-user?user_id=${userId}`;

	const res = await publicHttp.get(path);

	return res.data;
};
