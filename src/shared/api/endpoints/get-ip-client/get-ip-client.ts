import {
	type CommonResponse,
	PATH_SECURITY_TWO_STEP_SYNERGY_ONE,
} from "@/shared/config";
import { globalEnv } from "@/shared/lib/env";
import { publicHttp } from "../../http/public-http";
import { responsePostProcess } from "../../libs/response-post-process";

// Get user details
export const getIpClient = async () => {
	const data = await apiGetIpClient();

	const dataProcced = responsePostProcess(data);

	return {
		ip: dataProcced,
		// ? If the environment is development, use the public device name
		device: globalEnv.DEV ? globalEnv.DEVICE_NAME : data.device,
	};
};

// Get user details
const apiGetIpClient = async (): Promise<
	CommonResponse<string> & {
		device: string;
	}
> => {
	const path = `${PATH_SECURITY_TWO_STEP_SYNERGY_ONE}/get-ip-client`;

	const res = await publicHttp.get(path);

	return res.data;
};
