import type { ModelWrapperRef } from "@/shared/config";
import type { SelectOptionProps } from "../select";

export interface SelectMultipleProps {
	placeholder?: string;
	disabled?: boolean;
	options: SelectOptionProps[];
	required?: boolean;
	loading?: boolean;
}

export interface StoreProps {
	props: SelectMultipleProps;
	models: {
		selectedItems: ModelWrapperRef<string[]>;
	};
	emits: SelectMultipleEmits;
}

export type SelectMultipleEmits = (e: "input", value: string) => void;
