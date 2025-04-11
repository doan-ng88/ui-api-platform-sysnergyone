import type { CommonResponse } from "@/shared/config";
import { sleep } from "../sleep";

export const mockCommonResponse = async <T>(
	data: T,
): Promise<CommonResponse<T>> => {
	await sleep(500);
	return {
		data,
		message: "",
		suggestion: "",
		status: "",
	};
};
