import type { ModelRef } from "vue";

export interface PaginationProps {
	count?: number | string;
	pageSize?: number | string;
	disabled?: boolean;
}

export type PaginationEmits = (e: "change", value: number) => void;

export interface PaginationStoreProps {
	props: PaginationProps;
	emits: PaginationEmits;
	page: ModelRef<
		string | number | undefined,
		string | number,
		string | number | undefined,
		string | number | undefined
	>;
}
