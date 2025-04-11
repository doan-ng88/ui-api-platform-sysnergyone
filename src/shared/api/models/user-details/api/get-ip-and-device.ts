import { getIpClient } from "@/shared/api/endpoints/get-ip-client";

export const apiGetIpAndDevice = async () => {
	const res = await getIpClient();

	return res;
};
