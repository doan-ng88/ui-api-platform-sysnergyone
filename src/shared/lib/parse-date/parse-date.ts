import { format } from "date-fns";
import { isValidTimestamp } from "../typeof";
import type { ParseDateBackendOptions } from "./types";

export const parseDate = (
	date?: Date | string | number,
	opts?: ParseDateBackendOptions,
) => {
	if (!date) {
		return;
	}

	let backendDate: string;

	if (typeof date === "string" && isValidTimestamp(date)) {
		const dateNumber = Number(date) * 1000;
		backendDate = format(
			dateNumber,
			opts?.format ?? (opts?.dateOnly ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm:ss"),
		);
	} else {
		backendDate = format(
			date,
			opts?.format ?? (opts?.dateOnly ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm:ss"),
		);
	}

	return backendDate;
};
