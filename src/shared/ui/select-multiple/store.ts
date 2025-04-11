import { useFilter } from "reka-ui";
import { computed, ref, watch } from "vue";
import type { SelectOptionProps } from "../select/types";
import type { StoreProps } from "./types";

export const useStore = (storeProps: StoreProps) => {
	const { contains } = useFilter({ sensitivity: "base" });

	const query = ref("");

	// map options to a map for faster lookup
	const optionsMap = computed(
		() =>
			new Map(storeProps.props.options.map((option) => [option.value, option])),
	);

	// map selected items to options to get details about the selected items
	const selectedOptions = computed(() =>
		storeProps.models.selectedItems.value.reduce((items, item) => {
			const option = optionsMap.value.get(item);
			if (option) {
				items.push(option);
			}
			return items;
		}, [] as SelectOptionProps[]),
	);

	const filteredOptions = computed(() =>
		storeProps.props.options.filter((option) => {
			return (
				contains(option.label, query.value) &&
				!storeProps.models.selectedItems.value.includes(option.value)
			);
		}),
	);

	const onRemoveTag = (value: string) => {
		storeProps.models.selectedItems.value =
			storeProps.models.selectedItems.value.filter((item) => item !== value);
	};

	watch(
		storeProps.models.selectedItems,
		() => {
			query.value = "";
		},
		{ deep: true },
	);

	watch(query, (value) => {
		storeProps.emits("input", value);
	});

	return {
		// States
		query,
		selectedOptions,
		filteredOptions,

		// Actions
		onRemoveTag,
	};
};
