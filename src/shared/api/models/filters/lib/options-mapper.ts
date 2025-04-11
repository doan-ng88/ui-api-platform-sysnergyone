import type { GetFilterOptions_Name } from "@/shared/api/endpoints/get-filter-options";
import type { FiltersName } from "../configs/types";

export const mapOptions = (options: FiltersName[]): GetFilterOptions_Name[] => {
	return options.map((option) => {
		switch (option) {
			case "categories":
				return "Categories";
			case "platforms":
				return "Platforms";
			case "typeInfluencers":
				return "TypeInfluencers";

			// this is a fallback, just in case
			default:
				return "Categories";
		}
	});
};
