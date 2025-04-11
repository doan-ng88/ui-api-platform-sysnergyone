import { convertToNumber } from "../convert-to-number";

export const timeStampToDate = (
	timeStamp: number | string | undefined,
): Date | undefined => {
	if (timeStamp === undefined) {
		return undefined;
	}

	if (typeof timeStamp === "string") {
		const timeStampNumber = convertToNumber({
			defaultNumber: undefined,
			number: timeStamp,
		});

		if (timeStampNumber === undefined) {
			return undefined;
		}

		const exactTimeStamp = timeStampNumber * 1000;
		return new Date(exactTimeStamp);
	}
	const exactTimeStamp = timeStamp * 1000;
	return new Date(exactTimeStamp);
};
