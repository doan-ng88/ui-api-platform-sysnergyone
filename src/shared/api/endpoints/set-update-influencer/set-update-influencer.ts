import {
	COLLABORATION_STATUS_KEY,
	type CommonResponse,
	ENABLED_KEY,
	FULL_ADDRESS_KEY,
	FULL_NAME_KEY,
	INFLUENCER_ID_KEY,
	LINK_AVATAR_KEY,
	MAIN_PLATFORM_ID_KEY,
	NOTES_KEY,
	PATH_INFLUENCER_MANAGEMENT,
	PHONE_KEY,
	TYPE_INFLUENCER_ID_KEY,
} from "@/shared/config";

import { createPrivateHttp } from "@/shared/api/http/private-http";
import {
	type CreateParamsRequest_Set,
	createParamsRequest,
} from "@/shared/api/libs/create-params-request";
import { responsePostProcess } from "../../libs/response-post-process";
import type {
	SetUpdateInfluencerProps,
	SetUpdateInfluencer_Category,
	SetUpdateInfluencer_Platform,
} from "./types";

// Get user details
export const setUpdateInfluencer = async (props: SetUpdateInfluencerProps) => {
	const params = extractBodyRequest(props);

	try {
		const data = await apiSetUpdateInfluencer({
			params,
			platforms: props.platforms,
			categories: props.categories,
		});

		const dataProcced = responsePostProcess(data);

		return dataProcced;
	} catch (_) {
		return undefined;
	}
};

const extractBodyRequest = (props: SetUpdateInfluencerProps) => {
	const params = createParamsRequest("set", [
		{
			Key: INFLUENCER_ID_KEY,
			Value: props.influencerId,
		},
		{
			Key: TYPE_INFLUENCER_ID_KEY,
			Value: props.typeInfluencerId,
		},
		{
			Key: FULL_NAME_KEY,
			Value: props.fullName,
		},
		{
			Key: PHONE_KEY,
			Value: props.phone,
		},
		{
			Key: FULL_ADDRESS_KEY,
			Value: props.fullAddress,
		},
		{
			Key: MAIN_PLATFORM_ID_KEY,
			Value: props.mainPlatformId,
		},
		{
			Key: NOTES_KEY,
			Value: props.notes,
		},
		{
			Key: COLLABORATION_STATUS_KEY,
			Value: props.collaborationStatus,
		},
		{
			Key: LINK_AVATAR_KEY,
			Value: props.linkAvatar,
		},
		{
			Key: ENABLED_KEY,
			Value: props.enabled,
		},
	]);

	return params;
};

const apiSetUpdateInfluencer = async (body: {
	params: CreateParamsRequest_Set;
	platforms?: SetUpdateInfluencer_Platform[];
	categories?: SetUpdateInfluencer_Category[];
}): Promise<CommonResponse<number>> => {
	const path = `${PATH_INFLUENCER_MANAGEMENT}/set-update-influencer`;

	const http = await createPrivateHttp({ permission: "SET" });

	const res = await http.post(path, {
		...body.params,
		setUpdateInfluencerPlatformParams: body.platforms,
		setUpdateInfluencerCategoryParams: body.categories,
	});

	return res.data;
};
