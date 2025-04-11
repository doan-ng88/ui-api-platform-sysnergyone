import { removeAccent } from "@/shared/lib/remove-accent";

export const trimAll = (str: string) => {
	const lowercaseRemovedAccent = removeAccent(str.toLowerCase());

	return lowercaseRemovedAccent.split(" ").join("").split("-").join("");
};
