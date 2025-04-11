import {
	type GetFilterOptions_Category,
	type GetFilterOptions_Department,
	type GetFilterOptions_Platform,
	type GetFilterOptions_TypeInfluencer,
	getFilterOptions,
} from "@/shared/api/endpoints/get-filter-options";
import { defineStore } from "pinia";
import { FILTER_OPTIONS_STORE_NAME } from "../configs/constants";
import type { FiltersName, FiltersStoreState } from "../configs/types";
import { mapOptions } from "../lib/options-mapper";
import { validateLoadedFilters } from "../lib/validate-loaded-filters";

export const useFilterOptionsStore = defineStore(FILTER_OPTIONS_STORE_NAME, {
	state: (): FiltersStoreState => ({
		filters: {
			categories: [],
			platforms: [],
			typeInfluencers: [],
			departments: [],
		},
		map: {
			categories: new Map(),
			platforms: new Map(),
			typeInfluencers: new Map(),
			departments: new Map(),
		},
	}),
	actions: {
		async fetchFilters(options: FiltersName[]) {
			const isLoaded = validateLoadedFilters(options, this.filters);

			if (isLoaded) {
				return;
			}

			const data = await getFilterOptions({
				listOption: mapOptions(options),
			});

			if (!data) {
				return;
			}

			if (data.category) {
				this.applyFiltersCategories(data.category);
			}

			if (data.platform) {
				this.applyFiltersPlatforms(data.platform);
			}

			if (data.typeInfluencer) {
				this.applyFiltersTypeInfluencers(data.typeInfluencer);
			}

			if (data.department) {
				this.applyFiltersDepartments(data.department);
			}
		},

		applyFiltersCategories(data: GetFilterOptions_Category[]) {
			this.filters.categories = data.map((item) => ({
				label: item.categoryName,
				value: item.categoryID.toString(),
			}));

			this.map.categories = new Map(
				data.map((category) => [
					category.categoryID.toString(),
					category.categoryName,
				]),
			);
		},

		applyFiltersPlatforms(data: GetFilterOptions_Platform[]) {
			this.filters.platforms = data.map((item) => ({
				label: item.platformName,
				value: item.platformID.toString(),
			}));

			this.map.platforms = new Map(
				data.map((platform) => [
					platform.platformID.toString(),
					platform.platformName,
				]),
			);
		},

		applyFiltersTypeInfluencers(data: GetFilterOptions_TypeInfluencer[]) {
			this.filters.typeInfluencers = data.map((item) => ({
				label: item.typeInfluencerName,
				value: item.typeInfluencerID.toString(),
			}));

			this.map.typeInfluencers = new Map(
				data.map((typeInfluencer) => [
					typeInfluencer.typeInfluencerID.toString(),
					typeInfluencer.typeInfluencerName,
				]),
			);
		},

		applyFiltersDepartments(data: GetFilterOptions_Department[]) {
			this.filters.departments = data.map((item) => ({
				label: item.departmentName,
				value: item.departmentID.toString(),
			}));

			this.map.departments = new Map(
				data.map((department) => [
					department.departmentID.toString(),
					department.departmentName,
				]),
			);
		},
	},
});
