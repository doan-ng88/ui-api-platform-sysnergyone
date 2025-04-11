import { cn } from "@/shared/lib/classname";
import { watchDebounced } from "@vueuse/core";
import { computed, ref } from "vue";
import type { SearchInputStoreProps } from "./types";

export const useSearchInputStore = (props: SearchInputStoreProps) => {
	const search = ref(props.model.value ?? "");

	const inputClass = computed(() =>
		cn(
			"input input-sm input-bordered flex items-center gap-2",
			props.props.class,
		),
	);

	const placeholder = computed(() => {
		const firstChar = props.props.placeholder?.charAt(0);
		if (!firstChar) {
			return;
		}
		return firstChar.toUpperCase() + props.props.placeholder?.slice(1);
	});

	watchDebounced(
		search,
		(value) => {
			props.model.value = value;
			props.emits("change", value);
		},
		{
			debounce: 400,
		},
	);

	return {
		// States
		search,
		inputClass,
		placeholder,
	};
};
