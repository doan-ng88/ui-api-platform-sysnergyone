import type { FiltersName, FiltersStoreState } from "../configs/types";

export const validateLoadedFilters = (
	filters: FiltersName[],
	store: FiltersStoreState["filters"],
) => {
	return filters.every((filter) => {
		return store[filter].length > 0;
	});
};
