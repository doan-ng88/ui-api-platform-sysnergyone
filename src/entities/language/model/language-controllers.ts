import { computed } from "vue";
import FlagKr4x3 from "~icons/flag/kr-4x3";
import FlagUs4x3 from "~icons/flag/us-4x3";
import FlagVn4x3 from "~icons/flag/vn-4x3";
import { useLanguageStore } from "./language";

export const useLanguageControllersStore = () => {
	const languageStore = useLanguageStore();

	const activeIcon = computed(() => {
		return languageStore.language === "en"
			? FlagUs4x3
			: languageStore.language === "vi"
				? FlagVn4x3
				: FlagKr4x3;
	});

	return {
		activeIcon,
	};
};
