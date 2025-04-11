import { isStringPositiveNumber } from "../is-string-positive-number";
import type { ConvertNumberProps } from "./types";

export const convertToNumber = <T>(props: ConvertNumberProps<T>) => {
	const { defaultNumber, number } = props;
	if (typeof number === "number") {
		return number;
	}

	// Check empty
	if (number === "" || number === undefined || number === null) {
		return defaultNumber as T;
	}

	// Check positive number
	if (!isStringPositiveNumber(number)) {
		return defaultNumber as T;
	}

	return Number.parseInt(number);
};
