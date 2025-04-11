import { convertToNumber } from "@/shared/lib/convert-to-number";
import { computed, nextTick } from "vue";
import type { PaginationStoreProps } from "./types";

export const usePaginationStore = (props: PaginationStoreProps) => {
	const itemsPerPage = computed(() => {
		return convertToNumber({
			defaultNumber: 10,
			number: props.props.pageSize,
		});
	});

	const total = computed(() => {
		return convertToNumber({
			defaultNumber: 0,
			number: props.props.count,
		});
	});

	const currentPage = computed(() => {
		return convertToNumber({
			defaultNumber: 1,
			number: props.page.value,
		});
	});

	const onChange = async (newPage: number) => {
		props.page.value = newPage;

		// Need to have this in order to make data changed before do anything else
		await nextTick();

		props.emits("change", newPage);
	};

	return {
		// States
		itemsPerPage,
		total,
		currentPage,

		// Actions
		onChange,
	};
};
