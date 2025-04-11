import type { ClassValue } from "cva/types";
import type { ModelRef } from "vue";

export type InputCurrencyEmits = (e: "change", value: Event) => void;

export interface InputCurrencyProps {
	placeholder?: string;
	disabled?: boolean;
	autocomplete?: string;
	class?: ClassValue;
	required?: boolean;
}

export interface InputCurrencyStoreProps {
	props: InputCurrencyProps;
	emits: InputCurrencyEmits;
	model: ModelRef<
		number | string | undefined,
		number | string,
		number | string | undefined,
		number | string | undefined
	>;
}
