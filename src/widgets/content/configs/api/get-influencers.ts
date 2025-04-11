import { getInfluencers } from "@/shared/api/endpoints/get-influencers";
import type { SelectOptionProps } from "@/shared/ui/select";

interface ApiGetInfluencersProps {
	name?: string;
}

export const apiGetInfluencers = async (props: ApiGetInfluencersProps) => {
	const { data } = await getInfluencers({
		fullName: props.name,
		pageSize: 50,
		pageIndex: 1,
	});

	if (!data) {
		return;
	}

	const influencerOptions = data.map(
		(influencer): SelectOptionProps => ({
			label: influencer.fullName,
			value: influencer.influencerID.toString(),
		}),
	);

	return influencerOptions;
};
