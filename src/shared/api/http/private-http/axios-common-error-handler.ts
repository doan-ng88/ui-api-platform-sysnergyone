import { toast } from "@/shared/ui/toast";
import * as m from "@i18n/messages";

export const handleCommonErrorResponse = (errorMessage?: string) => {
	const isCommonError = handleErrors([handleDuplicateEntry], errorMessage);

	if (!isCommonError) {
		return;
	}

	toast.error(isCommonError);
};

const duplicateEntryRegex = new RegExp(/Duplicate entry '(.+?)'/);

export const handleDuplicateEntry = (errorMessage?: string) => {
	if (!errorMessage) {
		return;
	}

	if (errorMessage.includes("Error 1062")) {
		// Extract the duplicate entry from the error message
		const duplicateEntryMatch = errorMessage.match(duplicateEntryRegex);
		const duplicateEntry = duplicateEntryMatch
			? duplicateEntryMatch[1]
			: "the provided entry";

		return m.polite_helpful_octopus_aspire({
			duplicateEntry,
		});
	}
};

const handleErrors = (
	errors: ((errorMessage: string) => string | undefined)[],
	errorMessage?: string,
) => {
	if (!errorMessage) {
		return;
	}

	for (const error of errors) {
		const errorResponse = error(errorMessage);
		if (errorResponse) {
			return errorResponse;
		}
	}
};
