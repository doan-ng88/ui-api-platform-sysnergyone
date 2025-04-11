import { cn } from "@/shared/lib/classname";
import { computed, onMounted, ref, watch } from "vue";
import type { InputCurrencyStoreProps } from "./types";

export const useInputCurrencyStore = (props: InputCurrencyStoreProps) => {
	const value = ref<string>("0");

	const inputClass = computed(() =>
		cn(
			"input input-sm input-bordered flex items-center gap-2",
			props.props.class,
		),
	);

	const placeholderContent = computed(() => {
		const firstChar = props.props.placeholder?.charAt(0);
		if (!firstChar) {
			return;
		}
		return firstChar.toUpperCase() + props.props.placeholder?.slice(1);
	});

	const onInput = (event: Event) => {
		const input = event.target as HTMLInputElement;
		let rawValue = input.value.replace(/\./g, ""); // Remove existing dots
		rawValue = input.value.replace(/\D/g, ""); // Remove all non-numeric characters
		const formattedValue = formatCurrency(rawValue);
		value.value = formattedValue;

		props.emits("change", event);
		if (typeof props.model.value === "number") {
			props.model.value = Number(rawValue);
		} else {
			props.model.value = rawValue;
		}
	};

	const setValue = (newValue: number | string) => {
		value.value = formatCurrency(newValue.toString());
	};

	watch(props.model, (newValue) => {
		if (newValue === undefined) {
			return;
		}
		value.value = formatCurrency(newValue.toString());
	});

	onMounted(() => {
		if (props.model.value) {
			setValue(props.model.value);
		}
	});

	return {
		// States
		placeholderContent,
		value,
		inputClass,
		// Actions
		onInput,
	};
};

const formatCurrency = (num: string) => {
	return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
