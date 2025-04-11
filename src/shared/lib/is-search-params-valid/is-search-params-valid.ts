import type { CommonPaginationSearchParams } from "@/shared/config";
import type { UrlParams } from "@vueuse/core";

export interface IsSearchParamsValidOpts {
	/**
	 * This option is for exclude pagination special keys
	 * @default true
	 */
	excludePaginationParams?: boolean;
	/**
	 * This option is for exclude keys
	 * @default []
	 */
	excludeKeys?: string[];
}

/**
 * This function is for checking search params is valid for some senario like:
 *
 * + Open filters
 *
 * @param searchParams UrlParams
 * @param opts IsSearchParamsValidOpts
 * @returns boolean
 */
export const isSearchParamsValid = <T extends UrlParams>(
	searchParams: T,
	opts?: IsSearchParamsValidOpts,
) => {
	const { excludePaginationParams = true } = opts || {};
	for (const [key, value] of Object.entries(searchParams)) {
		if (opts?.excludeKeys?.includes(key)) {
			continue;
		}

		if (excludePaginationParams && handleExcludePaginationParams(key)) {
			continue;
		}

		if (value) {
			return true;
		}
	}
	return false;
};

/**
 * This function is required for handle exclude pagination special keys
 * @param key CommonPaginationSearchParams
 * @returns boolean
 */
const handleExcludePaginationParams = (
	key: keyof CommonPaginationSearchParams | string,
) => {
	switch (key) {
		case "pageIndex":
			return true;
		case "pageSize":
			return true;
		default:
			return false;
	}
};
