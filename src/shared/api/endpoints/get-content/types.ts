import type { CommonPaginationRequest } from "@/shared/config";

export interface GetContentBodyRequest extends CommonPaginationRequest {
	contentID?: string;
	contentName?: string;
	enabled?: boolean;
}

/**
 * Represents a category association for a content item
 */
interface ContentCategory {
	contentCategoryID: number;
	contentID: number;
	categoryID: number;
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
	enabled: boolean;
}

/**
 * Represents a product associated with a content item
 */
interface ContentProduct {
	contentProductID: number;
	contentID: number;
	sku: string;
	quantity: number;
	price: number;
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
	enabled: boolean;
}

/**
 * Represents an influencer associated with content
 */
interface ContentInfluencer {
	contentInfluencerID: number;
	contentID: number;
	influencerID: number;
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
	enabled: boolean;
	influencerFullName: string;
	influencerLinkAvatar: string;
}

/**
 * Represents a campaign content relationship
 */
interface CampaignContent {
	campaignContentID: number;
	campaignID: number;
	contentID: number;
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
	enabled: boolean;
	campaignName: string;
	campaignStartDate: string; // ISO 8601 date string
	campaignEndDate: string; // ISO 8601 date string
	campaignCreatedAt: string; // ISO 8601 date string
	campaignUpdatedAt: string; // ISO 8601 date string
	contentPublishedDate: string; // ISO 8601 date string
	contentCreatedAt: string; // ISO 8601 date string
	contentUpdatedAt: string; // ISO 8601 date string
}

/**
 * Represents a content item with its associated categories, products, and influencers
 */
export interface Content {
	contentID: number;
	brandID: number;
	brandName: string;
	platformID: number;
	contentName: string;
	contentURL: string;
	contentThumbnail: string;
	contentDescription: string;
	contentPublishedDate: string; // ISO 8601 date string
	likeCount: number;
	loveCount: number;
	shareCount: number;
	enabled: boolean;
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
	commentCount: number;
	gmv: number;
	productSold: number;
	commissionPercent: number;
	listCategories: ContentCategory[] | null;
	listProducts: ContentProduct[] | null;
	listInfluencers: ContentInfluencer[] | null;
	listCampaignContents: CampaignContent[] | null;
}
