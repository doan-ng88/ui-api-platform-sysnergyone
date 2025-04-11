import { responsePostProcess } from "@/shared/api/libs/response-post-process";
import { mockCommonResponse } from "@/shared/lib/mock-common-response";
import type { SelectOptionProps } from "@/shared/ui/select";

export const mockSelectOptions = async () => {
	const relatedCampaignOptions: SelectOptionProps[] = [
		{ value: "1", label: "Campaign 1" },
		{ value: "2", label: "Campaign 2" },
	];
	const adsTypeOptions: SelectOptionProps[] = [
		{ value: "1", label: "Video" },
		{ value: "2", label: "Live streaming" },
	];
	const platformOptions: SelectOptionProps[] = [
		{ value: "1", label: "Youtube" },
		{ value: "2", label: "Tiktok" },
	];
	const categoryOptions: SelectOptionProps[] = [
		{ value: "1", label: "Video" },
		{ value: "2", label: "Live streaming" },
	];
	const influencerOptions: SelectOptionProps[] = [
		{ value: "1", label: "Le Duong Bao Lam" },
		{ value: "2", label: "Nguyen Thi My Linh" },
	];

	const data = await mockCommonResponse({
		relatedCampaignOptions,
		adsTypeOptions,
		platformOptions,
		categoryOptions,
		influencerOptions,
	});

	const dataProcced = responsePostProcess(data);

	return dataProcced;
};
