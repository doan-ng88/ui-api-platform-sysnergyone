import type { CommonResponse } from "@/shared/config";

export const responsePostProcess = <T>(
	data: CommonResponse<T>,
): T | undefined => {
	if (data.data === null) {
		return undefined;
	}

	return data.data;
};
