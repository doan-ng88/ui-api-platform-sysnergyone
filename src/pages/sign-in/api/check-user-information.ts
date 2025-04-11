import { checkInformationUser } from "@/shared/api/endpoints/check-information-user";

// Verify user
export const apiCheckUseInformation = async (userId: string | number) => {
	const res = await checkInformationUser({
		userId,
	});

	return res;
};
