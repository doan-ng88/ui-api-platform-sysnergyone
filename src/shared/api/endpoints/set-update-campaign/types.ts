import type { BooleanString } from "@/shared/config";

/**
 * Represents the base parameters with common fields
 */
interface BaseParams {
	enabled?: BooleanString;
}

/**
 * Represents the campaign update parameters
 */
interface UpdateCampaignParams extends BaseParams {
	campaignID?: string;
	campaignName?: string;
	campaignDescription?: string;
	campaignStartDate?: string;
	campaignEndDate?: string;
	campaignBudget?: string;
	campaignObjective?: string;
}

/**
 * Represents a campaign category parameters
 */
interface UpdateCampaignCategoryParams extends BaseParams {
	campaignCategoryID?: string;
	categoryID?: string;
}

/**
 * Represents a campaign content parameters
 */
interface UpdateCampaignContentParams extends BaseParams {
	campaignContentID?: string;
	contentID?: string;
}

/**
 * Represents a campaign location parameters
 */
interface UpdateCampaignLocationParams extends BaseParams {
	campaignLocationID?: string;
	fullAddress?: string;
	ward?: string;
	city?: string;
	province?: string;
}

/**
 * Represents a campaign platform parameters
 */
interface UpdateCampaignPlatformParams extends BaseParams {
	campaignPlatformID?: string;
	platformID?: string;
}

/**
 * Represents a campaign product parameters
 */
interface UpdateCampaignProductParams extends BaseParams {
	campaignProductID?: string;
	sku?: string;
	quantity?: string;
	price?: string;
}

/**
 * Represents a campaign influencer parameters
 */
interface UpdateCampaignInfluencerParams extends BaseParams {
	campaignInfluencerID?: string;
	influencerID?: string;
}

/**
 * Main interface that combines all campaign update parameters
 */
export interface SetUpdateCampaignProps {
	setUpdateCampaignParams?: UpdateCampaignParams;
	setUpdateCampaignCategoryParams?: UpdateCampaignCategoryParams[];
	setUpdateCampaignContentParams?: UpdateCampaignContentParams[];
	setUpdateCampaignLocationParams?: UpdateCampaignLocationParams[];
	setUpdateCampaignPlatformParams?: UpdateCampaignPlatformParams[];
	setUpdateCampaignProductParams?: UpdateCampaignProductParams[];
	setUpdateCampaignInfluencerParams?: UpdateCampaignInfluencerParams[];
}
