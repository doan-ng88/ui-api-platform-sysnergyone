import { ref } from "vue";

export const useQuickActionDialogStore = () => {
	const search = ref("");

	const isDialogOpen = ref(false);

	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	const $reset = () => {};

	const onOpen = () => {
		isDialogOpen.value = true;
	};

	return {
		// States
		isDialogOpen,
		search,

		// Actions
		onOpen,

		// Reset
		$reset,
	};
};
