import type { ClassValue } from "cva/types";
import type { ModelRef } from "vue";

export interface RowPerPageProps {
	items?: string[];
	class?: ClassValue;
	placeholder?: string;
	disabled?: boolean;
}

export type RowPerPageEmits = (e: "change", value: number) => void;

export interface RowPerPageStoreProps {
	props: RowPerPageProps;
	emits: RowPerPageEmits;
	model: ModelRef<
		string | number | undefined,
		string | number,
		string | number | undefined,
		string | number | undefined
	>;
}
