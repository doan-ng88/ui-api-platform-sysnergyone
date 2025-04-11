import type { SelectOptionProps } from "@/shared/ui/select";

export type FiltersName =
	| "categories"
	| "platforms"
	| "typeInfluencers"
	| "departments";

export interface FiltersStoreState {
	filters: Record<FiltersName, SelectOptionProps[]>;
	map: Record<FiltersName, Map<string, string>>;
}
