import { cn } from "@/shared/lib/classname";
import { type InputTypeHTMLAttribute, computed, ref } from "vue";
import type { InputSecretStoreProps } from "./types";

export const useInputSecretStore = (storeProps: InputSecretStoreProps) => {
	const isVisible = ref(false);

	const inputType = computed(
		(): InputTypeHTMLAttribute => (isVisible.value ? "text" : "password"),
	);

	const inputClasses = computed(() =>
		cn(
			"input input-bordered flex items-center gap-2 input-sm",
			{ "input-error": storeProps.props.error },
			storeProps.props.class,
		),
	);

	const placeholder = computed(() => {
		const firstChar = storeProps.props.placeholder?.charAt(0);
		if (!firstChar) {
			return;
		}
		return firstChar.toUpperCase() + storeProps.props.placeholder?.slice(1);
	});

	const toggleVisibility = () => {
		isVisible.value = !isVisible.value;
	};

	return {
		// States
		isVisible,
		inputType,
		inputClasses,
		placeholder,

		// Actions
		toggleVisibility,
	};
};
