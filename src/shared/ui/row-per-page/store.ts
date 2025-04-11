import { createListCollection, useSelect } from "@ark-ui/vue";
import { nextTick, watch } from "vue";
import type { RowPerPageStoreProps } from "./types";

export const useRowPerPageStore = (props: RowPerPageStoreProps) => {
	const collection = createListCollection({
		items: props.props.items ?? ["10", "20", "50", "100", "200", "300"],
	});

	const select = useSelect({
		defaultValue: props.model.value
			? [props.model.value.toString()]
			: undefined,
		collection: collection,
		onValueChange: async (details) => {
			props.model.value = Number(details.value[0]);

			// Need to have this in order to make data changed before do anything else
			await nextTick();

			props.emits("change", Number(details.value[0]));
		},
		disabled: props.props.disabled,
	});

	watch(
		() => props.props.disabled,
		(disabled) => {
			if (disabled === undefined) {
				return;
			}
			select.value.disabled = disabled;
		},
	);

	return {
		// States
		select,
		collection,
	};
};
