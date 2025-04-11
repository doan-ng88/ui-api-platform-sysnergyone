import type { CommonPaginationRequest } from "@/shared/config";

export interface GetCampaignsBodyRequest extends CommonPaginationRequest {
	campaignId?: string;
	campaignName?: string;
	enabled?: boolean;
	startDate?: string;
	endDate?: string;
}
/**
 * Represents a timestamp in ISO 8601 format
 */
type ISODateString = string;

/**
 * Represents a campaign category entry
 */
interface CampaignCategory {
	campaignCategoryID: number;
	campaignID: number;
	categoryID: number;
	createdAt: ISODateString;
	updatedAt: ISODateString;
	enabled: boolean;
	campaignName: string;
	campaignDescription: string;
	campaignStartDate: ISODateString;
	campaignEndDate: ISODateString;
	campaignBudget: number;
	campaignObjective: string;
	campaignNotes: string;
	campaignCreatedAt: ISODateString;
	campaignUpdatedAt: ISODateString;
	categoryName: string;
	categoryCreatedAt: ISODateString;
	categoryUpdatedAt: ISODateString;
}

/**
 * Represents a campaign product entry
 */
interface CampaignProduct {
	campaignProductID: number;
	campaignID: number;
	sku: string;
	quantity: number;
	price: number;
	createdAt: ISODateString;
	updatedAt: ISODateString;
	enabled: boolean;
	campaignName: string;
	campaignDescription: string;
	campaignStartDate: ISODateString;
	campaignEndDate: ISODateString;
	campaignBudget: number;
	campaignObjective: string;
	campaignNotes: string;
	campaignCreatedAt: ISODateString;
	campaignUpdatedAt: ISODateString;
}

/**
 * Represents a campaign influencer entry
 */
interface CampaignInfluencer {
	campaignInfluencerID: number;
	campaignID: number;
	influencerID: number;
	influencerName: string;
	enabled: boolean;
	createdAt: ISODateString;
	updatedAt: ISODateString;
}

/**
 * Represents a campaign location entry
 */
interface CampaignLocation {
	campaignLocationID: number;
	campaignID: number;
	fullAddress: string;
	ward: string;
	city: string;
	province: string;
	enabled: boolean;
	createdAt: ISODateString;
	updatedAt: ISODateString;
	campaignName: string;
	campaignDescription: string;
	campaignStartDate: ISODateString;
	campaignEndDate: ISODateString;
	campaignBudget: number;
	campaignObjective: string;
	campaignNotes: string;
	campaignCreatedAt: ISODateString;
	campaignUpdatedAt: ISODateString;
}

/**
 * Represents a campaign platform entry
 */
interface CampaignPlatform {
	campaignPlatformID: number;
	campaignID: number;
	platformID: number;
	enabled: boolean;
	createdAt: ISODateString;
	updatedAt: ISODateString;
	campaignName: string;
	campaignDescription: string;
	campaignStartDate: ISODateString;
	campaignEndDate: ISODateString;
	campaignBudget: number;
	campaignObjective: string;
	campaignNotes: string;
	campaignCreatedAt: ISODateString;
	campaignUpdatedAt: ISODateString;
	platformName: string;
}

interface CampaignContent {
	campaignContentID: string;
	contentID: string;
	enabled: string;
}

/**
 * Represents the main campaign structure with all its related data
 */
export interface Campaign {
	campaignID: number;
	brandID: number;
	brandName: string;
	campaignName: string;
	campaignStatusID: number;
	campaignStatusName: string;
	campaignDescription: string;
	campaignStartDate: ISODateString;
	campaignEndDate: ISODateString;
	campaignBudget: number;
	campaignObjective: string;
	notes: string;
	enabled: boolean;
	createdAt: ISODateString;
	updatedAt: ISODateString;
	listCategories: CampaignCategory[] | null;
	listProducts: CampaignProduct[] | null;
	listInfluencers: CampaignInfluencer[] | null;
	listLocations: CampaignLocation[] | null;
	listPlatforms: CampaignPlatform[] | null;
	listContents: CampaignContent[] | null;
}
