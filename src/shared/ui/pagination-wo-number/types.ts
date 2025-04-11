import type { ModelRef } from "vue";

export interface PaginationProps {
	haveNextPage?: boolean;
	havePreviousPage?: boolean;
	disabled?: boolean;
}

export type PaginationEmits = (e: "change", value: number | string) => void;

export interface PaginationStoreProps {
	props: PaginationProps;
	emits: PaginationEmits;
	models: {
		page: ModelRef<
			string | number | undefined,
			string | number,
			string | number | undefined,
			string | number | undefined
		>;
	};
}
