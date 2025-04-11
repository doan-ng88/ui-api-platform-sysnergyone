import { PATH_SECURITY_TWO_STEP_SYNERGY_ONE } from "@/shared/config";
import { HttpStatusCode } from "axios";
import { publicHttp } from "../../http/public-http";
import type { GetSaveInformationUserProps } from "./types";

// Call this to save user information
export const getSaveInformationUser = async (
	props: GetSaveInformationUserProps,
) => {
	const res = await apiGetSaveInformationUser(props);

	if (res.status === HttpStatusCode.Ok) {
		return true;
	}

	return false;
};

const apiGetSaveInformationUser = async (
	props: GetSaveInformationUserProps,
) => {
	const path = `${PATH_SECURITY_TWO_STEP_SYNERGY_ONE}/save-information-user?user_id=${props.userId}&code=${props.code}&otp=${props.otp}`;

	const res = await publicHttp.get(path);

	return res;
};
