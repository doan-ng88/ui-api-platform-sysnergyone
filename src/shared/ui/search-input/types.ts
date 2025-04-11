import type { ClassValue } from "cva/types";
import type { ModelRef } from "vue";

export type SearchInputEmits = (e: "change", value: string) => void;

export interface SearchInputProps {
	placeholder: string;
	disabled?: boolean;
	autocomplete?: string;
	class?: ClassValue;
}

export interface SearchInputStoreProps {
	props: SearchInputProps;
	emits: SearchInputEmits;
	model: ModelRef<
		string | undefined,
		string,
		string | undefined,
		string | undefined
	>;
}
