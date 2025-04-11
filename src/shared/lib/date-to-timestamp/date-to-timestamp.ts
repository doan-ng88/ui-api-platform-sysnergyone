export const dateToTimeStamp = (
	date: Date | string | undefined,
): string | undefined => {
	if (date === undefined) {
		return undefined;
	}
	if (typeof date === "string") {
		return (Date.parse(date) / 1000).toString();
	}

	return (date.getTime() / 1000).toString();
};
