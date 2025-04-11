import { convertToNumber } from "@/shared/lib/convert-to-number";
import type { PaginationStoreProps } from "./types";

export const usePaginationWONumberStore = (props: PaginationStoreProps) => {
	const onChangePage = (type: "previous" | "next") => {
		if (!props.models.page.value) {
			props.models.page.value = "2";
			return;
		}

		if (typeof props.models.page.value === "string") {
			let pageNumber = convertToNumber({
				defaultNumber: 0,
				number: props.models.page.value,
			});

			if (type === "previous") {
				pageNumber--;
			} else {
				pageNumber++;
			}

			props.models.page.value = pageNumber.toString();
			props.emits("change", props.models.page.value);
			return;
		}

		if (type === "previous") {
			props.models.page.value = props.models.page.value--;
		} else {
			props.models.page.value = props.models.page.value++;
		}

		props.emits("change", props.models.page.value);
	};

	return { onChangePage };
};
