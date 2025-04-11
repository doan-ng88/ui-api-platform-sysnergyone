import type { SelectOptionProps } from "@/shared/ui/select";
import { useDebounceFn } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { apiGetInfluencers } from "../api/get-influencers";

export const useConfigsStore = () => {
	const influencerOptions = ref<SelectOptionProps[]>([]);
	const isFetchingInfluencerOptions = ref(false);

	const onSearchInfluencer = useDebounceFn((name: string) => {
		fetchInfluencerOptions(name);
	}, 300);

	const fetchInfluencerOptions = async (name?: string) => {
		isFetchingInfluencerOptions.value = true;
		const res = await apiGetInfluencers({
			name,
		});

		if (res) {
			influencerOptions.value = res;
		} else {
			influencerOptions.value = [];
		}

		isFetchingInfluencerOptions.value = false;
	};

	onMounted(() => {
		fetchInfluencerOptions();
	});

	return {
		// States
		influencerOptions,
		isFetchingInfluencerOptions,

		// Actions
		onSearchInfluencer,
	};
};
